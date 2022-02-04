export default class Tabs {
    constructor(selector, options) {
        let defaultOptions = {
            isChanged: () => {}
        }
        this.options = Object.assign(defaultOptions, options);
        this.selector = selector;
        this.tabs = document.querySelector(`[data-tabs="${selector}"]`);
        if (!this.tabs) {return};
        this.tabsList = this.tabs.querySelector('.nav-tabs');
        this.tabsButtons = this.tabsList.querySelectorAll('.nav-tabs__btn');
        this.tabsPanel = this.tabs.querySelector('.tabs__panel');
        this.tabsItems = this.tabsPanel.querySelectorAll('[data-tabs-target]');
        this.activeTabButton = null;

        if (!this.check) {return}
        this.init();
        this.events();
    }

    check() {
        if (document.querySelectorAll(`[data-tabs="${this.selector}"]`).length > 1) {return false}

        return true;
    }

    init() {
        this.tabsList.setAttribute('role', 'tablist');

        this.tabsButtons.forEach((elem, i) => {
            const btnCategory = elem.dataset.tabsCategory;

            elem.setAttribute('role', 'tab');
            elem.setAttribute('tabindex', '-1');
            elem.classList.remove('nav-tabs__btn--active');
            btnCategory ? elem.setAttribute('id', `${this.selector}_${btnCategory}`) : elem.setAttribute('id', `${this.selector}_${i+1}`);
        });

        this.tabsItems.forEach((item) => {
            item.closest('li').classList.add('tabs__item');
            item.closest('li').classList.remove('tabs__item--active');
            item.closest('li').setAttribute('tabindex', '-1');
        })

        this.tabsPanel.setAttribute('role', 'tabpanel');
        this.tabsPanel.setAttribute('aria-labelled-by', this.tabsButtons[0].id);

        this.tabsButtons[0].classList.add('nav-tabs__btn--active');
        this.tabsButtons[0].removeAttribute('tabindex');
        this.tabsButtons[0].setAttribute('aria-selected', 'true');
        this.switch(this.tabsButtons[0]);
    }

    events() {
        this.tabsButtons.forEach((elem, i) => {
            elem.addEventListener('click', (e) => {
                let currentTab = this.tabsList.querySelector('[aria-selected]');
                if (e.currentTarget !== currentTab) {
                    this.switch(e.currentTarget, currentTab);
                }
            })

            elem.addEventListener('keydown', (e) => {
                let index = Array.prototype.indexOf.call(this.tabsButtons, e.currentTarget);
                let dir = null;

                switch (e.code) {
                    case 'ArrowLeft':
                        dir = index - 1;
                        break;
                    case 'ArrowRight':
                        dir = index + 1;
                        break;
                    case 'ArrowDown':
                        dir = 'down'
                        break;
                    default:
                        dir = null;
                        break;
                }
                if (dir === null) {return};
                dir === 'down' ? this.tabsPanel.focus() : this.tabsButtons[dir] ? this.switch(this.tabsButtons[dir], e.currentTarget) : undefined;
            })
        })
    }

    switch(newTab, oldTab = this.tabsButtons[0]) {
        oldTab.classList.remove('nav-tabs__btn--active');
        oldTab.removeAttribute('aria-selected');
        oldTab.setAttribute('tabindex', '-1');
        
        newTab.focus();
        newTab.removeAttribute('tabindex');
        newTab.classList.add('nav-tabs__btn--active');
        newTab.setAttribute('aria-selected', 'true');
        this.activeTabButton = newTab;

        this.tabsPanel.setAttribute('aria-labelled-by', newTab.id);

        if (newTab.dataset.tabsCategory === 'all') {
            this.tabsItems.forEach(item => {
                item.closest('li').classList.add('tabs__item--active');
            })
        } else {
            this.tabsItems.forEach(item => {
                newTab.dataset.tabsCategory === item.dataset.tabsTarget ? 
                    item.closest('li').classList.add('tabs__item--active') :
                    item.closest('li').classList.remove('tabs__item--active');
            })
        }
        
        this.options.isChanged(this);
    }
}