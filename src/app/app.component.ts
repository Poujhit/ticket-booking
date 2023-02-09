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

  bookedTickets: string[] = [];
  error: string[] = [];

  constructor() {
    this.coach = structuredClone(dbSchema);
  }

  onSubmit = () => {
    console.log(this.coach);
    console.log(this.input);

    let inputTickets = parseInt(this.input);
    // if (inputTickets > 7) {
    //   this.error = ['You can booking 7 tickets at a time.'];
    //   return;
    // }
    // if (this.availableEmptySeats() < inputTickets) {
    //   this.error = ['Seats are not available.'];
    //   return;
    // }

    // finding whether booking can be done in a row and booking the seats.
    for (const row of this.coach.rows) {
      if (row.emptySeats >= inputTickets) {
        this.bookedTickets = Array(inputTickets)
          .fill(0)
          .map(
            (_, index) =>
              `${row.name}${row.totalSeats - inputTickets + index + 1}`
          );
        console.log(this.bookedTickets);
        row.emptySeats -= inputTickets;
        return;
      }
    }

    // booking can't be done in a row, so nearby seats should be booked, seaths which are in adjacent row with distance between them is 1
    let nearby = false;

    for (const row of this.coach.rows) {
      if (row.emptySeats > 0) {
        if (!nearby) {
          this.bookedTickets = Array(row.emptySeats)
            .fill(0)
            .map(
              (_, index) =>
                `${row.name}${row.totalSeats - row.emptySeats + index + 1}`
            );
        } else {
          // just for generating the ticket array
          if (row.emptySeats < inputTickets)
            this.bookedTickets.push(
              ...Array(row.emptySeats)
                .fill(0)
                .map(
                  (_, index) =>
                    `${row.name}${row.totalSeats - row.emptySeats + index + 1}`
                )
            );
          else
            this.bookedTickets.push(
              ...Array(inputTickets)
                .fill(0)
                .map(
                  (_, index) =>
                    `${row.name}${row.totalSeats - row.emptySeats + index + 1}`
                )
            );
        }
        nearby = true;
        if (row.emptySeats < inputTickets) {
          inputTickets -= row.emptySeats;
        } else {
          inputTickets = 0;
        }
        if (inputTickets === 0) {
          // console.log(this.bookedTickets);
          // update the empty seats and then return out of the function
          this.bookedTickets.forEach((eachTicket) => {
            let index = this.coach.rows.findIndex(
              (row: any) => row.name === eachTicket[0]
            );
            this.coach.rows[index].emptySeats--;
          });
          return;
        }
      } else {
        // nearby row not found
        nearby = false;
        this.bookedTickets = [];
        inputTickets = parseInt(this.input);
      }
    }

    // no nearby adjacent seats are found, so finding the rows with minimal distance between each other
    let copyCoach = structuredClone(this.coach);
    copyCoach.rows = copyCoach.rows
      .sort((a: any, b: any) => {
        if (a.emptySeats > b.emptySeats) return -1;
        else if (a.emptySeats < b.emptySeats) return 1;
        return a.id - b.id;
      })
      .filter((item: any) => item.emptySeats != 0);

    console.log(copyCoach);
    for (const row of copyCoach.rows) {
      if (row.emptySeats < inputTickets)
        this.bookedTickets.push(
          ...Array(row.emptySeats)
            .fill(0)
            .map(
              (_, index) =>
                `${row.name}${row.totalSeats - row.emptySeats + index + 1}`
            )
        );
      else
        this.bookedTickets.push(
          ...Array(inputTickets)
            .fill(0)
            .map(
              (_, index) =>
                `${row.name}${row.totalSeats - row.emptySeats + index + 1}`
            )
        );
      if (row.emptySeats < inputTickets) {
        inputTickets -= row.emptySeats;
      } else {
        inputTickets = 0;
      }
      if (inputTickets === 0) {
        // console.log(this.bookedTickets);
        // update the empty seats and then return out of the function
        this.bookedTickets.forEach((eachTicket) => {
          let index = this.coach.rows.findIndex(
            (row: any) => row.name === eachTicket[0]
          );
          this.coach.rows[index].emptySeats--;
        });
        return;
      }
    }
  };

  resetApp() {
    window.location.reload();
  }

  availableEmptySeats() {
    return this.coach.rows.reduce(
      (accumulator: number, ele: Record<string, any>) =>
        accumulator + ele['emptySeats'],
      0
    );
  }

  // To generate an array to create the seats for each row. ngFor requires an array to iterate
  getArray(len: number) {
    return Array(len)
      .fill(0)
      .map((_, i) => ++i);
  }

  openAssumptions() {
    window.open('https://www.google.com');
  }
}
