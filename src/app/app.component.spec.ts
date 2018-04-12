import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DataTableComponent } from '../Components/datatable/datatable.component';
import { FormsModule } from '@angular/forms';
import { DataTableService } from '../Components/datatable/datatable.service';
import { DataTableData } from '../Components/datatable/datatable.data';
import { DataTableProps } from '../Components/datatable/datatable.props';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DataTableComponent
      ],
      imports: [FormsModule],
      providers: [
        DataTableService,
        DataTableData,
        DataTableProps,
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('DataTable');
  }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
