// ____________Constants________________
const tableBody = document.querySelector('.results-table tbody');
const tableSubmitBtn = document.querySelector('.results-table-submit');
const loader = document.querySelector('.loader-container');

// ____________Variables________________
let lastNameInput = document.querySelector('.results-table .last-name-input');
let moduleID = '';


// ____________Event_Listeners________________
lastNameInput.addEventListener('input', addNewRow);
tableSubmitBtn.addEventListener('click', submitResults)
document.querySelectorAll('.results-choice').forEach(element => {
    element.addEventListener('click', event => {
        moduleID = event.target.parentElement.id;
        setModuleTitle(moduleID)
        getResults(moduleID);
        document.querySelector('.results-select').style.display = 'none';
        document.querySelector('.results-view').style.display = 'block';
    })
})


// ____________Functions________________
function addNewRow(e) {
    const newRow = document.createElement('tr');
    newRow.innerHTML =
        `<td>
            <input type="text" placeholder="Student Number" class="student-number-input">
        </td>
        <td>
            <input type="text" placeholder="Student Name" class="name-input last-name-input">
        </td>
        <td>
            <input type="text" placeholder="Student Mark" class="mark-input">
        </td>`;
    tableBody.appendChild(newRow);
    updateLastNameInput();
}
function updateLastNameInput() {
    lastNameInput.classList.remove('last-name-input');
    lastNameInput.removeEventListener('input', addNewRow);
    lastNameInput = document.querySelector('.results-table tbody tr:nth-last-of-type(1) .name-input');
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


    db.collection('AcademicRecords2020').doc(moduleID).set({
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
function setModuleTitle(__moduleID) {
    let titleDisplay = document.querySelector('.results-table caption');

    switch (__moduleID) {
        case 'DSA':
            titleDisplay.innerHTML = 'Dental Surgery Assistance - Results 2020';
            break;
        case 'CHE':
            titleDisplay.innerHTML = 'Community Health Education - Results 2020';
            break;
        case 'COU':
            titleDisplay.innerHTML = 'Counselling - Results 2020';
            break;
        case 'HSM':
            titleDisplay.innerHTML = 'Healthcare Service Management - Results 2020';
            break;
        case 'OHS':
            titleDisplay.innerHTML = 'Occupational Health and Safety - Results 2020';
            break;
        case 'BLS':
            titleDisplay.innerHTML = 'Basic Life Support - Results 2020';
            break;
    }
}

function hideLoader() {
    loader.style.display = 'none';
    tableSubmitBtn.style.display = 'block';
}

function loaderLog(msg) {
    document.querySelector('.loader-log').innerHTML = msg;
}
function getResults(__moduleID) {
    loaderLog('Getting Results..')
    db.collection('AcademicRecords2020').doc(__moduleID).get()
        .then(doc => {
            console.log("Doc id: ", doc.id);
            console.log("Data : ", doc.data());
            displayResults(doc.data().results)
        })
        .catch(error => {
            alert('Could not get Results from Server. Try Again');
            // alert(error)
            console.log(error);
        })
}
function displayResults(results) {
    let studentRows = document.querySelectorAll('.results-table tbody tr');
    if (studentRows.length <= results.length) {
        let neededRows = (results.length - studentRows.length) + 1 // the +1 is we can have an exta empty row at the bottom
        for (let i = 0; i < neededRows; i++) {
            addNewRow()            
        }
        updateLastNameInput();
        studentRows = document.querySelectorAll('.results-table tbody tr'); // update studentRows refernce (todo: might not be neccessary, check needed)
    }

    // Displaying The Table and setting The styling
    loader.style.marginTop = '.5rem';
    document.querySelector('.results-table').style.display = 'table';
    hideLoader();

    // Populating The Table
    for (let i = 0; i < results.length; i++) {
        studentRows[i].children[0].children[0].value = results[i].studentNumber;
        studentRows[i].children[1].children[0].value = results[i].studentName;
        studentRows[i].children[2].children[0].value = results[i].studentMark;
        
    }
}

