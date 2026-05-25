import './header.css';

function showToast(message) {
  const toastEl = document.createElement('div');
  toastEl.className = 'toast';
  toastEl.textContent = message;
  document.body.appendChild(toastEl);
  setTimeout(() => toastEl.classList.add('toast--visible'), 10);
  setTimeout(() => {
    toastEl.classList.remove('toast--visible');
    setTimeout(() => toastEl.remove(), 300);
  }, 2600);
}

export function Header({ onSearch, onReset }) {

  const header = document.createElement('header');
  header.className = 'header';

  function handleReset() {
    input.value = '';
    onReset();
  }

  const logo = document.createElement('div');
  logo.className = 'header__logo';
  logo.addEventListener('click', handleReset);

  const icon = document.createElement('i');
  icon.className = 'ri-pinterest-fill';
  logo.appendChild(icon);

  header.appendChild(logo);

  const nav = document.createElement('nav');
  nav.className = 'header__nav';

  const homeBtn = document.createElement('button');
  homeBtn.textContent = 'Inicio';
  homeBtn.className = 'header__nav-button header__nav-button--active';
  homeBtn.addEventListener('click', handleReset);
  nav.appendChild(homeBtn);

  const exploreBtn = document.createElement('button');
  exploreBtn.textContent = 'Explorar';
  exploreBtn.className = 'header__nav-button';
  exploreBtn.addEventListener('click', () => {
    input.value = '';
    onSearch('arquitectura');
  });
  nav.appendChild(exploreBtn);

  const createBtn = document.createElement('button');
  createBtn.textContent = 'Crear';
  createBtn.className = 'header__nav-button';
  createBtn.addEventListener('click', () => {
    showToast('📌 inicia sesión para crear pines');
  });
  nav.appendChild(createBtn);

  header.appendChild(nav);

  const searchDiv = document.createElement('div');
  searchDiv.className = 'header__search';

  const searchIcon = document.createElement('i');
  searchIcon.className = 'header__search-icon ri-search-line';
  searchDiv.appendChild(searchIcon);

  const input = document.createElement('input');
  input.type = 'search';
  input.className = 'header__input';
  input.placeholder = 'Buscar';
  input.autocomplete = 'off';
  input.spellcheck = false;
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = input.value.trim();
      if (query) {
        onSearch(query);
        input.value = '';
      }
    }
  });
  searchDiv.appendChild(input);

  const searchBtn = document.createElement('button');
  searchBtn.className = 'header__search-button';
  const searchBtnIcon = document.createElement('i');
  searchBtnIcon.className = 'ri-search-line';
  searchBtn.appendChild(searchBtnIcon);
  searchBtn.addEventListener('click', () => {
    const query = input.value.trim();
    if (query) {
      onSearch(query);
      input.value = '';
    }
  });
  searchDiv.appendChild(searchBtn);

  header.appendChild(searchDiv);

  const actions = document.createElement('div');
  actions.className = 'header__actions';

  const bellBtn = document.createElement('button');
  bellBtn.className = 'header__icon-button';
  bellBtn.setAttribute('aria-label', 'Notificaciones');
  bellBtn.addEventListener('click', () => {
    showToast('🔕 sin notas por aquí');
  });

  const bellIcon = document.createElement('i');
  bellIcon.className = 'ri-notification-3-fill';
  bellBtn.appendChild(bellIcon);

  actions.appendChild(bellBtn);

  const chatBtn = document.createElement('button');
  chatBtn.className = 'header__icon-button';
  chatBtn.setAttribute('aria-label', 'Mensajes');
  chatBtn.addEventListener('click', () => {
    showToast('✉️ bandeja vacía');
  });

  const chatIcon = document.createElement('i');
  chatIcon.className = 'ri-message-3-line';
  chatBtn.appendChild(chatIcon);

  actions.appendChild(chatBtn);

  const avatar = document.createElement('div');
  avatar.className = 'header__avatar';
  avatar.textContent = 'S';
  actions.appendChild(avatar);

  header.appendChild(actions);

  return header;
}

