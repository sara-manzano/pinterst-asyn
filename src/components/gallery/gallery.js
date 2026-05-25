import './gallery.css';
import { Card } from '../card/card.js';

export function Gallery({ onLoadMore }) {

  const wrapper = document.createElement('div');
  wrapper.className = 'gallery-wrapper';

  const labelQuery = document.createElement('p');
  labelQuery.className = 'gallery__query-label';
  labelQuery.hidden = true;
  wrapper.appendChild(labelQuery);

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

  function showLoading() {
    section.replaceChildren();
    const loadingMsg = document.createElement('p');
    loadingMsg.className = 'gallery__loading';
    loadingMsg.textContent = 'Cargando...';
    section.appendChild(loadingMsg);
    info.hidden = true;
    labelQuery.hidden = true;
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

    if (photos.length === 0) {
      info.hidden = true;
      labelQuery.hidden = true;
      const emptyMsg = document.createElement('p');
      emptyMsg.className = 'gallery__empty';
      emptyMsg.textContent = 'No se encontraron fotos.';
      section.appendChild(emptyMsg);
      return;
    }

    info.textContent = total + ' resultados';
    info.hidden = false;

    for (let i = 0; i < photos.length; i++) {
      section.appendChild(Card(photos[i]));
    }

    loadMoreBtn.hidden = !hasMore;
  }

  function append(photos, hasMore) {
    for (let i = 0; i < photos.length; i++) {
      section.appendChild(Card(photos[i]));
    }

    loadMoreBtn.hidden = !hasMore;
    setLoadingMore(false);
  }

  function setLoadingMore(isLoading) {
    loadMoreBtn.disabled = isLoading;
    loadMoreBtn.textContent = isLoading ? 'Cargando...' : 'Cargar más';
  }

  function setQuery(query) {
    labelQuery.textContent = `Resultados para: "${query}"`;
    labelQuery.hidden = false;
  }

  return {
    element: wrapper,
    render,
    append,
    showLoading,
    showError,
    setLoadingMore,
    setQuery,
  };
}
