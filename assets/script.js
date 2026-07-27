const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const firstAuthorOnly = document.getElementById('firstAuthorOnly');
const publicationSearch = document.getElementById('publicationSearch');
const yearButtons = document.querySelectorAll('.year');
const publications = document.querySelectorAll('.publication');
let activeYear = 'all';

function filterPublications() {
  const query = (publicationSearch?.value || '').trim().toLowerCase();

  publications.forEach(pub => {
    const authorMatch = !firstAuthorOnly.checked || pub.classList.contains('first-author');
    const yearMatch = activeYear === 'all' || pub.dataset.year === activeYear;
    const searchMatch = !query || (pub.dataset.search || pub.textContent.toLowerCase()).includes(query);
    pub.style.display = authorMatch && yearMatch && searchMatch ? 'block' : 'none';
  });
}

firstAuthorOnly.addEventListener('change', filterPublications);
publicationSearch.addEventListener('input', filterPublications);

yearButtons.forEach(button => {
  button.addEventListener('click', () => {
    yearButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    activeYear = button.dataset.year;
    filterPublications();
  });
});
