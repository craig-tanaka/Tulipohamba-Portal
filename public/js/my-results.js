const resultsContainer = document.querySelector('.my-results-container');
const resultsRow = document.querySelector('my-results-table tbody tr');
const resultYearDisplay = document.querySelector('#result-year');
const resultCourseDisplay = document.querySelector('#result-course');
const resultMarkDisplay = document.querySelector('#result-mark');
const loader = document.querySelector('.loader-container')

function userLoadedInit() {
    db.collection('AcademicRecords2020').doc(userData.studentCourse).get()
        .then(doc => {
            console.log()
            let res = doc.data().results;
            let mark = null;

            for (let i = 0; i < res.length; i++) {
                if (res[i].studentNumber === userData.studentNumber) {
                    mark = res[i].studentMark;
                    break;
                }
            }

            if (mark === null) mark = '';
            displayResult(mark, userData.studentCourse);
        })
        .catch(err => {
            console.log(err);
            // Todo: Alert user or developer of error
        })
}
function displayResult(mark, course) {
    switch (course) {
        case 'DSA':
            resultCourseDisplay.innerHTML = 'Dental Surgery Assistance';
            break;
        case 'CHE':
            resultCourseDisplay.innerHTML = 'Community Health Education';
            break;
        case 'COU':
            resultCourseDisplay.innerHTML = 'Counselling';
            break;
        case 'HSM':
            resultCourseDisplay.innerHTML = 'Healthcare Service Management';
            break;
        case 'OHS':
            resultCourseDisplay.innerHTML = 'Occupational Health and Safety';
            break;
        case 'BLS':
            resultCourseDisplay.innerHTML = 'Basic Life Support';
            break;
    }
    resultMarkDisplay.innerHTML = mark;
    hideLoader();
}
function hideLoader() {
    loader.style.display = 'none';
    resultsContainer.style.display = 'block';
}