---
layout: single
title: Cómo construir tu propio sistema Linux
excerpt: "En este artículo, os enseño a crear vuestro propio sistema Linux desde cero, tomando completo control de las cosas que se instalan y arrancando el sistema como una nueva distribución."
date: 2020-04-23
classes: wide
header:
  teaser: /assets/images/s4viOS/s4viOS.png
  teaser_home_page: true
categories:
  - Configuración
  - Linux From Scratch
  - LFS
tags:
  - Linux
  - Linux From Scratch
  - LFS
  - Personalización
  - S4viOS
---

# Cómo construir tu propio sistema Linux (S4viOS)

![Portada OS](https://wallpaperaccess.com/full/981849.png)

Antes que nada, deciros que toda esta guía la tenéis también disponible en mi Gist, desde donde os podéis dirigir directamente a través del índice a la sección que queráis:

* [https://gist.github.com/s4vitar/8a2b18ec1f1b16226e21d4b89cbef270](https://gist.github.com/s4vitar/8a2b18ec1f1b16226e21d4b89cbef270)

Por alguna razón los eventos clickeables del índice desde esta página no son funcionales, así que cualquier cosa os podréis manejar por allí más cómodamente (No te olvides de dejar un Fav :P).

## Índice y Estructura Principal
- [Antecedentes](#Antecedentes)
- [Prerrequisitos](#Prerrequisitos)
- [Introducción](#Introducción)
     * [Consideraciones](#Consideraciones)
     * [Instalando Debian 10.3.0](#Instalando-Debian-10.3.0)
     * [Configurando el Debian base](#Configurando-el-Debian-base)
     * [Instalación de paquetes base](#instalación-de-paquetes-base)
          * [Bash 3.2](#bash)
          * [Binutils 2.25](#Binutils)
          * [Bison 2.7](#Bison)
          * [Bzip2 1.0.4](#Bzip2)
          * [Coreutils 6.9](#Coreutils)
          * [Diffutils 2.8.1](#Diffutils)
          * [Findutils 4.2.31](#Findutils)
          * [Gawk 4.0.1](#Gawk)
          * [GCC 6.2](#gcc)
          * [Glibc 2.11](#glibc)
          * [Grep 2.5.1](#Grep)
          * [Gzip 1.3.12](#Gzip)
          * [M4 1.4.10](#M4)
          * [Make 4.0](#Make)
          * [Patch 2.5.4](#Patch)
          * [Perl 5.8.8](#Perl)
          * [Python 3.4](#Python)
          * [Sed 4.1.5](#Sed)
          * [Tar 1.22](#Tar)
          * [Texinfo 4.7](#Texinfo)
          * [Xz 5.0.0](#Xz)
     * [Version Check](#version-check)
- [Creando nueva partición](#creando-nueva-partición)
     * [Estructurando la partición con parted](#Estructurando-la-partición-con-parted)
- [Descarga de paquetes para la creación del sistema base](#Descarga-de-paquetes-para-la-creación-del-sistema-base)
- [Construyendo un sistema temporal](#Construyendo-un-sistema-temporal)
     * [Creación de un nuevo usuario](#Creación-de-un-nuevo-usuario)
     * [Compilación de paquetes](#Compilación-de-paquetes)
          * [Compilación binutils](#Compilación-binutils)
          * [Compilación GCC](#Compilación-GCC)
          * [Compilación API Headers](#Compilación-API-Headers)
          * [Compilación Glibc](#Compilación-Glibc)
          * [Compilación Libstdc++ de GCC](#Compilación-Libstdc-de-GCC)
          * [Compilación Binutils Fase 2](#Compilación-Binutils-Fase-2)
          * [Compilación GCC Fase 2](#Compilación-GCC-Fase-2)
          * [Compilación Tcl](#Compilación-Tcl)
          * [Compilación Expect](#Compilación-Expect)
          * [Compilación DejaGNU](#Compilación-DejaGNU)
          * [Compilación M4](#Compilación-M4)
          * [Compilación Ncurses](#Compilación-Ncurses)
          * [Compilación Bash](#Compilación-Bash)
          * [Compilación Bison](#Compilación-Bison)
          * [Compilación Bzip2](#Compilación-Bzip2)
          * [Compilación Coreutils](#Compilación-Coreutils)
          * [Compilación Diffutils](#Compilación-Diffutils)
          * [Compilación File](#Compilación-File)
          * [Compilación Findutils](#Compilación-Findutils)
          * [Compilación Gawk](#Compilación-Gawk)
          * [Compilación Gettext](#Compilación-Gettext)
          * [Compilación Grep](#Compilación-Grep)
          * [Compilación Gzip](#Compilación-Gzip)
          * [Compilación Make](#Compilación-Make)
          * [Compilación Patch](#Compilación-Patch)
          * [Compilación Perl](#Compilación-Perl)
          * [Compilación Python](#Compilación-Python)
          * [Compilación Sed](#Compilación-Sed)
          * [Compilación Tar](#Compilación-Tar)
          * [Compilación Texinfo](#Compilación-Texinfo)
          * [Compilación Xz](#Compilación-Xz)
     * [Stripping](#Stripping)
     * [Cambio de propietario](#Cambio-de-propietario)
- [Construyendo el sistema LFS](#Contruyendo-el-sistema-LFS)
     * [Preparando el sistema de archivos del kernel virtual](#Preparando-el-sistema-de-archivos-del-kernel-virtual)
     * [Montaje del sistema de archivos del kernel virtual](#Montaje-del-sistema-de-archivos-del-kernel-virtual)
     * [Entrando en el entorno Chroot](#Entrando-en-el-entorno-Chroot)
          * [Creación de directorios](#Creación-de-directorios)
          * [Creación de archivos esenciales y Links Simbólicos](#Creación-de-archivos-esenciales-y-links-simbólicos)
     * [Instalación del Software básico del sistema](#Instalación-del-Software-básico-del-sistema)
          * [API Headers en LFS](#API-Headers-en-LFS)
          * [Man pages en LFS](#Man-pages-en-LFS)
          * [Glibc en LFS](#Glibc-en-LFS)
          * [Ajuste de la Toolchain](#Ajuste-de-la-Toolchain)
          * [Zlib en LFS](#Zlib-en-LFS)
          * [Bzip2 en LFS](#Bzip2-en-LFS)
          * [Xz en LFS](#Xz-en-LFS)
          * [File en LFS](#File-en-LFS)
          * [Readline en LFS](#Readline-en-LFS)
          * [M4 en LFS](#M4-en-LFS)
          * [Bc en LFS](#Bc-en-LFS)
          * [Binutils en LFS](#Binutils-en-LFS)
          * [GMP en LFS](#GMP-en-LFS)
          * [MPFR en LFS](#MPFR-en-LFS)
          * [MPC en LFS](#MPC-en-LFS)
          * [Attr en LFS](#Attr-en-LFS)
          * [Acl en LFS](#Acl-en-LFS)
          * [Instalación del Shadow](#Instalación-del-Shadow)
          * [GCC en LFS](#GCC-en-LFS)
          * [Pk-config en LFS](#Pk-config-en-LFS)
          * [Ncurses en LFS](#Ncurses-en-LFS)
          * [Sed en LFS](#Sed-en-LFS)
          * [Psmisc en LFS](#Psmisc-en-LFS)
          * [Iana Etc en LFS](#Iana-Etc-en-LFS)
          * [Bison en LFS](#Bison-en-LFS)
          * [Flex en LFS](#Flex-en-LFS)
          * [Grep en LFS](#Grep-en-LFS)
          * [Bash en LFS](#Bash-en-LFS)
          * [Libtool en LFS](#Libtool-en-LFS)
          * [GDBM en LFS](#GDBM-en-LFS)
          * [Gperf en LFS](#Gperf-en-LFS)
          * [Expat en LFS](#Expat-en-LFS)
          * [Inetutils en LFS](#Inetutils-en-LFS)
          * [Perl en LFS](#Perl-en-LFS)
          * [XML::Parser en LFS](#XML-Parser-en-LFS)
          * [Intltool en LFS](#Intltool-en-LFS)
          * [Autoconf en LFS](#Autoconf-en-LFS)
          * [Automake en LFS](#Automake-en-LFS)
          * [Kmod en LFS](#Kmod-en-LFS)
          * [Gettext en LFS](#Gettext-en-LFS)
          * [Libelf de Elfutils en LFS](#Libelf-de-elfutils-en-LFS)
          * [Libffi en LFS](#Libffi-en-LFS)
          * [Openssl en LFS](#Openssl-en-LFS)
          * [Python3 en LFS](#Python3-en-LFS)
          * [Ninja en LFS](#Ninja-en-LFS)
          * [Meson en LFS](#Meson-en-LFS)
          * [Coreutils en LFS](#Coreutils-en-LFS)
          * [Check en LFS](#Check-en-LFS)
          * [Diffutils en LFS](#Diffutils-en-LFS)
          * [Gawk en LFS](#Gawk-en-LFS)
          * [Findutils en LFS](#Findutils-en-LFS)
          * [Groff en LFS](#Groff-en-LFS)
          * [GRUB en LFS](#GRUB-en-LFS)
          * [Less en LFS](#Less-en-LFS)
          * [Gzip en LFS](#Gzip-en-LFS)
          * [Zstd en LFS](#Zstd-en-LFS)
          * [IPRoute en LFS](#IPRoute-en-LFS)
          * [Kbd en LFS](#Kbd-en-LFS)
          * [Libpipeline en LFS](#Libpipeline-en-LFS)
          * [Make en LFS](#Make-en-LFS)
          * [Patch en LFS](#Patch-en-LFS)
          * [Man DB en LFS](#Man-DB-en-LFS)
          * [Tar en LFS](#Tar-en-LFS)
          * [Texinfo en LFS](#Texinfo-en-LFS)
          * [Vim en LFS](#Vim-en-LFS)
          * [Procps-ng en LFS](#Procps-en-LFS)
          * [Util-Linux en LFS](#Util-Linux-en-LFS)
          * [E2fsprogs en LFS](#E2fsprogs-en-LFS)
          * [Sysklogd en LFS](#Sysklogd-en-LFS)
          * [Sysvinit en LFS](#Sysvinit-en-LFS)
          * [Eudev en LFS](#Eudev-en-LFS)
     * [Limpieza Final](#Limpieza-Final)
     * [Configuración del sistema](#Configuración-del-sistema)
          * [Instalación de LFS Bootscripts](#Instalación-de-LFS-Bootscripts)
          * [Gestión de dispositivos](#Gestión-de-dispositivos)
          * [Creación de archivos de configuración de interfaz de red](#Creación-de-archivos-de-configuración-de-interfaz-de-red)
          * [Configurando el nombre de host del sistema](#Configurando-el-nombre-de-host-del-sistema)
          * [Configurando el Sysvinit](#Configurando-el-sysvinit)
          * [Configuración del reloj del sistema](#Configuración-del-reloj-del-sistema)
          * [Configuración de la consola de Linux](#Configuración-de-la-consola-de-linux)
          * [Creando archivo rc.site](#Creando-archivo-rc-site)
     * [Archivos de inicio de Bash Shell](#Archivos-de-inicio-de-Bash-Shell)
- [Haciendo nuestro sistema Booteable](#Haciendo-nuestro-sistema-booteable)
     * [Creando archivo fstab](#Creando-archivo-fstab)
     * [Instalación del Kernel](#Instalación-del-kernel)
     * [Uso del GRUB para configurar el proceso de arranque](#Uso-del-grub-para-configurar-el-proceso-de-arranque)     
- [Creando archivos finales](#Creando-archivos-finales)
- [Arrancando nuestra nueva distribución Linux S4viOS](#Arrancando-nuestra-nueva-distribución-Linux-S4viOS)

Antecedentes
===============================================================================================================================
Antes que nada, me gustaría comentar una serie de puntos para aquellos que pretenden seguir esta guía.

#### ¿Por qué crear un sistema Linux desde 0 manualmente en vez de descargar e instalar uno existente?

Bueno, si te estás haciendo esta pregunta es que lo tuyo no es la curiosidad. 

La idea de esta guía es que te sirva de ayuda para entender y aprender cómo funciona un sistema Linux desde adentro hacia afuera. Construir un sistema LFS desde 0 te ayuda a entender qué hace que Linux funcione y cómo las cosas funcionan a bajo nivel. 

Aparte, una de las mejores cosas que se pueden sacar de provecho de todo esto es la capacidad de personalizar un sistema Linux para satisfacer tus propias necesidades únicas. No me considero un paranoico, pero en muchas distribuciones Linux no es la primera vez que me encuentro con un binario ya previamente compilado cuyo código no puedo ver (por no ser Open Source)... y a saber qué lleva dentro, igual hasta viene con regalo. 

En ese sentido, tal vez por pura prevención (y curiosidad), a veces es mejor tener el control de qué cosas son las que se están instalando en el sistema, ¿no crees?.

#### Prerrequisitos

Construir un sistema LFS no es una tarea simple. Para toda esta guía, se requiere un cierto nivel de conocimiento existente sobre la administración del sistema Unix. Si esto es así y se aplica para tu caso... a por ello.

Otro de los requisitos que se requieren es la **paciencia**. Construir un sistema LFS no se hace en un día (creedme, lo he intentado), algunos paquetes tardan mucho en instalarse y hay algunas fases que de por sí requieren de tiempo. 

El tiempo estimado para construir tu propio sistema Linux oscila entre **3 y 5 días**, para que lo tengáis en cuenta.

INTRODUCCIÓN
===============================================================================================================================
#### Consideraciones

Bueno antes de empezar, deciros que en mi caso voy a estar trabajando con VirtualBox. 

La pregunta que probablemente os hagáis es, ¿y no puedo usar VMware?, pues a ver, por poder podéis... PERO de las veces que he probado con VMware, justo en la fase final a la hora de hacer el Reboot... aparece un **Kernel Panic**, con el cual me estuve peleando en su momento y no encontré forma de arreglarlo. 

Si queréis no tener que estar lidiando con estos problemas, mi recomendación es que lo hagáis todo con **Virtual Box**. Por lo demás, hay que tener en cuenta que para construir tu propio sistema Linux, necesitas primero de una distribución Linux de base sobre la que trabajar, ya que es desde esta desde donde estaremos toqueteando nuestro nuevo disco duro virtual que posteriormente crearemos.

En mi caso, estaré trabajando con un **Debian 10.3.0 amd64**, el cual puedes descargar desde la página oficial:

* https://www.debian.org/distrib/netinst

#### Instalando Debian 10.3.0

Una vez descargado el ISO, lo único que tendremos que hacer es lo siguiente.

<p align="center">
     <img src="https://funkyimg.com/i/346m7.png">
</p><br>

Es decir, comenzamos creando una nueva máquina virtual. Posteriormente, le asignamos un nombre e indicamos el tipo de sistema operativo con el que estamos tratando así como la versión:

<p align="center">
     <img src="https://funkyimg.com/i/346mT.png">
</p><br>

Una vez hecho, indicamos un tamaño de memoria. En mi caso, asignaré **4096 MB** de memoria:

<p align="center">
     <img src="https://funkyimg.com/i/346mU.png">
</p><br>

En el siguiente paso, crearemos un nuevo disco duro virtual:

<p align="center">
     <img src="https://funkyimg.com/i/346mV.png">
</p><br>

En la selección del tipo de archivo de disco duro, usaremos **VDI**:

<p align="center">
     <img src="https://funkyimg.com/i/346n3.png">
</p><br>

En la especificación de almacenamiento en unidad de disco duro física escogeremos **Tamaño fijo**:

<p align="center">
     <img src="https://funkyimg.com/i/346n1.png">
</p><br>

Y por último, asignaremos un total de **30 GB** para nuestro disco duro virtual:

<p align="center">
     <img src="https://funkyimg.com/i/346n2.png">
</p><br>

Una vez finalizado, lo único que tendremos que hacer es dirigirnos a las propiedades de nuestra nueva máquina e importar la ISO de nuestro Debian (la que previamente hemos descargado).

Esto se hace desde la siguiente sección:

<p align="center">
     <img src="https://funkyimg.com/i/346nf.png">
</p><br>

Ya con todo esto hecho, debería salirnos algo como esto:

<p align="center">
     <img src="https://funkyimg.com/i/346nj.png">
</p><br>

En este punto, lo único que tendremos que hacer ya es arrancar la máquina y comenzar con la fase de instalación.

Seleccionaremos el idioma:

<p align="center">
     <img src="https://funkyimg.com/i/346nt.png">
</p><br>

Desde aquí, habrá que rellenar una serie de datos de ubicación que no creo que haga falta añadir en este Gist (es puro sentido común y no creo que tenga pérdida).

En la especificación de nombre de máquina, yo pondré **Debian**:

<p align="center">
     <img src="https://funkyimg.com/i/346o3.png">
</p><br>

Cuando nos pregunten por el nombre de dominio, simplemente dejad este campo en blanco:

<p align="center">
     <img src="https://funkyimg.com/i/346o2.png">
</p><br>

Rellenad en el siguiente paso vuestra clave de superusuario:

<p align="center">
     <img src="https://funkyimg.com/i/346o4.png">
</p><br>

Tanto en el nombre de usuario como en el nombre de cuenta, como es de obviar... especificaremos nuestro usuario identificativo:

<p align="center">
     <img src="https://funkyimg.com/i/346oe.png">
</p><br>

Y como es de esperar, nuestra contraseña (para no liarnos yo siempre recomiendo que sea la misma que la clave del superusuario):

<p align="center">
     <img src="https://funkyimg.com/i/346od.png">
</p><br>

Ya con esta fase terminada, se nos preguntará por la zona horaria y nuestra ubicación, aquí que cada uno rellene los datos que considere.

En el particionado de discos, escogeremos la opción de usar todo el disco:

<p align="center">
     <img src="https://funkyimg.com/i/346or.png">
</p><br>

Deberíamos ver posteriormente algo como esto:

<p align="center">
     <img src="https://funkyimg.com/i/346os.png">
</p><br>

Una vez hecho, en nuestro caso el esquema de particionado será con todos los ficheros en una partición (posteriormente en nuestro sistema Linux el esquema de particionado será con el /home en otra partición, pero por ahora en nuestro Debian base lo haremos así de simple):

<p align="center">
     <img src="https://funkyimg.com/i/346ot.png">
</p><br>

Por último, aplicamos todos los cambios seleccionando la opción '**Finalizar el particionado**':

<p align="center">
     <img src="https://funkyimg.com/i/346ou.png">
</p><br>

Seleccionaremos la opción **Sí**:

<p align="center">
     <img src="https://funkyimg.com/i/346oL.png">
</p><br>

En caso de que nos pregunte por otro CD a utilizar, le diremos que no:

<p align="center">
     <img src="https://funkyimg.com/i/346oR.png">
</p><br>

Y en caso de que nos pregunte por las réplicas de red, de la misma forma seleccionaremos la opción **No**:

<p align="center">
     <img src="https://funkyimg.com/i/346oU.png">
</p><br>

En la selección de programas, nosotros estaremos trabajando con entorno gráfico para estar más cómodos, por tanto... seleccionaremos las siguientes opciones a instalar:

<p align="center">
     <img src="https://funkyimg.com/i/346p2.png">
</p><br>

Esta fase puede durar unos minutos. Nos preguntará si queremos instalar el cargador de arranque (GRUB), le diremos que sí:

<p align="center">
     <img src="https://funkyimg.com/i/346ps.png">
</p><br>

Asimismo, indicaremos el dispositivo donde queremos instalar el cargador de arranque, en este caso **/dev/sda**:

<p align="center">
     <img src="https://funkyimg.com/i/346pu.png">
</p><br>

Ya llegados a este punto, habríamos finalizado con toda la fase de instalación y debería salirnos un recuadro como este:

<p align="center">
     <img src="https://funkyimg.com/i/346pV.png">
</p><br>

Al presionar en '**Continuar**', nuestro Debian debería arrancar sin mayor inconveniente hasta llegar al entorno gráfico:

<p align="center">
     <img src="https://funkyimg.com/i/346q5.png">
</p><br>

Dado que las proporciones no son las correctas y estaríamos trabajando con una ventana muy chiquita, en el siguiente punto veremos cómo instalar las **VBox Linux Additions**.

#### Configurando el Debian base

Antes de instalar las **Linux Additions** para poder trabajar de manera cómoda, lo que haremos será retocar una línea del archivo **/etc/apt/sources.list**.

Comentaremos la línea que empieza por '**deb cdrom**', ya que esta de no estar comentada hace que se nos paren las compilaciones más adelante y estaremos trabajando de manera incómoda:

<p align="center">
     <img src="https://funkyimg.com/i/346qT.png">
</p><br>

De la misma forma, descomentaremos las 2 últimas líneas y antes de estas añadiremos un nuevo **deb**:

<p align="center">
     <img src="https://funkyimg.com/i/346rL.png">
</p><br>

Una vez hecho, aplicaremos el siguiente comando a nivel de sistema:

```bash
apt update
```

Obteniendo el siguiente output por consola:

<p align="center">
     <img src="https://funkyimg.com/i/346rM.png">
</p><br>

Esta parte es fundamental pues de lo contrario no nos encontrará los paquetes **build-essential** y **linux-headers-amd64**, necesarios para instalar las **VBoxLinuxAdditions**.

Aplicamos los siguientes comandos como el usuario **root** para instalar lo previamente citado:

```bash
apt install build-essential linux-headers-amd64 -y
```

<p align="center">
     <img src="https://funkyimg.com/i/346sw.png">
</p><br>

Este proceso puede tardar unos minutos.

Ahora bien, ¿cómo hacemos para instalar las **VBoxLinuxAdditions**?. En VirtualBox, en la parte superior, contamos con esta utilidad:

<p align="center">
     <img src="https://funkyimg.com/i/346t7.png">
</p><br>

Al presionarla, desde nuestra máquina virtual deberemos ver lo siguiente:

<p align="center">
     <img src="https://funkyimg.com/i/346t8.png">
</p><br>

En este punto, deberíamos presionar en 'Ejecutar'. Si vemos un fallo... es normal, no nos asustemos.

Lo que haremos será de forma manual atender a la siguiente ruta:

<p align="center">
     <img src="https://funkyimg.com/i/346t9.png">
</p><br>

Eso sí, dado que en esta montura tenemos permisos únicamente de lectura, lo que haremos será crearnos una copia del archivo **VBoxLinuxAdditions.run**, posteriormente le daremos permisos de ejecución y lo ejecutaremos con bash:

<p align="center">
     <img src="https://funkyimg.com/i/346tH.png">
</p><br>

Para concluir, aplicamos un **reboot** de la siguiente forma:

<p align="center">
     <img src="https://funkyimg.com/i/346tM.png">
</p><br>

Una vez reiniciado nuestro Debian, el entorno gráfico se nos debería cargar perfectamente en pantalla completa sin mayor inconveniente:

<p align="center">
     <img src="https://funkyimg.com/i/346tX.png">
</p><br>

#### Instalación de paquetes base

Lo que haremos a continuación será crear el siguiente script:

```bash
cat > version-check.sh << "EOF"
#!/bin/bash
# Simple script to list version numbers of critical development tools
export LC_ALL=C
bash --version | head -n1 | cut -d" " -f2-4
MYSH=$(readlink -f /bin/sh)
echo "/bin/sh -> $MYSH"
echo $MYSH | grep -q bash || echo "ERROR: /bin/sh does not point to bash"
unset MYSH

echo -n "Binutils: "; ld --version | head -n1 | cut -d" " -f3-
bison --version | head -n1

if [ -h /usr/bin/yacc ]; then
  echo "/usr/bin/yacc -> `readlink -f /usr/bin/yacc`";
elif [ -x /usr/bin/yacc ]; then
  echo yacc is `/usr/bin/yacc --version | head -n1`
else
  echo "yacc not found" 
fi

bzip2 --version 2>&1 < /dev/null | head -n1 | cut -d" " -f1,6-
echo -n "Coreutils: "; chown --version | head -n1 | cut -d")" -f2
diff --version | head -n1
find --version | head -n1
gawk --version | head -n1

if [ -h /usr/bin/awk ]; then
  echo "/usr/bin/awk -> `readlink -f /usr/bin/awk`";
elif [ -x /usr/bin/awk ]; then
  echo awk is `/usr/bin/awk --version | head -n1`
else 
  echo "awk not found" 
fi

gcc --version | head -n1
g++ --version | head -n1
ldd --version | head -n1 | cut -d" " -f2-  # glibc version
grep --version | head -n1
gzip --version | head -n1
cat /proc/version
m4 --version | head -n1
make --version | head -n1
patch --version | head -n1
echo Perl `perl -V:version`
python3 --version
sed --version | head -n1
tar --version | head -n1
makeinfo --version | head -n1  # texinfo version
xz --version | head -n1

echo 'int main(){}' > dummy.c && g++ -o dummy dummy.c
if [ -x dummy ]
  then echo "g++ compilation OK";
  else echo "g++ compilation failed"; fi
rm -f dummy.c dummy
EOF
```

Tras su ejecución, lo normal es obtener errores como los que se listan a continuación:

<p align="center">
     <img src="https://funkyimg.com/i/346vL.png">
</p><br>

Esto es así dado que vamos a tener que ir instalando una serie de dependencias así como de enlaces simbólicos hasta que la ejecución de este script nos diga que está todo correcto. Lo utilizaremos como Checker.

Lo que haremos será seguir la siguiente filosofía:

* Si el paquete se encuentra instalado, instalaremos el dev [siempre y cuando el paquete disponga del dev]. Si no se encuentra instalado, instalaremos el paquete y el dev.

¿Qué es esto del dev?, bueno... cada paquete (no todos), suelen venir con una paquetería de desarrollador (-dev o -devel). Estos paquetes adicionales de desarrollador son necesarios para que todo el proceso de construcción de nuestro sistema Linux vaya correctamente.

##### Bash

Empezaremos por el paquete Bash. Haremos la siguiente comprobación:

<p align="center">
     <img src="https://funkyimg.com/i/346wb.png">
</p><br>

En este caso, vemos que el paquete ya lo tenía instalado en el sistema. El paquete **Bash** no cuenta con paquetería de desarrollador, por tanto... lo único que aplico conforme a la validación del script que previamente habíamos ejecutado, es un enlace simbólico para que la '**/bin/sh**' apunte a una **Bash**.

##### Binutils

Validamos de la misma forma e instalamos su correspondiente paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346wE.png">
</p><br>

##### Bison

Este paquete no se debería de encontrar instalado en el sistema, por tanto... instalamos y a la vez instalamos su paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346wM.png">
</p><br>

##### Bzip2

Se encuentra instalado en el sistema y posee paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346x2.png">
</p><br>

##### Coreutils

Se encuentra instalado en el sistema y posee paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346x8.png">
</p><br>

##### Diffutils

Se encuentra instalado en el sistema y no posee paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346xB.png">
</p><br>

##### Findutils

Se encuentra instalado en el sistema y no posee paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346xC.png">
</p><br>

##### Gawk

Se encuentra instalado en el sistema y no posee paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346xV.png">
</p><br>

##### Gcc

Se encuentra instalado en el sistema y posee paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346yf.png">
</p><br>

##### Glibc

No se encuentra instalado en el sistema y no posee paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346yk.png">
</p><br>

##### Grep

Se encuentra instalado en el sistema y posee paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346yD.png">
</p><br>

##### Gzip

Se encuentra instalado en el sistema y posee paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346yE.png">
</p><br>

##### M4

Se encuentra instalado en el sistema y posee paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346zX.png">
</p><br>

##### Make

Se encuentra instalado en el sistema y posee paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346A7.png">
</p><br>

##### Patch

Se encuentra instalado en el sistema y posee paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346Ad.png">
</p><br>

##### Perl

Se encuentra instalado en el sistema y posee paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346Ak.png">
</p><br>

##### Python

Se encuentra instalado en el sistema y posee paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346Ax.png">
</p><br>

##### Sed

Se encuentra instalado en el sistema y no posee paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346Ay.png">
</p><br>

##### Tar

Se encuentra instalado en el sistema y posee paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346AD.png">
</p><br>

##### Texinfo

No se encuentra instalado en el sistema y no posee paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346By.png">
</p><br>

##### Xz

Se encuentra instalado en el sistema y posee paquetería de desarrollador:

<p align="center">
     <img src="https://funkyimg.com/i/346AN.png">
</p><br>

#### Version Check

Una vez instalados todos los paquetes, ejecutaremos los siguientes comandos para crear una serie de links simbólicos necesarios para que todo funcione correctamente:

```bash
ln -svf bison /usr/bin/yacc
ln -svf gawk /usr/bin/awk
```

Ya con esto hecho, ejecutaremos el script **version-check.sh** previamente creado y analizamos si nos da algún error:

<p align="center">
     <img src="https://funkyimg.com/i/346BS.png">
</p><br>

Como vemos, no se nos reporta ningún error... por lo que podremos continuar. Si en este punto se te arroja algún error, es que has metido la pata en algún sitio y no has instalado correctamente algún paquete necesario.

¿Mi recomendación en este punto?, crea una instantánea, no vaya a ser que en breve la líes y tengas que volver a empezar desde 0... así por lo menos te das el margen de empezar desde aquí:

<p align="center">
     <img src="https://funkyimg.com/i/346C9.png">
</p><br>

Creando nueva partición
===============================================================================================================================

En este punto, ya con todo lo anterior correctamente configurado, lo que haremos será apagar la máquina virtual. Nos iremos a la configuración de nuestra máquina, y añadiremos un nuevo disco... donde irá el LFS:

<p align="center">
     <img src="https://funkyimg.com/i/346Dx.png">
</p><br

Una vez más, será de tipo **VDI**. En la selección del tipo de almacenamiento en unidad de disco duro física, indicaremos que queremos trabajar con un tamaño fijo:

<p align="center">
     <img src="https://funkyimg.com/i/346Dy.png">
</p><br>

Posteriormente, identificamos el **VDI** donde irá nuestro nuevo sistema Linux con un nombre descriptivo. Yo lo llamaré **S4viOS** (30 GB):

<p align="center">
     <img src="https://funkyimg.com/i/346Dz.png">
</p><br>

Una vez creado, lo que hacemos es añadirlo justo debajo del ya existente correspondiente al Debian:

<p align="center">
     <img src="https://funkyimg.com/i/346DA.png">
</p><br>

Una vez añadido, debería verse tal que así:

<p align="center">
     <img src="https://funkyimg.com/i/346DB.png">
</p><br>

Si arrancamos el Debian, todo debería continuar funcionando correctamente.

Al aplicar el comando **lsblk**, deberíamos ver una nueva partición en **/dev/sdb**, correspondiente a la que hemos creado para **S4viOS**:

<p align="center">
     <img src="https://funkyimg.com/i/346DC.png">
</p><br>

**¡Importante en este punto antes de continuar!**, como de aquí en adelante es probable que nos encontremos con fases de larga espera, lo mejor es quitar esto que nos sale cuando estamos inactivos:

<p align="center">
     <img src="https://funkyimg.com/i/346EU.png">
</p><br>

No creo que nos haga mucha gracia que en una plena instalación se nos apague de pronto el equipo por inactividad. Para quitar este modo, buscamos '**Energía**' en el buscador de herramientas, y ponemos la siguiente configuración:

<p align="center">
     <img src="https://funkyimg.com/i/346F1.png">
</p><br>

#### Estructurando la partición con parted

Lo que tenemos que pensar en este punto es lo siguiente, vamos a echar de nuevo un ojo a nuestras particiones:

<p align="center">
     <img src="https://funkyimg.com/i/346DC.png">
</p><br>

La idea en este punto es dejar **sdb** tal y como se ve **sda**, con el mismo esquema de particiones con la diferencia de que yo en este caso añadiré una partición aparte adicional para el **/home** de nuestro sistema S4viOS por separado.

Esto lo podemos hacer desde **parted**:

<p align="center">
     <img src="https://funkyimg.com/i/346Hr.png">
</p><br>

En este caso, lo único que he hecho ha sido seleccionar la partición con la que quiero trabajar (**sdb**) y he analizado sus propiedades con **print**.

Si os fijáis, no detecta el label de la tabla de particiones. Vamos a echar un ojo a las propiedades de la partición **sda** ya existente:

<p align="center">
     <img src="https://funkyimg.com/i/346Hq.png">
</p><br>

En este caso el label corresponde a **msdos**. Pues la idea es replicar el mismo "escenario", por tanto... volveremos a nuestra partición **sdb** y aplicaremos estos cambios en el label:

<p align="center">
     <img src="https://funkyimg.com/i/346Hs.png">
</p><br>

Tras volver a hacer un **print**, en este caso ya vemos cómo se lista la información correctamente.

Ahora bien, lo dicho... iremos creando una serie de particiones, tanto primarias, como extendidas, como lógicas en función de cómo lo queramos nosotros organizar. En mi caso lo organizaré de la siguiente forma:

<p align="center">
     <img src="https://funkyimg.com/i/346Ht.png">
</p><br>

Como vemos, las Flags para cada una de las particiones están identificadas como **lba**, y en la partición **sda** si lo verificáis veréis como esto no es así, únicamente está representada la partición primaria con el Flag **boot**.

Pues nosotros haremos lo mismo, es decir... copiaremos el esquema:

<p align="center">
     <img src="https://funkyimg.com/i/346Hu.png">
</p><br>

En este punto, lo que recomiendo es comparar **sda** con **sdb** para ver si siguen la misma estructura:

<p align="center">
     <img src="https://funkyimg.com/i/346Hv.png">
</p><br>

Ahora bien, en cuanto a particiones respecta... deberíamos ver algo como esto en estos instantes:

<p align="center">
     <img src="https://funkyimg.com/i/346Hw.png">
</p><br>

Como podréis apreciar, aún no hay UUID's identificativos para las particiones **sdb1, sdb5 y sdb6**. Esto es normal, dado que para ello previamente tenemos que asignar un filesystem a cada una de ellas:

<p align="center">
     <img src="https://funkyimg.com/i/346Jt.png">
</p><br>

Ya con esto hecho, a través del comando `lsblk -f` podremos sacar los respectivos UUID's de cada una de las particiones. De todas formas, hay un modo más cómodo que sería el siguiente sobre las particiones que nos interesan:

<p align="center">
     <img src="https://funkyimg.com/i/346Jw.png">
</p><br>

¿Qué hacemos con estos UUID's?, pues configurarlos en el '**/etc/fstab**'. Este archivo, por defecto debería alojar el siguiente contenido:

<p align="center">
     <img src="https://funkyimg.com/i/346Ju.png">
</p><br>

Pues lo que nosotros haremos será justamente lo mismo pero para nuestra partición:

<p align="center">
     <img src="https://funkyimg.com/i/346Jv.png">
</p><br>

La raíz de nuestro sistema Linux S4viOS estará definido por la partición primaria, y será desde '*/mnt/lfs*' donde configuraremos la raíz (aunque ese directorio aún no exista, no nos preocupemos... lo crearemos en breve siguiendo este esquema). 

Por otro lado, especificamos el UUID del SWAP, que correspondería al espacio de intercambio y por último el UUID de la partición que asignaremos a la '**/home**' accesible desde nuestro equipo Debian en '*/mnt/lfs/home*'.

<p align="center">
     <img src="https://funkyimg.com/i/346Jx.png">
</p><br>

En este punto, creamos los respectivos directorios definidos en el '**/etc/fstab**', montamos las particiones en dichas rutas y jugamos con **swapon**, ampliamente usado para habilitar/deshabilitar dispositivos y archivos para paginación e intercambio, en este caso sobre nuestro SWAP (**/dev/sdb5**).

Finalmente, si hacemos un `lsblk` tal y como se aprecia en la imagen de arriba, deberíamos ver esa misma estructura de particiones. Si esto es así, podremos continuar con las siguientes fases, ¡pero no sin antes crear otra Snapshot!, que nunca se sabe:

<p align="center">
     <img src="https://funkyimg.com/i/346Jy.png">
</p><br>

Descarga de paquetes para la creación del sistema base
===============================================================================================================================

Comenzaremos creándonos un directorio en '*$LFS/sources*':

<p align="center">
     <img src="https://funkyimg.com/i/347Pv.png">
</p><br>

Desde aquí, tendremos que descargar una serie de paquetes los cuales tendremos que ir descomprimiendo y compilando poco a poco.

Para trabajar rápido, haremos lo siguiente, crearéis un archivo `wget-list` con el siguiente contenido:

```bash
http://download.savannah.gnu.org/releases/attr/attr-2.4.48.tar.gz
http://ftp.gnu.org/gnu/autoconf/autoconf-2.69.tar.xz
http://ftp.gnu.org/gnu/automake/automake-1.16.1.tar.xz
http://ftp.gnu.org/gnu/bash/bash-5.0.tar.gz
https://github.com/gavinhoward/bc/archive/2.5.3/bc-2.5.3.tar.gz
http://ftp.gnu.org/gnu/binutils/binutils-2.34.tar.xz
http://ftp.gnu.org/gnu/bison/bison-3.5.2.tar.xz
https://www.sourceware.org/pub/bzip2/bzip2-1.0.8.tar.gz
https://github.com/libcheck/check/releases/download/0.14.0/check-0.14.0.tar.gz
http://ftp.gnu.org/gnu/coreutils/coreutils-8.31.tar.xz
http://ftp.gnu.org/gnu/dejagnu/dejagnu-1.6.2.tar.gz
http://ftp.gnu.org/gnu/diffutils/diffutils-3.7.tar.xz
https://downloads.sourceforge.net/project/e2fsprogs/e2fsprogs/v1.45.5/e2fsprogs-1.45.5.tar.gz
https://sourceware.org/ftp/elfutils/0.178/elfutils-0.178.tar.bz2
http://download.savannah.gnu.org/releases/acl/acl-2.2.53.tar.gz
https://dev.gentoo.org/~blueness/eudev/eudev-3.2.9.tar.gz
https://prdownloads.sourceforge.net/expat/expat-2.2.9.tar.xz
https://prdownloads.sourceforge.net/expect/expect5.45.4.tar.gz
ftp://ftp.astron.com/pub/file/file-5.38.tar.gz
http://ftp.gnu.org/gnu/findutils/findutils-4.7.0.tar.xz
https://github.com/westes/flex/releases/download/v2.6.4/flex-2.6.4.tar.gz
http://ftp.gnu.org/gnu/gawk/gawk-5.0.1.tar.xz
http://ftp.gnu.org/gnu/gcc/gcc-9.2.0/gcc-9.2.0.tar.xz
http://ftp.gnu.org/gnu/gdbm/gdbm-1.18.1.tar.gz
http://ftp.gnu.org/gnu/gettext/gettext-0.20.1.tar.xz
http://ftp.gnu.org/gnu/glibc/glibc-2.31.tar.xz
http://ftp.gnu.org/gnu/gmp/gmp-6.2.0.tar.xz
http://ftp.gnu.org/gnu/gperf/gperf-3.1.tar.gz
http://ftp.gnu.org/gnu/grep/grep-3.4.tar.xz
http://ftp.gnu.org/gnu/groff/groff-1.22.4.tar.gz
https://ftp.gnu.org/gnu/grub/grub-2.04.tar.xz
http://ftp.gnu.org/gnu/gzip/gzip-1.10.tar.xz
http://anduin.linuxfromscratch.org/LFS/iana-etc-2.30.tar.bz2
http://ftp.gnu.org/gnu/inetutils/inetutils-1.9.4.tar.xz
https://launchpad.net/intltool/trunk/0.51.0/+download/intltool-0.51.0.tar.gz
https://www.kernel.org/pub/linux/utils/net/iproute2/iproute2-5.5.0.tar.xz
https://www.kernel.org/pub/linux/utils/kbd/kbd-2.2.0.tar.xz
https://www.kernel.org/pub/linux/utils/kernel/kmod/kmod-26.tar.xz
http://www.greenwoodsoftware.com/less/less-551.tar.gz
http://www.linuxfromscratch.org/lfs/downloads/9.1/lfs-bootscripts-20191031.tar.xz
https://www.kernel.org/pub/linux/libs/security/linux-privs/libcap2/libcap-2.31.tar.xz
ftp://sourceware.org/pub/libffi/libffi-3.3.tar.gz
http://download.savannah.gnu.org/releases/libpipeline/libpipeline-1.5.2.tar.gz
http://ftp.gnu.org/gnu/libtool/libtool-2.4.6.tar.xz
https://www.kernel.org/pub/linux/kernel/v5.x/linux-5.5.3.tar.xz
http://ftp.gnu.org/gnu/m4/m4-1.4.18.tar.xz
http://ftp.gnu.org/gnu/make/make-4.3.tar.gz
http://download.savannah.gnu.org/releases/man-db/man-db-2.9.0.tar.xz
https://www.kernel.org/pub/linux/docs/man-pages/man-pages-5.05.tar.xz
https://github.com/mesonbuild/meson/releases/download/0.53.1/meson-0.53.1.tar.gz
https://ftp.gnu.org/gnu/mpc/mpc-1.1.0.tar.gz
http://www.mpfr.org/mpfr-4.0.2/mpfr-4.0.2.tar.xz
https://github.com/ninja-build/ninja/archive/v1.10.0/ninja-1.10.0.tar.gz
http://ftp.gnu.org/gnu/ncurses/ncurses-6.2.tar.gz
https://www.openssl.org/source/openssl-1.1.1d.tar.gz
http://ftp.gnu.org/gnu/patch/patch-2.7.6.tar.xz
https://www.cpan.org/src/5.0/perl-5.30.1.tar.xz
https://pkg-config.freedesktop.org/releases/pkg-config-0.29.2.tar.gz
https://sourceforge.net/projects/procps-ng/files/Production/procps-ng-3.3.15.tar.xz
https://sourceforge.net/projects/psmisc/files/psmisc/psmisc-23.2.tar.xz
https://www.python.org/ftp/python/3.8.1/Python-3.8.1.tar.xz
https://www.python.org/ftp/python/doc/3.8.1/python-3.8.1-docs-html.tar.bz2
http://ftp.gnu.org/gnu/readline/readline-8.0.tar.gz
http://ftp.gnu.org/gnu/sed/sed-4.8.tar.xz
https://github.com/shadow-maint/shadow/releases/download/4.8.1/shadow-4.8.1.tar.xz
http://www.infodrom.org/projects/sysklogd/download/sysklogd-1.5.1.tar.gz
http://download.savannah.gnu.org/releases/sysvinit/sysvinit-2.96.tar.xz
http://ftp.gnu.org/gnu/tar/tar-1.32.tar.xz
https://downloads.sourceforge.net/tcl/tcl8.6.10-src.tar.gz
http://ftp.gnu.org/gnu/texinfo/texinfo-6.7.tar.xz
https://www.iana.org/time-zones/repository/releases/tzdata2019c.tar.gz
http://anduin.linuxfromscratch.org/LFS/udev-lfs-20171102.tar.xz
https://www.kernel.org/pub/linux/utils/util-linux/v2.35/util-linux-2.35.1.tar.xz
http://anduin.linuxfromscratch.org/LFS/vim-8.2.0190.tar.gz
https://cpan.metacpan.org/authors/id/T/TO/TODDR/XML-Parser-2.46.tar.gz
https://tukaani.org/xz/xz-5.2.4.tar.xz
https://zlib.net/zlib-1.2.11.tar.xz
https://github.com/facebook/zstd/releases/download/v1.4.4/zstd-1.4.4.tar.gz
http://www.linuxfromscratch.org/patches/lfs/9.1/bash-5.0-upstream_fixes-1.patch
http://www.linuxfromscratch.org/patches/lfs/9.1/bzip2-1.0.8-install_docs-1.patch
http://www.linuxfromscratch.org/patches/lfs/9.1/coreutils-8.31-i18n-1.patch
http://www.linuxfromscratch.org/patches/lfs/9.1/glibc-2.31-fhs-1.patch
http://www.linuxfromscratch.org/patches/lfs/9.1/kbd-2.2.0-backspace-1.patch
http://www.linuxfromscratch.org/patches/lfs/9.1/sysvinit-2.96-consolidated-1.patch
```

De nada. Una vez hecho, lo único que tendréis que hacer es ejecutar el siguiente comando:

```bash
wget --input-file=wget-list --continue --directory-prefix=$LFS/sources
```

Este proceso puede tardar un buen rato... así que te recomiendo que salgas a dar una vuelta o a despejarte. 

<p align="center">
     <img src="https://funkyimg.com/i/347Qa.png">
</p><br>

Nos situaremos en el directorio '*$LFS/sources*', deberíamos ver algo como esto una vez finalizado:

<p align="center">
     <img src="https://funkyimg.com/i/3483C.png">
</p><br>

Es decir, deberíamos tener todos los recursos en un principio descargados. 

Construyendo un sistema temporal
===============================================================================================================================

#### Creación de un nuevo usuario

En este punto, comenzaremos creando un directorio `tools` en '*$LFS/tools/*', posteriormente... crearemos un usuario a nivel de sistema con nombre `lfs`, ejecutando para ello los siguientes comandos:

<p align="center">
     <img src="https://funkyimg.com/i/34852.png">
</p><br>

Será necesario proporcionar una contraseña para el nuevo usuario `lfs`.

Una vez hecho, retocaremos el `.bash_profile` y el `.bashrc` de este nuevo usuario, adaptando el siguiente contenido:

<p align="center">
     <img src="https://funkyimg.com/i/34853.png">
</p><br>

Ya con esto definido, aplicamos un `source` sobre estos 2 archivos y ya podremos continuar:

<p align="center">
     <img src="https://funkyimg.com/i/34854.png">
</p><br>

#### Compilación de paquetes

En este punto, será necesario compilar una serie de paquetes de los previamente descargados a través del archivo `wget-list`. Recomiendo tener esta guía abierta para copiar y pegar algunos de los comandos, pues estos en ocasiones son algo largos.

##### Compilación binutils

Para comenzar con la compilación de este paquete, lo que haremos será dirigirnos a la ruta '*$LFS/sources*', descomprimiremos el archivo `binutils-2.34.tar.xz`, nos meteremos dentro de este y ejecutaremos los siguientes comandos:

```bash
mkdir -v build
cd build

../configure --prefix=/tools            \
             --with-sysroot=$LFS        \
             --with-lib-path=/tools/lib \
             --target=$LFS_TGT          \
             --disable-nls              \
             --disable-werror

make

case $(uname -m) in
  x86_64) mkdir -v /tools/lib && ln -sv lib /tools/lib64 ;;
esac

make install
```

Una vez hecho, ya tendríamos esta utilidad instalada... y lo único que tendríamos que hacer es retroceder a nivel de directorios y borrar el mismo:

<p align="center">
     <img src="https://funkyimg.com/i/3486D.png">
</p><br>

##### Compilación GCC

Este paquete depende a su vez de otros 3 paquetes, así que tras su descompresión, haremos lo siguiente:

<p align="center">
     <img src="https://funkyimg.com/i/3486N.png">
</p><br>

Por aquí os dejo los comandos:

```bash
tar -xf gcc-9.2.0.tar.xz

cd gcc-9.2.0

tar -xf ../mpfr-4.0.2.tar.xz
mv -v mpfr-4.0.2 mpfr
tar -xf ../gmp-6.2.0.tar.xz
mv -v gmp-6.2.0 gmp
tar -xf ../mpc-1.1.0.tar.gz
mv -v mpc-1.1.0 mpc
```

Una vez hecho, ejecutaremos los siguientes comandos:

```bash
for file in gcc/config/{linux,i386/linux{,64}}.h
do
  cp -uv $file{,.orig}
  sed -e 's@/lib\(64\)\?\(32\)\?/ld@/tools&@g' \
      -e 's@/usr@/tools@g' $file.orig > $file
  echo '
#undef STANDARD_STARTFILE_PREFIX_1
#undef STANDARD_STARTFILE_PREFIX_2
#define STANDARD_STARTFILE_PREFIX_1 "/tools/lib/"
#define STANDARD_STARTFILE_PREFIX_2 ""' >> $file
  touch $file.orig
done

case $(uname -m) in
  x86_64)
    sed -e '/m64=/s/lib64/lib/' \
        -i.orig gcc/config/i386/t-linux64
 ;;
esac

mkdir -v build
cd build

../configure                                       \
    --target=$LFS_TGT                              \
    --prefix=/tools                                \
    --with-glibc-version=2.11                      \
    --with-sysroot=$LFS                            \
    --with-newlib                                  \
    --without-headers                              \
    --with-local-prefix=/tools                     \
    --with-native-system-header-dir=/tools/include \
    --disable-nls                                  \
    --disable-shared                               \
    --disable-multilib                             \
    --disable-decimal-float                        \
    --disable-threads                              \
    --disable-libatomic                            \
    --disable-libgomp                              \
    --disable-libquadmath                          \
    --disable-libssp                               \
    --disable-libvtv                               \
    --disable-libstdcxx                            \
    --enable-languages=c,c++

make
make install
```

**Anotación**: Este paquete puede tardar un poco en instalarse, así que paciencia.

Una vez instalado, podremos retroceder a nivel de directorios y borrar el recurso descomprimido sin mayor inconveniente:

<p align="center">
     <img src="https://funkyimg.com/i/3489L.png">
</p><br>

##### Compilación API Headers

En este caso, descomprimiremos el archivo `linux-5.5.3.tar.xz` y ejecutaremos los siguientes comandos:

```bash
make mrproper
make headers
cp -rv usr/include/* /tools/include
cd ..
rm -rf linux-5.5.3
```

<p align="center">
     <img src="https://funkyimg.com/i/348ac.png">
</p><br>

##### Compilación Glibc

Para la instalación de **Glibc**, ejecutaremos los siguientes comandos:

```bash
tar -xf glibc-2.31.tar.xz
mkdir -v build
cd       build

../configure                             \
      --prefix=/tools                    \
      --host=$LFS_TGT                    \
      --build=$(../scripts/config.guess) \
      --enable-kernel=3.2                \
      --with-headers=/tools/include

make
make install
```

Una vez hecho, aplicaremos el siguiente comando para validar que las funciones básicas (compilación y linking) de la nueva toolchain están trabajando correctamente:

```bash
echo 'int main(){}' > dummy.c
$LFS_TGT-gcc dummy.c
readelf -l a.out | grep ': /tools'
```

Si al ejecutarlo nos sale el siguiente mensaje:

```bash
[Requesting program interpreter: /tools/lib64/ld-linux-x86-64.so.2]
```

Entonces nos podremos quedar tranquilos. Posteriormente, borramos estos archivos:

```bash
rm -v dummy.c a.out
cd ../..
rm -rf glibc-2.31
```

<p align="center">
     <img src="https://funkyimg.com/i/348ei.png">
</p><br>

Ojo cuidado, ¡hagamos una Snapshot que ya hemos avanzado considerablemente!:

<p align="center">
     <img src="https://funkyimg.com/i/348ev.png">
</p><br>

##### Compilación Libstdc de GCC

Para instalar esta utilidad, necesitaremos volver a descomprimir el archivo `gcc-9.2.0.tar.xz` una vez más. Una vez hecho, aplicaremos los siguientes comandos dentro del directorio descomprimido:

```bash
mkdir -v build
cd build

../libstdc++-v3/configure           \
    --host=$LFS_TGT                 \
    --prefix=/tools                 \
    --disable-multilib              \
    --disable-nls                   \
    --disable-libstdcxx-threads     \
    --disable-libstdcxx-pch         \
    --with-gxx-include-dir=/tools/$LFS_TGT/include/c++/9.2.0

make
make install
```

Una vez finalizado, como siempre... retrocedemos 2 directorios y borramos el directorio:

<p align="center">
     <img src="https://funkyimg.com/i/348kG.png">
</p><br>

##### Compilación Binutils Fase 2

Una vez más, volveremos a descomprimir el comprimido `binutils-2.34.tar.xz` y aplicaremos los siguientes comandos:

```bash
tar -xf binutils-2.34.tar.xz
cd binutils-2.34

mkdir -v build
cd build

CC=$LFS_TGT-gcc                \
AR=$LFS_TGT-ar                 \
RANLIB=$LFS_TGT-ranlib         \
../configure                   \
    --prefix=/tools            \
    --disable-nls              \
    --disable-werror           \
    --with-lib-path=/tools/lib \
    --with-sysroot

make
make install

make -C ld clean
make -C ld LIB_PATH=/usr/lib:/lib
cp -v ld/ld-new /tools/bin
```

Una vez hecho, la misma historia de siempre... retrocedemos 2 directorios y borramos el directorio:

<p align="center">
     <img src="https://funkyimg.com/i/348nQ.png">
</p><br>

##### Compilación GCC Fase 2

Descomprimiremos una vez más el archivo `gcc-9.2.0.tar.xz` y aplicaremos los siguientes comandos a nivel de sistema:

```bash
cat gcc/limitx.h gcc/glimits.h gcc/limity.h > \
  `dirname $($LFS_TGT-gcc -print-libgcc-file-name)`/include-fixed/limits.h

for file in gcc/config/{linux,i386/linux{,64}}.h
do
  cp -uv $file{,.orig}
  sed -e 's@/lib\(64\)\?\(32\)\?/ld@/tools&@g' \
      -e 's@/usr@/tools@g' $file.orig > $file
  echo '
#undef STANDARD_STARTFILE_PREFIX_1
#undef STANDARD_STARTFILE_PREFIX_2
#define STANDARD_STARTFILE_PREFIX_1 "/tools/lib/"
#define STANDARD_STARTFILE_PREFIX_2 ""' >> $file
  touch $file.orig
done

case $(uname -m) in
  x86_64)
    sed -e '/m64=/s/lib64/lib/' \
        -i.orig gcc/config/i386/t-linux64
  ;;
esac

tar -xf ../mpfr-4.0.2.tar.xz
mv -v mpfr-4.0.2 mpfr
tar -xf ../gmp-6.2.0.tar.xz
mv -v gmp-6.2.0 gmp
tar -xf ../mpc-1.1.0.tar.gz
mv -v mpc-1.1.0 mpc

sed -e '1161 s|^|//|' \
    -i libsanitizer/sanitizer_common/sanitizer_platform_limits_posix.cc

mkdir -v build
cd build
```

Toda esta parte debería devolver un output limpio como el siguiente:

<p align="center">
     <img src="https://funkyimg.com/i/348ou.png">
</p><br>

Llegados a este punto ejecutamos los siguientes comandos:

```bash
CC=$LFS_TGT-gcc                                    \
CXX=$LFS_TGT-g++                                   \
AR=$LFS_TGT-ar                                     \
RANLIB=$LFS_TGT-ranlib                             \
../configure                                       \
    --prefix=/tools                                \
    --with-local-prefix=/tools                     \
    --with-native-system-header-dir=/tools/include \
    --enable-languages=c,c++                       \
    --disable-libstdcxx-pch                        \
    --disable-multilib                             \
    --disable-bootstrap                            \
    --disable-libgomp

make
make install
ln -sv gcc /tools/bin/cc
```

Igual que hicimos la primera vez, tendremos que validar que las funciones básicas (compilación y linking) de la nueva toolchain están funcionando correctamente:

```bash
echo 'int main(){}' > dummy.c
cc dummy.c
readelf -l a.out | grep ': /tools'
```

Teniendo que ver un output como el siguiente:

```bash
[Requesting program interpreter: /tools/lib64/ld-linux-x86-64.so.2]
```

Si eso es así, buen trabajo. Eliminamos los ficheros y directorios innecesarios:

```bash
rm -v dummy.c a.out
cd ../..
rm -rf gcc-9.2.0
```

<p align="center">
     <img src="https://funkyimg.com/i/348qv.png">
</p><br>

##### Compilación Tcl

Para la instalación de este paquete, tendremos que descomprimir el comprimido `tcl8.6.10-src.tar.gz`. Posteriormente, ejecutaremos los siguientes comandos dentro del directorio:

```bash
cd unix

./configure --prefix=/tools

make
TZ=UTC make test
make install

chmod -v u+w /tools/lib/libtcl8.6.so
make install-private-headers
ln -sv tclsh8.6 /tools/bin/tclsh
```

Una vez terminado, retrocedemos 2 directorios y borramos el directorio:

<p align="center">
     <img src="https://funkyimg.com/i/348rB.png">
</p><br>

##### Compilación Expect

Para la instalación de este paquete, tendremos que descomprimir el comprimido `expect5.45.4.tar.gz`, posteriormente, ejecutaremos los siguientes comandos dentro del directorio:

```bash
cp -v configure{,.orig}
sed 's:/usr/local/bin:/bin:' configure.orig > configure

./configure --prefix=/tools       \
            --with-tcl=/tools/lib \
            --with-tclinclude=/tools/include

make
make test
make SCRIPTS="" install
```

Una vez finalizado, retrocedemos 1 directorio y borramos el directorio principal:

<p align="center">
     <img src="https://funkyimg.com/i/348s6.png">
</p><br>

##### Compilación DejaGNU

La instalación de este paquete es bastante rápida. En primer lugar, descomprimimos el comprimido `dejagnu-1.6.2.tar.gz`. Posteriormente, ejecutamos los siguientes comandos:

```bash
./configure --prefix=/tools
make install
make check
```

Una vez hecho, retrocedemos un directorio y borramos el directorio principal:

<p align="center">
     <img src="https://funkyimg.com/i/348sm.png">
</p><br>

##### Compilación M4

Para instalar este paquete, descomprimiremos el comprimido `m4-1.4.18.tar.xz`, nos meteremos en el directorio descomprimido y efectuaremos los siguientes comandos:

```bash
sed -i 's/IO_ftrylockfile/IO_EOF_SEEN/' lib/*.c
echo "#define _IO_IN_BACKUP 0x100" >> lib/stdio-impl.h

./configure --prefix=/tools

make
make check
make install
```

Durante el `make check`, deberíamos ver algo como esto:

<p align="center">
     <img src="https://funkyimg.com/i/348tc.png">
</p><br>

Una vez finalizada la instalación, retrocedemos un directorio y borramos el directorio principal:

<p align="center">
     <img src="https://funkyimg.com/i/348td.png">
</p><br>

##### Compilación Ncurses

Para instalar este paquete, necesitaremos descomprimir el comprimido con nombre `ncurses-6.2.tar.gz`. Una vez hecho, aplicaremos los siguientes comandos dentro del directorio descomprimido:

```bash
sed -i s/mawk// configure

./configure --prefix=/tools \
            --with-shared   \
            --without-debug \
            --without-ada   \
            --enable-widec  \
            --enable-overwrite

make
make install
ln -s libncursesw.so /tools/lib/libncurses.so
```

Una vez hecho, retrocedemos un directorio y borramos el directorio principal de Ncurses.

##### Compilación Bash

Para instalar este paquete, necesitaremos descomprimir el comprimido con nombre `bash-5.0.tar.gz`. Una vez hecho, ejecutaremos los siguientes comandos dentro del directorio descomprimido:

```bash
./configure --prefix=/tools --without-bash-malloc
make
make tests
make install
ln -sv bash /tools/bin/sh
```

Una vez hecho, retrocederemos un directorio y borraremos el directorio principal de Bash:

<p align="center">
     <img src="https://funkyimg.com/i/348v6.png">
</p><br>

##### Compilación Bison

Para la compilación de este paquete, haremos uso del paquete `bison-3.5.2.tar.xz`. Una vez descomprimido, nos meteremos dentro del directorio descomprimido y aplicaremos los siguientes comandos:

```bash
./configure --prefix=/tools

make
make check
make install
```

Una vez hecho, retrocedemos un directorio y borramos el directorio principal de Bison:

<p align="center">
     <img src="https://funkyimg.com/i/348w3.png">
</p><br>

##### Compilación Bzip2

Para la compilación de este paquete, haremos uso del paquete `bzip2-1.0.8.tar.gz`. Una vez descomprimido, nos meteremos dentro del directorio descomprimido y aplicaremos los siguientes comandos:

```bash
make -f Makefile-libbz2_so
make clean

make

make PREFIX=/tools install
cp -v bzip2-shared /tools/bin/bzip2
cp -av libbz2.so* /tools/lib
ln -sv libbz2.so.1.0 /tools/lib/libbz2.so
```

Una vez hecho, retrocedemos un directorio y borramos el directorio principal de Bzip2:

<p align="center">
     <img src="https://funkyimg.com/i/348wj.png">
</p><br>

##### Compilación Coreutils

Para la compilación de este paquete, haremos uso del paquete `coreutils-8.31.tar.xz`. Una vez descomprimido, nos meteremos dentro del directorio descomprimido y aplicaremos los siguientes comandos:

```bash
./configure --prefix=/tools --enable-install-program=hostname

make
make RUN_EXPENSIVE_TESTS=yes check
make install
```

Una vez hecho, retrocedemos un directorio y borramos el directorio principal de Coreutils:

<p align="center">
     <img src="https://funkyimg.com/i/348xi.png">
</p><br>

##### Compilación Diffutils

Para la compilación de este paquete, haremos uso del paquete `diffutils-3.7.tar.xz`. Una vez descomprimido, nos meteremos dentro del directorio descomprimido y aplicaremos los siguientes comandos:

```bash
./configure --prefix=/tools
make
make check
make install
```

Una vez hecho, retrocedemos un directorio y borramos el directorio principal de Diffutils:

<p align="center">
     <img src="https://funkyimg.com/i/348xB.png">
</p><br>

##### Compilación File

Para la compilación de este paquete, haremos uso del paquete `file-5.38.tar.gz`. Una vez descomprimido, nos meteremos dentro del directorio descomprimido y aplicaremos los siguientes comandos:

```bash
./configure --prefix=/tools
make
make check
make install
```

Una vez hecho, retrocedemos un directorio y borramos el directorio principal de File:

<p align="center">
     <img src="https://funkyimg.com/i/348xH.png">
</p><br>

##### Compilación Findutils

Para la compilación de este paquete, haremos uso del paquete `findutils-4.7.0.tar.xz`. Una vez descomprimido, nos meteremos dentro del directorio descomprimido y aplicaremos los siguientes comandos:

```bash
./configure --prefix=/tools
make
make check
make install
```

Una vez hecho, retrocedemos un directorio y borramos el directorio principal de Findutils:

<p align="center">
     <img src="https://funkyimg.com/i/348y1.png">
</p><br>

Bueno, en este punto... como ya hemos avanzado considerablemente, ¡toca hacer otro Snapshot!:

<p align="center">
     <img src="https://funkyimg.com/i/348yu.png">
</p><br>

##### Compilación Gawk

Para la compilación de este paquete, haremos uso del paquete `gawk-5.0.1.tar.xz`. Una vez descomprimido, nos meteremos dentro del directorio descomprimido y aplicaremos los siguientes comandos:

```bash
./configure --prefix=/tools
make
make check
make install
```

**Importante**: Es probable que el `make check` devuelva errores, pero no hay de qué preocuparse.

Una vez hecho, retrocedemos un directorio y borramos el directorio principal de Gawk:

<p align="center">
     <img src="https://funkyimg.com/i/349ii.png">
</p><br>

##### Compilación Gettext

Para la compilación de este paquete, haremos uso del paquete `gettext-0.20.1.tar.xz`. Una vez descomprimido, nos meteremos dentro del directorio descomprimido y aplicaremos los siguientes comandos:

```bash
./configure --disable-shared
make
cp -v gettext-tools/src/{msgfmt,msgmerge,xgettext} /tools/bin
```

Una vez hecho, retrocedemos un directorio y borramos el directorio principal de Gettext:

<p align="center">
     <img src="https://funkyimg.com/i/349iX.png">
</p><br>

##### Compilación Grep

Para la compilación de este paquete, haremos uso del paquete `grep-3.4.tar.xz`. Una vez descomprimido, nos meteremos dentro del directorio descomprimido y aplicaremos los siguientes comandos:

```bash
./configure --prefix=/tools

make
make check
make install
```

Una vez hecho, retrocedemos un directorio y borramos el directorio principal de Grep:

<p align="center">
     <img src="https://funkyimg.com/i/349jf.png">
</p><br>

##### Compilación Gzip

Para la compilación de este paquete, haremos uso del paquete `gzip-1.10.tar.xz`. Una vez descomprimido, nos meteremos dentro del directorio descomprimido y aplicaremos los siguientes comandos:

```bash
./configure --prefix=/tools

make
make check
make install
```

Una vez hecho, retrocedemos un directorio y borramos el directorio principal de Gzip:

<p align="center">
     <img src="https://funkyimg.com/i/349jy.png">
</p><br>

##### Compilación Make

Para la compilación de este paquete, haremos uso del paquete `make-4.3.tar.gz`. Una vez descomprimido, nos meteremos dentro del directorio descomprimido y aplicaremos los siguientes comandos:

```bash
./configure --prefix=/tools --without-guile

make
make check
make install
```

Una vez hecho, retrocedemos un directorio y borramos el directorio principal de Make:

<p align="center">
     <img src="https://funkyimg.com/i/349jQ.png">
</p><br>

##### Compilación Patch

Para la compilación de este paquete, haremos uso del paquete `patch-2.7.6.tar.xz`. Una vez descomprimido, nos meteremos dentro del directorio descomprimido y aplicaremos los siguientes comandos:

```bash
./configure --prefix=/tools

make
make check
make install
```

En este paquete, a la hora de hacer un `make check`, es posible que el campo **XFAIL** devuelve 2 errores, esto es normal y no habrá de qué preocuparse.

Una vez hecho, retrocedemos un directorio y borramos el directorio principal de Patch:

<p align="center">
     <img src="https://funkyimg.com/i/349k9.png">
</p><br>

##### Compilación Perl

Para la compilación de este paquete, haremos uso del paquete `perl-5.30.1.tar.xz`. Una vez descomprimido, nos meteremos dentro del directorio descomprimido y aplicaremos los siguientes comandos:

```bash
sh Configure -des -Dprefix=/tools -Dlibs=-lm -Uloclibpth -Ulocincpth

make
cp -v perl cpan/podlators/scripts/pod2man /tools/bin
mkdir -pv /tools/lib/perl5/5.30.1
cp -Rv lib/* /tools/lib/perl5/5.30.1
```

Una vez hecho, retrocedemos un directorio y borramos el directorio principal de Perl:

<p align="center">
     <img src="https://funkyimg.com/i/349kE.png">
</p><br>

##### Compilación Python

Para la compilación de este paquete, haremos uso del paquete `Python-3.8.1.tar.xz`. Una vez descomprimido, nos meteremos dentro del directorio descomprimido y aplicaremos los siguientes comandos:

```bash
sed -i '/def add_multiarch_paths/a \        return' setup.py
./configure --prefix=/tools --without-ensurepip
make
make install
```

**Anotación**: Si al hacer un `make install` en la fase final da un error, lo que habrá que hacer será volver a descomprimir el comprimido de Python y esta vez en el archivo `setup.py`, nos iremos nosotros manualmente a la línea que pone `add_multiarch_paths`. Una vez situados, justamente debajo de la función, correctamente tabulado pondremos la palabra `return`.

Una vez hecho, retrocedemos un directorio y borramos el directorio principal de Python:

<p align="center">
     <img src="https://funkyimg.com/i/349mg.png">
</p><br>

##### Compilación Sed

Para la compilación de este paquete, haremos uso del paquete `sed-4.8.tar.xz`. Una vez descomprimido, nos meteremos dentro del directorio descomprimido y aplicaremos los siguientes comandos:

```bash
./configure --prefix=/tools
make
make check
make install
```

Una vez hecho, retrocedemos un directorio y borramos el directorio principal de Sed:

<p align="center">
     <img src="https://funkyimg.com/i/349mu.png">
</p><br>

##### Compilación Tar

Para la compilación de este paquete, haremos uso del paquete `tar-1.32.tar.xz`. Una vez descomprimido, nos meteremos dentro del directorio descomprimido y aplicaremos los siguientes comandos:

```bash
./configure --prefix=/tools
make
make check
make install
```

Una vez hecho, retrocedemos un directorio y borramos el directorio principal de Tar:

<p align="center">
     <img src="https://funkyimg.com/i/349n3.png">
</p><br>

##### Compilación Texinfo

Para la compilación de este paquete, haremos uso del paquete `texinfo-6.7.tar.xz`. Una vez descomprimido, nos meteremos dentro del directorio descomprimido y aplicaremos los siguientes comandos:

```bash
./configure --prefix=/tools
make
make check
make install
```

Una vez hecho, retrocedemos un directorio y borramos el directorio principal de Texinfo:

<p align="center">
     <img src="https://funkyimg.com/i/349oM.png">
</p><br>

##### Compilación Xz

Madre mía, último paquete a instalar... si señor, buen trabajo. Aún así prepárate, que luego vendrán muchos más.

Para la compilación de este paquete, haremos uso del paquete `xz-5.2.4.tar.xz`. Una vez descomprimido, nos meteremos dentro del directorio descomprimido y aplicaremos los siguientes comandos:

```bash
./configure --prefix=/tools
make
make check
make install
```

Una vez hecho, retrocedemos un directorio y borramos el directorio principal de Xz:

<p align="center">
     <img src="https://funkyimg.com/i/349p5.png">
</p><br>

#### Stripping

Este apartado es totalmente opcional, irá destinado a eliminar elementos innecesarios. Pensemos en que los ejecutables y las bibliotecas construidas hasta ahora contienen aproximadamente unos 70 MB de símbolos de depuración innecesarios.

Para eliminar estos símbolos, podemos ejecutar el siguiente comando:

```bash
strip --strip-debug /tools/lib/*
/usr/bin/strip --strip-unneeded /tools/{,s}bin/*
```

Para salvar más espacio, eliminaremos las documentaciones y archivos innecesarios:

```bash
rm -rf /tools/{,share}/{info,man,doc}
find /tools/{lib,libexec} -name \*.la -delete
```

<p align="center">
     <img src="https://funkyimg.com/i/349pq.png">
</p><br>

En este punto, toca hacer una nueva Snapshot antes de continuar:

<p align="center">
     <img src="https://funkyimg.com/i/349pt.png">
</p><br>

#### Cambio de Propietario

Actualmente, la ruta '*$LFS/tools*' tiene como propietario asignado al usuario **lfs**, un usuario que existe sólo en el sistema host.

Lo que haremos por el momento será cambiar el propietario y el grupo asignado de forma recursiva al usuario **root**, de la siguiente forma:

```bash
chown -R root:root $LFS/tools
```

**IMPORTANTE**: Esto hay que hacerlo como el usuario `root`, por tanto, ejecutamos primero el comando **exit** para salir de la sesión del usuario `lfs`.

Construyendo el sistema LFS
===============================================================================================================================

#### Preparando el sistema de archivos del kernel virtual
Comenzaremos creando los directorios en los que se montarán los sistemas de archivos:

```bash
mkdir -pv $LFS/{dev,proc,sys,run}
```

Cuando el kernel arranca el sistema, se requiere de la presencia de unos pocos nodos de dispositivo, en particular los dispositivos `console` y `nul`. Estos nodos del dispositivo deben crearse en el disco duro para que estén disponibles antes de que se inicie `udevd` y, además, cuando se inicie Linux `init=/bin/bash`.

Podemos crear estos dispositivos ejecutando los siguientes comandos:

```bash
mknod -m 600 $LFS/dev/console c 5 1
mknod -m 666 $LFS/dev/null c 1 3
```

Ya en este punto, crearemos un sistema de archivos virtual en el directorio `/dev` para permitir que los dispositivos se creen dinámicamente a medida que estos son detectados o accedidos:

```bash
mount -v --bind /dev $LFS/dev
```

<p align="center">
     <img src="https://funkyimg.com/i/349qt.png">
</p><br>

#### Montaje del sistema de archivos del kernel virtual

En este punto, montaremos los sistemas de archivos del kernel virtual restantes:

```bash
mount -vt devpts devpts $LFS/dev/pts -o gid=5,mode=620
mount -vt proc proc $LFS/proc
mount -vt sysfs sysfs $LFS/sys
mount -vt tmpfs tmpfs $LFS/run
```

En algunos sistemas host, `/dev/shm` es un enlace simbólico a `/run/shm`. El `tmpfs` **/run** fue montado arriba, por tanto en este caso... sólo es necesario crear un directorio:

```bash
if [ -h $LFS/dev/shm ]; then
  mkdir -pv $LFS/$(readlink $LFS/dev/shm)
fi
```

<p align="center">
     <img src="https://funkyimg.com/i/349qC.png">
</p><br>

#### Entrando en el entorno Chroot

A partir de aquí, ingresaremos al entorno chroot para comenzar a construir e instalar nuestro sistema Linux final.

Como el usuario **root**, ejecutaremos el siguiente comando:

```bash
chroot "$LFS" /tools/bin/env -i \
    HOME=/root                  \
    TERM="$TERM"                \
    PS1='(lfs chroot) \u:\w\$ ' \
    PATH=/bin:/usr/bin:/sbin:/usr/sbin:/tools/bin \
    /tools/bin/bash --login +h
```

Una vez ejecutado, deberíamos ver algo como esto:

<p align="center">
     <img src="https://funkyimg.com/i/349qP.png">
</p><br>

Como vemos, en '*/sources*' deberíamos ver todos nuestros archivos comprimidos que habíamos obtenido del archivo **wget-list**.

Si esto es así, podremos continuar.

##### Creación de directorios

Antes de continuar, será necesario crear una estructura base para el sistema de archivos de nuestro sistema Linux. Crearemos un árbol estándar de directorios ejecutando los siguientes comandos:

```bash
mkdir -pv /{bin,boot,etc/{opt,sysconfig},home,lib/firmware,mnt,opt}
mkdir -pv /{media/{floppy,cdrom},sbin,srv,var}
install -dv -m 0750 /root
install -dv -m 1777 /tmp /var/tmp
mkdir -pv /usr/{,local/}{bin,include,lib,sbin,src}
mkdir -pv /usr/{,local/}share/{color,dict,doc,info,locale,man}
mkdir -v  /usr/{,local/}share/{misc,terminfo,zoneinfo}
mkdir -v  /usr/libexec
mkdir -pv /usr/{,local/}share/man/man{1..8}
mkdir -v  /usr/lib/pkgconfig

case $(uname -m) in
 x86_64) mkdir -v /lib64 ;;
esac

mkdir -v /var/{log,mail,spool}
ln -sv /run /var/run
ln -sv /run/lock /var/lock
mkdir -pv /var/{opt,cache,lib/{color,misc,locate},local}
```

<p align="center">
     <img src="https://funkyimg.com/i/349rN.png">
</p><br>

##### Creación de archivos esenciales y Links Simbólicos

Algunos programas usan rutas "cableadas" a programas que aún no existen. Para satisfacer la accesibilidad de estos programas, crearemos una serie de enlaces simbólicos los cuales serán reemplazados por archivos reales:

```bash
ln -sv /tools/bin/{bash,cat,chmod,dd,echo,ln,mkdir,pwd,rm,stty,touch} /bin
ln -sv /tools/bin/{env,install,perl,printf}         /usr/bin
ln -sv /tools/lib/libgcc_s.so{,.1}                  /usr/lib
ln -sv /tools/lib/libstdc++.{a,so{,.6}}             /usr/lib
ln -sv bash /bin/sh
```

<p align="center">
     <img src="https://funkyimg.com/i/349rQ.png">
</p><br>

Una vez hecho, para satisfacer las utilidades que esperan la presencia de `/etc/mtab`, crearemos otro enlace simbólico:

```bash
ln -sv /proc/self/mounts /etc/mtab
```

Para que el usuario **root** pueda iniciar sesión y para que se reconozca el nombre **root**, deben de haber entradas relevantes en los archivos '*/etc/passwd*' y '*/etc/group*'.

Crearemos estos archivos de la siguiente forma:

```bash
cat > /etc/passwd << "EOF"
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/dev/null:/bin/false
daemon:x:6:6:Daemon User:/dev/null:/bin/false
messagebus:x:18:18:D-Bus Message Daemon User:/var/run/dbus:/bin/false
nobody:x:99:99:Unprivileged User:/dev/null:/bin/false
EOF

cat > /etc/group << "EOF"
root:x:0:
bin:x:1:daemon
sys:x:2:
kmem:x:3:
tape:x:4:
tty:x:5:
daemon:x:6:
floppy:x:7:
disk:x:8:
lp:x:9:
dialout:x:10:
audio:x:11:
video:x:12:
utmp:x:13:
usb:x:14:
cdrom:x:15:
adm:x:16:
messagebus:x:18:
input:x:24:
mail:x:34:
kvm:x:61:
wheel:x:97:
nogroup:x:99:
users:x:999:
EOF
```

Por último, para eliminar la cadena **I have no name!**, iniciaremos una nueva shell:

```bash
exec /tools/bin/bash --login +h
```

Todo este proceso, debería verse de la siguiente forma:

<p align="center">
     <img src="https://funkyimg.com/i/349rP.png">
</p><br>

Al final de la imagen, lo que he hecho ha sido inicializar los archivos de registro y asignarles los permisos adecuados, serían estos comandos:

```bash
touch /var/log/{btmp,lastlog,faillog,wtmp}
chgrp -v utmp /var/log/lastlog
chmod -v 664  /var/log/lastlog
chmod -v 600  /var/log/btmp
```

#### Instalación del Software básico del sistema

Comienza una nueva labor de compilación, esta vez en el entorno chroot. Si la anterior nos pareció larga... en esta sí que habrá que armarse de paciencia, porque será el triple de larga.

Os iré definiendo por cada paquete los comandos que tendréis que ir ejecutando a nivel de sistema. La compilación de estos paquetes si seguís paso a paso los comandos no os deberían de dar error (salvo algún que otro `make check`, pero por lo demás las instalaciones se deberían realizar correctamente).

Antes de proseguir, deberemos situarnos en el directorio `/sources`, que es donde se sitúan todos los comprimidos.

##### API Headers en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
make mrproper

make headers
find usr/include -name '.*' -delete
rm usr/include/Makefile
cp -rv usr/include/* /usr/include
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Man pages en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos el siguiente comando:

```bash
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Glibc en LFS

**AVISO:** La compilación e instalación de este paquete puede demorar bastante tiempo, así que tendréis que salir un poco a tomar el aire. Asimismo, la fase del `make check` es normal que de algún que otro fallo, pero no hay de qué preocuparse.

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
patch -Np1 -i ../glibc-2.31-fhs-1.patch

case $(uname -m) in
    i?86)   ln -sfv ld-linux.so.2 /lib/ld-lsb.so.3
    ;;
    x86_64) ln -sfv ../lib/ld-linux-x86-64.so.2 /lib64
            ln -sfv ../lib/ld-linux-x86-64.so.2 /lib64/ld-lsb-x86-64.so.3
    ;;
esac

mkdir -v build
cd       build

CC="gcc -ffile-prefix-map=/tools=/usr" \
../configure --prefix=/usr                          \
             --disable-werror                       \
             --enable-kernel=3.2                    \
             --enable-stack-protector=strong        \
             --with-headers=/usr/include            \
             libc_cv_slibdir=/lib

make

case $(uname -m) in
  i?86)   ln -sfnv $PWD/elf/ld-linux.so.2        /lib ;;
  x86_64) ln -sfnv $PWD/elf/ld-linux-x86-64.so.2 /lib ;;
esac

make check

touch /etc/ld.so.conf
sed '/test-installation/s@$(PERL)@echo not running@' -i ../Makefile
make install
cp -v ../nscd/nscd.conf /etc/nscd.conf
mkdir -pv /var/cache/nscd
```

Deberíais poder llegar hasta aquí sin problemas:

<p align="center">
     <img src="https://funkyimg.com/i/349xv.png">
</p><br>

Ahora bien, toca instalar las configuraciones regionales. Ejecutaremos estos comandos:

```bash
mkdir -pv /usr/lib/locale
localedef -i POSIX -f UTF-8 C.UTF-8 2> /dev/null || true
localedef -i cs_CZ -f UTF-8 cs_CZ.UTF-8
localedef -i de_DE -f ISO-8859-1 de_DE
localedef -i de_DE@euro -f ISO-8859-15 de_DE@euro
localedef -i de_DE -f UTF-8 de_DE.UTF-8
localedef -i el_GR -f ISO-8859-7 el_GR
localedef -i en_GB -f UTF-8 en_GB.UTF-8
localedef -i en_HK -f ISO-8859-1 en_HK
localedef -i en_PH -f ISO-8859-1 en_PH
localedef -i en_US -f ISO-8859-1 en_US
localedef -i en_US -f UTF-8 en_US.UTF-8
localedef -i es_MX -f ISO-8859-1 es_MX
localedef -i fa_IR -f UTF-8 fa_IR
localedef -i fr_FR -f ISO-8859-1 fr_FR
localedef -i fr_FR@euro -f ISO-8859-15 fr_FR@euro
localedef -i fr_FR -f UTF-8 fr_FR.UTF-8
localedef -i it_IT -f ISO-8859-1 it_IT
localedef -i it_IT -f UTF-8 it_IT.UTF-8
localedef -i ja_JP -f EUC-JP ja_JP
localedef -i ja_JP -f SHIFT_JIS ja_JP.SIJS 2> /dev/null || true
localedef -i ja_JP -f UTF-8 ja_JP.UTF-8
localedef -i ru_RU -f KOI8-R ru_RU.KOI8-R
localedef -i ru_RU -f UTF-8 ru_RU.UTF-8
localedef -i tr_TR -f UTF-8 tr_TR.UTF-8
localedef -i zh_CN -f GB18030 zh_CN.GB18030
localedef -i zh_HK -f BIG5-HKSCS zh_HK.BIG5-HKSCS
```

Y por último, este otro comando, el cual puede llevar bastante tiempo:

```bash
make localedata/install-locales
```

<p align="center">
     <img src="https://funkyimg.com/i/349xN.png">
</p><br>


Una vez hecho, crearemos un nuevo archivo '*/etc/nsswitch.conf*' aplicando el siguiente comando:

```bash
cat > /etc/nsswitch.conf << "EOF"
# Begin /etc/nsswitch.conf

passwd: files
group: files
shadow: files

hosts: files dns
networks: files

protocols: files
services: files
ethers: files
rpc: files

# End /etc/nsswitch.conf
EOF
```

Este archivo es necesario dado que los valores predeterminados **Glibc** no funcionan correctamente en un entorno de red.

Añadiremos los datos relacionados con la zona horaria ejecutando los siguientes comandos:

```bash
tar -xf ../../tzdata2019c.tar.gz

ZONEINFO=/usr/share/zoneinfo
mkdir -pv $ZONEINFO/{posix,right}

for tz in etcetera southamerica northamerica europe africa antarctica  \
          asia australasia backward pacificnew systemv; do
    zic -L /dev/null   -d $ZONEINFO       ${tz}
    zic -L /dev/null   -d $ZONEINFO/posix ${tz}
    zic -L leapseconds -d $ZONEINFO/right ${tz}
done

cp -v zone.tab zone1970.tab iso3166.tab $ZONEINFO
zic -d $ZONEINFO -p America/New_York
unset ZONEINFO
```

Ya en este punto, ejecutaremos el siguiente comando:

```
tzselect
```

En mi caso estoy en Canarias, por tanto seleccionaré las siguientes opciones:

<p align="center">
     <img src="https://funkyimg.com/i/349zC.png">
</p><br>

Una vez seleccionadas estas opciones, crearemos el siguiente enlace simbólico con el nombre de la zona horaria previamente seleccionada:

```bash
ln -sfv /usr/share/zoneinfo/<xxx> /etc/localtime
```

<p align="center">
     <img src="https://funkyimg.com/i/349zH.png">
</p><br>

Por último, configuraremos el cargador dinámico:

```bash
cat > /etc/ld.so.conf << "EOF"
# Begin /etc/ld.so.conf
/usr/local/lib
/opt/lib

EOF

cat >> /etc/ld.so.conf << "EOF"
# Add an include directory
include /etc/ld.so.conf.d/*.conf

EOF
mkdir -pv /etc/ld.so.conf.d
```

<p align="center">
     <img src="https://funkyimg.com/i/349zW.png">
</p><br>

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Ajuste de la Toolchain

Ahora que se han instalado las bibliotecas de C finales, es hora de ajustar la cadena de herramientas para que se vincule cualquier programa recién compilado con estas bibliotecas nuevas.

Ejecutamos los siguientes comandos:

```bash
mv -v /tools/bin/{ld,ld-old}
mv -v /tools/$(uname -m)-pc-linux-gnu/bin/{ld,ld-old}
mv -v /tools/bin/{ld-new,ld}
ln -sv /tools/bin/ld /tools/$(uname -m)-pc-linux-gnu/bin/ld

gcc -dumpspecs | sed -e 's@/tools@@g'                   \
    -e '/\*startfile_prefix_spec:/{n;s@.*@/usr/lib/ @}' \
    -e '/\*cpp:/{n;s@$@ -isystem /usr/include@}' >      \
    `dirname $(gcc --print-libgcc-file-name)`/specs

echo 'int main(){}' > dummy.c
cc dummy.c -v -Wl,--verbose &> dummy.log
readelf -l a.out | grep ': /lib'
```

Si una vez aplicados estos comandos nos sale el siguiente output, es que todo está correcto:

```bash
[Requesting program interpreter: /lib64/ld-linux-x86-64.so.2]
```

<p align="center">
     <img src="https://funkyimg.com/i/349Ae.png">
</p><br>

Ahora bien, ¿quieres quedarte tranquilo y saber si todo se ha hecho correctamente?, hagamos las siguientes comprobaciones.

```bash
grep -o '/usr/lib.*/crt[1in].*succeeded' dummy.log
grep -B1 '^ /usr/include' dummy.log
grep 'SEARCH.*/usr/lib' dummy.log |sed 's|; |\n|g'
grep "/lib.*/libc.so.6 " dummy.log
grep found dummy.log
```

Si la ejecución de cada uno de estos comandos nos devuelve los siguientes resultados, es que todo está correcto:

<p align="center">
     <img src="https://funkyimg.com/i/349Ev.png">
</p><br>

El último comando ejecutado, es para limpiar los archivos de prueba:

```bash
rm -v dummy.c a.out dummy.log
```

Como esta fase ha llevado su tiempo, lo mejor es hacer otra Snapshot:

<p align="center">
     <img src="https://funkyimg.com/i/349EP.png">
</p><br>

##### Zlib en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr

make
make check
make install

mv -v /usr/lib/libz.so.* /lib
ln -sfv ../../lib/$(readlink /usr/lib/libz.so) /usr/lib/libz.so
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Bzip2 en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
patch -Np1 -i ../bzip2-1.0.8-install_docs-1.patch
sed -i 's@\(ln -s -f \)$(PREFIX)/bin/@\1@' Makefile
sed -i "s@(PREFIX)/man@(PREFIX)/share/man@g" Makefile
make -f Makefile-libbz2_so
make clean

make
make PREFIX=/usr install

cp -v bzip2-shared /bin/bzip2
cp -av libbz2.so* /lib
ln -sv ../../lib/libbz2.so.1.0 /usr/lib/libbz2.so
rm -v /usr/bin/{bunzip2,bzcat,bzip2}
ln -sv bzip2 /bin/bunzip2
ln -sv bzip2 /bin/bzcat
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Xz en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr    \
            --disable-static \
            --docdir=/usr/share/doc/xz-5.2.4

make
make check

make install
mv -v   /usr/bin/{lzma,unlzma,lzcat,xz,unxz,xzcat} /bin
mv -v /usr/lib/liblzma.so.* /lib
ln -svf ../../lib/$(readlink /usr/lib/liblzma.so) /usr/lib/liblzma.so
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### File en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr
make
make check
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Readline en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
sed -i '/MV.*old/d' Makefile.in
sed -i '/{OLDSUFF}/c:' support/shlib-install

./configure --prefix=/usr    \
            --disable-static \
            --docdir=/usr/share/doc/readline-8.0

make SHLIB_LIBS="-L/tools/lib -lncursesw"
make SHLIB_LIBS="-L/tools/lib -lncursesw" install
mv -v /usr/lib/lib{readline,history}.so.* /lib
chmod -v u+w /lib/lib{readline,history}.so.*
ln -sfv ../../lib/$(readlink /usr/lib/libreadline.so) /usr/lib/libreadline.so
ln -sfv ../../lib/$(readlink /usr/lib/libhistory.so ) /usr/lib/libhistory.so

install -v -m644 doc/*.{ps,pdf,html,dvi} /usr/share/doc/readline-8.0
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### M4 en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
sed -i 's/IO_ftrylockfile/IO_EOF_SEEN/' lib/*.c
echo "#define _IO_IN_BACKUP 0x100" >> lib/stdio-impl.h

./configure --prefix=/usr
make
make check
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Bc en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
PREFIX=/usr CC=gcc CFLAGS="-std=c99" ./configure.sh -G -O3

make
make test
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Binutils en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, comenzaremos haciendo una pequeña verificación con el siguiente comando:

```bash
expect -c "spawn ls"
```

Si la ejecución de este comando devuelve el siguiente output:

```bash
spawn ls
```

Entonces podemos quedarnos tranquilos.

Posteriormente, ejecutaremos los siguientes comandos:

```bash
sed -i '/@\tincremental_copy/d' gold/testsuite/Makefile.in
make -v build
cd build

../configure --prefix=/usr       \
             --enable-gold       \
             --enable-ld=default \
             --enable-plugins    \
             --enable-shared     \
             --disable-werror    \
             --enable-64-bit-bfd \
             --with-system-zlib

make tooldir=/usr
make -k check
make tooldir=/usr install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### GMP en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr    \
            --enable-cxx     \
            --disable-static \
            --docdir=/usr/share/doc/gmp-6.2.0

make
make html
make check 2>&1 | tee gmp-check-log
awk '/# PASS:/{total+=$3} ; END{print total}' gmp-check-log # Verificamos que la ejecución de este comando devuelva un número mayor a 190
make install
make install-html
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### MPFR en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr        \
            --disable-static     \
            --enable-thread-safe \
            --docdir=/usr/share/doc/mpfr-4.0.2

make
make html
make check
make install
make install-html
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### MPC en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr    \
            --disable-static \
            --docdir=/usr/share/doc/mpc-1.1.0

make
make html
make check
make install
make install-html
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Attr en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr     \
            --bindir=/bin     \
            --disable-static  \
            --sysconfdir=/etc \
            --docdir=/usr/share/doc/attr-2.4.48

make
make check
make install

mv -v /usr/lib/libattr.so.* /lib
ln -sfv ../../lib/$(readlink /usr/lib/libattr.so) /usr/lib/libattr.so
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Acl en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr         \
            --bindir=/bin         \
            --disable-static      \
            --libexecdir=/usr/lib \
            --docdir=/usr/share/doc/acl-2.2.53

make
make install

mv -v /usr/lib/libacl.so.* /lib
ln -sfv ../../lib/$(readlink /usr/lib/libacl.so) /usr/lib/libacl.so
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Instalación del Shadow

Para configurar el **Shadow** en nuestro sistema Linux, comenzaremos descomprimiendo el comprimido correspondiente. Posteriormente, ejecutaremos los siguientes comandos:

```bash
sed -i 's/groups$(EXEEXT) //' src/Makefile.in
find man -name Makefile.in -exec sed -i 's/groups\.1 / /'   {} \;
find man -name Makefile.in -exec sed -i 's/getspnam\.3 / /' {} \;
find man -name Makefile.in -exec sed -i 's/passwd\.5 / /'   {} \;

sed -i -e 's@#ENCRYPT_METHOD DES@ENCRYPT_METHOD SHA512@' \
       -e 's@/var/spool/mail@/var/mail@' etc/login.defs

sed -i 's@DICTPATH.*@DICTPATH\t/lib/cracklib/pw_dict@' etc/login.defs
sed -i 's/1000/999/' etc/useradd
./configure --sysconfdir=/etc --with-group-name-max-length=32

make
make install
```

Una vez hecho, configuramos el shadow habilitando las `shadowed passwords` y las `shadowed group passwords`:

```bash
pwconv
grpconv
```

Por último, asignaremos una contraseña al usuario root:

```bash
passwd root
```

<p align="center">
     <img src="https://funkyimg.com/i/349QH.png">
</p><br>

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### GCC en LFS

**AVISO**: La instalación de este paquete puede demorar MUCHO tiempo, así que paciencia.

Comenzaremos descomprimiendo el comprimido correspondiente. Una vez hecho, ejecutaremos los siguientes comandos:

```bash
case $(uname -m) in
  x86_64)
    sed -e '/m64=/s/lib64/lib/' \
        -i.orig gcc/config/i386/t-linux64
  ;;
esac

sed -e '1161 s|^|//|' \
    -i libsanitizer/sanitizer_common/sanitizer_platform_limits_posix.cc

mkdir -v build
cd build

SED=sed                               \
../configure --prefix=/usr            \
             --enable-languages=c,c++ \
             --disable-multilib       \
             --disable-bootstrap      \
             --with-system-zlib

make

ulimit -s 32768

chown -Rv nobody . 
su nobody -s /bin/bash -c "PATH=$PATH make -k check" # Es normal que puedan salir errores en la ejecución de este comando, no hay de qué preocuparse.

../contrib/test_summary
```

Una vez hecho, proseguiremos con la instalación:

```bash
make install
rm -rf /usr/lib/gcc/$(gcc -dumpmachine)/9.2.0/include-fixed/bits/

chown -v -R root:root \
    /usr/lib/gcc/*linux-gnu/9.2.0/include{,-fixed}

ln -sv ../usr/bin/cpp /lib

ln -sv gcc /usr/bin/cc

install -v -dm755 /usr/lib/bfd-plugins
ln -sfv ../../libexec/gcc/$(gcc -dumpmachine)/9.2.0/liblto_plugin.so \
        /usr/lib/bfd-plugins/
```

¿Hay alguna forma en este punto de saber si la instalación se ha realizado con éxito?, efectivamente, tenemos una forma.

La idea será ejecutar los siguientes comandos:

```bash
echo 'int main(){}' > dummy.c
cc dummy.c -v -Wl,--verbose &> dummy.log
readelf -l a.out | grep ': /lib'

grep -o '/usr/lib.*/crt[1in].*succeeded' dummy.log

grep -B4 '^ /usr/include' dummy.log

grep 'SEARCH.*/usr/lib' dummy.log |sed 's|; |\n|g'

grep "/lib.*/libc.so.6 " dummy.log

grep found dummy.log

rm -v dummy.c a.out dummy.log

mkdir -pv /usr/share/gdb/auto-load/usr/lib
mv -v /usr/lib/*gdb.py /usr/share/gdb/auto-load/usr/lib
```

Para saber si todo está en orden, deberás comparar el output con lo siguiente que me sale a mi:

<p align="center">
     <img src="https://funkyimg.com/i/34ap1.png">
</p><br>

Si los outputs te coinciden por la ejecución de cada comando aislado, entonces está todo correcto y podrás continuar.

Como esta fase ha llevado mucho tiempo, lo suyo será hacer otra Snapshot:

<p align="center">
     <img src="https://funkyimg.com/i/34ape.png">
</p><br>

¡No te olvides de retroceder los directorios correspondientes y borrar el directorio principal del archivo descomprimido!

##### Pk config en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr              \
            --with-internal-glib       \
            --disable-host-tool        \
            --docdir=/usr/share/doc/pkg-config-0.29.2

make
make check
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Ncurses en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
sed -i '/LIBTOOL_INSTALL/d' c++/Makefile.in

./configure --prefix=/usr           \
            --mandir=/usr/share/man \
            --with-shared           \
            --without-debug         \
            --without-normal        \
            --enable-pc-files       \
            --enable-widec

make
make install

mv -v /usr/lib/libncursesw.so.6* /lib
ln -sfv ../../lib/$(readlink /usr/lib/libncursesw.so) /usr/lib/libncursesw.so

for lib in ncurses form panel menu ; do
    rm -vf                    /usr/lib/lib${lib}.so
    echo "INPUT(-l${lib}w)" > /usr/lib/lib${lib}.so
    ln -sfv ${lib}w.pc        /usr/lib/pkgconfig/${lib}.pc
done

rm -vf                     /usr/lib/libcursesw.so
echo "INPUT(-lncursesw)" > /usr/lib/libcursesw.so
ln -sfv libncurses.so      /usr/lib/libcurses.so

mkdir -v       /usr/share/doc/ncurses-6.2
cp -v -R doc/* /usr/share/doc/ncurses-6.2
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Libcap en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
sed -i '/install.*STA...LIBNAME/d' libcap/Makefile
make lib=lib
make test
make lib=lib install
chmod -v 755 /lib/libcap.so.2.31
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Sed en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
sed -i 's/usr/tools/'                 build-aux/help2man
sed -i 's/testsuite.panic-tests.sh//' Makefile.in

./configure --prefix=/usr --bindir=/bin

make
make html
make check

make install
install -d -m755           /usr/share/doc/sed-4.8
install -m644 doc/sed.html /usr/share/doc/sed-4.8
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Psmisc en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr

make
make install

mv -v /usr/bin/fuser   /bin
mv -v /usr/bin/killall /bin
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Iana Etc en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
make
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Bison en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr --docdir=/usr/share/doc/bison-3.5.2
make
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Flex en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
sed -i "/math.h/a #include <malloc.h>" src/flexdef.h

HELP2MAN=/tools/bin/true \
./configure --prefix=/usr --docdir=/usr/share/doc/flex-2.6.4

make
make check
make install

ln -sv flex /usr/bin/lex
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Grep en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr --bindir=/bin

make
make check
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Bash en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
patch -Np1 -i ../bash-5.0-upstream_fixes-1.patch

./configure --prefix=/usr                    \
            --docdir=/usr/share/doc/bash-5.0 \
            --without-bash-malloc            \
            --with-installed-readline

make
chown -Rv nobody .
su nobody -s /bin/bash -c "PATH=$PATH HOME=/home make tests"
make install
mv -vf /usr/bin/bash /bin

exec /bin/bash --login +h
```

Con este último comando, lo que estaremos haciendo será ejecutar el programa **Bash** recientemente compilado, reemplazando así el que se está ejecutando actualmente:

<p align="center">
     <img src="https://funkyimg.com/i/34bmN.png">
</p><br>

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Libtool en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr
make
make check # Es posible que salgan errores, pero no hay de qué preocuparse
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### GDBM en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr    \
            --disable-static \
            --enable-libgdbm-compat

make
make check
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Gperf en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr --docdir=/usr/share/doc/gperf-3.1

make
make -j1 check
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Expat en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
sed -i 's|usr/bin/env |bin/|' run.sh.in

./configure --prefix=/usr    \
            --disable-static \
            --docdir=/usr/share/doc/expat-2.2.9

make
make check
make install

install -v -m644 doc/*.{html,png,css} /usr/share/doc/expat-2.2.9
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Inetutils en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr        \
            --localstatedir=/var \
            --disable-logger     \
            --disable-whois      \
            --disable-rcp        \
            --disable-rexec      \
            --disable-rlogin     \
            --disable-rsh        \
            --disable-servers

make
make check
make install

mv -v /usr/bin/{hostname,ping,ping6,traceroute} /bin
mv -v /usr/bin/ifconfig /sbin
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

Sacaremos otra Snapshot antes de compilar el siguiente paquete:

<p align="center">
     <img src="https://funkyimg.com/i/34boh.png">
</p><br>

##### Perl en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
echo "127.0.0.1 localhost $(hostname)" > /etc/hosts

export BUILD_ZLIB=False
export BUILD_BZIP2=0

sh Configure -des -Dprefix=/usr                 \
                  -Dvendorprefix=/usr           \
                  -Dman1dir=/usr/share/man/man1 \
                  -Dman3dir=/usr/share/man/man3 \
                  -Dpager="/usr/bin/less -isR"  \
                  -Duseshrplib                  \
                  -Dusethreads

make
make test
make install
unset BUILD_ZLIB BUILD_BZIP2
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### XML Parser en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
perl Makefile.PL
make
make test
make install
```

Como veis, es importante por ello tener bien compilado previamente el paquete de **Perl**.

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Intltool en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
sed -i 's:\\\${:\\\$\\{:' intltool-update.in

./configure --prefix=/usr

make
make check
make install

install -v -Dm644 doc/I18N-HOWTO /usr/share/doc/intltool-0.51.0/I18N-HOWTO
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Autoconf en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
sed '361 s/{/\\{/' -i bin/autoscan.in

./configure --prefix=/usr

make
make check # Es posible que salgan errores, pero no hay de qué preocuparse
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Automake en LFS

**AVISO**: Este paquete puede tardar bastante, así que toca armarse una vez más de paciencia.

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr --docdir=/usr/share/doc/automake-1.16.1


make
make -j4 check
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Kmod en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr          \
            --bindir=/bin          \
            --sysconfdir=/etc      \
            --with-rootlibdir=/lib \
            --with-xz              \
            --with-zlib

make
make install

for target in depmod insmod lsmod modinfo modprobe rmmod; do
  ln -sfv ../bin/kmod /sbin/$target
done

ln -sfv kmod /bin/lsmod
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Gettext en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr    \
            --disable-static \
            --docdir=/usr/share/doc/gettext-0.20.1

make
make check
make install

chmod -v 0755 /usr/lib/preloadable_libintl.so
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Libelf de Elfutils en LFS

Este paquete corresponde al que tiene nombre `elfutils-0.178.tar.bz2`.

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr --disable-debuginfod

make
make check # Es posible que salgan errores, pero no hay de qué preocuparse

make -C libelf install
install -vm644 config/libelf.pc /usr/lib/pkgconfig
rm /usr/lib/libelf.a
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Libffi en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr --disable-static --with-gcc-arch=native

make
make check # Es posible que salgan errores, pero no hay de qué preocuparse
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Openssl en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./config --prefix=/usr         \
         --openssldir=/etc/ssl \
         --libdir=lib          \
         shared                \
         zlib-dynamic

make
make test # Es posible que nos salgan fallos, pero no hay de qué preocuparse

sed -i '/INSTALL_LIBS/s/libcrypto.a libssl.a//' Makefile
make MANSUFFIX=ssl install

mv -v /usr/share/doc/openssl /usr/share/doc/openssl-1.1.1d
cp -vfr doc/* /usr/share/doc/openssl-1.1.1d
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Python3 en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr       \
            --enable-shared     \
            --with-system-expat \
            --with-system-ffi   \
            --with-ensurepip=yes

make
make install

make install
chmod -v 755 /usr/lib/libpython3.8.so
chmod -v 755 /usr/lib/libpython3.so
ln -sfv pip3.8 /usr/bin/pip3

install -v -dm755 /usr/share/doc/python-3.8.1/html 

tar --strip-components=1  \
    --no-same-owner       \
    --no-same-permissions \
    -C /usr/share/doc/python-3.8.1/html \
    -xvf ../python-3.8.1-docs-html.tar.bz2
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Ninja en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
export NINJAJOBS=4

sed -i '/int Guess/a \
  int   j = 0;\
  char* jobs = getenv( "NINJAJOBS" );\
  if ( jobs != NULL ) j = atoi( jobs );\
  if ( j > 0 ) return j;\
' src/ninja.cc

python3 configure.py --bootstrap

./ninja ninja_test
./ninja_test --gtest_filter=-SubprocessTest.SetWithLots

install -vm755 ninja /usr/bin/
install -vDm644 misc/bash-completion /usr/share/bash-completion/completions/ninja
install -vDm644 misc/zsh-completion  /usr/share/zsh/site-functions/_ninja
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Meson en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
python3 setup.py build

python3 setup.py install --root=dest
cp -rv dest/* /
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Coreutils en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
patch -Np1 -i ../coreutils-8.31-i18n-1.patch

sed -i '/test.lock/s/^/#/' gnulib-tests/gnulib.mk

autoreconf -fiv
FORCE_UNSAFE_CONFIGURE=1 ./configure \
            --prefix=/usr            \
            --enable-no-install-program=kill,uptime

make
make NON_ROOT_USERNAME=nobody check-root

echo "dummy:x:1000:nobody" >> /etc/group
chown -Rv nobody . 

su nobody -s /bin/bash \
          -c "PATH=$PATH make RUN_EXPENSIVE_TESTS=yes check" # Es posible que aparezcan errores, pero no hay de qué preocuparse

sed -i '/dummy/d' /etc/group

make install

mv -v /usr/bin/{cat,chgrp,chmod,chown,cp,date,dd,df,echo} /bin
mv -v /usr/bin/{false,ln,ls,mkdir,mknod,mv,pwd,rm} /bin
mv -v /usr/bin/{rmdir,stty,sync,true,uname} /bin
mv -v /usr/bin/chroot /usr/sbin
mv -v /usr/share/man/man1/chroot.1 /usr/share/man/man8/chroot.8
sed -i s/\"1\"/\"8\"/1 /usr/share/man/man8/chroot.8

mv -v /usr/bin/{head,nice,sleep,touch} /bin
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Check en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr
make
make check

make docdir=/usr/share/doc/check-0.14.0 install &&
sed -i '1 s/tools/usr/' /usr/bin/checkmk
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Diffutils en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr

make
make check
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Gawk en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
sed -i 's/extras//' Makefile.in

./configure --prefix=/usr

make
make check
make install

mkdir -v /usr/share/doc/gawk-5.0.1
cp    -v doc/{awkforai.txt,*.{eps,pdf,jpg}} /usr/share/doc/gawk-5.0.1
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Findutils en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr --localstatedir=/var/lib/locate

make
make check # Este comando puede mostrar algunos errores, pero no hay de qué preocuparse
make install

mv -v /usr/bin/find /bin
sed -i 's|find:=${BINDIR}|find:=/bin|' /usr/bin/updatedb
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Groff en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
PAGE=A4 ./configure --prefix=/usr
make -j1
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### GRUB en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr          \
            --sbindir=/sbin        \
            --sysconfdir=/etc      \
            --disable-efiemu       \
            --disable-werror

make
make install

mv -v /etc/bash_completion.d/grub /usr/share/bash-completion/completions
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Less en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr --sysconfdir=/etc

make
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Gzip en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr

make
make check # Es posible que aparezcan fallos, pero no hay de qué preocuparse
make install

mv -v /usr/bin/gzip /bin
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Zstd en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
make
make prefix=/usr install

rm -v /usr/lib/libzstd.a
mv -v /usr/lib/libzstd.so.* /lib
ln -sfv ../../lib/$(readlink /usr/lib/libzstd.so) /usr/lib/libzstd.so
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### IPRoute en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
sed -i /ARPD/d Makefile
rm -fv man/man8/arpd.8

sed -i 's/.m_ipt.o//' tc/Makefile

make
make DOCDIR=/usr/share/doc/iproute2-5.5.0 install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Kbd en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
patch -Np1 -i ../kbd-2.2.0-backspace-1.patch

sed -i 's/\(RESIZECONS_PROGS=\)yes/\1no/g' configure
sed -i 's/resizecons.8 //' docs/man/man8/Makefile.in

PKG_CONFIG_PATH=/tools/lib/pkgconfig ./configure --prefix=/usr --disable-vlock

make
make check
make install

mkdir -v       /usr/share/doc/kbd-2.2.0
cp -R -v docs/doc/* /usr/share/doc/kbd-2.2.0
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Libpipeline en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr

make
make check
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Make en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr

make
make PERL5LIB=$PWD/tests/ check
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Patch en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr

make
make check
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### MAN DB en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr                        \
            --docdir=/usr/share/doc/man-db-2.9.0 \
            --sysconfdir=/etc                    \
            --disable-setuid                     \
            --enable-cache-owner=bin             \
            --with-browser=/usr/bin/lynx         \
            --with-vgrind=/usr/bin/vgrind        \
            --with-grap=/usr/bin/grap            \
            --with-systemdtmpfilesdir=           \
            --with-systemdsystemunitdir=

make
make check
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Tar en LFS

**AVISO**: La instalación de este paquete puede demorar un buen rato.

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
FORCE_UNSAFE_CONFIGURE=1  \
./configure --prefix=/usr \
            --bindir=/bin

make
make check
make install

make -C doc install-html docdir=/usr/share/doc/tar-1.32
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Texinfo en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr --disable-static

make
make check
make install

make TEXMF=/usr/share/texmf install-tex

pushd /usr/share/info
rm -v dir
for f in *
  do install-info $f dir 2>/dev/null
done
popd
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Vim en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
echo '#define SYS_VIMRC_FILE "/etc/vimrc"' >> src/feature.h

./configure --prefix=/usr

make

chown -Rv nobody .
su nobody -s /bin/bash -c "LANG=en_US.UTF-8 make -j1 test" &> vim-test.log
make install

ln -sv vim /usr/bin/vi
for L in  /usr/share/man/{,*/}man1/vim.1; do
    ln -sv vim.1 $(dirname $L)/vi.1
done

ln -sv ../vim/vim82/doc /usr/share/doc/vim-8.2.0190

cat > /etc/vimrc << "EOF"
" Begin /etc/vimrc

" Ensure defaults are set before customizing settings, not after
source $VIMRUNTIME/defaults.vim
let skip_defaults_vim=1 

set nocompatible
set backspace=2
set mouse=
syntax on
if (&term == "xterm") || (&term == "putty")
  set background=dark
endif

" End /etc/vimrc
EOF
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Procps en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr                            \
            --exec-prefix=                           \
            --libdir=/usr/lib                        \
            --docdir=/usr/share/doc/procps-ng-3.3.15 \
            --disable-static                         \
            --disable-kill

make

sed -i -r 's|(pmap_initname)\\\$|\1|' testsuite/pmap.test/pmap.exp
sed -i '/set tty/d' testsuite/pkill.test/pkill.exp
rm testsuite/pgrep.test/pgrep.exp
make check

make install

mv -v /usr/lib/libprocps.so.* /lib
ln -sfv ../../lib/$(readlink /usr/lib/libprocps.so) /usr/lib/libprocps.so
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Util Linux en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
mkdir -pv /var/lib/hwclock

./configure ADJTIME_PATH=/var/lib/hwclock/adjtime   \
            --docdir=/usr/share/doc/util-linux-2.35.1 \
            --disable-chfn-chsh  \
            --disable-login      \
            --disable-nologin    \
            --disable-su         \
            --disable-setpriv    \
            --disable-runuser    \
            --disable-pylibmount \
            --disable-static     \
            --without-python     \
            --without-systemd    \
            --without-systemdsystemunitdir

make

chown -Rv nobody .
su nobody -s /bin/bash -c "PATH=$PATH make -k check"

make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### E2fsprogs en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
mkdir -v build
cd build

../configure --prefix=/usr           \
             --bindir=/bin           \
             --with-root-prefix=""   \
             --enable-elf-shlibs     \
             --disable-libblkid      \
             --disable-libuuid       \
             --disable-uuidd         \
             --disable-fsck

make
make check
make install

chmod -v u+w /usr/lib/{libcom_err,libe2p,libext2fs,libss}.a

gunzip -v /usr/share/info/libext2fs.info.gz
install-info --dir-file=/usr/share/info/dir /usr/share/info/libext2fs.info

makeinfo -o      doc/com_err.info ../lib/et/com_err.texinfo
install -v -m644 doc/com_err.info /usr/share/info
install-info --dir-file=/usr/share/info/dir /usr/share/info/com_err.info
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Sysklogd en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
sed -i '/Error loading kernel symbols/{n;n;d}' ksym_mod.c
sed -i 's/union wait/int/' syslogd.c

make

make BINDIR=/sbin install

cat > /etc/syslog.conf << "EOF"
# Begin /etc/syslog.conf

auth,authpriv.* -/var/log/auth.log
*.*;auth,authpriv.none -/var/log/sys.log
daemon.* -/var/log/daemon.log
kern.* -/var/log/kern.log
mail.* -/var/log/mail.log
user.* -/var/log/user.log
*.emerg *

# End /etc/syslog.conf
EOF
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Sysvinit en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
patch -Np1 -i ../sysvinit-2.96-consolidated-1.patch

make
make install
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

##### Eudev en LFS

Para la instalación de este paquete, una vez descomprimido el comprimido correspondiente, ejecutaremos los siguientes comandos:

```bash
./configure --prefix=/usr           \
            --bindir=/sbin          \
            --sbindir=/sbin         \
            --libdir=/usr/lib       \
            --sysconfdir=/etc       \
            --libexecdir=/lib       \
            --with-rootprefix=      \
            --with-rootlibdir=/lib  \
            --enable-manpages       \
            --disable-static

make

mkdir -pv /lib/udev/rules.d
mkdir -pv /etc/udev/rules.d

make check
make install

tar -xvf ../udev-lfs-20171102.tar.xz
make -f udev-lfs-20171102/Makefile.lfs install

udevadm hwdb --update
```

Una vez finalizada la instalación, retrocedemos los directorios necesarios y borramos el directorio principal del descomprimido.

Ya en este punto, creamos una Snapshot:

<p align="center">
     <img src="https://funkyimg.com/i/34bSs.png">
</p><br>

#### Limpieza Final

Comenzaremos colocando los símbolos de depuración para las bibliotecas seleccionadas en archivos separados:

```bash
save_lib="ld-2.31.so libc-2.31.so libpthread-2.31.so libthread_db-1.0.so"

cd /lib

for LIB in $save_lib; do
    objcopy --only-keep-debug $LIB $LIB.dbg 
    strip --strip-unneeded $LIB
    objcopy --add-gnu-debuglink=$LIB.dbg $LIB 
done    

save_usrlib="libquadmath.so.0.0.0 libstdc++.so.6.0.27
             libitm.so.1.0.0 libatomic.so.1.2.0" 

cd /usr/lib

for LIB in $save_usrlib; do
    objcopy --only-keep-debug $LIB $LIB.dbg
    strip --strip-unneeded $LIB
    objcopy --add-gnu-debuglink=$LIB.dbg $LIB
done

unset LIB save_lib save_usrlib
```

Antes de realizar la eliminación, deberemos tener especial cuidado para asegurarnos de que ninguno de los binarios que están a punto de ser borrados se estén ejecutando:

```bash
exec /tools/bin/bash
```

Una vez hecho, ahora los binarios y las bibliotecas se pueden quitar de forma segura:

```bash
/tools/bin/find /usr/lib -type f -name \*.a \
   -exec /tools/bin/strip --strip-debug {} ';'

/tools/bin/find /lib /usr/lib -type f \( -name \*.so* -a ! -name \*dbg \) \
   -exec /tools/bin/strip --strip-unneeded {} ';'

/tools/bin/find /{bin,sbin} /usr/{bin,sbin,libexec} -type f \
    -exec /tools/bin/strip --strip-all {} ';'
```

Finalmente, limpiamos algunos archivos adicionales que quedan de las pruebas en ejecución:

```bash
rm -rf /tmp/*
```

Y ya en este punto, lo que haremos será cerrar sesión y volver a ingresar al entorno chroot con un comando chroot esta vez actualizado.

**IMPORTANTE**: A partir de ahora, en caso de necesitar volver a ingresar al entorno chroot tras salir, deberemos de ejecutar el comando que indico a continuación:

```bash
exit

chroot "$LFS" /usr/bin/env -i          \
    HOME=/root TERM="$TERM"            \
    PS1='(lfs chroot) \u:\w\$ '        \
    PATH=/bin:/usr/bin:/sbin:/usr/sbin \
    /bin/bash --login
```

Una vez dentro, eliminaremos las siguientes biliotecas estáticas las cuales pueden ser borradas sin problema:

```bash
rm -f /usr/lib/lib{bfd,opcodes}.a
rm -f /usr/lib/libbz2.a
rm -f /usr/lib/lib{com_err,e2p,ext2fs,ss}.a
rm -f /usr/lib/libltdl.a
rm -f /usr/lib/libfl.a
rm -f /usr/lib/libz.a
```

Así como los archivos instalados en los directorios '*/usr/lib*' y '*/usr/libexec*':

```bash
find /usr/lib /usr/libexec -name \*.la -delete
```

#### Configuración del sistema
##### Instalación de LFS Bootscripts

Lo que haremos será dirigirnos al directorio '*/sources*' y descomprimir el comprimido correspondiente para este paquete. Una vez descomprimido, aplicaremos el siguiente comando:

```bash
make install
```

##### Gestión de dispositivos

Comenzaremos creando unas reglas de **Udev** personalizadas. Para ello, ejecutaremos los siguientes comandos:

```bash
bash /lib/udev/init-net-rules.sh
cat /etc/udev/rules.d/70-persistent-net.rules
```

Deberíamos ver un output como el siguiente:

<p align="center">
     <img src="https://funkyimg.com/i/34bTu.png">
</p><br>

Sobre este archivo, efectuaremos un pequeño cambio. Como podréis apreciar en la imagen de arriba, el nombre de la interfaz es **enp0s3**, en mi caso lo voy a llamar **eth0**, por tanto abriremos el archivo, lo cambiaremos y posteriormente volveremos a ejecutar los mismos comandos:

<p align="center">
     <img src="https://funkyimg.com/i/34bTN.png">
</p><br>

Una vez hecho, ejecutaremos los siguientes comandos:

```bash
udevadm test /sys/block/sr0

sed -i -e 's/"write_cd_rules"/"write_cd_rules by-id"/' \
    /etc/udev/rules.d/83-cdrom-symlinks.rules
```

Deberíamos ver un output como el siguiente:

<p align="center">
     <img src="https://funkyimg.com/i/34bUo.png">
</p><br>

El archivo situado en `/etc/udev/rules.d/83-cdrom-symlinks.rules` debe de tener el siguiente contenido:

<p align="center">
     <img src="https://funkyimg.com/i/34bUp.png">
</p><br>

Por último, para manejar dispositivos duplicados, ejecutaremos el siguiente comando:

```bash
cat > /etc/udev/rules.d/83-duplicate_devs.rules << "EOF"

# Persistent symlinks for webcam and tuner
KERNEL=="video*", ATTRS{idProduct}=="1910", ATTRS{idVendor}=="0d81", \
    SYMLINK+="webcam"
KERNEL=="video*", ATTRS{device}=="0x036f", ATTRS{vendor}=="0x109e", \
    SYMLINK+="tvtuner"

EOF
```

##### Creación de archivos de configuración de interfaz de red

Nos dirigiremos a la ruta `/etc/sysconfig` y nos crearemos un fichero con nombre `ifconfig.eth0` que posea la siguiente estructura:

```bash
cat > ifconfig.eth0 << "EOF"
ONBOOT=yes
IFACE=eth0
SERVICE=ipv4-static
IP=192.168.1.2
GATEWAY=192.168.1.1
PREFIX=24
BROADCAST=192.168.1.255
EOF
```

En mi caso, lo adaptaré a mi segmento de red:

<p align="center">
     <img src="https://funkyimg.com/i/34bUP.png">
</p><br>

Por otro lado, añadiremos el archivo `/etc/resolv.conf` con el siguiente contenido:

```bash
cat > /etc/resolv.conf << "EOF"
# Begin /etc/resolv.conf

domain <Your Domain Name>
nameserver <IP address of your primary nameserver>
nameserver <IP address of your secondary nameserver>

# End /etc/resolv.conf
EOF
```

Obviamente, cambiaremos sus valores a los correspondientes:

<p align="center">
     <img src="https://funkyimg.com/i/34bUZ.png">
</p><br>

##### Configurando el nombre de host del sistema

Durante el proceso de arranque, el archivo `/etc/hostname` se usa para establecer el nombre de host del sistema.

Lo que haremos será crear este archivo donde ingresaremos nuestro nombre de host:

```bash
echo "s4viOS" > /etc/hostname
```

Por otro lado, nos crearemos el archivo `/etc/hosts` con el siguiente contenido:

```bash
cat > /etc/hosts << "EOF"
# Begin /etc/hosts

127.0.0.1 localhost
127.0.1.1 <FQDN> <HOSTNAME>
<192.168.1.1> <FQDN> <HOSTNAME> [alias1] [alias2 ...]
::1       localhost ip6-localhost ip6-loopback
ff02::1   ip6-allnodes
ff02::2   ip6-allrouters

# End /etc/hosts
EOF
```

Posteriormente, lo adaptaremos a nuestras necesidades:

<p align="center">
     <img src="https://funkyimg.com/i/34bW6.png">
</p><br>

##### Configurando el Sysvinit

Durante la inicialización del núcleo, el primer programa que se ejecuta se especifica en la línea de comando o, por defecto, **init**. Este programa lee el archivo de inicialización '*/etc/inittab*'.

La idea será crear este archivo con el siguiente contenido:

```bash
cat > /etc/inittab << "EOF"
# Begin /etc/inittab

id:3:initdefault:

si::sysinit:/etc/rc.d/init.d/rc S

l0:0:wait:/etc/rc.d/init.d/rc 0
l1:S1:wait:/etc/rc.d/init.d/rc 1
l2:2:wait:/etc/rc.d/init.d/rc 2
l3:3:wait:/etc/rc.d/init.d/rc 3
l4:4:wait:/etc/rc.d/init.d/rc 4
l5:5:wait:/etc/rc.d/init.d/rc 5
l6:6:wait:/etc/rc.d/init.d/rc 6

ca:12345:ctrlaltdel:/sbin/shutdown -t1 -a -r now

su:S016:once:/sbin/sulogin

1:2345:respawn:/sbin/agetty --noclear tty1 9600
2:2345:respawn:/sbin/agetty tty2 9600
3:2345:respawn:/sbin/agetty tty3 9600
4:2345:respawn:/sbin/agetty tty4 9600
5:2345:respawn:/sbin/agetty tty5 9600
6:2345:respawn:/sbin/agetty tty6 9600

# End /etc/inittab
EOF
```

##### Configuración del reloj del sistema

Crearemos un archivo en '*/etc/sysconfig/clock*' con el siguiente contenido:

```bash
cat > /etc/sysconfig/clock << "EOF"
# Begin /etc/sysconfig/clock

UTC=1

# Set this to any options you might need to give to hwclock,
# such as machine hardware clock type for Alphas.
CLOCKPARAMS=

# End /etc/sysconfig/clock
EOF
```

<p align="center">
     <img src="https://funkyimg.com/i/34bWL.png">
</p><br>

##### Configuración de la consola de Linux

En este punto, configuraremos el script de consola que configura el mapa del teclado, la fuente de la consola y el nivel de registro del kernel de la consola.

Nos crearemos un archivo en `/etc/sysconfig/console` con el siguiente contenido (cada uno lo puede adaptar a sus necesidades):

<p align="center">
     <img src="https://funkyimg.com/i/34bXf.png">
</p><br>

##### Creando archivo rc site

Este archivo se sitúa en '*/etc/sysconfig/rc.site*' y ya posee contenido. Lo que haremos será cambiar algunas cosas de este archivo.

Empezaremos por los siguientes datos:

<p align="center">
     <img src="https://funkyimg.com/i/34bXJ.png">
</p><br>

Posteriormente, descomentaremos las siguientes líneas:

<p align="center">
     <img src="https://funkyimg.com/i/34bXW.png">
</p><br>

También descomentaremos las siguientes y cambiaremos sus valores respectivos a **yes**:

<p align="center">
     <img src="https://funkyimg.com/i/34bXV.png">
</p><br>

Por último, cambiaremos el valor del **HOSTNAME** y descomentaremos la línea del **SYSKLOGD**:

<p align="center">
     <img src="https://funkyimg.com/i/34bYf.png">
</p><br>

#### Archivos de inicio de Bash Shell

El programa de shell **/bin/bash** utiliza una colección de archivos de inicio para ayudar a crear un entorno en el que ejecutarse. Cada archivo tiene un uso específico y puede afectar el inicio de sesión, así como los entornos interactivos de manera diferente.

Los archivos '*/etc/profile*' y '*~/.bash_profile*' son leídos en el momento en el que se invoca la shell como una shell de inicio de sesión interactivo.

La lista de todos los entornos locales compatibles con Glibc se pueden obtener ejecutando el siguiente comando:

```locale -a```

Simplemente seguid mis pasos para configurarlo de la misma manera:

<p align="center">
     <img src="https://funkyimg.com/i/34bZq.png">
</p><br>

Una vez hecho, ya estamos listos para adaptar nuestro fichero **profile**. En este caso, también crearemos de una tirada el archivo **inputrc**, un archivo de configuración de la biblioteca Readline, que proporciona capacidades de edición mientras el usuario ingresa una línea desde la terminal.

Este funciona traduciendo las entradas del teclado en acciones específicas:

<p align="center">
     <img src="https://funkyimg.com/i/34bZr.png">
</p><br>

Por otro lado, crearemos el archivo '*/etc/shells*', el cual contiene una lista de shells de inicio de sesión en el sistema:

```bash
cat > /etc/shells << "EOF"
# Begin /etc/shells

/bin/sh
/bin/bash

# End /etc/shells
EOF
```

Haciendo nuestro sistema booteable
===============================================================================================================================

#### Creando archivo fstab

El archivo **fstab** es utilizado por algunos programas para determinar dónde los sistemas de archivos deben de ser montados de forma predeterminada, en qué orden, y qué debe ser comprobado antes del montaje.

Lo que haremos será crear una nueva tabla de sistemas de archivos como esta:

```bash
cat > /etc/fstab << "EOF"
# Begin /etc/fstab

# file system  mount-point  type     options             dump  fsck
#                                                              order

/dev/<xxx>     /            <fff>    defaults            1     1
/dev/<yyy>     swap         swap     pri=1               0     0
proc           /proc        proc     nosuid,noexec,nodev 0     0
sysfs          /sys         sysfs    nosuid,noexec,nodev 0     0
devpts         /dev/pts     devpts   gid=5,mode=620      0     0
tmpfs          /run         tmpfs    defaults            0     0
devtmpfs       /dev         devtmpfs mode=0755,nosuid    0     0

# End /etc/fstab
EOF
```

En ella, ajustaremos los siguientes valores:

<p align="center">
     <img src="https://funkyimg.com/i/34c1v.png">
</p><br>

Probablemente estarás pensando en que me he equivocado con los nombres, ¡pero no!... la idea será que **sdb** pase a convertirse a **sda**, ahora lo veréis con mayor detalle.

#### Instalación del Kernel

Nos dirigiremos a la ruta '*/sources*', y descomprimiremos el siguiente comprimido, aplicando a su vez los siguientes comandos:

<p align="center">
     <img src="https://funkyimg.com/i/34c1T.png">
</p><br>

Una vez hecho, abriremos con **vi** el archivo **.config** generado y haremos las siguientes comprobaciones:

* Confirmamos que **CONFIG_DEVTMPFS=y**
* Confirmamos que **CONFIG_EFI_STUV=y**
* Confirmamos que **CONFIG_UEVENT_HELPER** no esté seteado

<p align="center">
     <img src="https://funkyimg.com/i/34c22.png">
</p><br>

Si esto es así, podremos continuar sin problemas.

Ahora bien, lo que haremos será ejecutar el siguiente comando:

```bash
make menuconfig
```

Esto nos abrirá el siguiente menú:

<p align="center">
     <img src="https://funkyimg.com/i/34c2c.png">
</p><br>

En este menú, nos iremos a la opción que pone **General Setup**. Una vez dentro, veremos lo siguiente:

<p align="center">
     <img src="https://funkyimg.com/i/34c2d.png">
</p><br>

En este punto, cambiaremos el valor de **Default hostname** al de nuestro sistema, en mi caso... **S4viOS**:

<p align="center">
     <img src="https://funkyimg.com/i/34c2e.png">
</p><br>

Una vez cambiado, salimos y guardamos los cambios.

Ya fuera, aplicamos los siguientes comandos para efectuar la compilación:

```bash
make
make modules_install
```

Una vez hecho, continuamos con los siguientes comandos:

```bash
cp -iv arch/x86/boot/bzImage /boot/vmlinuz-5.5.3-lfs-9.1
cp -iv System.map /boot/System.map-5.5.3
cp -iv .config /boot/config-5.5.3
install -d /usr/share/doc/linux-5.5.3
cp -r Documentation/* /usr/share/doc/linux-5.5.3

chown -R 0:0 .
```

<p align="center">
     <img src="https://funkyimg.com/i/34c4b.png">
</p><br>

Para terminar, ejecutamos estos últimos comandos antes de empezar con el GRUB:

```bash
install -v -m755 -d /etc/modprobe.d
cat > /etc/modprobe.d/usb.conf << "EOF"
# Begin /etc/modprobe.d/usb.conf

install ohci_hcd /sbin/modprobe ehci_hcd ; /sbin/modprobe -i ohci_hcd ; true
install uhci_hcd /sbin/modprobe ehci_hcd ; /sbin/modprobe -i uhci_hcd ; true

# End /etc/modprobe.d/usb.conf
EOF
```

<p align="center">
     <img src="https://funkyimg.com/i/34c4h.png">
</p><br>

#### Uso del GRUB para configurar el proceso de arranque

Ejecutaremos los siguientes comandos:

```bash
grub-install /dev/sdb

cat > /boot/grub/grub.cfg << "EOF"
# Begin /boot/grub/grub.cfg
set default=0
set timeout=5

insmod ext2
set root=(hd0,2)

menuentry "GNU/Linux, Linux 5.5.3-lfs-9.1" {
        linux   /boot/vmlinuz-5.5.3-lfs-9.1 root=/dev/sda2 ro
}
EOF
```

Nos debería salir un output tal que así:

<p align="center">
     <img src="https://funkyimg.com/i/34c4B.png">
</p><br>

Eso sí... el archivo `grub.cfg` anteriormente creado deberá ser adaptado. En mi caso, tendrá estos valores:

<p align="center">
     <img src="https://funkyimg.com/i/34c5s.png">
</p><br>

Creando archivos finales
===============================================================================================================================

Nos estamos acercando al final. Para ir concluyendo, nos vamos a ir creando una serie de archivos finales.

Por un lado, nos creamos un archivo `lsb-release`, en mi caso con el siguiente contenido:

<p align="center">
     <img src="https://funkyimg.com/i/34c5E.png">
</p><br>

Por otro lado, creamos el archivo `os-release`, en mi caso con el siguiente contenido:

<p align="center">
     <img src="https://funkyimg.com/i/34c5N.png">
</p><br>

Por último, nos crearemos un archivo `bashrc`:

```bash
cat > /etc/bashrc << "EOF" 
# Begin /etc/bashrc
# Written for Beyond Linux From Scratch
# by James Robertson <jameswrobertson@earthlink.net>
# updated by Bruce Dubbs <bdubbs@linuxfromscratch.org>
# System wide aliases and functions.
# System wide environment variables and startup programs should go 
into
# /etc/profile. Personal environment variables and startup programs
# should go into ~/.bash_profile. Personal aliases and functions 
should
# go into ~/.bashrc
# Provides colored /bin/ls and /bin/grep commands. Used in 
conjunction
# with code in /etc/profile.
alias ls='ls --color=auto'
alias grep='grep --color=auto'
# Provides prompt for non-login shells, specifically shells started
# in the X environment. [Review the LFS archive thread titled
# PS1 Environment Variable for a great case study behind this script
# addendum.]
NORMAL="\[\e[0m\]"
RED="\[\e[1;31m\]"
GREEN="\[\e[1;32m\]"
if [[ $EUID == 0 ]] ; then
PS1="$RED\u [ $NORMAL\w$RED ]# $NORMAL"
else
PS1="$GREEN\u [ $NORMAL\w$GREEN ]\$ $NORMAL"
fi
unset RED GREEN NORMAL
# End /etc/bashrc
EOF
```

Arrancando nuestra nueva distribución Linux S4viOS
===============================================================================================================================

Antes de reiniciar, desmontaremos todas las monturas que teníamos previamente creadas:

```bash
umount -v $LFS/dev/pts
umount -v $LFS/dev
umount -v $LFS/run
umount -v $LFS/proc
umount -v $LFS/sys
cd /
umount -v $LFS
```

<p align="center">
     <img src="https://funkyimg.com/i/34c6r.png">
</p><br>

Atentos al comando final:

```bash
shutdown -F now
```

Una vez hecho, como es de esperar... nuestra máquina virtual se habrá apagado. Ahora bien, lo que haremos será lo siguiente, como dije anteriormente de lo que definimos en el **fstab**, nuestro **sdb** se va a convertir en **sda**, ¿cómo?, pues simplemente quitando el disco del sistema Host con Debian.

Es decir, tenemos estos 2:

<p align="center">
     <img src="https://funkyimg.com/i/34c6w.png">
</p><br>

Pues lo que hacemos es quitar el **Debian Base**, que es con el que nos hemos construido nuestro sistema Linux residente en el otro disco. Nos debería quedar algo así:

<p align="center">
     <img src="https://funkyimg.com/i/34c6x.png">
</p><br>

¡Arranquemos la máquina virtual y veamos qué pasa!:

<p align="center">
     <img src="https://funkyimg.com/i/34c6F.png">
</p><br>

Esto tiene muy buena pinta, presionamos Enter:

<p align="center">
     <img src="https://funkyimg.com/i/34c6E.png">
</p><br>

¡Qué preciosidad!, nuestro propio sistema Linux cobrando vida, ¡vamos a iniciar sesión!:

<p align="center">
     <img src="https://funkyimg.com/i/34c6G.png">
</p><br>

Como veis, perfectamente funcional y con total control de las cosas que hemos ido instalando (sin cosas raras):

<p align="center">
     <img src="https://funkyimg.com/i/34c6H.png">
</p><br>

Ya en este punto, podríamos continuar con la instalación y configuración de la interfaz gráfica, pero... esto lo haré en otra **guía aparte** siempre y cuando vea que este Gist recibe apoyo :)

Mientras tanto, os dejo por aquí un vídeo de mi canal de YouTube donde os enseño paso a paso a configurar un buen entorno de trabajo en Linux:

[https://www.youtube.com/watch?v=MF4qRSedmEs](https://www.youtube.com/watch?v=MF4qRSedmEs)

Quién sabe, igual podremos hacer luego una fusión con **S4viOS**. 

Para aquellos que por X razones quieran descargar la distribución (igual lo queréis para verificar ciertas cosas), os dejo el enlace de descarga de la máquina por aquí: 

* [https://drive.google.com/file/d/1GACSGENgHvWr2v_8JbcUieLyZAoU11qe/view?usp=sharing](https://drive.google.com/file/d/1GACSGENgHvWr2v_8JbcUieLyZAoU11qe/view?usp=sharing)

> **Usuario de la máquina**: root

> **Contraseña**: nmapypadentro

¡Un saludo y que os sea leve!