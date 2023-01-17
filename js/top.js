'use strict';

{
// -----------
//  header-navを最下部で非表示にする
//  scroll-bar をスクロール量500で非表示にする
// -----------
const header = document.querySelector('header').offsetHeight; //header高さ
const bodyHeight = document.body.clientHeight // bodyの高さを取得
const windowHeight = window.innerHeight // windowの高さを取得
const bottomPoint = bodyHeight - windowHeight - header; // ページ最下部までスクロールしたかを判定するための位置を計算(headerが浮いているため追加で引く)
const headerNav = document.getElementById('header-nav');
const scrollBar = document.querySelector('span.scroll');


window.addEventListener('scroll', () => {
  const currentPos = window.pageYOffset // スクロール量を取得
  if (bottomPoint <= currentPos) { // スクロール量が最下部の位置を過ぎたかどうか
    headerNav.classList.add('hidden');
  } else {
    headerNav.classList.remove('hidden');
  }

  if (currentPos > 500) {
    scrollBar.classList.add('hidden');
  } else {
    scrollBar.classList.remove('hidden');
  }
})

}