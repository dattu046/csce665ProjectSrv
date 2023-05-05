document.getElementById("addUrl").addEventListener("click", handleRequestURL);

// const extensionGlobals = document.createElement('script')
// extensionGlobals.innerText = `window.__EXTENTION_ID__ = "${chrome.runtime.id}";`
// document.head.prepend(extensionGlobals)
// const interceptScript = document.createElement('script')
// interceptScript.src = chrome.runtime.getURL('intercept.js')
// document.head.prepend(interceptScript)

// function injectScript(src) {
//     const s = document.createElement('script');
//     s.src = chrome.runtime.getURL(src);
//     s.type = "module"
//     s.onload = function() {
//         this.remove();
//     };
//     (document.head || document.documentElement).appendChild(s);
// }

// injectScript('./intercept.js')

function injectScript(src) {
    const s = document.createElement('script');
    s.src = chrome.runtime.getURL(src);
    s.type = "module"
    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}

injectScript('runtime.js');



async function handleRequestURL(){
    let urlValue = document.getElementById('form12').value;
    if(urlValue !== undefined || urlValue !== null){
        /*Save the URL in the localstorage*/
        let valuesInStorage = await chrome.storage.local.get(['interceptURLs']);
        let valuesInStorageObj = undefined;
        if(Object.keys(valuesInStorage).length !== 0){
            valuesInStorageObj = JSON.parse(valuesInStorage.interceptURLs);
        }
        console.info(valuesInStorageObj);
        if(valuesInStorageObj === undefined || valuesInStorageObj === null){
            valuesInStorageObj = [];
        }
        valuesInStorageObj.push({
            url: urlValue
        });
        await chrome.storage.local.set({interceptURLs : JSON.stringify(valuesInStorageObj)});
    }
    document.getElementById('form12').value = "";
}