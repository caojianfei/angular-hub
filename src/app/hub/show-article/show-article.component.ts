import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { ArticlesService } from '../../apis/articles.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Article } from '../../apis/models/responses/article';


@Component({
    selector: 'app-show-article',
    templateUrl: './show-article.component.html',
    styleUrls: ['./show-article.component.scss']
})
export class ShowArticleComponent implements OnInit {

    color: string = 'red';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private articlesService: ArticlesService
    ) { }

    article$: Observable<Article>;

    ngOnInit() {
        this.article$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.articlesService.getArticle(+params.get('id'), ['comments.replayComment', 'comments.user.avatar']))
        );
    }

}
