const {DB} = require("sdk");

const init = async() => {
   const db = new DB("http://localhost:4000")
   console.log(await db.root());
   console.log(await db.sell());
};
init()