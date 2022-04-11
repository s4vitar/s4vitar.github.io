var count = (function () {
	var counter = {};
	return function (v) {
		return (counter[v] = (counter[v] || 0) + 1);
	};
})();

const Dataset = [
	{
		name: "Tentacle",
		id: count(),
		sku: crypto.randomUUID(),
		ip: "10.10.10.244",
		so: "linux",
		dificultad: "Difícil",
		skills: "DNS Enumeration (dnsenum), SQUID Proxy, WPAD Enumeration, SQLI (Error Based) [WHQIS], PCAP Analysis (Tshark && Wireshark), Abusing Rootkit",
		like: "eCCPv2 eCPTXv2 OSCP OSEP eWPT eWPTXv2 eWPTXv2 OSWE",
		youtube: "https://www.youtube.com/watch?v=hFIWuWVIDek", 
		resuelta: true,
	},
];

// Dataset.push({
// 	id:,
// 	sku:,
// 	name:,
// 	ip:,
// 	so:,
// 	dificultad:,
// 	skills:,
// 	like:,
// 	youtube:,
// 	resuelta:,
// });

Dataset.push({ name: "Validation",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.11.116",
	so: "Linux",
	dificultad:	"Fácil",
	skills: "SQLI (Error Based) SQLI -> RCE (INTO OUTFILE) Information Leakage",
	like: "eJPT eWPT",
  youtube : "https://www.youtube.com/watch?v=78i-qbhEUVU",
  resuelta: true,
});

Dataset.push({ name: "Mischief",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.92",
	so: "Linux",
	dificultad:	"Difícil",
	skills: "SNMP Enumeration Information Leakage IPV6 ICMP Data Exfiltration (Python Scapy)",
	like: 	"OSCP eWPT eWPTXv2 eCPPTv2 eCPTXv2 OSWE",
  youtube : "https://www.youtube.com/watch?v=Q6vlt9BlnWg",
  resuelta: true,
});

Dataset.push({ name: "Reddish",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.94",
	so: "Linux",
	dificultad: "Insane",
	skills:  "Abusing Node-Red Chisel & Socat Usage Redis-Cli Exploitation Rsync Abusing Cron Exploitation Disk Mount File Transfer Tips PIVOTING",
	like:	"eCPPTv2 eCPTXv2",
  youtube : "https://www.youtube.com/watch?v=XQQ104hWFXE",
  resuelta: true,
});

Dataset.push({ name: "Return",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.11.108",
	so: "Windows",
	dificultad:	"Fácil",
	skills: "Abusing Printer Abusing Server Operators Group Service Configuration Manipulation",
	like: "eJPT OSCP (Escalada)",
  youtube : "https://www.youtube.com/watch?v=5QC5lshrDDo",
  resuelta: true,
});


Dataset.push({ name: "Horizontall",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.11.105",
	so: "Linux",
	dificultad:	"Fácil",
	skills: "Information Leakage Port Forwarding Strapi CMS Exploitation Laravel Exploitation",
	like:	"eWPT eJPT",
  youtube : "https://www.youtube.com/watch?v=s2b-BH0I7R4",
  resuelta: true,
});



Dataset.push({ name: "Pressed",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.11.142",
	so: "Linux",
	dificultad:	"Difícil",
	skills: "Password Guessing WordPress Abusing RPC Calls WordPress XML-RPC Create WebShell PwnKit Exploit",
	like:	"OSCP eWPT eWPTXv2 OSWE",
  youtube : "https://www.youtube.com/watch?v=67TQsX88EtM",
  resuelta: true,
});

Dataset.push({ name: "Epsilon",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.11.134",
	so: "Linux",
	dificultad:	"Media",
	skills: "Git Source Leak Exploit (GitHack) AWS Enumeration Lambda Function Enumeration Authentication Bypass Abusing JWT Server Side Template Injection (SSTI) Tar Symlink Exploitation",
	like:	"eWPT eWPTXv2 OSCP OSWE",
  youtube : "https://www.youtube.com/watch?v=tMsK6ZiB7CQ",
  resuelta: true,
});

Dataset.push({ name: "Jeeves",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.63",
	so: "Windows",
	dificultad:	"Media",
	skills: "Jenkins Exploitation (Groovy Script Console) RottenPotato (SeImpersonatePrivilege) PassTheHash (Psexec) Breaking KeePass Alternate Data Streams (ADS)",
	like:	"OSCP eJPT eWPT",
  youtube : "https://www.youtube.com/watch?v=TwJiEWjI6Go",
  resuelta: true,
});

Dataset.push({ name: "Pit",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.241",
	so: "Linux",
	dificultad:	"Media",
	skills: "Information Leakage SNMP Enumeration (Snmpwalk/Snmpbulkwalk) SeedDMS Exploitation SELinux (Extra) SNMP Code Execution",
	like:	"OSCP eWPT",
  youtube : "https://www.youtube.com/watch?v=mxHbnV_LB20",
  resuelta: true,
});

Dataset.push({ name: "Blackfield",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.192",
	so: "Windows",
	dificultad:	"Difícil",
	skills: "SMB Enumeration Kerberos User Enumeration (Kerbrute) ASRepRoast Attack (GetNPUsers) Bloodhound Enumeration Abusing ForceChangePassword Privilege (net rpc) Lsass Dump Analysis (Pypykatz) Abusing WinRM SeBackupPrivilege Exploitation DiskShadow Robocopy Usage NTDS Credentials Extraction (secretsdump)",
	like: "OSCP OSEP",
  youtube : "https://www.youtube.com/watch?v=0cPq2UV2vmg",
  resuelta: true,
});

Dataset.push({ name: "EarlyAccess",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.11.110",
	so: "Linux",
	dificultad:	"Difícil",
	skills: "XSS Injection XSS Cookie Stealing Cookie Hijacking Code Analysis Building a Key Generator (PYTHON) SQLI (Error Based) LFI && Wrappers Bash Scripting for Host Discovering Information Leakage Pivoting Abusing Docker Abusing Capabilities",
	like:	"eCPPTv2 eCPTXv2 OSCP eWPT eWPTXv2 OSWE",
  youtube : "https://www.youtube.com/watch?v=31CvSq9lcqU",
  resuelta: true,
});

Dataset.push({ name: "Flustered",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.11.131",
	so: "Linux",
	dificultad:	"Media",
	skills: "Abusing Squid Proxy Abusing GlusterFS Information Leakage Server Side Template Injection (SSTI)[RCE] Abusing Azure Storage",
	like:	"OSCP eJPT eWPT eWPTXv2 eCPPTv2 OSWE",
  youtube : "https://www.youtube.com/watch?v=MQeB_fItmW8",
  resuelta: true,
});

Dataset.push({
	id: count(),
	sku: crypto.randomUUID(),
	name: "Love",
	ip: "10.10.10.239",
	so: "Windows",
	dificultad:	"Fácil",
	skills: "Server Side Request Forgery (SSRF) Exploiting Voting System Abusing AlwaysInstallElevated (msiexec/msi file)",
	like:	"eJPT eWPT OSCP (Escalada)",
  youtube : "https://www.youtube.com/watch?v=5tEBvG0OnWQ",
  resuelta: true,
});

Dataset.push({ name: "NodeBlog",
	ip: "10.10.11.139",
	so: "Linux",
	dificultad:	"Fácil",
	id: count(),
	sku: crypto.randomUUID(),
	skills: "NoSQL Injection (Authentication Bypass) XXE File Read NodeJS Deserialization Attack (IIFE Abusing) Mongo Database Enumeration",
	like: "eJPT eWPT",
  youtube : "https://www.youtube.com/watch?v=MPArplyCIjM",
  resuelta: true,
});

Dataset.push({ name: "NunChucks",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.11.122",
	so: "Linux",
	dificultad:	"Fácil",
	skills: "NodeJS SSTI (Server Side Template Injection) AppArmor Profile Bypass (Privilege Escalation)",
	like: "eJPT eWPT",
  youtube : "https://www.youtube.com/watch?v=RRig0TQKYy8",
  resuelta: true,
});

Dataset.push({ name: "Bolt",
	ip: "10.10.11.114",
	so: "Linux",
	dificultad:	"Media",
	id: count(),
	sku: crypto.randomUUID(),
	skills: "Information Leakage Subdomain Enumeration SSTI (Server Side Template Injection) Abusing PassBolt Abusing GPG",
	like: "eJPT eWPT eWPTXv2 OSWE",
  youtube : "https://www.youtube.com/watch?v=zemqqJMl1VA",
  resuelta: true,
});

Dataset.push({ name: "GoodGames",
	ip: "10.10.11.130",
	so: "Linux",
	dificultad:	"Fácil",
	id: count(),
	sku: crypto.randomUUID(),
	skills: "SQLI (Error Based) Hash Cracking Weak Algorithms Password Reuse Server Side Template Injection (SSTI) Docker Breakout (Privilege Escalation) [PIVOTING]",
	like:	"eJPT eWPT eCPPTv2 OSCP (Escalada)",
  youtube : "https://www.youtube.com/watch?v=r3WMeRtwmFc",
  resuelta: true,
});

Dataset.push({ name: "Hawk",
	ip: "10.10.10.102",
	so: "Linux",
	dificultad:	"Media",
	id: count(),
	sku: crypto.randomUUID(),
	skills: "OpenSSL Cipher Brute Force and Decryption Drupal Enumeration/Exploitation H2 Database Exploitation", like: "eJPT eWPT",
  youtube : "https://www.youtube.com/watch?v=qiCozh2m0yE",
  resuelta: true,
});

Dataset.push({ name: "Monitors",
	ip: "10.10.10.238",
	so: "Linux",
	dificultad:	"Difícil",
	id: count(),
	sku: crypto.randomUUID(),
	skills: "Information Leakage WordPress Plugin Exploitation (Spritz) Local File Inclusion (LFI) Cacti 1.2.12 Exploitation Apache OfBiz Deserialization Attack (RCE) Docker Breakout (cap_sys_module Capabilitie) [PRIVILEGE ESCALATION]",
	like:	"eCPPTv2 eWPT eWPTXv2 OSCP OSWE",
  youtube : "https://www.youtube.com/watch?v=u0eFap03oDY",
  resuelta: true,
});


Dataset.push({ name: "Intelligence",
	ip: "10.10.10.248",
	so: "Windows",
	dificultad:	"Media",
	id: count(),
	sku: crypto.randomUUID(),
	skills: "Information Leakage Kerberos Enumeration (Kerbrute) Creating a DNS Record (dnstool.py) [Abusing ADIDNS] Intercepting Net-NTLMv2 Hashes with Responder BloodHound Enumeration Abusing ReadGMSAPassword Rights (gMSADumper) Pywerview Usage Abusing Unconstrained Delegation Abusing AllowedToDelegate Rights (getST.py) (User Impersonation) Using .ccache file with wmiexec.py (KRB5CCNAME)",
	like:	"OSCP OSEP",
  youtube : "https://www.youtube.com/watch?v=LI8wnTUc5-I",
  resuelta: true,
});


Dataset.push({ name: "Scavenger",
	ip: "10.10.10.155",
	so: "Linux",
	dificultad:	"Difícil",
	id: count(),
	sku: crypto.randomUUID(),
	skills: "Domain Zone Transfer (AXFR) SQLI (Error Based) [WHOIS] PCAP Analysis (Tshark && Wireshark) Abusing Rootkit",
	like: "eWPT",
  youtube : "https://www.youtube.com/watch?v=5-L8T8Qsxfs",
  resuelta: true,
});

Dataset.push({ name: "Driver",
	ip: "10.10.11.106",
	so: "Windows",
	dificultad:	"Fácil",
	id: count(),
	sku: crypto.randomUUID(),
	skills: "Password Guessing SCF Malicious File Print Spooler Local Privilege Escalation (PrintNightmare) [CVE-2021-1675]",
	like:	"OSCP (Escalada) eJPT",
  youtube : "https://www.youtube.com/watch?v=TY8NgOUVXjM",
  resuelta: true,
});

Dataset.push({ name: "Minion",
	ip: "10.10.10.57",
	so: "Windows",
	dificultad:	"Insane",
	id: count(),
	sku: crypto.randomUUID(),
	skills: "Server Side Request Forgery (SSRF) [Internal Port Discovery] ICMP Reverse Shell (PowerShell) [Firewall Bypassing] Alternate Data Streams (ADS) Firewall Evasion [Firewall Rules Manipulation]",
	like: "eWPTXv2 OSWE",
  youtube : "https://www.youtube.com/watch?v=yCXJI0H0704",
  resuelta: true,
});

Dataset.push({ name: "Sizzle",
	ip: "10.10.10.103",
	so: "Windows",
	dificultad:	"Insane",
	id: count(),
	sku: crypto.randomUUID(),
	skills: "SMBCacls Enumeration Malicious SCF File (Getting NetNTLMv2 Hash) Ldap Enumeration (LdapDomainDump) Abusing Microsoft Active Directory Certificate Services Creating Certificate Signing Requests (CSR) [Openssl] CLM / AppLocker Break Out (Escaping ConstrainedLanguage) PSByPassCLM Usage (CLM / AppLocker Break out) Msbuild (CLM / AppLocker Break Out) Kerberoasting Attack (Rubeus) Kerberoasting Attack (Chisel Port Forward - GetUserSPNs.py) WINRM Connections BloodHound Enumeration DCSync Attack (secretsdump.py) DCSync Attack (Mimikatz) PassTheHash (wmiexec.py)",
	like:	"OSCP OSEP"	,
  youtube : "https://www.youtube.com/watch?v=7W2h7qoCShk",
  resuelta: true,
});

Dataset.push({ name: "Toolbox",
	ip: "10.10.10.236",
	so: "Windows",
	dificultad:	"Fácil",
	id: count(),
	sku: crypto.randomUUID(),
	skills: "PostgreSQL Injection (RCE) Abusing boot2docker [Docker-Toolbox] Pivoting",
	like: "eWPT OSCP (Intrusión) eJPT eCPPTv2",
  youtube : "https://www.youtube.com/watch?v=0wTYfJsZdKU",
  resuelta: true,
});

Dataset.push({
	name: "Enterprise",
	ip: "10.10.10.61",
	so: "Linux",
	dificultad:	"Media",
	id: count(),
	sku: crypto.randomUUID(),
	skills: "WordPress Lcars Plugin SQLI Vulnerability SQL Injection (boolean-based blind, error-based, time-based blind) WordPress Exploitation [www-data] (Theme Edition - 404.php Template) Joomla Exploitation [www-data] (Template Manipulation) Docker Breakout Ghidra Binary Analysis Buffer Overflow (No ASLR - PIE enabled) [RET2LIBC] (Privilege Escalation)",
	like: "eWPT eCPPTv2 eCPTXv2 Buffer Overflow",
  youtube : "https://www.youtube.com/watch?v=2ZzVu5mdzgA",
  resuelta: true,
});

Dataset.push({ name: "Chaos",
	ip: "10.10.10.120",
	so: "Linux",
	dificultad:	"Media",
	id: count(),
	sku: crypto.randomUUID(),
	skills: "Password Guessing Abusing e-mail service (claws-mail) Crypto Challenge (Decrypt Secret Message - AES Encrypted) LaTeX Injection (RCE) Bypassing rbash (Restricted Bash) Extracting Credentials from Firefox Profile",
	like:	"eWPT eJPT"	,
  youtube : "https://www.youtube.com/watch?v=-t0CkWmiq6s",
  resuelta: true,
});


Dataset.push({ name: "SteamCloud",
	ip: "10.10.11.133",
	so: "Linux",
	dificultad:	"Fácil",
	id: count(),
	sku: crypto.randomUUID(),
	skills: "Kubernetes API Enumeration (kubectl) Kubelet API Enumeration (kubeletctl) Command Execution through kubeletctl on the containers Cluster Authentication (ca.crt/token files) with kubectl Creating YAML file for POD creation Executing commands on the new POD Reverse Shell through YAML file while deploying the POD",
	like:	"eWPTXv2 OSWE",
  youtube : "https://www.youtube.com/watch?v=q3mFOd8eRQs",
  resuelta: true,
});

Dataset.push({ name: "Seal",
	ip: "10.10.10.250",
	so: "Linux",
	dificultad:	"Media",
	id: count(),
	sku: crypto.randomUUID(),
	skills: "Information Leakage (GitBucket) Breaking Parser Logic - Abusing Reverse Proxy / URI Normalization Exploiting Tomcat (RCE) [Creating malicious WAR] Abusing existing YML Playbook file [Cron Job] Ansible-playbook exploitation (sudo privilege)",
	like:	"eWPT eWPTXv2 OSCP (Intrusión) OSWE"	,
  youtube : "https://www.youtube.com/watch?v=IShxpoRMxW8",
  resuelta: true,
});

Dataset.push({ name: "Hancliffe",
	ip: "10.10.11.115",
	so: "Windows",
	dificultad:	"Difícil",
  id: count(),
	sku: crypto.randomUUID(),
	skills: "Abusing URI Normalization Server Side Template Injection (SSTI) [NUXEO Vulnerability] Unified Remote 3 Exploitation (RCE) Decrypt Mozilla protected passwords Reversing EXE in Ghidra Buffer Overflow (Socket Reuse Technique) [AVANZADO]",
	like: "Buffer Overflow OSED OSCP (Intrusión) eWPT eWPTXv2 OSWE",
  youtube : "https://www.youtube.com/watch?v=A_7Cwl2bBC0",
  resuelta: true,
});

Dataset.push({ name: "Antique",
	ip: "10.10.11.107",
	so: "Linux",
	dificultad:	"Fácil",
	id: count(),
	sku: crypto.randomUUID(),
	skills: "SNMP Enumeration Network Printer Abuse CUPS Administration Exploitation (ErrorLog) EXTRA -> (DirtyPipe) [CVE-2022-0847]",
	like: "eJPT",
	youtube : "https://www.youtube.com/watch?v=pvtergVU__4",
	resuelta: true,
});

Dataset.push({ name: "Object",
	ip: "10.10.11.132",
	so: "Windows",
	dificultad:	"Difícil",
	id: count(),
	sku: crypto.randomUUID(),
	skills: "Jenkins Exploitation (New Job + Abusing Build Periodically) Jenkins Exploitation (Abusing Trigger builds remotely using TOKEN) Firewall Enumeration Techniques Jenkins Password Decrypt BloodHound Enumeration Abusing ForceChangePassword with PowerView Abusing GenericWrite (Set-DomainObject - Setting Script Logon Path) Abusing WriteOwner (Takeover Domain Admins Group)" ,
	like:	"OSCP OSEP OSWE",
	youtube : "https://www.youtube.com/watch?v=K8d2CmQAV9Q",
	resuelta: true,
});

Dataset.push({ name: "Stratosphere",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.64",
	so: "Linux",
	dificultad:	"Media",
	skills: "Apache Struts Exploitation (CVE-2017-5638) Python Library Hijacking (Privilege Escalation)",
	like: "eWPT eJPT",
	youtube : "https://www.youtube.com/watch?v=KADZhYY9Wpw",
	resuelta: true,
});

Dataset.push({ name: "Devzat",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.11.118",
	so: "Linux",
	dificultad:	"Media",
	skills: "Fuzzing Directory .git (GIT Project Recomposition) Web Injection (RCE) Abusing InfluxDB (CVE-2019-20933) Abusing Devzat Chat /file command (Privilege Escalation) EXTRA (Crypto CTF Challenge | N Factorization)",
	like:	"eWPT eJPT",
	youtube : "https://www.youtube.com/watch?v=WXdF3wqwtqQ",
	resuelta: true,
});

Dataset.push({ name: "Helpline",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.132",
	so: "Windows",
	dificultad:	"Difícil",
	skills: "ManageEngine ServiceDesk Plus User Enumeration ManageEngine ServiceDesk Plus Authentication Bypassing ManageEngine ServiceDesk Plus Remote Code Execution Disabling Windows Defender (PowerShell) Mimikatz - Getting NTLM User Hashes (lsadump::sam) Reading Event Logs with Powershell (RamblingCookieMonster) [Get-WinEventData] Decrypting EFS files with Mimikatz Getting the certificate with Mimikatz (crypto::system) Decrypting the masterkey with Mimikatz (dpapi::masterkey) Decrypting the private key with Mimikatz (dpapi::capi) Building a correct PFX with Openssl Installing the PFX via certutil Installing VNC in the box via msiexec Connecting to the VNC service using vncviewer Converting Secure String File to PlainText Using RunAs to execute commands as the administrator",
	like: "eWPT OSCP"	,
	youtube : "https://www.youtube.com/watch?v=EGlLewVI_M0",
	resuelta: true,
});

Dataset.push({ name: "Ransom",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.11.153",
	so: "Linux",
	dificultad:	"Media",
	skills: "Login Bypass (Type Juggling Attack) Decrypting a ZIP file (PlainText Attack - Bkcrack) - CONTI RANSOMWARE",
	like: "eWPT",
	youtube : "https://www.youtube.com/watch?v=_hnKZ1YgzyA",
	resuelta: true,
});

Dataset.push({ name: "Bankrobber",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.154",
	so: "Windows",
	dificultad:	"Insane",
	skills: "Blind XSS Injection Stealing the session cookie by XSS injection SQLI - Error Based SQLI - File Access SQLI - Stealing Net-NTLMv2 Hash (impacket-smbserver) XSS + XSRF => RCE Abusing a custom binary (Brute Force Pin && Overflow)",
	like: "eWPT eWPTXv2 OSWE OSCP (Intrusión)",
	youtube : "https://www.youtube.com/watch?v=NAKePo2HLjI",
	resuelta: true,
});

Dataset.push({ name: "Tenet",
	ip: "10.10.10.223",
	so: "Linux",
	dificultad:	"Media",
	id: count(),
	sku: crypto.randomUUID(),
	skills: "PHP Deserialization Attack Abusing Race Condition",
	like: "eWPT",
	youtube : "https://www.youtube.com/watch?v=Isgpbsi9Tpc",
	resuelta: true,
});

Dataset.push({ name: "Stacked",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.11.112",
	so: "Linux",
	dificultad: "Insane",
	skills: "Virtual Hosting Enumeration Referer XSS Injection XSS - Creating JS file (accessing unauthorized resources) Checking/Reading mail through XSS injection AWS Enumeration Lambda Enumeration Creating a Lambda Function (NodeJS) Invoking the created lambda function RCE on LocalStack Abusing FunctionName Parameter (AWS) by exploiting XSS vulnerability (RCE) Finding and exploiting custom 0Day [Privilege Escalation] Root FileSystem Access by abusing Docker",
	like: "eWPT eWPTXv2 OSWE"	,
	youtube : "https://www.youtube.com/watch?v=L1w3DwxFHFg",
	resuelta: true,
});

Dataset.push({ name: "Mantis",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.52",
	so: "Windows",
	dificultad:	"Difícil",
	skills: "Database Enumeration (DBeaver) Bloodhound Enumeration (bloodhound-python) Exploiting MS14-068 (goldenPac.py) [Microsoft Kerberos Checksum Validation Vulnerability]",
	like: "OSCP OSEP",
	youtube : "https://www.youtube.com/watch?v=3p0myaukHBk",
	resuelta: true,
});

Dataset.push({ name: "TheNotebook",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.230",
	so: "Linux",
	dificultad:	"Media",
	skills: "Abusing JWT (Gaining privileges) Abusing Upload File Docker Breakout [CVE-2019-5736 - RUNC] (Privilege Escalation)", like:	"eWPT OSCP (Escalada) OSWE",
	youtube : "https://www.youtube.com/watch?v=dekA2dzLSlE",
	resuelta: true,
});

Dataset.push({ name: "Travel",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.189",
	so: "Linux",
	dificultad:	"Difícil",
	skills: "Git Project Recomposition (.git) [Git-Dumper] Abusing WordPress (SimplePie + Memcache) [PHP Code Analysis] Memcache Object Poisoning (Gopherus + Deserialization Attack + RCE) LDAP Enumeration (Apache Directory Studio - GUI) Abusing LDAP to add an SSH Key Abusing LDAP to modify the user group to sudo (Privilege Escalation)",
	like: "eWPT eWPTXv2 OSWE OSCP (Escalada)",
	youtube : "https://www.youtube.com/watch?v=B5_NsxWlXTU",
	resuelta: true,
});

Dataset.push({ name: "Shocker",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.56",
	so: "Linux",
	dificultad:	"Fácil",
	skills: "ShellShock Attack (User-Agent) Abusing Sudoers Privilege (Perl) EXTRA: Creamos nuestro propio CTF en Docker que contemple ShellShock",
	like: "eWPT eJPT",
	youtube : "https://www.youtube.com/watch?v=xaOgoGYyJF4",
	resuelta: true,
});

Dataset.push({ name: "SneakyMailer",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.197",
	so: "Linux",
	dificultad:	"Media",
	skills: "Information Leakage Mass Emailing Attack with SWAKS Password Theft Abusing Pypi Server (Creating a Malicious Pypi Package) Abusing Sudoers Privilege (Pip3)",
	like: "OSCP" ,
	youtube : "https://www.youtube.com/watch?v=QWkM74ZBVO4",
	resuelta: true,
});



Dataset.push({ name: "Secret",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.11.120",
	so: "Linux",
	dificultad:	"Fácil",
	skills: "Code Analysis Abusing an API Json Web Tokens (JWT) Abusing/Leveraging Core Dump [Privilege Escalation]",
	like: "eWPT eWPTXv2 OSWE",
	youtube : "https://www.youtube.com/watch?v=YfVnbzpjz2I",
	resuelta: true,
});

Dataset.push({ name: "Giddy",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.104",
	so: "Windows",
	dificultad:	"Media",
	skills: "SQL Injection (XP_DIRTREE) - Get Net-NTLMv2 Hash Windows Defender Evasion (Ebowla) Windows Defender Evasion (Building our own C program) Service Listing Techniques Abusing Unifi-Video (Privilege Escalation)",
	like: "eWPT OSCP OSWE",
	youtube : "https://www.youtube.com/watch?v=2ZnbIAPzmpg",
	resuelta: true,
});

Dataset.push({ name: "Haystack",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.115",
	so: "Linux",
	dificultad:	"Fácil",
	skills: "ElasticSearch Enumeration Information Leakage Kibana Enumeration Kibana Exploitation (CVE-2018-17246) Abusing Logstash (Privilege Escalation)",
	like: "eWPT OSCP (Escalada) OSWE",
	youtube : "https://www.youtube.com/watch?v=-Ck0z8N1LxQ",
	resuelta: true,
});



Dataset.push({ name: "Passage",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.206",
	so: "Linux",
	dificultad:	"Media",
	skills: "CuteNews Exploitation Code Analysis USBCreator D-Bus Privilege Escalation Python Exploit Development (AutoPwn)",
	like: "eWPT OSWE OSCP (Escalada)",
	youtube : "https://www.youtube.com/watch?v=O5v3yzvgYjw",
	resuelta: true,
});



Dataset.push({ name: "Altered",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.11.159",
	so: "Linux",
	dificultad:	"Difícil",
	skills: "Brute Force Pin / Rate-Limit Bypass [Headers] Type Juggling Bypassing SQL Injection (Error Based) SQLI to RCE -> INTO OUTFILE Query Dirty Pipe Exploit (But with PAM-Wordle configured)"	,
	like: "OSCP eWPT eWPTXv2 OSWE",
	youtube : "https://www.youtube.com/watch?v=_8ih4aNNI4M",
	resuelta: true,
});



Dataset.push({ name: "Shibboleth",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.11.124",
	so: "Linux",
	dificultad:	"Media",
	skills: "Abusing IPMI (Intelligent Platform Management Interface) Zabbix Exploitation MariaDB Remote Code Execution (CVE-2021-27928)",
	like:	"eWPT OSCP",
	youtube : "https://www.youtube.com/watch?v=mkB1Vfw35XY",
	resuelta: true,
});


Dataset.push({ name: "Tally",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.59",
	so: "Windows",
	dificultad:	"Difícil",
	skills: "SharePoint Enumeration Information Leakage Playing with mounts (cifs, curlftpfs) Abusing Keepass Abusing Microsoft SQL Server (mssqlclient.py - xp_cmdshell RCE) Abusing SeImpersonatePrivilege (JuicyPotato)", 
	like: "OSCP",
	youtube : "https://www.youtube.com/watch?v=fMZCktwAD2w",
	resuelta: true,
});

Dataset.push({ name: "Ellingson",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.139",
	so: "Linux",
	dificultad:	"Difícil",
	skills: "Abusing Werkzeug Debugger (RCE) Binary Exploitation Advanced Buffer Overflow x64 - ROP / ASLR Bypass (Leaking Libc Address + Ret2libc + Setuid)",
	like: "Buffer Overflow eWPT (Intrusión)",
	youtube : "https://www.youtube.com/watch?v=8dLPT-imMYk",
	resuelta: true,
});


Dataset.push({ name: "Quick",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.186",
	so: "Linux",
	dificultad:	"Difícil",
	skills: "HTTP/3 Enumeration Recompiling curl to accept HTTP/3 requests Information Leakage Brute force in authentication panel XSS Injection Abusing Esigate (ESI Injection - RCE) Manipulating passwords in the database Abuing POS Print Server (File Hijacking Attack)",
	like: "eWPT eWPTXv2 OSWE",
	youtube: "https://www.youtube.com/watch?v=C1NZVah39ms",
	resuelta: true,
});


Dataset.push({ name: "Traverxec",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.165",
	so: "Linux",
	dificultad:"Fácil",
	skills: "Nostromo Exploitation Abusing Nostromo HomeDirs Configuration Exploiting Journalctl (Privilege Escalation)",
	like: "eWPT OSCP (Escalada)",
	youtube: "https://www.youtube.com/watch?v=7aCplH8WZm0",
	resuelta: true,
});

Dataset.push({ name: "Sink",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.225",
	so: "Linux",
	dificultad: "Insane",
	skills: "HTTP Request Smuggling Exploitation (Leak Admin Cookie) Cookie Hijacking Information Leakage AWS Enumeration AWS Secrets Manager AWS Key_management Enumeration AWS KMS Decrypting File",
	like: "eWPT eWPTXv2 OSWE",
	youtube: "https://www.youtube.com/watch?v=2qKXz_Rk2YE",
	resuelta: true,
});

Dataset.push({ name: "Overflow",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.11.119",
	so: "Linux",
	dificultad: "Difícil",
	skills: "Padding Oracle Attack (Padbuster) Padding Oracle Attack (Bit Flipper Attack - BurpSuite) [EXTRA] Cookie Hijacking SQL Injection (Generic UNION query) - Error Based Breaking Password Upload File - Abusing Exiftool (RCE) DNS Hijacking (Abusing Cron Job) Ghidra Binary Analysis Reversing Code (Computing valid PIN) Buffer Overflow (Controlling the program and manipulating its flow to desired functions) Abusing Decryption Function (XOR Trick) [Privilege Escalation]",
	like: "OSWE eWPT eWPTXv2 Buffer Overflow",
	comment: "Arch cambio de hora",
	youtube: "https://www.youtube.com/watch?v=tEbBDlOFen0",
	resuelta: true,
});

Dataset.push({ name: "Fighter", //.unshift lo situa al inicio, .push al final de la lista
	id: count(),
	sku: crypto.randomUUID(),
	ip: "10.10.10.72",
	so: "Windows",
	dificultad:	"Insane",
	skills: "Advanced SQL Injection - MS SQL Server 2014 [Bypass Protection] [Python Scripting] [RCE] Abusing Cron Jobs Capcom Rootkit Privilege Escalation Binary and DLL Analysis in order to get root.txt [Radare2]",
	like: "eWPT eWPTXv2 OSWE OSCP",
	comment: "[ESTA NOCHE EN DIRECTO POR TWITCH]",
	activeDirectory: "",
	youtube: "https://twitch.tv/s4vitaar",
	resuelta: false,
});


/*Dataset.push({ name: "",
	id: count(),
	sku: crypto.randomUUID(),
	ip: "",
	so: "",
	dificultad:	"",
	skills: "",
	like: "",
	youtube: "",
	resuelta: true,
	comment: "",
});
*/
export { Dataset };
