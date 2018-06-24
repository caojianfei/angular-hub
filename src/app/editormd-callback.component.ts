import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'editormd-callback',
    template: '',
    styles: []
})
export class EditormdCallback implements OnInit {
    
    ngOnInit() {
        var query = {};
        var urlParams: any = window.location.search.split('?')[1];
        urlParams = urlParams.split("&");

        //console.log(urlParams);

        for (var i = 0; i< urlParams.length; i++) 
        {
            var param       = urlParams[i].split("="); 
            query[param[0]] = param[1]; 
        }

        console.log(query);

        var imageDialog = window.parent.document.getElementById(query['dialog_id']);

        if (parseInt(query['success']) === 1)
        {
            (imageDialog.querySelector("[data-url]") as any).value = decodeURIComponent(query['url']);
        }
        else
        {
            alert(query['message']);
        }

        location.href = "about:blank";
    }

}
