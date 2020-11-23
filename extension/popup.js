function populateDisplayList() {
    chrome.storage.sync.get(['zoomBlockerList'], function (result) {
        let list = result.zoomBlockerList;
        document.getElementById("currentList").innerHTML = "";
        for (let entry of list) {
            document.getElementById("currentList").innerHTML += `
        <p>${entry}</p>
        `
        }
    });
}


function clearList(){
    chrome.storage.sync.set({'zoomBlockerList': [] }, function () {
        console.log("Initialized blocklist");
    });
}


populateDisplayList();

document.getElementById("addbutton").onclick = function () {
    chrome.storage.sync.get(['zoomBlockerList'], function (result) {
        let arr = result.zoomBlockerList;
        arr.push(document.getElementById("input").value);
        chrome.storage.sync.set({ zoomBlockerList: arr }, function () {
            console.log('Value is set to ' + arr);
            populateDisplayList();
            document.getElementById("input").value = "";
        });
    });
}
