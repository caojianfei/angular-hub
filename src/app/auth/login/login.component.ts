import { Component, OnInit } from '@angular/core';
import { CaptchasService } from '../../apis/captchas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  //providers: [CaptchasService]
})
export class LoginComponent implements OnInit {

  constructor(private captchasService: CaptchasService) { }

  ngOnInit() {
      this.captchasService.getCaptchas().subscribe(
          (res) => {
            console.log(res);
          },
          (error) =>{
              console.log(error)
          }
      );
  }

}
