import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BASE_URL } from '../../apis/apis.module';
import { AuthService } from '../../auth/auth.service';
import { TagsService } from '../../apis/tags.service';
import { Tag } from '../../apis/models/responses/tag';
import { GrowlMessageService } from '../../growl-message.service';

declare let Simditor;

@Component({
    selector: 'app-create-article',
    templateUrl: './create-article.component.html',
    styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

    simditor: any;

    type: string;

    tags: Tag[];

    filteredTags: any[];

    selectedTags: any[];

    constructor(
        @Inject(BASE_URL) private apiUrl: string,
        private route: ActivatedRoute,
        private authService: AuthService,
        private tagsService: TagsService,
        private message: GrowlMessageService
    ) { }

    ngOnInit() {

        this.tagsService.getTags().subscribe(
            res => {
                this.tags = res.data;
                // this.tags.forEach((tag) => {
                //     this.selectedTags.push(tag);
                // });
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
            cleanPaste: true
        });
    }

    defineType(type: string) {
        if (type === "article") {
            this.type = '写文章';
        } else if (type === "question") {
            this.type = "提问题";
        } else {
            this.type = "分享";
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

    getvalue() {
        console.log(this.simditor.getValue());
    }

}
