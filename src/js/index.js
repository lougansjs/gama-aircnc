var cards = document.querySelector("#row")
var url = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72"

// [Formatação] Aplica o formato de texto capitalize para o título do card
function toCapitalize(text) {
  var text = text.toLowerCase()
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// [Performance] Altera a URL da imagem para pegar uma imagem com tamanho menor
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

// [Formatação] Aplica mascara de moeda no preço.
function formatCurrency(price) {
  return `<h4 class="card-text card-price">${price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>`
}

// [Estilo] Retorna o nome da classe a ser usado na tag de categoria do imóvel
function stylePropertyType(type) {
  var props = ''
  switch (type) {
    case 'Apartamento':
      props = 'badge-success'
      break;
    case 'Casa':
      props = 'badge-danger'
      break;
    case 'Chácara':
      props = 'badge-warning'
      break;
    case 'Loft':
      props = 'badge-info'
      break;
    case 'Estúdio':
      props = 'badge-light'
      break;
    case 'Quarto':
      props = 'badge-room'
      break;
    case 'Sítio':
      props = 'badge-farm'
      break;
    default:
      break;
  }
  return props
}

// [Main] Construtor
function requestApi(uri, selector) { 
  fetch(uri).then(response => response.json())
    .then(data => {
        for(let i =0; i <24;i++){

          var image = replaceSizeImage(data[i].photo)
          var name  = toCapitalize(data[i].name)
          var price = formatCurrency(data[i].price)
          var property_type = data[i].property_type
          var style_props = stylePropertyType(property_type)

          selector.innerHTML += `
            <div class="col-sm-6 col-md-4 col-xl-3 mt-5">
              <div class="card">
                <img class="card-img-top" height="246" src="${image}" alt="#">
                <div class="card-body">
                  <h6 class="card-title">${name}</h6>
                  <span class="badge ${style_props}">${property_type}</span>
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

