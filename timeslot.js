
// Create time slot information, save in local storage, and display in the table

// Get the table body element
const tableBody = document.getElementById('timeslot-table-body');

// Retrieve the time slots from local storage if any have been created or retrieve nothing and continue
let timeslots = JSON.parse(localStorage.getItem('timeslots')) || [];

// Function generates a table row for a time slot
function createTableRow(timeslot) {
  const row = document.createElement('tr');

  const idCell = document.createElement('td');
  idCell.textContent = timeslot.id;
  row.appendChild(idCell);4

  const roomCell = document.createElement('td');
  roomCell.textContent = timeslot.room;
  row.appendChild(roomCell);

  const dayCell = document.createElement('td');
  dayCell.textContent = timeslot.day;
  row.appendChild(dayCell);

  const startTimeCell = document.createElement('td');
  startTimeCell.textContent = timeslot.startTime;
  row.appendChild(startTimeCell);

  const endTimeCell = document.createElement('td');
  endTimeCell.textContent = timeslot.endTime;
  row.appendChild(endTimeCell);

  return row;
}

// Populate the table with the time slots from local storage using a for loop
timeslots.forEach((timeslot) => {
  const row = createTableRow(timeslot);
  tableBody.appendChild(row);
});

// Add event listener to the save time slot button
const saveTimeBtn = document.getElementById('save-time-btn');
saveTimeBtn.addEventListener('click', (event) => {
  event.preventDefault();

  // Get the form values
  const id = document.getElementById('create-module-id').value;
  const room = document.getElementById('select-room').value;
  const day = document.getElementById('select-day').value;
  const startTime = document.getElementById('select-start').value;
  const endTime = document.getElementById('select-end').value;

  // Only save the time slot if all fields are filled out
  if (id && room && day && startTime && endTime) {
    // Create a new time slot object
    const timeslot = {
      id,
      room,
      day,
      startTime,
      endTime,
    };

    // Save the time slot information in local storage
    timeslots.push(timeslot);
    localStorage.setItem('timeslots', JSON.stringify(timeslots));

    // Add the time slot to the table
    const row = createTableRow(timeslot);
    tableBody.appendChild(row);

    // Clear the form fields for next time slot to be created
    document.getElementById('create-module-id').value = '';
    document.getElementById('select-room').value = '';
    document.getElementById('select-day').value = '';
    document.getElementById('select-start').value = '';
    document.getElementById('select-end').value = '';
  }
});

