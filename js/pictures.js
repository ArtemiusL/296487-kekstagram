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

var picturesContainer = document.querySelector('.pictures');
picturesContainer.appendChild(fragment);

var bigPhoto = document.querySelector('.big-picture');

var commentsContainer = document.querySelector('.social__comments');

var toggleVisibleBigPhoto = function () {
  bigPhoto.classList.toggle('hidden');
};

var hiddenBigPhoto = function () {
  if(!bigPhoto.classList.contains('hidden')){
    bigPhoto.classList.add('hidden');
  }
};

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

//module4-task1

var formEdits = document.querySelector('.img-upload__overlay');

var toggleVisibleFormEdits = function () {
  formEdits.classList.toggle('hidden');
};

var hiddenFormEdits = function () {
  if (!formEdits.classList.contains('hidden')) {
    formEdits.classList.add('hidden');
  };
};

var controlLoad = document.getElementById('upload-file');

controlLoad.addEventListener('change', toggleVisibleFormEdits);

var scalePin = document.querySelector('.scale__pin');
var scalePinMouseupHandler = function(){
  alert(coordinatsPinAtLine());
};


var coordinatsPinAtLine = function() {
  return (scalePin.offsetLeft * 100) / scalePin.parentNode.clientWidth;
};
scalePin.addEventListener('mouseup', scalePinMouseupHandler);

var hashtagInput = document.querySelector('.text__hashtags');

hashtagInput.addEventListener('blur', function(evt){
  var inputValue = evt.target.value.trim();
  console.log(inputValue[0]);
  if(inputValue[0] !== '#') {
    hashtagInput.setCustomValidity('чет не то');
  }
});

//отрытие больших фоток 

var showBigPhoto = function (item) {
  bigPhoto.querySelector('img').src = item.url;
  bigPhoto.querySelector('.likes-count').innerText = item.likes;
  bigPhoto.querySelector('.comments-count').innerText = item.comments.length;
  commentsContainer.innerHTML = '';
  item.comments.forEach(function (item) {
  var comment = '<li class="social__comment social__comment--text"> <img class="social__picture" src="img/avatar-' + randomInteger(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">' + item + '</li>';
    commentsContainer.insertAdjacentHTML('beforeend', comment);
  });
  toggleVisibleBigPhoto();
};

var linkPictures = picturesContainer.querySelectorAll('.picture__link');
linkPictures.forEach(function (item, index) {
  item.addEventListener('click', function () {
    showBigPhoto(pictures[index]);
  });
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    hiddenBigPhoto();
    hiddenFormEdits();
  }
});
var buttonCloseBigPhoto = document.querySelector('.big-picture__cancel');
var buttonSettingsPhoto = document.querySelector('.img-upload__cancel');

buttonCloseBigPhoto.addEventListener('click', hiddenBigPhoto);
buttonSettingsPhoto.addEventListener('click', hiddenFormEdits);

//изменение масштаба
var scaleValue = document.querySelector('.resize__control--value');
scaleValue.value = '100%';
var scaleButtonClickHandler = function(operand){
  var oldValue = Number(scaleValue.value.substring(0, scaleValue.value.length - 1));
  switch (operand) {
    case '+':
      if (oldValue < 100) {
        scaleValue.value = (oldValue + 25) + '%';
      }
      break;

    case '-':
      if (oldValue > 0) {
        scaleValue.value = (oldValue - 25) + '%';
      }
      break;
  }
};

var scaleMinusButton = document.querySelector('.resize__control--minus');
var scalePlusButton = document.querySelector('.resize__control--plus');

scaleMinusButton.addEventListener('click', function () {
  scaleButtonClickHandler('-');
});

scalePlusButton.addEventListener('click', function () {
  scaleButtonClickHandler('+');
});

