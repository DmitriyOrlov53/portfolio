var nav = document.getElementsByClassName('nav')[0];
var navSourceBottom = nav.getBoundingClientRect().top + window.scrollY

window.onscroll = function() {
    if (nav.classList.contains('nav_fixed') && window.pageYOffset < navSourceBottom) {
        nav.classList.remove('nav_fixed');
    } else if (window.pageYOffset > navSourceBottom) {
        nav.classList.add('nav_fixed');
    }
};
