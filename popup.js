window.onload = displaySavedData;

function displaySavedData() {
    const dataList = document.querySelector('ul');

    chrome.storage.local.get({ selectionHistory: [] }, result => {
        const savedHistory = result.selectionHistory;

        if (savedHistory.length === 0) {
            const list = document.createElement('li');
            list.innerHTML = 'No data found.';
            dataList.appendChild(list);
        }

        savedHistory.forEach(history => {
            const list = document.createElement('li');
            list.innerHTML = `Website: ${history.website}`;
            dataList.appendChild(list);
        });
    });
}
