const signinBtn = document.querySelector('.signin-btn');
const emailInput = document.querySelector('#signin-email-input')
const passwordInput = document.querySelector('#signin-password-input')
const errorDisplay = document.querySelector('.signin-error-display')
const loader = document.querySelector('.loader-container')

signinBtn.addEventListener('click', (event) => {
    // Getting Form Data
    let email = emailInput.value;
    let password = passwordInput.value;
    

    // TODO: add proper form validation

    showLoader();
    resetInputBorderColors();

    // Login Attempt To firebase
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
        window.location = '../home.html'
    }).catch((error)=>{
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

         if (errorCode === 'auth/invalid-email') {
             logError('Email address is not valid.');
             emailInput.style.borderColor = 'red';
         } else if (errorCode === 'auth/user-disabled') {
             logError('The user corresponding to the given email has been disabled.');
             emailInput.style.borderColor = 'red';
         } else if (errorCode === 'auth/user-not-found') {
             logError('There is no user corresponding to the given email.');
             emailInput.style.borderColor = 'red';
         } else if (errorCode === 'auth/wrong-password') {
             logError('The password is invalid for the given email, or the account corresponding to the email does not have a password set.');
             passwordInput.style.borderColor = 'red';
        }
        
        hideLoader();
    })


    // window.location = '../home.html';
})

function logError(logMessage) {
    errorDisplay.innerHTML = `${logMessage}`;
}
function resetInputBorderColors() {
    emailInput.style.borderColor = '#08355a';
    passwordInput.style.borderColor = '#08355a';
}
function showLoader() {
    // Hide Submit Button and show loader
    document.querySelector('.signin-btn-container').classList.toggle('with-loader');
    loader.style.display = 'initial';
    signinBtn.style.display = 'none';
}
function hideLoader() {
    // Hide Submit Button and show loader
    document.querySelector('.signin-btn-container').classList.toggle('with-loader');
    loader.style.display = 'none';
    signinBtn.style.display = 'initial';
}