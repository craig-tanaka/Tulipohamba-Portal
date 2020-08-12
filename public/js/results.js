// ____________Constants________________
const tableBody = document.querySelector('.results-table tbody');
const tableSubmitBtn = document.querySelector('.results-table-submit');
const loader = document.querySelector('.loader-container');


// ____________Variables________________
let lastNameInput = document.querySelector('.results-table .last-name-input');


// ____________Event_Listeners________________
lastNameInput.addEventListener('input', addNewRow);
tableSubmitBtn.addEventListener('click', submitResults)


// ____________Functions________________
function addNewRow(e) {
    const newRow = document.createElement('tr');
    newRow.innerHTML =
        `<td>
            <input type="text" placeholder="Student Number" class="student-number-input">
        </td>
        <td>
            <input type="text" placeholder="Student Name" class="last-name-input">
        </td>
        <td>
            <input type="text" placeholder="Student Mark" class="mark-input">
        </td>`;
    tableBody.appendChild(newRow);
    lastNameInput.classList.remove('last-name-input');
    lastNameInput.removeEventListener('input', addNewRow);
    lastNameInput = document.querySelector('.results-table .last-name-input');
    lastNameInput.addEventListener('input', addNewRow);
}
function submitResults() {

    showLoader();
    let numberOfStudents = 0;
    let studentRows = document.querySelectorAll('.results-table tbody tr');

    let __results = [];

    studentRows.forEach(element => {
        let number = element.children[0].children[0].value;
        let name = element.children[1].children[0].value;
        let mark = element.children[2].children[0].value;

        if ((number !== '') && (name !== '') && (mark !== '')) {
            let student = {
                studentNumber: number,
                studentName: name,
                studentMark: mark
            }
            __results.push(student);
        }
    });


    db.collection('AcademicRecords2020').doc('BasicLifeServices').set({
        results: __results
    }).then(docRef => {
        alert("Results Updated")
        hideLoader();
    }).catch(error => {
        alert('Could not send results to server, try again.', error)
    })
}
function showLoader() {
    // Hide Submit Button and show loader
    tableSubmitBtn.style.display = 'none';
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
    tableSubmitBtn.style.display = 'block';
}

function loaderLog(msg) {
    document.querySelector('.loader-log').innerHTML = msg;
}
