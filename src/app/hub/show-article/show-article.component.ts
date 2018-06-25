import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { ArticlesService } from '../../apis/articles.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Article } from '../../apis/models/responses/article';
import { GrowlMessageService } from '../../growl-message.service';
import { CommentsService } from '../../apis/comments.service';


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
        private articlesService: ArticlesService,
        private message: GrowlMessageService,
        private commentsService: CommentsService
    ) { }

    article$: Observable<Article>;

    article: Article;

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.replayArticle = +params.get('id');
                return this.articlesService.getArticle(this.replayArticle, ['comments.replayComment.user', 'comments.user.avatar'])
            }
            )
        ).subscribe(
            res => this.article = res,
            err => this.message.error(err.message)
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

    comment: string;

    commentContentChange(event) {
        console.log(event);
        this.comment = event;
    }

    submitCommit() {
        if (!this.comment) {
            this.message.warn('评论不能为空哦！');
            return false;
        }

        this.commentsService.createComment(this.replayArticle, { content: this.comment }, ['replayComment.user', 'user.avatar'])
            .subscribe(
                res => {
                    if (!this.article.comments) {
                        this.article.comments = { data: [] };
                    }

                    this.article.comments.data.push(res);
                    this.message.success('评论成功');
                },
                err => {
                    this.message.error(err.message);
                }
            );
    }



}
