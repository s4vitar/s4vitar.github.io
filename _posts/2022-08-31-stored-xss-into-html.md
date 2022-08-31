---
layout: single
title: Stored XSS into HTML context with nothing encoded – PortSwigger Write Up
excerpt: "En este post vamos a estar resolviendo el laboratorio de PortSwigger: “Stored XSS into HTML context with nothing encoded."
date: 2022-08-31
classes: wide
#header:
#  teaser: /assets/images/portswigger/stored_xss_into_html_context_with_nothing_encoded/portada.png
#  teaser_home_page: true
categories:
  - Portswigger
tags:
  - Burpsuite
  - JavaScript
  - XSS
---

En este post vamos a estar resolviendo el laboratorio de PortSwigger: "Stored XSS into HTML context with nothing encoded."

<p align="center">
     <img src="/assets/images/portswigger/stored_xss_into_html_context_with_nothing_encoded/1.png" width="1000">
</p><br>


Para resolver el laboratorio tenemos que realizar un Cross-site-Scripting (XSS) que llame a una `función alert` en un comentario de una publicación.

Cuando entramos en el laboratorio lo primero que tenemos que hacer es dirigirnos a un post cualquiera.

<p align="center">
     <img src="/assets/images/portswigger/stored_xss_into_html_context_with_nothing_encoded/2.png" width="1000">
</p><br>

Dentro del post, encontramos lo siguiente:

<p align="center">
     <img src="/assets/images/portswigger/stored_xss_into_html_context_with_nothing_encoded/3.png" width="1000">
</p><br>

Como podemos ver tenemos la opción de dejar un comentario, y distintos campos a rellenar.

Por lo que nosotros simplemente vamos a hacerle caso, y vamos a rellenar todos los campos, eso si, en el campo del comentario, colocaremos un pequeño código JavaScript que nos ejecute un `alert`:

<p align="center">
     <img src="/assets/images/portswigger/stored_xss_into_html_context_with_nothing_encoded/4.png" width="1000">
</p><br>

Con todos los campos rellenados, simplemente enviamos el comentario y habremos resuelto el laboratorio:

<p align="center">
     <img src="/assets/images/portswigger/stored_xss_into_html_context_with_nothing_encoded/5.png" width="1000">
</p><br>

Para ver que ha ocurrido, vamos a volver al post done hemos escrito nuestro comentario:

<p align="center">
     <img src="/assets/images/portswigger/stored_xss_into_html_context_with_nothing_encoded/6.png" width="1000">
</p><br>

<p align="center">
     <img src="/assets/images/portswigger/stored_xss_into_html_context_with_nothing_encoded/7.png" width="1000">
</p><br>

Y como vemos, al entrar en el post, se nos ejecuta el código que habíamos escrito en el campo de comentario. Acabamos de explotar un `Stored XSS`.

<p align="center">
     <img src="/assets/images/portswigger/stored_xss_into_html_context_with_nothing_encoded/8.png" width="1000">
</p><br>


¡Un saludo y espero que os sirva de apoyo!
