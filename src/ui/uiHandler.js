import AlgoHandler from "../algos/algoHandler";
import setup from './setupCanvas';
import Canvas from "./canvas";
import {getCellId, generateGrid, reset} from '../util'

class UiHandler{
    constructor(){

        //by default setting no of rows and cols to 25 each
        this.rows=25;
        this.cols=25;
        
        setup(this.rows,this.cols);

        this.maze = new Canvas(this.rows,this.cols);
        this.grid = generateGrid(this.maze);

        this.algoHandler = new AlgoHandler(this.grid);
        
        this.setRowCOlMenu("row");
        this.setRowCOlMenu("col");
        this.setAlgoMenu();
        this.setSpeedMenu();
        this.reset();
    }


    setText(id, text){
        document.getElementById(id).innerHTML = text;
    }    

    setRowCOlMenu(type="row"){
        let idNo = type==="row" ? 3 : 4;
        for(let i=15; i<31; i++){
            let elem = document.createElement("li");
            elem.setAttribute("id", `${type}${i}`);
            elem.setAttribute("class", `${type}Menu`)
            elem.innerHTML=i;       
            document.getElementById(`menu${idNo}lst`).appendChild(elem);
        
            //setting event listener
            document.getElementById(`${type}${i}`).onclick = () => {
                //change on ui
                document.getElementById(`noof${type}s`).innerHTML=`${i}`;
                //closing list
                document.getElementById(`menu${idNo}lst`).style.display='none';

                //i want to again create the grid 
                if(idNo===3) this.rows=i;
                else this.cols=i;

                //first remove previous grid
                document.getElementById("main").removeChild(document.getElementById("canvas"));
                //now make canvas
                setup(this.rows, this.cols);
                this.maze = new Canvas(this.rows,this.cols)
                this.grid = generateGrid(this.maze);
                this.algoHandler.setGrid(this.grid);
                this.setAlgoMenu();


            }
        }
    
        //it will again show list when mouse enters hading
        document.getElementById(`menu${idNo}lstHeading`).addEventListener("mouseenter", ()=>{
            document.getElementById(`menu${idNo}lst`).style.display='block';
            // document.getElementById(`menu${idNo}lst`).style.zIndex='10';
        })
        
        //it will stop displaying list when mouse leaves list
        document.getElementById(`menu${idNo}lstHeading`).addEventListener("mouseleave", ()=>{
            document.getElementById(`menu${idNo}lst`).style.display='none';
        })
        


    }

    setAlgoMenu(){

        //setting default
        document.getElementById("visualize").onclick=this.algoHandler.run("bfs");
        this.setText("algoName",`Visualizing Bfs`);

        //binding each option im menu with event
        for(let elem of document.getElementsByClassName("algoMenu")){
            elem.addEventListener("click", (evnt) => {
                let id = evnt.target.id;
                let text = evnt.target.innerText;
                document.getElementById("visualize").onclick=this.algoHandler.run(id);
                this.setText("algoName",`Visualizing ${text}`);
                //did it stop displaying list on click
                document.getElementById("menu1lst").style.display='none';
            })
        }
    
        //it will again show list when mouse enters hading
        document.getElementById("menu1lstHeading").addEventListener("mouseenter", ()=>{
            document.getElementById("menu1lst").style.display='block';
            document.getElementById("menu1lst").style.zIndex='10';
        })

        //it will stop displaying list when mouse leaves list
        document.getElementById("menu1lstHeading").addEventListener("mouseleave", ()=>{
            document.getElementById("menu1lst").style.display='none';
        })

    }

    setSpeedMenu(){
        //binding each option im menu with event
        for(let elem of document.getElementsByClassName("speedMenu")){
            elem.addEventListener("click", (evnt) => {
                let id = evnt.target.id;
                let text = evnt.target.innerText;
                this.setText("speedName", text);
                if(id==="slow") window.fillColorTimer = 15;
                else if(id==="average") window.fillColorTimer = 10;
                else if(id==="fast") window.fillColorTimer = 5;
                document.getElementById("menu2lst").style.display='none';
            })
        }
        //it will again show list when mouse enters hading
        document.getElementById("menu2lstHeading").addEventListener("mouseenter", ()=>{
            document.getElementById("menu2lst").style.display='block';
        })
        //it will stop displaying list when mouse leaves list
        document.getElementById("menu2lstHeading").addEventListener("mouseleave", ()=>{
            document.getElementById("menu2lst").style.display='none';
        })
    }

    reset(){
        document.getElementById('reset').addEventListener('click', () => {reset.bind(this, this.grid)(); });
    }

}



export default UiHandler;