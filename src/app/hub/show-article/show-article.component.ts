import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { ArticlesService } from '../../apis/articles.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Article } from '../../apis/models/responses/article';


declare let editormd;

@Component({
    selector: 'app-show-article',
    templateUrl: './show-article.component.html',
    styleUrls: ['./show-article.component.scss']
})
export class ShowArticleComponent implements OnInit {

    color: string = 'red';

    displayReplay: boolean = false;

    replayArticle: number;

    replayComment: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private articlesService: ArticlesService
    ) { }

    article$: Observable<Article>;

    ngOnInit() {
        this.article$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.replayArticle = +params.get('id');
                return this.articlesService.getArticle(this.replayArticle, ['comments.replayComment.user', 'comments.user.avatar'])
            }
            )
        );


    }

    displayReplayDialog(id: number = null) {
        this.displayReplay = true;
        this.replayComment = id;
    }

    createdComment(event) {
        this.article$ = this.articlesService.getArticle(this.replayArticle, ['comments.replayComment.user', 'comments.user.avatar']);
        this.displayReplay = false;
        this.replayArticle = null;
        console.log('createdComment', event);
    }

}
