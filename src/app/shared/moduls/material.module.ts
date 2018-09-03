import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorIntl,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
/*import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { MatPaginatorIntlHeb } from '../extensions/mat-paginator-intl-hebrew';
import { MatHebrewDateFormat } from '../extensions/mat-datepicker-hebrew';*/


@NgModule({
  imports: [
     MatButtonModule,
     MatCheckboxModule,
     MatTableModule,
     MatProgressSpinnerModule,
     MatListModule,
     MatSlideToggleModule,
     MatCardModule,
     MatInputModule,
     MatIconModule,
     MatTooltipModule,
     MatSelectModule,
     MatMenuModule,
     MatSnackBarModule,
     MatTabsModule,
     MatExpansionModule,
     MatDialogModule,
     MatSortModule,
     MatPaginatorModule,
     MatFormFieldModule,
     MatDatepickerModule,
     //MatMomentDateModule,
     MatAutocompleteModule,
     MatSidenavModule,
     MatToolbarModule,
     MatChipsModule,
     MatTreeModule,
     MatProgressBarModule
    ],
  exports: [
     MatButtonModule,
     MatCheckboxModule,
     MatTableModule,
     MatProgressSpinnerModule,
     MatListModule,
     MatSlideToggleModule,
     MatCardModule,
     MatInputModule,
     MatIconModule,
     MatTooltipModule,
     MatSelectModule,
     MatMenuModule,
     MatSnackBarModule,
     MatTabsModule,
     MatExpansionModule,
     MatDialogModule,
     MatSortModule,
     MatPaginatorModule,
     MatDatepickerModule,
     //MatMomentDateModule,
     MatAutocompleteModule,
     MatSidenavModule,
     MatToolbarModule,
     MatChipsModule,
     MatTreeModule,
     MatProgressBarModule
    ],
     providers: [
       //{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlHeb},
       { provide: MAT_DATE_LOCALE, useValue: 'he'}//,
    //   { provide: MAT_DATE_FORMATS, useValue: MatHebrewDateFormat}
      ]
})
export class CustomMaterialModule { }

