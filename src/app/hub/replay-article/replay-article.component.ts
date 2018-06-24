import { Component, OnInit, Inject, Input, Output, OnChanges, EventEmitter } from '@angular/core';

import { BASE_URL } from '../../apis/apis.module';
import { AuthService } from '../../auth/auth.service';
import { GrowlMessageService } from '../../growl-message.service';
import { CommentsService } from '../../apis/comments.service';

declare let Simditor;

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
        this.createSimditor();
    }

    ngOnChanges() {
        console.log('replayArticle', this.replayArticle);
        console.log('replayComment', this.replayComment)
    }

    createSimditor() {

        let url = this.apiUrl + "/image";

        if (this.authService.isLogin) {
            url += "?token=" + this.authService.authorization.access_token;
        }

        this.simditor = new Simditor({
            textarea: $('#textarea'),
            placeholder: 'hahaha',
            defaultImage: "assets/images/avatar.jpg",
            upload: {
                url: url,
                fileKey: 'file',
                connectionCount: 1,
                leaveConfirm: 'Uploading is in progress, are you sure to leave this page?'
            },
            pasteImage: true,
            cleanPaste: true,
            toolbar: [
                'title',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'fontScale',
                'color',
                'ol',
                'ul',
                'blockquote',
                'code',
                'table',
                'link',
                'image',
                'hr',
                'indent',
                'outdent',
                'alignment'
            ]
        });
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
