import './card.css';

export function Card(photo) {
  const article = document.createElement('article');
  article.className = 'card';

  const imgWrapper = document.createElement('div');
  imgWrapper.className = 'card__image-wrapper';
  article.appendChild(imgWrapper);

  const img = document.createElement('img');
  img.className = 'card__image';
  img.src = photo.urls.small;
  img.alt = photo.alt_description || 'Foto';
  imgWrapper.appendChild(img);

  const overlay = document.createElement('div');
  overlay.className = 'card__overlay';
  imgWrapper.appendChild(overlay);

  const visitBtn = document.createElement('a');
  visitBtn.className = 'card__visit-button';
  visitBtn.href = photo.links.html;
  visitBtn.target = '_blank';
  visitBtn.rel = 'noreferrer';
  visitBtn.textContent = 'Visitar';
  overlay.appendChild(visitBtn);

  const likes = document.createElement('span');
  likes.className = 'card__likes-overlay';
  likes.textContent = '❤ ' + photo.likes;
  overlay.appendChild(likes);

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
