import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare let Simditor;

@Component({
    selector: 'app-create-article',
    templateUrl: './create-article.component.html',
    styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

    simditor: any;


    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
    
        this.route.params.subscribe(
            res => console.log(res.type)
        );

        this.createSimditor();
    }

    createSimditor() {
        this.simditor = new Simditor({
            textarea: $('#textarea')
        });
    }

    getvalue() {
        console.log(this.simditor.getValue());
    }

}
