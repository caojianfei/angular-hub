import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { ArticlesService } from '../../apis/articles.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Article } from '../../apis/models/responses/article';
import { GrowlMessageService } from '../../growl-message.service';
import { CommentsService } from '../../apis/comments.service';
import { ModalComponent } from '../../components/bootstrap/modal/modal.component';
import { Comment } from '../../apis/models/responses/comment';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../apis/models/responses/user';
import { ArticleLikeService } from '../../apis/article-like.service';


declare let editormd;

@Component({
    selector: 'app-show-article',
    templateUrl: './show-article.component.html',
    styleUrls: ['./show-article.component.scss']
})
export class ShowArticleComponent implements OnInit {

    @ViewChild(ModalComponent) modal: ModalComponent;
    color: string = 'red';

    displayReplay: boolean = false;

    replayArticle: number;

    replayComment: number;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private articlesService: ArticlesService,
        private message: GrowlMessageService,
        private commentsService: CommentsService,
        private authService: AuthService,
        private likeService: ArticleLikeService
    ) { }

    article$: Observable<Article>;

    article: Article;

    liked: boolean = false;

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

        if (this.isLogin) {
            this.likeService.islike(this.replayArticle).subscribe(
                res => {
                    this.liked = res.liked
                }
            )
        }
    }

    get loginedUser(): User {
        return this.authService.loginedUser
    }

    get isLogin(): boolean {
        return this.authService.isLogin;
    }

    comment: string;

    submitComment() {
        if (!this.comment) {
            this.message.warn('评论不能为空哦！');
            return false;
        }

        this.createComment(this.comment)
    }

    replayCommentContent: string;

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
                        this.modalVisibel = false;
                        this.replayCommentContent = '';
                    } else {
                        this.comment = '';
                    }

                    this.article.comments.data.push(res);
                    this.message.success('评论成功');
                },
                err => {
                    this.message.error(err.message);
                }
            );

    }

    updateComment() {
        if (!this.updateId) {
            this.message.warn('出错啦!');
            return false;
        }

        if (!this.updateContent) {
            this.message.warn("评论不能为空");
            return false;
        }

        this.commentsService.updateComment(this.updateId, this.updateContent).subscribe(
            res => {
                this.article.comments.data.forEach((comment) => {
                    if (comment.id === this.updateId) {
                        comment.content = res.content
                    }
                    this.updateContent = '';
                    this.modalVisibel = false;
                });
                this.message.success('评论更新成功');
            },
            err => {
                this.message.error(err.message);
            }
        )
    }

    modalVisibel: boolean = false;

    editType: number = 0;


    replay(id: number) {
        this.editType = 0;
        this.replayComment = id;
        this.modalVisibel = true;
    }

    confirmed(event) {
        if (this.editType === 0) {
            this.submitReplayComment();
        } else {
            this.updateComment();
        }

    }

    updateContent = '';

    updateId: number;

    update(comment: Comment) {
        this.editType = 1;
        this.updateContent = comment.content;
        this.updateId = comment.id;
        this.modalVisibel = true;
    }


    delete(comment: Comment) {
        this.commentsService.deleteComment(comment.id).subscribe(
            res => {
                this.article.comments.data.forEach((itme, index, comments) => {
                    if (itme.id === comment.id) {
                        comments.splice(index, 1);
                    }
                })
                this.message.success("品论删除成功");
            },

            err => {
                this.message.error(err.message);
            }
        );
    }

    like() {
        if (this.liked) {
            this.message.info("已经点过赞咯！");
            return;
        }

        this.likeService.like(this.replayArticle).subscribe(
            res => {
                this.liked = true;
                this.article.like_count += 1;
            },
            err => {
                this.message.error(err.message);
            }
        );
    }

    unlike() {
        if (!this.like) {
            this.message.warn('您还没有点赞哦！');
            return;
        }

        this.likeService.unlike(this.replayArticle).subscribe(
            res => {
                this.liked = false;
                this.article.like_count -= 1;
            },
            err => {
                this.message.error(err.message);
            }
        )
    }

    toogleLike() {
        this.liked ? this.unlike() : this.like();
    }
}
