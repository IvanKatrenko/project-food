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

import { closeModal, openModal } from './modal';

import { postData } from '../services/services';
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

            postData('http://localhost:3000/requests', json)
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
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;