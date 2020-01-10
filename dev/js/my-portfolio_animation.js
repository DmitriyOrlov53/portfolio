const buttons = Array.from(document.getElementsByClassName('my-portfolio__nav-button'))
const sections = ['all', 'sites', 'apps'];
const sections2 = {'all': null, 'sites': 'my-portfolio__sites', 'apps': 'my-portfolio__apps'};
buttons.map(elem => elem.addEventListener('click', active_button));
function active_button(event) {
    let old_value = document.getElementsByClassName('button_cheked')[0];
    if (old_value != undefined && old_value.classList.remove('button_cheked') != event.target.classList) {
        old_value.classList.remove('buton_cheked');
        old_value.classList.add('button_focused')
    }
    let new_value = event.target.classList;
    new_value.add('button_cheked');
    new_value.remove('button_focused');
    selected_section(Array.from(new_value));
}
function selected_section(value) {
    let result = value.reduce((total, elem) => {
        for (let key in sections2) {
            if (elem == key) {
                total.section_name = key;
                for (let key2 in sections2) {
                    if (sections2[key2] != sections2[total.section_name]) total.another_sections.push(sections2[key2]);
                }
            }
        }
        return total;
    }, {section_name: '', another_sections: []});
    console.log(result)
    result.section_name == 'all' ? show_all_sections() : hide_another_sections(result);
}
function show_all_sections() {
    for (let key in sections2) {
        let elems = Array.from(document.getElementsByClassName(sections2[key]));
        elems.forEach (elem => {
            elem.style.display = 'block'
            setTimeout(() => {
                elem.style.opacity = '1'
                window.matchMedia('(max-width: 425px)').matches ? elem.style.width = '100%' : elem.style.width = '31.58813%';
            }, 100)
        })
    }
}
function hide_another_sections(result) {
    let old_blocks = result.another_sections.reduce((total, section) => {
        let elements_of_section = Array.from(document.getElementsByClassName(section));
        elements_of_section.forEach(elem => {total.push(elem)});
        return total;
    }, new Array)
    old_blocks.forEach(elem => {
        elem.style.opacity = '0'
        elem.style.width = '0%'
        setTimeout(() => {elem.style.display = 'none'}, 1000)
    })
    let blocks = Array.from(document.getElementsByClassName(sections2[result.section_name]))
    blocks.forEach(elem => {
        setTimeout(() => {
            elem.style.display = 'block'
            window.matchMedia("(max-width: 425px)").matches ? elem.style.width = '100%' : elem.style.width = '31.58813%';
            elem.style.opacity = '1'
        }, 100)
    })
}