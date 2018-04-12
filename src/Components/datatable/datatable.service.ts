import { Injectable } from '@angular/core';
import { DataTableData } from './datatable.data';

@Injectable()
export class DataTableService{
	numCols:number;
	currentRow:{};
	constructor(
		private _dtDataSrvc:DataTableData
	){
		
	}
	getData(){
		return this._dtDataSrvc.getData( this.numCols );
	}

	setNumCols(numCols:number){
		this.numCols = numCols;
	}
	getNumCols(){
		return this.numCols;
	}
	SubmitAction(id, status){
		this.currentRow= {
			id: id,
			status: status
		}

		return this._dtDataSrvc.submitAction(this.currentRow);
	}
}