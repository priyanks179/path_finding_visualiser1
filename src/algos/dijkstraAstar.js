import {getCellId, fillColor, getIndFromId} from '../util'

const removeMinFscore = (arr,grid) => {
    // remove spot with min f score in array and returns it
    let ind=0, val=Number.MAX_VALUE;

    arr.forEach((id,idInd) => {
        let fVal = grid.get(id).f;
        if(fVal<val){
            val=fVal;
            ind=idInd;
        }
    });

    let id = arr.splice(ind,1)[0]; 
    return [id,arr];
}

const heuristic = (cur_id, target_id) => {
    //using manhattan distance
    let c_r=0,c_c=0,t_r=0,t_c=0;
    [c_r,c_c]=getIndFromId(cur_id);
    [t_r,t_c]=getIndFromId(target_id);

    return (Math.abs(c_r-t_r)**2 + Math.abs(c_c-t_c)**2)**(0.5);
}


function dijkstraAstar(grid,type){

    //this refers to obj of AlgoHandler class
    let cellTemp = grid.get('0_0');
    let startId = cellTemp.maze.startCellId;
    let targetId = cellTemp.maze.targetCellId;
    let exploringColor=this.exploringColor, exploredColor=this.exploredColor, pathColor=this.pathColor;
    let open = [], closed = new Set();
    let foundTarget = false;

    open.push(startId);
    grid.get(startId).g=0;
    if(type==="dijkstra")   grid.get(startId).h=0;
    else    grid.get(startId).h=heuristic(startId,targetId);
    grid.get(startId).f = grid.get(startId).h;
    fillColor(startId,exploringColor);

    while(open.length>0){
        // console.log(open.length);
        let cellId =0;
        [cellId,open] = removeMinFscore(open, grid);
        
        closed.add(cellId);
        fillColor(cellId,exploredColor);
        let cell = grid.get(cellId);
        let nbrs = cell.nbrs;

        for(let nbrId of nbrs){
            if(nbrId===targetId){
                foundTarget=true;
                fillColor(targetId,exploringColor);
                grid.get(targetId).prev = cellId;
                break;
            }

            if(closed.has(nbrId) || grid.get(nbrId).wall)   continue;

            let temp_g = cell.g + 1; //1 coz its dist bw cur and surr nodes
            if(temp_g<grid.get(nbrId).g){//from this path cell is closest to start cell
                grid.get(nbrId).prev=cellId;// making cellId its parent
                grid.get(nbrId).g=temp_g;// changing its g value
                if(type==="dijkstra") grid.get(nbrId).h = 0;
                else grid.get(nbrId).h=heuristic(nbrId,targetId);
                grid.get(nbrId).f = grid.get(nbrId).g+grid.get(nbrId).h;
                if(open.includes(nbrId)===false){//if not in open then add this cell
                    fillColor(nbrId,exploringColor);
                    open.push(nbrId);
                }
            } 
        }

        if(foundTarget) break;
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

export default dijkstraAstar;