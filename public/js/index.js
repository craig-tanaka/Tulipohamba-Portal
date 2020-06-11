const signinBtn = document.querySelector('.signin-btn');
const emailInput = document.querySelector('#signin-email-input')
const passwordInput = document.querySelector('#signin-password-input')

signinBtn.addEventListener('click', (event) => {
    console.log(firebase.auth())
    console.log(emailInput.value)
    console.log(passwordInput.value)


    // window.location = '../home.html';
})
