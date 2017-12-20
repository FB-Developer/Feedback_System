import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot, RouterStateSnapshot,CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../login/auth.service';
import swal from 'sweetalert'

@Injectable()
export class AuthGuard implements CanActivate,CanDeactivate<any> {
  constructor(private authservice:AuthService, private route:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.authservice.setRedirectUrl(state.url);
      if(this.authservice.isLoggedIn()){
        return true;
      }
      this.route.navigate(['login']);
    return false;
  }
  canDeactivate(target:any) {
        swal("Completed!", "Your Feedback has been successfully submitted!", "success");
        return true;
  }
}



