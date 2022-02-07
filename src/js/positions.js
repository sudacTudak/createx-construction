import '../scss/vendors/Modal.scss';
import '../scss/positions.scss';
import Modal from './vendors/Modal';
import {transitionTime} from './cssProperties';

const modalSubscribe = new Modal({
    closable: true,
    width: '486px',
})