import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AboutService } from '../../shared/api/about.service';
import { SecurityService } from '../service/security.service';
import { take } from 'rxjs/operators';

@Injectable()
export class SecurityGuard implements CanActivate {

  constructor(
    private router: Router,
    private securityService: SecurityService,
    private aboutService: AboutService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }
}
