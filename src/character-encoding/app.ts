
import * as prompt from '@inquirer/prompts';


class Character {

  async init () {
    const answer = await prompt.select({
      message:'Select what you went to do ? ',
      default:1,
      choices:[
        {
          name: 'Text to binary',
          value:1
        },
        {
          name: 'Binary to text',
          value: 2
        },
      ]
    });

    switch (answer) {
      case 1:{
        const text = await prompt.input({
          message: 'Enter the text you want to convert :',
          default:'hello world!',
        });
        const bin = this.textToBinary(text);
        console.log(bin);
        break;
      }
      case 2:{
        const binString = await prompt.input({
          message: 'Enter the text you want to convert :',
          default:'1101000 1100101 1101100 1101100 1101111 100000 1110111 1101111 1110010 1101100 1100100 100001',
        });
        const textString = this.binaryToText(binString);
        console.log(textString);
        break;
      }
      default:
        break;
    }
  }

  private textToBinary (text: string): string {
    let binary: string =''; 
    for (const char of text) {
      binary += char.charCodeAt(0).toString(2)+' ';
    }
    return binary;
  }
  private binaryToText (binary: string): string {
    return binary.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
  }
}
const character = new Character();
character.init();
