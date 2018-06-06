import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      console.log("[QuestionComponent Init]")
  }

}
