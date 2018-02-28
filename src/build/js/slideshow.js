'use strict';



function nextSlide(slideClass) {
    // get current slide number
    // increment
    // set current to new slide number
    let $current  = $(`${slideClass}.current`);
    let slideNum  = parseInt($current.attr('data-slide-num'));
    let nextSlide = slideNum < $(slideClass).length ? slideNum + 1 : 1;

    $current.removeClass('current');
    $(`${slideClass}[data-slide-num="${nextSlide}"]`).addClass('current');
}

function startSlideShow(slideClass, delay = 6000) {
    setInterval(() => {
        nextSlide(slideClass);
    }, delay);
}

module.exports = { nextSlide, startSlideShow };
