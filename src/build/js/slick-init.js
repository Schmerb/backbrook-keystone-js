// ================================================================================
// Slick Carousel
// ================================================================================

// SELECTOR CONSTANTS
const PROJECT_SLIDER = '.project-slider';
const MODEL_SLIDER   = '.model-slider';

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Project Page Slider
// * * * * * * * * * * * * * * * * * * * * * * * * * 
const initProjectSlider = () => {
    $(PROJECT_SLIDER).slick({
        dots: false,
        arrows: true,
        nextArrow: '<svg class="icon icon-chevron-right"><use xlink:href="#icon-chevron-right"></use></svg>',
        prevArrow: '<svg class="icon icon-chevron-left"><use xlink:href="#icon-chevron-left"></use></svg>',
        infinite: false,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 515,
                settings: {
                    speed: 1200,
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    // check if user has seen this in sessionStorage
    //   if yes, remove $('.icon-swipe-icon')
    // update sessionStorage that user has seen it
    let visisted = sessionStorage.getItem('visited');
    if(visisted) {
        $('.icon-swipe-icon').remove();
    }
    $(PROJECT_SLIDER).on('afterChange', (e, slick, currentSlide) => {
        $('.icon-swipe-icon').addClass('fadeOut');
        if(!visisted) {
            sessionStorage.setItem('visited', 'true');
        }
    })
}

const scrollBarWidth = require('./utils').getScrollbarWidth();

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Model Page Slider
// * * * * * * * * * * * * * * * * * * * * * * * * * 
const initModelSlider = () => {
    $(MODEL_SLIDER).slick({
        dots: true,
        arrows: true,
        nextArrow: '<svg class="icon icon-chevron-right"><use xlink:href="#icon-chevron-right"></use></svg>',
        prevArrow: '<svg class="icon icon-chevron-left"><use xlink:href="#icon-chevron-left"></use></svg>',
        infinite: false,
        speed: 1200,
        variableWidth: true,
        centerMode: true,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    initialSlide: 0
                }
            },
            {
                breakpoint: 737,
                settings: {
                    speed: 1200,
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    if(window.innerWidth < 737) {
        $('.model-slide').css({'width': 'calc(100vw - ' + scrollBarWidth + 'px)'});
    }
}


// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Intializes slider and sets height to zero
// before and unsets height after it is 'slicked'
// to avoid FOUC
// * * * * * * * * * * * * * * * * * * * * * * * * * 
const displayProjectSlider = () => {
    $(PROJECT_SLIDER).css('height', '0px');
    initProjectSlider();
    $(PROJECT_SLIDER).css('height', '');
}
const displayModelSlider = () => {
    $(MODEL_SLIDER).css('height', '0px');
    initModelSlider();
    $(MODEL_SLIDER).css('height', '');
}


// * * * * * * * * * * * * * * * * * * * * * * * * * 
//          Destroys slick carousels
// @params   Slider element to be destroyed
// * * * * * * * * * * * * * * * * * * * * * * * * * 
const unslick = (slider) => {
    if ($(slider).hasClass('slick-initialized')) {
        $(slider).slick('unslick');
    }
}


// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Used to reslick sliders on window resize 
//  inccrease. 
//  Slick settings handles unslick for mobile 
//  but does not reslick when window size increases
// * * * * * * * * * * * * * * * * * * * * * * * * * 
const responsiveReslick = () => {
    $(window).resize(() => {
        let width = parseInt($('body').css('width'));
        if (!$(PROJECT_SLIDER).hasClass('slick-initialized')) {
            initProjectSlider();
        }
        if (!$(MODEL_SLIDER).hasClass('slick-initialized')) {
            initModelSlider();
        } 
        if(window.innerWidth < 737) {
            $('.model-slide').css({'width': 'calc(100vw - ' + scrollBarWidth + 'px)'});
        }
    });
}



module.exports = {
    initProjectSlider, 
    initModelSlider,
    displayProjectSlider, 
    displayModelSlider, 
    unslick, 
    responsiveReslick 
};