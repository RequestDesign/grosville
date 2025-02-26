
/* node_modules */
import $ from 'jquery'
import Swiper from 'swiper';
import { Navigation, Pagination, Grid, Autoplay, Thumbs, EffectFade } from 'swiper/modules';
import Inputmask from 'inputmask'
import { Fancybox } from "@fancyapps/ui";
import noUiSlider from 'nouislider'
//import WOW from 'wow.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/src/ScrollTrigger';
//import CSSRulePlugin from 'gsap/all';
/* node_modules */

/* local */
import Form from './utils/Form';
import { rem } from './utils/constants'

const HTML = document.querySelector('html'),
    HTML_LOCK_SELECTOR = '_lock',
    HTML_PAGELOAD_SELECTOR = '_page-loaded',
    EV_INPUT = new Event('input', { bubbles: true }),
    EV_CLICK = new Event('click', { bubbles: true })


$(function () {
    initForms()
    nouislider()
    header()
    modalsHandler()
    initFancybox()
    initSwipers()
    initAboutVidos()
    initScroll()

    HTML.classList.add(HTML_PAGELOAD_SELECTOR)


    document.addEventListener('click', (ev) => {
        const { classList } = ev.target

        if (classList.contains('dd-target')) {
            /**
             * дроп даун
             * переключает ._opened на своем родительском .dd-container
             * если есть data-dd_html_lock='y' то еще и залочит html
             */
            ev.preventDefault()
            const prev = document.querySelector('.dd-container._opened')
            const parent = ev.target.closest('.dd-container')
            if (prev && prev !== parent) {
                prev.classList.remove('_opened')
            }

            if (parent.classList.contains('_opened')) {
                parent.classList.remove('_opened')
                if (ev.target.dataset.dd_html_lock) {
                    HTML.classList.remove(HTML_LOCK_SELECTOR)
                }
            } else {
                parent.classList.add('_opened')
                if (ev.target.dataset.dd_html_lock) {
                    HTML.classList.add(HTML_LOCK_SELECTOR)
                }
            }

        } else if (classList.contains('select-value')) {
            /**
             * записывает value в инут в дропдауне который select
             * и закрывает дропдаун
             */
            ev.preventDefault()

            const input = ev.target.closest('.dd-container')
                .querySelector('.select-input')

            if (!input || !ev.target.value) {
                console.error('.select-input не найден, или нету значения')
            }

            input.value = ev.target.textContent.trim()
            input.dispatchEvent(EV_INPUT);

            setTimeout(() => {
                input.closest('.dd-target').dispatchEvent(EV_CLICK)

            }, 200);

            const prev = ev.target.closest('.dd-container')
                .querySelectorAll('._checked')
            if (prev) {
                prev.forEach((e) => {
                    e.classList.remove('_checked')
                })
            }
            ev.target.classList.add('_checked')
        } else if (classList.contains('filter-opener')) {
            const t = document.querySelector('.filters')
            if (t.classList.contains('_opened')) {
                t.classList.remove('_opened')
                HTML.classList.remove(HTML_LOCK_SELECTOR)
            } else {
                t.classList.add('_opened')
                HTML.classList.add(HTML_LOCK_SELECTOR)

            }


        }
    })

})

function initScroll() {
    if (!document.querySelector('.mainBanner__big-img')) return
    const scrollCfg = {
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play none none reverse',
        once: false,
    }
    gsap.defaults({ duration: .5, ease: 'none' });
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.mainBanner__big-img')
        .forEach((e) => {
            const scrollCfg = {
                trigger: e,
                start: 'top 95%', // Начинаем анимацию, когда элемент появляется сверху
                end: 'bottom -30%', // Заканчиваем анимацию, когда элемент уходит вниз
                scrub: true, // Для плавной синхронизации с прокруткой
                markers: true // Показываем маркеры для отладки (можно убрать)
            };

            // Анимация, которая двигает элемент снизу вверх и делает его видимым
            gsap.to(e, {
                yPercent: -80, // Передвигаем элемент на 80% вверх относительно контейнера
                opacity: 1, // Делаем элемент полностью видимым
                scale: 1.2, // Увеличиваем масштаб элемента на 20%
                scrollTrigger: scrollCfg
            });
        })
    document.querySelectorAll('.mainBanner__small-img')
        .forEach((e) => {
            const scrollCfg = {
                trigger: e,
                start: 'top 95%', // Начинаем анимацию, когда элемент появляется сверху
                end: 'bottom -30%', // Заканчиваем анимацию, когда элемент уходит вниз
                scrub: true, // Для плавной синхронизации с прокруткой
                markers: true // Показываем маркеры для отладки (можно убрать)
            };

            // Анимация, которая двигает элемент снизу вверх и делает его видимым
            gsap.to(e, {
                yPercent: -5, // Передвигаем элемент на 80% вверх относительно контейнера
                opacity: 1, // Делаем элемент полностью видимым
                scrollTrigger: scrollCfg
            });
            gsap.set(e.querySelector('img'), {
                scale: 1.5
            })
            gsap.to(e.querySelector('img'), {
                scale: 1, // Увеличиваем масштаб элемента на 20%
                scrollTrigger: scrollCfg
            });
        })


    /*---------------animate__heading--------------  */

    /*---------------animate__fadeInUp--------------  */
    /*  document.querySelectorAll('.animate__fadeInUp')
         .forEach((el) => {
             const tl = gsap.timeline()
             gsap.set(el, {
                 opacity: 0,
                 transform: 'translateY: 105%'
             });
 
             ScrollTrigger.create({
                 trigger: el,
                 ...scrollCfg,
                 onEnter: () => {
                     tl.clear();
                     tl.fromTo(
                         el,
                         { translateY: '110%' },
                         {
                             translateY: '0%',
                             duration: 1.5,
                             ease: 'power1.inOut'
                         } // Указывает, что эта анимация должна начаться одновременно с предыдущей
                     );
                     tl.fromTo(
                         el,
                         { opacity: 0 },
                         {
                             opacity: 1,
                             duration: 1,
                             ease: 'power1.inOut'
                         },
                         '<'
                     ).play();
                 },
                 onEnterBack: () => {
                     tl.clear();
                     tl.fromTo(el, {
                         opacity: 0,
                         translateY: '-105%',
                     }, {
                         opacity: 1,
                         translateY: '0%',
                         duration: 0.5,
                     }).play();
                 },
                 onLeave: () => {
                     tl.clear();
                     tl.fromTo(el, {
                         opacity: 1,
                         translateY: '0%',
                     }, {
                         opacity: 0,
                         translateY: '-105%',
                         duration: 0.5,
                     }).play();
                 },
                 onLeaveBack: () => {
                     tl.clear();
                     tl.fromTo(el, {
                         opacity: 1,
                         translateY: '0%',
                     }, {
                         opacity: 0,
                         translateY: '105%',
                         duration: 0.5,
                     }).play();
 
 
                 },
                 //markers: true, // Показываем маркеры для тестирования (удалить в продакшене)
             });
         }) */

    /*---------------animate__fadeInUp--------------  */

}

function initSwipers() {
    const catalogDetail_Top = document.querySelector('.catalogDetailTop')
    if (catalogDetail_Top) {
        const thumbs = new Swiper(catalogDetail_Top.querySelector('.catalogDetailTop__thumbs.swiper'), {
            slidesPerView: 3.5,
            spaceBetween: rem(2.4),
            watchSlidesProgress: true,
            slideToClickedSlide: true,
            breakpoints: {
                768: {
                    slidesPerView: 4.5
                }
            }
        })
        const top = new Swiper(catalogDetail_Top.querySelector('.catalogDetailTop__big.swiper'), {
            modules: [Thumbs],
            slidesPerView: 1,
            simulateTouch: false,
            followFinger: false,
            thumbs: {
                swiper: thumbs

            },

        })
    }

    const catalogDetail_Img = document.querySelectorAll('.catalogDetailBody__c-img-swiper')
    if (catalogDetail_Img) {
        catalogDetail_Img.forEach((el) => {
            const s = new Swiper(el, {
                modules: [EffectFade, Navigation, Pagination],
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
                    init: (s) => {
                        if (window.innerWidth < 768 && el.classList.contains('_second')) {

                            const slide = s.slides[1];  // Берём второй слайд
                            const newHome = el.closest('.catalogDetailBody__c')
                            const img = slide.querySelector('img') // Новый родительский контейнер
                            // Переносим слайд в новый контейнер
                            newHome.querySelector('.catalogDetailBody__c-subheading-img').appendChild(img);
                            slide.remove()
                            // Обновляем структуру Swiper
                            s.update();
                        }
                    }
                }
            })
            const one = el.querySelector('.catalogDetailBody__c-img-second-btn._1')
            const two = el.querySelector('.catalogDetailBody__c-img-second-btn._2')
            if (one && two) {
                s.on('slideChange', (s) => {
                    if (s.activeIndex == true) {
                        two.classList.add('_active')
                        one.classList.remove('_active')
                    } else {
                        one.classList.add('_active')
                        two.classList.remove('_active')
                    }

                })
                two.addEventListener('click', () => {
                    s.slideTo(1)
                    two.classList.add('_active')
                    one.classList.remove('_active')
                })
                one.addEventListener('click', () => {
                    s.slideTo(0)
                    one.classList.add('_active')
                    two.classList.remove('_active')
                })
            }
        })
    }



    const catalogDetailTop_Newbuild = document.querySelector('.catalogDetailTop__newbuild')
    if (catalogDetailTop_Newbuild) {
        const thumbs = catalogDetailTop_Newbuild.querySelectorAll('.catalogDetailTop__newbuild-links-el')
        const s = new Swiper(catalogDetailTop_Newbuild.querySelector('.swiper'), {
            modules: [EffectFade],
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            slidesPerView: 1,
            simulateTouch: false,
            followFinger: false,
            on: {
                init: (s) => {
                    thumbs[0].classList.add('_active')
                },
                slideChange: (s) => {
                    thumbs.forEach((e, i) => {
                        if (i == s.activeIndex) {
                            e.classList.add('_active')
                        } else {
                            e.classList.remove('_active')

                        }
                    })
                }
            }
        })
        thumbs.forEach((el, i) => {
            el.addEventListener('click', () => {
                s.slideTo(i)
            })
        });
    }

    const catalogDetail_Adv = document.querySelector('.catalogDetailAdv')
    if (catalogDetail_Adv) {
        const thumbs = new Swiper(catalogDetail_Adv.querySelector('.catalogDetailAdv__thumbs.swiper'), {
            slidesPerView: 'auto',
            direction: 'horizontal',
            spaceBetween: rem(8),
            watchSlidesProgress: true,
            slideToClickedSlide: true,

            breakpoints: {
                768: {
                    spaceBetween: rem(1.8),
                    direction: 'vertical',
                    centeredSlides: false,

                }
            }
        })
        const s = new Swiper('.catalogDetailAdv__main', {
            modules: [EffectFade, Thumbs],
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
                init: (s) => {
                    s.slides.forEach((el, i) => [
                        el.querySelector('.catalogDetailAdv__main-slide-text-num')
                            .textContent = (i + 1).toString().padStart(2, '0')
                    ])
                }
            }
        })
    }

    const newsRecomend = document.querySelector('.newsRecomend .swiper')
    if (newsRecomend) {
        new Swiper(newsRecomend, {
            slidesPerView: 1.2,
            centeredSlides: true,
            spaceBetween: 15,
            breakpoints: {
                768: {
                    centeredSlides: false,
                    slidesPerView: 3,
                    spaceBetween: 30,

                }
            }

        })
    }

    const headingSlider = document.querySelector('.headingSlider.swiper')
    if (headingSlider) {
        new Swiper(headingSlider, {
            modules: [Navigation, EffectFade],
            slidesPerView: 1,
            effect: 'fade',
            fadeEffect: { crossFade: true },
            navigation: {
                prevEl: headingSlider.querySelector('.swiper-btn-prev'),
                nextEl: headingSlider.querySelector('.swiper-btn-next')
            }
        })
    }

    const aboutGrid = document.querySelector('.aboutGrid .swiper')
    if (aboutGrid) {
        new Swiper(aboutGrid, {
            modules: [Pagination, EffectFade, Grid],
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

                    },

                }
            },
            pagination: {
                el: aboutGrid.querySelector('.swiper-pag'),
                type: 'bullets'
            }
        })
    }

    const aboutSpec = document.querySelector('.aboutSpec')
    if (aboutSpec) {
        new Swiper(aboutSpec.querySelector('.swiper'), {
            modules: [Navigation, Pagination],
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
                init: (s) => {
                    s.slides.forEach((e, i) => {
                        e.addEventListener('click', (e) => {
                            s.slideTo(i)
                        })
                    })
                }
            },
            breakpoints: {
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 44,
                }
            },
            pagination: {
                el: aboutSpec.querySelector('.swiper-pag'),
                type: 'fraction',
                formatFractionCurrent: (n) => {
                    return String(n).padStart(2, '0');
                },
                formatFractionTotal: (n) => {
                    return String(n).padStart(2, '0');
                }
            },
            navigation: {
                prevEl: aboutSpec.querySelector('.swiper-btn-prev'),
                nextEl: aboutSpec.querySelector('.swiper-btn-next'),
            }
        })
    }

    const catalogItem = document.querySelectorAll('.catalogItemSwiper')
    if (catalogItem) {
        catalogItem.forEach((e) => {
            new Swiper(e, {
                modules: [EffectFade, Pagination],
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

            })
        })
    }

    const headingMain = document.querySelector('.mainHeading__c-slider')
    if (headingMain) {
        new Swiper(headingMain, {
            modules: [Navigation, EffectFade, Autoplay],
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
                init: (s) => {
                    s.slides.forEach((e, i) => {
                        e.querySelector('.mainHeading__c-slider-el-count').textContent = String(i + 1).padStart(2, '0')
                    })
                }
            }

        })
    }
    const mainSlider = document.querySelectorAll('.mainSlider')
    if (mainSlider && mainSlider.length) {
        mainSlider.forEach((m) => {

            const small = new Swiper(m.querySelector('.mainSlider__c-data-img'), {
                slidesPerView: 1,
                followFinger: false,
                simulateTouch: false,
                allowTouchMove: false,
                initialSlide: 1,
                loop: true
            })
            const big = new Swiper(m.querySelector('.mainSlider__c-middle'), {
                modules: [Navigation, Pagination],
                slidesPerView: 1,
                followFinger: false,
                simulateTouch: false,
                loop: true,

                pagination: {
                    el: m.querySelector('.swiper-pag'),
                    type: 'fraction',
                    formatFractionCurrent: (n) => {
                        return String(n).padStart(2, '0');
                    },
                    formatFractionTotal: (n) => {
                        return String(n).padStart(2, '0');
                    }
                },


            })
            m.querySelector('.swiper-btn-next')
                .addEventListener('click', () => {
                    big.slideNext()
                    small.slideNext()
                })
            m.querySelector('.swiper-btn-prev')
                .addEventListener('click', () => {
                    big.slidePrev()
                    small.slidePrev()
                })


        })
    }

    const mainSpecial = document.querySelector('.mainSpecial .swiper')
    if (mainSpecial) {
        new Swiper(mainSpecial, {
            modules: [Navigation, Pagination, EffectFade],
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            followFinger: false,
            simulateTouch: false,
            navigation: {
                prevEl: mainSpecial.querySelector('.swiper-btn-prev'),
                nextEl: mainSpecial.querySelector('.swiper-btn-next'),
            },
            pagination: {
                el: mainSpecial.querySelector('.swiper-pag'),
                type: 'fraction',
                formatFractionCurrent: (n) => {
                    return String(n).padStart(2, '0');
                },
                formatFractionTotal: (n) => {
                    return String(n).padStart(2, '0');
                }
            }
        })
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
    const c = document.querySelector('.aboutVidos__main')
    if (!c) return
    const v = c.querySelector('video'),
        b = c.querySelector('.btn-trans._play')

    v.addEventListener('play', () => {
        c.classList.add('_active')
    })
    b.addEventListener('click', () => {
        v.play()
    })


}

function initFancybox() {
    const anytarget = document.querySelector('[data-fancybox]')
    if (!anytarget) return



    Fancybox.bind('[data-fancybox]', {
        Thumbs: false, //картинки снизу
        Toolbar: {
            display: {
                left: ["zoom"],
                middle: ["caption", "infobar"],
                right: ["close",],
            },
        },
    })
}

function initForms() {

    const forms = document.querySelectorAll('.form')
    if (forms) {
        forms.forEach((e) => {
            new Form(e)
            const phone = $(e).find('input[name="phone"]')
            if (phone) {
                new Inputmask('+7 (999) 999-99-99').mask(phone);
            }

        })
    }
}

function modalsHandler() {
    const modalOpeners = $('[data-modal]'),
        modalClosers = $('.modal-closer'),
        html = $('html')


    if (!modalOpeners || !modalClosers) return

    modalOpeners.on('click', (ev) => {
        const { modal, submit_type } = ev.currentTarget.dataset

        $(`.modal-${modal}`)
            .fadeIn()
            .addClass('_opened')
            .attr('data-submit_type', submit_type)
        html.addClass('_lock')
        if (modal == 'map') {
            ymaps.ready(init);
            function init() {
                var myMap = new ymaps.Map("modalMap", {
                    center: [ev.currentTarget.dataset.mapx, ev.currentTarget.dataset.mapy],
                    zoom: 16,
                    controls: ['fullscreenControl',]
                });

                myMap.geoObjects
                    .add(new ymaps.Placemark(myMap.getCenter(), {
                        hintContent: 'q'
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: '../assets/images/icons/mapMarkerSmall.svg',
                        iconImageSize: [111, 135],

                    }))
            }
            $(`.modal-${modal}`).find('.modal-map__ttl').text(ev.currentTarget.dataset.mapTtl)
            $(`.modal-${modal}`).find('.modal-map__adr').text(ev.currentTarget.dataset.mapAdr)
        }

    })


    modalClosers.on('click', (ev) => {
        const { classList } = ev.target
        if (!classList.contains('modal-closer')) return

        if (classList.contains('modal')) {
            $(ev.target).fadeOut().removeClass('_opened')

        } else {
            $(ev.target.closest('.modal')).fadeOut().removeClass('_opened')

        }
        html.removeClass('_lock')
    })
}

function nouislider() {


    const target = document.querySelectorAll('.nouislider')
    if (!target.length || target.length < 1) return

    target.forEach((t) => {
        const min = t.querySelector('.nouislider__min'),
            max = t.querySelector('.nouislider__max'),
            place = t.querySelector('.nouislider__place')

        if (!min || !max) return


        noUiSlider.create(place, {
            start: [Number(min.getAttribute('min')), Number(max.getAttribute('max'))],
            connect: true,
            step: 100,
            range: {
                'min': Number(min.getAttribute('min')),
                'max': Number(max.getAttribute('max'))
            },
        });

        place.noUiSlider.on('update', function (values, handle) {
            min.setAttribute('value', Math.round(values[0]))
            max.setAttribute('value', Math.round(values[1]))

        });
    })


    /*  min.on('input', (e) => {
         target.noUiSlider.set([e.target.value, max.val()])
     })
     max.on('input', (e) => {
         target.noUiSlider.set([min.val(), e.target.value])
     }) */

}

function header() {
    let prevY = 0
    const header = document.querySelector('.header'),
        modal = $('.header__modal')

    if (!header) return

    document.addEventListener('scroll', (ev) => {
        if (prevY > window.scrollY && window.scrollY > 500) {
            header.classList.add('_showed')
        } else {
            header.classList.remove('_showed')
        }

        prevY = window.scrollY
    })
    header.querySelectorAll('.header-modal-opener')
        .forEach((el) => {
            el.addEventListener('click', (ev) => {
                if (!ev.target.classList.contains('header-modal-opener')) return
                ev.stopPropagation()
                if (!header.classList.contains('_opened')) {
                    modal.fadeIn()
                    header.classList.add('_opened')
                    HTML.classList.add(HTML_LOCK_SELECTOR)
                } else {
                    modal.fadeOut()
                    header.classList.remove('_opened')
                    HTML.classList.remove(HTML_LOCK_SELECTOR)
                }
            })
        })
}

