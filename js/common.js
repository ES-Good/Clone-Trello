let boxAddBoard = document.querySelector('#box-add-board');
let container = document.querySelector('.container');
let store = {};
let localStore = localStorage.getItem('store');

if (localStore) {
  store = JSON.parse(localStore);
  for (let key in store){
    let box = document.createElement('div');
    box.classList.add('box','box_board');
    box.innerHTML = `<h3 class='box_board__title'>${key}</h3>
                      <div class="close-button">Delete</div>`;
    container.append(box);
  }
}

let boxAddBoardContent = {
  title: 'Creating a board',
  subTitle: 'What shall we call the board?',

  createBoxContant (){
    boxAddBoard.innerHTML = `
                              <h3 class="box__title">${this.title}</h3>
                              <h4>${this.subTitle}</h4>
                              <input type="text" class="input-title-board">
                              <div class="box__inner-button">
                                <button id="cancel-button" class="box__button">Cancel</button>
                                <button id="create-button" class="box__button">Create</button>
                              </div>`
                          },
  removeBoxContant (){
     boxAddBoard.innerHTML = '<h3 class="box__title">Create a new board...</h3>';
  }
}

boxAddBoard.onclick = function () {
  if (boxAddBoard.classList.contains('open') == false) {
    boxAddBoardContent.createBoxContant();
    boxAddBoard.classList.add('open');
  }
}

document.onchange = () => { //-------------------------------------------события при потери фокуса input
  if (event.target.classList.contains('input-title-board')) {
    createBoxBoard();
  }else if (event.target.classList.contains('input-name-list')) {
      createList();
      closeAddList();
  }
}

document.onclick = function (event) { //---------------------------------клики
  if (event.target.id == 'cancel-button') {
    boxAddBoardContent.removeBoxContant();
    boxAddBoard.classList.remove('open');
  }else if (event.target.id == 'create-button') {
    createBoxBoard();
  }else if (event.target.innerText == 'Delete') {
    let thisBoard = event.target.parentNode;
    thisBoard.remove();
    removeBoard(thisBoard.firstChild.innerText);
  }else if (event.target.classList.contains('box_board') || event.target.classList.contains('box_board__title')) {
    if (event.target.classList.contains('box_board')) {
      creteBoardContent(event.target.firstChild.innerText);
    }else if (event.target.classList.contains('box_board__title')) {
      creteBoardContent(event.target.innerText);
    }
  }else if (event.target.classList.contains('main__add-list__title')) {
    createlistAddOpen();
    document.querySelector('.input-name-list').focus();
  }else if (event.target.classList.contains('close-block') || event.target.classList.contains('close-block__line')) {
    closeAddList();
  }
}

function createBoxBoard() {
  if (checkValueInput(document.querySelector('.input-title-board'))) {
        let title = document.querySelector('.input-title-board');
        let titleValue = title.value;
        let box = document.createElement('div');
        box.classList.add('box','box_board');
        box.innerHTML = `<h3 class='box_board__title'>${titleValue}</h3>
                          <div class="close-button">Delete</div>`;
        container.append(box);
        store[titleValue] = {};
        localStorage.setItem('store', JSON.stringify(store));
        title.value = '';
  }
}

function removeBoard(nameBoard) {
  delete store[nameBoard];
  localStorage.setItem('store', JSON.stringify(store));
}

function creteBoardContent(nameBoard) {

document.body.innerHTML = `<header class='header-board'>
                          <h1 class='header-board__title'>${nameBoard}</h1>
                          <a href="index.html" class="header-board__bloc-back">
                            <?xml version="1.0" encoding="iso-8859-1"?>
                              <svg class="header-board__bloc-back__ico" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 viewBox="0 0 492 492" xml:space="preserve">
                              <g>
                                <g>
                                  <path d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124
                                    c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844
                                    L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412
                                    c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008
                                    c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788
                                    C492,219.198,479.172,207.418,464.344,207.418z"/>
                                </g>
                              </g>
                            </svg>
                          </a>
                      </header>
                      <div class="main"></div>`;

let main = document.querySelector('.main');
let listAdd = document.createElement('div');
listAdd.classList.add('main__add-list');

listAdd.append(createlistAddClose());

main.append(listAdd);
}

function createlistAddClose() {
  let listTitle = document.createElement('h2');
  listTitle.classList.add('main__add-list__title');
  listTitle.innerText = 'Add a list...';
  return listTitle;
}

function createlistAddOpen() {
  let listAdd = document.querySelector('.main__add-list');
  listAdd.classList.add('main__add-list_open');
  listAdd.innerHTML = `<input type='text' class="input-name-list">
                       <div class="close-block">
                        <div class="close-block__line close-block__line__line-1"></div>
                        <div class="close-block__line close-block__line__line-2"></div>
                       </div>`;
}

function closeAddList() {
  let listAdd = document.querySelector('.main__add-list');
  listAdd.classList.remove('main__add-list_open');
  listAdd.innerHTML = `<h2 class="main__add-list__title">Add a list...</h2>`;
}

function checkValueInput(inputClass) {
  let value = inputClass.value;
  if (value == "") {
    return false;
  }else{
    return true;
  }
}

function  createList() {
  let main = document.querySelector('.main');
  let titleList = document.querySelector('.input-name-list').value;
  saveLocalStoreStorage(titleList);
  if (main.firstChild.classList.contains('main__container-list')) {
    document.querySelector('.main__container-list').append(createListContent(titleList));
  }else{
    main.prepend(creteContainerList());
    document.querySelector('.main__container-list').append(createListContent(titleList));
  }
}

function creteContainerList() {
  let containerList = document.createElement('div');
  containerList.classList.add('main__container-list');
  return containerList;
}

function createListContent(titleList) {
  let htmlContentList = `   <h3 class="main__container-list__list__title">${titleList}</h3>
                            <input type="text" class="main__container-list__input">`
  let list = document.createElement('div');
  list.classList.add('main__container-list__list');

  list.innerHTML = htmlContentList
  return list;
}

function saveLocalStoreStorage(kayName) {
  let nameObject = document.querySelector('.header-board__title').innerText;
  let a = JSON.parse(localStorage.getItem('store'));
  a[nameObject][kayName] = [];
  localStorage.setItem('store',JSON.stringify(a))
  console.log(a);
}