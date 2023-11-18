/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeSelector) {
    //TABS

    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);
    // 1 задача это скрыть все ненужные нам табы,cоздаем функию  то есть скрываем контент наших фунции
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        //добаввялем функционал класса активности
        tabs.forEach(item => {
            item.classList.remove(activeSelector);
        });
    }
    //cоздаем вторую функцию которая будет нам показывать табы
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeSelector);
    }

    hideTabContent();
    showTabContent();
    //использвуем делегирование события, и обозначаем обраьботчик события клика
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;