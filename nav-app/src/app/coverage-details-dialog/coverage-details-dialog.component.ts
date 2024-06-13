import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-coverage-details-dialog',
  template: `
    <h1 mat-dialog-title>Dekking Details</h1>
    <div mat-dialog-content>
      <p>{{ data.subcategory }} kan worden aangevuld door de volgende technologieën:</p>
      <!-- Voeg dynamische content toe zoals benodigd -->
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="close()">Sluiten</button>
    </div>
  `,
})
export class CoverageDetailsDialogComponent {
    constructor(
    public dialogRef: MatDialogRef<CoverageDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}



  close() {
    this.dialogRef.close();
  }
}
