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
                                  <p class="price"><i class="fas fa-usd-circle"></i><span class="currency">${price}
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
    document.getElementById("priceExcursion").innerText = dataset.precio;
    document.getElementById("timeExcursion").innerText = dataset.duracion;
    document.getElementById("levelExcursion").innerText = dataset.nivel;
    document.getElementById("priceForm").innerText = dataset.precio;
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
