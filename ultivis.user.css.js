let css = '\
  .navBar {\
    border: 1px solid black;\
    background: teal;\
    height: 20px;\
    width: 100%;\
    display: table;\
  }\
  .testContainer {\
    border: 1px solid black;\
    background: red;\
    height: 20px;\
    width: 100%;\
    display: table;\
  }\
  .table {\
    display: table;\
    overflow: hidden;\
    width: 100%;\
    height: 30px;\
  }\
  .trow {\
    display: table-row;\
    overflow: hidden;\
  }\
  .tcell {\
    display: table-cell;\
    overflow: hidden;\
  }\
  .w15 {\
    width: 15px;\
  }\
  .w30 {\
    width: 30px;\
  }\
  .w60 {\
    width: 60px;\
  }\
  .w120 {\
    width: 120px;\
  }\
  .border {\
    border: 1px solid black;\
  }\
  button {\
    position: absolute;\
  }\
  .navBarContainer {\
    \
  }\
  #controlPanel {\
    background:#ffa;\
    width: calc(100% - 16px);\
    position: absolute;\
    display: none;\
  }\
  #inlineConsole {\
    border: 1px solid black;\
    height: 20px;\
  }\
';
let style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}
parent = document.head || document.querySelector('head');
parent.appendChild(style);