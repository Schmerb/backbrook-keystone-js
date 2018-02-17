'use strict';

const SLIDESHOW = '.slideshow';
const SLIDE = '.slide';

function nextSlide() {
    // get current slide number
    // increment
    // set current to new slide number
    let $current  = $('.slide.current');
    let slideNum  = parseInt($current.attr('data-slide-num'));
    let nextSlide = slideNum < $('.slide').length ? slideNum + 1 : 1;

    $current.removeClass('current');
    $(`.slide[data-slide-num="${nextSlide}"]`).addClass('current');
}

function startSlideShow(delay = 6000) {
    setInterval(() => {
        nextSlide();
    }, delay);
}

module.exports = { nextSlide, startSlideShow };
