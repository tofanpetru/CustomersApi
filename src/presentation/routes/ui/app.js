// app.js

document.addEventListener('DOMContentLoaded', function () {
    const outputContainer = document.getElementById('output-container');
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const input3 = document.getElementById('input3');
    const error1 = document.getElementById('error1');
    const error2 = document.getElementById('error2');
    const error3 = document.getElementById('error3');

    function handleButtonClick(buttonId) {
        // Пример логики для каждой кнопки
        switch (buttonId) {
            case 'getButton':
                handleGetButton();
                break;
            case 'deleteButton':
                handleDeleteButton();
                break;
            case 'createButton':
                handleCreateButton();
                break;
            case 'updateButton':
                handleUpdateButton();
                break;
            default:
                break;
        }
    }

    // Назначаем обработчики событий для каждой кнопки
    document.getElementById('getButton').addEventListener('click', () => handleButtonClick('getButton'));
    document.getElementById('deleteButton').addEventListener('click', () => handleButtonClick('deleteButton'));
    document.getElementById('createButton').addEventListener('click', () => handleButtonClick('createButton'));
    document.getElementById('updateButton').addEventListener('click', () => handleButtonClick('updateButton'));


    function handleGetButton() {
        clearErrors();
        const input1Value = input1.value.trim();

        if (input1Value !== '') {
            // Если input1 заполнен, отправляем запрос на /v1/customers/{id}
            const customerId = encodeURIComponent(input1Value);
            const url = `/v1/customers/${customerId}`;

            sendRequest(url, outputContainer);
        } else {
            // Если input1 пуст, отправляем запрос на /v1/customers
            const url = '/v1/customers';

            sendRequest(url, outputContainer);
        }
    }

    function sendRequest(url, outputContainer) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Обработка успешного ответа
                handleRequestSuccess(data, outputContainer);
            })
            .catch(error => {
                // Обработка ошибок
                if (outputContainer) {
                    outputContainer.innerText = `Error: ${error.message}`;
                } else {
                    console.error(`Error: ${error.message}`);
                }
            });
    }


    function handleDeleteButton() {
        clearErrors();
        const input1Value = input1.value.trim();

        if (input1Value !== '') {
            // Если input1 заполнен, отправляем DELETE запрос на /v1/customers/{id}
            const customerId = encodeURIComponent(input1Value);
            const url = `/v1/customers/${customerId}`;

            sendDeleteRequest(url, outputContainer);
        } else {
            // Если input1 пуст, отображаем ошибку
            error1.innerText = 'ID cannot be empty for delete operation';
        }
    }

    function sendDeleteRequest(url, outputContainer) {
        fetch(url, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Обработка успешного ответа
                handleRequestSuccess(data, outputContainer);
            })
            .catch(error => {
                // Обработка ошибок
                if (outputContainer) {
                    outputContainer.innerText = `Error: ${error.message}`;
                } else {
                    console.error(`Error: ${error.message}`);
                }
            });
    }


    function handleCreateButton() {
        handleInputError(input2, error2);
        handleInputError(input3, error3);

        const input2Value = input2.value.trim();
        const input3Value = input3.value.trim();

        if (input2Value !== '' && input3Value !== '') {
            // Если input2 и input3 заполнены, отправляем POST запрос на /v1/customers
            const url = '/v1/customers';
            const requestBody = {
                name: input2Value,
                email: input3Value
            };

            sendPostRequest(url, requestBody, outputContainer);
        }
    }

    function sendPostRequest(url, requestBody, outputContainer) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Обработка успешного ответа
                handleRequestSuccess(data, outputContainer);
            })
            .catch(error => {
                // Обработка ошибок
                if (outputContainer) {
                    outputContainer.innerText = `Error: ${error.message}`;
                } else {
                    console.error(`Error: ${error.message}`);
                }
            });
    }


    function handleUpdateButton() {
        handleInputError(input1, error1);
        handleInputError(input2, error2);
        handleInputError(input3, error3);

        const input1Value = input1.value.trim();
        const input2Value = input2.value.trim();
        const input3Value = input3.value.trim();

        if (input1Value !== '' && input2Value !== '' && input3Value !== '') {
            // Если все поля заполнены, отправляем PUT запрос на /v1/customers/{id}
            const customerId = encodeURIComponent(input1Value);
            const url = `/v1/customers/${customerId}`;
            const requestBody = {
                name: input2Value,
                email: input3Value
            };

            sendPutRequest(url, requestBody, outputContainer);
        }
    }

    function sendPutRequest(url, requestBody, outputContainer) {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Обработка успешного ответа
                handleRequestSuccess(data, outputContainer);
            })
            .catch(error => {
                // Обработка ошибок
                if (outputContainer) {
                    outputContainer.innerText = `Error: ${error.message}`;
                } else {
                    console.error(`Error: ${error.message}`);
                }
            });
    }
});

function handleInputError(input, errorElement) {
    if (input.value.trim() === '') {
        errorElement.innerText = `${input.placeholder} cannot be empty`;
    } else {
        errorElement.innerText = '';
    }
}
function clearErrors() {
    // Очищаем сообщения об ошибках перед выполнением любого запроса
    error1.innerText = '';
    error2.innerText = '';
    error3.innerText = '';
}

function handleRequestSuccess(data, outputContainer) {
    if (data.info && data.results) {
        // Если есть информация о списке (info и results), форматируем как список
        const formattedList = data.results.map(item => formatItem(item)).join('\n');
        outputContainer.innerText = formattedList;
    } else if (typeof data === 'object') {
        // Если пришел объект (один элемент), форматируем его
        outputContainer.innerText = formatItem(data);
    } else {
        // Если ответ не является ни объектом, ни списком, выводим как строку
        outputContainer.innerText = data.toString();
    }
}

function formatItem(item) {
    // Форматируем каждый элемент как "ID: _id.value Name: name.value e-mail: email.value"
    const formattedString = `_id: ${item._id || 'N/A'} Name: ${item.name || 'N/A'} e-mail: ${item.email || 'N/A'}`;
    return formattedString.trim(); // Удаляем лишние пробелы
}
