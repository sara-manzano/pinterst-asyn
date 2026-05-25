import './style.css';
import { Header } from './components/header/header.js';
import { Gallery } from './components/gallery/gallery.js';
import { Footer } from './components/footer/footer.js';

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;
const INITIAL_QUERY = 'tattoos';

const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

let currentQuery = INITIAL_QUERY;
let currentPage = 1;

const header = Header({ onSearch: search, onReset: reset });
app.appendChild(header);
const gallery = Gallery({ onLoadMore: loadMore });
app.appendChild(gallery.element);
const footer = Footer();
app.appendChild(footer);

async function fetchPhotos(query, page) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20&page=${page}&client_id=${ACCESS_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return data;
}

async function search(query) {
  currentQuery = query;
  currentPage = 1;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  gallery.showLoading();

  try {
    const data = await fetchPhotos(currentQuery, currentPage);
    const pages = Math.ceil(data.total / 20);
    const hasMore = currentPage < pages;
    gallery.setQuery(currentQuery);
    gallery.render(data.results, data.total, hasMore);
  } catch (error) {
    gallery.showError('Hubo un error al cargar las fotos.');
  }
}

async function loadMore() {
  gallery.setLoadingMore(true);

  try {
    const data = await fetchPhotos(currentQuery, currentPage + 1);
    currentPage++;
    const pages = Math.ceil(data.total / 20);
    const hasMore = currentPage < pages;
    gallery.append(data.results, hasMore);
  } catch (error) {
    gallery.setLoadingMore(false);
  }
}

function reset() {
  search(INITIAL_QUERY);
}

search(INITIAL_QUERY);

