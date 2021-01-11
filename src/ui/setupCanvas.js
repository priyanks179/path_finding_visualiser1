

const setup = (r,c)=>{

    // setting background div, on which grid will lie
    let canvas_div = document.createElement("div");
    canvas_div.setAttribute("id","canvas");
    canvas_div.setAttribute("style","border-style:solid; border-width:thin; background-color:#f5f5f5; width:100%; height:100%;")
    document.getElementById("main").appendChild(canvas_div);

    //getting ht and width of each cell acc to no of cols and rows
    let rows=r, cols=c;
    let col_width=String(100/cols)+"%", row_height=String(100/rows)+"%";

    let temp_row_div = document.createElement("div");
    temp_row_div.setAttribute("style",`width:100%; height:${row_height}; display:flex;`);

    let temp_cell_div = document.createElement("div");
    temp_cell_div.setAttribute("style",
        `width: ${col_width}; height: 100%;  border-width: thin;
         border-style: solid; display:flex; justify-content: center; align-items: center;`);

    for(let i=0; i<rows;i++){
        let row_div = temp_row_div.cloneNode(true);
        for(let j=0;j<cols;j++){
            let cell_div = temp_cell_div.cloneNode(true);
            cell_div.setAttribute("id",`${i}_${j}`);
            row_div.appendChild(cell_div);
        }
        canvas_div.appendChild(row_div);
    }

    window.isMouseDown = false; 
    document.getElementsByTagName("body")[0].addEventListener('mousedown', () => {window.isMouseDown=true; });
    document.getElementsByTagName("body")[0].addEventListener('mouseup', () => {window.isMouseDown=false; });

};

export default setup;
