/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* eslint-disable indent */
function calc() {
    // Calculator, добавили id  в html документ id="female", id="male",  data-ratio="1.2".........

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio; //создадим еще 5 перемен(ratio это коефициент активности)

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !age || !weight || !ratio) {
            result.textContent = '____';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio); // math.round использунться для округления числа
        }
    }
    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id'); // написано что это у нас либо женщина либо мужчина
                    localStorage.setItem('sex', e.target.getAttribute('data-ratio'));
                }
                console.log(ratio, sex); // что ьы сразу посмотреть на значение переменны

                elements.forEach(elem => {
                    elem.classList.remove(activeClass); // работаем  с лкассами активности
                });
                e.target.classList.add(activeClass); // назначаем тому div который кликнули класс активности
                calcTotal();
            });

            //теерь отслеживаем события по клику
            // document.querySelector(parentSelector);


        });
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) { // эта функция будет применять только один аргумент
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            //когда пользователь вводит что то и оно не подходит то input горит красным
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });

    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}
/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

function cards() {
    //ИСПОЛЬЗУЕМ КЛАССЫ ДЛЯ КАРТОЧЕК !!!!

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() { //добавляем еще они метод который бует заниматься конвертацией валют
            this.price = this.price * this.transfer; //цена умножаеться на курс валют
        }

        render() { // еще один метод что бы сформировать верстку
            const element = document.createElement('div');
            if (this.classes.length === 0) { // если к-во элементов равно нулю, то есть ни один элемент класса не был предан в таком случае стави дефолтный класс
                this.element = 'menu__item'; //дефолтный класс который будет записываться в это свойство
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className)); // если есть хотя бы один класс то я запускаю вот эту часть
            }

            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
            this.parent.append(element);
        }
    }
    // const div = new MenuCard(); // можно так но снизу дпугой метод
    // div.render();

    const getResource = async (url, data) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    // getResource('http://localhost:3000/menu')
    // 	.then(data => {
    // 		data.forEach(({img, altimg, title, descr, price}) => {
    // 			new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    // 		});
    // 	});
    //2 вариант когда сверху
    // getResource('http://localhost:3000/menu')
    // 	.then(data => createCard(data));

    // function createCard(data) {
    // 	data.forEach(({img, altimg, title, descr, price}) => {
    // 		const element = document.createElement('div');

    // 		element.classList.add('menu__item');

    // 		element.innerHTML = `
    // 			<img src=${img} alt=${altimg}>
    // 				<h3 class="menu__item-subtitle">${title}</h3>
    // 				<div class="menu__item-descr">${descr}</div>
    // 				<div class="menu__item-divider"></div>
    // 				<div class="menu__item-price">
    // 					<div class="menu__item-cost">Цена:</div>
    // 					<div class="menu__item-total"><span>${price}</span> грн/день</div>
    // 				</div>
    // 				`;

    // 		document.querySelector('.menu .container').append(element);
    // 	});
    // }
    //добавление библиотеки axios
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
// import { closeModal, openModal } from "./modal";

// function forms() {
//     //Forms ЭТО ЕЩЕ РАЗ ПОСЛУШАТЬ
//     // получение всех форм что у нас есть на странице
//     const forms = document.querySelectorAll('form'); //получим все формы по тегу form

//     const message = { // обьект о вызове каких то сообащений, это неоюольшое колисчетво сообщений которой нужно показать пользователю
//         loading: 'img/form/spinner.svg',
//         success: 'спасибо, cкоро мы с вами свяжемся',
//         failure: 'что - то пошло не так....'
//     };

//     forms.forEach(item => {  // под каждую ОРМУ ПОДВЯЗЫВАЕМ post
//         bindPostData(item);
//     });

//     const postData = async (url, data) => {
//         const res = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-type': 'appliaction/json'
//             },
//             body: data
//         });
//         return await res.json();
//     };

//     //ЭТА ФНУКЦИЯ ОТВЕЧАЕТ ЗА ПРИВЯЗКУ ХОСТИНГА(ПРИВЯЗКА ХОСТИНГ ДАННЫХ)
//     function bindPostData(form) { //прописыаем функцию которая будет отвечать за постинг данных
//         form.addEventListener('submit', (e) => { // на на эту форму нвышиваем событие submit
//             e.preventDefault();// что бы отменить стандартное поведение браузера мы используем это <===

//             const statusMessage = document.createElement('img');//
//             statusMessage.src = message.loading;
//             statusMessage.style.cssText = `
// 			display:block;
// 			margin: 0 auto;
// 			`;
//             // form.append(statusMessage); // к форме мы будем добавлять это небольшое сообщение
//             form.insertAdjacentElement('afterend', statusMessage);

//             // const request = new XMLHttpRequest();
//             // request.open('POST', 'server.php'); // всегда вызваеться метод open что бы насроить этот запрос, и во внутрь помещаем нужные нам данные

//             // request.setRequestHeader('Content-type', 'application/json'); // для заголовков

//             const formData = new FormData(form);

//             const json = JSON.stringify(Object.fromEntries(formData.entries()));

//             // const obj = {a:23, b: 43};
//             // console.log(Object.entries(obj));

//             // request.send(json); // vметод отправки

//             // fetch('server.php', { //этап моего запроса, моего фэтча
//             // 	method: 'POST',
//             // 	headers: {
//             // 		'Content-type': 'appliaction/json'
//             // 	},
//             // 	body: JSON.stringify(Object)
//             // });

//             postData(' http://localhost:3000/requests', json)
//                 // .then(data => data.text())
//                 .then(data => {
//                     console.log(data);
//                     showThanksModal(message.success);
//                     // form.reset();
//                     statusMessage.remove();
//                 }).catch(() => {
//                     showThanksModal(message.failure);
//                 }).finally(() => {
//                     form.reset();
//                 });

//             // request.addEventListener('load', () => { // здесь отслежтваем конечную загрузку нашего запроса
//             // 	if (request.status == 200) {
//             // 		console.log(request.response);
//             // 		showThanksModal(message.success); 
//             // 		form.reset();
//             // 		// setTimeout(() => {
//             // 		statusMessage.remove();
//             // 		// },2000); // что бы очищалось данные через 2 секунды
//             // 	} else {
//             // 		showThanksModal(message.failure); 
//             // 	}
//             // });
//         });
//     }
// }
// export default forms; 




function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: function() { return /* binding */ closeModal; },
/* harmony export */   openModal: function() { return /* binding */ openModal; }
/* harmony export */ });
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* eslint-disable no-undef */
/* eslint-disable indent */
function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
    // SLIDER

    // const slides = document.querySelectorAll('.offer__slide'),
    // 	prev = document.querySelector('.offer__slider-prev'),
    // 	next = document.querySelector('.offer__slider-next'),
    // 	total = document.querySelector('#total'),
    // 	current = document.querySelector('#current');

    // 	let slideIndex = 1;
    // 	//warint slider 1 !!!!!!!!!!!!
    // showSlides(slideIndex);

    // if (slides.length < 10) {
    // 	total.textContent = `0${slides.length}`;
    // } else {
    // 	total.textContent = slides.length;
    // }

    // function showSlides(n) { //когда мы из первого слайда превращаемся в последний а из полсднего в первый
    // 	if (n > slides.length) {
    // 		slideIndex = 1;
    // 	}
    // 	if (n < 1) {
    // 		slideIndex = slides.length;
    // 	}

    // 	slides.forEach((item) => item.style.display = 'none');

    // 	slides[slideIndex - 1].style.display = 'block'; // Как ваша самостоятельная работа - переписать на использование классов show/hide

    // 	if (slides.length < 10) {
    // 		current.textContent =  `0${slideIndex}`;
    // 	} else {
    // 		current.textContent =  slideIndex;
    // 	}
    // }

    // function plusSlides (n) {
    // 	showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', function(){
    // 	plusSlides(-1);
    // });

    // next.addEventListener('click', function(){
    // 	plusSlides(1);
    // });

    // SLIDER wariant 2

    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector(field);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    // Создаем навигацию для слайдов, индикаторы на слайдерах
    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
		box-sizing: content-box;
		flex: 0 1 auto;
		width: 30px;
		height: 6px;
		margin-right: 3px;
		margin-left: 3px;
		cursor: pointer;
		background-color: #fff;
		background-clip: padding-box;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		opacity: .5;
		transition: opacity .6s ease;
		`;
        if (i == 0) {
            dot.style.opacity = 1; // для первой точки будет активная
        }
        indicators.append(dot);
        dots.push(dot);
    } // конец навигации для слайдов, индикаторы на слайдерах


    next.addEventListener('click', () => {
        if (offset == (deleteNotDigits(width) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5'); // это от инидикаторв снизу картинки 
        dots[slideIndex - 1].style.opacity = 1;    // точки 
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        dots.forEach(dot => dot.style.opacity = '.5');  // это от инидикаторв снизу картинки
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');



            slideIndex = slideTo; // кликнули на 4 нажалась 4
            offset = deleteNotDigits(width) * (slideTo - 1);
            // общая наша ширина и умножаем ее на
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            // снизу это работа с точками
            dots.forEach(dot => dot.style.opacity = '.5');  // это от инидикаторв снизу картинки
            dots[slideIndex - 1].style.opacity = 1;
        });
    });
    //создаем новую фнукцию, эта функция будет применять какуе то строку
    function deleteNotDigits(str) {
        return +str.replace(/[^\d.]/g, '');    //вставили такое  replace(/[^\d.]/g, '') вместо replace(/\D/g, '')  и картинки меняет
    }
}
/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* eslint-disable no-undef */
/* eslint-disable indent */
function timer(id, deadline) {

    // TIMER

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); //cколько у нас осталось
        // если акция закончилась что б не было отрицательных чисел добавим такое снизу
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),  //(1000 * 60 * 60 * 24) - cколько в сутках милисекунд
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60);
        }
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }
    //функция помощник
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num; // это фнукция будет в себя принимать какое то число и что т оделат внутри, наше число больше или равно нулю,  наше условие ввыполнеться тогда когда число будет меньше 10, если это условие произошло тогда мы из нашей функции будем возвращать модифицированое значение `0${num}`;
        }
    }

    //записываем функцию которая будет устанавливать наш таймер прямо на страницу
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            //функция которая будет запускать таймер каждую секунду
            timeInterval = setInterval(upDateClock, 1000);

        upDateClock();

        // записыаем фнукцию которая будет обновлять нам таймер каждую секунду
        function upDateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days); //количество дней которые нужно отобразить на странице
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(id, deadline);
}
/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: function() { return /* binding */ getResource; },
/* harmony export */   postData: function() { return /* binding */ postData; }
/* harmony export */ });
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'appliaction/json'
        },
        body: data
    });
    return await res.json();
};

async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
// require('es6-promise').polyfill();
// import 'nodelist-foreach-polyfill';
// import 'slick-slider';









window.addEventListener('DOMContentLoaded', function () {
	const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000);

	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-06-11');
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner'
	});
});



}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map