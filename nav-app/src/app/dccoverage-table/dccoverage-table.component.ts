import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, SharedService, CompanyDictionary } from '../services/data.service';
import { CoverageDetailsDialogComponent } from '../coverage-details-dialog/coverage-details-dialog.component';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-dccoverage-table',
  templateUrl: './dccoverage-table.component.html',
  styleUrls: ['./dccoverage-table.component.scss'],
    animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class DCcoverageTableComponent implements OnInit, AfterViewInit  {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Data source','Data component', 'count', 'coverage'];
  expandedElement: any | null = null;
  rows: any[] = [];
  sectors: string[];
  geographies: string[];
  companyName: string;

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private dialog: MatDialog, private http: HttpClient, private dataService: DataService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.loadInitialData();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  loadInitialData() {
        this.sharedService.currentLayer.subscribe(data => {
            console.log(data);
            this.companyName = data.companyName;
            this.geographies = data.geographies;
            this.sectors = data.sectors;
            this.getPythonData();
            });
        };


  getPythonData() {
    this.http.post('http://localhost:3001/get_tds_data', { companyName: this.companyName, sectors: this.sectors, geographies: this.geographies })
      .subscribe(response => {
        console.log('Response from Python:', response);
        // Transformeer de object data naar een array van objecten
        this.rows = Object.keys(response).map(key => ({
          data_source: key.split(": ")[0],
          data_component: key.split(": ")[1],
          count: response[key].count,
          color: response[key].color,
          coveragePerc: response[key].coveragePerc,
          technologies: response[key].technologies.map(tech => ({
            name: Object.keys(tech)[0],
            percentage: Object.values(tech)[0]}))
        }));
        console.log('rows',this.rows)
        this.dataSource = new MatTableDataSource(this.rows);
        this.dataSource.sort = this.sort;
      }, error => {
        console.error('Error calling Python API:', error);
      });
  }

  toggleRow(row: any) {
    console.log('Toggling row:', row);
    this.expandedElement = this.expandedElement === row ? null : row;
    console.log('New expandedElement:', this.expandedElement);
  }


  isExpandedRow = (index, row) => {
    const result = row === this.expandedElement;
    console.log(`Row at index ${index} is expanded: ${result}`);
    return result;
  };

}

