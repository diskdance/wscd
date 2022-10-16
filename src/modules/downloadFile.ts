/**
 * Download a text file with specified filename and content.
 * @param filename filename
 * @param text content
 */
function downloadFile(filename: string, text: string): void {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export default downloadFile;
