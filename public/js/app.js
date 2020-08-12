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
    } else {
        // TODO: window.location.replace('../index.html');
    }
});
downloadAnnouncements()


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
                                <a href="https://elearning.tulipohambatraining.edu.na/login/index.php" target="__blank"> Student E-learning </a>
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
                        </div>`,
        results: `<div class="sidebar-link">
                            <img src="./img/results-vector.png" class="sidebar-link-img">
                            <a href="../results.html">Results</a>
                        </div>`,
        myResults: `<div class="sidebar-link">
                            <img src="./img/results-vector.png" class="sidebar-link-img">
                            <a href="../my-results.html">My Results</a>
                        </div>`,
        examinationTimetable: `<div class="sidebar-link">
                            <img src="./img/results-vector.png" class="sidebar-link-img">
                            <a href="../examination-timetable.html">Examination Timetable</a>
                        </div>`
        
    }

    if (user.userRole === 'Admin') {
        sidebarLinksElement.innerHTML += sidebarLinks.announcements;
        sidebarLinksElement.innerHTML += sidebarLinks.calendar;
        sidebarLinksElement.innerHTML += sidebarLinks.users;
        sidebarLinksElement.innerHTML += sidebarLinks.results;
        sidebarLinksElement.innerHTML += sidebarLinks.studentElearning;
        // Todo: add links without 'innerHtml+=' 
    }
    if (user.userRole === 'Student') {
        sidebarLinksElement.innerHTML += sidebarLinks.myModules;
        sidebarLinksElement.innerHTML += sidebarLinks.calendar;
        sidebarLinksElement.innerHTML += sidebarLinks.myResults;
        sidebarLinksElement.innerHTML += sidebarLinks.examinationTimetable;
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

    let newAnnouncement = document.createElement('div');
    newAnnouncement.className = 'announcement';
    newAnnouncement.innerHTML = `
        <h3 class="announcement-title">${doc.title}</h3>
        <p class="announcement-body">${doc.content}</p>
        <div class="announcement-date">${date}</div>`;

    document.querySelector('.announcements').append(newAnnouncement);
}
function addAnnouncementWithAttachment(docId, doc) {
    let month = doc.created.toDate().toLocaleString('default', {
        month: 'long'
    });
    let date = `${doc.created.toDate().getDate()} ${month} ${doc.created.toDate().getFullYear()}`;

    firebase.storage().ref(`Announcement-Attachments/${docId}/${doc.attachmentFileName}`).getDownloadURL()
        .then(url => {
            let newAnnouncement = document.createElement('div');
            newAnnouncement.className = 'announcement';
            newAnnouncement.innerHTML = 
            `<h3 class="announcement-title">${doc.title}</h3>
            <p class="announcement-body">${doc.content}</p>
            <a href="${url}" target="__blank"
                    class="announcement-attachment">
                <img src="./img/attachment-file-vector.png"
                    alt="Attachement" class="attachement-vector">
                <span class="attachement-file-name"> ${doc.attachmentFileName}</span> 
            </a>
            <div class="announcement-date">${date}</div>`;

            document.querySelector('.announcements').append(newAnnouncement);
        })
}

// Todo: delete attachmnt on announcement delete
