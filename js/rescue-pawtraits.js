var container, msnry;

if ("Masonry" in window) {
  container = document.querySelector('.dogs');
  msnry = new Masonry(container, {
    columnWidth: 320,
    itemSelector: '.dog',
    gutter: 8,
    transitionDuration: 0,
    isFitWidth: true
  });
}
