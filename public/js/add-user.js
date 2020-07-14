const formSubmitBtn = document.querySelector('#form-submit-btn');
const formFirstNameInput = document.querySelector('#form-first-name');
const formLastName = document.querySelector('#form-last-name');
const formUserRoleSelect = document.querySelector('#form-userrole-select');

formSubmitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    // Validation
    validateForm();


})

function validateForm() {
    let formHasNoErrors = true;

    // form-first-name input validation
    if (!formFirstNameInput.value) {
        formFirstNameInput.style.border = '1px solid red';
        formHasNoErrors = false;
    }

    // #form-last-name input validation
    if (!formFirstNameInput.value) {
        formFirstNameInput.style.border = '1px solid red';
        formHasNoErrors = false;
    }

    if (formHasNoErrors) {
        // Send info to firebase
        alert('Sending user info to firebase')
    }
}