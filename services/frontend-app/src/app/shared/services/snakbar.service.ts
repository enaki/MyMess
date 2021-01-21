import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnakbarService {
  private snackBar: MatSnackBar;
  constructor() { }
  public setSnackBar(snackbar: MatSnackBar): void{
    this.snackBar = snackbar;
  }
  public openSnackBar(message: string, action: string): void{
    this.snackBar.open(message, action, {duration: 2000});
  }
}
