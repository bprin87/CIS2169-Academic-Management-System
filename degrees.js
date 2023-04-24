
// <--- Display information from the json file in the table --->
fetch('database.json')
    .then(response => response.json())
    .then(database => {

      // Target the table body so that rows are added inside
      const degreeTableBody = document.querySelector('#degree-table-body');

      // Loop through each degree program and create a new row for each one
      for (let i = 0; i < database.degree_programme.length; i++) {
        const degree = database.degree_programme[i];
        const degreeModule = database.module[i];
        const tableRow = document.createElement('tr');

        // Populate the new row with the degree program data
        const titleCell = document.createElement('td');
        titleCell.textContent = degree.degree_title;
        const idCell = document.createElement('td');
        idCell.textContent = degree.id;
        const typeCell = document.createElement('td');
        typeCell.textContent = degree.degree_type;
        const modulesCell = document.createElement('td');
        modulesCell.textContent = degreeModule.module_title || 'N/A';
        const outcomeCell = document.createElement('td');
        outcomeCell.textContent = degree.learning_outcome;

        tableRow.appendChild(titleCell);
        tableRow.appendChild(idCell);
        tableRow.appendChild(typeCell);
        tableRow.appendChild(modulesCell);
        tableRow.appendChild(outcomeCell);

        degreeTableBody.appendChild(tableRow);

      }

    })
    .catch(error => console.error(error));

// <--- Create degree programme information, save in local storage, and display in the table --->

// Get the table body element
const tableBody = document.getElementById('degree-table-body');

// Retrieve the degrees from local storage if any have been created
let degrees = JSON.parse(localStorage.getItem('degrees'));

// Function to generate a table row for a degree
function createTableRow(degree) {
  const row = document.createElement('tr');

  const titleCell = document.createElement('td');
  titleCell.textContent = degree.title;
  row.appendChild(titleCell);

  const idCell = document.createElement('td');
  idCell.textContent = degree.id;
  row.appendChild(idCell);

  const typeCell = document.createElement('td');
  typeCell.textContent = degree.type;
  row.appendChild(typeCell);

  const modulesCell = document.createElement('td');
  modulesCell.textContent = degree.modules;
  row.appendChild(modulesCell);

  const outcomeCell = document.createElement('td');
  outcomeCell.textContent = degree.outcome;
  row.appendChild(outcomeCell);

  return row;
}

// Populate the table with the degrees from local storage using a for loop
degrees.forEach((degree) => {
  const row = createTableRow(degree);
  tableBody.appendChild(row);
});

// Add event listener to the save degree button
const saveDegreeBtn = document.getElementById('save-degree-btn');
saveDegreeBtn.addEventListener('click', (event) => {
  event.preventDefault();

  // Get the form values
  const title = document.getElementById('create-degree-title').value;
  const id = document.getElementById('create-degree-id').value;
  const type = document.getElementById('select-degree-type').value;
  const modules = document.getElementById('select-degree-module').value;
  const outcome = document.getElementById('create-degree-outcome').value;

  // Only save the degree if all fields are filled out
  if (title && id && type && modules && outcome) {
    // Create a new degree object
    const degree = {
      title,
      id,
      type,
      modules,
      outcome,
    };

    // Save the degree information in local storage
    degrees.push(degree);
    localStorage.setItem('degrees', JSON.stringify(degrees));

    // Add the degree to the table
    const row = createTableRow(degree);
    tableBody.appendChild(row);

    // Clear the form fields for next degree to be created
    document.getElementById('create-degree-title').value = '';
    document.getElementById('create-degree-id').value = '';
    document.getElementById('select-degree-type').value = 'Select degree type';
    document.getElementById('select-degree-module').value = 'Select Module';
    document.getElementById('create-degree-outcome').value = '';
  }
});



