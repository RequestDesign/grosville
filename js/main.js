/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 906:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(755);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);
// EXTERNAL MODULE: ./node_modules/swiper/swiper.mjs + 1 modules
var swiper = __webpack_require__(652);
// EXTERNAL MODULE: ./node_modules/swiper/modules/index.mjs + 28 modules
var modules = __webpack_require__(952);
// EXTERNAL MODULE: ./node_modules/inputmask/dist/inputmask.js
var inputmask = __webpack_require__(382);
var inputmask_default = /*#__PURE__*/__webpack_require__.n(inputmask);
// EXTERNAL MODULE: ./node_modules/@fancyapps/ui/dist/index.esm.js
var index_esm = __webpack_require__(252);
// EXTERNAL MODULE: ./node_modules/nouislider/dist/nouislider.mjs
var nouislider = __webpack_require__(122);
// EXTERNAL MODULE: ./node_modules/gsap/index.js + 2 modules
var gsap = __webpack_require__(358);
// EXTERNAL MODULE: ./node_modules/gsap/src/ScrollTrigger.js + 1 modules
var ScrollTrigger = __webpack_require__(58);
;// CONCATENATED MODULE: ./src/js/utils/Form.js
class Form {
  /**
   * 
   * @param {Element} formDomEl 
   * @param {Function} submitFoo 
   * 
   * 
   * 
   */
  constructor(formDomEl, submitFoo) {
    this._form = formDomEl;
    this.submitForm = submitFoo ? submitFoo : () => {};
    this._form.setAttribute('novalidate', true);
    this._inputContainerSelector = 'form-input-container';
    this._inputErrorMsgSelector = 'form-input-error';
    this._inputErrorSelector = '_error';
    this._inputs = () => {
      console.log(this._form.querySelectorAll('input, textarea'));
      return this._form.querySelectorAll('input, textarea');
    };
    this._btnSubmit = this._form.querySelectorAll('.form-submit');
    this._btnSubmit.forEach(e => {
      e.setAttribute('disabled', true);
      e.setAttribute('type', 'button');
    });
    this._cfg = {
      default: {
        name: {
          regex: /^[A-Za-zА-Яа-яЁё ]+$/,
          errMsg: 'Допустим ввод только букв'
        },
        email: {
          regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          errMsg: 'Поле должно быть в формате email@domain.com'
        },
        phone: {
          regex: /^\+(7|375) \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
          errMsg: 'Формат номера телефона +7 (888) 888-88-88'
        },
        password: {
          regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          errMsg: 'Пароль должен содержать не менее 8 символов'
        }
      }
    };
    this.initForm();
  }
  _inputHandler(input) {
    /**
     * @param {input} inputDom
     * возвращает пулевое
     */

    this._btnSubmit.forEach(e => {
      e.removeAttribute('disabled');
    });
    return this._validation(input);
  }
  _validation(input) {
    /**
    * @param {input} inputDom
    * возвращает булевое
    */
    // валидация инпутов
    // если у инпута (именно у инпута) есть pattern, провряет по этой реге
    // ну как паттерн типа
    // а если у инпута есть data-form_error_message, то и выдаст нужное сообщение

    switch (input.name) {
      case 'name':
        return this._checkInputValid(input, input.hasAttribute('pattern') ? new RegExp(input.getAttribute('pattern')) : this._cfg.default.name.regex, input.dataset.form_error_message ? input.dataset.form_error_message : this._cfg.default.name.errMsg);
      case 'email':
        return this._checkInputValid(input, input.hasAttribute('pattern') ? new RegExp(input.getAttribute('pattern')) : this._cfg.default.email.regex, input.dataset.form_error_message ? input.dataset.form_error_message : this._cfg.default.email.errMsg);
      case 'phone':
        return this._checkInputValid(input, input.hasAttribute('pattern') ? new RegExp(input.getAttribute('pattern')) : this._cfg.default.phone.regex, input.dataset.form_error_message ? input.dataset.form_error_message : this._cfg.default.phone.errMsg);
      case 'password':
        return this._checkInputValid(input, input.hasAttribute('pattern') ? new RegExp(input.getAttribute('pattern')) : this._cfg.default.password.regex, input.dataset.form_error_message ? input.dataset.form_error_message : this._cfg.default.password.errMsg);
      default:
        //если инпут не известен, вернет true, и похуй
        return true;
    }
  }
  _checkInputValid(input, regex) {
    let errMsg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'че то не так написал, исправляй';
    /**
       * @param {input} inputDom
       * @param {regex} regExp
       * @param {errMsg} string
       * возвращает булевое
       */
    if (!input.hasAttribute('required')) return true;
    const inputContainer = input.closest('.' + this._inputContainerSelector),
      errorMsg = inputContainer.querySelector('.' + this._inputErrorMsgSelector),
      value = input.value.trim();
    if (value.length <= 0) {
      inputContainer.classList.add(this._inputErrorSelector);
      errorMsg.textContent = 'Это поле обязательно.';
      return false;
    }
    if (input.hasAttribute('minlength') && value.length < Number(input.getAttribute('minlength'))) {
      inputContainer.classList.add(this._inputErrorSelector);
      errorMsg.textContent = 'Строка должна быть не короче ' + input.getAttribute('minlength').toString() + ' символов' + '.';
      return false;
    }
    if (!regex.test(value)) {
      inputContainer.classList.add(this._inputErrorSelector);
      errorMsg.textContent = errMsg;
      return false;
    }
    inputContainer.classList.remove(this._inputErrorSelector);
    errorMsg.textContent = '';
    return true;
  }
  _onSubmit() {
    let whatsUp = true;
    for (const inp of this._inputs()) {
      if (!this._inputHandler(inp)) {
        whatsUp = false;
        return;
      }
    }
    if (!whatsUp) return;
    //сабмит
    console.log('submit');
    this._form.dispatchEvent(new Event('submit'));
  }
  _fileHandler(evt) {
    //не юзается
    const inputContainer = evt.target.closest('.' + this._inputContainerSelector);
    if (evt.target.value) {
      inputContainer.classList.add('_active');
      inputContainer.querySelector('.input-file-got').querySelector('.input-file-text').textContent = evt.target.value.split('\\').slice(-1);
    } else {
      inputContainer.classList.remove('_active');
    }
  }
  _passowrHide() {
    //не юзается
    if (this._passwordInput.type == 'text') {
      this._passwordInput.setAttribute('type', 'password');
      this._passwordRepeatInput.setAttribute('type', 'password');
    } else {
      this._passwordInput.setAttribute('type', 'text');
      this._passwordRepeatInput.setAttribute('type', 'text');
    }
  }
  initForm() {
    this._form.noValidate = true;
    this._btnSubmit.forEach(el => {
      el.addEventListener('click', e => {
        this._onSubmit(e);
      });
    });
    this._form.addEventListener('input', ev => {
      this._inputHandler(ev.target);
    });
    this._form.addEventListener('change', ev => {
      this._inputHandler(ev.target);
    });
    this._form.querySelectorAll('input').forEach(el => {
      el.addEventListener('blur', ev => {
        this._inputHandler(ev.target);
      });
    });
  }
}
;// CONCATENATED MODULE: ./src/js/utils/constants.js
const rem = function (rem) {
  if (window.innerWidth > 768) {
    return 0.005208335 * window.innerWidth * rem;
  } else {
    // где 375 это ширина мобильной версии макета
    return 100 / 375 * (0.05 * window.innerWidth) * rem;
  }
};
;// CONCATENATED MODULE: ./src/js/main.js
/* node_modules */








/* node_modules */

/* local */


const HTML = document.querySelector('html'),
  HTML_LOCK_SELECTOR = '_lock',
  HTML_PAGELOAD_SELECTOR = '_page-loaded',
  EV_INPUT = new Event('input', {
    bubbles: true
  }),
  EV_CLICK = new Event('click', {
    bubbles: true
  });
jquery_default()(function () {
  initForms();
  main_nouislider();
  header();
  modalsHandler();
  initFancybox();
  initSwipers();
  initAboutVidos();
  initScroll();
  HTML.classList.add(HTML_PAGELOAD_SELECTOR);
  initCard(document.querySelectorAll('.catalogItemSwiper') || null);
  document.addEventListener('click', ev => {
    const {
      classList
    } = ev.target;
    if (classList.contains('catalogItemFirst__list-sort-dd-list-e')) {
      ev.stopPropagation();
      if (!classList.contains('_active')) {
        const prev = ev.target.closest('.catalogItemFirst__list-sort-dd-list').querySelector('.catalogItemFirst__list-sort-dd-list-e._active');
        console.log(prev);
        if (prev) {
          prev.classList.remove('_active');
        }
        ev.target.classList.add('_active');
      } else {
        ev.target.classList.toggle('_fromMin');
      }
      const mob = ev.target.closest('.catalogItemFirst__list-sort-dd').querySelector('.catalogItemFirst__list-sort-dd-t');
      mob.querySelector('.catalogItemFirst__list-sort-dd-list-e-text').textContent = ev.target.querySelector('.catalogItemFirst__list-sort-dd-list-e-text').textContent;
      if (ev.target.classList.contains('_fromMin')) {
        mob.classList.add('_fromMin');
      } else {
        mob.classList.remove('_fromMin');
      }
    } else if (classList.contains('select-value')) {
      /**
       * записывает value в инут в дропдауне который select
       * и закрывает дропдаун
       */
      ev.preventDefault();
      const input = ev.target.closest('.dd-container').querySelector('.select-input');
      if (!input || !ev.target.value) {
        console.error('.select-input не найден, или нету значения');
      }
      input.value = ev.target.textContent.trim();
      input.dispatchEvent(EV_INPUT);
      setTimeout(() => {
        input.closest('.dd-target').dispatchEvent(EV_CLICK);
      }, 200);
      const prev = ev.target.closest('.dd-container').querySelectorAll('._checked');
      if (prev) {
        prev.forEach(e => {
          e.classList.remove('_checked');
        });
      }
      ev.target.classList.add('_checked');
    } else if (classList.contains('filter-opener')) {
      const t = document.querySelector('.filters');
      if (t.classList.contains('_opened')) {
        t.classList.remove('_opened');
        HTML.classList.remove(HTML_LOCK_SELECTOR);
      } else {
        t.classList.add('_opened');
        HTML.classList.add(HTML_LOCK_SELECTOR);
      }
    } else if (classList.contains('dd-target')) {
      /**
       * дроп даун
       * переключает ._opened на своем родительском .dd-container
       * если есть data-dd_html_lock='y' то еще и залочит html
       */
      ev.preventDefault();
      const prev = document.querySelector('.dd-container._opened');
      const parent = ev.target.closest('.dd-container');
      if (prev && prev !== parent && !prev.classList.contains('catalogItemFirst')) {
        prev.classList.remove('_opened');
      }
      if (parent.classList.contains('_opened')) {
        parent.classList.remove('_opened');
        if (ev.target.dataset.dd_html_lock) {
          HTML.classList.remove(HTML_LOCK_SELECTOR);
        }
      } else {
        parent.classList.add('_opened');
        if (ev.target.dataset.dd_html_lock) {
          HTML.classList.add(HTML_LOCK_SELECTOR);
        }
      }
    }
  });
});
function initCard(dom) {
  if (dom.length && dom[0]) {
    dom.forEach(e => {
      crt(e);
    });
  } else if (dom instanceof HTMLElement) {
    crt(dom);
  }
  function crt(e) {
    new swiper/* default */.Z(e, {
      modules: [modules/* EffectFade */.xW, modules/* Pagination */.tl],
      slidesPerView: 1,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      pagination: {
        el: e.querySelector('.swiper-pag'),
        type: 'bullets',
        clickable: true
      }
    });
  }
}
function initScroll() {
  if (!document.querySelector('.mainBanner__big-img')) return;
  gsap/* default */.ZP.defaults({
    duration: 1,
    ease: 'power1.inOut'
  });
  gsap/* default */.ZP.registerPlugin(ScrollTrigger/* ScrollTrigger */.i);
  const scrollCfg = {
    start: 'top 90%',
    // Начинаем анимацию, когда элемент появляется сверху
    end: 'bottom -10%',
    // Заканчиваем анимацию, когда элемент уходит вниз
    markers: false,
    // Показываем маркеры для отладки (можно убрать)
    toggleActions: "play none none none"
  };
  if (window.innerWidth > 768) {
    /////////////////TRANSLATE///////////////////
    document.querySelectorAll('.gsap-translate-y').forEach(e => {
      gsap/* default */.ZP.set(e, {
        opacity: 0,
        transform: 'translateY(50%)'
      });
      const tl = gsap/* default */.ZP.timeline();
      tl.fromTo(e, {
        opacity: 0,
        transform: 'translateY(50%)'
      }, {
        opacity: 1,
        transform: 'translateY(0)'
      });
      tl.delay(e.dataset.gsapDelay ? Number(e.dataset.gsapDelay) : 0);
      ScrollTrigger/* ScrollTrigger */.i.create({
        trigger: e,
        ...scrollCfg,
        animation: tl,
        onEnter: () => {
          // scroll start + start

          tl.play();
        },
        onEnterBack: () => {
          // scroll end + end

          tl.play();
        },
        onLeave: () => {
          // scroll end + start

          tl.play();
        },
        onLeaveBack: () => {
          // scroll start + end

          tl.play();
        }
      });
    });
    /////////////////TRANSLATE///////////////////
    /////////////////TEXT///////////////////
    document.querySelectorAll('.gsap-bg-orange-text').forEach(e => {
      const tl = gsap/* default */.ZP.timeline();
      tl.fromTo(e, {
        backgroundPosition: '100% 50%'
      }, {
        backgroundPosition: '0% 50%'
      });
      tl.delay(e.dataset.gsapDelay ? Number(e.dataset.gsapDelay) : 0);
      ScrollTrigger/* ScrollTrigger */.i.create({
        trigger: e,
        ...scrollCfg,
        animation: tl,
        onEnter: () => {
          // scroll start + start

          tl.play();
        },
        onEnterBack: () => {
          // scroll end + end
          tl.play();
        },
        onLeave: () => {
          // scroll end + start
          tl.play();
        },
        onLeaveBack: () => {
          // scroll start + end
          tl.play();
        }
      });
    });
    /////////////////TEXT///////////////////
    /////////////////OPACITY///////////////////
    document.querySelectorAll('.gsap-opacity').forEach(e => {
      gsap/* default */.ZP.set(e, {
        opacity: 0
      });
      const tl = gsap/* default */.ZP.timeline();
      tl.fromTo(e, {
        opacity: 0
      }, {
        opacity: 1
      });
      tl.delay(e.dataset.gsapDelay ? Number(e.dataset.gsapDelay) : 0);
      ScrollTrigger/* ScrollTrigger */.i.create({
        trigger: e,
        ...scrollCfg,
        animation: tl,
        onEnter: () => {
          // scroll start + start

          tl.play();
        },
        onEnterBack: () => {
          // scroll end + end

          tl.play();
        },
        onLeave: () => {
          // scroll end + start

          tl.play();
        },
        onLeaveBack: () => {
          // scroll start + end

          tl.play();
        }
      });
    });
    /////////////////OPACITY///////////////////
    /////////////////IMG///////////////////
    document.querySelectorAll('.gsap-img').forEach(e => {
      const img = e.querySelector('img');
      gsap/* default */.ZP.set(e, {
        clipPath: 'inset(100% 0 0% 0)'
      });
      gsap/* default */.ZP.set(img, {
        transform: 'scale(1.2)'
      });
      const tl = gsap/* default */.ZP.timeline();
      tl.add([gsap/* default */.ZP.fromTo(e, {
        clipPath: 'inset(100% 0 0% 0)'
      }, {
        clipPath: 'inset(0% 0 0% 0)'
      }), gsap/* default */.ZP.fromTo(img, {
        transform: 'scale(1.2)'
      }, {
        transform: 'scale(1)'
      })]);
      tl.delay(e.dataset.gsapDelay ? Number(e.dataset.gsapDelay) : 0);
      ScrollTrigger/* ScrollTrigger */.i.create({
        trigger: e,
        ...scrollCfg,
        animation: tl,
        onEnter: () => {
          // scroll start + start

          tl.play();
        },
        onEnterBack: () => {
          // scroll end + end

          tl.play();
        },
        onLeave: () => {
          // scroll end + start

          tl.play();
        },
        onLeaveBack: () => {
          // scroll start + end

          tl.play();
        }
      });
    });
    /////////////////IMG///////////////////
  }

  if (window.innerWidth < 768) {
    const main = document.querySelector('.mainBanner__small'),
      t = main.querySelectorAll('.mainBanner__small-img-self'),
      h = t[0].offsetHeight,
      text = document.querySelector('.mainBanner__c');
    ScrollTrigger/* ScrollTrigger */.i.create({
      trigger: main,
      start: 'top 50%',
      end: 'bottom 90%',
      scrub: 0,
      ease: 'none',
      onUpdate: self => {
        if (window.innerWidth < 768) {
          const progress = self.progress,
            v = (main.offsetHeight - h * 0.9) * progress;
          gsap/* default */.ZP.set(t, {
            //yPercent: 100,
            top: v // Динамическое изменение позиции
          });

          gsap/* default */.ZP.set(text, {
            top: main.offsetHeight * 0.75 * progress
          });
        }
      }
    });
  }
  document.querySelectorAll('.mainBanner__small-img').forEach((e, i) => {
    const list = document.querySelector('.mainBanner__c-text-words-list'),
      big = document.querySelectorAll('.mainBanner__big-img')[i],
      img = e.querySelector('img'),
      imgSelf = img.closest('.mainBanner__small-img-self');
    gsap/* default */.ZP.set(img, {
      transform: 'scale(1.2)'
    });
    gsap/* default */.ZP.set(big, {
      transform: '50%',
      opacity: 0
    });
    if (window.innerWidth < 768) {
      gsap/* default */.ZP.set(imgSelf, {
        clipPath: 'inset(100% 0 0% 0)'
      });
    }
    const tl = gsap/* default */.ZP.timeline();
    tl.fromTo(img, {
      transform: 'scale(1.2)'
    }, {
      transform: 'scale(1)'
    });
    ScrollTrigger/* ScrollTrigger */.i.create({
      trigger: e,
      start: 'top 40%',
      // Начинаем анимацию, когда элемент появляется сверху
      end: i == 3 ? 'bottom -10%' : 'bottom 20%',
      // Заканчиваем анимацию, когда элемент уходит вниз
      onEnter: () => {
        // scroll start + start

        list.style.transform = `translateY(-${7 * i}rem)`;
        tl.play();
        gsap/* default */.ZP.to(big, {
          transform: 'translateY(0%)',
          opacity: 1,
          duration: .8
        });
        if (window.innerWidth < 768) {
          gsap/* default */.ZP.to(imgSelf, {
            clipPath: 'inset(0% 0 0% 0)'
          });
        }
      },
      onEnterBack: () => {
        // scroll end + end
        tl.play();
        list.style.transform = `translateY(-${7 * i}rem)`;
        gsap/* default */.ZP.to(big, {
          transform: 'translateY(0%)',
          opacity: 1,
          duration: .8
        });
        if (window.innerWidth < 768) {
          gsap/* default */.ZP.to(imgSelf, {
            clipPath: 'inset(0% 0 0% 0)'
          });
        }
      },
      onLeave: () => {
        // scroll end + start
        tl.reverse();
        gsap/* default */.ZP.to(big, {
          transform: 'translateY(-50%)',
          opacity: 0,
          duration: .8
        });
        if (window.innerWidth < 768) {
          gsap/* default */.ZP.to(imgSelf, {
            clipPath: 'inset(0% 0 100% 0)'
          });
        }
        /*   list.style.transform = `translateY(-${7 * i}rem)` */
      },

      onLeaveBack: () => {
        // scroll start + end
        tl.reverse();
        gsap/* default */.ZP.to(big, {
          transform: 'translateY(50%)',
          opacity: 0,
          duration: .8
        });
        if (window.innerWidth < 768) {
          gsap/* default */.ZP.to(imgSelf, {
            clipPath: 'inset(100% 0 0% 0)'
          });
        }
        /*   list.style.transform = `translateY(-${7 * i}rem)` */
      }
    });
  });
}

function initSwipers() {
  const catalogDetail_Top = document.querySelector('.catalogDetailTop');
  if (catalogDetail_Top) {
    const thumbs = new swiper/* default */.Z(catalogDetail_Top.querySelector('.catalogDetailTop__thumbs.swiper'), {
      slidesPerView: 3.5,
      spaceBetween: rem(2.4),
      watchSlidesProgress: true,
      slideToClickedSlide: true,
      breakpoints: {
        768: {
          slidesPerView: 4.5
        }
      }
    });
    const top = new swiper/* default */.Z(catalogDetail_Top.querySelector('.catalogDetailTop__big.swiper'), {
      modules: [modules/* Thumbs */.o3],
      slidesPerView: 1,
      simulateTouch: false,
      followFinger: false,
      thumbs: {
        swiper: thumbs
      }
    });
  }
  const catalogDetail_Img = document.querySelectorAll('.catalogDetailBody__c-img-swiper');
  if (catalogDetail_Img) {
    catalogDetail_Img.forEach(el => {
      const s = new swiper/* default */.Z(el, {
        modules: [modules/* EffectFade */.xW, modules/* Navigation */.W_, modules/* Pagination */.tl],
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        slidesPerView: 1,
        simulateTouch: false,
        followFinger: false,
        pagination: {
          el: el.querySelector('.swiper-pag'),
          type: 'bullets',
          clickable: true
        },
        navigation: {
          prevEl: el.querySelector('.swiper-btn-prev'),
          nextEl: el.querySelector('.swiper-btn-next')
        },
        on: {
          init: s => {
            if (window.innerWidth < 768 && el.classList.contains('_second')) {
              const slide = s.slides[1]; // Берём второй слайд
              const newHome = el.closest('.catalogDetailBody__c');
              const img = slide.querySelector('img'); // Новый родительский контейнер
              // Переносим слайд в новый контейнер
              newHome.querySelector('.catalogDetailBody__c-subheading-img').appendChild(img);
              slide.remove();
              // Обновляем структуру Swiper
              s.update();
            }
          }
        }
      });
      const one = el.querySelector('.catalogDetailBody__c-img-second-btn._1');
      const two = el.querySelector('.catalogDetailBody__c-img-second-btn._2');
      if (one && two) {
        s.on('slideChange', s => {
          if (s.activeIndex == true) {
            two.classList.add('_active');
            one.classList.remove('_active');
          } else {
            one.classList.add('_active');
            two.classList.remove('_active');
          }
        });
        two.addEventListener('click', () => {
          s.slideTo(1);
          two.classList.add('_active');
          one.classList.remove('_active');
        });
        one.addEventListener('click', () => {
          s.slideTo(0);
          one.classList.add('_active');
          two.classList.remove('_active');
        });
      }
    });
  }
  const catalogDetailTop_Newbuild = document.querySelector('.catalogDetailTop__newbuild');
  if (catalogDetailTop_Newbuild) {
    const thumbs = catalogDetailTop_Newbuild.querySelectorAll('.catalogDetailTop__newbuild-links-el');
    const s = new swiper/* default */.Z(catalogDetailTop_Newbuild.querySelector('.swiper'), {
      modules: [modules/* EffectFade */.xW],
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      slidesPerView: 1,
      simulateTouch: false,
      followFinger: false,
      on: {
        init: s => {
          thumbs[0].classList.add('_active');
        },
        slideChange: s => {
          thumbs.forEach((e, i) => {
            if (i == s.activeIndex) {
              e.classList.add('_active');
            } else {
              e.classList.remove('_active');
            }
          });
        }
      }
    });
    thumbs.forEach((el, i) => {
      el.addEventListener('click', () => {
        s.slideTo(i);
      });
    });
  }
  const catalogDetail_Adv = document.querySelector('.catalogDetailAdv');
  if (catalogDetail_Adv) {
    const thumbs = new swiper/* default */.Z(catalogDetail_Adv.querySelector('.catalogDetailAdv__thumbs.swiper'), {
      slidesPerView: 'auto',
      direction: 'horizontal',
      spaceBetween: rem(8),
      watchSlidesProgress: true,
      slideToClickedSlide: true,
      breakpoints: {
        768: {
          spaceBetween: rem(1.8),
          direction: 'vertical',
          centeredSlides: false
        }
      }
    });
    const s = new swiper/* default */.Z('.catalogDetailAdv__main', {
      modules: [modules/* EffectFade */.xW, modules/* Thumbs */.o3],
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      slidesPerView: 1,
      simulateTouch: false,
      followFinger: false,
      autoHeight: true,
      breakpoints: {
        768: {
          autoHeight: false
        }
      },
      thumbs: {
        swiper: thumbs
      },
      on: {
        init: s => {
          s.slides.forEach((el, i) => [el.querySelector('.catalogDetailAdv__main-slide-text-num').textContent = (i + 1).toString().padStart(2, '0')]);
        }
      }
    });
  }
  const newsRecomend = document.querySelector('.newsRecomend .swiper');
  if (newsRecomend) {
    new swiper/* default */.Z(newsRecomend, {
      slidesPerView: 1.2,
      centeredSlides: true,
      spaceBetween: 15,
      breakpoints: {
        768: {
          centeredSlides: false,
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    });
  }
  const headingSlider = document.querySelector('.headingSlider.swiper');
  if (headingSlider) {
    new swiper/* default */.Z(headingSlider, {
      modules: [modules/* Navigation */.W_, modules/* EffectFade */.xW],
      slidesPerView: 1,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      navigation: {
        prevEl: headingSlider.querySelector('.swiper-btn-prev'),
        nextEl: headingSlider.querySelector('.swiper-btn-next')
      }
    });
  }
  const aboutGrid = document.querySelector('.aboutGrid .swiper');
  if (aboutGrid) {
    new swiper/* default */.Z(aboutGrid, {
      modules: [modules/* Pagination */.tl, modules/* EffectFade */.xW, modules/* Grid */.rj],
      loop: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: rem(3),
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      grid: {
        rows: 1
      },
      breakpoints: {
        768: {
          effect: 'slide',
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: rem(7),
          grid: {
            rows: 2,
            fill: 'row'
          }
        }
      },
      pagination: {
        el: aboutGrid.querySelector('.swiper-pag'),
        type: 'bullets'
      }
    });
  }
  const aboutSpec = document.querySelector('.aboutSpec');
  if (aboutSpec) {
    new swiper/* default */.Z(aboutSpec.querySelector('.swiper'), {
      modules: [modules/* Navigation */.W_, modules/* Pagination */.tl],
      speed: 500,
      slidesPerView: 1.4,
      spaceBetween: 14,
      centeredSlides: true,
      initialSlide: window.innerWidth > 768 ? 3 : 0,
      /*   loop: true, */
      followFinger: true,
      simulateTouch: false,
      slideToClickedSlide: true,
      on: {
        init: s => {
          s.slides.forEach((e, i) => {
            e.addEventListener('click', e => {
              s.slideTo(i);
            });
          });
        }
      },
      breakpoints: {
        768: {
          slidesPerView: 'auto',
          spaceBetween: 44
        }
      },
      pagination: {
        el: aboutSpec.querySelector('.swiper-pag'),
        type: 'fraction',
        formatFractionCurrent: n => {
          return String(n).padStart(2, '0');
        },
        formatFractionTotal: n => {
          return String(n).padStart(2, '0');
        }
      },
      navigation: {
        prevEl: aboutSpec.querySelector('.swiper-btn-prev'),
        nextEl: aboutSpec.querySelector('.swiper-btn-next')
      }
    });
  }
  const headingMain = document.querySelector('.mainHeading__c-slider');
  if (headingMain) {
    new swiper/* default */.Z(headingMain, {
      modules: [modules/* Navigation */.W_, modules/* EffectFade */.xW, modules/* Autoplay */.pt],
      effect: 'fade',
      autoplay: {
        delay: 2000
      },
      fadeEffect: {
        crossFade: true
      },
      loop: true,
      navigation: {
        nextEl: headingMain.querySelector('.swiper-btn-next')
      },
      on: {
        init: s => {
          s.slides.forEach((e, i) => {
            e.querySelector('.mainHeading__c-slider-el-count').textContent = String(i + 1).padStart(2, '0');
          });
        }
      }
    });
  }
  const mainSlider = document.querySelectorAll('.mainSlider');
  if (mainSlider && mainSlider.length) {
    mainSlider.forEach(m => {
      const small = new swiper/* default */.Z(m.querySelector('.mainSlider__c-data-img'), {
        slidesPerView: 1,
        followFinger: false,
        simulateTouch: false,
        allowTouchMove: false,
        initialSlide: 1,
        loop: true
      });
      const big = new swiper/* default */.Z(m.querySelector('.mainSlider__c-middle'), {
        modules: [modules/* Navigation */.W_, modules/* Pagination */.tl],
        slidesPerView: 1,
        followFinger: false,
        simulateTouch: false,
        loop: true,
        pagination: {
          el: m.querySelector('.swiper-pag'),
          type: 'fraction',
          formatFractionCurrent: n => {
            return String(n).padStart(2, '0');
          },
          formatFractionTotal: n => {
            return String(n).padStart(2, '0');
          }
        }
      });
      m.querySelector('.swiper-btn-next').addEventListener('click', () => {
        big.slideNext();
        small.slideNext();
      });
      m.querySelector('.swiper-btn-prev').addEventListener('click', () => {
        big.slidePrev();
        small.slidePrev();
      });
    });
  }
  const mainSpecial = document.querySelector('.mainSpecial .swiper');
  if (mainSpecial) {
    new swiper/* default */.Z(mainSpecial, {
      modules: [modules/* Navigation */.W_, modules/* Pagination */.tl, modules/* EffectFade */.xW],
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      followFinger: false,
      simulateTouch: false,
      navigation: {
        prevEl: mainSpecial.querySelector('.swiper-btn-prev'),
        nextEl: mainSpecial.querySelector('.swiper-btn-next')
      },
      pagination: {
        el: mainSpecial.querySelector('.swiper-pag'),
        type: 'fraction',
        formatFractionCurrent: n => {
          return String(n).padStart(2, '0');
        },
        formatFractionTotal: n => {
          return String(n).padStart(2, '0');
        }
      }
    });
  }
  /*  const recomendation = document.querySelector('.recomendation')
   if (recomendation && window.innerWidth < 768) {
       new Swiper(recomendation.querySelector('.swiper'), {
           slidesPerView: 1.2,
           centeredSlides: true,
           spaceBetween: 15
       })
   }
  */
}

function initAboutVidos() {
  const c = document.querySelector('.aboutVidos__main');
  if (!c) return;
  const v = c.querySelector('video'),
    b = c.querySelector('.btn-trans._play');
  v.addEventListener('play', () => {
    c.classList.add('_active');
  });
  b.addEventListener('click', () => {
    v.play();
  });
}
function initFancybox() {
  const anytarget = document.querySelector('[data-fancybox]');
  if (!anytarget) return;
  index_esm/* Fancybox */.KR.bind('[data-fancybox]', {
    Thumbs: false,
    //картинки снизу
    Toolbar: {
      display: {
        left: ["zoom"],
        middle: ["caption", "infobar"],
        right: ["close"]
      }
    }
  });
}
function initForms() {
  const forms = document.querySelectorAll('.form');
  if (forms) {
    forms.forEach(e => {
      new Form(e);
      const phone = jquery_default()(e).find('input[name="phone"]');
      if (phone) {
        new (inputmask_default())('+7 (999) 999-99-99').mask(phone);
      }
    });
  }
}
function modalsHandler() {
  const modalOpeners = jquery_default()('[data-modal]'),
    modalClosers = jquery_default()('.modal-closer'),
    html = jquery_default()('html');
  if (!modalOpeners || !modalClosers) return;
  let myMap;
  if (document.querySelector('#modalMap') && ymaps) {
    ymaps.ready(() => {
      myMap = new ymaps.Map("modalMap", {
        center: [47.204572074287015, 39.67028549999995],
        zoom: 16,
        controls: ['fullscreenControl']
      });
      myMap.geoObjects.add(new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'q'
      }, {
        iconLayout: 'default#image',
        iconImageHref: '../assets/images/icons/mapMarkerSmall.svg',
        iconImageSize: [111, 135]
      }));
    });
  }
  modalOpeners.on('click', ev => {
    const {
      modal,
      submit_type
    } = ev.currentTarget.dataset;
    jquery_default()(`.modal-${modal}`).fadeIn().addClass('_opened').attr('data-submit_type', submit_type);
    html.addClass('_lock');
    if (modal == 'map') {
      myMap.panTo([Number(ev.currentTarget.dataset.mapx), Number(ev.currentTarget.dataset.mapy)]);
      jquery_default()(`.modal-${modal}`).find('.modal-map__ttl').text(ev.currentTarget.dataset.mapTtl);
      jquery_default()(`.modal-${modal}`).find('.modal-map__adr').text(ev.currentTarget.dataset.mapAdr);
    }
  });
  modalClosers.on('click', ev => {
    const {
      classList
    } = ev.target;
    if (!classList.contains('modal-closer')) return;
    if (classList.contains('modal')) {
      jquery_default()(ev.target).fadeOut().removeClass('_opened');
    } else {
      jquery_default()(ev.target.closest('.modal')).fadeOut().removeClass('_opened');
    }
    html.removeClass('_lock');
  });
}
function main_nouislider() {
  const target = document.querySelectorAll('.nouislider');
  if (!target.length || target.length < 1) return;
  target.forEach(t => {
    const min = t.querySelector('.nouislider__min'),
      max = t.querySelector('.nouislider__max'),
      place = t.querySelector('.nouislider__place');
    if (!min || !max) return;
    nouislider/* default.create */.ZP.create(place, {
      start: [Number(min.getAttribute('min')), Number(max.getAttribute('max'))],
      connect: true,
      step: 100,
      range: {
        'min': Number(min.getAttribute('min')),
        'max': Number(max.getAttribute('max'))
      }
    });
    place.noUiSlider.on('update', function (values, handle) {
      min.setAttribute('value', Math.round(values[0]));
      max.setAttribute('value', Math.round(values[1]));
    });
  });

  /*  min.on('input', (e) => {
       target.noUiSlider.set([e.target.value, max.val()])
   })
   max.on('input', (e) => {
       target.noUiSlider.set([min.val(), e.target.value])
   }) */
}

function header() {
  let prevY = 0;
  const header = document.querySelector('.header'),
    modal = jquery_default()('.header__modal');
  if (!header) return;
  document.addEventListener('scroll', ev => {
    if (prevY > window.scrollY && window.scrollY > 500) {
      header.classList.add('_showed');
    } else {
      header.classList.remove('_showed');
    }
    prevY = window.scrollY;
  });
  header.querySelectorAll('.header-modal-opener').forEach(el => {
    el.addEventListener('click', ev => {
      if (!ev.target.classList.contains('header-modal-opener')) return;
      ev.stopPropagation();
      if (!header.classList.contains('_opened')) {
        modal.fadeIn();
        header.classList.add('_opened');
        HTML.classList.add(HTML_LOCK_SELECTOR);
      } else {
        modal.fadeOut();
        header.classList.remove('_opened');
        HTML.classList.remove(HTML_LOCK_SELECTOR);
      }
    });
  });
}
;// CONCATENATED MODULE: ./src/index.js



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			179: 0,
/******/ 			90: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwebpack_example"] = self["webpackChunkwebpack_example"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [390,775,90,371,729,522,877], () => (__webpack_require__(906)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;