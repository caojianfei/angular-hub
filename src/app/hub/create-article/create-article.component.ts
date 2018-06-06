import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BASE_URL } from '../../apis/apis.module';
import { AuthService } from '../../auth/auth.service';
import { TagsService } from '../../apis/tags.service';
import { Tag } from '../../apis/models/responses/tag';
import { GrowlMessageService } from '../../growl-message.service';
import { ArticlesService } from '../../apis/articles.service';

declare let Simditor;

@Component({
    selector: 'app-create-article',
    templateUrl: './create-article.component.html',
    styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

    articleTitle: string;

    writeType: string = "原创";

    shareLink: string;

    simditor: any;

    type: string;

    categoryId: number;

    tags: Tag[];

    filteredTags: any[];

    selectedTags: any[];

    constructor(
        @Inject(BASE_URL) private apiUrl: string,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private tagsService: TagsService,
        private message: GrowlMessageService,
        private articlesService: ArticlesService
    ) { }

    ngOnInit() {
        this.tagsService.getTags().subscribe(
            res => {
                this.tags = res.data;
            },
            err => {
                this.message.error(err.message)
            }
        )

        this.route.params.subscribe(
            res => this.defineType(res.type)
        );

        this.createSimditor();
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

    defineType(type: string) {
        if (type === "article") {
            this.type = '写文章';
            this.categoryId = 1;
        } else if (type === "question") {
            this.type = "提问题";
            this.categoryId = 2;
        } else {
            this.type = "分享";
            this.categoryId = 3;
        }
    }


    filterTags(event) {
        let query = event.query;
        this.filteredTags = [];
        this.tags.forEach((tag) => {
            if (tag.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                this.filteredTags.push(tag)
            }
        });
    }

    selectedTag() {
        if (this.selectedTags.length > 3) {
            alert('请不要选择超过三个标签')
            this.selectedTags.pop();
        }
    }

    submit() {

        if (!this.articleTitle) {
            this.message.warn('标题不能为空');
            return;
        }

        if (!this.selectedTags || this.selectedTags.length === 0) {
            this.message.warn("至少选择一个标签");
            return;
        }

        if (this.categoryId === 3 && !this.shareLink) {
            this.message.warn('请填写分享链接');
            return;
        }

        let articleContent = this.simditor.getValue();

        if (this.categoryId === 3) {
            articleContent = `<p>分享链接：<a href="${this.shareLink}" target="_blank" class="">${this.shareLink}</a>${articleContent}</p>`;
        }

        if (!articleContent) {
            this.message.warn("内容不能为空");
            return;
        }

        let tags: number[] = [];
        this.selectedTags.forEach((tag) => {
            tags.push(tag.id);
        });

        this.articlesService.createArticle({
            title: this.articleTitle,
            category_id: this.categoryId,
            content: articleContent,
            tags: tags,
            write_type: this.writeTypeCode
        }).subscribe(
            res => {
                this.message.success('新增成功');
                this.router.navigate(['/articles/' + res.id]);
            },
            err => this.message.error(err.message)
        );
    }

    get writeTypeCode() {
        switch (this.writeType) {
            case '原创':
                return 0;
            case '转载':
                return 1;
            case '翻译':
                return 2;
            default:
                return 0
        }
    }
}
