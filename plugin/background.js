const model_url = "http://localhost:5000/blogposts/validate";

chrome.runtime.onMessageExternal.addListener(async (message, sender, sendResponse) => {
  console.log(message);
  if (message && message.type === 'validate_request') {
   const { args, config, type, originalFetch } = message;
   console.log("I'm triggered");
   let urlsToBeIntercepted = await chrome.storage.local.get(['interceptURLs']);
   let urlArray = JSON.parse(urlsToBeIntercepted.interceptURLs);
   console.log(urlArray);
   if(urlArray.filter(url => url.url === args[0]).length > 0){
        console.log("have to intercept this request");
        let modelEval = await fetch(model_url,config);
        let modelEvalResult = await modelEval.json();
        sendResponse(JSON.stringify({malicious: modelEvalResult.malicious}));
   }
   return true;
  }
});