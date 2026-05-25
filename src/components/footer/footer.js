import './footer.css';

export function Footer() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  const textEl = document.createElement('p');
  textEl.textContent = `© ${new Date().getFullYear()} Pinterest Async`;

  footer.appendChild(textEl);
  return footer;
}
