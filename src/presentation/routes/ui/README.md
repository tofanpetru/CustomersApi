<h1>HTML and JavaScript Basics:</h1>

- [ ] Create an HTML page and paste your JavaScript code into the `<script>` tag.
- [ ] Add HTML elements to ts code: text fields, buttons and containers for displaying results.
<details>
   <summary>List of elements</summary>
output-container
input1,
input2,
input3,
error1,
error2,
error3,
getButton
deleteButton
createButton
updateButton
</details>

<h1>Event Basics:</h1>

- [ ] Use the DOMContentLoaded event to properly run your code when the page is loaded.
<details>
   <summary>Tip</summary>
document.addEventListener('DOMContentLoaded', function () {});
</details>

- [ ] Bind event handlers to various buttons.
<details>
   <summary>Tips</summary>
     document.getElementById('getButton').addEventListener('click', () => handleButtonClick('getButton'));
     document.getElementById('deleteButton').addEventListener('click', () => handleButtonClick('deleteButton'));
     document.getElementById('createButton').addEventListener('click', () => handleButtonClick('createButton'));
     document.getElementById('updateButton').addEventListener('click', () => handleButtonClick('updateButton'));
</details>

<h1>Working with input:</h1>

- [ ] Try entering data into the text fields (input1, input2, input3).
  Use value to extract values from text fields.
<details>
<summary>Tip</summary>
How to setup
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const input3 = document.getElementById('input3');
    const error1 = document.getElementById('error1');
    const error2 = document.getElementById('error2');
    const error3 = document.getElementById('error3');

How to get values from page?
const input1Value = input1.value.trim();
</details>

  <h1>Working with requests:</h1>

- [ ] Create the functions related to sending request.
  Learn to use fetch to send HTTP requests.
<details>
<summary>Tip</summary>
Example:
function sendRequest(url, outputContainer) {
        fetch(url)
            .then(handleResponse)
            .then(data => handleRequestSuccess(data, outputContainer))
            .catch(error => handleRequestError(error, outputContainer));
    }
</details>
<h1>Processing responses:</h1>

- [ ] Understanding of handling successful and error responses in the handleRequestSuccess and handleRequestError functions.
- [ ] Send requests to the server and check the processing of responses.
<details>
<summary>Tip</summary>


    function handleRequestSuccess(data, outputContainer) {
        clearErrors();
        if (data.info && data.results) {
            const formattedList = data.results.map(item => formatItem(item)).join('\n');
            outputContainer.innerText = formattedList;
        } else if (typeof data === 'object') {
            outputContainer.innerText = formatItem(data);
        } else {
            outputContainer.innerText = data.toString();
        }
    }

    function handleRequestError(error, outputContainer, errorElement) {
        if (outputContainer) {
            outputContainer.innerText = `Error: ${error.message}`;
        } else {
            console.error(`Error: ${error.message}`);
        }
        if (errorElement) {
            errorElement.innerText = `Error: ${error.message}`;
        }
    }

    function formatItem(item) {
        return `_id: ${item._id || 'N/A'} Name: ${item.name || 'N/A'} e-mail: ${item.email || 'N/A'}`.trim();
    }
</details>

<h1>Updating, creating and deleting data:</h1>

- [ ] Understand how different buttons (updateButton, createButton, deleteButton) are handled in handleButtonClick.
- [ ] Try updating, creating and deleting data using your code.

<h1>Input Validation: </h1>

- [ ] Learn handleInputError and understand how input errors are handled.
- [ ] Check validation by entering incorrect data.
 <h1> User Interface Improvements: </h1>


- [ ] Implement field clearing and error output after each request.
 <h1> Working with data format:</h1>

- [ ] Learn how formatItem formats data.
- [ ] Try changing the formatting or adding new fields to the output.
  Additional functionality:


<h1>Tips:</h1>

Comment the code for better understanding.
Use your browser's developer tools for debugging.
Check your browser console for error messages.
Review the documentation for the functions and methods used in the code.
Experiment with different data and query options.