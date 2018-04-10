'use strict';
var OBJECTS_AMOUNT = 25;

function createPhoto(i, comments, description) {
  var pictureInfo = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: Math.floor(15 + generateRandomNumber(1000, 185)),
    comments: generateRandomText(comments),
    description: generateRandomText(description)
  };
  return pictureInfo;
}

function generateRandomNumber(ratio, module) {
  return (Math.random() * ratio) % module;
}

function generateRandomText(commentsArray) {
  var textArray = [];
  for (var i = 0; i < commentsArray.length; i++) {
    textArray[i] = commentsArray[Math.floor(generateRandomNumber(10, commentsArray.length))];
  }
  return textArray;
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
  pictureElement.querySelector('.picture__stat--comments').textContent = picturesList.comments;
  return pictureElement;
}

var pictureUpload = document.querySelector('.pictures');
var photosTemplate = document.querySelector('#picture').content;
var fragment = document.createDocumentFragment();

for (i = 0; i < OBJECTS_AMOUNT; i++) {
  fragment.appendChild(loadingPictures(pictureList[i], photosTemplate));
}
pictureUpload.appendChild(fragment);


function generateCommentNumber(number, commentsLenght) {
  return number % commentsLenght;
}

function loadingBigPicture(i, picture, bigPicture) {
  bigPicture.querySelector('.big-picture__img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  var socialComments = bigPicture.querySelector('.social__comments');
  socialComments.textContent = '';
  var comment1 = picture.comments[generateCommentNumber(i, picture.comments.length)];
  var comment2 = picture.comments[generateCommentNumber(i + 1, picture.comments.length)];
  socialComments.insertAdjacentHTML('afterbegin', '<li class="social__comment social__comment--text"><img class="social__picture" src="img/avatar-' + Math.floor((1 + generateRandomNumber(10, 6))) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">' + comment1 + '</li>');

  if (i !== 0) {
    var socialComment = socialComments.querySelector('.social__comment');
    socialComment.insertAdjacentHTML('afterend', '<li class="social__comment social__comment--text"><img class="social__picture" src="img/avatar-' + Math.floor((1 + generateRandomNumber(10, 6))) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">' + comment2 + '</li>');
  }

}

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

for (i = 0; i < pictureList.length; i++) {
  loadingBigPicture(i, pictureList[i], bigPicture);
}

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
