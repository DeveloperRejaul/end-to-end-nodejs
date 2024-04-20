export class Database {

  save (email: string, price: number, timestamp: number) {
    console.log( `DB: ${email }-${price}-${timestamp}`);
  }
}