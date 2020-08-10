const tableBody = document.querySelector('.results-table tbody');

let lastNameInput = document.querySelector('.results-table .last-name-input');
lastNameInput.addEventListener('input', addNewRow);

function addNewRow(e) {
    const newRow = document.createElement('tr');
    newRow.innerHTML =
        `<td>
            <input type="text" placeholder="Student Name" class="last-name-input">
        </td>
        <td>
            <input type="text" placeholder="Student Mark" class="mark-input">
        </td>`;
    tableBody.appendChild(newRow);
    lastNameInput.classList.remove('last-name-input');
    lastNameInput.removeEventListener('input', addNewRow);
    lastNameInput = document.querySelector('.results-table .last-name-input');
    lastNameInput.addEventListener('input', addNewRow);
}