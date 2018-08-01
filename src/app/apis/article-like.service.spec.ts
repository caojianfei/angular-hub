import { TestBed, inject } from '@angular/core/testing';

import { ArticleLikeService } from './article-like.service';

describe('ArticleLikeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleLikeService]
    });
  });

  it('should be created', inject([ArticleLikeService], (service: ArticleLikeService) => {
    expect(service).toBeTruthy();
  }));
});
