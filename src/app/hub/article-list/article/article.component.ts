import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../apis/articles.service';
import { ArticlePagination } from '../../../apis/models/responses/article-pagination';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-list-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

    categoryId: string = '1';

    constructor(
        private articlesService: ArticlesService
    ) { }

    totalArticles$: Observable<ArticlePagination>;

    hotArticles$: Observable<ArticlePagination>;

    recentReplayArticles$: Observable<ArticlePagination>;

    ngOnInit() {
        this.getTotalArticles();
        this.getHotArticles();
        this.getRecentArticles();
    }

    onTabChange(event) {
        //console.log(event)
    }

    onPageChange(event, type) {
        //console.log(event)
        //console.log(type)
        let page = event.page + 1;
        if (type === 1) {
            this.getTotalArticles(page);
            return ;
        }

        if (type === 2) {
            this.getHotArticles(page);
            return ;
        }

        if (type === 3) {
            this.getRecentArticles(page);
            return ;
        }
    }


    getTotalArticles(page: number = 1) {
        let param = {
            category_id: this.categoryId,
            recent: '1',
            page: page
        };

        this.totalArticles$ = this.getArticles(param);
    }

    getHotArticles(page: number = 1) {
        let param = {
            category_id: this.categoryId,
            hot: '1',
            page: page
        };

        this.hotArticles$ = this.getArticles(param);
    }

    getRecentArticles(page: number = 1) {
        let param = {
            category_id: this.categoryId,
            recent_replay: '1',
            page: page
        };

        this.recentReplayArticles$ = this.getArticles(param);
    }


    getArticles(params, include: string[] = null) {
        if (!include) {
            include = ['user'];
        }

        return this.articlesService.getArticles(params, include);
    }

}
