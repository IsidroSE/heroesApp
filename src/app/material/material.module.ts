import { NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatListModule } from '@angular/material/list'; 
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 


@NgModule({
  exports: [
    MatAutocompleteModule, 
    MatButtonModule,
    MatCardModule, 
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
