---
layout: single
title: DOM XSS in jQuery anchor href attribute sink using location.search source – PortSwigger Write Up
excerpt: "En este post vamos a estar resolviendo el laboratorio: “DOM XSS in jQuery anchor href attribute sink using location.search source”:
"
date: 2022-08-31
classes: wide
#header:
#  teaser: /assets/images/portswigger/xss_into_html_context_with_nothing_encoded/portada.png
#  teaser_home_page: true
categories:
  - Portswigger
tags:
  - Burpsuite
  - JavaScript
  - XSS
---

En este post vamos a estar resolviendo el laboratorio: “DOM XSS in jQuery anchor href attribute sink using location.search source”:

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_in_jquery_ anchor_href_attribute_sink_using_location.search_source/1.png" width="1000">
</p><br>

En este caso, para resolver el laboratorio tenemos que ejecutar un `alert` que nos devuelva las cookies.

Lo primero de todo es acceder al laboratorio:

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_in_jquery_ anchor_href_attribute_sink_using_location.search_source/2.png" width="1000">
</p><br>

Una vez accedidos, nos dirigimos a la parte de enviar feedback, ya que, en el enunciado es donde se nos indica que se encuentra el XSS:

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_in_jquery_ anchor_href_attribute_sink_using_location.search_source/3.png" width="1000">
</p><br>


<p align="center">
     <img src="/assets/images/portswigger/dom_xss_in_jquery_ anchor_href_attribute_sink_using_location.search_source/4.png" width="1000">
</p><br>


Cuando accedemos, si nos fijamos en la `URL`, podemos ver que de forma por defecto se nos añade el parámetro `returnPath`:


<p align="center">
     <img src="/assets/images/portswigger/dom_xss_in_jquery_ anchor_href_attribute_sink_using_location.search_source/5.png" width="1000">
</p><br>

Vamos a probar a añadirle cualquier valor al parámetro:

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_in_jquery_ anchor_href_attribute_sink_using_location.search_source/6.png" width="1000">
</p><br>

En principio no pasa nada, pero si ponemos el ratón encima del hiperenlace de “Back”:

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_in_jquery_ anchor_href_attribute_sink_using_location.search_source/7.png" width="1000">
</p><br>

Vemos como el valor que hemos colocado en la variable, se implemente en el atributo href de este elemento. Por lo que es tan sencillo como colocar un payload que nos ejecute el alert cuando demos click en el botón:

```plaintext
❯ javascript:alert(document.cookie)
```

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_in_jquery_ anchor_href_attribute_sink_using_location.search_source/8.png" width="1000">
</p><br>

Como vemos, conseguimos resolver el laboratorio, y desde el punto de vista del código fuente, lo que hemos conseguido es lo siguiente:

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_in_jquery_ anchor_href_attribute_sink_using_location.search_source/9.png" width="1000">
</p><br>

Ahora, si damos click en el hiperenlace “Back”:

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_in_jquery_ anchor_href_attribute_sink_using_location.search_source/10.png" width="1000">
</p><br>

Se nos ejecutará el código Javascript que hemos indicado:

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_in_jquery_ anchor_href_attribute_sink_using_location.search_source/11.png" width="1000">
</p><br>

¡Un saludo y espero que os sirva de apoyo!
