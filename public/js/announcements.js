const addAnnouncementsBtn = document.querySelector('.add-announement-btn');
const addAnnouncementsOptions = document.querySelector('.add-announement-options');
const addBasicAnnouncementBtn = document.querySelector('.add-announement-option.basic')
const addBasicAnnouncementForm = document.querySelector('form.add-basic-announcement')
const addAttachementBtn = document.querySelector('.add-basic-announcement .file-input button')
const addAttachementBtnLabel = document.querySelector('.add-basic-announcement .file-input span')
const attachmentRealInput = document.querySelector('.add-basic-announcement input[type="file"]')
const addAnnouncementsSubmitBtn = document.querySelector('.add-basic-announcement .form-input[type="submit"]')
const addAnnouncementTitleInput = document.querySelector('#announcement-title-input')
const addAnnouncementContentInput = document.querySelector('#announcement-content-input')

addAnnouncementsBtn.addEventListener('click', event => {
    addAnnouncementsBtn.style.display = 'none';
    addAnnouncementsOptions.style.display = 'flex';
});
addBasicAnnouncementBtn.addEventListener('click', event => {
    addAnnouncementsOptions.style.display = 'none';
    addBasicAnnouncementForm.style.display = 'block';
});
addAttachementBtn.addEventListener('click', event => {
    // Todo: change bn outline color
    // Todo: add image preview on upload Help-link: https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
    // Todo: add multiple file upload functionality
    event.preventDefault();
    attachmentRealInput.click();
});
attachmentRealInput.addEventListener('change', event => {
    addAttachementBtnLabel.innerHTML = event.target.files[0].name;
})
addAnnouncementsSubmitBtn.addEventListener('click', event => {
    event.preventDefault();

    // Form Validation
    validateAddAnnouncementsForm();

    // Sending File Attachments to firebase storage 
    // Send Document to firestore
})



function validateAddAnnouncementsForm() {
    let hasNoErrors = true;
    if (addAnnouncementTitleInput.value === '') {
        // alert('Yooooo')
        addAnnouncementTitleInput.style.borderColor = 'red';
        addAnnouncementTitleInput.setAttribute('placeholder', 'Announcement Title is Required:')
        hasNoErrors = false;
    } else if (addAnnouncementTitleInput.value !== '') {
        addAnnouncementTitleInput.style.borderColor = '#092b5769';
    }


    if (addAnnouncementContentInput.value === '') {
        addAnnouncementContentInput.style.borderColor = 'red';
        addAnnouncementContentInput.setAttribute('placeholder', 'Announcement Content is Required:')
        hasNoErrors = false;
    }
    else if (addAnnouncementContentInput.value !== '') {
        addAnnouncementContentInput.style.borderColor = '#092b5769';
    }

    return hasNoErrors;
}