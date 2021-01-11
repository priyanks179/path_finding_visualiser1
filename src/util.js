import Spot from './ui/spot';

const getCellId = (i,j) => {
    //return string of form ij
    let cellId = `${i}_${j}`; 
    return cellId;
}

const getIndFromId = (id) => {
    let arr = id.split('_');
    arr[0] = Number(arr[0]);
    arr[1] = Number(arr[1]);
    return arr
}

let fillColorTimerIncrementalRate=1;// this will use to set timer for each color fill
window.fillColorTimer = 10;//
const reset = (grid) =>{
    for(let key of grid.keys()){
        let val = grid.get(key);
        val.reset();
        fillColorTimerIncrementalRate=0;
        
    }
}


const fillColor = (id, color) =>  {
    fillColorTimerIncrementalRate++;
    setTimeout(()=> {
        document.getElementById(id).style.backgroundColor=color;
    }, window.fillColorTimer    *  fillColorTimerIncrementalRate);
}

const getStartElement = () => {
    let elem = document.createElement("img");
    
    elem.setAttribute("id", "start");
    elem.setAttribute("class", "interactive_elem");
    elem.setAttribute("src", "../images/start.png");
    elem.setAttribute("width", `80%`);
    elem.setAttribute("height", `80%`);    
    return elem;
}

const getTargetElement = () => {
    let elem = document.createElement("img");
    
    elem.setAttribute("id", "target");
    elem.setAttribute("class", "interactive_elem");
    elem.setAttribute("src", "../images/target.png");
    elem.setAttribute("width", `80%`);
    elem.setAttribute("height", `80%`);    
    return elem;
}

const generateGrid = (maze) => {
    let r=maze.r, c=maze.c;
    
    //r is rows count and c is cols count
    let grid = new Map();
    for(let i=0; i<r; i++){
        for(let j=0; j<c; j++){
            
            let cellId = getCellId(i,j);
            let spot = new Spot(i,j,maze);
            
            grid.set(cellId, spot);
            document.getElementById(cellId).addEventListener("mouseenter", (evnt)=> spot.makeWall(evnt) );
            document.getElementById(cellId).addEventListener("mousedown", (evnt)=> spot.makeWall(evnt) );

            //below line will make a div dropable loc
            document.getElementById(cellId).addEventListener("dragover", (evnt)=> evnt.preventDefault());

            document.getElementById(cellId).addEventListener("dragstart", (evnt)=> {
                const elem = evnt.target;
                evnt.dataTransfer.setData("text/plain", elem["id"]);
                elem.style.opacity = '0';
                
            });

            document.getElementById(cellId).addEventListener("drop", (evnt)=>{
                let elemId = evnt.dataTransfer.getData('text');
                let elem = document.getElementById(elemId);
                let prntElem = elem.parentElement;
                let trgtElem = evnt.target;
                // console.log(trgtElem);                
        
                if(trgtElem.id==="start" || trgtElem.id==="target"){
                    //it means that your drop_start and drop_end pos is same
                    elem.style.opacity = '1';
                    window.isMouseDown=false;
                    return;

                }

                //clearing prev cell
                prntElem.removeChild(elem);

                

                //Enter data in target
                elem.style.opacity = "1";
                trgtElem.appendChild(elem);
                trgtElem.style.backgroundColor = "wheat";

               

                //if target is wall then removing it
                let spot = grid.get(trgtElem.id);
                if(spot.wall==true) spot.wall=false;

                //change start or target pts in maze
                if (elemId==="start")
                    maze.setStartPos(trgtElem.id);
                else if(elemId==="target")
                    maze.setTargetPos(trgtElem.id);

                window.isMouseDown=false;
            })

        }
    }
    return grid;
}
export {getCellId, generateGrid, getStartElement, getTargetElement, getIndFromId, reset, fillColor};