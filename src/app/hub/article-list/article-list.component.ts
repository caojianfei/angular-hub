import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ArticlePagination } from '../../apis/models/responses/article-pagination';
import { ArticlesService } from '../../apis/articles.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

    categoryId: string = '1';

    constructor(
        private route: ActivatedRoute,
        private articlesService: ArticlesService
    ) { }

    articlePagination$: Observable<ArticlePagination>;

    ngOnInit() {

        // this.articlePagination$ = this.route.paramMap.pipe(
        //     switchMap((params: ParamMap) => this.articlesService.getArticles({ category_id: params.get('categoryId') }, ['user', 'tags']))
        // );

        this.route.params.subscribe(
            res => this.categoryId = res.categoryId
        )

        //this.articlePagination$.subscribe(res => console.log(res))
    }
}
