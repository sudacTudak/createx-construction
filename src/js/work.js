import '../scss/work.scss';
import Tabs from './vendors/Tabs';

if (module.hot) {
	module.hot.accept()
}

const loadMoreBtn = document.querySelector('.load-more-portfolio__btn');
const activeTabsItems = document.querySelectorAll('.tabs__item--active');
const activeTabsItemsCount = activeTabsItems.length;

const hideItems = (items, category) => {
    console.log(items, 'hide');
    items.forEach( (item, i) => {
        if (i > 8) {
            item.classList.add('tabs__item--hidden-more');
        }

        if (category !== 'all' && item.dataset.tabsTarget !== category) {
            item.classList.remove('tabs__item--visible-more');
            item.classList.add('tabs__item--hidden-more');
        }
    });
}

const showItems = (items, category) => {
    console.log(items, 'show');
    items.forEach(item => {
        if (category !== 'all' && item.dataset.tabsTarget !== category) {
            item.classList.add('tabs__item--hidden-more');
            item.classList.remove('tabs__item--visible-more');
        }
        if (category === 'all') {
            item.classList.add('tabs__item--hidden-more');
        }
    });
}

const isLoadMoreNeeded = (activeTabsItems) => {
    if (activeTabsItems.length > 9) {
        loadMoreBtn.style.display = "inline-flex";
    } else {
        loadMoreBtn.style.display = "none";
    }
}

const loadMore = (category) => {
    const activeTabsItems = document.querySelectorAll('.tabs__item--active');

    if (category === 'all') {
        for (let i = 9; i < activeTabsItems.length; i++) {
            activeTabsItems[i].classList.remove('tabs__item--hidden-more');
            activeTabsItems[i].classList.add('tabs__item--visible-more');
        }
    } else {
        for (let i = 9; i < activeTabsItems.length; i++) {
            activeTabsItems[i].classList.remove('tabs__item--hidden-more');
            activeTabsItems[i].classList.add('tabs__item--visible-more');
        }
    }

    loadMoreBtn.style.display = "none";
}

const tabsPortfolio = new Tabs('portfolioTabs', {
    isChanged: (tabs) => {
        const activeTabsItems = tabs.tabsPanel.querySelectorAll('.tabs__item--active');
        const activeCategory = document.querySelector('.nav-tabs__btn--active').dataset.tabsCategory;

        showItems(activeTabsItems, activeCategory);
        hideItems(activeTabsItems, activeCategory);
        isLoadMoreNeeded(activeTabsItems);
    }
});

loadMoreBtn.addEventListener('click', () => {
    const activeTab = document.querySelector('.nav-tabs__btn--active');
    const category = activeTab.dataset.tabsCategory;

    loadMore(category);
})

