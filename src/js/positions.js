import Modal from './vendors/Modal';
import '../scss/vendors/Modal.scss';
import Choices from 'choices.js';
import 'choices.js/src/styles/choices.scss';
import '../scss/positions.scss';
import 'focus-visible';
import './go-top';
import {transitionTime} from './cssProperties';
import './forms';

const selectsModal = document.querySelectorAll('.modal .form-field__select');

const modalSubscribe = new Modal({
    closable: true,
    width: '486px',
})

selectsModal.forEach( sel => {
    const choicesSelect = new Choices(sel, {
        searchEnabled: false,
        shouldSort: false,
        placeholder: true,
        allowHTML: true,
        position: 'bottom',
        itemSelectText: '',
    })
})