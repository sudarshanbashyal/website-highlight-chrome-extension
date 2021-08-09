// disabling all the anchor tag links so the page doesn't redirect
window.onload = disableAnchorLinks;

function disableAnchorLinks() {
    document.querySelectorAll('a').forEach(link => {
        link.setAttribute('onclick', 'return false;');
        link.removeAttribute('href');
        link.removeAttribute('data-url');

        link.setAttribute('href', 'javascript:void(0);');
    });
}

document.addEventListener('click', e => {
    const elementInfo = getElementInfo(e);
    highLightElement(e);

    // saving the retrieved element information to the chrome storage.
    saveElement(elementInfo);
});

// get element info: website, element, selector
function getElementInfo(el) {
    const elementInfo = {
        website: location.href,
        element: el.target.tagName,
    };

    // check id and classes on the element, if id is present use the id as the selector, else class or null
    const selector = el.target.id
        ? `#${el.target.id}`
        : el.target.classList[0]
        ? `.${el.target.classList[0]}`
        : '';

    elementInfo.selector = elementInfo.element + selector;

    return elementInfo;
}

function highLightElement(el) {
    const targetElement = el.target;

    /*
     *   Checking if the element or its parent node is an anchor tag
     *   If it is anchor tag, highlight it with blue; if not, use yellow
     */
    if (
        targetElement.tagName.toLowerCase() === 'a' ||
        (targetElement.parentNode &&
            targetElement.parentNode.tagName.toLowerCase() === 'a')
    ) {
        targetElement.style.backgroundColor = '#2A9DF4';
    } else {
        targetElement.style.border = '5px solid #FCCF41';
        targetElement.style.backgroundColor = '#FCCF41';
    }

    targetElement.style.color = 'white';
}

async function saveElement(elementInfo) {
    chrome.storage.local.get({ selectionHistory: [] }, result => {
        // save the latest highlight to the memory
        // if the length of the array is more than 10, remove the last elements

        const savedHistory = [elementInfo, ...result.selectionHistory];

        if (savedHistory.length > 10) {
            savedHistory.length = 10;
        }

        chrome.storage.local.set({ selectionHistory: savedHistory });
    });
}
