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
export default timer;