import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-heroes-modal',
  templateUrl: './heroes-modal.component.html',
  styleUrls: ['./heroes-modal.component.scss']
})
export class HeroesModalComponent {
  @Output() onSaveEvent: EventEmitter<void>;

  constructor(public dialogRef: MatDialogRef<HeroesModalComponent>) {
    this.onSaveEvent = new EventEmitter();
  }

  public onSave(): void {
    this.onSaveEvent.emit();
    this.dialogRef.close();
  }

}
