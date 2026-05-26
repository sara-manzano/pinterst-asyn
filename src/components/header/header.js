import './header.css';

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('toast--visible'), 10);
  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 300);
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

  const btnHome = document.createElement('button');
  btnHome.textContent = 'Inicio';
  btnHome.className = 'header__nav-button header__nav-button--active';
  btnHome.addEventListener('click', handleReset);
  nav.appendChild(btnHome);

  const btnExplore = document.createElement('button');
  btnExplore.textContent = 'Explorar';
  btnExplore.className = 'header__nav-button';
  btnExplore.addEventListener('click', () => {
    input.value = '';
    onSearch('arquitectura');
  });
  nav.appendChild(btnExplore);

  const btnCreate = document.createElement('button');
  btnCreate.textContent = 'Crear';
  btnCreate.className = 'header__nav-button';
  btnCreate.addEventListener('click', () => {
    showToast('📌 inicia sesión para crear pines');
  });
  nav.appendChild(btnCreate);

  header.appendChild(nav);

  const searchDiv = document.createElement('div');
  searchDiv.className = 'header__search';
  const searchIcon = document.createElement('i');
  searchIcon.className = 'header__search-icon ri-search-line';
  searchDiv.appendChild(searchIcon);

  const input = document.createElement('input');
  input.type = 'search';
  input.className = 'header__input';
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

  const btnSearch = document.createElement('button');
  btnSearch.className = 'header__search-button';
  const btnSearchIcon = document.createElement('i');
  btnSearchIcon.className = 'ri-search-line';
  btnSearch.appendChild(btnSearchIcon);
  btnSearch.addEventListener('click', () => {
    const query = input.value.trim();
    if (query) {
      onSearch(query);
      input.value = '';
    }
  });
  searchDiv.appendChild(btnSearch);

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

