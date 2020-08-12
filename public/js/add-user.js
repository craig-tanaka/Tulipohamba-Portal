const formSubmitBtn = document.querySelector('#form-submit-btn');
const formFirstNameInput = document.querySelector('#form-first-name');
const formMiddleNames = document.querySelector('#form-middle-names');
const formLastNameInput = document.querySelector('#form-last-name');
const formEmailInput = document.querySelector('#form-email-input');
const formUserRoleSelect = document.querySelector('#form-userrole-select');
const formErrorLabel = document.querySelector('#form-error-label');
const formSubmitRow = document.querySelector('#form-submit-row');
const formLoaderContainer = document.querySelector('.loader-container');
const formFieldsets = document.querySelectorAll('.add-user-form fieldset');
const studentNumberInput = document.querySelector('#form-student-number-input');

let loaderVisible = false;

formUserRoleSelect.addEventListener('change', event => {
    const studentNumberRow = document.querySelector('.student-number-row');
    let role = formUserRoleSelect.value;
    if (role === 'Student') {
        studentNumberRow.style.display = 'flex';
    } else {
        studentNumberRow.style.display = 'none';
    }
})
formSubmitBtn.addEventListener('click', (event) => {
    // Todo: Change submit element type to button because input type causing refresh before this line loads
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
    if (!formLastNameInput.value) {
        formLastNameInput.style.border = '1px solid red';
        formHasNoErrors = false;
    }
    // #form-email-input input validation
    if (!formEmailInput.value) {
        // TODO: improve email validation
        formEmailInput.style.border = '1px solid red';
        formHasNoErrors = false;
    }
    // #form-email-input input validation
    if (!studentNumberInput.value) {
        // TODO: improve email validation
        studentNumberInput.style.border = '1px solid red';
        formHasNoErrors = false;
    }
    

    if (formHasNoErrors) {
        toggleLoader()
        pushUserDetailsToServer()
    }else {
        formErrorLabel.style.display = 'initial';
    }
}

function pushUserDetailsToServer() {
    db.collection("users").add({
        userFirstName: formFirstNameInput.value,
        userMiddleNames: formMiddleNames.value,
        userLastName: formLastNameInput.value,
        userEmail: formEmailInput.value,
        userRole: formUserRoleSelect.options[formUserRoleSelect.selectedIndex].text,
        userStudentNumber: studentNumberInput.value
    })
    .then(function(docRef) {
        // console.log("Document written with ID: ", docRef.id);
        alert("User Created");
        document.querySelector('.add-user-form').reset();
        toggleLoader();
        // Todo: inform user job is done and maybe clear form
    })
    .catch(function(error) {
        toggleLoader();
        alert("Could not create User. Please Try Again.");
        // Todo: catch error and maybe allow user to try and send again
    });

}

function toggleLoader() {
    if (loaderVisible) {
        formLoaderContainer.style.display = "none";
        formFieldsets.forEach(el => {
            el.style.display = "block";
        })
        formSubmitRow.style.display = "initial";

        loaderVisible = false;
    }
    else {
        formFieldsets.forEach(el => {
            el.style.display = "none";
        })
        formSubmitRow.style.display = "none";
        formLoaderContainer.style.display = "initial";

        loaderVisible = true;
    }
}
// TODO: Change user password and offer a better default password