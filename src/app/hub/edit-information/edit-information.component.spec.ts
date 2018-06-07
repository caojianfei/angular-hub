import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInformationComponent } from './edit-information.component';

describe('EditInformationComponent', () => {
  let component: EditInformationComponent;
  let fixture: ComponentFixture<EditInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
