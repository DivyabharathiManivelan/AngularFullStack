
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { DataService } from './data.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public dataService: DataService, public router: Router) { }

  canActivate(): boolean {
    // return true if authenticated else redirect to login page
let subject=false;
this.dataService.getAuthStatus().subscribe(res=>subject=res,error=>this.router.navigate(['login']));
if(subject==false)
  this.router.navigate(['login']);
    return subject;
  }

}

