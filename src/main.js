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

let query = INITIAL_QUERY;
let page = 1;
let controller = null;


const header = Header({ onSearch: doSearch, onReset: reset });
app.appendChild(header);
const gallery = Gallery({ onLoadMore: loadMore });
app.appendChild(gallery.element);
const footer = Footer();
app.appendChild(footer);

async function fetchPhotos(q, p, signal) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&per_page=${PER_PAGE}&page=${p}&client_id=${ACCESS_KEY}`;
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return data;
}

async function doSearch(q) {
  if (controller) controller.abort();
  controller = new AbortController();
  query = q;
  page = 1;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  gallery.showLoading();
  try {
    const data = await fetchPhotos(query, page, controller.signal);
    const hasMore = data.results.length === PER_PAGE;
    document.title = `${query} · Pinterest Async`;
    gallery.setQuery(query);
    gallery.render(data.results, data.total, hasMore);
  } catch (err) {
    if (err.name !== 'AbortError') {
      gallery.showError('Error al cargar las fotos.');
    }
  }
}

async function loadMore() {
  gallery.setLoadingMore(true);
  try {
    const next = page + 1;
    const data = await fetchPhotos(query, next);
    page = next;
    const hasMore = data.results.length === PER_PAGE;
    gallery.append(data.results, hasMore);
  } catch (error) {
    gallery.setLoadingMore(false);
    gallery.showLoadMoreError('No se pudieron cargar más fotos');
  }
}

function reset() {
  document.title = 'Pinterest Async';
  doSearch(INITIAL_QUERY);
}

doSearch(INITIAL_QUERY);

