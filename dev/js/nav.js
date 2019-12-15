let nav = document.getElementsByClassName('nav')[0];
let navSourceTop = nav.getBoundingClientRect().top + window.scrollY;
let nav__menu = document.getElementsByClassName('nav__mobile-menu')[0];
let nav__link = document.querySelectorAll('.nav__link a')
let nav__links = document.getElementsByClassName('nav__links')[0];
let inputs = document.getElementsByClassName('input');



window.onscroll = function() {
    if (nav.classList.contains('nav_fixed') && window.scrollY < navSourceTop) {
        nav.classList.remove('nav_fixed');
    }
    else if (window.scrollY > navSourceTop) {
        nav.classList.add('nav_fixed');
    };
};

if (window.matchMedia('(max-width: 425px)').matches) {
    nav__menu.addEventListener('click', toggle_menu);
    for (i = 0; i < nav__link.length; i++) {
        nav__link[i].addEventListener('click', hide_menu)
    }
    for (i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('click', hide_menu)
    }
}

function toggle_menu() {
    if ((nav__links.active == false || nav__links.active == undefined) && !nav__links.classList.contains('nav__links_active')) active_menu()
    else hide_menu();
}


function active_menu() {
    nav__links.active = true;
    nav__links.classList.add('nav__links_active');
    if (!nav__menu.classList.contains('nav__mobile-menu_active'))
    nav__menu.classList.add('nav__mobile-menu_active')
}

function hide_menu() {
    nav__links.active = false;
    nav__links.classList.remove('nav__links_active');
    if (nav__menu.classList.contains('nav__mobile-menu_active'))
    nav__menu.classList.remove('nav__mobile-menu_active')
}
