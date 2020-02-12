---
layout: single
title: Falsificación de mensajes en WhatsApp
excerpt: "En este artículo, os muestro cómo es posible manipular los mensajes de otras personas en WhatsApp, explotando para ello un bug que a día de hoy sigue funcionando."
date: 2020-02-10
classes: wide
header:
  teaser: /assets/images/whatsapp-fake-messages/whatsapp.jpg
  teaser_home_page: true
categories:
  - Research
tags:
  - WhatsApp
  - Manipulación
  - Bug
---

<center>
<img src="/assets/images/whatsapp-fake-messages/whatsapp.jpg">
</center>

## ¿Cómo reproducir este bug?

Antes que nada, vamos a darle los buenos créditos al señor [@RiftWhiteHat](https://twitter.com/RiftWhiteHat), que fue el que me enseñó esta maravilla bajo la cual pueden surgir investigaciones para todo aquel que le quiera meter mano y tal vez descubrir nuevas cosas.

Comenzamos presionando la combinación `Ctrl+Shift+C`. Posteriormente, nos dirigimos a la pestaña `Sources` desde WhatsApp Web:

<center>
<img src="/assets/images/whatsapp-fake-messages/step1.jpg">
</center>

<br>
Una vez hecho, nos iremos a la pestaña `Search` situada en la zona inferior y buscaremos la cadena `Promise.callSynchronously(function()`

<center>
<img src="/assets/images/whatsapp-fake-messages/step2.jpg">
</center>

<br>
Veremos que se produce un match. Haremos click en el resultado obtenido y posteriormente en la zona superior seleccionamos el modo de visión `Pretty Print` para que no nos sangren los ojos:

<center>
<img src="/assets/images/whatsapp-fake-messages/step3.jpg">
</center>

<br>
Ya en este punto, presionaremos la combinación de teclas `Ctrl+F` y buscaremos nuevamente por la cadena `Promise.callSynchronously(function()`. En esta ocasión, buscaremos el segundo match que se produzca:

<center>
<img src="/assets/images/whatsapp-fake-messages/step4.jpg">
</center>

<br>

Posteriormente, establecemos un `Breakpoint` en la sección `var t = e.id;`, haciendo para ello click en el número de la línea:

<center>
<img src="/assets/images/whatsapp-fake-messages/step5.jpg">
</center>

<br>

Ahora, lo que haremos será lo siguiente. Nos iremos a una conversación cualquiera con uno de nuestros compañeros, seleccionaremos cualquier mensaje que nos haya enviado y le daremos a `Responder` para hacer mención a ese comentario.

Escribiremos como respuesta lo que queramos, yo en este caso he escrito `No sé si conocerás el canal de S4vitar`. Tras enviar el mensaje, veremos que alcanzamos el `Breakpoint` y que el mensaje no llega a enviarse:

<center>
<img src="/assets/images/whatsapp-fake-messages/step6.jpg">
</center>

<br>

Si nos vamos a la pestaña `Console` dentro de la pestaña `Sources`, veremos que en este preciso instante podemos desglosar `e`, pudiendo así ver todos los atributos que hacen referencia a la conversación que estamos llevando a cabo:

<center>
<img src="/assets/images/whatsapp-fake-messages/step7.jpg">
</center>

<br>

En este caso, muestro sólo una porción para no compartir información privilegiada.

Ya en este punto, podremos manipular el mensaje de mención al que estamos respondiendo de la siguiente forma:

<center>
<img src="/assets/images/whatsapp-fake-messages/step8.jpg">
</center>

<br>

Lo único que tendremos que hacer posteriormente es darle al `Play` para que el mensaje siga su flujo y salgamos del `Breakpoint`:

<center>
<img src="/assets/images/whatsapp-fake-messages/step9.jpg">
</center>

<br>

Una vez hecho, podremos ver lo siguiente:

<center>
<img src="/assets/images/whatsapp-fake-messages/step10.jpg">
</center>

<br>

Hemos falsificado el mensaje al cual hacemos mención, haciendo creer al destinatario que nos ha escrito ese mensaje cuando no es así.

Todo esto desde WhatsApp web, y te preguntarás... ¿cómo se ve desde el móvil?, pues se vería exactamente igual:

<center>
<img src="/assets/images/whatsapp-fake-messages/step11.jpg" width="400">
</center>

<br>

Como veis, es un bug que a día de hoy se puede seguir explotando. De hecho, atendiendo a los atributos de la variable `e`, podréis ver que en verdad las posibilidades son infinitas.

Existen montón de valores que se pueden alterar, los cuales han llegado incluso a ocasionar Crasheos de la propia aplicación, como podréis ver en el siguiente artículo:

* [https://research.checkpoint.com/2019/breakingapp-whatsapp-crash-data-loss-bug/](https://research.checkpoint.com/2019/breakingapp-whatsapp-crash-data-loss-bug/)

Este último en concreto ha sido parcheado, sin embargo sólo en el ámbito grupal (grupos de WhatsApp), en el sentido de que ya no afecta a los componentes de un grupo, sino al propio emisor del mensaje especialmente diseñado:

<center>
<img src="/assets/images/whatsapp-fake-messages/step12.jpg" width="400">
</center>

<br>

¡Dejo en vuestras manos la investigación para que encontréis cosas chulas!
