import CryptoJS  from 'crypto-js'
import crypto from 'node:crypto'
import * as prompt from '@inquirer/prompts';


class Crypto {
    private secret:string="hello_world";
    constructor () {
      this.init()
    }

    async init () {
        const answer = await prompt.select({
            message:'Select what you went to do ? ',
            default:1,
            choices:[
              {
                name: 'Make hash',
                value:1
              },
              {
                name: 'Make sign',
                value: 2
              }, 
              {
                name: 'Make verify',
                value: 3
              },
              {
                name: 'Make encrypt',
                value: 4
              },
               {
                name: 'Make decrypt',
                value: 5
              },
            ]
          });


          switch (answer) {
            case 1:
                const hashValue= await this.input("Enter the text you want to hash: ")
                const hash = this.makeHash(hashValue);
                console.log(hash);
                break;
            case 2:
                const signValue = await this.input("Enter the text you want to sign:");
                const sign = this.makeSign(signValue);
                console.log(sign);
                break;
            case 3:
                const verifyValue = await this.input("Enter the text you want to verify:");
                const signature = await this.input("Enter the signature for verify:");
                const verify = this.makeVerify(verifyValue,signature);
                console.log(verify);
                break;
            case 4:
                const encryptValue = await this.input("Enter the text you want to encrypt:");
                const encrypt = this.makeEncrypt(encryptValue);
                console.log(encrypt);
                break;
            case 5:
                const decryptValue = await this.input("Enter the text you want to decrypt:");
                const decrypt = this.makeDecrypt(decryptValue);
                console.log(decrypt);
                break;
          
            default:
                break;
          }

         
    }

    private async input (message:string) {
        return new Promise<string>(async (resolve, _reject) => {
           const ans = await prompt.input({
                message,
            });
           resolve(ans);
        });
    } 

    private makeHash (data: string):string{
     return crypto.createHash("sha256").update(data).digest("hex")
    };

    private makeSign (data:string) {
      const signature = CryptoJS.HmacSHA256(data, this.secret).toString(CryptoJS.enc.Hex);
      return signature;
    } 

    private makeVerify (data:string, signature:string) {
      const calculatedSignature = this.makeSign(data);
      return signature === calculatedSignature;
    }

    private makeEncrypt (data:string) {
      return CryptoJS.AES.encrypt(data, this.secret).toString();
    }

    private makeDecrypt (encrypted:string) {
      return CryptoJS.AES.decrypt(encrypted, this.secret).toString(CryptoJS.enc.Utf8);
    }
}

new Crypto();