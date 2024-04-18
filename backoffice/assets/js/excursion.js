/**
 * Maneja las peticiones Ajax
 */

var messagesClient = {
  init: function () {
    messagesClient.list();
    setInterval(() => {
      messagesClient.list();
    }, 30000);
  },

  /**
   * Obtiene mediante consulta un arreglo con todos los mensajes en BD
   */
  list: function () {
    $.ajax({
      method: "GET",
      url: application.service_url + "excursion.php",
      data: { action: "list" },
    }).done(function (msg) {
      application.log(msg);

      let data = application.parseJson(msg);

      if (data.success == 1) {
        excursionUIManager.drawList(data);
      }
    });
  },

  /**
   * Obtiene mediante consulta un mensajes desde BD
   */
  get: function (item_id, callback) {
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
        callback(data.news_item);
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

  /**
   * Actualiza el estado del mensaje en BD
   */
  markAsRead: function (item_id, callback) {
    $.ajax({
      method: "POST",
      url: application.service_url + "excursion.php",
      data: {
        action: "markasviewed",
        mid: item_id,
      },
    }).done(function (msg) {
      application.log(msg);

      let data = application.parseJson(msg);

      if (data.success == 1) {
        callback();
      }
    });
  },

  /**
   * Eliminar una noticia en la BD
   */

  deleteNews: function (item_id) {
    $.ajax({
      method: "POST",
      url: application.service_url + "excursion.php",
      data: {
        action: "delete",
        id_item: item_id,
      },
    }).done(function (msg) {
      console.log(msg);
    });
  },

  /**
   * Editar una noticia en la BD
   */

  updateImgService: function (foto) {
    var formData = new FormData();
    formData.append("image", foto);
    formData.append("action", "updatePhoto");
    if (typeof formData.get("image") == "object") {
      $.ajax({
        url: application.service_url + "excursion.php",
        type: "POST",
        data: formData,
        mimeType: "multipart/form-data",
        dataType: "html",
        contentType: false,
        processData: false,
        success: function (msg, textStatus, jqXHR) {
          console.log(msg);
        },
        error: function (jqXHR, textStatus, errorThrown) {},
      });
    }

    /*  */
  },

  updateSheetService: function (file) {
    var formData = new FormData();
    formData.append("file", file);
    formData.append("action", "updateSheet");
    if (typeof formData.get("file") == "object") {
      $.ajax({
        url: application.service_url + "excursion.php",
        type: "POST",
        data: formData,
        mimeType: "multipart/form-data",
        dataType: "html",
        contentType: false,
        processData: false,
        success: function (msg, textStatus, jqXHR) {
          console.log(msg);
        },
        error: function (jqXHR, textStatus, errorThrown) {},
      });
    }

    /*  */
  },

  createImages: function (foto) {
    var formData = foto;

    $.ajax({
      url: application.service_url + "images-excursion.php",
      type: "POST",
      data: formData,
      mimeType: "multipart/form-data",
      dataType: "html",
      contentType: false,
      processData: false,
      success: function (msg, textStatus, jqXHR) {
        alert("Fotos Subidas al sistema");
        window.location.reload();
      },
      error: function (jqXHR, textStatus, errorThrown) {},
    });
    /*  */
  },

  deleteImgs: function (item_id, name, callback) {
    $.ajax({
      method: "POST",
      url: application.service_url + "images-excursion.php",
      data: {
        action: "delete",
        id_excursion: item_id,
        foto: name,
      },
    }).done(function (msg) {
      console.log(msg);
      alert("Fotos Eliminada del sistema");
      //window.location.reload();
    });
  },
};

/**
 * Maneja el comportamiento de los elementos en pantalla
 */
var excursionUIManager = {
  /**
   * construye la lista de servicios y la inyecta en el DOM
   */
  drawList: function (dataset) {
    if (!dataset) {
      return false;
    }

    let messages = dataset.messages;

    let wrapper = document.getElementById("services-wrapper");
    wrapper.innerHTML = "";

    messages.forEach(function (msg) {
      wrapper.appendChild(excursionUIManager.drawItem(msg));
    });
  },

  /**
   * construye elemento servicio listo para integrar al DOM
   */
  drawItem: function (itemData) {
    if (!itemData) {
      return false;
    }

    let id = itemData.id;
    let name = itemData.nombre;

    let itemHtml = /*html*/ `        
          <td>
            <span class="service-name">${name}</span>
          </td>
          <td>
            <a class="text-info hover-effect" onclick="excursionUIManager.viewModalItem('${id}')">
              <i class="material-icons">visibility</i>
            </a>
            <a class="text-info hover-effect" onclick="excursionUIManager.editItem('${id}')">
            <i class="material-icons">mode_edit</i>
          </a>
          <a class="text-info hover-effect" onclick="excursionUIManager.viewModalImage('${id}','${name}')">
          <i class="material-icons">image</i>
        </a>
          <a class="text-info hover-effect" onclick="excursionUIManager.viewModalDelete('${id}','${name}')">
            <i class="material-icons">do_not_disturb_alt</i>
          </a>
          
        </td>
         
      `;

    let tr = document.createElement("tr");
    tr.setAttribute("id", "serv-item-" + id);
    tr.setAttribute("class", status);
    tr.innerHTML = itemHtml;

    return tr;
  },

  /**
   * Muestra un modal con el detalle del mensaje y lo marca como leido en la bd
   */
  editItem: function (id) {
    if (!id) {
      return false;
    }

    messagesClient.get(id, function (data) {
      var inputID = $("#idCourse");
      inputID.val(data.id);
      var inputName = $("#editName");
      inputName.val(data.nombre);
      var inputImg = $("#editImgPrin-name");
      inputImg.val(data.imagen);
      document.querySelector("#editDescription .ql-editor").innerHTML =
        data.descripcion;
      document.querySelector("#editTip .ql-editor").innerHTML = data.tip;
      var inputImgTip = $("#editImg-name");
      inputImgTip.val(data.img_tip);
      var inputMeetPoint = $("#editMeetPoint");
      inputMeetPoint.val(data.p_encuentro);
      document.querySelector("#editInclude .ql-editor").innerHTML =
        data.equipos;
      document.querySelector("#editChecklist .ql-editor").innerHTML =
        data.checklist;
      document.querySelector("#editItinerary .ql-editor").innerHTML =
        data.itinerario;
      var inputPrice = $("#editPrice");
      inputPrice.val(data.precio);
      var inputCurrency = $("#editCurrency");
      inputCurrency.val(data.currency);
      var inputDuration = $("#editDuration");
      inputDuration.val(data.duracion);
      var inputLevel = $("#editLevel");
      inputLevel.val(data.nivel);
      var inputPeople = $("#editPeople");
      inputPeople.val(data.min_persona);
      var inputAge = $("#editAge");
      inputAge.val(data.edad);
      var inputLanguahe = $("#editLanguage");
      inputLanguahe.val(data.idioma);
      var inputUbication = $("#editLocation");
      inputUbication.val(data.lugar);
      var inputSheet = $("#editSheet-name");
      inputSheet.val(data.ficha);

      document.getElementById("excursion-detail").classList.add("d-block");
    });
  },

  viewModalDelete: function (id, name) {
    if (!id) {
      return false;
    }

    document.getElementById("item-course-name").innerText = name;
    document.getElementById("delete-excursion").classList.add("d-block");
    localStorage.setItem("id-excursion", id);
  },

  removeItem: function () {
    if (!localStorage.getItem("id-excursion")) {
      return false;
    }
    let id_services = localStorage.getItem("id-excursion");
    messagesClient.deleteNews(id_services);
    document.getElementById("delete-excursion").classList.remove("d-block");
    window.location.reload();
  },

  viewModalItem: function (id) {
    if (!id) {
      return false;
    }

    messagesClient.get(id, function (data) {
      var inputName = $("#item-name");
      inputName[0].innerText = data.nombre;
      var inputImg = $("#item-img");
      inputImg[0].innerHTML = ` <img src='assets/img/excursion/${data.imagen}'  style="width: 200px;"/>`;
      var inputDescription = $("#item-description");
      inputDescription[0].innerHTML = data.descripcion;
      var inputTip = $("#item-tip");
      inputTip[0].innerHTML = data.tip;
      var inputImgTip = $("#item-imgTip");
      inputImgTip[0].innerHTML = ` <img src='assets/img/excursion/${data.img_tip}'  style="width: 200px;"/>`;
      var inputMeetPoint = $("#item-meetPoint");
      inputMeetPoint[0].innerHTML = data.p_encuentro;
      var inputInclude = $("#item-include");
      inputInclude[0].innerHTML = data.equipos;
      var inputCheck = $("#item-checklist");
      inputCheck[0].innerHTML = data.checklist;
      var inputItinerary = $("#item-itinerary");
      inputItinerary[0].innerHTML = data.itinerario;
      var inputPrice = $("#item-price");
      inputPrice[0].innerText = data.precio + data.currency;
      var inputDuration = $("#item-duration");
      inputDuration[0].innerText = data.duracion;
      var inputLevel = $("#item-level");
      inputLevel[0].innerText = data.nivel;
      var inputPeople = $("#item-people");
      inputPeople[0].innerText = data.min_persona;
      var inputAge = $("#item-age");
      inputAge[0].innerText = data.edad;
      var inputUbication = $("#item-ubication");
      inputUbication[0].innerText = data.lugar;
      var inputLanguage = $("#item-language");
      inputLanguage[0].innerText = data.idioma;
      var inputSheet = $("#item-sheet");
      inputSheet[0].innerHTML = ` <a href='assets/files/course/${data.ficha}' target="_blank" />${data.ficha}</a>`;

      document.getElementById("view-excursion").classList.add("d-block");
    });
  },

  /**
   * Guarda los cambios del modo edicion en la bd y devueve el elemento al modo solo lectura
   */
  hideItemDetailModal: function (id) {
    document.getElementById("delete-excursion").classList.remove("d-block");
  },
  hideItemUpdateModal: function (id) {
    document.getElementById("excursion-detail").classList.remove("d-block");
    document.querySelector("#editDescription .ql-editor").innerHTML = "";
    document.querySelector("#editTip .ql-editor").innerHTML = "";
    document.querySelector("#editInclude .ql-editor").innerHTML = "";
    document.querySelector("#editChecklist .ql-editor").innerHTML = "";
    document.querySelector("#editItinerary .ql-editor").innerHTML = "";
  },
  hideItemCreateModal: function (id) {
    document.getElementById("create-excursion").classList.remove("d-block");
  },
  hideItemViewModal: function (id) {
    document.getElementById("view-excursion").classList.remove("d-block");
  },
  hideImgModal: function () {
    document.getElementById("view-imgExcursion").classList.remove("d-block");
    document.getElementById("viewImgExcursion").innerHTML = "";
  },

  updateNews: function () {
    if (
      document.getElementById("editName").value.trim().length === 0 ||
      document.getElementById("editImgPrin-name").value.trim().length === 0 ||
      document.querySelector("#editDescription .ql-editor").getInnerHTML()
        .length === 0 ||
      document.querySelector("#editTip .ql-editor").getInnerHTML().length ===
        0 ||
      document.getElementById("editImg-name").value.trim().length === 0 ||
      document.getElementById("editMeetPoint").value.trim().length === 0 ||
      document.querySelector("#editInclude .ql-editor").getInnerHTML()
        .length === 0 ||
      document.querySelector("#editChecklist .ql-editor").getInnerHTML()
        .length === 0 ||
      document.querySelector("#editItinerary .ql-editor").getInnerHTML()
        .length === 0 ||
      document.getElementById("editPrice").value.trim().length === 0 ||
      document.getElementById("editCurrency").value.trim().length === 0 ||
      document.getElementById("editDuration").value.trim().length === 0 ||
      document.getElementById("editLevel").value.trim().length === 0 ||
      document.getElementById("editPeople").value.trim().length === 0 ||
      document.getElementById("editAge").value.trim().length === 0 ||
      document.getElementById("editLanguage").value.trim().length === 0 ||
      document.getElementById("editLocation").value.trim().length === 0 ||
      document.getElementById("editSheet-name").value.trim().length === 0
    ) {
      alert("Debes completar los campos para continuar");
      return false;
    }
    let dataset = {
      id: document.getElementById("idCourse").value,
      name: document.getElementById("editName").value,
      description: document
        .querySelector("#editDescription .ql-editor")
        .getInnerHTML(),
      tip: document.querySelector("#editTip .ql-editor").getInnerHTML(),
      imgTip: document.getElementById("editImg-file").value,
      meetPoint: document.getElementById("editMeetPoint").value,
      include: document.querySelector("#editInclude .ql-editor").getInnerHTML(),
      checklist: document
        .querySelector("#editChecklist .ql-editor")
        .getInnerHTML(),
      itinerary: document
        .querySelector("#editItinerary .ql-editor")
        .getInnerHTML(),
      price: document.getElementById("editPrice").value,
      currency: document.getElementById("editCurrency").value,
      duration: document.getElementById("editDuration").value,
      level: document.getElementById("editLevel").value,
      people: document.getElementById("editPeople").value,
      age: document.getElementById("editAge").value,
      location: document.getElementById("editLocation").value,
      language: document.getElementById("editLanguage").value,
      sheet: document.getElementById("editSheet-file").value,
      imagen: document.getElementById("editImgPrin-file").value,
    };

    if (dataset.imgTip == "") {
      dataset.imgTip = document.getElementById("editImg-name").value;
    } else {
      dataset.imgTip = document.getElementById("editImg-file").files[0];
    }

    if (dataset.imagen == "") {
      dataset.imagen = document.getElementById("editImgPrin-name").value;
    } else {
      dataset.imagen = document.getElementById("editImgPrin-file").files[0];
    }

    if (dataset.sheet == "") {
      dataset.sheet = document.getElementById("editSheet-name").value;
    } else {
      dataset.sheet = document.getElementById("editSheet-file").files[0];
    }

    var dataImg;
    var dataFile;
    var dataImgCourse;
    if (typeof dataset.imgTip == "object") {
      dataImg = dataset.imgTip.name;
      messagesClient.updateImgService(dataset.imgTip);
    } else {
      dataImg = dataset.imgTip;
    }

    if (typeof dataset.imagen == "object") {
      dataImgCourse = dataset.imagen.name;
      messagesClient.updateImgService(dataset.imagen);
    } else {
      dataImgCourse = dataset.imagen;
    }

    if (typeof dataset.sheet == "object") {
      dataFile = dataset.sheet.name;
      messagesClient.updateSheetService(dataset.sheet);
    } else {
      dataFile = dataset.sheet;
    }

    $.ajax({
      method: "POST",
      url: application.service_url + "excursion.php",
      cache: false,
      crossDomain: true,
      data: {
        action: "update",
        id: dataset.id,
        nombre: dataset.name,
        descripcion: dataset.description,
        tip: dataset.tip,
        img_tip: dataImg,
        p_encuentro: dataset.meetPoint,
        equipos: dataset.include,
        checklist: dataset.checklist,
        itinerario: dataset.itinerary,
        precio: dataset.price,
        currency: dataset.currency,
        duracion: dataset.duration,
        nivel: dataset.level,
        min_persona: dataset.people,
        edad: dataset.age,
        lugar: dataset.location,
        idioma: dataset.language,
        ficha: dataFile,
        imagen: dataImgCourse,
      },
    }).done(function (msg) {
      alert("Excursión Actualizado");
      window.location.reload();
    });
  },
  addServiceModal: function () {
    document.getElementById("create-excursion").classList.add("d-block");
  },
  addServices: function () {
    if (
      document.getElementById("createName").value.trim().length === 0 ||
      document.querySelector("#createDescription .ql-editor").getInnerHTML()
        .length === 0 ||
      document.querySelector("#createTip .ql-editor").getInnerHTML().length ===
        0 ||
      document.getElementById("createImg-file").value.trim().length === 0 ||
      document.getElementById("createMeetPoint").value.trim().length === 0 ||
      document.querySelector("#createInclude .ql-editor").getInnerHTML()
        .length === 0 ||
      document.querySelector("#createChecklist .ql-editor").getInnerHTML()
        .length === 0 ||
      document.querySelector("#createItinerary .ql-editor").getInnerHTML()
        .length === 0 ||
      document.getElementById("createPrice").value.trim().length === 0 ||
      document.getElementById("createCurrency").value.trim().length === 0 ||
      document.getElementById("createDuration").value.trim().length === 0 ||
      document.getElementById("createLevel").value.trim().length === 0 ||
      document.getElementById("createPeople").value.trim().length === 0 ||
      document.getElementById("createAge").value.trim().length === 0 ||
      document.getElementById("createLanguage").value.trim().length === 0 ||
      document.getElementById("createLocation").value.trim().length === 0 ||
      document.getElementById("createSheet-file").value.trim().length === 0 ||
      document.getElementById("createImgPrin-file").value.trim().length === 0
    ) {
      alert("Debes completar los campos para continuar");
      return false;
    }

    let dataset = {
      name: document.getElementById("createName").value,
      description: document
        .querySelector("#createDescription .ql-editor")
        .getInnerHTML(),
      tip: document.querySelector("#createTip .ql-editor").getInnerHTML(),
      imgTip: document.getElementById("createImg-file").files[0],
      meetPoint: document.getElementById("createMeetPoint").value,
      include: document
        .querySelector("#createInclude .ql-editor")
        .getInnerHTML(),
      checklist: document
        .querySelector("#createChecklist .ql-editor")
        .getInnerHTML(),
      itinerary: document
        .querySelector("#createItinerary .ql-editor")
        .getInnerHTML(),
      price: document.getElementById("createPrice").value,
      currency: document.getElementById("createCurrency").value,
      duration: document.getElementById("createDuration").value,
      level: document.getElementById("createLevel").value,
      people: document.getElementById("createPeople").value,
      age: document.getElementById("createAge").value,
      location: document.getElementById("createLocation").value,
      language: document.getElementById("createLanguage").value,
      sheet: document.getElementById("createSheet-file").files[0],
      imgCourse: document.getElementById("createImgPrin-file").files[0],
    };
    $.ajax({
      method: "POST",
      url: application.service_url + "excursion.php",
      data: {
        action: "create",
        nombre: dataset.name,
        descripcion: dataset.description,
        tip: dataset.tip,
        img_tip: dataset.imgTip.name,
        p_encuentro: dataset.meetPoint,
        equipos: dataset.include,
        checklist: dataset.checklist,
        itinerario: dataset.itinerary,
        precio: dataset.price,
        currency: dataset.currency,
        duracion: dataset.duration,
        nivel: dataset.level,
        min_persona: dataset.people,
        edad: dataset.age,
        lugar: dataset.location,
        idioma: dataset.language,
        ficha: dataset.sheet.name,
        imagen: dataset.imgCourse.name,
      },
    }).done(function (msg) {
      messagesClient.updateImgService(dataset.imgTip);
      messagesClient.updateImgService(dataset.imgCourse);
      messagesClient.updateSheetService(dataset.sheet);
      alert("Excursion creada");
      window.location.reload();
    });
  },
  addImgExcursion: function () {
    var form_data = new FormData();
    var totalfiles = document.getElementById("img-files").files.length;
    var id_excursion = document.getElementById("id_excursion").value;
    if (totalfiles > 4) {
      alert("Solo se pueden subir maximo 4 fotos al sistema por negocio");
      return false;
    }
    for (var index = 0; index < totalfiles; index++) {
      form_data.append(
        "files[]",
        document.getElementById("img-files").files[index]
      );
    }
    form_data.append("action", "create");
    form_data.append("id_excursion", id_excursion);
    messagesClient.createImages(form_data);
  },
  viewModalImage: function (id, name) {
    if (!id) {
      return false;
    }

    document.getElementById("nameExcursion").innerText = name;
    let wrapper = document.getElementById("viewImgExcursion");
    var idCurso = $("#id_excursion");
    idCurso.val(id);
    messagesClient.getImages(id, function (data) {
      if (data.length != 0) {
        data.forEach(function (foto) {
          let img = foto.foto;
          let idImg = foto.id;
          let itemHtml = /*html*/ `  
                <div>      
                <img src="assets/img/excursion/${img}" style="width: 45%;"/>
                <a class="text-info hover-effect" onclick="excursionUIManager.modalDeleteImg('${idImg}', '${img}')">
                <i class="material-icons">do_not_disturb_alt</i>
              </a>
            </div>
          `;

          wrapper.innerHTML += itemHtml;
        });
      }
    });
    document.getElementById("view-imgExcursion").classList.add("d-block");
  },
  modalDeleteImg: function (id, img) {
    messagesClient.deleteImgs(id, img);
  },
};

$(".form-file-simple .inputFileVisible").click(function () {
  $(this).siblings(".inputFileHidden").trigger("click");
});

$(".form-file-simple .inputFileHidden").change(function () {
  var filename = $(this)
    .val()
    .replace(/C:\\fakepath\\/i, "");
  $(this).siblings(".inputFileVisible").val(filename);
});

$(
  ".form-file-multiple .inputFileVisible, .form-file-multiple .input-group-btn"
).click(function () {
  $(this).parent().parent().find(".inputFileHidden").trigger("click");
  $(this).parent().parent().addClass("is-focused");
});

$(".form-file-multiple .inputFileHidden").change(function () {
  var names = "";
  for (var i = 0; i < $(this).get(0).files.length; ++i) {
    if (i < $(this).get(0).files.length - 1) {
      names += $(this).get(0).files.item(i).name + ",";
    } else {
      names += $(this).get(0).files.item(i).name;
    }
  }
  $(this).siblings(".input-group").find(".inputFileVisible").val(names);
});
