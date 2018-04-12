import { Component, Input, EventEmitter } from '@angular/core';
import { TABLE_MODEL } from './table.model';
import { DataTableService } from './datatable.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
	selector: "datatable",
	templateUrl: './datatable.html',
	styleUrls: ['./datatable.scss']
})
export class DataTableComponent{
	tableHeaders:Array<string>;
	tableController:Object;
	dataRows: any;
	numCols:number;
	isValid:boolean;
	totalPages:number;
	currentIndex:number;
	private searchUpdated:Subject<number> = new Subject<number>();

	constructor(
		private _dtService:DataTableService
	){
		console.log("DataTableComponent Loaded");
		this.currentIndex = 0;
		this.numCols = 20; //sets default value input 
		this.isValid = true;
		this.dataRows = [];
		this.tableHeaders = TABLE_MODEL.HEADERS;
		this.tableController = TABLE_MODEL.TABLE_CONTROLLERS;
		this.totalPages = 0;
		
		//will capture input after some debound time so it does not make unnecessary(continuous) ajax calls
		this.searchUpdated.asObservable().debounceTime(1000).subscribe(
			(d:number)=>{
				console.log(d);
				//keep data at service level
				this._dtService.setNumCols(this.numCols);
				this.getData();
			}
		);
	}
	//calls service on component init
	ngOnInit(){
		this.searchUpdated.next(this.numCols);
	}
	//retrieves value from input on keyup event
	onSearchTyped(e){
		let value = e.target.value;
		if( !isNaN(value) ){
			this.isValid = true;
			this.numCols = e.target.value;
			this.searchUpdated.next(this.numCols);	
		}else{
			this.isValid = false;
		}
		
	}
	//call service to retrieve data paginated on numCols
	getData(){
		console.log("Getting "+this._dtService.getNumCols()+" Rows");
		this._dtService.getData().subscribe(
			(d:any)=>{
				this.dataRows = d;
				console.log(d);
			}
		);
	}
	//will perform correct action upon table control
	tableControl(action){
		switch(action){
			case "first":
				this.currentIndex = 0;
			break;

			case "back":
				if(this.currentIndex!=0)
					this.currentIndex = this.currentIndex-1;
			break;

			case "next":
				if(this.currentIndex != this.dataRows.length)
					this.currentIndex = this.currentIndex+1;
			break;

			case "last":
				this.currentIndex = this.dataRows.length;
			break;

			default:
				this.currentIndex = action;
				console.log(this.dataRows[this.currentIndex] );
			break;
		}
	}
	SubmitAction(rowId, rowStatus){
		this._dtService.SubmitAction(rowId, rowStatus).subscribe( (d:any)=>{
			/*
				do something with response...
			*/
			console.log("Return from POST");
		});
	}
}