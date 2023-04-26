fetch('database.json')
    .then(response => response.json())
    .then(database => {

        const assessmentTableBody = document.querySelector('#assessment-table-body');
        // Loop through each assessment and create a new row for each one
        for (let i = 0; i < database.assessments.length; i++) {
            const assessment = database.assessments[i];
            const tableRow = document.createElement('tr');

            // Populate the new row with the assessment data
            const titleCell = document.createElement('td');
            titleCell.textContent = assessment.assessment_title;
            const idCell = document.createElement('td');
            idCell.textContent = assessment.id;
            const weightCell = document.createElement('td');
            weightCell.textContent = assessment.weighting;
            const volumeCell = document.createElement('td');
            volumeCell.textContent = assessment.volume;
            const dateCell = document.createElement('td');
            dateCell.textContent = assessment.submission_date;
            const outcomeCell = document.createElement('td');
            outcomeCell.textContent = assessment.learning_outcome;

            tableRow.appendChild(titleCell);
            tableRow.appendChild(idCell);
            tableRow.appendChild(weightCell);
            tableRow.appendChild(volumeCell);
            tableRow.appendChild(dateCell);
            tableRow.appendChild(outcomeCell);

            assessmentTableBody.appendChild(tableRow);
        }
})
 .catch(error => console.error(error));

//  Create assessment information, save in local storage, and display in table

// Get the table body element
const tableBody = document.getElementById('assessment-table-body');

// Retrieve the assessments from local storage if any have been created or retrieve nothing and continue
let assessments = JSON.parse(localStorage.getItem('assessments')) || [];

// Function generates a table row for an assessment
function createTableRow(assessment) {
  const row = document.createElement('tr');

  const titleCell = document.createElement('td');
  titleCell.textContent = assessment.title;
  row.appendChild(titleCell);

  const idCell = document.createElement('td');
  idCell.textContent = assessment.id;
  row.appendChild(idCell);

  const weightCell = document.createElement('td');
  weightCell.textContent = assessment.weight;
  row.appendChild(weightCell);

  const volumeCell = document.createElement('td');
  volumeCell.textContent = assessment.volume;
  row.appendChild(volumeCell);

  const dateCell = document.createElement('td');
  dateCell.textContent = assessment.date;
  row.appendChild(dateCell);

  const outcomeCell = document.createElement('td');
  outcomeCell.textContent = assessment.outcome;
  row.appendChild(outcomeCell);

  return row;
}

// Populate the table with the assessments from local storage using a for loop
assessments.forEach((assessment) => {
  const row = createTableRow(assessment);
  tableBody.appendChild(row);
});

// Add event listener to the save assessment button
const saveAssessmentBtn = document.getElementById('save-assessment-btn');
saveAssessmentBtn.addEventListener('click', (event) => {
  event.preventDefault();

  // Get the form values
  const title = document.getElementById('create-assessment-title').value;
  const id = document.getElementById('create-assessment-id').value;
  const weight = document.getElementById('create-assessment-weight').value;
  const volume = document.getElementById('create-assessment-volume').value;
  const date = document.getElementById('create-assessment-date').value;
  const outcome = document.getElementById('create-assessment-outcome').value;
  
  // Only save the assessment if all fields are filled out
  if (title && id && weight && volume && date && outcome) {
    // Create a new assessment object
    const assessment = {
      title,
      id,
      weight,
      volume,
      date,
      outcome,
    };

    // Save the assessment information in local storage
    assessments.push(assessment);
    localStorage.setItem('assessments', JSON.stringify(assessments));

    // Add the assessment to the table
    const row = createTableRow(assessment);
    tableBody.appendChild(row);

    // Clear the form fields for next assessment to be created
    document.getElementById('create-assessment-title').value = '';
    document.getElementById('create-assessment-id').value = '';
    document.getElementById('create-assessment-weight').value = '';
    document.getElementById('create-assessment-volume').value = '';
    document.getElementById('create-assessment-date').value = '';
    document.getElementById('create-assessment-outcome').value = '';
  }
});