import './gallery.css';
import { Card } from '../card/card.js';

export function Gallery({ onLoadMore }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'gallery-wrapper';

  const queryLabel = document.createElement('p');
  queryLabel.className = 'gallery__query-label';
  queryLabel.hidden = true;
  wrapper.appendChild(queryLabel);

  const info = document.createElement('p');
  info.className = 'gallery__info';
  info.hidden = true;
  wrapper.appendChild(info);

  const section = document.createElement('section');
  section.className = 'gallery';
  wrapper.appendChild(section);

  const loadMoreBtn = document.createElement('button');
  loadMoreBtn.className = 'gallery__load-more';
  loadMoreBtn.textContent = 'Cargar más';
  loadMoreBtn.hidden = true;
  loadMoreBtn.addEventListener('click', onLoadMore);
  wrapper.appendChild(loadMoreBtn);

  const loadMoreError = document.createElement('p');
  loadMoreError.className = 'gallery__load-more-error';
  loadMoreError.hidden = true;
  wrapper.appendChild(loadMoreError);

  let isLoadingMore = false;
  let hasMoreGlobal = false;

  function onScroll() {
    if (isLoadingMore || !hasMoreGlobal) return;
    const rect = section.getBoundingClientRect();
    if (rect.bottom <= window.innerHeight + 100) {
      isLoadingMore = true;
      loadMoreBtn.click();
    }
  }
  window.addEventListener('scroll', onScroll);

  function showLoading() {
    section.replaceChildren();
    const loadingMsg = document.createElement('p');
    loadingMsg.className = 'gallery__loading';
    loadingMsg.textContent = 'Cargando...';
    section.appendChild(loadingMsg);
    info.hidden = true;
    queryLabel.hidden = true;
    loadMoreBtn.hidden = true;
  }

  function showError(message) {
    section.replaceChildren();
    const errorMsg = document.createElement('p');
    errorMsg.className = 'gallery__error';
    errorMsg.textContent = message;
    section.appendChild(errorMsg);
    info.hidden = true;
    loadMoreBtn.hidden = true;
  }

  function render(photos, total, hasMore) {
    section.replaceChildren();
    loadMoreBtn.hidden = true;
    hasMoreGlobal = hasMore;

    if (photos.length === 0) {
      info.hidden = true;
      queryLabel.hidden = true;
      const emptyMsg = document.createElement('p');
      emptyMsg.className = 'gallery__empty';
      emptyMsg.textContent = 'No se encontraron fotos.';
      section.appendChild(emptyMsg);
      return;
    }

    info.textContent = total + ' resultados';
    info.hidden = false;

    photos.forEach(photo => section.appendChild(Card(photo)));

    loadMoreBtn.hidden = !hasMore;
  }

  function append(photos, hasMore) {
    loadMoreError.hidden = true;
    photos.forEach(photo => section.appendChild(Card(photo)));
    loadMoreBtn.hidden = !hasMore;
    setLoadingMore(false);
    isLoadingMore = false;
    if (section.lastElementChild) {
      section.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    hasMoreGlobal = hasMore;
  }

  function setLoadingMore(isLoading) {
    loadMoreBtn.disabled = isLoading;
    loadMoreBtn.textContent = isLoading ? 'Cargando...' : 'Cargar más';
    if (isLoading) loadMoreError.hidden = true;
  }

  function showLoadMoreError(message) {
    loadMoreError.textContent = message;
    loadMoreError.hidden = false;
    setTimeout(() => { loadMoreError.hidden = true; }, 4000);
  }

  function setQuery(query) {
    queryLabel.textContent = `Resultados para: "${query}"`;
    queryLabel.hidden = false;
  }
  return {
    element: wrapper,
    render,
    append,
    showLoading,
    showError,
    showLoadMoreError,
    setLoadingMore,
    setQuery,
  };
}