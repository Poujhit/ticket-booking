import { Component } from '@angular/core';

import dbSchema from './db/dbSchema.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ticket-booking';
  input = '';
  coach;

  constructor() {
    this.coach = structuredClone(dbSchema);
  }

  onSubmit = () => {
    console.log(this.coach);
    console.log(this.input);
  };

  resetApp() {
    window.location.reload();
  }

  // To generate an array to create the seats for each row. ngFor requires an array to iterate
  getArray(len: number) {
    return Array(len)
      .fill(0)
      .map((_, i) => ++i);
  }
}
