chrome.webNavigation.onBeforeNavigate.addListener(function (event) {
    let url = cleanUrl(event.url);
    console.log(url);
    if (url === "www.youtube.com") {
        console.log("navigated to youtube");
        fetch('http://localhost:5501/status')
            .then(response => {
                if (response.status === 403) chrome.tabs.update(event.tabId, { url: "localhost:5501/" })
            });
    }
});

function cleanUrl(uncleanUrl) {
    //return a url that is only domain and extension, from a full url.
    //i.e. https://example.com/ -> example.com

    return uncleanUrl.split("/")[2];
}