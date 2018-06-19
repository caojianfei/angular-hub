import { Component, OnInit, Inject, Input, OnChanges } from '@angular/core';

import { BASE_URL } from '../../apis/apis.module';
import { AuthService } from '../../auth/auth.service';

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

    constructor(
        @Inject(BASE_URL) private apiUrl: string,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.createSimditor();
    }

    ngOnChanges() {
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


}
