---
layout: single
title: Exposición de datos médicos en hospitales
excerpt: "Durante los últimos meses, hemos visto noticias por todos lados de datos médicos de pacientes los cuales han quedado expuestos por internet. Es algo alarmante pero no sorprendente teniendo en cuenta cómo está la seguridad a día de hoy. En el siguiente artículo, os explico en qué consiste este `gran fallo` y cómo es posible que estos datos queden expuestos al alcance de cualquiera."
date: 2020-01-29
classes: wide
header:
  teaser: /assets/images/hospital-dicom/dicom.png
  teaser_home_page: true
categories:
  - Research
tags:
  - Hospitales
  - Dicom
  - Radiant
---

![](/assets/images/hospital-dicom/dicom.png)

Durante los últimos meses, hemos visto noticias por todos lados de datos médicos de pacientes los cuales han quedado expuestos por internet. Es algo alarmante pero no sorprendente teniendo en cuenta cómo está la seguridad a día de hoy. 

En el siguiente artículo, os explico en qué consiste este "gran fallo" y cómo es posible que estos datos queden expuestos al alcance de cualquiera.

## Antecedentes

La creciente tendencia hacia la digitalización de los hospitales, especialmente en el diagnóstico por imagen y la necesidad de comunicaciones médicas, ha puesto de relieve la necesidad de estandarizar los protocolos de comunicación y los formatos de la información en sanidad. 

Uno de los estándares más exitosos hasta la fecha es **DICOM** (siglas de Digital Imaging and Communications in Medicine).

**DICOM** es un protocolo estándar de comunicación entre sistemas de información y a la vez un formato de almacenamiento de imágenes médicas que aparece como solución a los problemas de interoperabilidad entre tipos de dispositivos.

Una imagen médica por sí misma no aporta suficiente información... para que sea correctamente interpretada es necesario que vaya acompañada de datos del paciente y de la adquisición, entre otras cosas. Por eso formatos tradicionales como el .jpeg o el .png se quedan cortos.

## ¿Dónde está el problema de todo esto?

El problema reside en que una gran cantidad de estos servicios están expuestos en internet, visibles desde Shodan:

![](/assets/images/hospital-dicom/dicom-shodan.png)

Asimismo, para los que ya hayáis usado Shodan otras veces... como bien sabréis, es posible hasta ajustar nuestras `queries` con ciertos parámetros adicionales:

![](/assets/images/hospital-dicom/dicom-shodan-filter.png)

Y aquí es donde viene la pregunta, ¿cómo me conecto ahora al servicio?, gran pregunta Myke. 

**Radiant DICOM Viewer** es una aplicación para el procesamiento y visualizacion de imágenes médicas en formato DICOM. El visor permite a los usuarios abrir los estudios de CD / DVD / discos BluRay, la memoria flash, carpetas locales y de red. 

Puedes descargar el Software con un periodo de prueba de 30 días a través del siguiente enlace:

- [Descargar Software](https://www.radiantviewer.com/es/)

Como podrás intuir, efectivamente... es a través de esta aplicación con la que nos podremos autenticar contra estos servidores.

Para evitar problemas, no voy a explicar el procedimiento para llevar a cabo la conexión... porque obviamente la asociación no es directa, hay que toquetear ciertas cosas y cambiar algunos métodos que ya vienen por defecto configurados con otros valores no deseados. Lo que sí que os puedo decir, es que es ya desde este Software con el que nos podemos asociar tranquilamente a estos servidores.

Os voy a mostrar un ejemplo de qué es lo que se vería una vez estando asociados a uno de ellos:

![](/assets/images/hospital-dicom/dicom-connected.png)

Como podréis ver, se obtiene una lista de todos los pacientes (**134 pacientes**) del centro médico en cuestión. Figuran numerosos campos, entre ellos el nombre del paciente, el tipo de reconocimiento médico que se está aplicando, su fecha de nacimiento, número de teléfono y otros datos de contacto.

Como os dije anteriormente, **Radiant DICOM Viewer** sirve para procesar y visualizar imágenes médicas en formato DICOM. En caso de querer ver estas imágenes médicas, basta con hacer doble click en el paciente cuyos informes médicos queramos consultar:

![](/assets/images/hospital-dicom/dicom-radiografia.png)

Al tratarse de una imagen, en este artículo no se aprecia, pero cada muestra viene acompañada de múltiples capturas, pudiendo ver una animación de la resonancia al presionar la tecla `Enter`.

De hecho, en caso de que una muestra posea múltiples capturas, se puede hacer incluso un modelaje 3D en base a los resultados obtenidos:

![](/assets/images/hospital-dicom/dicom-3d.png)

## ¿Qué demonios está pasando aquí?

Muy buena pregunta, porque hasta yo mismo lo desconozco. Hasta donde he podido leer, todos estos servidores DICOM al parecer están expuestos públicamente con el objetivo de agilizar el "traspaso del historial médico de un paciente" de un centro médico a otro.

Es decir, imagina que por algún casual te tienen que enviar a otro hospital... pues en vez de enviar los resultados por correo (que tampoco sería óptimo), lo que hacen es transferir el expediente mediante el protocolo DICOM públicamente desde el propio centro médico al nuevo hospital. De hecho ni hace falta transferir datos, porque con tener la IP pública es simplemente asociarse y ya poder sacar el listado de pacientes... te buscarían y listo.

La verdadera "metedura de pata", por así decirlo, es que DICOM no cuenta con autenticación, por lo que si está expuesto públicamente, no es necesario proporcionar usuario y contraseña para asociarse. Buena esa.













