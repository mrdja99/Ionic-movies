import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit,OnDestroy{

  showTabs = false;
  previousAuthState = false;
  private authSub: Subscription;


  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit() {
    this.authSub = this.authService.isUserAutheticated.subscribe(isAutheticated => {
      if(!isAutheticated && this.previousAuthState !== isAutheticated) {
         window.location.href = '/log-in';
      }

      this.previousAuthState = isAutheticated;
      this.showTabs = isAutheticated;

    });
  }



  onLogOut() {
    this.authService.logout();
    this.router.navigateByUrl('/log-in');
  }

  ngOnDestroy() {
    if(this.authSub) {
      this.authSub.unsubscribe();
    }
  }


}
