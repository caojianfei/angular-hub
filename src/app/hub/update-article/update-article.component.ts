import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { GrowlMessageService } from '../../growl-message.service';
import { ArticlesService } from '../../apis/articles.service';
import { TagsService } from '../../apis/tags.service';
import { BASE_URL } from '../../apis/apis.module';
import { Tag } from '../../apis/models/responses/tag';
import { Article } from '../../apis/models/responses/article';
import { switchMap } from 'rxjs/operators';
import { UpdateArticle } from '../../apis/models/requests/update-article';

@Component({
    selector: 'app-update-article',
    templateUrl: './update-article.component.html',
    styleUrls: ['./update-article.component.scss']
})
export class UpdateArticleComponent implements OnInit {

    articleTitle: string;

    writeType: string;

    shareLink: string;

    simditor: any;

    type: string;

    categoryId: number;

    tags: Tag[];

    filteredTags: any[];

    selectedTags: any[];

    articleStatus: number;

    article: Article;

    articleId: number;

    constructor(
        @Inject(BASE_URL) private apiUrl,
        private route: ActivatedRoute,
        private message: GrowlMessageService,
        private articlesService: ArticlesService,
        private tagsService: TagsService,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.articleId = +params.get('id');
                return this.articlesService.getArticle(this.articleId, ['user', 'tags'])
            })
        ).subscribe(
            res => {
                this.article = res;
                this.articleTitle = this.article.title
                this.writeType = this.article.write_type
                this.shareLink = this.article.share_link
                this.categoryId = this.article.category_id
                this.selectedTags = this.article.tags.data
                this.getTags();
                this.defineType(this.article.category_id)
            },
            err => this.message.error(err.message)
        );

        this.getTags();
    }


    getTags() {
        this.tagsService.getTags().subscribe(
            res => {
                this.tags = res.data;
            },
            err => {
                this.message.error(err.message)
            }
        )
    }

    filterTags(event) {
        if (this.tags) {
            let query = event.query;
            this.filteredTags = [];
            this.tags.forEach((tag) => {
                if (tag.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                    this.filteredTags.push(tag)
                }
            });
        }
    }

    selectedTag() {
        if (this.selectedTags.length > 3) {
            alert('请不要选择超过三个标签')
            this.selectedTags.pop();
        }
    }

    content: string;

    getContent(event) {
        this.content = event;
    }

    defineType(categoryId: number) {
        if (categoryId === 1) {
            this.type = '修改文章';
        } else if (categoryId === 2) {
            this.type = "修改问题";
        } else {
            this.type = "修改分享";
        }
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

        let data: UpdateArticle = {
            title: this.articleTitle,
            content: this.content,
            tags: tags
        }

        if (this.categoryId === 3) {
            data.share_link = this.shareLink;
        }

        if (this.categoryId === 1) {
            data.write_type = this.writeTypeCode
        }
    
        this.articlesService.updateArticle(this.articleId, data).subscribe(
            res => {
                this.message.success('更新成功');
                this.router.navigate(['/articles/' + res.id]);
            },
            err => {
                //console.log(err)
                this.message.error(err.message)
            }
        );
    }

}
