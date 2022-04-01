import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {

  constructor( 
    private dialogRef: MatDialogRef<ConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public heroe: Heroe 
  ) { }

  ngOnInit(): void {
    console.log(this.heroe);
  }

  borrar() {
    this.dialogRef.close(true);
  }

  cerrar() {
    this.dialogRef.close();
  }

}