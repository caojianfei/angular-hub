import { Component, OnInit } from '@angular/core';
import { ArticlePagination } from '../../../apis/models/responses/article-pagination';
import { Observable } from 'rxjs';
import { ArticlesService } from '../../../apis/articles.service';

@Component({
    selector: 'app-list-share',
    templateUrl: './share.component.html',
    styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

    categoryId: string = '3';

    include: string[] = ['user.avatar', 'tags'];

    hotShares$: Observable<ArticlePagination>;

    recentShares$: Observable<ArticlePagination>;

    constructor(
        private articlesService: ArticlesService
    ) { }

    ngOnInit() {
        this.getHotShares();
        this.getRecentShares();
    }

    getHotShares(page: number = 1) {
        this.hotShares$ = this.getShares({ hot: '1' }, page);
    }

    getRecentShares(page: number = 1) {
        this.recentShares$ = this.getShares({}, page);
    }

    getShares(data?: { [key: string]: string }, page: number = 1) {
        let param: any = {
            category_id: this.categoryId,
            recent: '1',
            page: page.toString()
        };

        for (let key in data) {
            param[key] = data[key];
        }

        return this.articlesService.getArticles(param, this.include);
    }

    onPageChange(event, type) {

        let page = event.page + 1;

        if (type === 1) {
            this.getRecentShares(page);
            return;
        }
        if (type == 2) {
            this.getHotShares(page);
            return;
        }
    }

    onTabChange(event) {

    }



}
