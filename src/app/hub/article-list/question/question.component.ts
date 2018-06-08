import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../apis/articles.service';
import { Observable } from 'rxjs';
import { ArticlePagination } from '../../../apis/models/responses/article-pagination';

@Component({
    selector: 'app-list-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

    categoryId: string = '2';

    waittingResolveQuestion$: Observable<ArticlePagination>;

    resolvedQuestion$: Observable<ArticlePagination>;

    noReplayQuestion$: Observable<ArticlePagination>;

    include: string[] = ['user.avatar', 'tags'];


    constructor(
        private articlesService: ArticlesService
    ) { }

    ngOnInit() {
        this.getWaittingResolevQuestion();
        this.getResolvedQuestion();
        this.getNoReplayQuestion();
    }

    getWaittingResolevQuestion(page: number = 1) {

        this.waittingResolveQuestion$ = this.getQuestions({ waitting_resolve: "1" }, page);
    }

    getResolvedQuestion(page: number = 1) {

        this.resolvedQuestion$ = this.getQuestions({ resolved: '1' }, page);
    }

    getNoReplayQuestion(page: number = 1) {
        this.noReplayQuestion$ = this.getQuestions({ no_replay: '1' }, page);
    }

    getQuestions(data: { [key: string]: string }, page: number = 1) {

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

    onTabChange(event) {

    }

    onPageChange(event, type) {

        let page = event.page + 1;

        if (type === 1) {
            this.getWaittingResolevQuestion(page);
            return;
        }
        if (type == 2) {
            this.getResolvedQuestion(page);
            return;
        }
        if (type === 3) {
            this.getNoReplayQuestion(page);
            return;
        }
    }

}
