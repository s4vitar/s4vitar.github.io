---
layout: single
title: Reflected XSS into HTML context with nothing encoded – PortSwigger Write Up
excerpt: "En este post vamos a estar resolviendo el laboratorio de PortSwigger: “Reflected XSS into HTML context with nothing encoded."
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

En este post vamos a estar resolviendo el laboratorio de PortSwigger: “Reflected XSS into HTML context with nothing encoded."

<p align="center">
     <img src="/assets/images/portswigger/xss_into_html_context_with_nothing_encoded/1.png" width="1000">
</p><br>


Para resolver el laboratorio tenemos que realizar un Cross-site-Scripting (XSS) que llame a una función alert.

Cuando entramos en el laboratorio, vemos un campo de búsqueda:

<p align="center">
     <img src="/assets/images/portswigger/xss_into_html_context_with_nothing_encoded/2.png" width="1000">
</p><br>

Vamos a probar a buscar cualquier cosa:

<p align="center">
     <img src="/assets/images/portswigger/xss_into_html_context_with_nothing_encoded/3.png" width="1000">
</p><br>

Como podemos observar en la siguiente imagen en la **URL**, hemos buscado **hola** para ver que nos responde la web.

<p align="center">
     <img src="/assets/images/portswigger/xss_into_html_context_with_nothing_encoded/4.png" width="1000">
</p><br>

Si nos fijamos, el término de búsqueda se ve reflejado en la web. Por lo que, podemos probar a meter un código Javascript usando el atributo onerror en el tag <img>.

De tal forma, que si falla al cargar la imagen que especificamos en el atributo src, se nos ejecutará lo que escribimos en onerror:

<p align="center">
     <img src="/assets/images/portswigger/xss_into_html_context_with_nothing_encoded/5.png" width="1000">
</p><br>

**Laboratorio resuelto**
<p align="center">
     <img src="/assets/images/portswigger/xss_into_html_context_with_nothing_encoded/6.png" width="1000">
</p><br>

¡Un saludo y espero que os sirva de apoyo!
