/**
 * Maneja las peticiones Ajax
 */
var excursionClient = {
  init: function () {
    excursionClient.list();
  },

  initForIndex: function () {
    excursionClient.list(true);
  },

  /**
   * Obtiene mediante consulta un arreglo con todos los mensajes en BD
   */
  list: function (indexPageFlag = false) {
    $.ajax({
      method: "GET",
      url: application.service_url + "excursion.php",
      data: { action: "list" },
    }).done(function (msg) {
      let data = application.parseJson(msg);

      if (data.success == 1) {
        excursionClientUIManager.drawList(data, indexPageFlag);
      }
    });
  },

  get: function (item_id) {
    $.ajax({
      method: "GET",
      url: application.service_url + "excursion.php",
      data: {
        action: "get",
        slug: item_id,
      },
    }).done(function (msg) {
      application.log(msg);

      let data = application.parseJson(msg);

      if (data.success == 1) {
        excursionClientUIManager.drawExcursion(data.news_item);
      }
    });
  },

  getImages: function (id, callback) {
    $.ajax({
      method: "GET",
      url: application.service_url + "images-excursion.php",
      data: {
        action: "getByName",
        id_curso: id,
      },
    }).done(function (msg) {
      application.log(msg);

      let data = application.parseJson(msg);

      if (data.success == 1) {
        callback(data.news_item);
      }
    });
  },
};

/**
 * Maneja el comportamiento de los elementos en pantalla
 */
var excursionClientUIManager = {
  /**
   * construye la lista de servicios y la inyecta en el DOM
   */
  drawList: function (dataset, indexPageFlag = false) {
    if (!dataset) {
      return false;
    }

    let messages = dataset.messages;

    let wrapper = document.getElementById("excursion-content");
    wrapper.innerHTML = "";
    messages.forEach(function (msg, index) {
      wrapper.appendChild(
        excursionClientUIManager.drawItem(msg, index, indexPageFlag)
      );
    });
  },

  /**
   * construye elemento noticia listo para integrar al DOM
   */
  drawItem: function (itemData, index, indexPageFlag = false) {
    if (!itemData) {
      return false;
    }

    let id = itemData.id;
    let name = itemData.nombre;
    let location = itemData.lugar;
    let price = itemData.precio;
    let curr = itemData.currency;
    let time = itemData.duracion;
    let level = itemData.nivel;
    let imgExcursion = itemData.imagen;

    let itemHtml = /*html*/ `
                      <div class="single-place-item mb-60 wow fadeInUp">
                          <div class="place-img">
                            <img src="backoffice/assets/img/excursion/${imgExcursion}" alt="Place Image">
                          </div>
                          <div class="place-content">
                              <div class="info">
                                  <ul class="ratings">
                                      <li><i class="fas fa-star"></i></li>
                                      <li><i class="fas fa-star"></i></li>
                                      <li><i class="fas fa-star"></i></li>
                                      <li><i class="fas fa-star"></i></li>
                                      <li><i class="fas fa-star"></i></li>
                                      <li><span>(5.0)</span></li>
                                  </ul>
                                  <h4 class="title"><a href="detalle-excursiones.html?id=${id}">${name}</a>
                                  </h4>
                                  <p class="location"><i class="far fa-map-marker-alt"></i>${location}</p>
                                  <p class="price"><i class="fas fa-usd-circle"></i><span class="currency">${price} ${curr}
                                  </p>
                                  <div class="meta">
                                      <span><i class="fas fa-stopwatch"></i>${time}</span>
                                      <span><i class="far fa-chart-line"></i>${level}</span>
                                      <span><a href="detalle-excursiones.html?id=${id}">Detalles<i
                                                  class="fas fa-arrow-right"></i></a></span>
                                  </div>
                              </div>
                          </div>
                      </div>
            `;
    let div = document.createElement("div");
    div.setAttribute("class", "col-xl-4 col-md-6 col-sm-12 places-column");
    div.innerHTML = itemHtml;
    return div;
  },
  drawExcursion: function (dataset) {
    if (!dataset) {
      return false;
    }


    document.getElementById("nameExcursion").innerText = dataset.nombre;
    document.getElementById("locationExcursion").innerText = dataset.lugar;
    document.getElementById("priceExcursion").innerText = dataset.precio + " " + dataset.currency;
    document.getElementById("timeExcursion").innerText = dataset.duracion;
    document.getElementById("levelExcursion").innerText = dataset.nivel;
    document
      .getElementById("sheetExcursion")
      .setAttribute(
        "href",
        `backoffice/assets/files/excursion/${dataset.ficha}`
      );
    document.getElementById("tipExcursion").innerHTML = dataset.tip;
    document
      .getElementById("imgTipExcursion")
      .setAttribute(
        "src",
        `backoffice/assets/img/excursion/${dataset.img_tip}`
      );
    document.getElementById("meetPointExcursion").innerText =
      dataset.p_encuentro;
    document.getElementById("include").innerHTML = dataset.equipos;
    document.getElementById("checklist").innerHTML = dataset.checklist;
    document.getElementById("itenirary").innerHTML = dataset.itinerario;
    document.getElementById("priceForm").innerText = dataset.precio + " " + dataset.currency;
    document.getElementById("priceTotal").innerText = dataset.precio;
    document.getElementById("priceIni").innerText = dataset.precio;
    document.getElementById("currency").innerText = dataset.currency;
    document.getElementById("people").innerText = dataset.min_persona;
    document.getElementById("ageExcursion").innerText = dataset.edad;
    document.getElementById("languageExcursion").innerText = dataset.idioma;
    document.getElementById("locationTour").innerText = dataset.lugar;
    document.getElementById("descriptionExcursion").innerHTML =
      dataset.descripcion;

    excursionClient.getImages(dataset.id, function (data) {
      if (data.length != 0) {
        data.forEach(function (foto, index) {
          let img = foto.foto;
          let wrapper = document.querySelector(`#imgExcursion-${index} img`);
          wrapper.setAttribute("src", `backoffice/assets/img/excursion/${img}`);
        });

        if (data.length < 5) {
          for (var i = data.length; i < 4; i++) {
            document.querySelector(`#imgExcursion-${i}`).remove();
          }
        }
      }
    });
  },
};

// Redirigir al usuario a la página de PayPal con los parámetros de la transacción
/**
* Carrito de compras Paypal
*/
document.addEventListener("DOMContentLoaded", function () {

  const selects = document.querySelectorAll('.miSelector');

  // Itera sobre cada elemento select y agrega un evento onchange a cada uno
  selects.forEach(function (select) {
    select.onchange = function () {
      //Obtenemos los valores de los select
      let nadultos = parseInt(document.getElementById("npersonasadultos").value);
      let njovenes = parseInt(document.getElementById("npersonasjovenes").value);
      let nninos = parseInt(document.getElementById("npersonasninios").value);
      let price = parseInt(document.getElementById("priceIni").innerText);

      // Realizar el calculo cuando se hace clic en el select
      let totalpersonas = nadultos + njovenes + nninos;
      let totalvalue = totalpersonas * price;
      document.getElementById("priceForm").innerText = totalvalue + " USD";
      document.getElementById("priceTotal").innerText = totalvalue;
    };
  });

  // Agrega un evento onchange al selector
  selects.onchange = function () {

  };


  // Evento click para los botones de compra
  document.querySelectorAll('.btn-comprar').forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Obtener los detalles del producto
      let itemName = document.getElementById("nameExcursion").innerText;
      let itemPrice = document.getElementById("priceTotal").innerText;
      console.log(itemPrice);
      console.log(itemName);
      // Validar que el precio sea un número válido
      if (!isNaN(itemPrice) && parseFloat(itemPrice) > 0) {
        // Iniciar el flujo de pago de PayPal
        iniciarPagoPayPal(itemName, itemPrice);
      } else {
        console.log(itemPrice);
        alert('El precio del producto no es válido.');
      }
    });
  });
});


// Redirigir al usuario a la página de PayPal con los parámetros de la transacción
/**
* Carrito de compras Paypal
*/
var paypalButton;

// Función para crear el botón de PayPal
function createPaypalButton() {
  paypal.Buttons({
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [{
          description: document.getElementById("nameExcursion").innerText,
          amount: {
            value: document.getElementById("priceTotal").innerText, // Monto del producto
            currency_code: document.getElementById("currency").innerText // Moneda del producto (peso colombiano)
          }
        }]
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        // Mostrar modal de éxito
        $('#paypalMessage').text('Pago completado con éxito');
        $('#paypalModal').modal('show');
      });
    },
    onError: function (err) {
      // Mostrar modal de error
      if (err.message.includes('Transaction was rejected')) {
        $('#paypalMessage').text('La transacción fue rechazada');
      } else {
        $('#paypalMessage').text('Ocurrió un error durante la transacción: ' + err.message);
      }
      $('#paypalModal').modal('show');
    },
    onCancel: function (data) {
      // Mostrar modal de cancelación
      $('#paypalMessage').text('La transacción fue cancelada');
      $('#paypalModal').modal('show');
    }
  }).render('#paypal-button-container').then(function (button) {
    // Almacenar el botón de PayPal
    paypalButton = button;
  });
}

// Crear el botón de PayPal cuando se carga la página
createPaypalButton();




