// var cards = document.querySelector("#row")
// var inputLocation = document.querySelector("#location")
var selectors = {
  "cards": document.querySelector("#cards"),
  "location": document.querySelector("#location"),
  "modal": document.querySelector("#modal")
}
var url = "https://v2-api.sheety.co/3bb02cf28ab345eeb441509a07265ebe/apiAircnc/rooms"

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
  return `
    <h4 class="card-text card-price">
      ${ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
      <span class="price-details" >| POR DIA</span>
    </h4>
  `
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

// [Filtro] Filtra as cidades da API e remove dados duplicados
function filterCities(rooms) {
  const city = rooms.map((room) => room.city)
  const options = city.filter((here, i) => city.indexOf(here) === i)
  return options
}

// [Submain] Constroi os options de localização
function buildOptionsLocation(selector, city) {
  for(var i = 0; i < city.length; i++) {
    selector.innerHTML += `
      <option>${city[i]}</option>
    `
  }
}

// [Submain] Constroi os cards
function buildCards(selector, rooms) {
  selector.innerHTML = ''
  for(let i = 0; i < rooms.length; i++){

    const id            = rooms[i].id
    const image         = replaceSizeImage(rooms[i].photo)
    const name          = toCapitalize(rooms[i].name)
    const price         = formatCurrency(rooms[i].price)
    const property_type = rooms[i].propertyType
    const style_props   = stylePropertyType(property_type)
    selector.innerHTML += `
      <div class="col-sm-6 col-md-4 col-xl-3 mt-4">
        <div class="card">
          <img class="card-img-top" height="246" src="${image}" alt="#">
          <div class="card-body">
            <h6 class="card-title">${name}</h6>
            <span class="badge ${style_props}">${property_type}</span>
            <div class="mt-34px">
              ${price}
            </div>
          </div>
          <div class="card-footer c-white">
            <i class="fa fa-plus pr-1"></i>
            <a id="link-details" href class="c-white text-decoration-none" data-card-id="${id}" data-toggle="modal" data-target="#modal_response">
              Mais detalhes
            </a>
          </div>
        </div>
      </div>
    `;
  }
}

// [Main] Construtor
function requestApi(uri, selectors, search = null) {
  if (search === null) {
    fetch(uri).then(response => response.json())
      .then(data => {
          const rooms = data.rooms
          const city = filterCities(rooms)
          buildCards(selectors.cards, rooms)
          buildOptionsLocation(selectors.location, city)
      })
  } else {
    fetch(uri + search).then(response => response.json())
    .then(data => {
        const rooms = data.rooms
        buildCards(selectors.cards, rooms)
    })
  }
}

requestApi(url, selectors)
document.getElementById("form-search").onsubmit = (e) => {
  e.preventDefault()
  var location = document.querySelector("#location").value
  var guests = document.querySelector("#guests").value
  var search = `?city=${location}&guests=${guests}`
  requestApi(url, selectors, search)
}

var deferredPrompt;
window.addEventListener('beforeinstallprompt', function (e) { 
  deferredPrompt = e; showAddToHomeScreen();
});
