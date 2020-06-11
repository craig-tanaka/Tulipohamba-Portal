const sidebar = document.querySelector('section.sidebar');
const sidebarOverlay = document.querySelector('section.sidebar-overlay');
const sidebarToggleBtn = document.querySelector('.sidebar-toggle-btn');


sidebarToggleBtn.addEventListener('click', (event) => {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
})
sidebarOverlay.addEventListener('click', (event) => {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
})