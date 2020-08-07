const db = firebase.firestore();
let user;

const sidebar = document.querySelector('section.sidebar');
const sidebarOverlay = document.querySelector('section.sidebar-overlay');
const sidebarToggleBtn = document.querySelector('.sidebar-toggle-btn');
const sidebarBackBtn = document.querySelector('.sidebar-back-btn');


// Get User Account from firebase Auth
firebase.auth().onAuthStateChanged(function (_user) {
    if (_user) {
        user = _user;
        getUserDetails(user);
        downloadAnnouncements()
    } else {
        // TODO: window.location.replace('../index.html');
    }
});


// #region _____________________EVENT LISTENERS_______________________
sidebarToggleBtn.addEventListener('click', (event) => {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
})
sidebarOverlay.addEventListener('click', (event) => {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
})
sidebarBackBtn.addEventListener('click', (event) => {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
})
// #endregion _____________________EVENT LISTENERS_______________________

function getUserDetails(user) {
    db.collection('users').doc(user.uid).get()
        .then(doc => {
            addUserSidebarLinks(doc.data());
        })
        .catch(err => {
            console.log(err);
            // Todo: Alert user or developer of error
        })
}

function addUserSidebarLinks(user) {
    const sidebarLinksElement = document.querySelector('.sidebar-links')
    const sidebarLinks = {
        users: `<div class="sidebar-link"> 
                    <img src = "./img/users-vector.png" class="sidebar-link-img">
                    <a href="../add-user.html">Users</a> 
                </div>`,
        studentElearning: `<div class="sidebar-link">
                                <img src="./img/elearning.png" class="sidebar-link-img">
                                <a href="">Student E-learning</a>
                            </div>`,
        academicRecord: `<div class="sidebar-link">
                            <img src="./img/academic-record-vector.png" class="sidebar-link-img">
                            <a href="">Academic Record</a>
                        </div>`,
        calendar: `<div class="sidebar-link">
                    <img src="./img/calendar-vector.png" class="sidebar-link-img">
                    <a href="">Calendar</a>
                 </div>`,
        myModules: `<div class="sidebar-link">
                        <img src="./img/modules-vector.png" class="sidebar-link-img">
                        <a href="">My Modules</a>
                    </div>`,
        announcements: `<div class="sidebar-link">
                            <img src="./img/announcements-vector.png" class="sidebar-link-img">
                            <a href="../announcements.html">Announcements</a>
                        </div>`
    }

    if (user.userRole === 'Admin') {
        sidebarLinksElement.innerHTML += sidebarLinks.announcements;
        sidebarLinksElement.innerHTML += sidebarLinks.calendar;
        sidebarLinksElement.innerHTML += sidebarLinks.users;
        sidebarLinksElement.innerHTML += sidebarLinks.studentElearning;
    }
}

function downloadAnnouncements() {
    if (document.querySelector('.announcements')) {
        let announcementsRef = db.collection('announcements').orderBy('created', 'desc').limit(6);

        announcementsRef.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                if (doc.data().hasAttachment) {
                    addAnnouncementWithAttachment(doc.id, doc.data());
                } else {
                    addAnnouncement(doc.id, doc.data());
                }
            });
        });
    }
}

function addAnnouncement(docId, doc) {
    let month = doc.created.toDate().toLocaleString('default', {
        month: 'long'
    });
    let date = `${doc.created.toDate().getDate()} ${month} ${doc.created.toDate().getFullYear()}`;

    document.querySelector('.announcements').innerHTML +=
        `<div class="announcement">
            <h3 class="announcement-title">${doc.title}</h3>
            <p class="announcement-body">${doc.content}</p>
            <div class="announcement-date">${date}</div>
        </div>`;
}
function addAnnouncementWithAttachment(docId, doc) {
    let month = doc.created.toDate().toLocaleString('default', {
        month: 'long'
    });
    let date = `${doc.created.toDate().getDate()} ${month} ${doc.created.toDate().getFullYear()}`;

    document.querySelector('.announcements').innerHTML +=
        `<div class="announcement">
            <h3 class="announcement-title">${doc.title}</h3>
            <p class="announcement-body">${doc.content}</p>
            <a href="https://firebasestorage.googleapis.com/v0/b/${firebase.storage().bucket_.bucket}/o/Announcement-Attachments/${docId}/${doc.attachmentFileName}" target="__blank"
            class="announcement-attachment">
                <img src="./img/attachment-file-vector.png"
                    alt="Attachement" class="attachement-vector">
                <span class="attachement-file-name"> ${doc.attachmentFileName}</span> 
            </a>
            <div class="announcement-date">${date}</div>
        </div>`;
}

// Todo: delete attachmnt on announcement delete
