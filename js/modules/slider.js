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
export default slider;