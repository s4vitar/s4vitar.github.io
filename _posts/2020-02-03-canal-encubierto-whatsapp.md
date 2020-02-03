---
layout: single
title: Canal encubierto en WhatsApp
excerpt: "En el siguiente artículo, os muestro una forma de mantener conversaciones encubiertas sin que quede registro en el historial de conversaciones de WhatsApp. De esta forma, dos personas pueden mantener una conversación mediante la lectura de logs a tiempo de escritura sin necesidad de enviar el mensaje."
date: 2020-02-03
classes: wide
header:
  teaser: /assets/images/whatsapp-canal-encubierto/whatsapp-banner.jpeg
  teaser_home_page: true
categories:
  - Research
tags:
  - WhatsApp
  - Canales Encubiertos
  - 
---

<p align="center">
<img src="/assets/images/whatsapp-canal-encubierto/whatsapp-banner.jpeg" width="500">
</p>

En el siguiente artículo, os muestro una forma de mantener conversaciones encubiertas sin que quede registro en el historial de conversaciones de WhatsApp. De esta forma, dos personas pueden mantener una conversación mediante la lectura de logs a tiempo de escritura sin necesidad de enviar el mensaje.

## Antecedentes

Para poder poner en práctica esta utilidad, en mi caso cuento con un servidor web alojado en [Heroku](https://www.heroku.com/). Este paso es opcional, vosotros podréis usar lo que queráis... incluso un servidor HTTP montado con Python desde vuestro VPS.

La URL que estaré utilizando para el canal encubierto será la siguiente:

* [http://s4vitar.herokuapp.com](http://s4vitar.herokuapp.com)

<p align="center">
<img src="/assets/images/whatsapp-canal-encubierto/page-herokuapp.jpg">
</p>

Entonces bien, ¿cómo hacemos?, pues fijaros. Una de las utilidades de heroku es el comando `heroku logs -t` aplicado desde consola, donde podemos visualizar las peticiones a tiempo real en formato log que se están realizando contra el servidor. Para el que no cuente con `heroku` instalado en el sistema, podéis aplicar el comando `snap install heroku --classic` y ya lo tendríais. 

Posteriormente, deberéis aplicar el siguiente comando desde consola para iniciar sesión con vuestra cuenta:

```go
┌─[root@parrot]─[/home/s4vitar/Desktop]
└──╼ #heroku login
heroku: Press any key to open up the browser to login or q to exit:
Opening browser to https://cli-auth.heroku.com/auth/cli/browser/35e6XXXX-XXXX-XXXX-87d0-bf7ff75XXXXX
heroku: Waiting for login... ⣟
```

Se os abrirá el navegador (en caso de que no se os abra, simplemente tenéis que acceder a la URL que se os proporciona). Una vez logueados, deberíais ver lo siguiente:

```go
┌─[root@parrot]─[/home/s4vitar/Desktop]
└──╼ #heroku login
heroku: Press any key to open up the browser to login or q to exit: 
Opening browser to https://cli-auth.heroku.com/auth/cli/browser/35e6XXXX-XXXX-XXXX-87d0-bf7ff75XXXXX
Logging in... done
Logged in as s4vitarx@gmail.com
```

Os descargáis el repositorio correspondiente a la página web que se dispone de forma pública:

```go
┌─[root@parrot]─[/opt]
└──╼ #heroku git:clone -a s4vitar
Clonando en 's4vitar'...
remote: Counting objects: 10, done.
remote: Compressing objects: 100% (6/6), done.
remote: Total 10 (delta 0), reused 0 (delta 0)
Desempaquetando objetos: 100% (10/10), listo.
┌─[root@parrot]─[/opt]
└──╼ #cd s4vitar
┌─[root@parrot]─[/opt/s4vitar]
└──╼ #ls
index.html
┌─[✗]─[root@parrot]─[/opt/s4vitar]
└──╼ #cat index.html 
Test
┌─[root@parrot]─[/opt/s4vitar]
└──╼ #
```

Y una vez situados dentro del directorio de vuestro proyecto, aplicáis el siguiente comando:

```go
┌─[root@parrot]─[/opt/s4vitar]
└──╼ #heroku logs -t
2020-02-03T11:15:21.183720+00:00 heroku[web.1]: Unidling
2020-02-03T11:15:21.187564+00:00 heroku[web.1]: State changed from down to starting
2020-02-03T11:15:21.218354+00:00 heroku[web.1]: Unidling
2020-02-03T11:15:21.233848+00:00 heroku[web.1]: State changed from down to starting
2020-02-03T11:15:22.506281+00:00 heroku[web.1]: Starting process with command `heroku-php-apache2`
2020-02-03T11:15:25.046504+00:00 app[web.1]: Optimizing defaults for 1X dyno...
2020-02-03T11:15:25.216868+00:00 app[web.1]: 4 processes at 128MB memory limit.
2020-02-03T11:15:25.222173+00:00 app[web.1]: Starting php-fpm...
2020-02-03T11:15:27.410773+00:00 heroku[web.1]: State changed from starting to up
2020-02-03T11:15:27.224962+00:00 app[web.1]: Starting httpd...
2020-02-03T11:15:28.234835+00:00 app[web.1]: 10.111.222.196 - - [03/Feb/2020:11:15:28 +0000] "GET / HTTP/1.1" 302 - "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36
2020-02-03T11:15:28.278228+00:00 app[web.1]: 10.41.198.134 - - [03/Feb/2020:11:15:28 +0000] "GET /robots.txt HTTP/1.1" 404 208 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36
2020-02-03T11:15:28.375383+00:00 app[web.1]: 10.111.222.196 - - [03/Feb/2020:11:15:28 +0000] "GET /index.html HTTP/1.1" 200 5 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36
2020-02-03T11:15:28.234477+00:00 heroku[router]: at=info method=GET path="/" host=s4vitar.herokuapp.com request_id=1cc5b49f-eaba-4f5d-828c-4f1ac3dcddcc fwd="XX.XXX.XXX.160" dyno=web.1 connect=1ms service=3ms status=302 bytes=176 protocol=http
2020-02-03T11:15:28.279973+00:00 heroku[router]: at=info method=GET path="/robots.txt" host=s4vitar.herokuapp.com request_id=750ddd73-a1f7-4616-9827-119e5b3f280e fwd="XX.XXX.XXX.160" dyno=web.1 connect=1ms service=2ms status=404 bytes=372 protocol=http
2020-02-03T11:15:28.375122+00:00 heroku[router]: at=info method=GET path="/index.html" host=s4vitar.herokuapp.com request_id=e9db6b57-a2dc-406f-9d09-2549f65d429a fwd="XX.XXX.XXX.160" dyno=web.1 connect=1ms service=2ms status=200 bytes=233 protocol=http
2020-02-03T11:15:28.714967+00:00 heroku[router]: at=info method=GET path="/favicon.ico" host=s4vitar.herokuapp.com request_id=4bfb04e1-3b32-46a7-b0a0-3208e321596e fwd="XX.XXX.XXX.160" dyno=web.1 connect=1ms service=2ms status=404 bytes=373 protocol=http
2020-02-03T11:15:28.715303+00:00 app[web.1]: 10.111.222.196 - - [03/Feb/2020:11:15:28 +0000] "GET /favicon.ico HTTP/1.1" 404 209 "http://s4vitar.herokuapp.com/index.html" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36
```

Ya en este punto, podéis comenzar con la conversación encubierta. 

Lo único que tenéis que hacer es lo siguiente: Abrid una conversación en WhatsApp con alguno de vuestros contactos, haced como si fuerais a enviar un mensaje a vuestro compañero escribiendo la dirección URL (en este caso la mía como PoC) [http://s4vitar.herokuapp.com/](http://s4vitar.herokuapp.com/) y posteriormente escribid vuestro mensaje pegado a la barra `/`, por ejemplo:

<p align="center">
<img src="/assets/images/whatsapp-canal-encubierto/whatsapp-victor.jpg">
</p>

Inmediatamente tras introducir los nuevos caracteres después de la barra `/`, empezaréis a ver desde el `heroku logs` a tiempo real los caracteres que se están escribiendo, sin enviar el mensaje a nuestro contacto:

<p align="center">
<img src="/assets/images/whatsapp-canal-encubierto/logs-heroku.jpg">
</p>

De hecho si os fijáis, se puede considerar también un posible `IP Disclosure`, dado que podemos ver direcciones IP internas de WhatsApp:

* 10.142.192.223
* 10.99.209.116
* 10.47.180.171

La idea en este punto, sería que nuestro compañero tuviera también descargado nuestro repositorio en local para efectuar el comando `heroku logs` y poder así también visualizar los logs a tiempo de escritura. De esta forma, resulta sencillo montarse un pequeño script en `Bash` u otro lenguaje que parsee la información más relevante, seguido de ciertas reglas que habría que configurar para por ejemplo configurar los nombres de usuario, espacios y algunas cosas adicionales (no es muy costoso).

Lo mejor de esto es que nunca estaremos enviando el mensaje a la persona en cuestión, pues todo esto se hace mientras escribimos antes de enviar.

## ¿Por qué sucede esto?

Cuando enviamos un mensaje a una persona en la que hay incluida una dirección URL, se carga una previsualización de la página antes de enviarlo. De esta forma, ya se está tramitando a nivel de petición un `GET` contra el servidor para obtener así la preview. 

Lo mismo pasaría con el resto de caracteres, por cada caracter que introducimos, es un `GET` que se aplica hacia el servidor, lo que hace que si estamos a la escucha desde el lado del servidor atendiendo a los logs veamos esas peticiones entrantes.

Esto por defecto no sólo pasa en WhatsApp, también ocurre en Twitter, Telegram y otras plataformas.








