import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( 
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      // if (this.authService.auth && this.authService.auth.id) {
      //   return true;
      // }
  
      // console.log("Bloqueado por el AuthGuard canActivate");
      // return false;

      return this.authService.verificarAutenticacion()
      .pipe(
          tap( estaAutenticado => {
            if ( !estaAutenticado ) {
              console.log("canActivate: No está autenticado, redirigiendo al login...");
              this.router.navigate(['./auth/login'])
            }
            else {
              console.log("canActivate: Está autenticado, te dejaré pasar...");
            }
          })
      );

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verificarAutenticacion()
      .pipe(
          tap( estaAutenticado => {
            if ( !estaAutenticado ) {
              console.log("canLoad: No está autenticado, redirigiendo al login...");
              this.router.navigate(['./auth/login'])
            }
            else {
              console.log("canLoad: Está autenticado, te dejaré pasar...");
            }
          })
      );

      // if (this.authService.auth && this.authService.auth.id) {
      //   return true;
      // }

      // console.log("Bloqueado por el AuthGuard canLoad");
      // return false;
  }
}
