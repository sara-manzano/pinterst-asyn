import './card.css';

export function Card(photo) {
  const article = document.createElement('article');
  article.className = 'card';

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'card__image-wrapper';
  article.appendChild(imageWrapper);

  const img = document.createElement('img');
  img.className = 'card__image';
  img.src = photo.urls.small;
  img.alt = photo.alt_description || 'Foto';
  img.loading = 'lazy';
  imageWrapper.appendChild(img);

  const overlay = document.createElement('div');
  overlay.className = 'card__overlay';
  imageWrapper.appendChild(overlay);

  const visitLink = document.createElement('a');
  visitLink.className = 'card__visit-button';
  visitLink.href = photo.links.html;
  visitLink.target = '_blank';
  visitLink.rel = 'noreferrer';
  visitLink.textContent = 'Visitar';
  overlay.appendChild(visitLink);

  const likesEl = document.createElement('span');
  likesEl.className = 'card__likes-overlay';
  likesEl.textContent = '❤ ' + photo.likes;
  overlay.appendChild(likesEl);

  const info = document.createElement('div');
  info.className = 'card__info';
  article.appendChild(info);

  const avatar = document.createElement('img');
  avatar.className = 'card__avatar';
  avatar.src = photo.user.profile_image?.small ?? '';
  avatar.alt = photo.user.name;
  info.appendChild(avatar);

  const textDiv = document.createElement('div');
  textDiv.className = 'card__text';
  info.appendChild(textDiv);

  const authorEl = document.createElement('p');
  authorEl.className = 'card__author';
  authorEl.textContent = photo.user.name;
  textDiv.appendChild(authorEl);

  const dateEl = document.createElement('p');
  dateEl.className = 'card__date';
  dateEl.textContent = new Date(photo.created_at).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  textDiv.appendChild(dateEl);

  return article;
}
