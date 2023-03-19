const url = 'http://anyorigin.com/go?url=' + encodeURIComponent('https://afttransshipmenthub-na.aka.amazon.com/inbound/getTransferManifestsByDateAndSourceWarehouse/?startDate=2023-03-09&endDate=2023-04-06&warehouseId=DAL2&_=1679004556188');

let toteList = document.querySelector('#totalToteList');
let count = 0;

function LoadContents() {
    fetch("transferContainerHierarchy.json")
        .then(response => response.text())
        .then(data => {
            let containers = JSON.parse(data).transferContainerHierarchy;
            let shipRefId = 'TUL2_DAL2_b7c072df-86e8-43d2-a043-9eda2adbfa8b';
            let loadId = '112F4NF8K';
            let unpackedList = [];

            for (const container of containers) {
                unpackContainer(container, unpackedList,
                    {
                        containerId: container.container.scannableId,
                        containerType: container.containerType,
                        containerQuantity: container.quantityItems,
                        containerStatus: container.containerStatus
                    }
                );
            }

            let csvArr = [];
            csvArr.push(unpackedList.map(item => `${item.containerId},${item.containerQuantity}`))
            csvArr[0].unshift('TOTE, Item Count');

            downloadCSV(csvArr[0].join('\n'), `${shipRefId}-${loadId}.csv`)
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
        if (JSON.stringify(childContainer.container.scannableId).includes('tsX')) {
            generateListItem(1, 'total', childContainer.container.scannableId);
        }
    }

    if (container.items !== null) {
        for (item of container.items) {
            let itemObj = item

            itemObj.containerId = container.container.scannableId
            itemObj.containerQuantity = container.quantityItems

            unpackedList.push(itemObj)
        }
    }

    for (let i = 1; i < unpackedList.length; i++) {
        if (unpackedList[i].containerId === unpackedList[i - 1].containerId) {
            unpackedList.splice(i, 1);
        }
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