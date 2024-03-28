import NodeCluster from './cluster/cluster';
import NoCluster from './cluster/no-cluster';



async function main () {
  await NodeCluster();
}



(async()=> {await main();})();