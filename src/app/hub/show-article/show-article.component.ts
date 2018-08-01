import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { ArticlesService } from '../../apis/articles.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Article } from '../../apis/models/responses/article';
import { GrowlMessageService } from '../../growl-message.service';
import { CommentsService } from '../../apis/comments.service';
import { ModalComponent } from '../../components/bootstrap/modal/modal.component';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../apis/models/responses/user';


declare let editormd;

@Component({
    selector: 'app-show-article',
    templateUrl: './show-article.component.html',
    styleUrls: ['./show-article.component.scss']
})
export class ShowArticleComponent implements OnInit {

    @ViewChild(ModalComponent) modal: ModalComponent;

    displayReplay: boolean = false;

    replayArticle: number;

    replayComment: number;

    isLogin: boolean;

    loginedUser: User;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private articlesService: ArticlesService,
        private message: GrowlMessageService,
        private commentsService: CommentsService,
        private authService: AuthService
    ) { }

    article$: Observable<Article>;

    article: Article;

    ngOnInit() {

        this.isLogin = this.authService.isLogin;
        this.loginedUser = this.authService.loginedUser

        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.replayArticle = +params.get('id');
                return this.articlesService.getArticle(this.replayArticle, ['comments.replayComment.user', 'comments.user.avatar'])
            }
            )
        ).subscribe(
            res => { 
                this.article = res;
                console.log(this.article)
            },
            err => this.message.error(err.message)
        );
    }   

    /**
     * 跳转登录界面
     */
    login() {
        this.router.navigate(['/login', { redirect: '/articles/1001' }]);
    }

    /**
     * 回复内容
     */
    comment: string;

    /**
     * 提交文章回复
     */
    submitComment() {

        if (!this.comment) {
            this.message.warn('评论不能为空哦！');
            return false;
        }

        this.createComment(this.comment)
    }   

    /**
     * 评论其他回复的内容
     */
    replayCommentContent: string;

    /**
     * 提交对评论的回复
     */
    submitReplayComment() {

        if (!this.replayComment) {
            this.message.warn('出错啦！');
            return false;
        }

        if (!this.replayCommentContent) {
            this.message.warn('评论不能为空哦！');
            return false;
        }
        this.createComment(this.replayCommentContent, this.replayComment);
    }


    createComment(content: string, replayId?: number) {
        let body: { content: string, replay_id?: number } = {
            content: content,
        }

        if (replayId) {
            body.replay_id = replayId
        }

        this.commentsService.createComment(this.replayArticle, body, ['replayComment.user', 'user.avatar'])
            .subscribe(
                res => {
                    if (!this.article.comments) {
                        this.article.comments = { data: [] };
                    }

                    if (replayId) {
                        this.modal.hide();
                    }

                    this.comment = '';
                    this.replayCommentContent = '';

                    this.article.comments.data.push(res);
                    this.message.success('评论成功');
                },
                err => {
                    this.message.error(err.message);
                }
            );

    }


    test() {
        this.modal.show();
    }

    confirmed(event) {
        console.log('confirmed', event);
        this.modal.hide();
    }


}
