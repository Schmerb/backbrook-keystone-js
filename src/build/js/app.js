'use strict';

const state = {
    isMobile: false,
    hasTouch: false,
    scrollTop: null,
    projects: []
};

// SELECTOR CONSTANTS
const {
    MAIN_NAV,
    MENU_LIST,
    BANNER,
    LOGO_WRAP,
    RESULTS_CONTAINER,
    SEARCH_RESULTS,
    SEARCH_ICON,
    CLEAR_ICON
} = require('./selectors');

//================================================================================
// DOM / Display functions
//================================================================================

const Obj_values = require('object.values');

const { findMatches } = require('./utils');

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Adds hidden class to all classes passed in as args
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function hide() {
    Obj_values(arguments).forEach((target) => {
        $(target).addClass('hidden');
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Removes hidden class from all classes passed in as args
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function show() {
    Obj_values(arguments).forEach((target) => {
        $(target).removeClass('hidden');
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Removes search results and closes results container
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function clearResults() {
    $(RESULTS_CONTAINER).add(SEARCH_RESULTS).removeClass('open');
    $(RESULTS_CONTAINER).height('');
    $(SEARCH_RESULTS).html('');
}

function showSearchIcon() {
    // show search glass
    show(SEARCH_ICON);
    // hide x icon
    hide(CLEAR_ICON);
}

function hideSearchIcon() {
    // hide search glass
    hide(SEARCH_ICON);
    // display x icon
    show(CLEAR_ICON); 
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Searches project names for matches and updates
// the DOM with results
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function showResults(query) {    
    query = query.toLowerCase().trim();
    if(query === '') {
        clearResults();
        showSearchIcon();
        return;
    }
    hideSearchIcon();
    const { projects } = state;

    let pathname = window.location.pathname;
    let category;
    if(pathname === '/projects') {
        category = 'all';
    } else {
        let root = '/projects/categories/';
        category = pathname.slice(root.length);
    }
    let results = findMatches(projects, 'name', query)
                  .map(result => {
                    let name = result.name.replace(/#/g, '=');
                    name = name.replace(/ /g, '-');
                    return `
                        <li>
                            <a href="/projects/${name}?category=${category}">${result.name}</a>
                        </li>
                    `;
                });
    $(RESULTS_CONTAINER).add(SEARCH_RESULTS).addClass('open');
    $('.category-btn').removeClass('open'); // resets category arrow
    $('.category-options').addClass('fadeOut');
    
    let len = results.length;
    if(len > 0) {
        // At least one match found
        $(SEARCH_RESULTS).html(results.join(''));
        $(RESULTS_CONTAINER).css({height: `${len * 36 + 45}px`});
        // $(RESULTS_CONTAINER).height(`${len * 45}px`);
        return;
    }
    // No matches, show no match message
    $(RESULTS_CONTAINER).css({height: '100px'});
    $(SEARCH_RESULTS).html('<p class="no-match-msg">Sorry, no matches found.</p>');
}




//================================================================================
// API calls
//================================================================================

function getAllProjects() {
    $.ajax({
        url: '/api/projects/all',
        type: 'GET',
        dataType: 'json',
        success: res => {
            state.projects = res.projects;
            console.log(state.projects);
        },
        error: (jqXHR, textStatus, err) => {
            console.log(err);
        }
    });
}

//================================================================================
// Utility functions
//================================================================================

const { 
    fixBanner, 
    expandNav,
    shrinkNav, 
    toggleHeaderBgImg,
    setBgImgHeight,
    fadeOutLoadScreen,
    highlightTargetInList
} = require('./utils');



// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Gives a smooth animation to page navigation bringing the 
// target element to the top of the window
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function smoothScroll(target, duration = 1200, offset = 0) {
    $('body, html').animate({
        scrollTop: $(target).offset().top - offset
    }, duration);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Fires on user scroll event
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkScrollPos() {
    $(window).scroll(e => {
        const path = location.pathname;
        if(path === '/') {
            toggleHeaderBgImg();
            fixBanner();
            highlightTargetInList('.overview article');
        } else if(path.includes('/projects/')) {
            highlightTargetInList('.project-card-anchor', '.project-list li');
        } else if(path == '/about-us/meet-our-team') {
            highlightTargetInList('.employee-card', '.employees li', 700);
            stickyAsideNav();
        }
    });
}

function stickyAsideNav() {
    // 1) get distance from bottom of container to top of window
    // 2) get distance from bottom of aside nav to top of window
    // 3) When the difference between these two hits a value, sticky fix aside nav
    let $container = $('.about-us-page').find('.container'),
        $asideNav  = $('.about-nav-container'),
        scrollTop  = $(window).scrollTop();

    let bottomContainerToTopWin = $container.offset().top + $container.outerHeight() - scrollTop,
        bottomAsideNavToTopWin  = $asideNav.offset().top + $asideNav.outerHeight() - scrollTop;

    if(bottomContainerToTopWin <= bottomAsideNavToTopWin) {
        if(!$asideNav.hasClass('aside-stick-to-bottom')) {
            $asideNav.addClass('aside-stick-to-bottom');
            // grab scrollTop at this point and save it
            state.scrollTop = scrollTop;
        }
    } else if($asideNav.hasClass('aside-stick-to-bottom') && state.scrollTop) {
        if(scrollTop <= state.scrollTop) {
            // when scrollTop is less than saved scrollTop remove class
            $asideNav.removeClass('aside-stick-to-bottom');
            state.scrollTop = null; // reset state for next scroll event
        }
    }
}


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Check screen size to determine Mobile Vs. Desktop
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkSizeHandler() {
    checkSize();
    $(window).resize(checkSize); 
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Called by checkSizeHandler to set state if mobile view
// or not (Portrait view)
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkSize() {
    let width = window.innerWidth;
    state.isMobile = width <= 414;
    // if device has touch, fix bg img height to avoid page jump
    state.hasTouch ? setBgImgHeight() : null;
    if(width < 1060) {
        // remove z-index on header for collapse nav views (<1060px)
        $('header').css('z-index', '');
    } 
    if(width >= 1060) {
        $('html').removeClass('no-scroll');
    }
    fixBanner();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Checks if a user has touched their device and
// applies class to body and global var indicating whether
// user has touched / can touch. 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkForTouch() {
    if($('html').hasClass('touch')) {
        state.hasTouch = true;
        setBgImgHeight();
    }
}


//================================================================================
// Event Listeners
//================================================================================

function burgerClick() {
    $('.burger-btn').on('click', function(e) {
        e.preventDefault();
        let burger = `.burger-btn, .burger-icon, ${MAIN_NAV}, ${MENU_LIST}, .nav-menu-backdrop`;
        $(burger).toggleClass('open');
        if($('html').hasClass('no-scroll')) {
            $('html, body').removeClass('no-scroll');
        } else {
            setTimeout(() => {
                // allows menu to cover page before scroll bar 
                // dissappearance causes obvious page jump 
                $('html, body').addClass('no-scroll'); 
            }, 200);
        }
    });
}

function mainFeaturedProjClick() {
    $('.main-featured-img').on('click', function(e) {
        e.preventDefault();
        let href = this.dataset['href'];
        location.href = href;
    });
}

// - - - - - - - - - - - - -
// Project Category Menu
// - - - - - - - - - - - - -
function formSubmitPrevent() {
    $('.category-form').on('submit', e => {
        e.preventDefault();
    });
}

function categoryBtnClick() {
    $('.category-btn').on('click', e => {
        e.preventDefault();
        $('.category-options').removeClass('fadeOut');
        $(RESULTS_CONTAINER).height('');
        if($(SEARCH_RESULTS).hasClass('open')) {
            $(SEARCH_RESULTS).removeClass('open');
            $('.form-results-container, .category-btn').addClass('open');
        } else {    
            $('.form-results-container, .category-btn').toggleClass('open');
        }
    });
}

function searchBarChange() {
    $('.search-bar').on('input', e => {
        e.preventDefault();
        showResults(e.target.value);
    });
}

function clearIconClick() {
    $(CLEAR_ICON).on('click', e => {
        e.preventDefault();
        clearResults();
        showSearchIcon();
        $('.search-bar').val('')
                        .focus();
    });
}

// - - - - - - - - - -
// Project Detail Page
// - - - - - - - - - -
function backBtnClick() {
    $('.back-btn-anchor').on('click', function(e) {
        e.preventDefault();
        let category = $(this).data('category');
        location.href = `/projects/${category}`;
    });
}

//================================================================================
// Event Listener Groups
//================================================================================

function navClicks() {
    burgerClick();
}

function landingClicks() {
    mainFeaturedProjClick();
}

function categoryForm() {
    formSubmitPrevent();
    categoryBtnClick();
    searchBarChange();
    clearIconClick();
}

function projectDetailEvents() {
    backBtnClick();
}


//================================================================================
// Utility and Initialization handlers
//================================================================================
const { startSlideShow } = require('./slideshow');
const { initMap } = require('./google-maps');

function utils() {
    checkSizeHandler(); // checks width on resize
    checkScrollPos();   // gets user scroll y-pos to animate banner nav
    checkForTouch();    // checks if user has touch device by detecting first touch on screen
    
    // ES6 Polyfills
    require('string.prototype.includes');
    require('string.prototype.startswith'); 
}

function init() {
    const path = location.pathname;
    if(path === '/') {
        toggleHeaderBgImg();
        fixBanner();
    } else if (path === '/contact-us') {
        initMap();
    }
    fadeOutLoadScreen();
    startSlideShow('.header-slide', 4000); // starts bg image slideshow
    getAllProjects();
}


//================================================================================
// Entry point -- Main
//================================================================================
const { 
    displayProjectSlider, 
    displayModelSlider, 
    displayLauraSlider,
    responsiveReslick 
} = require('./slick-init');

const { pathname } = location;
// Init slick slider if on correct
if($('#projects').length !== 0) {
    displayProjectSlider();
    responsiveReslick();
} else if ($('.bim-model-page').length !== 0) {
    displayModelSlider();
    responsiveReslick();
} 
if(pathname === '/BIM') {
    startSlideShow('.laura-slide', 4000); // starts bg image slideshow
}

// window.onbeforeunload = function () {
//     window.scrollTo(0, 0);
//   }


// on Load
$(function () {
    utils();
    navClicks();
    landingClicks();
    categoryForm();
    projectDetailEvents();
    init();
});

// $(document).ready(function() {
//     // executes when HTML-Document is loaded and DOM is ready
//     alert("document is ready");
// });
   
   
// $(window).on('load', (function() {
//     // executes when complete page is fully loaded, including all frames, objects and images
//     alert("window is loaded");
// }));

