import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubHomeComponent } from './hub-home.component';

describe('HubHomeComponent', () => {
  let component: HubHomeComponent;
  let fixture: ComponentFixture<HubHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
