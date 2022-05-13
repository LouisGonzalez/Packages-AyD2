import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService){}

  canActivate(){
    let identity = this.loginService.getIdentity();
    if(identity){
      return true;
    } else {
      this.router.navigate(['/views/auth/login']);
      return false;
    }
  }

}
