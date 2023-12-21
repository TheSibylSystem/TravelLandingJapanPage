// самовызывающаяся функция, которая отработает тогда, как распарсится js документ (её не надо вызывать самому)
(function() {
  const header = document.querySelector('.header');
  window.onscroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('header__active');
    } else {
      header.classList.remove('header__active');
    }
  };
}());


// Burger handler
(function() {
  const burgerItem = document.querySelector('.burger');
  const menu = document.querySelector('.header__nav')
  burgerItem.addEventListener('click', () => {
    menu.classList.add('header__nav__active'); 
  })

  const closeNav = document.querySelector('.header__nav__close');
  closeNav.addEventListener('click', (e) => {
    menu.classList.remove('header__nav__active');
  })

  const menuLinks = document.querySelectorAll('.header__link');
  if (window.innerWidth <= 767) {
    for (let i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener('click', () => {
        menu.classList.remove('header__nav__active');
      });
    }
  }
}());


// Scroll to anchors
(function () {
  // smoothScroll - это функция, которая создаёт плавный скролл до определённого элемента на странице
  // targetEl - селектор целевого элемента
  // duraition - продолжительность анимации в миллисекундах
  const smoothScroll = function (targetEl, duration) {
    // Данная переменная содержит высоту header
    const headerElHeight = document.querySelector('.header').clientHeight;
    // Данная переменная - это элемент, который надо проскроллить
    let target = document.querySelector(targetEl);
    // Это расстояние от верхнего края документа до верхнего края целевого элемента - высота заголовка
    let targetPosition = target.getBoundingClientRect().top - headerElHeight;
    // Текущая позиция прокрутки страницы
    let startPosition = window.pageYOffset;
    // Время начала анимации
    let startTime = null;

    // Данная функция определяет скорость анимации
    const ease = function(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    // Данная функция вызывается для каждого кадра анимации, она вычисляет новую позицию прокрутки и обновляет её. Если время анимации ещё не истекло, она запускает следующий кадр анимации
    const animation = function(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    // Запуск анимации
    requestAnimationFrame(animation);
  };

  // Данная функция добавляет обработчик события "клик" на все элементы с классом js-scroll
  const scrollTo = function () {
    const links = document.querySelectorAll('.js-scroll');
    links.forEach(each => {
      each.addEventListener('click', function() {
        const currentTarget = this.getAttribute('href');
        smoothScroll(currentTarget, 1000);
      });
    });
  };
  scrollTo();
}());