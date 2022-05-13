import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService){}

  canActivate(){
    let identity = this.loginService.getIdentity();
    if(identity){
      if(identity.type == 1){
        return true;
      } else if(identity.type == 2){
        this.router.navigate(['/views/users/operator'])
        return false;
      } else if(identity.type == 3){
        this.router.navigate(['/views/users/recep']);
        return false;
      }
    } else {
      this.router.navigate(['/views/auth/login']);
      return false;
    }
  }


}
