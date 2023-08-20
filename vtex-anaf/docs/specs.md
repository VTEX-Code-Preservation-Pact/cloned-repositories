# VTEX - ANAF

## Product specs

 - Aplicatia va interoga serviciul ANAF sau serviciul https://www.listafirme.ro/ pentru a valida CUI-ul introdus de catre utilizator in procesul de checkout atunci cand se introduc datele firmei. Serviciul listafirme va fi interogat numai daca serviciul ANAF este indisponibil si daca exista `key` setat pentru listafirme.
 - In cadrul campului text de CUI va exista un buton PREIA care va prelua automat datele in timpul interogarii de mai sus si va completa campurile disponibile in checkout.
 - Pagina de configurare a aplicatiei va avea:
	 - posibilitatea de a selecta daca informatiile preluate pot fi editate in continuare de utilizator sau nu (*inputs disabled / enabled*)
	 - checkbox care sa permita utilizatorului sa mearga mai departe in procesul de checkout sau nu, daca CUI-ul este invalid
	 - input text pentru completarea `key` listafirme.ro - serviciu platit 

### Documentatie ANAF.ro
https://www.anaf.ro/anaf/internet/ANAF/servicii_online/servicii_web_anaf

### Documentatie listafirme.ro
https://www.listafirme.ro/specificatii/api-info-v1.asp 

### Exemplu raspuns ANAF

    adresa: "MUNICIPIUL BUCUREŞTI, SECTOR 3, STR. PĂDUREA CRAIULUI, NR.1, BL.B2, SC.1, ET.6, AP.28"
	codPostal: "32718"
	cui: 18942035
	data: "2021-06-23"
	dataActualizareTvaInc: "2018-12-27"
	dataAnulareSplitTVA: ""
	dataInactivare: " "
	dataInceputSplitTVA: ""
	dataInceputTvaInc: "2013-01-01"
	dataPublicare: " "
	dataPublicareTvaInc: "2018-12-28"
	dataRadiere: " "
	dataReactivare: " "
	dataSfarsitTvaInc: "2019-01-01"
	data_anul_imp_ScpTVA: " "
	data_inceput_ScpTVA: "2006-08-21"
	data_sfarsit_ScpTVA: " "
	denumire: "CUSTOMSOFT SRL"
	iban: ""
	mesaj_ScpTVA: "platitor IN SCOPURI de TVA la data cautata"
	nrRegCom: "J40/13261/2006"
	scpTVA: true
	stare_inregistrare: "INREGISTRAT din data 17.08.2006"
	statusInactivi: false
	statusSplitTVA: false
	statusTvaIncasare: false
	telefon: "0744301281"
	tipActTvaInc: "Radiere"

### Exemplu raspuns ListaFirme

```
{
  "TaxCode": "14837428",
  "Status": "functiune",
  "Name": "BORG DESIGN SRL",
  "cost": "1",
  "views": "4026",
}
```