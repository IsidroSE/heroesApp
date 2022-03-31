import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  };

  constructor( 
      private activateRoute: ActivatedRoute,
      private heroesService: HeroesService,
      private router: Router
  ) { }

  ngOnInit(): void {

    this.activateRoute.params
    .pipe(
      switchMap( ({id}) => this.heroesService.getHeroeById( id ) )
    )
    .subscribe( heroe => this.heroe = heroe );

  }

  guardar() {

    if ( this.heroe.superhero.trim().length === 0 ) {
      return;
    }

    if ( this.heroe.id ) {
      // Actualizar 
      this.heroesService.actualizarHeroe( this.heroe )
      .subscribe( resp => {
        console.log('Respuesta', resp)
      });
    }
    else {
      // Crear
      this.heroesService.guardarHeroe( this.heroe )
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar/', heroe.id]);
      });
    }

  }

}
