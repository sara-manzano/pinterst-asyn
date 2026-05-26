import './footer.css';

export function Footer() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.setAttribute('aria-label', 'Pie de página');

  const textEl = document.createElement('p');
  textEl.textContent = `© ${new Date().getFullYear()} Pinterest Async — Galería de imágenes. Todos los derechos reservados.`;
  textEl.setAttribute('aria-label', 'Derechos de autor y descripción');

  footer.appendChild(textEl);
  return footer;
}
