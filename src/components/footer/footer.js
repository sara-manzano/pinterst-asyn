import './footer.css';

export function Footer() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  const texto = document.createElement('p');
  texto.textContent = `© ${new Date().getFullYear()} Pinterest Async`;

  footer.appendChild(texto);
  return footer;
}
