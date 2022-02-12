import Tabs from './vendors/Tabs';
import '../scss/work.scss';
import './go-top';
import 'focus-visible';
// import '../img/empty-photo.png';

const loadMoreBtn = document.querySelector('.load-more-portfolio__btn');
let isLoadMore = true;

const portfolioRequest = new Request('https://createxconstructionworks-default-rtdb.firebaseio.com/works.json');

const activeBtn = (btn) => {
    loadMoreBtn.classList.add('load-more-portfolio__btn--active');
}

const disableBtn = () => {
    loadMoreBtn.classList.remove('load-more-portfolio__btn--active');
}

const hideLoadMoreBtn = () => {
    loadMoreBtn.style.display = "none";
    isLoadMore = false;
}

const showLoadMoreBtn = () => {
    loadMoreBtn.style.display = "inline-flex";
    isLoadMore = true;
}

const hideLoaded = () => {
    const loadedWorks = document.querySelectorAll('.tabs-portfolio__item.--loaded');
    const worksList = document.querySelector('.tabs-portfolio');

    loadedWorks.forEach(work => {
        worksList.removeChild(work);
    })
}

const renderWorks = (portfolioWorks, currentCategory) => {
    const worksList = document.querySelector('.tabs-portfolio');
    console.log(portfolioWorks);

    portfolioWorks.forEach(work => {
        const {name, description, img, category} = work;

        if (currentCategory !== 'all' && currentCategory !== category) {return}
        console.log(category);
        const workElem = document.createElement('li');
        workElem.classList.add('tabs-portfolio__item');
        workElem.classList.add('tabs__item');
        workElem.classList.add('tabs__item--active');
        workElem.classList.add('--loaded');

        workElem.innerHTML = `
            <a class="tabs-portfolio__tab item-portfolio" href="#" data-tabs-target="${category}">
                <img class="item-portfolio__image" src="${img}" alt="${name}">
                <div class="item-portfolio__content">
                    <h3 class="item-portfolio__title">${name}</h3>
                    <span class="item-portfolio__description">${description}</span>
                    <div class="item-portfolio__btn btn btn--outline-primary btn--regular">View Project</div>
                </div>
            </a>
        `

        worksList.appendChild(workElem);
    })
}

const loadWorks = (currentCategory) => {
    return fetch(portfolioRequest)
        .then(response => {
            console.log(response);
            if (response.ok) return response.json();
        })
        .then(data => {
            renderWorks(data, currentCategory);
            disableBtn();
            hideLoadMoreBtn();
        })
        .catch(error => {
            alert(error);
        })
}

const tabsPortfolio = new Tabs('portfolioTabs', {
    isChanged: (tabs) => {
        hideLoaded();
        if (!isLoadMore) {
            showLoadMoreBtn();
        }
    }
});

loadMoreBtn.addEventListener('click', () => {
    const currentCategory = document.querySelector('.nav-tabs__btn--active').dataset.tabsCategory;

    activeBtn();
    loadWorks(currentCategory);
})


