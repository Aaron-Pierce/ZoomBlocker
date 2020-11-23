let blockList;


chrome.storage.sync.get(['zoomBlockerList'], function (result) {
    blockList = result.zoomBlockerList;
    console.log(result)
    if (blockList === undefined) {
        chrome.storage.sync.set({ 'zoomBlockerList': [] }, function () {
            console.log("Initialized blocklist");
        });
        blockList = [];
    }

    console.log("loaded list..", blockList);
});


chrome.webNavigation.onBeforeNavigate.addListener(function (event) {
    let url = cleanUrl(event.url);
    console.log(url);
    chrome.storage.sync.get(['zoomBlockerList'], function (result) {
        let blockList = result.zoomBlockerList;
        if (blockList.indexOf(url) !== -1 || blockList.indexOf("www." + url) !== -1) {
            console.log("navigated to blocked website");
            fetch('http://localhost:5501/status')
                .then(response => {
                    if (response.status === 403) chrome.tabs.update(event.tabId, { url: "localhost:5501/" })
                });
        } 
    });
});


function cleanUrl(uncleanUrl) {
    //return a url that is only domain and extension, from a full url.
    //i.e. https://www.example.com/ -> www.example.com

    return uncleanUrl.split("/")[2];
}
