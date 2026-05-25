import './style.css';
import { Header } from './components/header/header.js';
import { Gallery } from './components/gallery/gallery.js';
import { Footer } from './components/footer/footer.js';

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;
const INITIAL_QUERY = 'tattoos';
const PER_PAGE = 20;

const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

let currentQuery = INITIAL_QUERY;
let currentPage = 1;
let searchController = null;

const header = Header({ onSearch: search, onReset: reset });
app.appendChild(header);
const gallery = Gallery({ onLoadMore: loadMore });
app.appendChild(gallery.element);
const footer = Footer();
app.appendChild(footer);

async function fetchPhotos(query, page, signal) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${PER_PAGE}&page=${page}&client_id=${ACCESS_KEY}`;
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return data;
}

async function search(query) {
  // si hay una búsqueda en curso la cancelo
  if (searchController) searchController.abort();
  searchController = new AbortController();

  currentQuery = query;
  currentPage = 1;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  gallery.showLoading();

  try {
    const data = await fetchPhotos(currentQuery, currentPage, searchController.signal);
    const hasMore = data.results.length === PER_PAGE;
    document.title = `${currentQuery} · Pinterest Async`;
    gallery.setQuery(currentQuery);
    gallery.render(data.results, data.total, hasMore);
  } catch (error) {
    if (error.name !== 'AbortError') {
      gallery.showError('Hubo un error al cargar las fotos.');
    }
  }
}

async function loadMore() {
  gallery.setLoadingMore(true);

  try {
    const nextPage = currentPage + 1;
    const data = await fetchPhotos(currentQuery, nextPage);
    currentPage = nextPage;
    const hasMore = data.results.length === PER_PAGE;
    gallery.append(data.results, hasMore);
  } catch (error) {
    gallery.setLoadingMore(false);
    gallery.showLoadMoreError('No se pudieron cargar más fotos. Inténtalo de nuevo.');
  }
}

function reset() {
  document.title = 'Pinterest Async';
  search(INITIAL_QUERY);
}

search(INITIAL_QUERY);

