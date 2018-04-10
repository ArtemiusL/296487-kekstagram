'use strict';
var OBJECTS_AMOUNT = 25;

function createPhoto(i, comments, description) {
  var pictureInfo = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: generateRandomNumber(15, 200),
    comments: generateRandomArray(comments),
    description: generateRandomArray(description)
  };
  return pictureInfo;
}

function generateRandomNumber(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;

}

function generateRandomArray(array) {
  var newArray = [];
  for (var i = 0; i < 2; i++) {
    newArray[i] = array[generateRandomNumber(1, 5)];
  }
  return newArray;
}

var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var description = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var pictureList = [];

for (var i = 0; i < OBJECTS_AMOUNT; i++) {
  pictureList[i] = createPhoto(i, comments, description);
}

function loadingPictures(picturesList, photosTemplate) {
  var pictureElement = photosTemplate.cloneNode(true);
  pictureElement.querySelector('img').src = picturesList.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = picturesList.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = picturesList.comments.length;
  return pictureElement;
}

var picturesContainer = document.querySelector('.pictures');
var photosTemplate = document.querySelector('#picture').content;
var fragment = document.createDocumentFragment();

for (i = 0; i < OBJECTS_AMOUNT; i++) {
  fragment.appendChild(loadingPictures(pictureList[i], photosTemplate));
}
picturesContainer.appendChild(fragment);


function loadingBigPicture(picture, bigPicture) {
  bigPicture.querySelector('.big-picture__img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  var socialComments = bigPicture.querySelector('.social__comments');
  socialComments.textContent = '';
  for (i = 0; i < picture.comments.length; i++) {
    var comment = '<li class="social__comment social__comment--text">' +
       '<img class="social__picture" src="img/avatar-' + generateRandomNumber(1, 6) + '.svg" ' +
       'alt="Аватар комментатора фотографии" width="35" height="35">' + picture.comments[i] + '</li>';
    socialComments.insertAdjacentHTML('beforeend', comment);
  }
}

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

loadingBigPicture(pictureList[0], bigPicture);

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
