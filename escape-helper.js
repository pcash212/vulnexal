function escapeHtml(text) {
  if (!text) return text;
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

if (typeof window !== 'undefined') {
  window.escapeHtml = escapeHtml;
}
