export class DB {
    constructor(private BASE_URL:string){}

    async root(){
        try {
         const res = await fetch(`${this.BASE_URL}/`)
         return await res.text()
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async buy(){
        try {
            const res = await fetch(`${this.BASE_URL}/buy`)
            return await res.text()
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async sell(){
        try {
            const res = await fetch(`${this.BASE_URL}/sell`)
            return await res.text()
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}  

// const test = async () => {
//     const db = new DB("http://localhost:4000");
//     console.log(await db.root());
//     console.log(await db.buy());
//     console.log(await db.sell());
// }
// test()
