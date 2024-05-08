import crypto from 'node:crypto'

// general hash 
const secret = 'abc'
const data ='hello world'

const hash = crypto.createHmac("sha256", secret).update(data).digest("hex")
console.log(hash);



// sign and verify
const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
    namedCurve: 'sect239k1',
});
const sign = crypto.createSign('SHA256');
sign.write('some data to sign');
sign.end();
const signature = sign.sign(privateKey, 'hex');
console.log(signature);


const verify = crypto.createVerify('SHA256');
verify.write('some data to sign');
verify.end();
const verified = verify.verify(publicKey, signature, 'hex')
console.log(verified);


// encrypt and decrypt
const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';
const key = crypto.scryptSync(password, "salt", 24);
const iv = crypto.randomFillSync(new Uint8Array(16));

let encrypted = '';
const cipher = crypto.createCipheriv(algorithm, key, iv);
cipher.setEncoding('hex');
cipher.on('data', (chunk) => encrypted += chunk);
cipher.on('end', () => console.log(encrypted));
cipher.write('some clear text data');
cipher.end();


let decrypted = '';
const decipher = crypto.createDecipheriv(algorithm, key, iv);
decipher.on('readable', () => {
    let chunk;
    while (null !== (chunk = decipher.read())) {
      decrypted += chunk.toString('utf8');
    }
});

decipher.on('end', () => {
    console.log(decrypted);
});
decipher.write(encrypted, 'hex');
decipher.end();