export default class Modal {
    #reOpen = false;
    #nextWindow = false;
    #setupARIA = false;
    #animationArray = ['fadeIn', 'fadeInUp', 'fadeInDown', 'fadeInRight', 'fadeInLeft', 
                        'fadeInUpBig', 'fadeInDownBig'];
    constructor(options) {
        let defaultOptions = {
            isOpen: () => {},
            isClose: () => {},
            beforeOpen: () => {},
            beforeClose: () => {}
        };
        this.options = Object.assign(defaultOptions, options);
        this.modal = document.querySelector('.modal');
        this.modalName = this.modal.dataset.modalName;
        this.isOpen = false;
        this.width = options.width ? options.width : '400px';
        this.closable = options.closable ? options.closable : true
        this.animationWindow = false;
        this.speedWindow = false;
        this.speedOverlay = false;
        this.timeout = false;
        this.previousActiveElement = false;
        this.#setupARIA = options.setupARIA ? options.setupARIA : false;
        this.fixElements = document.querySelectorAll('.fix-block');
        this.focusSelectors = [
            'button',
            'select',
            'input',
            'a[href]',
            'textarea',
            'iframe',
            '[contenteditable]',
            '[tabindex]:not([tabindex^="-"])'
        ];
        if (!this.modal) {return};
        if (this.#setupARIA) {
            this.init();
        }
        this.events();
    }

    init() {
        this.modal.querySelectorAll('.modal__window').forEach((window, index) => {
            const modalTitle = window.querySelector('.modal-item__title');
            const closeBtn = window.querySelector('.modal-item__close');
            
            window.setAttribute('role', 'dialog');
            window.setAttribute('aria-modal', 'true');
            if (closeBtn) {closeBtn.setAttribute('aria-label', 'Закрыть модальное окно');}
            if (modalTitle) {modalTitle.setAttribute('id', `modalTitle_${index + 1}`);}
            window.setAttribute('aria-labelledby', `modalTitle_${index + 1}`);
        })
    }

    addAnimation(animationSelector) {
        this.#animationArray.push(animationSelector);
    }

    events() {
        if (!this.modal) return;

        document.addEventListener('click', function(e) {
            const clickedElement = e.target.closest('[data-modal-open]');
            const target = clickedElement ? clickedElement.dataset.modalOpen : false;

            if (clickedElement && target) {
                let speedOverlay = +clickedElement.dataset.speedOverlay;
                let animationWindow = clickedElement.dataset.animationWindow;
                let speedWindow = +clickedElement.dataset.speedWindow;

                this.animationWindow = animationWindow ? animationWindow : 'fadeIn';
                this.speedWindow = speedWindow ? speedWindow : 300;
                this.speedOverlay = speedOverlay ? speedOverlay : 300;
                this.timeout = Math.max(this.speedWindow, this.speedOverlay);
                this.#nextWindow = this.modal.querySelector(`[data-modal-name=${target}]`);
                this.open();
                return;
            }

            if ((e.target.closest('[data-modal-close]') || !e.target.closest('.modal__window')) && this.isOpen) {
                this.close();
                return;
            }
        }.bind(this));

        window.addEventListener('keydown', function(e) {
            if (e.code === 'Escape' && this.isOpen) {
                this.close();
                return;
            }

            if (e.code === 'Tab' && this.isOpen) {
                this.#focusTrap(e);
                return;
            }
        }.bind(this));
    }

    open(selector) {
        if (!this.#nextWindow) {return};
        this.options.beforeOpen(this);
        this.previousActiveElement = document.activeElement;

        if (this.isOpen) {
            this.#reOpen = true;
            this.close();
            return;
        }

        this.modalWindow = this.#nextWindow;

        if (selector) {
            this.modalWindow = document.querySelector(`data-modal-name="${selector}"`)
        }

        this.modal.style.setProperty('--transition-overlay-time', `${this.speedOverlay / 1000}s`);
        this.modal.style.setProperty('--transition-window-time', `${this.speedWindow / 1000}s`);
        this.modal.classList.add('is-open');
        this.modalWindow.style.setProperty('--width-modal-window', this.width);
        
        this.#disableScroll();
        this.modalWindow.classList.add('modal-open');
        this.modalWindow.classList.add(this.animationWindow);

        setTimeout(() => {
            this.modalWindow.classList.add('animate-open');
            this.options.isOpen(this);
            this.isOpen = true;
            this.#focusCatch();
        }, this.timeout);
    }

    close() {
        if (this.modalWindow) {
            this.options.beforeClose(this);
            this.modalWindow.classList.remove('animate-open');

            setTimeout(() => {
                this.modalWindow.classList.remove(this.animationWindow);
                this.modal.classList.remove('is-open');
                this.modalWindow.classList.remove('modal-open');
                
                this.isOpen = false;
                this.options.isClose(this);
                this.#enableScroll();
                this.#focusCatch();

                if (this.#reOpen) {
                    const animations = this.modalWindow.classList;
                    console.log(animations);
                    const animationsArr = Array.prototype.filter.call(animations, (cls => this.#animationArray.includes(cls)));
                    console.log(animationsArr);
                    this.modalWindow.classList.remove(animationsArr);
                    this.#reOpen = false;
                    this.open();
                }
            }, this.timeout);
        }
    }

    #disableScroll() {
        const currentPosition = window.scrollY;

        this.#lockPadding();

        document.body.classList.add('disable-scroll');
        document.body.dataset.position = currentPosition;
        document.body.style.top = -currentPosition + 'px';
    }

    #enableScroll() {
        const currentPosition = parseInt(document.body.dataset.position, 10);

        this.#unlockPadding();

        document.body.style.top = '';
        document.body.classList.remove('disable-scroll');
        window.scroll({top: currentPosition, left: 0});
        document.body.removeAttribute('data-position');
    }

    #lockPadding() {
        const paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';

        this.fixElements.forEach(elem => {
            elem.style.paddingRight = paddingOffset;
        })

        document.body.style.paddingRight = paddingOffset;
    }

    #unlockPadding() {
        this.fixElements.forEach(elem => {
            elem.style.paddingRight = 0 + 'px';
        })

        document.body.style.paddingRight = 0 + 'px';
    }

    #focusCatch() {
        const focusNodes = this.modalWindow.querySelectorAll(this.focusSelectors)
        if (this.isOpen) {
            setTimeout(() => {
                if (this.closable) {
                    focusNodes[1].focus();
                } else {
                    focusNodes[0].focus();
                }
            }, 100)
        } 
        else {
            this.previousActiveElement.focus();
        }
    }

    #focusTrap(e) {
        const focusNodes = this.modalWindow.querySelectorAll(this.focusSelectors);
        const focusArray = Array.prototype.slice.call(focusNodes);
        const focusedIndex = focusArray.indexOf(document.activeElement);

        if (e.shiftKey && focusedIndex === 0) {
            focusArray[focusArray.length - 1].focus();
            e.preventDefault();
        }

        if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
            focusArray[0].focus();
            e.preventDefault();
        }
    }
}