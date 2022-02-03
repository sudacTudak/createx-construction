export default class Accordion {
    #newAcc = {
        'newElem' : null,
        'newContent': null,
        'newControl': null,
    }

    constructor(selector, options) {
        let defaultOptions = {
            isOpen: () => {},
            isClose: () => {},
            beforeOpen: () => {},
            beforeClose: () => {},
        }
        this.accordionList = document.querySelector(selector);

        if (!this.accordionList) return;

        this.options = Object.assign(defaultOptions, options);
        this.speed = options.speed ? options.speed : 300;
        this.isOpen = false;
        this.reOpen = false;
        this.init();
        this.events();
    }

    init () {
        this.accordions = this.accordionList.querySelectorAll('.accordion');
        if (this.accordions.length < 1) {return}
        this.accordions = Array.prototype.filter.call(this.accordions, (acc => {
            if (!acc.closest('.accordion__content')) {
                return acc;
            }
        }));

        this.controlBlocks = this.accordionList.querySelectorAll('.accordion__control');
        this.contentBlocks = this.accordionList.querySelectorAll('.accordion__content');
        this.accordions.forEach(acc => {
            acc.style.setProperty('--accordion-speed', `${this.speed / 1000}s`);
        });
    }

    events () {
        if (this.accordions.length < 1 || this.controlBlocks.length < 1 || this.contentBlocks.length < 1) {return}
        this.controlBlocks.forEach(el => {
            el.addEventListener('click', () => {
                this.#newAcc.newElem = el.closest('.accordion');
                if (!this.#newAcc.newElem) {return};
                this.#newAcc.newContent = el.nextElementSibling;
                this.#newAcc.newControl = el;

                this.#newAcc.newElem.classList.toggle('open');
                if (this.#newAcc.newElem.classList.contains('open') && this.isOpen) {
                    this.reOpen = true;
                    this.#closePrevious();
                } else if (this.#newAcc.newElem.classList.contains('open') && !this.isOpen) {
                    this.open(this.#newAcc.newElem, this.#newAcc.newContent, this.#newAcc.newControl);
                } else if (this.isOpen) {
                    this.close(this.#newAcc.newElem, this.#newAcc.newContent, this.#newAcc.newControl);
                }
            })
        })
    }

    #closePrevious() {
        const previousAcc = this.accordionList.querySelector('.accordion.is-open');
        
        if (!previousAcc) {return}

        const previousContent = previousAcc.querySelector('.accordion__content');
        const previousControl = previousAcc.querySelector('.accordion__control');
        previousAcc.classList.remove('open');
        this.close(previousAcc, previousContent, previousControl);
    }

    open(currentAcc, currentContent, currentControl) {
        this.options.beforeOpen(this);

        if (this.isOpen) {
            this.reOpen = true;
            this.#closePrevious();
        }

        currentContent.setAttribute('aria-hidden', 'false');
        currentControl.setAttribute('aria-expanded', 'true');
        currentAcc.classList.add('is-open');
        currentContent.style.maxHeight = currentContent.scrollHeight + 'px';
        this.isOpen = true;
        this.options.isOpen(this);
    }

    close(currentAcc, currentContent, currentControl) {
        this.options.beforeClose(this);

        currentAcc.classList.remove('is-open');
        currentContent.style.maxHeight = null;
        currentControl.setAttribute('aria-expanded', 'false');
        currentContent.setAttribute('aria-hidden', 'true');
        this.isOpen = false;
        this.options.isClose(this);

        if (this.reOpen) {
            this.reOpen = false;
            this.open(this.#newAcc.newElem, this.#newAcc.newContent, this.#newAcc.newControl);
        }
    }
}