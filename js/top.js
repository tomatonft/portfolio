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
  
// -----------
//  particlesJS
// -----------

const particles = ["particles-js-1", "particles-js-2"];

for (let i = 0; i < particles.length; i++) {

  particlesJS(particles[i], {
    "particles":{
      "number":{
        "value":30,//この数値を変更すると桜の数が増減できる
        "density":{
          "enable":true,
          "value_area":1121.6780303333778
        }
      },
      "color":{
        "value":"#fff"
      },
      "shape":{
        "type":"image",//形状は画像を指定
        "stroke":{
          "width":0,
        },
        "image":{
          "src":"img/flower.png",//【重要】画像を指定！桜の画像を設定してください。
          "width":120,
          "height":120
        }
      },
      "opacity":{
        "value":0.06409588744762158,
        "random":true,
        "anim":{
          "enable":false,
          "speed":1,
          "opacity_min":0.1,
          "sync":false
        }
      },
      "size":{
        "value":8.011985930952697,
        "random":true,//サイズをランダムに
        "anim":{
          "enable":false,
          "speed":4,
          "size_min":0.1,
          "sync":false
        }
      },
      "line_linked":{
        "enable":false,
      },
      "move":{
        "enable":true,
        "speed":7,//この数値を小さくするとゆっくりな動きになる
        "direction":"bottom-right",//右下に向かって落ちる
        "random":false,//動きはランダムにしない
        "straight":false,//動きをとどめない
        "out_mode":"out",//画面の外に出るように描写
        "bounce":false,//跳ね返りなし
        "attract":{
          "enable":false,
          "rotateX":281.9177489524316,
          "rotateY":127.670995809726
        }
      }
    },
    "interactivity":{
      "detect_on":"canvas",
      "events":{
        "onhover":{
          "enable":false,
        },
        "onclick":{
          "enable":false,
        },
        "resize":true
      }
    },
    "retina_detect":false
  });
}
})

}