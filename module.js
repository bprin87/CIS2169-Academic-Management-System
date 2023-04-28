fetch('database.json')
    .then(response => response.json())
    .then(database => {

      const moduleTableBody = document.querySelector('#module-table-body');

      // Loop through each module and create a new row for each one
      for (let i = 0; i < database.module.length; i++) {
        const module = database.module[i];
        const tableRow = document.createElement('tr');

        // Populate the new row with the module data
        const titleCell = document.createElement('td');
        titleCell.textContent = module.module_title;
        const idCell = document.createElement('td');
        idCell.textContent = module.id;
        const hoursCell = document.createElement('td');
        hoursCell.textContent = module.hours;
        const creditsCell = document.createElement('td');
        creditsCell.textContent = module.credits;
        const outcomeCell = document.createElement('td');
        outcomeCell.textContent = module.learning_outcome;

        tableRow.appendChild(titleCell);
        tableRow.appendChild(idCell);
        tableRow.appendChild(hoursCell);
        tableRow.appendChild(creditsCell);
        tableRow.appendChild(outcomeCell);

        moduleTableBody.appendChild(tableRow);

      }

    })
    .catch(error => console.error(error));

// Create module information, save in local storage, and display in the table

// Get the table body element
const tableBody = document.getElementById('module-table-body');

// Retrieve the modules from local storage if any have been created or retrieve nothing and continue
let modules = JSON.parse(localStorage.getItem('modules')) || [];

// Function generates a table row for a module
function createTableRow(module) {
  const row = document.createElement('tr');

  const titleCell = document.createElement('td');
  titleCell.textContent = module.title;
  row.appendChild(titleCell);

  const idCell = document.createElement('td');
  idCell.textContent = module.id;
  row.appendChild(idCell);

  const hoursCell = document.createElement('td');
  hoursCell.textContent = module.hours;
  row.appendChild(hoursCell);

  const creditsCell = document.createElement('td');
  creditsCell.textContent = module.credits;
  row.appendChild(creditsCell);

  const outcomeCell = document.createElement('td');
  outcomeCell.textContent = module.outcome;
  row.appendChild(outcomeCell);

  return row;
}


// Populate the table with the modules from local storage using a for loop
modules.forEach((module) => {
  const row = createTableRow(module);
  tableBody.appendChild(row);
});

// Add event listener to the save module button
const saveModuleBtn = document.getElementById('save-module-btn');
saveModuleBtn.addEventListener('click', (event) => {
  event.preventDefault();

  // Get the form values
  const title = document.getElementById('create-module-title').value;
  const id = document.getElementById('create-module-id').value;
  const hours = document.getElementById('create-module-hours').value;
  const credits = document.getElementById('create-module-credits').value;
  const outcome = document.getElementById('create-module-outcome').value;

  // Only save the module if all fields are filled out
  if (title && id && hours && credits && outcome) {
    // Create a new module object
    const module = {
      title,
      id,
      hours,
      credits,
      outcome,
    };

    // Save the module information in local storage
    modules.push(module);
    localStorage.setItem('modules', JSON.stringify(modules));

    // Add the module to the table
    const row = createTableRow(module);
    tableBody.appendChild(row);

    // Clear the form fields for next module to be created
    document.getElementById('create-module-title').value = '';
    document.getElementById('create-module-id').value = '';
    document.getElementById('create-module-hours').value = '';
    document.getElementById('create-module-credits').value = '';
    document.getElementById('create-module-outcome').value = '';
  }
});

// Display time slot information from timeslot.html page
const newTableBody = document.getElementById('timeslot-table-body');

let timeslots = JSON.parse(localStorage.getItem('timeslots')) || [];

function createTableRow(timeslot) {
  const newRow = document.createElement('tr');

  const idCell = document.createElement('td');
  idCell.textContent = timeslot.id;
  newRow.appendChild(idCell);

  const roomCell = document.createElement('td');
  roomCell.textContent = timeslot.room;
  newRow.appendChild(roomCell);

  const dayCell = document.createElement('td');
  dayCell.textContent = timeslot.day;
  newRow.appendChild(dayCell);

  const startTimeCell = document.createElement('td');
  startTimeCell.textContent = timeslot.startTime;
  newRow.appendChild(startTimeCell);

  const endTimeCell = document.createElement('td');
  endTimeCell.textContent = timeslot.endTime;
  newRow.appendChild(endTimeCell);

  return newRow ;
}

timeslots.forEach((timeslot) => {
  const newRow = createTableRow(timeslot);
  newTableBody.appendChild(newRow);
});