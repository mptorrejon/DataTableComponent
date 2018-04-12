import { Injectable } from '@angular/core';

@Injectable()
export class DataTableProps{
	
	getDataUrl(ismock){
		let url = 'my/actual/endpoint';
		let mockUrl = './assets/sample_data.json';
		return (ismock)?mockUrl:url;
	}
	getSubmitUrl(ismock){
		let url = '/api/submit';
		let mockUrl = "my/mock/url";
		return (ismock)?mockUrl:url;
	}
}