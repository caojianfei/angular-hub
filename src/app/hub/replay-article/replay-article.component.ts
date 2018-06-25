import { Component, OnInit, Inject, Input, Output, OnChanges, EventEmitter } from '@angular/core';

import { BASE_URL } from '../../apis/apis.module';
import { AuthService } from '../../auth/auth.service';
import { GrowlMessageService } from '../../growl-message.service';
import { CommentsService } from '../../apis/comments.service';


@Component({
    selector: 'app-replay-article',
    templateUrl: './replay-article.component.html',
    styleUrls: ['./replay-article.component.scss']
})
export class ReplayArticleComponent implements OnInit, OnChanges {

    simditor;

    @Input() replayArticle: number;

    @Input() replayComment: number;

    @Output() createdComment = new EventEmitter<boolean>();

    constructor(
        @Inject(BASE_URL) private apiUrl: string,
        private authService: AuthService,
        private message: GrowlMessageService,
        private api: CommentsService
    ) { }

    ngOnInit() {
        //this.createSimditor();
    }

    ngOnChanges() {
        console.log('replayArticle', this.replayArticle);
        console.log('replayComment', this.replayComment)
    }

    
    submit() {

        let content: string = this.simditor.getValue();

        if (!content) {
            this.message.warn('回复内容不能为空');
            return ;
        }

        if (!this.replayArticle) {
            this.message.warn('回复文章为空');
            return ;
        }

        this.api.createComment(this.replayArticle, {
            content: content,
            replay_id: this.replayComment ? this.replayComment : 0
        }).subscribe(
            res => {
                //console.log('created comment', res);
                this.createdComment.emit(true);
            },
            err => {
                this.message.error(err.message);
            }
        );
    }


}
