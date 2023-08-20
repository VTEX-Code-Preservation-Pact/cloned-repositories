import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
var CryptoJS = require('crypto-js')

export default class Encryption extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('', context, {
      ...options,
      headers: {
        ...options?.headers,
        'X-Vtex-Use-Https': 'true'
      },
    })
  }

  profitshareBin2hex(s: any){  
    var i, f = 0, a = [];  
    s += '';  
    f = s.length;  
      
    for (i = 0; i<f; i++) {  
        a[i] = s.charCodeAt(i).toString(16).replace(/^([\da-f])$/,"0$1");  
    }  
      
    return a.join('');  
}  
//decode
atob = function(str:any){ return Buffer.from(str, 'base64').toString('binary'); }
//encode
btoa = function(str:any){ return Buffer.from(str, 'binary').toString('base64'); };

  public getEncryption(plaintext: any, key: any): string {
    const encodedPlainText = encodeURIComponent(plaintext).toString()
    let iv = CryptoJS.enc.Utf8.parse(Math.round((Math.pow(36, 16 + 1) - Math.random() * Math.pow(36, 16))).toString(36).slice(1));

    let subKey = CryptoJS.enc.Utf8.parse(key.substring(0, 16));
    key = CryptoJS.enc.Utf8.parse(key);

    let chiperData = CryptoJS.AES.encrypt(encodedPlainText, subKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
    });

    let hash = CryptoJS.HmacSHA256(chiperData.ciphertext, key);
    let hmac = this.atob(hash.toString(CryptoJS.enc.Base64));

    iv = this.atob(iv.toString(CryptoJS.enc.Base64));    
    let chiperRaw = this.atob(chiperData.toString());

    let data = this.profitshareBin2hex(this.btoa(iv + hmac + chiperRaw)); 
    console.log('Plain text: ', encodedPlainText);
    console.log('Data: ', data)
    
    return data
  }

}
