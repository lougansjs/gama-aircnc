var cards = document.querySelector("#row")
var url = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72"

function toCapitalize(text) {
  var text = text.toLowerCase()
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function replaceSizeImage(img) { 
  $p1 = '=x_large'
  $p2 = '=xx_large'
  $p3 = '=x_medium'
  if(img.includes($p1)) {
    var image = img.replace($p1, $p3)
  } else {
    var image = img.replace($p2, $p3)
  }

  return image
}

function formatCurrency(price) {
  return `<h4 class="card-text card-price">${price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>`
}

function requestApi(uri, selector) { 
  fetch(uri).then(response => response.json())
    .then(data => {
        for(let i =0; i <24;i++){

          var image = replaceSizeImage(data[i].photo)
          var name  = toCapitalize(data[i].name)
          var price = formatCurrency(data[i].price)

          selector.innerHTML += `
            <div class="col-sm-6 col-md-4 col-xl-3 mt-5">
              <div class="card">
                <img class="card-img-top" height="246" src="${image}" alt="#">
                <div class="card-body">
                  <h6 class="card-title">${name}</h6>
                  <span class="badge badge-primary">${data[i].property_type}</span>
                  <div class="mt-34px">
                    ${price}
                  </div>
                </div>
                <div class="card-footer text-muted">
                  2 dias atrás
                </div>
              </div>
            </div>
          `;
        }  
    })
}

requestApi(url, cards)

