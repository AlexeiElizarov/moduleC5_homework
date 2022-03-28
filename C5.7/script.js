const btn = document.querySelector('button');
const resultDiv = document.getElementById('result');

function useRequest(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status != 200) {
            console.log('Статус ответа', xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                console.log('callback', result);
                callback(result);
            }
        }
    };
    xhr.onerror = function() {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    xhr.send();
}

function createCard() {

}

function displayResult(apiData) {
    let cards = '';
    console.log('1', apiData)
    apiData.forEach(item => {
        const cardBlock = `
            <div class="card">
            <img
                src="${item.download_url}"
                class="card-image"
                width="300"
                height="300"
            />
            <p>${item.author}</p>
            </div>
        `;
        localStorage.setItem(`${item.author}`, `${item.download_url}`);
        cards = cards + cardBlock;
    });
    resultDiv.innerHTML = cards;
};

function checkValue(value1, value2) {
    if ((value1 < 1 || value1 > 10 || Number.isInteger(value1) == false) &&
        (value2 < 1 || value2 > 10 || Number.isInteger(value2) == false)) {
            resultDiv.textContent = 'Номер страницы и лимит вне диапазона от 1 до 10';
    } else if (value1 < 1 || value2 > 10 || Number.isInteger(value2) == false) {
        resultDiv.textContent = 'Лимит вне диапазона от 1 до 10';
    } else if (value1 < 1 || value1 > 10 || Number.isInteger(value1) == false) {
        console.log(value1)
        resultDiv.textContent = 'Номер страницы вне диапазона от 1 до 10';
    } else {
        const url = `https://picsum.photos/v2/list?page=${value1}&limit=${value2}`;
        useRequest(url, displayResult);
    }

}

btn.addEventListener('click', () => {
    localStorage.clear();
    const inputValue1 = Number(document.getElementById('input_1_id').value);
    const inputValue2 = Number(document.getElementById('input_2_id').value);
    checkValue(inputValue1, inputValue2);

})

if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    let cards = '';
    Object.keys(localStorage).forEach(function(key) {
        console.log(key)
        const url = localStorage.getItem(key);
        const cardBlock = `
            <div class="card">
            <img
                src="${url}"
                class="card-image"
                width="300"
                height="300"
            />
            <p>${key}</p>
            </div>
        `;
        cards = cards + cardBlock;
        resultDiv.innerHTML = cards;
    })
}