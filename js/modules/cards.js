/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { getResource } from '../services/services'
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

export default cards;