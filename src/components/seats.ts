import { Seat } from "../interface/Interface";

const rows = ["B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N"];
const seats: Seat[] = [];
let count = 0;
const firstRow: Seat[] = [];
const insideRows: Seat[][] = [];
const lastRow: Seat[] = [];
for (let i = 1; i < 17; i++) {
  const seat: Seat = {
    status: 0,
    type: "Single",
    code: "A" + i,
    price: 50000,
    id: count++,
  };
  seats.push(seat);
  firstRow.push(seat);
}

rows.forEach((row) => {
  let insideRow: Seat[] = [];
  for (let i = 1; i < 19; i++) {
    const seat: Seat = {
      status: 0,
      type: "Single",
      code: row + i,
      price: 80000,
      id: count++,
    };
    seats.push(seat);
    insideRow.push(seat);
  }

  insideRows.push(insideRow);
});
for (let i = 1; i < 9; i++) {
  const seat: Seat = {
    status: 0,
    type: "Couple",
    code: "S" + i,
    price: 150000,
    id: count++,
  };
  seats.push(seat);
  lastRow.push(seat);
}

export const seatMap = {
  firstRow: firstRow,
  insideRows: insideRows,
  lastRow: lastRow,
};
export { seats };
