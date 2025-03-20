(()=>{"use strict";var e={56:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},72:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var i={},a=[],s=0;s<e.length;s++){var d=e[s],l=r.base?d[0]+r.base:d[0],c=i[l]||0,h="".concat(l," ").concat(c);i[l]=c+1;var p=n(h),u={css:d[1],media:d[2],sourceMap:d[3],supports:d[4],layer:d[5]};if(-1!==p)t[p].references++,t[p].updater(u);else{var m=o(u,r);r.byIndex=s,t.splice(s,0,{identifier:h,updater:m,references:1})}a.push(h)}return a}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var i=r(e=e||[],o=o||{});return function(e){e=e||[];for(var a=0;a<i.length;a++){var s=n(i[a]);t[s].references--}for(var d=r(e,o),l=0;l<i.length;l++){var c=n(i[l]);0===t[c].references&&(t[c].updater(),t.splice(c,1))}i=d}}},113:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},208:(e,t,n)=>{n.d(t,{A:()=>s});var r=n(601),o=n.n(r),i=n(314),a=n.n(i)()(o());a.push([e.id,':root {\n    --cell-size: 2rem;\n    --color-blue: rgb(50, 81, 255); \n    --color-green: rgb(47, 184, 47);\n    --color-red: rgb(250, 54, 54); \n}\n\nbody {     \n    display: grid;\n    justify-content: center; \n    margin: 0;\n    user-select: none; \n    font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;\n    color: rgb(83, 81, 81);\n    letter-spacing: 1px;\n}\n\nheader {\n    position: absolute;\n    left: 50%;\n    transform: translateX(-50%);\n    font-size: 1.5rem;\n    letter-spacing: 4px;\n    font-weight: bold;\n    padding: 2rem;    \n    color: rgb(113, 180, 133);    \n\n    span:nth-child(2) {\n        color:  rgb(113, 148, 201);\n    }\n}\n\nmain { \n    position: relative;  \n    display: flex;\n    gap: 4rem;\n    padding-top: 8rem;\n}\n\n.board-row {\n    display: flex;\n}\n\n.board-title {\n    text-align: center;\n    height: 60px;\n    color:  rgb(110, 161, 110);   \n}\n\n.board-cell,\n.board-cell-nohover {\n    position: relative;\n    width: var(--cell-size);\n    aspect-ratio: 1;  \n    display: grid;\n    justify-content: center;\n    align-items: center;\n    border: solid rgb(230, 227, 227) 1px; \n    cursor: pointer;   \n}\n\n.board-cell:hover {\n    border-color: var(--color-green);\n}\n\n.board-cell-nohover {    \n    cursor: auto;   \n}\n\n.marker-col,\n.marker-row {\n    position: absolute;   \n    width: 100%;\n    text-align: center;   \n    color: rgb(151, 151, 153);\n    pointer-events: none;\n}\n\n.marker-col {\n    top: -1.5rem;\n    left: 0;\n    font-size: 12px;\n}\n\n.marker-row {   \n    left: -2.5rem;\n    font-size: 14px;    \n}\n\n#computer,\n#human {\n    position: relative;\n}\n\n#ships-overlay-computer,\n#ships-overlay-human,\n#ships-overlay-extra {\n    position: absolute;\n    top: 0;\n    left: 0;   \n    width: 100%;\n    height: 100%;\n    pointer-events: none; \n    outline: solid 2px rgb(228, 224, 224);  \n}\n\n#ships-overlay-extra {\n    z-index: 100;\n    outline: none;    \n}\n\n.ship-overlay,\n.ship-overlay-color,\n.ship-overlay-sunk {\n    position: absolute;   \n    pointer-events: none; \n}\n\n.ship-overlay-blue {   \n    background-color: rgba(134, 168, 243, 0.1); \n    outline: solid 2px var(--color-blue);    \n}\n\n.ship-overlay-green {   \n    background-color: rgba(158, 241, 169, 0.1); \n    outline: solid 1px var(--color-green);   \n}\n\n.ship-overlay-red {   \n    background-color: rgba(253, 160, 165, 0.1);   \n    outline: solid 2px var(--color-red);\n}\n\n.cell-shot {\n    background-color: rgba(190, 188, 188, 0.1);\n}\n\n.cell-shot::before {    \n    content: \'•\';   \n    color: black;   \n}\n\n.cell-hit::before { \n    content: "✕";\n    color: var(--color-red);\n    font-size: 1.5rem; \n    display: grid;\n    justify-content: center;\n    align-items: center;            \n}\n\n.notification-wrap { \n    display: grid;\n    justify-items: center;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(170, 168, 168, 0.1); \n}\n\n.notification { \n    display: flex;\n    justify-content: space-between;    \n    align-items: center; \n    width: 25rem;\n    height: 4rem; \n    padding: 0 1.5rem;\n    color: white; \n    font-size: 20px;\n    margin-top: 1rem;  \n}\n\n.notification-win {\n    background-color: var(--color-green);\n}\n\n.notification-lose {\n    background-color: var(--color-red);\n}\n\n.button-rematch {\n    cursor: pointer; \n    border: solid 1px white;   \n    background-color: rgb(230, 216, 24); \n    color: rgb(19, 18, 18);\n    padding: 4px 8px; \n}\n\n.ships-rows {\n    display: grid;\n    gap: 1rem;   \n    height: 260px;   \n}\n\n.ship-draggable {\n    position: absolute;\n    display: flex;\n    width: fit-content; \n    height: fit-content;\n    background-color: rgba(134, 168, 243, 0.1); \n    border: solid 2px var(--color-blue);\n    cursor: move;\n    z-index: 100;\n    left: -2px;\n    top: -1px;\n}\n\n.ship-draggable[data-length="4"] {   \n    padding-right: 6px; \n}\n\n.ship-draggable[data-length="3"] {\n    padding-right: 4px;\n}\n\n.ship-draggable[data-length="2"] {\n    padding-right: 2px;\n}\n\n.ship-draggable-vertical {    \n    position: absolute;\n    background-color: rgba(134, 168, 243, 0.1); \n    border: solid 2px var(--color-blue); \n    width: 2rem;\n    height: 8rem;\n    z-index: 100;    \n}\n\n.ships-row {\n    position: relative;\n    display: flex;\n    gap: 1.5rem;\n}\n\n.ship-box {\n    position: relative;    \n    border: dotted 1px rgb(197, 192, 192);  \n    padding-right: 4px;\n    padding-bottom: 2px;\n}\n\n.ship-box-1,\n.ship-box-2,\n.ship-box-3,\n.ship-box-4 {\n    height: 2rem;\n}\n\n.ship-box-1 {\n    width: 28px;    \n}\n\n.ship-box-2 {\n    width: 62px;   \n}\n\n.ship-box-3 {\n    width: 6rem;   \n}\n\n.ship-box-4 {\n    width: 8rem; \n    padding-right: 6px;    \n}\n\n.draggable-ships-container {\n    display: grid;\n    width: 280px;\n    padding-top: 60px;\n    gap: 2.5rem;\n}\n\n.pre-game-buttons-container {\n    position: absolute;\n    width: 100%;\n    bottom: -3.5rem;\n    display: flex;\n    justify-content: space-between; \n    \n    button {\n        cursor: pointer;     \n        font-size: 1rem;\n        padding: 4px 8px;\n        border: none;\n        border-radius: 4px;        \n    }\n\n    div:nth-child(2) {\n        display: flex;\n        justify-content: space-between;                 \n        width: 340px;\n    }\n}\n\n#button-drag-and-drop { \n    position: absolute;\n    display: none;\n    margin-right: 1rem;   \n    top: -12rem;\n    left: 5rem;   \n    background-color: white;\n    color: var(--color-blue);\n    border: solid 2px var(--color-blue);  \n    font-size: 12px;\n}\n\n#button-randomize {  \n    color:var(--color-blue);\n    background-color: white;\n    border: solid 2px var(--color-blue);  \n}\n\n#button-start-game {\n    color: var(--color-green);\n    background-color: white;\n    border: solid 2px var(--color-green);    \n}\n\nbutton:disabled {\n    opacity: 0.3;\n    cursor: not-allowed;\n}\n\n.ship-cell {\n    width: var(--cell-size);\n    height: var(--cell-size);    \n}\n\n.disabled {\n    pointer-events: none;\n    opacity: 0.1;\n}\n\n.cell-disabled {\n    pointer-events: none; \n}\n\n.board-disabled {\n    pointer-events: none; \n    opacity: 0.4;  \n}\n\n.hidden {\n    visibility: hidden;\n}\n\n#ship-1[data-direction="vertical"] {\n    width: 26px;\n    height: 132px;\n}\n\n.ship-draggable[data-length="3"][data-direction="vertical"] {\n    width: 28px;\n    height: 100px;\n}\n\n.ship-draggable[data-length="2"][data-direction="vertical"] {\n    width: 29px;\n    height: 66px;\n}\n\n.ship-rotation-error {\n    animation: shake 0.82s;   \n    border-color: var(--color-red);\n    background-color: rgba(248, 136, 136, 0.1);\n}\n  \n@keyframes shake {\n    10%, 90% { transform: translate3d(-1px, 0, 0); }\n    20%, 80% { transform: translate3d(2px, 0, 0); }\n    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }\n    40%, 60% { transform: translate3d(4px, 0, 0); }\n}\n\n\n\n\n\n\n\n\n\n\n \n\n\n\n\n\n\n\n\n\n ',""]);const s=a},314:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,o,i){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(r)for(var s=0;s<this.length;s++){var d=this[s][0];null!=d&&(a[d]=!0)}for(var l=0;l<e.length;l++){var c=[].concat(e[l]);r&&a[c[0]]||(void 0!==i&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=i),n&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=n):c[2]=n),o&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=o):c[4]="".concat(o)),t.push(c))}},t}},540:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},601:e=>{e.exports=function(e){return e[1]}},659:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var i=n.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={id:r,exports:{}};return e[r](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0;var r=n(72),o=n.n(r),i=n(825),a=n.n(i),s=n(659),d=n.n(s),l=n(56),c=n.n(l),h=n(540),p=n.n(h),u=n(113),m=n.n(u),g=n(208),b={};b.styleTagTransform=m(),b.setAttributes=c(),b.insert=d().bind(null,"head"),b.domAPI=a(),b.insertStyleElement=p(),o()(g.A,b),g.A&&g.A.locals&&g.A.locals;class f{renderHeaderAndMain(){document.querySelector("body").innerHTML="\n                <header><span>BATTLE</span><span>SHIP</span></header> \n                <main></main>                         \n                "}renderBoard(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;e.innerHTML="";const n=["A","B","C","D","E","F","G","H","I","J"];for(let r=0;r<t;r++){const o=document.createElement("div");o.classList.add("board-row");for(let i=0;i<t;i++){const t=document.createElement("div");if(0===r){const e=document.createElement("div");e.classList.add("marker-col","marker"),e.innerHTML=n[i],t.appendChild(e)}if(0===i){const e=document.createElement("div");e.classList.add("marker-row","marker"),e.innerHTML=r+1,t.appendChild(e)}"human"===e.id?t.classList.add("board-cell-nohover"):t.classList.add("board-cell"),t.setAttribute("data-row",r),t.setAttribute("data-col",i),o.appendChild(t)}e.appendChild(o)}e.append(this.renderShipsOverlay(e.id)),e.append(this.renderExtraShipsOverlay())}renderShipsOverlay(e){const t=document.createElement("div");return t.id=`ships-overlay-${e}`,t}renderExtraShipsOverlay(){const e=document.createElement("div");return e.id="ships-overlay-extra",e}renderShips(e,t){for(const n of t)e.querySelector(`div[data-row='${n.row}'][data-col='${n.col}']`).classList.add("ship")}renderShots(e,t){for(const n of t){const t=n.split(",")[0],r=n.split(",")[1];e.querySelector(`div[data-row='${t}'][data-col='${r}']`).classList.add("cell-shot")}}renderHits(e,t){for(const n of t)e.querySelector(`div[data-row='${n.row}'][data-col='${n.col}']`).classList.add("cell-hit")}renderPlayerSection(e){let t;t="human"===e.type?"Your board":"Opponent's board",document.querySelector("main").innerHTML+=`\n                        <section>\n                            <div class="board-title">${t}</div>\n                            <div id="${e.type}"></div>\n                        </section>                                                 \n                        `}renderNotification(){const e=document.createElement("div");return e.classList.add("notification-wrap"),e.innerHTML='\n                    <div class="notification">                 \n                        <p class="message"></p>\n                        <button class="button-rematch">Rematch</button>\n                    </div>\n                       ',e}renderShipsSection(){document.querySelector("main").innerHTML+='\n                        <section>\n                            <div class="draggable-ships-container">\n                                <div class="draggable-ships-instruction">\n                                    Drag the ships to the board. Click on any ship on the board to rotate.\n                                </div>                           \n                                <div class="ships-rows">                                                  \n                                </div>\n                            </div>\n                        </section>                                                 \n                        '}renderPreGameButtons(){const e=document.querySelector("main"),t=document.createElement("div");t.classList.add("pre-game-buttons-container"),t.innerHTML='\n                                <div>\n                                    <button id="button-drag-and-drop">Drag & Drop</button>                                   \n                                </div>  \n                                <div> \n                                    <button id="button-randomize">Randomize</button>                             \n                                    <button id="button-start-game" data-ship-placement="random" disabled>Start Game</button>\n                                </div>    \n                                ',e.appendChild(t)}}class v{#e=10;constructor(){this.board=this.createBoard(),this.missedAttacks=new Set,this.hits=[],this.ships=[]}createBoard(){const e=[];for(let t=0;t<this.#e;t++){e[t]=[];for(let n=0;n<this.#e;n++)e[t][n]=null}return e}isValidCoordinates(e,t){return e>=0&&t>=0&&e<this.#e&&t<this.#e}isInBounds(e,t,n){let r=t;return"vertical"===n.direction&&(r=e),r+n.length<=this.#e}isEmptySquare(e,t){return null===this.board[e][t]}getShipEdges(e,t,n){const r="horizontal"===n.direction?1:n.length,o="horizontal"===n.direction?n.length:1,i=e+r,a=t-1,s=t+o;let d=[];for(let n=e-1;n<=i;n++)for(let i=a;i<=s;i++)n>=e&&i>=t&&n<e+r&&i<t+o||!this.isValidCoordinates(n,i)||d.push([n,i]);return d}placeShip(e,t){let[n,r]=e;if(!this.isValidCoordinates(n,r)||!this.isInBounds(n,r,t))return!1;for(let e=0;e<t.length;e++){const o="horizontal"===t.direction?n:n+e,i="horizontal"===t.direction?r+e:r;if(!this.isEmptySquare(o,i))return!1;const a=this.getShipEdges(n,r,t);for(const[e,t]of a)if(null!==this.board[e][t]&&"X"!==this.board[e][t])return!1;this.board[o][i]={ship:t,shipStartRow:n,shipStartCol:r,hit:!1}}return this.ships.push({ship:t,row:n,col:r}),!0}receiveAttack(e,t){let n=this.board[e][t];if(null===n)return this.missedAttacks.add(`${e},${t}`),void(this.board[e][t]="Missed shot");if(!0!==n.hit&&"Missed shot"!==n){if(this.board[e][t].hit=!0,this.hits.push({row:e,col:t}),n.ship.hit(),n.ship.isSunk()){const e=this.getShipEdges(n.shipStartRow,n.shipStartCol,n.ship);for(const t of e)this.missedAttacks.add(`${t[0]},${t[1]}`)}return!0}}isAllShipsSunk(){return this.ships.every((e=>e.ship.isSunk()))}isShipExist(e){return this.ships.some((t=>t.ship.id===e.id))}getShipById(e){return this.ships.filter((t=>t.ship.id===e))[0]}updateShipData(e,t,n,r,o){for(const i of this.ships)i.ship.id===e.id&&(i.row=t,i.col=n,i.ship.edges=r,i.ship.direction=o)}getPreviousShipData(e){for(const t of this.ships)if(t.ship.id===e.id)return[t.row,t.col,t.ship.direction,t.ship.edges]}removePreviousShip(e,t,n){for(let r=0;r<e.length;r++){const o="horizontal"===e.direction?t:t+r,i="horizontal"===e.direction?n+r:n;this.board[o][i]=null}}removeShipFromArray(e){return this.ships=this.ships.filter((t=>t.ship.id!==e.id))}isRotationPossible(e,t,n,r){if(this.clearShipEdges(e.edges),2===e.length)for(const t of this.ships)t.ship.id!==e.id&&this.markShipEdges(t.ship.edges);for(let o=1;o<e.length;o++){const i="horizontal"===t?n:n+o,a="horizontal"===t?r+o:r;if(!this.isValidCoordinates(i,a))return!1;if(null!==this.board[i][a])return this.markShipEdges(e.edges),!1}return!0}isDropPossible(e,t,n){if(this.isInBounds(t,n,e)){for(let r=0;r<e.length;r++){const o="horizontal"===e.direction?t:t+r,i="horizontal"===e.direction?n+r:n;if(null!==this.board[o][i])return!1}return!0}}markShipEdges(e){for(const[t,n]of e)this.board[t][n]="X"}clearShipEdges(e){for(const[t,n]of e)this.board[t][n]=null}clearBoard(){this.board=this.createBoard(),this.missedAttacks=new Set,this.hits=[],this.ships=[]}}class y{constructor(e,t){this.type=e,this.gameboard=t}}class S{constructor(e){this.id,this.length=e,this.hits=0,this.sunk=!1,this.direction="horizontal"}isSunk(){return this.hits===this.length&&(this.sunk=!0),this.sunk}hit(){this.hits<this.length&&this.hits++}rotate(){"horizontal"===this.direction?this.direction="vertical":this.direction="horizontal"}}class w{constructor(){this.player1=new y("human",new v),this.player2=new y("computer",new v),this.players=[this.player1],this.currentPlayer=this.player1,this.dom=new f,this.preGameSetup(this.player1)}preGameSetup(e){this.dom.renderHeaderAndMain(),this.dom.renderShipsSection(),this.createDraggableShips(),this.dom.renderPlayerSection(e);const t=document.querySelector(`#${e.type}`);this.dom.renderBoard(t),this.dom.renderPreGameButtons(),this.addListenersPreGameButtons(e),this.handleDragAndDrop(e)}createDraggableShips(){const e=document.querySelector(".ships-rows"),t=[4,3,3,2,2,2,1,1,1,1];let n=1;for(let t=0;t<4;t++){const n=document.createElement("div");n.classList.add("ships-row"),n.id="ships-row-"+t,e.appendChild(n)}for(const e of t){const t=document.createElement("div");t.classList.add("ship-box","ship-box-"+e);const r=document.createElement("div");r.classList.add("ship-draggable"),r.id="ship-"+n++,r.setAttribute("data-length",e),r.setAttribute("data-direction","horizontal"),r.draggable=!0,t.appendChild(r);for(let t=0;t<e;t++){const e=document.createElement("div");e.setAttribute("data-offset",t),e.classList.add("ship-cell"),r.appendChild(e)}const o=document.getElementById("ships-row-0"),i=document.getElementById("ships-row-1"),a=document.getElementById("ships-row-2"),s=document.getElementById("ships-row-3");4===e&&(o.appendChild(t),t.appendChild(r)),3===e&&(i.appendChild(t),t.appendChild(r)),2===e&&(a.appendChild(t),t.appendChild(r)),1===e&&(s.appendChild(t),t.appendChild(r))}}addBoardEventListeners(e,t){const n=e.querySelectorAll("[data-row][data-col]");if("human"!==t.type)for(const e of n)(e.classList.contains("cell-shot")||e.classList.contains("cell-hit"))&&e.classList.add("cell-disabled"),e.onclick=()=>{const n=e.getAttribute("data-row"),r=e.getAttribute("data-col");this.handleShot(n,r,t.gameboard)}}updateBoards(){for(const e of this.players){const t=document.querySelector(`#${e.type}`);this.dom.renderBoard(t),this.dom.renderShips(t,e.gameboard.ships),this.drawShipsOverlay(e),this.dom.renderShots(t,e.gameboard.missedAttacks),this.dom.renderHits(t,e.gameboard.hits),this.addBoardEventListeners(t,e)}}startGame(){for(const e of this.players)this.dom.renderPlayerSection(e);this.updateBoards(),this.placeShipsRandomly(this.player2),this.drawShipsOverlay(this.player2),document.getElementById("human").classList.add("board-disabled")}placeShipsRandomly(e){const t=[4,3,3,2,2,2,1,1,1,1];for(const n of t){const t=new S(n);Math.random()<.5&&t.rotate();let r=!1;for(;!r;){const n=Math.floor(10*Math.random()),o=Math.floor(10*Math.random());r=e.gameboard.placeShip([n,o],t)}}const n=document.querySelector(`#${e.type}`);this.dom.renderShips(n,e.gameboard.ships)}drawShipsOverlay(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=document.getElementById(`ships-overlay-${e.type}`);!1===t&&(n=document.getElementById("ships-overlay-extra"),n.innerHTML=""),n.innerHTML="",e.gameboard.ships.forEach((r=>{if(!r)return;const{ship:o,row:i,col:a}=r,s=document.createElement("div"),d=10,l=i*d,c=a*d;let h,p;if("horizontal"===o.direction?(h=o.length*d,p=d):(h=d,p=o.length*d),s.style.top=`${l}%`,s.style.left=`${c}%`,s.style.width=`${h}%`,s.style.height=`${p}%`,s.classList.add("ship-overlay"),"human"===e.type&&!0===t&&s.classList.add("ship-overlay-blue"),!1===t){if("horizontal"===o.direction){if(c>60&&4===o.length)return;if(c>70&&3===o.length)return;if(c>80&&2===o.length)return;if(c>90&&1===o.length)return}else{if(l>60&&4===o.length)return;if(l>70&&3===o.length)return;if(l>80&&2===o.length)return;if(l>90&&1===o.length)return}s.classList.add("ship-overlay-green")}o.sunk&&s.classList.add("ship-overlay-red"),n.appendChild(s)}))}handleShot(e,t,n){if(n.receiveAttack(e,t))return this.updateBoards(),"computer"===this.currentPlayer.type&&this.handleComputerTurn(),this.updateBoards(),n.isAllShipsSunk()?this.handleWin():void 0;this.updateBoards(),this.switchPlayer()}switchPlayer(){this.currentPlayer=this.currentPlayer===this.player1?this.player2:this.player1,this.currentPlayer===this.player2&&this.handleComputerTurn()}handleComputerTurn(){const e=document.getElementById("human"),t=document.getElementById("computer");e.classList.remove("board-disabled"),t.classList.add("board-disabled"),setTimeout((()=>{const{row:e,col:t}=this.getRandomCoordinates();this.handleShot(e,t,this.player1.gameboard)}),400),setTimeout((()=>{e.classList.add("board-disabled"),t.classList.remove("board-disabled")}),800)}getRandomCoordinates(){let e=Math.floor(10*Math.random()),t=Math.floor(10*Math.random());for(;this.player1.gameboard.missedAttacks.has(`${e},${t}`);)e=Math.floor(10*Math.random()),t=Math.floor(10*Math.random());return this.player1.gameboard.missedAttacks.add(`${e},${t}`),{row:e,col:t}}handleWin(){document.querySelector("body").appendChild(this.dom.renderNotification());const e=document.querySelector(".notification"),t=document.querySelector(".button-rematch"),n=document.querySelector(".message");"computer"===this.currentPlayer.type?(e.classList.add("notification-lose"),n.innerHTML="Game over. You lose."):(e.classList.add("notification-win"),n.innerHTML="Game over. You win."),t.addEventListener("click",(()=>{for(const e of this.players)e.gameboard.clearBoard();location.reload()}))}addListenersPreGameButtons(e){const t=document.querySelector("main"),n=document.querySelector(`#${e.type}`),r=document.getElementById("button-randomize"),o=document.getElementById("button-drag-and-drop"),i=document.getElementById("button-start-game"),a=document.querySelector(".ships-rows");r.onclick=()=>{e.gameboard.clearBoard(),this.dom.renderBoard(n),this.placeShipsRandomly(e),this.drawShipsOverlay(e),a.innerHTML="",this.createDraggableShips(),a.classList.add("disabled"),o.style.display="block",i.disabled=!1},o.onclick=()=>{t.innerHTML="",e.gameboard.clearBoard(),this.preGameSetup(e),a.classList.remove("disabled"),o.style.display="none",i.disabled=!0},i.onclick=n=>{const r=n.target.getAttribute("data-ship-placement");if(t.innerHTML="","manual"===r){const t=e.gameboard.ships;e.gameboard.clearBoard(),e.gameboard.ships=t;for(const n of t)e.gameboard.placeShip([n.row,n.col],n.ship);return this.players.push(this.player2),void this.startGame()}this.players.push(this.player2),this.startGame()}}handleDragAndDrop(e){const t=document.querySelector("body"),n=document.querySelectorAll("div[data-col][data-row]"),r=document.querySelectorAll(".ship-draggable"),o=new y("human",new v);let i,a,s,d;for(const t of r){const r=t.childNodes;let l=null;t.addEventListener("drag",(n=>{l=n.target;const r=e.gameboard.getPreviousShipData(l);if(r){let t=e.gameboard.getShipById(l.id);e.gameboard.removePreviousShip(t.ship,r[0],r[1]),e.gameboard.clearShipEdges(r[3]);for(const t of e.gameboard.ships)t.ship.id!==l.id&&e.gameboard.markShipEdges(t.ship.edges)}n.target.classList.add("hidden"),d=l.id,a=Number(t.getAttribute("data-length")),s=t.getAttribute("data-direction")}));for(const e of r)e.addEventListener("mouseover",(e=>{i=e.target.getAttribute("data-offset")}));for(const t of n)t.addEventListener("dragover",(t=>{if(t.preventDefault(),t.target.classList.contains("ship-cell")||t.target.classList.contains("ship-draggable"))return;const n=Number(t.target.getAttribute("data-row")),r=Number(t.target.getAttribute("data-col"));o.gameboard.ships=[];const l=[],c="horizontal"===s?r-i:r;c<10&&c>=0&&n>=0&&l.push([n,c]);const h=l[0];if(void 0===h)return;let p=new S(a);return p.direction=s,p.id=d,o.gameboard.ships.push({ship:p,row:h[0],col:h[1]}),e.gameboard.isDropPossible(p,h[0],h[1])?(this.drawShipsOverlay(o,!1),o):void 0}));t.addEventListener("dragend",(t=>{const n=document.querySelectorAll(".ship-overlay-green");if(0===n.length)return t.target.classList.remove("hidden");for(const e of n)e.classList.remove("ship-overlay-green");let r=o.gameboard.ships[0];if(e.gameboard.isShipExist(r.ship)){const t=e.gameboard.getPreviousShipData(r.ship);e.gameboard.removePreviousShip(r.ship,t[0],t[1]),e.gameboard.clearShipEdges(t[3]),e.gameboard.removeShipFromArray(r.ship),r.ship.edges=e.gameboard.getShipEdges(r.row,r.col,r.ship),e.gameboard.updateShipData(r.ship,r.row,r.col,r.ship.edges),e.gameboard.placeShip([r.row,r.col],r.ship),e.gameboard.markShipEdges(r.ship.edges)}else e.gameboard.placeShip([r.row,r.col],r.ship),r.ship.edges=e.gameboard.getShipEdges(r.row,r.col,r.ship),e.gameboard.markShipEdges(r.ship.edges);for(const t of e.gameboard.ships)e.gameboard.markShipEdges(t.ship.edges);if(document.querySelector(`[data-row="${r.row}"][data-col="${r.col}"]`).appendChild(l),l.classList.remove("hidden"),10===e.gameboard.ships.length){const e=document.getElementById("button-start-game");e.setAttribute("data-ship-placement","manual"),e.disabled=!1}l.onclick=()=>{s=l.getAttribute("data-direction"),s="horizontal"===s?"vertical":"horizontal";const t=e.gameboard.getPreviousShipData(r.ship);if(!e.gameboard.isRotationPossible(r.ship,s,t[0],t[1]))return l.classList.add("ship-rotation-error"),void setTimeout((()=>{l.classList.remove("ship-rotation-error")}),400);l.setAttribute("data-direction",s),e.gameboard.removePreviousShip(r.ship,t[0],t[1]),e.gameboard.clearShipEdges(t[3]),e.gameboard.removeShipFromArray(r.ship),r.ship.direction=s,r.ship.edges=e.gameboard.getShipEdges(r.row,r.col,r.ship),e.gameboard.updateShipData(r.ship,r.row,r.col,r.ship.edges,r.ship.direction),e.gameboard.placeShip([r.row,r.col],r.ship),e.gameboard.markShipEdges(r.ship.edges);for(const t of e.gameboard.ships)e.gameboard.markShipEdges(t.ship.edges)}}))}t.addEventListener("dragenter",(()=>{const e=document.querySelectorAll(".ship-overlay-green");for(const t of e)t.classList.remove("ship-overlay-green")}))}}window.addEventListener("DOMContentLoaded",(()=>new w))})();