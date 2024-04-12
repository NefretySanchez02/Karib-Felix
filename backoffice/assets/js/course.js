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
      url: application.service_url + "course.php",
      data: { action: "list" },
    }).done(function (msg) {
      application.log(msg);

      let data = application.parseJson(msg);

      if (data.success == 1) {
        courseUIManager.drawList(data);
      }
    });
  },

  /**
   * Obtiene mediante consulta un mensajes desde BD
   */
  get: function (item_id, callback) {
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
        callback(data.news_item);
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

  /**
   * Actualiza el estado del mensaje en BD
   */
  markAsRead: function (item_id, callback) {
    $.ajax({
      method: "POST",
      url: application.service_url + "course.php",
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
      url: application.service_url + "course.php",
      data: {
        action: "delete",
        id_item: item_id,
      },
    }).done(function (msg) {


    });
  },

  /**
   * Editar una noticia en la BD
   */

  updateSheetCourse: function (sheet) {
    var formData = new FormData();
    formData.append("file", sheet);
    formData.append("action", "updateSheet");
    if (typeof formData.get("file") == "object") {
      $.ajax({
        url: application.service_url + "course.php",
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
      url: application.service_url + "images-couse.php",
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
      url: application.service_url + "images-couse.php",
      data: {
        action: "delete",
        id_curso: item_id,
        foto: name,
      },
    }).done(function (msg) {
      alert("Fotos Eliminada del sistema");
      window.location.reload();
    });
  },
};

/**
 * Maneja el comportamiento de los elementos en pantalla
 */
var courseUIManager = {
  /**
   * construye la lista de servicios y la inyecta en el DOM
   */
  drawList: function (dataset) {
    if (!dataset) {
      return false;
    }

    let messages = dataset.messages;

    let wrapper = document.getElementById("tools-wrapper");
    wrapper.innerHTML = "";

    messages.forEach(function (msg) {
      wrapper.appendChild(courseUIManager.drawItem(msg));
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
              <span class="tools-name">${name}</span>
            </td>
            <td>
              <a class="text-info hover-effect" onclick="courseUIManager.viewModalItem('${id}')">
                <i class="material-icons">visibility</i>
              </a>
              <a class="text-info hover-effect" onclick="courseUIManager.editItem('${id}')">
              <i class="material-icons">mode_edit</i>
            </a>
            <a class="text-info hover-effect" onclick="courseUIManager.viewModalImage('${id}','${name}')">
              <i class="material-icons">image</i>
            </a>
            <a class="text-info hover-effect" onclick="courseUIManager.viewModalDelete('${id}','${name}')">
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
      var inputTitular = $("#editName");
      inputTitular.val(data.nombre);
      var inputSubtitle = $("#editSubtitle");
      inputSubtitle.val(data.subtitulo);
      var inputUrlBtn = $("#editTxtBtn");
      inputUrlBtn.val(data.texto_boton);
      var inputTxtBtn = $("#editUrlBtn");
      inputTxtBtn.val(data.url_boton);
      var inputImg = $("#editImg-name");
      inputImg.val(data.imagen);
      document.getElementById("edit-course").classList.add("d-block");
    });
  },

  viewModalDelete: function (id, name) {
    if (!id) {
      return false;
    }

    document.getElementById("item-tools-name").innerText = name;
    document.getElementById("delete-tools").classList.add("d-block");
    localStorage.setItem("id_tools", id);
  },

  removeItem: function () {
    if (!localStorage.getItem("id_tools")) {
      return false;
    }
    let id_services = localStorage.getItem("id_tools");
    messagesClient.deleteNews(id_services);
    document.getElementById("delete-tools").classList.remove("d-block");
    window.location.reload();
  },

  viewModalItem: function (id) {
    if (!id) {
      return false;
    }

    messagesClient.get(id, function (data) {
      var inputTitular = $("#item-title");
      inputTitular[0].innerText = data.titulo;
      var inputSubtitle = $("#item-subtitle");
      inputSubtitle[0].innerText = data.subtitulo;
      var inputImg = $("#item-img");
      inputImg[0].innerHTML = ` <img src='assets/img/herramientas/${data.imagen}' style="width: 50%;" />`;
      var inputUrlBtn = $("#item-urlBtn");
      inputUrlBtn[0].innerText = data.url_boton;
      var inputTxtBtn = $("#item-txtBtn");
      inputTxtBtn[0].innerText = data.texto_boton;

      document.getElementById("view-tools").classList.add("d-block");
    });
  },

  viewModalImage: function (id, name) {
    if (!id) {
      return false;
    }

    document.getElementById("nameCourse").innerText = name;
    let wrapper = document.getElementById("viewImgCourse");
    var idCurso = $("#id_course");
    idCurso.val(id);
    messagesClient.getImages(id, function (data) {
      if (data.length != 0) {
        data.forEach(function (foto) {
          let img = foto.foto;
          let idImg = foto.id
          let itemHtml = /*html*/ `  
                <div>      
                <img src="assets/img/course/${img}" style="width: 45%;"/>
                <a class="text-info hover-effect" onclick="courseUIManager.modalDeleteImg('${idImg}', '${img}')">
                <i class="material-icons">do_not_disturb_alt</i>
              </a>
            </div>
          `;

          wrapper.innerHTML += itemHtml;
        });
        
      }
    });
    document.getElementById("view-imgCourse").classList.add("d-block");
  },

  modalDeleteImg:function (id,img) {
    messagesClient.deleteImgs(id, img);
  },

  /**
   * Guarda los cambios del modo edicion en la bd y devueve el elemento al modo solo lectura
   */
  hideItemDetailModal: function (id) {
    document.getElementById("delete-tools").classList.remove("d-block");
  },
  hideItemUpdateModal: function (id) {
    document.getElementById("edit-course").classList.remove("d-block");
  },
  hideItemCreateModal: function (id) {
    document.getElementById("create-course").classList.remove("d-block");
  },
  hideItemViewModal: function (id) {
    document.getElementById("view-tools").classList.remove("d-block");
  },
  hideImgModal: function () {
    document.getElementById("view-imgCourse").classList.remove("d-block");
    document.getElementById("viewImgCourse").innerHTML = "";
  },
  updateNews: function () {
    if (
      document.getElementById("editTitle").value.trim().length === 0 ||
      document.getElementById("editSubtitle").value.trim().length === 0 ||
      document.getElementById("editTxtBtn").value.trim().length === 0 ||
      document.getElementById("editUrlBtn").value.trim().length === 0 ||
      document.getElementById("editImg-name").value.trim().length === 0
    ) {
      alert("Debes completar los campos para continuar");
      return false;
    }
    let dataset = {
      id: document.getElementById("idTools").value,
      title: document.getElementById("editTitle").value,
      subtitle: document.getElementById("editSubtitle").value,
      imagen: document.getElementById("editImg-file").files[0],
      txtBtn: document.getElementById("editTxtBtn").value,
      urlBtn: document.getElementById("editUrlBtn").value,
    };

    if (dataset.imagen == undefined) {
      dataset.imagen = document.getElementById("editImg-name").value;
    } else {
      dataset.imagen = document.getElementById("editImg-file").files[0];
    }

    var dataImg;
    if (typeof dataset.imagen == "object") {
      dataImg = dataset.imagen.name;
      messagesClient.updateSheetCourse(dataset.imagen);
    } else {
      dataImg = dataset.imagen;
    }

    $.ajax({
      method: "POST",
      url: application.service_url + "course.php",
      cache: false,
      crossDomain: true,
      data: {
        action: "update",
        id: dataset.id,
        titulo: dataset.title,
        subtitulo: dataset.subtitle,
        imagen: dataImg,
        texto_boton: dataset.txtBtn,
        url_boton: dataset.urlBtn,
      },
    }).done(function (msg) {
      alert("Herramienta Actualizado");
      window.location.reload();
    });
  },
  addCourseModal: function () {
    document.getElementById("create-course").classList.add("d-block");
  },
  addCourse: function () {
    if (
      document.getElementById("createName").value.trim().length === 0 ||
      document.querySelector("#createDescription .ql-editor").getInnerHTML()
        .length === 0 ||
      document.getElementById("createPrice").value.trim().length === 0 ||
      document.getElementById("createDuration").value.trim().length === 0 ||
      document.getElementById("createLevel").value.trim().length === 0 ||
      document.getElementById("createLocation").value.trim().length === 0 ||
      document.getElementById("createSheet-name").value.trim().length === 0
    ) {
      alert("Debes completar los campos para continuar");
      return false;
    }

    let dataset = {
      name: document.getElementById("createName").value,
      description: document
        .querySelector("#createDescription .ql-editor")
        .getInnerHTML(),
      price: document.getElementById("createPrice").value,
      duration: document.getElementById("createDuration").value,
      level: document.getElementById("createLevel").value,
      location: document.getElementById("createLocation").value,
      sheet: document.getElementById("createSheet-file").files[0],
    };

    messagesClient.updateSheetCourse(dataset.sheet);

    $.ajax({
      method: "POST",
      url: application.service_url + "course.php",
      data: {
        action: "create",
        nombre: dataset.name,
        descripcion: dataset.description,
        precio: dataset.price,
        duracion: dataset.duration,
        nivel: dataset.level,
        ubicacion: dataset.location,
        ficha: dataset.sheet.name,
      },
    }).done(function (msg) {
      messagesClient.updateSheetCourse(dataset.sheet);
      alert("Curso creado");
      window.location.reload();
    });
  },
  addImgCourse: function () {
    var form_data = new FormData();
    var totalfiles = document.getElementById("img-files").files.length;
    var id_course = document.getElementById("id_course").value;
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
    form_data.append("id_curso", id_course);
    messagesClient.createImages(form_data);
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
