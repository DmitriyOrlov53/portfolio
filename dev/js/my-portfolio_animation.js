const buttons = document.getElementsByClassName('my-portfolio__nav-button');
const sections = ['all', 'sites', 'apps'];

const sections2 = {'all': null, 'web': 'my-portfolio__web', 'apps': 'my-portfolio__apps'};

for (i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', active_button);
};

function active_button(event) {
    var old_value = document.getElementsByClassName('button_cheked')[0];
    if (old_value != undefined && old_value.classList.remove('button_cheked') != event.target.classList) {
        old_value.classList.remove('buton_cheked');
        old_value.classList.add('button_focused')
    }
    var new_value = event.target.classList;
    event.target.classList.add('button_cheked');
    event.target.classList.remove('button_focused');
    selected_section(new_value)
}

function selected_section(value) {
    var sectionName;
    var anotherSections = [];
    for (i = 0; i < value.length; i++) {
        for (k = 0; k < sections.length; k++) {
            if ( value[i] == sections[k]) {
                sectionName = sections[k]
                sections.forEach(elem => {
                    if (elem !=sections[k]) anotherSections.push(elem)
                })
            }
        }
    }

    if (sectionName == 'all') show_all_sections();
    else hide_another_sections(sectionName, anotherSections)
}


function show_all_sections() {
    for (i = 1; i < sections.length; i++) {
        var elems = document.querySelectorAll('div.' + sections[i])
        elems.forEach(
            elem => {
                elem.style.display = 'block'
                setTimeout(() => {
                    elem.style.opacity = '1'
                    if (window.matchMedia('(max-width: 425px)').matches){
                        elem.style.width = '100%';
                    }else elem.style.width = '30%';
                }, 100)
            }
        )
    }
}

function hide_another_sections(sectionName, anotherSections) {
    var old_blocks = [];
    anotherSections.forEach(elem => {
        old_blocks.push(document.querySelectorAll('div.' + elem))
    })

    old_blocks.forEach(elem => {
        elem.forEach(
            subElem => {
                subElem.style.opacity = '0'
                subElem.style.width = '0%'
                setTimeout(() => {subElem.style.display = 'none'}, 1000)
            }
        )
    })

    var blocks = document.querySelectorAll('div.' + sectionName)
    blocks.forEach(elem => {
        elem.style.display = 'block'
        setTimeout(() => {
            if (window.matchMedia("(max-width: 425px)").matches){
                elem.style.width = '100%';
            }else elem.style.width = '30%';
            elem.style.opacity = '1'
        }, 100)
    })

}