import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

//import { AuthenticationService } from '@/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        //private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //const currentUser = this.authenticationService.currentUserValue;
        console.log('localStorage.getItem currentUser->', localStorage.getItem('currentUser'));
        // if (currentUser) {
        //   console.log('exec', currentUser);
        //     // authorised so return true
        //     return true;
        // }

        if (localStorage.getItem('currentUser') == "1"){
          return true;
        }else {
          localStorage.clear();
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}