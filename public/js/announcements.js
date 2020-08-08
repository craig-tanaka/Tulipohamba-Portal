const addAnnouncementsBtn = document.querySelector('.add-announement-btn');
const addAnnouncementForm = document.querySelector('form.add-basic-announcement');
const addAttachementBtn = document.querySelector('.add-basic-announcement .file-input button')
const addAttachementBtnLabel = document.querySelector('.add-basic-announcement .file-input span')
const attachmentRealInput = document.querySelector('.add-basic-announcement input[type="file"]')
const addAnnouncementsSubmitBtn = document.querySelector('.add-basic-announcement .form-input[type="submit"]')
const addAnnouncementTitleInput = document.querySelector('#announcement-title-input')
const addAnnouncementContentInput = document.querySelector('#announcement-content-input')
const createAnnouncementBtn = document.querySelector('.add-basic-announcement .form-input[type="submit"]');
const loader = document.querySelector('.loader-container');

addAnnouncementsBtn.addEventListener('click', event => {
    addAnnouncementsBtn.style.display = 'none';
    addAnnouncementForm.style.display = 'block';
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

    // Send Announcement to server if it has all required data (i.e it has passed validation)  
    if (validateAddAnnouncementsForm()) {
        showLoader();
        loaderLog('Pushing Announcement to server.')
        if (attachmentRealInput.files.length !== 0) {
            uploadAnnouncementWithAttachment();
        } else {
            uploadAnnouncement();
        }
    }
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
function uploadAttachment(announcementId) {
    var file = attachmentRealInput.files[0];
    var storageRef = firebase.storage().ref('Announcement-Attachments/'+ announcementId + '/' + file.name);
    var task = storageRef.put(file);
    loaderLog('Uploading Announcement File Attachment')
    task.on('state_changed', function progress(snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        loaderLog(`File upload Percentage: ${percentage.toFixed(0)}`);
    }, function error(err) {
            alert('Attachement Upload Failed. Please Try Again');
            hideLoader();
    }, function complete() {
            loaderLog('file uploaded.');
            alert('Announcement Uploaded Successfully');
            hideLoader();
            addAnnouncementForm.style.display = 'none';
            addAnnouncementsBtn.style.display = 'block';
    });
}
function uploadAnnouncement() {
    const db = firebase.firestore();

    db.collection("announcements").add({
            title: addAnnouncementTitleInput.value,
            content: addAnnouncementContentInput.value,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            hasAttachment: false
        })
        .then(function (docRef) {
            // console.log("Document written with ID: ", docRef.id);
            loaderLog('Announcement Successfully Pushed To Server');
            alert('Announcement Uploaded Successfully');
            hideLoader();
            addAnnouncementForm.style.display = 'none';
            addAnnouncementsBtn.style.display = 'block';
        })
        .catch(function (error) {
            // console.error("Error adding document: ", error);
            loaderLog('Announcement Push to Server failed. Please Try again later');
            alert('Attachement Upload Failed. Please Try Again');
            hideLoader();
        });
}
function uploadAnnouncementWithAttachment() {
    const db = firebase.firestore();

    db.collection("announcements").add({
            title: addAnnouncementTitleInput.value,
            content: addAnnouncementContentInput.value,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            hasAttachment: true,
            attachmentFileName: attachmentRealInput.files[0].name
        })
        .then(function (docRef) {
            loaderLog('Announcement Successfully Pushed To Server');
            uploadAttachment(docRef.id);
        })
        .catch(function (error) {
            // console.error("Error adding document: ", error);
            loaderLog('Announcement Push to Server failed. Please Try again later');
        });
}
function showLoader() {
    // Hide Submit Button and show loader
    createAnnouncementBtn.style.display = 'none';
    loader.style.display = 'block';
}
function hideLoader() {
    loader.style.display = 'none';
    createAnnouncementBtn.style.display = 'block';
}
function loaderLog(msg){
    document.querySelector('.loader-log').innerHTML = msg;
}
// TODO: Make add announcement title input text bolder