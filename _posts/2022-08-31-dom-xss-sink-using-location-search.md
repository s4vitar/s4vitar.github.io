---
layout: single
title: DOM XSS in innerHTML sink using source location.search – PortSwigger Write Up
excerpt: "En este post vamos a estar resolviendo el laboratorio: “DOM XSS in innerHTML sink using source location.search”:
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

En este post vamos a estar resolviendo el laboratorio: “DOM XSS in innerHTML sink using source location.search”:

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_innerhtml_sink_using_source_location.search/1.png" width="1000">
</p><br>

Lo primero de todo como siempre es acceder al laboratorio:

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_innerhtml_sink_using_source_location.search/2.png" width="1000">
</p><br>

Una vez accedido, vemos una barra de búsqueda. Por lo que vamos a buscar cualquier cosa:

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_innerhtml_sink_using_source_location.search/3.png" width="1000">
</p><br>


<p align="center">
     <img src="/assets/images/portswigger/dom_xss_innerhtml_sink_using_source_location.search/4.png" width="1000">
</p><br>

Si nos fijamos, lo que hemos buscado se ve reflejado en la web. Y si damos click derecho y vemos la parte del código fuente donde se situa, vemos que se almacena en el innerHTML del tag <span>.

Por lo que conociendo esto, podemos intentar usar en la búsqueda un payload especialmente diseñado para escaparnos de este tag, y ejecutar código Javascript. Por ejemplo, usaremos el siguiente payload:


Por ejemplo vamos a usar:
```plaintext
❯ </span><img src=/ onerror=alert(1) />//
```

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_innerhtml_sink_using_source_location.search/5.png" width="1000">
</p><br>

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_innerhtml_sink_using_source_location.search/6.png" width="1000">
</p><br>

Al buscar por él, podemos ver como se nos ejecuta con éxito el payload. Hemos pasado de:

```plaintext
❯ <span id=”searchMessage”>hola</span>
```
a esto:

```plaintext
❯ <span id=”searchMessage”></span><img src=/ onerror=alert(1) />//</span>
```

<p align="center">
     <img src="/assets/images/portswigger/dom_xss_innerhtml_sink_using_source_location.search/7.png" width="1000">
</p><br>

¡Un saludo y espero que os sirva de apoyo!
