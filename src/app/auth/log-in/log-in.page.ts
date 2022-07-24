/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  isLoading = false;

  constructor(private authService: AuthService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  onLogin(logInForm: NgForm) {
    this.isLoading = true;

    if(logInForm.valid) {
      this.authService.login(logInForm.value).subscribe(resData => {
        console.log('Prijava uspesna');
        console.log(resData);
        this.isLoading = false;
        this.router.navigateByUrl('/movie-offer/tabs/movie-explore');
      },
        errRes => {
          console.log(errRes);
          this.isLoading = false;
          let message = 'Incorrect email or password';

          const code = errRes.error.error.message;
          if(code === 'EMAIL_NOT_FOUND') {
            message = 'Email address could not be found';
          }else if(code === 'INVALID_PASSWORD') {
            message = 'Password is not correct';
          }

          this.alertCtrl.create({
            header: 'Authetification failed',
            message,
            buttons: ['Ok']
          }).then((alert)=> {
            alert.present();
          });

          logInForm.reset();
        }
        );
    }
  }

}
