import './card.css';

export function Card(photo) {
  const article = document.createElement('article');
  article.className = 'card';
  article.tabIndex = 0;
  article.setAttribute('aria-label', `Imagen de ${photo?.user?.name || 'autor desconocido'}`);

  const imgWrapper = document.createElement('div');
  imgWrapper.className = 'card__img-wrapper';
  article.appendChild(imgWrapper);

  const img = document.createElement('img');
  img.className = 'card__img';
  img.src = photo?.urls?.small || '';
  img.alt = photo?.alt_description || `Foto de ${photo?.user?.name || 'autor desconocido'}`;
  img.loading = 'lazy';
  imgWrapper.appendChild(img);
  imgWrapper.style.cursor = 'pointer';
  imgWrapper.addEventListener('click', () => {
    if (photo.links && photo.links.html) {
      window.open(photo.links.html, '_blank', 'noopener');
    }
  });

  const overlay = document.createElement('div');
  overlay.className = 'card__overlay';
  imgWrapper.appendChild(overlay);

  const link = document.createElement('a');
  link.className = 'card__visit-button';
  link.href = photo.links && photo.links.html ? photo.links.html : '#';
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.textContent = 'Ver foto';
  overlay.appendChild(link);

  const likes = document.createElement('span');
  likes.className = 'card__likes-overlay';
  likes.textContent = '❤ ' + (photo.likes || 0);
  overlay.appendChild(likes);

  const info = document.createElement('div');
  info.className = 'card__info';
  article.appendChild(info);

  if (photo.user && photo.user.profile_image && photo.user.profile_image.small) {
    const avatar = document.createElement('img');
    avatar.className = 'card__avatar';
    avatar.src = photo.user.profile_image.small;
    avatar.alt = photo.user.name;
    info.appendChild(avatar);
  } else {
    const avatarFallback = document.createElement('div');
    avatarFallback.className = 'card__avatar card__avatar--fallback';
    avatarFallback.textContent = photo.user && photo.user.name ? photo.user.name[0].toUpperCase() : '?';
    info.appendChild(avatarFallback);
  }

  const textDiv = document.createElement('div');
  textDiv.className = 'card__text';
  info.appendChild(textDiv);
  const author = document.createElement('p');
  author.className = 'card__author';
  author.textContent = photo.user && photo.user.name ? photo.user.name : 'Sin nombre';
  textDiv.appendChild(author);

  const date = document.createElement('p');
  date.className = 'card__date';
  date.textContent = photo?.created_at
    ? new Date(photo.created_at).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    : '';
  textDiv.appendChild(date);

  return article;
}
