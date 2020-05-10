import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

import './_content/app.less';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    //currentUser: User;

    menuOption:any = {};
    menuexist:boolean=true;

    constructor(
        private router: Router,
        //private authenticationService: AuthenticationService
    ) {
        //this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        
        
    }
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      // this.menuOption = JSON.parse(localStorage.getItem('menu'));
      //   console.log('this.menuOption', this.menuOption);
      //   if (typeof(this.menuOption) !== null){
      //     console.log('holi null->', this.menuOption);
      //     this.menuexist = false;
      //   }
    }
    logout() {
        localStorage.clear();
        this.router.navigate(['/login']);
    }
}