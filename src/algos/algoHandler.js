import bfsDfsRun from './bfsDfs';
import dijkstraAstar from './dijkstraAstar';

class AlgoHandler{
    constructor(grid){
        this.exploringColor="green";
        this.exploredColor="red";
        this.pathColor="blue";
        this.grid = grid;
    }
    run(algoName){
        //this will return func reference with this keyword set to this class
        if(algoName==="bfs" || algoName==="dfs")    return bfsDfsRun.bind(this,this.grid,`${algoName}`);
        if(algoName==="dijkstra" || algoName==="astar") return dijkstraAstar.bind(this,this.grid,`${algoName}`);
    }

    setGrid(grid){
        this.grid = grid;
    }

}


export default AlgoHandler;