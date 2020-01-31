---
layout: single
title: FastTcpScan - Go
excerpt: "En el siguiente artículo os comparto la herramienta `FastTcpScan` que nos desarrollamos en la máquina `Hawk` de la plataforma [HackTheBox](https://hackthebox.eu). Esta herramienta consiste en un escáner que permite detectar de forma rápida y precisa los puertos TCP que una máquina tiene abiertos."
date: 2020-01-31
classes: wide
header:
  teaser: /assets/images/fasttcpscan-go/golang-go.png
  teaser_home_page: true
categories:
  - Scripting
tags:
  - TCP Scan
  - Go Golang
---

![](/assets/images/fasttcpscan-go/golang-go.png)

En el siguiente artículo os comparto la herramienta `FastTcpScan` que nos desarrollamos en la máquina `Hawk` de la plataforma [HackTheBox](https://hackthebox.eu). Esta herramienta consiste en un escáner que permite detectar de forma rápida y precisa los puertos TCP que una máquina tiene abiertos.

Para aquellos que quieran ver el desarrollo de la herramienta paso a paso, tenéis disponible el siguiente vídeo en el que la creamos desde 0:

- [Máquina Hawk - HackTheBox](https://www.youtube.com/watch?v=7L1WNU7fBec)

La herramienta `fastTCPScan.go` la podéis encontrar más abajo en este mismo artículo.

## ¿Cómo se usa la herramienta?

Lo primero una vez contemos con el script `fastTCPScan.go`, será compilarlo. Esto podemos hacerlo de la siguiente forma:

```go
┌─[✗]─[root@parrot]─[/home/s4vitar/Desktop]
└──╼ #cd /usr/bin/
┌─[root@parrot]─[/usr/bin]
└──╼ #go build -ldflags "-s -w" fastTCPScan.go 
┌─[root@parrot]─[/usr/bin]
└──╼ #upx brute fastTCPScan
                       Ultimate Packer for eXecutables
                          Copyright (C) 1996 - 2018
UPX 3.95        Markus Oberhumer, Laszlo Molnar & John Reiser   Aug 26th 2018

        File size         Ratio      Format      Name
   --------------------   ------   -----------   -----------
upx: brute: FileNotFoundException: brute: No such file or directory
   2260992 ->    868864   38.43%   linux/amd64   fastTCPScan                   

Packed 1 file.
```

Una vez hecho, ya podremos usar la herramienta. Su uso es de lo más sencillo, cabe decir antes que nada que la herramienta cuenta con un panel de ayuda:

```go
┌─[✗]─[root@parrot]─[/home/s4vitar/Desktop]
└──╼ #fastTCPScan -h
Usage of fastTCPScan:
  -host string
        Host o dirección IP a escanear (default "127.0.0.1")
  -range string
        Rango de puertos a comprobar: 80,443,1-65535,1000-2000, ... (default "1-65535")
  -threads int
        Número de hilos a usar (default 1000)
  -timeout duration
        Segundos por puerto (default 1s)
```

Mediante el parámetro `-host` especificamos la dirección ip de la máquina objetivo (también podemos especificar un nombre de dominio), con el parámetro `-threads` especificamos el número de hilos a usar y con el parámetro `-range` especificamos el rango de puertos a escanear.

En este caso a modo de ejemplo, efectuaremos un escaneo contra la dirección ip `192.168.11.12` haciendo uso de 900 hilos (por defecto se escanean todos los puertos [**1-65535**]):

```go
┌─[✗]─[root@parrot]─[/home/s4vitar/Desktop]
└──╼ #fastTCPScan -host 192.168.11.12 -threads 900

[*] Escaneando host 192.168.11.12 (Puerto: 1-65535)

443: Abierto
902: Abierto
3000: Abierto
```

Y listo, no tiene mayor misterio. 

Actualmente tira por TCP, pero también se puede configurar para que vaya por UDP... de hecho no sería muy complicado si miráis el código, con unas pequeñas modificaciones ya lo tendríais, ¡esa parte os la dejo a vosotros!.

Por aquí tenéis el script `fastTCPScan.go`:

```go
/*
	Author: s4vitar - https://youtube.com/watch?v=7L1WNU7fBec
*/

package main

import (
	"fmt"
	"flag"
	"context" // Done() struct{} || <- ctx.Done()
	"strings"
	"strconv"
	"log"
	"sync"
	"time"
	"net"
)

var (
	host = flag.String("host", "127.0.0.1", "Host o dirección IP a escanear")
	ports = flag.String("range", "1-65535", "Rango de puertos a comprobar: 80,443,1-65535,1000-2000, ...")
	threads = flag.Int("threads", 1000, "Número de hilos a usar")
	timeout = flag.Duration("timeout", 1*time.Second, "Segundos por puerto")
)

func processRange(ctx context.Context, r string) chan int {
	c := make(chan int) // c <- elemento
	done := ctx.Done()

	go func() {
		defer close(c)
		blocks := strings.Split(r, ",")

		for _, block := range blocks {
			rg := strings.Split(block, "-")
			var minPort, maxPort int
			var err error

			minPort, err = strconv.Atoi(rg[0])

			if err != nil {
				log.Print("No ha sido posible interpretar el rango: ", block)
				continue
			}

			if len(rg) == 1 {
				maxPort = minPort
			} else {
				maxPort, err = strconv.Atoi(rg[1])
				if err != nil {
					log.Print("No ha sido posible interpretar el rango: ", block)
					continue
				}
			}
			for port := minPort; port <= maxPort; port++ {
				select {
				case c <- port:
				case <-done:
					return
				}
			}
		}
	}()
	return c
}

func scanPorts(ctx context.Context, in <-chan int) chan string {
	out := make(chan string)
	done := ctx.Done()
	var wg sync.WaitGroup
	wg.Add(*threads)

	for i := 0; i < *threads; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for {
				select {
				case port, ok := <-in:
					if !ok {
						return
					}
					s := scanPort(port)
					select {
					case out <- s:
					case <-done:
						return
					}
				case <-done:
					return
				}
			}
		}()
	}
	go func() {
		wg.Wait()
		close(out)
	}()

	return out
}

func scanPort(port int) string {
	addr := fmt.Sprintf("%s:%d", *host, port) // ip:puerto
	conn, err := net.DialTimeout("tcp", addr, *timeout)

	if err != nil {
		return fmt.Sprintf("%d: %s", port, err.Error())
	}

	conn.Close()

	return fmt.Sprintf("%d: Abierto", port)
}

func main() {
	ctx, cancel := context.WithCancel(context.Background()) // Definimos nuestro contexto
	defer cancel()

	flag.Parse()
	fmt.Printf("\n[*] Escaneando host %s (Puerto: %s)\n\n", *host, *ports)

	pR := processRange(ctx, *ports)
	sP := scanPorts(ctx, pR)

	for port := range sP {
		if strings.HasSuffix(port, ": Abierto") {
			fmt.Println(port)
		}
	}
}
```


