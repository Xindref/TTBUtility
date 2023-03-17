const url = 'https://corsproxy.io/?' + encodeURIComponent('https://afttransshipmenthub-na.aka.amazon.com/inbound/getTransferManifestsByDateAndSourceWarehouse/?startDate=2023-03-09&endDate=2023-04-06&warehouseId=DAL2&_=1679004556188');

async function LoadContents(actionStr, parameters) {
    fetch(url)
        .then(response => response.text())
        .then(json => {
            var parser = new DOMParser();

            var doc = parser.parseFromString(json, "text/html");
            let epName = doc.querySelector('.grid-container > div > div > a')
            console.log(epName.href);
        })
}

function unpackContainer(container, unpackedList, parentContainerObj) {
    for (childContainer of container.childContainers) {
        unpackContainer(childContainer, unpackedList,
            {
                containerId: container.container.scannableId,
                containerType: container.containerType,
                containerStatus: container.containerStatus,
                containerQuantity: container.quantityItems
            }
        );
    }

    for (item of container.items) {
        let itemObj = item

        itemObj.containerId = container.container.scannableId
        itemObj.containerType = container.containerType
        itemObj.containerStatus = container.containerStatus
        itemObj.containerQuantity = container.quantityItems

        itemObj.parentContainerId = parentContainerObj.containerId
        itemObj.parentContainerType = parentContainerObj.containerType
        itemObj.parentContainerStatus = parentContainerObj.containerStatus
        itemObj.parentContainerQuantity = parentContainerObj.containerQuantity

        unpackedList.push(itemObj)
    }
}

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    csvFile = new Blob([csv], { type: "text/csv" });

    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}