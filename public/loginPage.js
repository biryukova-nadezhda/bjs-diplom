"use strict";

const user = new UserForm();

user.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        if (response.success === true) {
            location.reload();
            console.log("Авторизация пользователя прошла успешно");
        } else {
            user.setLoginErrorMessage(response.error);
        }
    })
}

user.registerFormCallback = data => {
    ApiConnector.register(data, response => {
        if (response.success === true) {
            location.reload();
            console.log("Регистрация нового пользователя прошла успешно");
        } else {
            user.setRegisterErrorMessage(response.error);
        }
    })
}