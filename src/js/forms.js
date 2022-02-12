import inputmask from "inputmask";
import "just-validate";

const rulesDefault = {

}

const initForm = (selector, rules, sendModal) => {
    const form = document.querySelector(selector);
    const inputPhone = Array.prototype.find.call(form.elements, el => {
        return el.type === "tel";
    })

    const inputMask = new inputmask("+7 (999) 999-99-99");
    inputMask.mask(inputPhone);

    const validate = new JustValidate(form, {
        rules: rules,
    })

    form.elements.forEach(el => {
        if (!el.hasAttribute('data-req')) {return};

        if (el.name === "name") {
            validate.addField('[name="name"]', [
                {
                    rule: 'minLength',
                    value: 3,
                },
                {
                    rule: 'maxLength',
                    value: 18,
                }
            ]);
        }

        if (el.type === "email") {
            validate.addField('[name="email"]', [
                {
                    rule: 'required',
                    errorMessage: 'Email is required',
                },
                {
                    rule: 'email',
                    errorMessage: 'Email is invalid',
                },
            ]);
        }
    })
}