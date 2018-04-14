'use strict';

var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var descriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья.', 'Не обижайте всех словами......', 'Вот это тачка!'];

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

function getArrayFromArray(array) {
  var newArray = [];
  var lenght = Math.random() > 0.5 ? 2 : 1;

  if (lenght === 2) {
    pushArray(array, newArray);
    pushArray(array, newArray);
  } else {
    pushArray(array, newArray);
  }

  return newArray;
}

function pushArray(array, newArray) {
  var secondComments = getRandomStringFromArray(array);

  if (newArray[0] === secondComments) {
    pushArray(array, newArray);
  } else {
    newArray.push(secondComments);
  }
}

function getRandomStringFromArray(array) {
  return array[randomInteger(0, (array.length - 1))];
}

var NUMBER_OBJECTS = 25;
var pictures = [];

for (var i = 1; i < NUMBER_OBJECTS + 1; i++) {
  pictures.push({
    url: 'photos/' + i + '.jpg',
    likes: randomInteger(15, 200),
    comments: getArrayFromArray(comments),
    description: getRandomStringFromArray(descriptions),
  });
}

var template = document.getElementById('picture').content;

var fragment = document.createDocumentFragment();

var current;
var newElement;

for (var i = 0; i < pictures.length; i++) {
  current = pictures[i];
  newElement = template.cloneNode(true);
  newElement.querySelector('img').src = current.url;
  newElement.querySelector('.picture__stat--likes').innerText = current.likes;
  newElement.querySelector('.picture__stat--comments').innerText = current.comments.length;
  fragment.appendChild(newElement);
}

document.querySelector('.pictures').appendChild(fragment);

var bigPhoto = document.querySelector('.big-picture');

bigPhoto.querySelector('img').src = pictures[0].url;

bigPhoto.querySelector('.likes-count').innerText = pictures[0].likes;
bigPhoto.querySelector('.comments-count').innerText = pictures[0].comments.length;

var commentsContainer = document.querySelector('.social__comments');

pictures[0].comments.forEach(function (item) {
  var comment = '<li class="social__comment social__comment--text"> <img class="social__picture" src="img/avatar-' + randomInteger(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">' + item + '</li>';
  commentsContainer.insertAdjacentHTML('beforeend', comment);
});

for (var i = 0; i < pictures[0].comments.length; i++) {
  var currentItem = pictures[0].comments[i];
  var comment = '<li class="social__comment social__comment--text"> <img class="social__picture" src="img/avatar-' + randomInteger(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">' + currentItem + '</li>';
  commentsContainer.insertAdjacentHTML('beforeend', comment);
}

bigPhoto.classList.remove('hidden');
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
