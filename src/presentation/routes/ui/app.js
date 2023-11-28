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
        outputContainer.innerText = 'Get button clicked!';
    }

    function handleDeleteButton() {
        outputContainer.innerText = 'Delete button clicked!';
    }

    function handleCreateButton() {
        outputContainer.innerText = 'Create button clicked!';
    }

    function handleUpdateButton() {
        outputContainer.innerText = 'Update button clicked!';
    }

    // Назначаем обработчики событий для каждого поля ввода
    input1.addEventListener('input', () => handleInputError(input1, error1));
    input2.addEventListener('input', () => handleInputError(input2, error2));
    input3.addEventListener('input', () => handleInputError(input3, error3));
});

function handleInputError(input, errorElement) {
    if (input.value.trim() === '') {
        errorElement.innerText = `${input.placeholder} cannot be empty`;
    } else {
        errorElement.innerText = '';
    }
}
