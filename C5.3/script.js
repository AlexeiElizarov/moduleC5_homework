const btn = document.querySelector('.button');
const resultDiv = document.getElementById('result');

function useRequest(value, callback) {
  let xhr = new XMLHttpRequest();
  let url = 'https:/picsum.photos/v2/list?limit=' + value;
  xhr.open('GET', url, true);

  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа', xhr.status);
      console.log('status')
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        console.log('callback');
        callback(result);
      }
    }
  };
    xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  xhr.send();
};

function displayResult(apiData) {
  let cards = '';
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
    cards = cards + cardBlock;
  });
  resultDiv.innerHTML = cards;
};

function seeResult (value) {
  if (value >= 1 && value <= 10) {
    useRequest(value, displayResult);
  } else if (value > 10) {
    resultDiv.textContent = 'число вне диапазона от 1 до 10';
  }
}

btn.addEventListener('click', () => {
  const inputValue = Number(document.querySelector("input").value);
  seeResult(inputValue);
})
