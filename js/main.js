'use strict';

{
  // ----------------
  // スマホでの100vhの見え方の違いを調節（hero) 
  // ----------------
  let vh = window.innerHeight * 0.01;
  
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // ----------------
  // スムーススクロール
  // ----------------
  const anchors = document.querySelectorAll('a[href^="#"]'); 
  const header = document.querySelector('header').offsetHeight; //header高さ
  const urlHash = location.hash; // URLのアンカー（#以降の部分）を取得

    // 各 anchor にクリックイベント
    for ( let i = 0; i < anchors.length; i++ ) {
      anchors[i].addEventListener('click', (e) => {
        e.preventDefault();  //デフォルトのクリックイベント無効化

      // 各 anchor の href属性取得
      const href= anchors[i].getAttribute("href");

      // topに戻る以外のアンカー
      if (href !== '#') {

        // スクロール先の要素を取得 （アンカーの リンク先 #.. の # を取り除いた名前と一致する id名の要素）
        const target = document.getElementById(href.replace('#', ''));

        // スクロール先の要素の位置を取得
        const position = window.pageYOffset + target.getBoundingClientRect().top;
        

        // スクロールアニメーション
        window.scroll({
          top: position,      // スクロール先要素の左上までスクロール
          behavior: 'smooth'  // スクロールアニメーション
        });

      // topに戻る
      } else {
        // スクロールアニメーション
        window.scroll({
          top: 0,  // スクロール先
          behavior: 'smooth'    // スクロールアニメーション
        });
      }
    });
  }

  // ----------------
  // 交差監視API
  // ----------------
  function callback(entries, obs) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('appear');
      obs.unobserve(entry.target);
    });
  }

  const options = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver(callback, options);

  const targets = document.querySelectorAll('.animate');
 

  targets.forEach(target => {
    observer.observe(target);
  });

  // ----------------
  //  ハンバーガ―メニュー 
  // ----------------
  const hamburger = document.getElementById('hamburger');
  const navi = document.getElementById('navi');
  const menu = document.querySelectorAll("ul.hamburger-menu a");

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navi.classList.toggle('active');
  });

  for (let i = 0; i <= 4; i++) {
    menu[i].addEventListener('click', () => {
      navi.classList.remove('active');
      hamburger.classList.toggle('active');
    });
  }

// ----------------
// canvasによる波線複数描画
// ----------------
let unit = 100,
    canvasList, // キャンバスの配列
    info = {}, // 全キャンバス共通の描画情報
    colorList; // 各キャンバスの色情報

/**
 * Init function.
 * 
 * Initialize variables and begin the animation.
 */
function init() {
    info.seconds = 0;
    info.t = 0;
    canvasList = [];
    colorList = [];
   
    const canvasWaves = document.querySelectorAll('canvas');
    canvasWaves.forEach(canvasWave => {
      canvasList.push(canvasWave);
      colorList.push(['#E5AAB4', '#C1CD75', '#e5aab4', '#6e9452', '#baa298']);//重ねる波線の色設定
    });

  
    // 各キャンバスの初期化
    for(const canvasIndex in canvasList) {
        const canvas = canvasList[canvasIndex];
        canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
        canvas.height = 200;//波の高さ
        canvas.contextCache = canvas.getContext("2d");
    }
    // 共通の更新処理呼び出し
    update();
}

function update() {
    for(const canvasIndex in canvasList) {
        const canvas = canvasList[canvasIndex];
        // 各キャンバスの描画
        draw(canvas, colorList[canvasIndex]);
    }
    // 共通の描画情報の更新
    info.seconds = info.seconds + .014;
    info.t = info.seconds*Math.PI;
    // 自身の再起呼び出し
    setTimeout(update, 35);
}

/**
 * Draw animation function.
 * 
 * This function draws one frame of the animation, waits 20ms, and then calls
 * itself again.
 */
function draw(canvas, color) {
    // 対象のcanvasのコンテキストを取得
    const context = canvas.contextCache;
    // キャンバスの描画をクリア
    context.clearRect(0, 0, canvas.width, canvas.height);

    //波を描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
    drawWave(canvas, color[0], 0.8, 3, 0);
    drawWave(canvas, color[1], 0.5, 4, 0);
    drawWave(canvas, color[2], 0.3, 1.6, 0);
    drawWave(canvas, color[3], 0.2, 3, 100);
    drawWave(canvas, color[4], 0.8, 2, 0);
}

/**
* 波を描画
* drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawWave(canvas, color, alpha, zoom, delay) {
  const context = canvas.contextCache;
    context.strokeStyle = color;//線の色
    context.lineWidth = 2;//線の幅
  // context.lineWidth = 1;//線の幅
    context.globalAlpha = alpha;
    context.beginPath(); //パスの開始
    drawSine(canvas, info.t / 0.5, zoom, delay);
    context.stroke(); //線
}

/**
 * Function to draw sine
 * 
 * The sine curve is drawn in 10px segments starting at the origin. 
 * drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
 */
function drawSine(canvas, t, zoom, delay) {
    const xAxis = Math.floor(canvas.height/2);
    const yAxis = 0;
    const context = canvas.contextCache;
    // Set the initial x and y, starting at 0,0 and translating to the origin on
    // the canvas.
    let x = t; //時間を横の位置とする
    let y = Math.sin(x)/zoom;
    context.moveTo(yAxis, unit*y+xAxis); //スタート位置にパスを置く

    // Loop to draw segments (横幅の分、波を描画)
    for (let i = yAxis; i <= canvas.width + 10; i += 10) {
        x = t+(-yAxis+i)/unit/zoom;
        y = Math.sin(x - delay)/3;
        context.lineTo(i, unit*y+xAxis);
    }
}

init();

// ----------------
// slider
// ----------------
const mySwiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    spaceBetween: 48,
    slidesPerView: 1.1,
  breakpoints: {
    // 768px以上の場合
    768: {
      slidesPerView: 2.3
    }
  },
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
     
    },
   
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
   
    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
  });


// -----------
//カーソル変化
// -----------
let cursorR = 4;  //カーソルの半径
const cursor = document.getElementById('cursor');  //カーソル用のdivを取得

//上記のdivタグをマウスに追従させる処理
document.addEventListener('mousemove', function (e) {
    cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});


// swiper ボタンhover時の変化
const swiperBtns = document.querySelectorAll('.swiper-buttons > div');
for (let i = 0; i < swiperBtns.length; i++) {
  swiperBtns[i].addEventListener('mouseover', function (e) {
      cursor.classList.add('hover');
      if (swiperBtns[i].className === 'swiper-button-prev') {
        cursor.textContent = 'Prev';
      } else {
        cursor.textContent = 'Next';
      }
  });
  swiperBtns[i].addEventListener('mouseout', function (e) {
      cursor.classList.remove('hover');      
      cursor.textContent = '';
  });
}

// swiper リンクhover時の変化
const linkElem = document.querySelectorAll('.item > a');
for (let i = 0; i < linkElem.length; i++) {
    linkElem[i].addEventListener('mouseover', function (e) {
        cursor.classList.add('hov_');
        cursor.textContent = 'Learn More';
    });
    linkElem[i].addEventListener('mouseout', function (e) {
        cursor.classList.remove('hov_');      
        cursor.textContent = '';
    });
}

// hamburger hover時の変化
hamburger.addEventListener('mouseover', function (e){
  cursor.classList.add('hover');
  cursor.textContent = 'Menu';
  if (hamburger.className === 'active') {
    cursor.textContent = 'Close';
  }
});

hamburger.addEventListener('mouseout', function (e){
  cursor.classList.remove('hover');      
  cursor.textContent = '';
});


//スマホ表示はカーソルをdefaultにする
const html = document.querySelector('html');
const body = document.querySelector('body');
const a = document.querySelectorAll('a');

if (window.innerWidth < 429) {
  cursor.style.visibility = 'hidden';
  html.style.cursor = 'default';
  body.style.cursor = 'default';
  for (let i = 0; i < a.length; i++) {
    a[i].style.cursor = 'default';
  }
} else {
  cursor.style.visibility = 'visible';
}


// -----------
//  profile
//  アコーディオン
// -----------
const dts = document.querySelectorAll('dt');

  dts.forEach(dt => {
    dt.addEventListener('click', () => {
      dt.parentNode.classList.toggle('appear');
        dts.forEach(el => {
          if (dt !== el) {
            el.parentNode.classList.remove('appear');
          }
        });
    });
  });

// -----------
//  loading
//  animation
// -----------

  window.onload = function() {
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');
  }


}
