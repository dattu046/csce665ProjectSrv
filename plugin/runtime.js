const extensionGlobals = document.createElement('script')
extensionGlobals.innerText = `window.__EXTENTION_ID__ = "${chrome.runtime.id}";`