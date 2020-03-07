export default selector => {
  // return document.querySelectorAll(selector);
  const selectors = document.querySelectorAll(selector)
  return selectors[selectors.length - 1]
}
