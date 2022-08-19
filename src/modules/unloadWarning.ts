function onBeforeUnload(e: Event) {
  e.preventDefault();
  return 'There is an ongoing test! Do you want to leave?';
}

function hookWarning() {
  window.addEventListener('beforeunload', onBeforeUnload);
}

function unhookWarning() {
  window.removeEventListener('beforeunload', onBeforeUnload);
}

export { hookWarning, unhookWarning };
