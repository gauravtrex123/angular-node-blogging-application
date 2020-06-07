import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthService }      from '../services/auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

    redirectUrl;

    constructor(
        private authService:AuthService,
        private router: Router
    ){}
  canActivate(
    router: ActivatedRouteSnapshot,
    state:  RouterStateSnapshot
  ) {
    if(!this.authService.loggedIn()){
        this.router.navigate(['/'])
        return false;
  }else{
      return true;
  }
}
}