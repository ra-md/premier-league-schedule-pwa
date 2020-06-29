import loadPage from './loadPage.js';

const sidenav = document.querySelector('.sidenav');

let page = window.location.hash.substring(1);
if (page === '') page = 'jadwal';
loadPage(page);

M.Sidenav.init(sidenav);
loadNav();

async function loadNav() {
  const nav = document.querySelectorAll('.topnav, .sidenav');
  const response = await fetch('../nav.html');
  const responseText = await response.text();

  if(response.status !== 200) return;

  nav.forEach(element => {
    element.innerHTML = responseText;
  });

  selectNavLink();
};

function selectNavLink() {
  const navLinks = document.querySelectorAll('.sidenav a, .topnav a');
  
  navLinks.forEach(element => {
    element.addEventListener('click', () => {
      M.Sidenav.getInstance(sidenav).close();

      page = element.getAttribute('href').substring(1);
      loadPage(page);
    });
  });
};
