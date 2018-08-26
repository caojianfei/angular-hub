import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BASE_URL } from '../../apis/apis.module';
import { AuthService } from '../../auth/auth.service';
import { TagsService } from '../../apis/tags.service';
import { Tag } from '../../apis/models/responses/tag';
import { GrowlMessageService } from '../../growl-message.service';
import { ArticlesService } from '../../apis/articles.service';
import { CreateArticle } from '../../apis/models/requests/create-article';

declare let editormd;

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

    articleStatus: number;

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
        this.authService.loginStatusChage.subscribe(res => {
            if (res === false) {
                let redirectUrl = this.router.routerState.snapshot.url;
                this.router.navigate(['login', {redirect: redirectUrl}])
            }
        })

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

    selectedTag(e) {
        if (this.selectedTags.length > 3) {
            alert('请不要选择超过三个标签')
            this.selectedTags.pop();
        }
    }

    content: string;

    getContent(event) {
        //console.log(event);
        this.content = event;
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

        let articleContent = this.content ? this.content : null;

        if (!articleContent && this.categoryId !== 3) {
            this.message.warn("内容不能为空");
            return;
        }

        let tags: number[] = [];
        this.selectedTags.forEach((tag) => {
            tags.push(tag.id);
        });

        let data: CreateArticle = {
            title: this.articleTitle,
            category_id: this.categoryId,
            content: articleContent,
            tags: tags,
            write_type: this.writeTypeCode,
            status: this.articleStatus,
        }
    
        if (this.categoryId === 3) {
            data.share_link = this.shareLink;
        }

        this.articlesService.createArticle(data).subscribe(
            res => {
                //console.log(res);
                this.message.success('新增成功');
                this.router.navigate(['/articles/' + res.id]);
            },
            err => {
                console.log(err)
                //this.message.error(err.message)
            }
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
