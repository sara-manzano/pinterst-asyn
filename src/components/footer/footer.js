import './footer.css';

export function Footer() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.setAttribute('aria-label', 'Pie de página');

  const text= document.createElement('p');
  text.textContent = `© ${new Date().getFullYear()} Pinterest Async — Galería de imágenes. Todos los derechos reservados.`;
  text.setAttribute('aria-label', 'Derechos de autor y descripción');

  footer.appendChild(text);
  return footer;
}
