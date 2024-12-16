const collapseElement = document.getElementById('collapseList');
const arrow = document.querySelector('.rotate');

collapseElement.addEventListener('show.bs.collapse', function () {
  arrow.classList.remove('collapsed');
});

collapseElement.addEventListener('hide.bs.collapse', function () {
  arrow.classList.add('collapsed');
});