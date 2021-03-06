window.onload = displaySavedData;

function displaySavedData() {
    const dataList = document.querySelector('.saved-data');
    const emptyList = document.querySelector('.empty-list');

    // change the innerHTML to empty in case the UI needs to be re-rendered after clearing the saved data.
    dataList.innerHTML = '';

    chrome.storage.local.get({ selectionHistory: [] }, result => {
        const savedHistory = result.selectionHistory;

        if (savedHistory.length === 0) {
            emptyList.textContent = 'No data found...';
            document.querySelector('.clear-history').remove();
        } else {
            // create an li element and append it to the ul element after adding content
            savedHistory.forEach((history, index) => {
                const list = document.createElement('li');
                list.innerHTML = `
                <span>SN:</span> ${index + 1} <br>
                <span>Website: </span> ${history.website}<br>
                <span>Element: </span> ${history.element}<br>
                <span>Selector: </span> ${history.selector}
            `;
                dataList.appendChild(list);
            });
        }
    });
}

document
    .querySelector('.clear-history')
    .addEventListener('click', clearHistory);

function clearHistory() {
    chrome.storage.local.clear();
    location.reload();

    // re-render the list
    displaySavedData();
}
