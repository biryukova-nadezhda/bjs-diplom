"use strict";
// Реализация выхода с аккаунта
const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success === true) {
            location.reload();
            console.log("Деавторизация пользователя прошла успешно");
        }
    })
}




// Получение данных о текущем пользователе
ApiConnector.current(response => {

    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    } else {
        console.log(response.error);
    }

})




//Реализация обновления доски валют
const ratesBoard = new RatesBoard();

function getExchangeRates() {
    ApiConnector.getStocks(response => {

        if (response.success === true) {
            ratesBoard.clearTable;
            ratesBoard.fillTable(response.data);
            console.log("Запрос на обновление табло с курсом валют успешно выполнен!");
        } else {
            console.log(response.error);
        }
    })
}

///!!! Не знаю, как выполнить условие, чтобы функция вызывалась раз в минуту. Она вызываается 1 раз и все
setInterval(getExchangeRates(), 6000);




//Реализация операций с деньгами
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Пополнение баланса выполнено успешно!");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Операция конвертации выполнена успешно");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Перевод денежных средств выполнен успешно");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}




//Реализация отображения, добавления и удаления пользователей из избранного
const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {

    if (response.success === true) {
        favoritesWidget.clearTable;
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }

})

//При очистке таблицы, она почему-то не очищается , а заново заполняется
favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success === true) {
            favoritesWidget.clearTable;
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь успешно добавлен в избранное!");
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
}

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success === true) {
            favoritesWidget.clearTable;
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь успешно удален из избранного!");
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
}