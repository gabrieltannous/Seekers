import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyJobsComponent } from './company-jobs.component';

describe('CompanyJobsComponent', () => {
  let component: CompanyJobsComponent;
  let fixture: ComponentFixture<CompanyJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
