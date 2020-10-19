---
layout: single
title: Mi experiencia con la certificación eWPTxv2
excerpt: "Recientemente me he sacado la certificación eWPTxv2, ¿qué tan difícil es?, ¿merece la pena pagar por esta certificación?"
date: 2020-10-14
classes: wide
header:
  teaser: /assets/images/eWPTxv2/eWPTxv2.png
  teaser_home_page: true
categories:
  - Certificaciones
  - Utilidades
tags:
  - Pentesting
  - eWPTXv2
  - Web Exploiting
  - Web Penetration Testing
  - Examen
---

<p align="center">
<img src="/assets/images/eWPTxv2/eWPTxv2.jpeg">
</p>

## Certificación eWPTxv2

### Mi experiencia personal

Ya era hora de redactar este artículo... entre tantas cosas en las que ando metido no he podido sacar un rato para comentaros mi experiencia con esta certificación. Ahora que estoy algo menos ajetreado en esta noche de inspiración... vamos a analizar qué es lo que está pasando aquí. 

La certificación **eWPTXv2**, ¿merece la pena?, pues mi respuesta es un 'si'. La verdad es que ha sido una certificación desafiante, sobre todo a la hora de hacer el examen, porque me encontré con más cosas de las que me pensaba que habrían y la verdad es que hubo un puro mixto de vulnerabilidades a explotar. 

Para que tengáis una idea de cosillas que llegué a explotar, pues hubieron desde inyecciones SQL, hasta ataques Blind XXE, ataques de deserialización combinados con vulnerabilidades de tipo SSRF para conseguir RCE, ataques XSS, Object Serialization y otras muchas cosas más. 

La dinámica del examen es algo distinta a la que tiene por ejemplo Offensive Security, me refiero, en vez de ponerte una serie de objetivos acompañados con un Score para saber en todo momento si llegas a la nota para aprobar o no, esto es más a lo... 'Tú encuentra todo lo que puedas, que ya luego nosotros revisamos el informe final y en base a lo que hayas encontrado decidimos'.

### ¿Qué me pareció el laboratorio?

Respecto al laboratorio, he de deciros que no puedo comentar nada al respecto, me hubiera gustado probarlo... pero quise aprovechar un cupón que salió en el mes de Septiembre para el Voucher, donde se te quedaba el precio a 300 euros... por lo que decidí ir directo al examen. Ir directo al examen supone que no te entregan documentación ni nada por el estilo, porque estás pagando únicamente para hacer el examen. 

Fue algo arriesgado probar a examinarse sin tener previo material, pero oye... si la jugada salía bien, pues chimpún y pa' dentro, de lo contrario en el peor de los casos pues ya pagaba el curso más adelante y le metía más caña, ¡pero el que no arriesga no gana!.

### ¿Es difícil la certificación?

Para aquel o aquella que tenga planteado examinarse de esta certificación, recomiendo de antes tener buenas bases previas sobre pentesting web (ojo, hablo sobre todo si pretendes ir directo al examen). Recomiendo haber teniendo experiencia y manejo al menos sobre los siguientes tipos de vulnerabilidades:

* Inyecciones SQL (Manuales)
* Xml External Entity Injections XXE (Incluido Blind XXE)
* Server-Side Request Forgery (SSRF)
* Cross-Site Request Forgery (CSRF)
* Java Deserialization Attacks (Y otros tipos de ataques de deserialización)
* Template Injections
* Cross-Site Scripting (XSS)  [Todos los tipos]
* Authorization Bypass
* Padding Oracle Attack
* Local File Inclusion (LFI)
* Remote File Inclusion (RFI)
* Type Juggling

Entre otras muchas más que probablemente me esté dejando en el tintero, pero por lo menos las fundamentales que son con las que más frecuencia trataréis. También recomiendo tener cierto dominio y control sobre los lenguajes Python y PHP, pues en ocasiones os vais a tener que crear vuestras propias utilidades para explotar ciertas vulnerabilidades.

Con tener dominio de estos lenguajes, me refiero no sólo a nivel de programación, sino también a nivel de entender qué puede estar haciendo un código por detrás... tratando de reversearlo o aprovechar el mismo para computar ciertas cosas (Si doy más pistas es Spoiler, así que preferible dejarlo en el aire xD).

### ¿Cómo es el examen?

La idea del examen es la siguiente, te dan un acceso por VPN y te piden que efectúes un análisis de vulnerabilidades sobre un dominio que cuenta con tres subdominios. El análisis de vulnerabilidades comprende no sólo la identificación de las vulnerabilidades, sino también la explotación de las mismas.

Aislado a todo lo que encuentres, sí que es cierto que hay una serie de requisitos que tienes que cumplir para lograr aprobar el examen, aunque lo indican como "Los requisitos necesarios pero no suficientes para aprobar...". 

Estos son:

* Leer cierto archivo alojado en una ruta interna del sistema.
* Conseguir ejecución remota de comandos mediante la explotación de dos servicios que corren en la máquina, accesibles desde el servidor web.

Si consigues estos objetivos y encima encuentras un buen puñado de vulnerabilidades extra, yo diría que ya te puedes quedar tranquilo/a. Recordad que no hay puntuación, no hay una nota en si que podáis calcular para saber más o menos el Score que podáis estar sacando, la idea es más bien encontrar todo lo que puedas.

Bajo mi experiencia, he de decir que llegué a explotar algunas vulnerabilidades que me parecieron flipantes, en el sentido de que igual me esperaba que las vulnerabilidades a explotar iban a ser algo más sencillas, pero en absoluto... hay alguna que otra que te puede hacer perder bastante tiempo, sobre todo una que llevaré siempre conmigo en el corazón con la que estuve casi un día entero para sacarla (mucha metodología de prueba/error).

### ¿Cuánto dura el examen?

El examen dura un total de siete días. En mi caso necesité cuatro días para encontrar todas las vulnerabilidades que pude y un día para generar el informe final. Efectivamente chavales, lo que tanto nos gusta a todos, una vez finalizas es necesario detallar todo lo encontrado a través de un reporte técnico y ejecutivo, incorporando las capturas de pantalla necesarias y las pruebas de concepto de todo lo que hayas hecho.

Aislado al examen, la fase de documentación son otros siete días aparte, pero bueno en ese aspecto fui bastante rápido porque ya había estado previamente trabajando en una plantilla hecha en LaTeX para ir a tiro hecho (igual que en el OSCP), así que la documentación fue lo que menos me llevó. En conclusión, contando con los días para la examinación y la creación del reporte final, el examen son unos catorce días, pero una vez finalizados los siete primeros días del examen, te cortan la conexión por VPN.

### ¿Qué toca ahora?

He estado pensando en hacer el AWAE (OSWE) de Offensive Security, así en caso de sacarla os puedo comentar diferencias con respecto a la certificación eWPTXv2, porque por el momento no puedo hacer distinción.

Como siempre, en paralelo seguiré subiendo vídeos al canal de YouTube y generando todo el contenido que pueda para vosotros.

¡A cuidarse!


