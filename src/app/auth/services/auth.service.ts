import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, of, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! }; 
    //Nota: los 3 puntos son para no pasar la referencia al objeto, sino un duplicado
  }

  constructor( private http: HttpClient ) { }

  verificarAutenticacion(): Observable<boolean> {

    if ( !localStorage.getItem('token') ) {
      console.log("Sin sesión iniciada.");
      return of(false); // Crea un observable con el valor que le pases como parametro
    }

    console.log("Ya existe una sesión activa");
    // return of(true);
    return this.login()
    .pipe(
      map( auth => {
        console.log('map', auth);
        this._auth = auth;
        return true;
      })
    );

  }

  login() {
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
    .pipe(
      tap( resp => this._auth = resp ),
      tap( auth => localStorage.setItem('token', auth.id) )
    );
  }

  logout() {
    this._auth = undefined;
  }

}
