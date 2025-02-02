
/* node_modules */
import $ from 'jquery'
import Swiper from 'swiper';
import { Navigation, Pagination, Grid, Autoplay, Thumbs, EffectFade } from 'swiper/modules';
import Inputmask from 'inputmask'
import { Fancybox } from "@fancyapps/ui";
import noUiSlider from 'nouislider'
//import WOW from 'wow.js';
//import gsap from 'gsap';
//import { ScrollTrigger } from 'gsap/src/ScrollTrigger';
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

            const parent = ev.target.closest('.dd-container')

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
        } else if(classList.contains('filter-opener')){
            document.querySelector('.filters').classList.toggle('_opened')
            
        }
    })

})

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
            new Swiper(el, {
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
                }
            })
        })
    }

    const catalogDetail_ImgSecond = document.querySelector('.catalogDetailBody__c-img.swiper._second')
    if (catalogDetail_ImgSecond) {
        const s = new Swiper(catalogDetail_ImgSecond, {
            modules: [EffectFade],
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            slidesPerView: 1,
            followFinger: false,
            simulateTouch: false,
            allowTouchMove: false,

        })
        const one = catalogDetail_ImgSecond.querySelector('.catalogDetailBody__c-img-second-btn._1')

        const two = catalogDetail_ImgSecond.querySelector('.catalogDetailBody__c-img-second-btn._2')
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

    target.forEach((t)=>{
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
        if (prevY > window.scrollY && window.scrollY > 100) {
            header.classList.add('_showed')
        } else if (prevY < window.scrollY) {
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

