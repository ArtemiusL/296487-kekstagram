'use strict';
function createPhoto(i, comments, description) {
  var pictureInfo = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: Math.floor(15 + (Math.random() * 1000) % 185),
    comments: generateRandomText(comments),
    description: generateRandomText(description)
  };
  return pictureInfo;
}

function generateRandomText(textArray) {
  return textArray[Math.floor((Math.random() * 10) % textArray.length)];
}

var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var description = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

function createPhotosList() {
  var pictureList = [];
  for (var i = 0; i < 25; i++) {
    pictureList[i] = createPhoto(i, comments, description);
  }
  return pictureList;
}

function loadingPictures(pictureList, photosTemplate) {
  var pictureElement = photosTemplate.cloneNode(true);
  pictureElement.querySelector('img').src = pictureList.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = pictureList.comments;
  pictureElement.querySelector('.picture__stat--comments').textContent = pictureList.description;
  return pictureElement;
}
var pictureUpload = document.querySelector('.pictures');
var photosTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
var fragment = document.createDocumentFragment();
var pictureList = createPhotosList();
for (var i = 0; i < 25; i++) {
  fragment.appendChild(loadingPictures(pictureList[i], photosTemplate));
}
pictureUpload.appendChild(fragment);

function loadingBigPicture(picture, bigPicture) {
  bigPicture.querySelector('.big-picture__img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  var socialComment = bigPicture.querySelector('.social__comment');
  socialComment.textContent = '';
  socialComment.insertAdjacentHTML('beforeend', '<img class="social__picture" src="' + 'img/avatar-' + Math.floor((1 + (Math.random() * 10) % 6)) + '.svg"\n' +
    'alt="Аватар комментатора фотографии" \n' +
    'width="35" height="35">' + picture.comments);
}

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
loadingBigPicture(pictureList[1], bigPicture);
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
