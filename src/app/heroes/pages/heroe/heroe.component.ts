import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor( 
    private activateRoute: ActivatedRoute, 
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {

    this.activateRoute.params
    .pipe(
      switchMap( ({ id }) => this.heroesService.getHeroeById(id) )
    )
    .subscribe( heroe => this.heroe = heroe );

  }

}
