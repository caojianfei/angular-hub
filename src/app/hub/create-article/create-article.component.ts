import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-create-article',
    templateUrl: './create-article.component.html',
    styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {

        this.route.params.subscribe(
            res => console.log(res.type)
        );
    }

}
