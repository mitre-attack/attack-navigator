import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TechniqueCellComponent } from './technique-cell.component';
import { Matrix, Technique } from '../../data.service';

describe('TechniqueCellComponent', () => {
  let component: TechniqueCellComponent;
  let fixture: ComponentFixture<TechniqueCellComponent>;
  let matrixStub: Partial<Matrix>;
  let techniqueStub: Partial<Technique>;

  beforeEach(waitForAsync(() => {

    matrixStub = {}
    techniqueStub = {
      id: "1111-2222-3333-4444",
      attackID: "T1234",
    }

    TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
      declarations: [ TechniqueCellComponent ],
      providers: [ { provide: Technique, useValue: techniqueStub } ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechniqueCellComponent);
    component = fixture.componentInstance;

    // let test_technique = new Technique({id: "1111-2222-1111"}, null, null)
    // let test_technique = new Technique(0, null, null)
    // component.technique = test_technique

    // component.technique = {
    //   id: "1111-2222-3333-4444",
    //   attackID: "T1234",
    //   name: "This is a technique",
    //   description: "some description",
    //   url: "something",
    //   created: "2020",
    //   modified: "2022",
    //   revoked: false,
    //   deprecated: false,
    //   version: "string",
    //   platforms: ["enterprise"],
    //   tactics: ["collection"],
    //   subtechniques: [],
    //   datasources: "DATA SOURCES!! YAY!",
    //   parent: null,
    //   isSubtechnique: false,
    //   get_technique_tactic_id: null,
    //   get_all_technique_tactic_ids: null,
    //   dataService: null,
    //   compareVersion: null,
    //   revoked_by: null,
    // }

    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(component)
    expect(component).toBeTruthy();
  });
});
