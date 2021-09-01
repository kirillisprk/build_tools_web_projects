'use strict'
export const formatError = text => `
<span style="color: red;">
    ${text}
</span>
`;

export const validateValueTimer = (valueTimer, element) => {
    if (valueTimer !== 0) {
        element.removeAttribute('disabled');
    } else {
        element.setAttribute('disabled', '');
    }
}
export const showButton = (statusTimer, btnRun, btnReset) => {
    if (statusTimer) {
        btnRun.classList.remove('none');
        btnReset.classList.add('none');
    } else {
        btnRun.classList.add('none');
        btnReset.classList.remove('none');
    }
}