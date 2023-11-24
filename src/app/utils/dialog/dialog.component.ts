import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchContainer } from 'src/app/model/search/SearchContainerModel';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  search!: SearchContainer

  constructor( @Inject(MAT_DIALOG_DATA) public data: SearchContainer ) {
    this.search = data
  }

  onClick(){

  }
}
