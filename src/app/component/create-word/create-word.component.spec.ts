import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CreateWordComponent } from './create-word.component';
import { DataService } from "../../service/data-management/data-management.service";
import { EditWordService } from '../../service/make-output-data/make-output-data.service';

describe('CreateWordComponent', () => {
  let component: CreateWordComponent;
  let fixture: ComponentFixture<CreateWordComponent>;
  let dataService: DataService;
  let editWordService: EditWordService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateWordComponent],
      providers: [
        DataService,
        EditWordService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWordComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);
    editWordService = TestBed.get(EditWordService);
    fixture.detectChanges();
  });

  it('should create', () => {
  });
});
