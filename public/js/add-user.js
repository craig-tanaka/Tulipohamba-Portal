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

let loaderVisible = false;

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

    if (formHasNoErrors) {
        toggleLoader()
        pushUserDetailsToServer()
    }else {
        formErrorLabel.style.display = 'initial';
    }
}

function pushUserDetailsToServer() {
    db.collection("users-waitlist").add({
        userFirstName: formFirstNameInput.value,
        userMiddleNames: formMiddleNames.value,
        userLastName: formLastNameInput.value,
        userEmail: formEmailInput.value,
        userRole: formUserRoleSelect.options[formUserRoleSelect.selectedIndex].text,
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        alert("Document written with");
        toggleLoader();
        // Todo: inform user job is done and maybe clear form
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        alert("Error adding document: ");
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