# VTEX ANAF


### Installation Guide
- Open the VTEX App Store and install this app on your store, or run the following command on VTEX toolbelt:

> vtex install vtex.taxid-validation@0.x

### Check CUI

Make a new POST request to https://{{vendor}}.myvtex.com/anaf/validate-cui with the following body:

```
{
    "cui": "YOUR CUI HERE"
}
```


*If the CUI is invalid, the response code will be 500*

Response body example:
```
{
    "cod": 200,
    "message": "SUCCESS",
    "found": [
        {
            "cui": YOUR_CUI_HERE,
            "data": "2021-03-30",
            "denumire": "COMPANY NAME",
            "adresa": "COMPANY ADDRESS",
            "nrRegCom": "",
            "telefon": "",
            "fax": "",
            "codPostal": "",
            "act": "",
            "stare_inregistrare": "",
            "scpTVA": false,
            "data_inceput_ScpTVA": "",
            "data_sfarsit_ScpTVA": "",
            "data_anul_imp_ScpTVA": "",
            "mesaj_ScpTVA": "nu figureaza in registre ",
            "dataInceputTvaInc": "",
            "dataSfarsitTvaInc": "",
            "dataActualizareTvaInc": "",
            "dataPublicareTvaInc": "",
            "tipActTvaInc": "",
            "statusTvaIncasare": false,
            "dataInactivare": " ",
            "dataReactivare": " ",
            "dataPublicare": " ",
            "dataRadiere": " ",
            "statusInactivi": false,
            "dataInceputSplitTVA": "",
            "dataAnulareSplitTVA": "",
            "statusSplitTVA": false,
            "iban": ""
        }
    ],
    "notfound": []
}
```

If there is no company with the CUI you provide, the "denumire" and "adresa" fields will be blank.


# App Settings
1. Go to **Admin > Apps > My Apps > VTEX Anaf**
2. Fill up the form and press save.

Key listafirme.ro is optional. If you have licence on listafirme, put your api key thene. 
If the request to ANAF fails, the application will make a new request to the list of companies

# Add Validation on checkout

1. Go to **Admin > Checkout > Code**
2. Create a new file `anaf.js`
3. Create a new file `anaf.css`
4. Copy the content from docs/anaf.js and paste it into your `anaf.js`
5. Copy the content from docs/anaf.css and paste it into your `anaf.css`
6. Go to checkout6-custom.js in admin and paste the following code

```
(function (document, tag) {
      var lockersTag = document.createElement(tag);
      var firstLockersTag = document.getElementsByTagName(tag)[0];
      lockersTag.src = "/files/anaf.js?" + Date.now();
      firstLockersTag.parentNode.insertBefore(lockersTag, firstLockersTag);
  
  $('head').append('<link rel="stylesheet" href="/files/anaf.css?'+ Date.now()+'" />');
  })(document, "script");
```

Now you can customize your `anaf.js` and `anaf.css` file as you want.
