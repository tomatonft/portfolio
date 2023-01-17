'use strict';

{

// -----------
//  works
//  visit site ボタン
// -----------
const visitBtnSm = document.getElementById('visit-btn-sm');
const windowWidth = window.innerWidth;
let windowSm = 800;

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300 && windowWidth <= windowSm) {
    visitBtnSm.classList.add('appear');
  } else {
    visitBtnSm.classList.remove('appear');
  }
});

}