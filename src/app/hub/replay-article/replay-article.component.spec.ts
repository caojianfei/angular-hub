import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayArticleComponent } from './replay-article.component';

describe('ReplayArticleComponent', () => {
  let component: ReplayArticleComponent;
  let fixture: ComponentFixture<ReplayArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplayArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplayArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
