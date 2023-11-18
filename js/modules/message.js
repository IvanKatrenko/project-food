/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
function message() {
    //КРАСИВРЕ ОПОВЕЩЕНИЕ ПОЛЬЗОВАТЕЛЯ
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide'); // cкрыть контент
        openModal(); // эта функция отвечает за открытие модальных окон

        const thanksModal = document.createElement('div'); //cоздаем наш новый контент
        thanksModal.classList.add('modal__dialog'); // тому div мы добавляем классы
        thanksModal.innerHTML = ` 
    <div class = 'modal__content>
        <div class = "modal__close" data-close>x</div>
        <div class="modal__title'>${message} </div>
    </div>
    
    `; //формирование верстки которая будет находиться в модальном окне

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => { //асинхронная операция
            thanksModal.remove();
            prevModalDialog.classList.add('show'); //покахываем show
            prevModalDialog.classList.remove('hide'); // удаляем hide
            closeModal();
        }, 4000);
    }
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    // 	method: 'POST',
    // 	BODY: JSON.stringify({name: 'Alex'}),
    // 	headers: {
    // 		'Content-type': 'application/json'
    // 	}
    // })
    // 	.then(response => response.json())
    // 	.then(json => console.log(json));
    //ОБРАЗЕМСЯ К НАШЕЙ БАЗЕ ДАННЫХ
    // fetch ('http://localhost:3000/menu') // поменяли на дарес и получаем массив in console
    // 	.then(data => data.json())
    // 	.then(res => console.log(res)); // in console получаем Object

}
export default message;