import * as crypto  from 'node:crypto'
import * as prompt from '@inquirer/prompts';


class Crypto {
    private secret:string="hello_world";
    private privateKey:crypto.KeyObject;
    private publicKey:crypto.KeyObject;
    private algorithm:string = 'aes-192-cbc';
    private key: Buffer;
    private iv: Uint8Array;


    constructor () {
        const { privateKey, publicKey } = crypto.generateKeyPairSync('x25519', {
            namedCurve:"sect239k1",
        });

        const key = crypto.scryptSync(this.secret, "salt", 24);
        const iv = crypto.randomFillSync(new Uint8Array(16));

        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.key = key;
        this.iv = iv;

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
       return crypto.createHmac("sha256", this.secret).update(data).digest("hex")
    };

    private makeSign (data:string):string {
        const sign = crypto.createSign('SHA256');
        sign.write(data);
        sign.end();
        return sign.sign(this.privateKey, 'hex');
    } 

    private makeVerify (data:string, signature:string):boolean {
        const verify = crypto.createVerify('SHA256');
        verify.write(data);
        verify.end();
        return verify.verify(this.publicKey, signature, 'hex')
    }

    private makeEncrypt (data:string):string {
       let encrypted:string='';
       const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
       cipher.setEncoding("hex").on("data",chunk=> encrypted += chunk).write(data);
       cipher.end();
       return encrypted;
    }

    private makeDecrypt (encrypted:string) {
        let decrypted:string = '';
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
        decipher.on('readable', () => {
            let chunk;
            while (null !== (chunk = decipher.read())) {
              decrypted += chunk.toString('utf8');
            }
        });
        decipher.write(encrypted, 'hex');
        decipher.end();
        return decrypted
    }
}

new Crypto();