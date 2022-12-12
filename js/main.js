'use strict';

{
  /* スマホでの100vhの見え方の違いを調節（#main-visual) */
  let vh = window.innerHeight * 0.01;
  
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  
}
