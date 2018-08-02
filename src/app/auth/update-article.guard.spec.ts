import { TestBed, async, inject } from '@angular/core/testing';

import { UpdateArticleGuard } from './update-article.guard';

describe('UpdateArticleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateArticleGuard]
    });
  });

  it('should ...', inject([UpdateArticleGuard], (guard: UpdateArticleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
