const el = document.getElementsByClassName("floating")[0]
let timer = null;
let scrollTimer = null;

function slideUp(){
  clearTimeout(timer)
  let currentHeight = el.clientHeight
  console.log(currentHeight)
  if (currentHeight >= 1){
    let res = currentHeight - 1;
    el.style.height = res + "px";
    slideUp_timer = setTimeout(() => {
      slideUp(res)
    }, 1);
  } else {
    clearTimeout(timer)
    el.style.height = '0px'
    el.style.visibility = 'hidden'
  }
}

controlScroll = () => {
  clearTimeout( scrollTimer )
	scrollTimer = setTimeout(() => {
		slideUp()
	}, 100 );
}

window.addEventListener( 'scroll', controlScroll, false )



// //----------------------------------------------------------------------
// //
// //  Imports
// //
// //----------------------------------------------------------------------

// // CSS IMPORT
// import '../../css/sp/index.scss';

// //----------------------------------------------------------------------
// //
// //  Variables
// //
// //----------------------------------------------------------------------

// let jobTab;
// let agentTab;
// let floatTab;
// let floatBtn;

// let jobContents;
// let agentContents;

// let tabFloatLimitTop;
// let tabFloatLimitBottom;
// let btnFloatLimitTop;
// let btnFloatLimitBottom;

// let tabFloatLimitTopPos = 0;
// let tabFloatLimitBottomPos = 0;
// let btnFloatLimitTopPos = 0;
// let btnFloatLimitBottomPos = 0;

// let nowPositionY = 0;

// let slideDownTimer;
// let slideUpTimer;

// //----------------------------------------------------------------------
// //
// //  Utils
// //
// //----------------------------------------------------------------------

// // アニメーション
// const animation = new class {
//   slideDown(element, positionNum, position) {
//     clearTimeout(slideUpTimer);
//     if (positionNum < 0) {
//       const changeNum = positionNum + 1;
//       if (position === 'top') {
//         element.style.top = `${changeNum}px`;
//       } else {
//         element.style.bottom = `${changeNum}px`;
//       }
//       slideDownTimer = setTimeout(animation.slideDown, 1, element, changeNum, position);
//     } else {
//       clearTimeout(slideDownTimer);
//       if (position === 'top') {
//         element.style.top = `${positionNum}px`;
//       } else {
//         element.style.bottom = `${positionNum}px`;
//       }
//     }
//   }
//   slideUp(element, positionNum, position) {
//     clearTimeout(slideDownTimer);
//     const limitNum = Number(element.clientHeight);
//     if (positionNum < limitNum) {
//       const changeNum = positionNum + 1;
//       if (position === 'top') {
//         element.style.top = `-${changeNum}px`;
//       } else {
//         element.style.bottom = `-${changeNum}px`;
//       }
//       slideUpTimer = setTimeout(animation.slideDown, 1, element, changeNum, position);
//     } else {
//       clearTimeout(slideUpTimer);
//       if (position === 'top') {
//         element.style.top = `-${limitNum}px`;
//       } else {
//         element.style.bottom = `-${limitNum}px`;
//       }
//       element.style.visibility = 'hidden';
//     }
//   }
// }();
// // フローティング制御処理
// const dispfloatMenu = new class {
//   // 表示判定
//   displayJudge(element, topPos, bottomPos, position, opposite) {
//     const isUp = (nowPositionY - window.pageYOffset) > 0;
//     nowPositionY = window.pageYOffset;
//     const visibility = window.getComputedStyle(element).getPropertyValue('visibility');
//     const bottomScrollPos = window.pageYOffset + window.parent.screen.height;

//     if ((window.pageYOffset <= topPos || bottomPos <= bottomScrollPos) && visibility === 'visible') {
//       dispfloatMenu.hide(element, position);
//     } else if ((topPos <= window.pageYOffset && bottomScrollPos <= bottomPos) && visibility === 'hidden') {
//       if ((!opposite && !isUp) || (opposite && isUp)) dispfloatMenu.show(element, position);
//     } else if ((topPos <= window.pageYOffset && bottomScrollPos <= bottomPos) && visibility === 'visible') {
//       if (opposite && !isUp) dispfloatMenu.hide(element, position);
//     }
//   }
//   // 表示
//   show(element, position) {
//     const height = element.clientHeight;
//     const positionNum = Number(`-${height}`);
//     if (position === 'top') {
//       element.style.top = `${positionNum}px`;
//     } else {
//       element.style.bottom = `${positionNum}px`;
//     }
//     element.style.visibility = 'visible';
//     animation.slideDown(element, positionNum, position);
//   }
//   // 非表示
//   hide(element, position) {
//     const positionNum = Number(window.getComputedStyle(element).getPropertyValue(position).replace(/px/g, ''));
//     animation.slideUp(element, positionNum, position);
//   }
// }();
// // タブ切り替え制御処理
// const changeTabContents = new class {
//   // 表示判定
//   displayJudge(tab) {
//     const self = tab.currentTarget;
//     const isJob = self.classList.contains('js-tab__job');

//     if ((window.getComputedStyle(jobContents[0]).getPropertyValue('display') === 'none') && isJob) {
//       changeTabContents.hide(agentContents[0], agentTab);
//       changeTabContents.show(jobContents[0], jobTab);
//       changeTabContents.getHeight();
//     } else if ((window.getComputedStyle(agentContents[0]).getPropertyValue('display') === 'none') && !isJob) {
//       changeTabContents.hide(jobContents[0], jobTab);
//       changeTabContents.show(agentContents[0], agentTab);
//       changeTabContents.getHeight();
//     }
//   }
//   // 表示
//   show(element, tab) {
//     for (let i = 0; i < tab.length; i += 1) {
//       tab[i].classList.add('is-current');
//     }
//     element.style.opacity = 0;
//     element.style.display = 'block';
//     element.classList.remove('fadeout');
//     element.classList.add('fadein');
//   }
//   // 非表示
//   hide(element, tab) {
//     for (let i = 0; i < tab.length; i += 1) {
//       tab[i].classList.remove('is-current');
//     }
//     element.classList.remove('fadein');
//     element.classList.add('fadeout');
//     element.style.display = 'none';
//   }
//   // コンテンツの高さが変わるのでフローティング用の座標を再計算
//   getHeight() {
//     tabFloatLimitTopPos = tabFloatLimitTop[0].offsetTop + tabFloatLimitTop[0].offsetHeight;
//     tabFloatLimitBottomPos = tabFloatLimitBottom[0].offsetTop;
//     btnFloatLimitTopPos = btnFloatLimitTop[0].offsetTop + btnFloatLimitTop[0].offsetHeight;
//     btnFloatLimitBottomPos = btnFloatLimitBottom[0].offsetTop;
//   }
// }();

// //----------------------------------------------------------------------
// //
// //  Event handlers
// //
// //----------------------------------------------------------------------

// window.onload = () => {
//   jobTab = document.getElementsByClassName('js-tab__job');
//   agentTab = document.getElementsByClassName('js-tab__agent');
//   jobContents = document.getElementsByClassName('js-jobBody');
//   agentContents = document.getElementsByClassName('js-agentBody');
//   floatTab = document.getElementsByClassName('js-tab__float');
//   floatBtn = document.getElementsByClassName('js-btn__float');
//   agentContents[0].style.display = 'none';

//   tabFloatLimitTop = document.getElementsByClassName('js-tabMenu__limitTop');
//   tabFloatLimitBottom = document.getElementsByClassName('js-tabMenu__limitBottom');
//   btnFloatLimitTop = document.getElementsByClassName('js-floatingBtn__limitTop');
//   btnFloatLimitBottom = document.getElementsByClassName('js-floatingBtn__limitBottom');

//   tabFloatLimitTopPos = tabFloatLimitTop[0].offsetTop + tabFloatLimitTop[0].offsetHeight;
//   tabFloatLimitBottomPos = tabFloatLimitBottom[0].offsetTop;
//   btnFloatLimitTopPos = btnFloatLimitTop[0].offsetTop + btnFloatLimitTop[0].offsetHeight;
//   btnFloatLimitBottomPos = btnFloatLimitBottom[0].offsetTop;

//   for (let i = 0; i < jobTab.length; i += 1) {
//     jobTab[i].onclick = e => {
//       e.preventDefault();
//       changeTabContents.displayJudge(e);
//     };
//   }
//   for (let i = 0; i < agentTab.length; i += 1) {
//     agentTab[i].onclick = e => {
//       e.preventDefault();
//       changeTabContents.displayJudge(e);
//     };
//   }
// };

// window.onscroll = () => {
//   dispfloatMenu.displayJudge(floatTab[0], tabFloatLimitTopPos, tabFloatLimitBottomPos, 'top', true);
//   dispfloatMenu.displayJudge(floatBtn[0], btnFloatLimitTopPos, btnFloatLimitBottomPos, 'bottom', false);
// };