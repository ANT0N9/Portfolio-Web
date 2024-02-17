const hamburgerBtn = document.getElementById('hamburger-btn');
const sidebar = document.getElementById('sidebar');
const navclose = document.getElementById('navbar-close');

hamburgerBtn.addEventListener('click', () => {
    sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';

    hamburgerBtn.querySelectorAll('span').forEach((bar, index) => {
        const transformValue = index % 2 === 0 ? 'rotate(45deg)' : 'rotate(-45deg)';
        bar.style.transform = sidebar.style.display === 'block' ? transformValue : '';
    });
});

navclose.addEventListener('click', () => {
    sidebar.style.display = 'none';
})