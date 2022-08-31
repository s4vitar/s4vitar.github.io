---
layout: single
title: DOM XSS in document.write sink using source location.search – PortSwigger Write Up
excerpt: "En este post vamos a estar resolviendo el laboratorio: “DOM XSS in document.write sink using source location.search”:
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

En este post vamos a estar resolviendo el laboratorio: “DOM XSS in document.write sink using source location.search”:

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_document.write_sink_using_source/1.png" width="1000">
</p><br>

Cuando abrimos el lab, lo primero que nos encontramos es la siguiente web:

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_document.write_sink_using_source/2.png" width="1000">
</p><br>

Hay una barra de búsqueda, por lo que vamos a probar a simplemente buscar algo:

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_document.write_sink_using_source/3.png" width="1000">
</p><br>


<p align="center">
     <img src="/assets/images/portswigger/dom_xss_document.write_sink_using_source/4.png" width="1000">
</p><br>

Cuando hacemos la búsqueda, si damos click derecho y vemos el código fuente del elemento de la palabra por la que hemos buscado, podremos ver que se sitúa en el atributo src de una imagen.

Observando el como se implementa nuestro input en el código fuente, podemos enviar un payload especializado que se escape del tag <img>.

Por ejemplo vamos a usar:
```plaintext
❯ "><script>alert(”XSS”)</script>//
```

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_document.write_sink_using_source/5.png" width="1000">
</p><br>

Cuando hemos escrito nuestro payload, simplemente volvemos a hacer una búsqueda:

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_document.write_sink_using_source/6.png" width="1000">
</p><br>

Y como vemos, se nos ejecuta el código que hemos introducido. El código fuente se vería ahora de la siguiente forma:

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_document.write_sink_using_source/7.png" width="1000">
</p><br>

Como vemos, nuestro input ya no se encuentra dentro del `<img>`, ya que hemos conseguido cerrar el elemento para escribir código JavaScript.

Con esto hecho, conseguimos resolver el laboratorio:

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_document.write_sink_using_source/8.png" width="1000">
</p><br>


¡Un saludo y espero que os sirva de apoyo!
