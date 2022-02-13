import Choices from 'choices.js';
import 'focus-visible';
import './go-top';
import 'choices.js/src/styles/choices.scss';
import '../scss/contacts.scss';
import {transitionTime} from './cssProperties';
import './forms';

const selectsContactUs = document.querySelectorAll('.form-field__select');

selectsContactUs.forEach( sel => {
    const choicesSelect = new Choices(sel, {
        searchEnabled: false,
        shouldSort: false,
        allowHTML: true,
        position: 'bottom',
        itemSelectText: '',
    })
});