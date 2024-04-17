/**
 * Maneja las peticiones Ajax
 */
var courseClient = {
  init: function () {
    courseClient.list();
  },

  initForIndex: function () {
    courseClient.list(true);
  },

  /**
   * Obtiene mediante consulta un arreglo con todos los mensajes en BD
   */
  list: function (indexPageFlag = false) {
    $.ajax({
      method: "GET",
      url: application.service_url + "course.php",
      data: { action: "list" },
    }).done(function (msg) {
      let data = application.parseJson(msg);

      if (data.success == 1) {
        courseClientUIManager.drawList(data, indexPageFlag);
      }
    });
  },

  get: function (item_id) {
    $.ajax({
      method: "GET",
      url: application.service_url + "course.php",
      data: {
        action: "get",
        slug: item_id,
      },
    }).done(function (msg) {
      application.log(msg);

      let data = application.parseJson(msg);

      if (data.success == 1) {
        courseClientUIManager.drawExcursion(data.news_item);
      }
    });
  },

  getImages: function (id, callback) {
    $.ajax({
      method: "GET",
      url: application.service_url + "images-couse.php",
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
var courseClientUIManager = {
  /**
   * construye la lista de servicios y la inyecta en el DOM
   */
  drawList: function (dataset, indexPageFlag = false) {
    if (!dataset) {
      return false;
    }

    let messages = dataset.messages;

    let wrapper = document.getElementById("course-content");
    wrapper.innerHTML = "";
    messages.forEach(function (msg, index) {
      wrapper.appendChild(
        courseClientUIManager.drawItem(msg, index, indexPageFlag)
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
    let location = itemData.ubicacion;
    let price = itemData.precio;
    let curr = itemData.currency;
    let time = itemData.duracion;
    let level = itemData.nivel;

    let itemHtml = /*html*/ `
                      <div class="single-place-item mb-60 wow fadeInUp">
                          <div class="place-img">
                              <img src="assets/images/imgKarib/excursiones-2.png" alt="Place Image">
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
                                  <h4 class="title"><a href="detalle-curso.html?id=${id}">${name}</a>
                                  </h4>
                                  <p class="location"><i class="far fa-map-marker-alt"></i>${location}</p>
                                  <p class="price"><i class="fas fa-usd-circle"></i><span class="currency">${price} ${curr}
                                  </p>
                                  <div class="meta">
                                      <span><i class="fas fa-stopwatch"></i>${time}</span>
                                      <span><i class="far fa-chart-line"></i>${level}</span>
                                      <span><a href="detalle-curso.html?id=${id}">Detalles<i
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
    document.getElementById("locationExcursion").innerText = dataset.ubicacion;
    document.getElementById("priceExcursion").innerText = dataset.precio + " " + dataset.currency;
    document.getElementById("timeExcursion").innerText = dataset.duracion;
    document.getElementById("levelExcursion").innerText = dataset.nivel;
    document.getElementById("priceForm").innerText = dataset.precio + " " + dataset.currency;
    document.getElementById("priceTotal").innerText = dataset.precio;
    document.getElementById("priceIni").innerText = dataset.precio;
    document.getElementById("currency").innerText = dataset.currency;
    document
      .getElementById("sheetExcursion")
      .setAttribute(
        "href",
        `backoffice/assets/files/course/${dataset.ficha}`
      );
    document.getElementById("descriptionExcursion").innerHTML =
      dataset.descripcion;

    courseClient.getImages(dataset.id, function (data) {
      if (data.length != 0) {
        data.forEach(function (foto, index) {
          let img = foto.foto;
          let wrapper = document.querySelector(`#imgExcursion-${index} img`);
          wrapper.setAttribute("src", `backoffice/assets/img/course/${img}`);
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
