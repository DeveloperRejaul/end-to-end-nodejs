
async function main () {
  const p = [];
  for (let index = 0; index < 20000; index++) {
    p.push(fetchData); 
  } 
  (await Promise.all(p)).map(f=> f());
}

async function fetchData () {
  const res = await fetch('http://localhost:4000/');
  console.log(res);
}

(async()=>{await main();})();