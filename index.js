let popu = document.getElementById("popu")

let currentUrl = null;
chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, function (tabs) {
    currentUrl = new URL(tabs[0].url)
    chrome.cookies.getAll({
        domain: currentUrl.host
    }, (cookies) => {
        
    })
   
});

chrome.tabs.query({
    active: true,
    currentWindow: true
}, this.getCurrentWindow);

var currentIndex = null;

function getCurrentWindow(tabs) {
    var activeTab = tabs[0]
    currentIndex = activeTab.index;
    chrome.tabs.query({
        currentWindow: true
    }, this.getTabArray);
}

function getTabArray(tabs) {
    var numTabs = tabs.length;

    chrome.tabs.query({
        index: (currentIndex + 1) % numTabs
    }, this.getNextTab);
}

function getNextTab(tabs) {
    if (tabs.length) {
        var tabToActivate = new URL(tabs[0].url);
        chrome.cookies.getAll({
            domain: tabToActivate.host
        }, function(cookies) {
            for(let i=0; i < cookies.length; i++) {
                chrome.cookies.set({
                    url: currentUrl.origin,
                    name: cookies[i].name,
                    value: cookies[i].value,
                    path: '/'
                });

            }
            let p = document.createElement("p")
                    p.innerText = '设置新cookie成功'
                    popu.appendChild(p)
        })

    }
}
