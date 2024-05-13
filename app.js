const burgerMenu = document.querySelector('.burger-menu');
const header = document.querySelector('.header');
const mobileMenu = document.createElement('div');
mobileMenu.classList.add('mobile-menu');

burgerMenu.addEventListener('click', function() {
    burgerMenu.classList.toggle('active-burger');
    if (burgerMenu.classList.contains('active-burger')) {
        header.appendChild(mobileMenu);
        mobileMenu.innerHTML = `
            <ul class="mobile-list">
                <li><a href="./index.html">HOME</a></li>
                <li><a href="./about-us.html">ABOUT US</a></li>
                <li><a href="./create-plan.html">Create your plan</a></li>
            </ul>
        `;
    } else {
        header.removeChild(mobileMenu);
    }
})

const choosePlanOptions = document.querySelectorAll('input[type="radio"]');
const summaryOrderTotal = document.querySelector('.choice__plan-order_summary-total');
const buttonConfirm = document.querySelector('.choice__plan-order_confirm');

choosePlanOptions.forEach(function(choosePlanOption) {
    choosePlanOption.addEventListener('change', function() {

        let howDrinkValue = document.querySelector('input[name="how-drink-coffee"]:checked');
        let typeValue = document.querySelector('input[name="coffee-type"]:checked');
        let amountValue = document.querySelector('input[name="coffe-amount"]:checked');
        let gridValue = document.querySelector('input[name="want-to-grid"]:checked');
        let deliveryValue = document.querySelector('input[name="delivery"]:checked');

        // Перевіряємо, чи радіокнопка була обрана перед отриманням значення
        howDrinkValue = howDrinkValue ? howDrinkValue.value : "_";
        typeValue = typeValue ? typeValue.value : "_";
        amountValue = amountValue ? amountValue.value : "_";
        gridValue = gridValue ? gridValue.value : "_";
        deliveryValue = deliveryValue ? deliveryValue.value : "_";

        // Оновлюємо вміст елемента з відображенням
        summaryOrderTotal.innerHTML = `
            “I drink my coffee using <span>${howDrinkValue}</span>, with a <span>${typeValue}</span> type of bean.
            <span>${amountValue}</span> ground ala <span>${gridValue}</span>, sent to me <span>${deliveryValue}</span>.”
        `;

        let summaryContent = summaryOrderTotal.textContent || summaryOrderTotal.innerText;

        if (summaryContent.includes('_')) {
            buttonConfirm.disabled = true; 
            buttonConfirm.classList.remove('not-disabled');

        } else {
            buttonConfirm.disabled = false;
            buttonConfirm.classList.add('not-disabled');

            buttonConfirm.addEventListener('click', () => {
                const modal = document.querySelector('.modal');
                const overlay = document.querySelector('.overlay');
                const modalConfirm = document.querySelector('.modal__info-order');

                modal.style.display = 'block';
                overlay.classList.add('active');
                modal.scrollIntoView({ behavior: 'smooth', block: 'start' });
                modalConfirm.innerHTML = `
                    “I drink my coffee using <span>${howDrinkValue}</span>, with a <span>${typeValue}</span> type of bean.
                    <span>${amountValue}</span> ground ala <span>${gridValue}</span>, sent to me <span>${deliveryValue}</span>.”
                `;

                const checkoutBtn = document.querySelector('.modal__info-checkout-button');
                checkoutBtn.addEventListener('click', () => {
                    modal.style.display = 'none';
                    overlay.classList.remove('active');
                })
            })
        }
    });

});

const questions = document.querySelectorAll('.choice__plan-create a');
const toggle = (e) => {
    e.preventDefault();
    const article = e.target.closest('article');
    
    if (article.classList.contains('plan-create-flex')) {
        article.classList.toggle('plan-create-flex'); 
        article.querySelector('.choice__plan-create_answers').setAttribute('style', 'height: 0');
        article.querySelector('.choice_arrow').setAttribute('src', './images/create-plan/arrow_down.svg');
    } else {
        article.classList.toggle('plan-create-flex');
        article.querySelector('.choice_arrow').setAttribute('src', './images/create-plan/arrow.png');

        function checkScreenSize(mediaQuery) {
            if (mediaQuery.matches) {
                article.querySelector('.choice__plan-create_answers').setAttribute('style', `height: 452px`);
            } else {
                article.querySelector('.choice__plan-create_answers').setAttribute('style', `height: 250px`);
            }
        }
          
        // Створення об'єкту MediaQueryList з медіа-запитом
        let mediaQuery = window.matchMedia('(max-width: 440px)');
          
        // Виклик функції при завантаженні сторінки для перевірки поточного розміру екрана
        checkScreenSize(mediaQuery);
          
        // Додавання події, яка буде спрацьовувати при зміні розміру екрана
        mediaQuery.addEventListener('change', () => checkScreenSize(mediaQuery));
    }

}

for (let i = 0; i < questions.length; i++) {
    questions[i].addEventListener('click', toggle)
}
