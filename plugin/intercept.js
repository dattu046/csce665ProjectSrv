const { fetch: originalFetch } = window;

window.fetch = async function (...args) {
  let [resource, config] = args;
  if (config.method === 'POST') {
    const data = JSON.parse(await sendMessage(config, args));
    if (data.malicious) {
      return new Response(JSON.stringify({ malicious: true }), { status: 412 });
    } else {
      return await originalFetch(resource, config);
    }
  }
  return await originalFetch(resource, config);
};

function sendMessage(config, args) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      "kebbjfpcnoiikggpamihcgpibefddgio",
      {
        type: 'validate_request',
        config: config,
        args: args
      },
      {},
      (response) => {
        resolve(response);
      }
    );
  });
}