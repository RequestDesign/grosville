
export default class Form {
    /**
     * 
     * @param {Element} formDomEl 
     * @param {Function} submitFoo 
     * 
     * 
     * 
     */
    constructor(formDomEl, submitFoo) {
        this._form = formDomEl
        this.submitForm = submitFoo ? submitFoo : () => { }
        this._form.setAttribute('novalidate', true)
        this._inputContainerSelector = 'form-input-container'
        this._inputErrorMsgSelector = 'form-input-error'
        this._inputErrorSelector = '_error'
        this._inputs = () => { console.log(this._form.querySelectorAll('input, textarea')); return this._form.querySelectorAll('input, textarea')}
        this._btnSubmit = this._form.querySelector('.form-submit')
        this._btnSubmit.setAttribute('disabled', true)
        this._btnSubmit.setAttribute('type', 'button')
        this._cfg = {
            default: {
                name: {
                    regex: /^[A-Za-zА-Яа-яЁё ]+$/,
                    errMsg: 'Допустим ввод только букв'
                },
                email: {
                    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    errMsg: 'Поле должно быть в формате email@domain.com'
                },
                phone: {
                    regex: /^\+(7|375) \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                    errMsg: 'Формат номера телефона +7 (888) 888-88-88'
                },
                password: {
                    regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    errMsg: 'Пароль должен содержать не менее 8 символов'
                }
            }
        }
        this.initForm()
    }
    _inputHandler(input) {
        /**
         * @param {input} inputDom
         * возвращает булевое
         */
      
        this._btnSubmit.removeAttribute('disabled')
        return this._validation(input);
    }

    _validation(input) {
        /**
        * @param {input} inputDom
        * возвращает булевое
        */
        // валидация инпутов
        // если у инпута (именно у инпута) есть pattern, провряет по этой реге
        // ну как паттерн типа
        // а если у инпута есть data-form_error_message, то и выдаст нужное сообщение


        switch (input.name) {
            case 'name':
                return this._checkInputValid(input,
                    input.hasAttribute('pattern') ? new RegExp(input.getAttribute('pattern')) : this._cfg.default.name.regex,
                    input.dataset.form_error_message ? input.dataset.form_error_message : this._cfg.default.name.errMsg)

            case 'email':
                return this._checkInputValid(input,
                    input.hasAttribute('pattern') ? new RegExp(input.getAttribute('pattern')) : this._cfg.default.email.regex,
                    input.dataset.form_error_message ? input.dataset.form_error_message : this._cfg.default.email.errMsg)

            case 'phone':
                return this._checkInputValid(input,
                    input.hasAttribute('pattern') ? new RegExp(input.getAttribute('pattern')) : this._cfg.default.phone.regex,
                    input.dataset.form_error_message ? input.dataset.form_error_message : this._cfg.default.phone.errMsg)

            case 'password':
                return this._checkInputValid(input,
                    input.hasAttribute('pattern') ? new RegExp(input.getAttribute('pattern')) : this._cfg.default.password.regex,
                    input.dataset.form_error_message ? input.dataset.form_error_message : this._cfg.default.password.errMsg)



            default:
                //если инпут не известен, вернет true, и похуй
                return true
        }

    }

    _checkInputValid(input, regex, errMsg = 'че то не так написал, исправляй') {
        /**
           * @param {input} inputDom
           * @param {regex} regExp
           * @param {errMsg} string
           * возвращает булевое
           */
        if (!input.hasAttribute('required')) return true


        const inputContainer = input.closest('.' + this._inputContainerSelector),
            errorMsg = inputContainer.querySelector('.' + this._inputErrorMsgSelector),
            value = input.value.trim()

        if (value.length <= 0) {
            inputContainer.classList.add(this._inputErrorSelector)
            errorMsg.textContent = 'Это поле обязательно.'
            return false
        }

        if (input.hasAttribute('minlength') && value.length < Number(input.getAttribute('minlength'))) {
            inputContainer.classList.add(this._inputErrorSelector)
            errorMsg.textContent = 'Строка должна быть не короче ' + input.getAttribute('minlength').toString() + ' символов' + '.'
            return false
        }

        if (!regex.test(value)) {
            inputContainer.classList.add(this._inputErrorSelector)
            errorMsg.textContent = errMsg
            return false
        }

        inputContainer.classList.remove(this._inputErrorSelector)
        errorMsg.textContent = ''
        return true


    }


    _onSubmit() {
        let whatsUp = true
        for (const inp of this._inputs()) {
            if(!this._inputHandler(inp)){
                whatsUp = false
                return
            }
            
        }

        if (!whatsUp) return
        //сабмит
        console.log('submit');
        this._form.dispatchEvent(new Event('submit'));

    }



    _fileHandler(evt) {
        //не юзается
        const inputContainer = evt.target.closest('.' + this._inputContainerSelector);
        if (evt.target.value) {
            inputContainer.classList.add('_active')
            inputContainer.querySelector('.input-file-got')
                .querySelector('.input-file-text')
                .textContent = evt.target.value.split('\\').slice(-1)


        } else {
            inputContainer.classList.remove('_active')
        }
    }

    _passowrHide() {
        //не юзается
        if (this._passwordInput.type == 'text') {
            this._passwordInput.setAttribute('type', 'password')
            this._passwordRepeatInput.setAttribute('type', 'password')
        } else {
            this._passwordInput.setAttribute('type', 'text')
            this._passwordRepeatInput.setAttribute('type', 'text')
        }
    }


    initForm() {
        this._form.noValidate = true
        this._btnSubmit.addEventListener('click', (e) => { this._onSubmit(e) })
        this._form.addEventListener('input', (ev)=>{this._inputHandler(ev.target)})
        this._form.addEventListener('blur', (ev)=>{this._inputHandler(ev.target)})
        this._form.addEventListener('change', (ev)=>{this._inputHandler(ev.target)})
      

    }

}
