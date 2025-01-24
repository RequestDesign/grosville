
/* node_modules */
import $ from 'jquery'
//import Swiper from 'swiper';
//import { Navigation, Pagination, Grid, Autoplay } from 'swiper/modules';
import Inputmask from 'inputmask'
//import { Fancybox } from "@fancyapps/ui";
//import noUiSlider from 'nouislider'
//import WOW from 'wow.js';
//import gsap from 'gsap';
//import { ScrollTrigger } from 'gsap/src/ScrollTrigger';
//import CSSRulePlugin from 'gsap/all';
/* node_modules */

/* local */
import Form from './utils/Form';

const HTML = document.querySelector('html'),
    HTML_LOCK_SELECTOR = '_lock',
    HTML_PAGELOAD_SELECTOR = '_page-loaded',
    EV_INPUT = new Event('input', { bubbles: true }),
    EV_CLICK = new Event('click', { bubbles: true })


$(function () {
    initForms()

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
            input.value = ev.target.value
            input.dispatchEvent(EV_INPUT);
            setTimeout(() => {
                input.dispatchEvent(EV_CLICK)

            }, 200);
        }
    })

})




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
    const modalOpeners = $('.modal-opener'),
        modalClosers = $('.modal-closer'),
        html = $('html')


    if (!modalOpeners || !modalClosers) return

    modalOpeners.on('click', (ev) => {
        const { modal } = ev.currentTarget.dataset

        $(`.modal-${modal}`)
            .fadeIn()
            .addClass('_opened')
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

