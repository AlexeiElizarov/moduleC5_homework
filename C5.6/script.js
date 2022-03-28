const btn = document.querySelector('button');
const resultDiv = document.getElementById('result');


function getData(url) {
    fetch(url, {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
       })
        .then((response) => {
            console.log(url);
            console.log('response', response);
//            const result = response.json();
            console.log('result', result);
            return response;
        })
        .then((data) => {
            console.log("data", data);
            resultDiv.innerHTML = `<div id="result"><img src="${data.url}"></div>`;
        })
        .catch(err => {console.log('error' + ' ' +  err) });
};

function checkValue(value_1, value_2) {
    if ((value_1 < 100 || value_1 > 300) || (value_2 < 100 || value_2 > 300) ||
    (Number.isInteger(value_1) == false) || (Number.isInteger(value_2) == false)) {
        resultDiv.textContent = 'одно из чисел вне диапазона от 100 до 300'
    } else {
        const url = `https://picsum.photos/${value_1}/${value_2}`;
        getData(url);
    }
}

btn.addEventListener('click', () => {
    const inputValue_1 = Number(document.getElementById('input_1_id').value);
    const inputValue_2 = Number(document.getElementById('input_2_id').value);
    checkValue(inputValue_1, inputValue_2);
})