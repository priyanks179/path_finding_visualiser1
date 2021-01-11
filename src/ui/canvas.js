import {getCellId, getStartElement, getTargetElement, getIndFromId} from '../util';

class Canvas{
    constructor(rows,cols){
        this.r = rows;
        this.c = cols;
        this.start_r = 0;
        this.start_c = 0;
        this.target_r = rows-1;
        this.target_c = cols-1;
        this.startCellId = getCellId(this.start_r,this.start_c);
        this.targetCellId = getCellId(this.target_r,this.target_c);

        this.addIcon(this.startCellId, getStartElement);
        this.addIcon(this.targetCellId, getTargetElement);
    }

    addIcon(cellId,getElement){
        document.getElementById(cellId).appendChild(getElement());
    }

    setStartPos(id){
        let arr = getIndFromId(id);
        this.start_c=arr[1];
        this.start_r=arr[0];
        this.startCellId=id;
    }

    setTargetPos(id){
        let arr = getIndFromId(id);
        this.target_c=arr[1];
        this.target_r=arr[0];
        this.targetCellId=id;
    }


}

export default Canvas;