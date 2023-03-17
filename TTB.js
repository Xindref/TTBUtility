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

function generateBarcode(value, color) {
    let img = new Image(200, 100);
    img.classList.add(`barcode-${color}`);
    JsBarcode(img, value, { format: "CODE128" });
    document.getElementById("selectedTextBarcode").appendChild(img);
}

function generateListItem(count, color) {
    for (let i = 0; i < count; i++) {
        let li = document.createElement('li');
        li.innerText = randBarcode();
        document.querySelector(`#${color}ToteList`).append(li);
        li.addEventListener('click', function (e) {
            document.querySelector('#selectedTextBarcode').innerHTML = '';
            barcode = document.querySelector('#selectedTextBarcode');
            barcode.hidden = false;
            generateBarcode(e.target.innerText, `${color}`);
        })
    }
}

document.querySelector('.sortTTB').addEventListener('click', function () {
    LoadContents();
});

document.querySelector('#ineligibleCount').addEventListener('click', function () {
    amount = document.querySelector('#ineligibleCount').innerText;
    document.querySelector('#redToteList').innerHTML = '';

    generateListItem(amount, 'red');
});

document.querySelector('#eligibleCount').addEventListener('click', function () {
    amount = document.querySelector('#eligibleCount').innerText;
    document.querySelector('#greenToteList').innerHTML = '';

    generateListItem(amount, 'green');
});

document.querySelector('#totalCount').addEventListener('click', function () {
    amount = document.querySelector('#totalCount').innerText;
    document.querySelector('#totalToteList').innerHTML = '';

    generateListItem(amount, 'total');
});