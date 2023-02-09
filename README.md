# Ticket Booking

Booking Algorithm -

- There are 80 seats in a coach of a train with only 7 seats in a row and last row of only 3 seats. For
  simplicity, there is only one coach in this train.
- One person can reserve up to 7 seats at a time.
- If person is reserving seats, the priority will be to book them in one row
- If seats are not available in one row then the booking should be done in such a way that the nearby
  seats are booked.
- User can book as many tickets as s/he wants until the coach is full. 6. You don’t have to create login
  functionality for this application.

## Assumptions

- Booking are done row-wise from left to right always.
- Nearby seats are those that are adjacent to a row where some of the user tickets have been booked. Seat position doesn't matter. Meaning, lets say to book 4 seats, available seats are A5,A6,A7,B6,B7. According to the assumptions, B6 and B7 are of same distance(adjacent to row A). So booking is done like this A5,A6,A7,B6.
- If there are no adjacent seats available, booking is done by finding the rows with minimal distance between each other, and allocating the seats.

## Database schema

In NoSQL database, the [dbSchema.json](https://github.com/Poujhit/ticket-booking/blob/main/src/app/db/dbSchema.json) file can be used. To add further rows in a coach, just add an object like this
`{
      "id": 13,
      "name": "M",
      "totalSeats": 7,
      "emptySeats": 7
    },
`

for SQL database, one user can have multiple seats but one seat can have only one user assigned to it (one-to-many relationship).

We can have a table for User, containing user_id(primary key), name and tickets.
Each ticket will have a rowname, coach number, train number and seat number.
Each coach will have number of seats and number of row per seats, and number of rows (assuming all rows have same number of seats), coach_id
Each train can be identified my it's train_id, all the coach_id's in it.
