import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
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
      private router: Router,
      private _snackBar: MatSnackBar,
      public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if ( !this.router.url.includes('editar') ) {
      return;
    }

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
        this.mostrarSnakbar('Registro actualizado');
        console.log('Respuesta', resp)
      });
    }
    else {
      // Crear
      this.heroesService.guardarHeroe( this.heroe )
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar/', heroe.id]);
        this.mostrarSnakbar('Registro actualizado');
      });
    }

  }

  borrarHeroe() {

    const dialog = this.dialog.open(
      ConfirmarComponent,
      {
        width: "400px",
        data: this.heroe
      }
    );

    dialog.afterClosed().subscribe( (result) => {
      if ( result ) {

        this.heroesService.borrarHeroe( this.heroe.id! )
        .subscribe( resp => {
          this.router.navigate(['/heroes']);
        });

      }
    });

  }

  mostrarSnakbar( mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 2500
    });
  }

}
