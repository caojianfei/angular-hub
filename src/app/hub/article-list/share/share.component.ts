import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      console.log("[ShareComponent Init]")
  }

}
