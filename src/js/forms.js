import inputmask from "inputmask";
import JustValidate from "just-validate";

const sendForm = (form, submitter) => {
    submitter.setAttribute('disabled', 'true');

    const formData = new FormData(form);

    fetch('https://jsonplaceholder.typicode.com/photos', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        form.reset();
        alert('Form was sended');
        submitter.removeAttribute('disabled');
    })
    .catch(response => {
        alert('Error! Please, try again');
        submitter.removeAttribute('disabled');
    })
}

const validateCustomSelect = (select) => {
    const selectedIndex = select.selectedIndex;
    const selectedOption = select.querySelectorAll('option')[selectedIndex];
    const name = select.name;
    let choices;
    let errorContainer;

    if (selectedOption.value === '') {
        choices = select.closest('.choices');
        errorContainer = choices.parentNode.querySelector('.error-message');

        errorContainer.textContent = `Please choose your ${name}`;
        errorContainer.classList.add('is-active');

        choices.classList.remove('is-success');
        choices.classList.add('is-invalid');

        return false;
    }

    choices = select.closest('.choices');
    errorContainer = choices.parentNode.querySelector('.error-message');

    errorContainer.classList.remove('is-active');
    errorContainer.textContent = '';

    choices.classList.remove('is-invalid');
    choices.classList.add('is-success');

    return true
}

const rulesDefault = {
    errorFieldCssClass: 'is-invalid',
    successFieldCssClass: 'is-success',
    errorLabelCssClass: 'label-is-invalid',
    successLabelCssClass: 'label-is-success',
    errorLabelStyle: '',
    errorFieldStyle: '',
    successFieldStyle: '',
    successLabelStyle: '',
}

const initForm = (form, rules, sendModal) => {
    const inputMask = new inputmask("+7 (999) 999-99-99");

    Array.prototype.forEach.call(form.elements, el => {
        if (el.type === "tel") {
            inputMask.mask(el);
        }
    })

    const validate = new JustValidate(form, rules);

    Array.prototype.forEach.call(form.elements, el => {
        if (!el.hasAttribute('data-req')) {return};

        if (el.name === "name") {
            validate.addField('input[name="name"][data-req]', [
                {
                    rule: 'required',
                    errorMessage: 'This field is required',
                }
            ],
            {
                successMessage: 'Looks good!',
            });
        }

        if (el.type === "tel") {
            validate.addField('input[type="tel"][data-req]', [
                {
                    validator: (value) => {
                        return (/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/).test(value);
                    },
                    errorMessage: 'Number is invalid',
                },
                {
                    rule: 'required',
                    errorMessage: 'This field is required',
                }
            ],
            {
                successMessage: 'Looks good!',
            })
        }

        if (el.type === "email") {
            validate.addField('input[name="email"][data-req]', [
                {
                    rule: 'required',
                    errorMessage: 'This field is required',
                },
                {
                    rule: 'email',
                    errorMessage: 'Email is invalid',
                },
            ],
            {
                successMessage: 'Looks good!',
            });
        }

        if (el.nodeName === 'SELECT') {
            validate.addField('select[data-req]', [
                {
                    validator: (value) => {
                        return validateCustomSelect(el);
                    },
                    errorMessage: 'You should choose your location',
                }
            ])
        }

        if (el.type === 'checkbox') {
            validate.addField('[type="checkbox"][data-req]', [
                {
                    rule: 'required',
                    errorMessage: 'You should check this',

                }
            ]) 
        }

        if (el.name === 'message') {
            validate.addField('textarea[name="message"][data-req]', [
                {
                    rule: 'required',
                }
            ],
            {
                successMessage: 'Looks good!',
            })
        }

        if (el.type === 'file') {
            validate.addField('input[type="file"][data-req]', [
                {
                    rule: 'minFilesCount',
                    value: 1,
                }
            ])
        }
    })

    validate.onSuccess( (e) => {
        
        sendForm(form, e.submitter);
    })
}

document.querySelectorAll('form').forEach(form => {
    initForm(form, rulesDefault);
})
