import { TestBed, async, getTestBed } from '@angular/core/testing';
import { DataTableComponent } from './datatable.component';
import { FormsModule } from '@angular/forms';
import { DataTableService } from './datatable.service';
import { DataTableData } from './datatable.data';
import { DataTableProps } from './datatable.props';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('DataTableComponent', ()=>{
	
	let injector:TestBed;
	let service:DataTableService;
	let dataService:DataTableData;
	let propsService:DataTableProps;
	let httpMock:HttpTestingController;

	beforeEach(async( ()=>{
		TestBed.configureTestingModule({
			imports: [ 
				FormsModule, 
				HttpClientTestingModule 
			],
			providers: [ 
				DataTableService, 
				DataTableData,
				DataTableProps,
				HttpClient,
				HttpHandler
			],
			declarations: [
				DataTableComponent
			]
		}).compileComponents();

		injector = getTestBed();
		service = new DataTableService(injector.get(DataTableService));
		
		dataService = injector.get(DataTableData);
		propsService = injector.get(DataTableProps);
	}));

	it("should instantiate DataTableComponent", async( ()=>{
		const fixture = TestBed.createComponent(DataTableComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
	// onSearchTyped

	it("should test for component variables", async( ()=>{
		let cmpt = new DataTableComponent( service );
		cmpt.numCols = 20;
		cmpt.currentIndex = 0;
		cmpt.tableHeaders = ['name', 'lastname'];
		//more component variables
		expect(cmpt.numCols).toEqual(20);
		expect(cmpt.currentIndex).toEqual(0);
		expect(cmpt.tableHeaders).toEqual(['name', 'lastname']);
		//more expets...
	}));

	it("should test table controls - tableControl()", async( ()=>{

		let cmpt = new DataTableComponent(service);
		cmpt.dataRows = [1,2,3,4];

		cmpt.currentIndex = 2;
		cmpt.tableControl( 'first' );
		expect(cmpt.currentIndex).toEqual(0);

		cmpt.currentIndex = 2;
		cmpt.tableControl( 'back' );
		expect(cmpt.currentIndex).toEqual(1);
		
		cmpt.currentIndex = 2;
		cmpt.tableControl( 'next' );
		expect(cmpt.currentIndex).toEqual(3);

		cmpt.tableControl( 'last' );
		expect(cmpt.currentIndex).toEqual(cmpt.dataRows.length);

	} ));

	it("should test value typed - onSearchTyped()", async(()=>{
		let cmpt = new DataTableComponent(service);
		let e = {target:{value:'nan'}};
		cmpt.onSearchTyped(e);

		expect(cmpt.isValid).toEqual(false);
	} ));
});