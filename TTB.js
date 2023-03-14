function textToBase64Barcode(text) {
    for (let img of document.getElementsByClassName("barcode")) {
        //img = document.getElementsByClassName("barcode");
        JsBarcode(img, randBarcode(), { format: "CODE128" });
        img.hidden = false;
    }
}

function randBarcode() {
    let newBarcode = "tsx";
    for (let i = 0; i < 7; i++) {
        newBarcode += Math.floor(Math.random() * 10);
    }
    return newBarcode;
}

function generateBarcodes(count) {
    for (let i = 0; i < count; i++) {
        let img = new Image(200, 100);
        img.classList.add("barcode");
        JsBarcode(img, randBarcode(), { format: "CODE128" });
        document.getElementById("barcodeContainer").appendChild(img);
    }
}