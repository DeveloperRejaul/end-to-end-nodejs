import CryptoJS  from 'crypto-js'
import crypto from 'node:crypto'
import * as prompt from '@inquirer/prompts';


class Crypto {
    private secret:string="hello_world";
    private algorithm = 'aes-192-cbc';
    private key = crypto.scryptSync(this.secret, 'salt', 24);
    private iv = Buffer.alloc(16, 0);

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
     return this.makeEncrypt(data)
    } 

    private makeVerify (data:string, signature:string) {
     return this.makeEncrypt(data) === signature
    }

    private makeEncrypt (data:string) {
      const cipher = crypto.createCipheriv(this.algorithm, this.key,this.iv);
      let encrypted = cipher.update(data, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return encrypted
    }

    private makeDecrypt (encrypted:string) {
      const decipher = crypto.createDecipheriv(this.algorithm, this.key,this.iv);

      let decrypted = '';
      decipher.on('readable', () => {
        let chunk;
        while (null !== (chunk = decipher.read())) {
          decrypted += chunk.toString('utf8');
        }
      });
      decipher.write(encrypted, 'hex');
      decipher.end();
      return decrypted;
    }
}

new Crypto();