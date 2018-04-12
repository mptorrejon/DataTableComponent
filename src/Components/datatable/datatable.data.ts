import { Injectable } from '@angular/core';
import { DataTableProps } from './datatable.props';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class DataTableData{
	isMock:{data:boolean, submit:boolean};//interface
	
	constructor(
		private _dtPropsSrvc:DataTableProps,
		private _http:HttpClient
	){
		//mock object
		this.isMock = {
			data: true,
			submit: false
		}
	}
	submitAction(obj){
		let uri = this._dtPropsSrvc.getSubmitUrl( this.isMock.submit );
		return this._http.post(uri, obj);
	}

	getData(numCols:number){
		
		let url = this._dtPropsSrvc.getDataUrl( this.isMock.data );
		return this._http.get(url).pipe(
			map( (res:Array<{}>)=>{
				//paginates fullset and returns a paginated array
				return this.paginate(res, numCols);
			})
		);
	}

	paginate(fullSet, divider){
		let initIndex = 0;
		let paginatedArr = new Array();
		let length = fullSet.length;
		
		let remainder = length%divider; //gets the int part of division
		let quotient = Math.floor(length/divider); //get the remainder
		// debugger;
		for(let i=0; i<fullSet.length ;i = i++){
			let chunk = fullSet.splice(i, divider);
			paginatedArr.push(chunk);
		}
		return paginatedArr;
	}
	
}