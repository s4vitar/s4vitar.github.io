---
layout: single
title: Bypassing de validación en Chatroulette
excerpt: "Hoy os vengo a mostrar un bypassing de lo más absurdo en la plataforma de Chatroulette. Supongo que sabréis que a la hora de entrar en Chatroulette se lleva a cabo una especie de validación, donde te piden que sonrías para que tu cara quede registrada en el sistema y posteriormente puedas acceder. Pues atentos a la jugada."
date: 2020-01-30
classes: wide
header:
  teaser: /assets/images/chatroulette-bypass/chatroulette-main.jpg
  teaser_home_page: true
categories:
  - Research
tags:
  - Chatroulette
  - Burpsuite
  - Bypassing
---

![](/assets/images/chatroulette-bypass/chatroulette-main.jpg)

Hoy os vengo a mostrar un bypassing de lo más absurdo en la plataforma de Chatroulette. Supongo que sabréis que a la hora de entrar en Chatroulette se lleva a cabo una especie de validación, donde te piden que sonrías para que tu cara quede registrada en el sistema y posteriormente puedas acceder. Pues atentos a la jugada.

# Antecedentes

Resulta que estaba yo tan tranquilo dispuesto a buscar a **Julio Ureña** en la plataforma de Chatroulette, cuando vi que para empezar a conectar con gente se me solicitaba la siguiente información:

<p align="center">
<img src="/assets/images/chatroulette-bypass/smile.jpg">
</p>

Al parecer debes de sonreir frente a la cámara para ya comenzar a usar el servicio. Esta fase me interesó mucho, ¿de qué forma se hace la validación?... es lo que mi mente inquieta se preguntaba.

Dado que `Burpsuite` siempre responde a estas preguntas, probé a tirar de nuestro querido proxy para ver cómo viajaban las consultas. Desde que presionas `Start`, empiezan a viajar una serie de WebSockets con valores que identifican entre otras cosas nuestro `UserToken`:

<p align="center">
<img src="/assets/images/chatroulette-bypass/burp-first.png">
</p>

Justo en el momento en el que se comienza a buscar una sonrisa del lado de nuestra cámara, se inicia un proceso de `ClientPing`, bajo el cual se saca un Snapshot para posteriormente del lado del servidor interpretar la imagen :

<p align="center">
<img src="/assets/images/chatroulette-bypass/clientping.png">>
</p>

## Checking absurdo

La gran fase de validación viene ahora. Si presionamos varias veces en `Forward`, de pronto podremos notar algo que llama mucho la atención:

<p align="center">
<img src="/assets/images/chatroulette-bypass/base64.png">
</p>

La misma pregunta que te estás haciendo es la que me hice yo en su momento, ¿qué demonios es esto?. 

Bueno pues este churraco... es un base64 más grande que mi casa, y lo que más llama la atención es el tipo de archivo que representa una vez se decodifica desde consola:

```bash
┌─[s4vitar@parrot]─[~/Desktop]
└──╼ $cat file | base64 -d > content
┌─[s4vitar@parrot]─[~/Desktop]
└──╼ $file content 
content: PNG image data, 640 x 480, 8-bit/color RGBA, non-interlaced
```

Efectivamente, una imagen, ¿y a qué corresponde esta imagen?, a la instantánea que se realiza:

<p align="center">
<img src="/assets/images/chatroulette-bypass/instantanea-base64.png">>
</p>

## Bypassing de la sonrisa

¿Cómo hacemos por tanto para bypassear este sistema de validación y no tener que sonreir de nuestro lado para conectar con Julio?, pues bueno... simplemente tendríamos que coger una foto cualquiera de internet en la que salga alguien sonriendo:

<p align="center">
<img src="/assets/images/chatroulette-bypass/smile-girl.jpeg">
</p>

La pasamos a base64 desde consola:

```bash
┌─[s4vitar@parrot]─[~/Desktop]
└──╼ $cat smile-girl.jpeg | base64 -w 0 | xclip -sel clip
┌─[s4vitar@parrot]─[~/Desktop]
└──╼ $
```

Y sustituimos el nuevo valor en base64 por el que previamente Burpsuite nos ha interceptado. 

Tras hacerlo, la validación se habrá aplicado y ya podremos empezar a conectar con los demás sin haber sido necesario de nuestro lado sonreir y mostrar el rostro:

<p align="center">
<img src="/assets/images/chatroulette-bypass/man.jpg">
</p>

Posteriormente, estuvimos debatiendo este señor y yo la máquina BigHead de HackTheBox, donde me comentaba una vía no intencionada de explotación para acceder al sistema, un grande este señor.
