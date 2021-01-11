import {getCellId} from '../util'

class Spot {

    constructor(i,j,maze){
        this.x = i;
        this.y =  j; 
        this.maze = maze;
        this.cellId = getCellId(i,j);
        this.wall=false;// path cant go via it if true
        this.nbrs = this.getNbrs(i,j);
        this.prev=null;

        //below code is usefull for a* and djikstra only
        this.f=Number.MAX_VALUE-100000;
        this.g=Number.MAX_VALUE-100000;;
        this.h=Number.MAX_VALUE-100000;;
    }

    makeWall(evnt){
        if(this.x===this.maze.start_r && this.y===this.maze.start_c) return;
        if(this.x===this.maze.target_r && this.y===this.maze.target_c) return;
        if(window.isMouseDown || evnt.type==="mousedown"){
            if(this.wall){
                this.wall=false;
                document.getElementById(this.cellId).style.backgroundColor = "wheat";
            }
            else{
                this.wall=true;
                document.getElementById(this.cellId).style.backgroundColor = "black";
            }
        }
    }

    getNbrs(i,j){
        let nbrs = [];
        let rows=this.maze.r, cols=this.maze.c;

        if(i<rows-1)
            nbrs.push(getCellId(i+1,j));
        if(j<cols-1)
            nbrs.push(getCellId(i,j+1));
        if(i>0)
            nbrs.push(getCellId(i-1,j));
        if(j>0)
            nbrs.push(getCellId(i,j-1));

        // //adding diagonals
        // if(j>0 && i>0)
        //     nbrs.push(getCellId(i-1,j-1));
        // if(j<cols-1 && i<rows-1)
        //     nbrs.push(getCellId(i+1,j+1));
        // if(j<cols-1 && i>0)
        //     nbrs.push(getCellId(i-1,j+1));
        // if(j>0 && i<rows-1)
        //     nbrs.push(getCellId(i+1,j-1));
        
        return nbrs;
    }

    reset(){
        this.wall=false;
        this.f=Number.MAX_VALUE-100000;;
        this.g=Number.MAX_VALUE-100000;;
        this.h=Number.MAX_VALUE-100000;;
        document.getElementById(this.cellId).style.backgroundColor = "#f5f5f5";
    }

}



export default Spot;