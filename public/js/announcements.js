const addAnnouncementsBtn = document.querySelector('.add-announement-btn');
const addAnnouncementsOptions = document.querySelector('.add-announement-options');

addAnnouncementsBtn.addEventListener('click', event => {
    addAnnouncementsBtn.style.display = 'none';
    addAnnouncementsOptions.style.display = 'flex';
})