import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';
import { GrowlMessageService } from '../../growl-message.service';
import { AuthService } from '../../auth/auth.service';
import { ArticlesService } from '../../apis/articles.service';
import { Observable } from 'rxjs';
import { ArticlePagination } from '../../apis/models/responses/article-pagination';


@Component({
    selector: 'app-hub-home',
    templateUrl: './hub-home.component.html',
    styleUrls: ['./hub-home.component.scss']
})
export class HubHomeComponent implements OnInit {

    articles$: Observable<ArticlePagination>;

    constructor(
        private message: GrowlMessageService,
        private authService: AuthService,
        private articlesService: ArticlesService
    ) { }

    ngOnInit() {

        this.getArticles();
    }


    getArticles(page: number = 1) {
        this.articles$ = this.articlesService.getArticles(
            { recent: '1', hot: '1', page: page.toString(), per_page: '40' },
            ['user.avatar', 'tags', 'category']);
    }

    onPageChange(event) {
        let page = event.page + 1;
        this.getArticles(page);
    }


}
