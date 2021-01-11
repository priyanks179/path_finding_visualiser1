import {getCellId, fillColor} from '../util'



function bfsDfsRun(grid,type){

    //this refers to obj of AlgoHandler class
    let cellTemp = grid.get('0_0');
    let startId = cellTemp.maze.startCellId;
    let targetId = cellTemp.maze.targetCellId;
    let exploringColor=this.exploringColor, exploredColor=this.exploredColor, pathColor=this.pathColor;
    let que = [], closed = new Set();
    let foundTarget = false;

    que.push(startId);
    fillColor(startId,exploringColor);

    
    while(que.length>0 ){
        
        let cellId;
        if(type==="bfs")
            cellId = que.shift();
        else    cellId = que.pop();
        closed.add(cellId)
        let cell = grid.get(cellId);
        fillColor(cellId,exploredColor);
        let nbrs = cell.nbrs;

        for(let nbrId of nbrs){
            // console.log(que.length);
            if(nbrId===targetId){
                
                foundTarget=true;
                fillColor(targetId,exploringColor);
                grid.get(targetId).prev = cellId;
                break;
            }

            if(closed.has(nbrId)|| grid.get(nbrId).wall || que.includes(nbrId)){
                continue;
            } 
            que.push(nbrId);
            fillColor(nbrId,exploringColor);
            grid.get(nbrId).prev = cellId;
        }
        if(foundTarget===true) break;
    }
    

    if(foundTarget===false) return;

    let path = [], curCellId=targetId;

    while(grid.get(curCellId)!=null){
        path.push(curCellId);
        curCellId=grid.get(curCellId).prev;
    }


    for(let i=path.length-1; i>0; i--){
        let id = path[i];
        fillColor(id,pathColor);
    }
    fillColor(targetId,pathColor);
    
}

export default bfsDfsRun;