import { Component, OnInit } from '@angular/core';
import { CaptchasService } from '../../apis/captchas.service';
import { ErrorFormat } from '../../apis/models/error-format';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  //providers: [CaptchasService]
})
export class LoginComponent implements OnInit {

  constructor(private captchasService: CaptchasService) { }

  ngOnInit() {
      
  }

}
