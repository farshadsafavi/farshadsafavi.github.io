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


const githubProjects = document.getElementById('githubProjects');

const featuredRepositoryOrder = [
  'FloodNet-SegFormer-RealTime',
  'FloodNet-MobileNet-Segmentation',
  'DW-CWDM',
  'Panoramic-Ultrasound-RegionGrowing'
];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatRepositoryName(name) {
  return name.replaceAll('-', ' ');
}

async function loadGitHubProjects() {
  if (!githubProjects) return;

  try {
    const response = await fetch(
      'https://api.github.com/users/farshadsafavi/repos?sort=updated&per_page=100'
    );

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const repositories = await response.json();

    const publicRepositories = repositories.filter(
      repo => !repo.fork && !repo.archived
    );

    const featured = featuredRepositoryOrder
      .map(name => publicRepositories.find(repo => repo.name === name))
      .filter(Boolean);

    const additional = publicRepositories
      .filter(repo => !featuredRepositoryOrder.includes(repo.name))
      .slice(0, Math.max(0, 6 - featured.length));

    const selectedRepositories = [...featured, ...additional].slice(0, 6);

    if (!selectedRepositories.length) {
      throw new Error('No public repositories were found.');
    }

    githubProjects.innerHTML = selectedRepositories.map(repo => {
      const description = repo.description || 'Public research software and project resources.';
      const language = repo.language || 'Repository';
      const updatedDate = new Date(repo.updated_at).toLocaleDateString(
        'en-US',
        { year: 'numeric', month: 'short', day: 'numeric' }
      );

      return `
        <a class="project-card"
           href="${escapeHtml(repo.html_url)}"
           target="_blank"
           rel="noopener">
          <h3>${escapeHtml(formatRepositoryName(repo.name))}</h3>
          <p>${escapeHtml(description)}</p>
          <span>
            ${escapeHtml(language)}
            · ★ ${repo.stargazers_count}
            · Updated ${escapeHtml(updatedDate)}
          </span>
        </a>
      `;
    }).join('');
  } catch (error) {
    githubProjects.innerHTML = `
      <a class="project-card"
         href="https://github.com/farshadsafavi/FloodNet-SegFormer-RealTime"
         target="_blank"
         rel="noopener">
        <h3>FloodNet SegFormer Real Time</h3>
        <p>Real-time semantic segmentation of FloodNet aerial imagery using SegFormer.</p>
        <span>Python · SegFormer</span>
      </a>

      <a class="project-card"
         href="https://github.com/farshadsafavi/FloodNet-MobileNet-Segmentation"
         target="_blank"
         rel="noopener">
        <h3>FloodNet MobileNet Segmentation</h3>
        <p>Lightweight MobileNet-based semantic segmentation for efficient flood-scene understanding.</p>
        <span>Python · MobileNet</span>
      </a>
    `;

    console.warn('Could not load GitHub repositories automatically:', error);
  }
}

loadGitHubProjects();
