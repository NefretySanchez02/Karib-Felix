<?php
require_once 'web-snippets.php';
session_control();
?>

<!doctype html>
<html lang="es">

<head>
  <?php echo html_head() ?>

  <style>
    .hide {
      display: none !important;
    }

    .input-hidden {
      visibility: hidden;
      position: absolute;
      z-index: -1;
    }

    .pendiente {
      background-color: #f1f1f1;
    }
  </style>
  <link href="https://cdn.quilljs.com/1.1.6/quill.snow.css" rel="stylesheet">
  
</head>

<body>
  <div class="wrapper ">
    <?php echo sidebar("excursion") ?>
    <div class="main-panel">
      <!-- Navbar -->
      <?php echo top_bar("Excursiones") ?>
      <!-- End Navbar -->
      <div class="content">
        <div class="container-fluid">
          <!-- your content here -->

          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-header-info">
                  <h4 class="card-title ">Bandeja de Excursiones</h4>
                  <p class="card-category">Listado de Excursiones agregadas en el sistema.</p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead class=" text-info">
                        <th class="text-left">Título</th>
                        <th class="text-left">Opciones</th>
                      </thead>
                      <tbody id="services-wrapper">

                      </tbody>
                    </table>

                    <div class="text-right">
                      <a id="add-serv" class="text-info text-hover-effect py-4 pr-2" style="float: right;"
                        onclick="excursionUIManager.addServiceModal()">
                        <i class="material-icons">add_circle_outline</i> Agregar Excursion
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>

          <div id="delete-excursion" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 id="item-message-subject" class="modal-title">Eliminar Excursion</h5>
                  <button type="button" class="close" onclick="excursionUIManager.hideItemDetailModal()">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p>¿Desea eliminar el Excursion <span id="item-course-name"></span>?</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" onclick="excursionUIManager.removeItem()">Aceptar</button>
                  <button type="button" class="btn btn-info"
                    onclick="excursionUIManager.hideItemDetailModal()">Cancelar</button>
                </div>
              </div>
            </div>
          </div>
          <div id="view-excursion" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 id="item-message-subject" class="modal-title">Mostrar Excursion</h5>
                  <button type="button" class="close" onclick="excursionUIManager.hideItemViewModal()">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <label class="d-block">
                    <strong class="text-info">Nombre:</strong> <span id="item-name"></span>
                  </label>
                  <label class="d-block">
                    <strong class="text-info">Imagen Excursión:</strong> <span id="item-img"></span>
                  </label>
                  <label class="d-block">
                    <strong class="text-info">Descripción:</strong> <span id="item-description"></span>
                  </label>
                  <label class="d-block">
                    <strong class="text-info">Tip:</strong> <span id="item-tip"></span>
                  </label>
                  <label class="d-block">
                    <strong class="text-info">Imagen Tip:</strong> <span id="item-imgTip"></span>
                  </label>
                  <label class="d-block">
                    <strong class="text-info">Punto de Encuentro:</strong> <span id="item-meetPoint"></span>
                  </label>
                  <label class="d-block">
                    <strong class="text-info">Incluye:</strong> <span id="item-include"></span>
                  </label>
                  <label class="d-block">
                    <strong class="text-info">Que llevar:</strong> <span id="item-checklist"></span>
                  </label>
                  <label class="d-block">
                    <strong class="text-info">Itinerario:</strong> <span id="item-itinerary"></span>
                  </label>
                  <label class="d-block">
                    <strong class="text-info">Precio:</strong> <span id="item-price"></span>
                  </label>
                  <label class="d-block">
                    <strong class="text-info">Duración:</strong> <span id="item-duration" ></span>
                  </label>
                  <label class="d-block">
                    <strong class="text-info">Nivel:</strong> <span id="item-level" ></span>
                  </label>
                  <label class="d-block">
                    <strong class="text-info">Minimo de Personas:</strong> <span id="item-people" ></span>
                  </label>
                  <label class="d-block">
                    <strong class="text-info">Edad:</strong> <span id="item-age" ></span>
                  </label>
                  <label class="d-block">
                    <strong class="text-info">Ubicación:</strong> <span id="item-ubication"></span>
                  </label>
                  <label class="d-block">
                    <strong class="text-info">Idioma:</strong> <span id="item-language"></span>
                  </label>
                  <label class="d-block">
                    <strong class="text-info">Ficha:</strong> <span id="item-sheet"></span>
                  </label>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-info"
                    onclick="excursionUIManager.hideItemViewModal()">Cerrar</button>
                </div>
              </div>
            </div>
          </div>
          <div id="excursion-detail" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 id="item-message-subject" class="modal-title">Editar Excursion</h5>
                  <button type="button" class="close" onclick="excursionUIManager.hideItemUpdateModal()">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form class="mb-4" method="post" action="javascript:void(0);" enctype="multipart/form-data">
                    <div class="row">
                      <input id="idCourse" type="text" class="d-none" />
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Nombre:</strong></label>
                          <input id="editName" type="text" class="form-control px-2" name="name" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group form-file-upload form-file-simple">
                          <label class="text-info"><strong>Imagen Excursion:</strong></label>
                          <input id="editImgPrin-name" type="text" class="form-control inputFileVisible">
                          <input id="editImgPrin-file" type="file" class="inputFileHidden"
                            accept="image/png, image/jpg, image/jpeg" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Descripción:</strong></label>
                          <div id="editDescription"></div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Tips:</strong></label>
                          <div id="editTip"></div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group form-file-upload form-file-simple">
                          <label class="text-info"><strong>Imagen Tips:</strong></label>
                          <input id="editImg-name" type="text" class="form-control inputFileVisible">
                          <input id="editImg-file" type="file" class="inputFileHidden"
                            accept="image/png, image/jpg, image/jpeg" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Punto de Encuentro:</strong></label>
                          <input id="editMeetPoint" type="text" class="form-control px-2" name="meetPoint" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Incluye:</strong></label>
                          <div id="editInclude"></div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Que llevar:</strong></label>
                          <div id="editChecklist"></div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Itinerario:</strong></label>
                          <div id="editItinerary"></div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Precio:</strong></label>
                          <input id="editPrice" type="text" class="form-control px-2" name="price" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Moneda:</strong></label>
                          <input id="editCurrency" type="text" class="form-control px-2" name="price" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Duración:</strong></label>
                          <input id="editDuration" type="text" class="form-control px-2" name="duration" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Nivel:</strong></label>
                          <input id="editLevel" type="text" class="form-control px-2" name="level" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Minimo de Personas:</strong></label>
                          <input id="editPeople" type="number" class="form-control px-2" name="people" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Edad:</strong></label>
                          <input id="editAge" type="text" class="form-control px-2" name="age" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Idioma:</strong></label>
                          <input id="editLanguage" type="text" class="form-control px-2" name="language" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Ubicación:</strong></label>
                          <input id="editLocation" type="text" class="form-control px-2" name="location" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group form-file-upload form-file-simple">
                          <label class="text-info"><strong>Ficha:</strong></label>
                          <input id="editSheet-name" type="text" class="form-control inputFileVisible">
                          <input id="editSheet-file" type="file" class="inputFileHidden"
                            accept=".pdf" required>
                        </div>
                      </div>
                      <div id="submit-button" class="col-12">
                        <button class="btn btn-info" type="buttom" onclick="excursionUIManager.updateNews()">
                          <span>Editar</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary"
                    onclick="excursionUIManager.hideItemUpdateModal()">Cerrar</button>
                </div>
              </div>
            </div>
          </div>
          <div id="create-excursion" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 id="item-message-subject" class="modal-title">Crear Excursion</h5>
                  <button type="button" class="close" onclick="excursionUIManager.hideItemCreateModal()">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form class="mb-4" method="post" action="javascript:void(0);" enctype="multipart/form-data">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Nombre:</strong></label>
                          <input id="createName" type="text" class="form-control px-2" name="name" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group form-file-upload form-file-simple">
                          <label class="text-info"><strong>Imagen Excursión:</strong></label>
                          <input id="createImgPrin-name" type="text" class="form-control inputFileVisible">
                          <input id="createImgPrin-file" type="file" class="inputFileHidden"
                            accept="image/png, image/jpg, image/jpeg" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Descripción:</strong></label>
                          <div id="createDescription"></div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Tips:</strong></label>
                          <div id="createTip"></div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group form-file-upload form-file-simple">
                          <label class="text-info"><strong>Imagen Tips:</strong></label>
                          <input id="createImg-name" type="text" class="form-control inputFileVisible">
                          <input id="createImg-file" type="file" class="inputFileHidden"
                            accept="image/png, image/jpg, image/jpeg" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Punto de Encuentro:</strong></label>
                          <input id="createMeetPoint" type="text" class="form-control px-2" name="meetPoint" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Incluye:</strong></label>
                          <div id="createInclude"></div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Que llevar:</strong></label>
                          <div id="createChecklist"></div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Itinerario:</strong></label>
                          <div id="createItinerary"></div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Precio:</strong></label>
                          <input id="createPrice" type="text" class="form-control px-2" name="price" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Moneda:</strong></label>
                          <input id="createCurrency" type="text" class="form-control px-2" name="price" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Duración:</strong></label>
                          <input id="createDuration" type="text" class="form-control px-2" name="duration" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Nivel:</strong></label>
                          <input id="createLevel" type="text" class="form-control px-2" name="level" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Minimo de Personas:</strong></label>
                          <input id="createPeople" type="number" class="form-control px-2" name="people" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Edad:</strong></label>
                          <input id="createAge" type="text" class="form-control px-2" name="age" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Idioma:</strong></label>
                          <input id="createLanguage" type="text" class="form-control px-2" name="language" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group">
                          <label class="text-info"><strong>Ubicación:</strong></label>
                          <input id="createLocation" type="text" class="form-control px-2" name="location" required>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group bmd-form-group form-file-upload form-file-simple">
                          <label class="text-info"><strong>Ficha:</strong></label>
                          <input id="createSheet-name" type="text" class="form-control inputFileVisible">
                          <input id="createSheet-file" type="file" class="inputFileHidden"
                            accept=".pdf" required>
                        </div>
                      </div>
                      <div id="submit-button" class="col-12">
                        <button class="btn btn-info" type="buttom" onclick="excursionUIManager.addServices()">
                          <span>Crear</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary"
                    onclick="excursionUIManager.hideItemCreateModal()">Cerrar</button>
                </div>
              </div>
            </div>
          </div>
          <div id="view-imgExcursion" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 id="item-message-subject" class="modal-title">Cargar Imagenes del <span id="nameExcursion"></span></h5>
                  <button type="button" class="close" onclick="excursionUIManager.hideImgModal()">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form id="formCreateImg" class="mb-4" method="post" action="javascript:void(0);" enctype="multipart/form-data">
                      <input id="id_excursion" type="text" class="d-none" />
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group bmd-form-group form-file-upload form-file-multiple">
                            <label class="text-info"><strong>Imagenes del curso:</strong></label>
                            <input id="img-files" type="file" multiple class="inputFileHidden"
                              accept="image/png, image/jpg, image/jpeg">
                            <div class="input-group">
                              <input id="img-files-name" type="text" class="form-control inputFileVisible"
                                required>
                            </div>
                          </div>
                        </div>
                        <div id="submit-button" class="col-md-12">
                          <button class="btn btn-info" type="buttom" onclick="excursionUIManager.addImgExcursion()">
                            <span>Subir Fotos</span>
                          </button>
                        </div>
                      </div>
                  </form>
                  <div id="viewImgExcursion" style="display: flex;flex-wrap: wrap;justify-content: space-between;">
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-info"
                    onclick="excursionUIManager.hideImgModal()">Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <?php echo footer() ?>
    </div>
  </div>

  <?php echo scripts() ?>
  <script src="./assets/js/excursion.js"></script>
  <script src="https://cdn.quilljs.com/1.1.6/quill.js"></script>
  <script>
    messagesClient.init();
    var quill = new Quill("#createDescription", {
      theme: "snow",
    });
    var quill = new Quill("#createTip", {
      theme: "snow",
    });
    var quill = new Quill("#createInclude", {
      theme: "snow",
    });
    var quill = new Quill("#createChecklist", {
      theme: "snow",
    });
    var quill = new Quill("#createItinerary", {
      theme: "snow",
    });
    var quill = new Quill("#editDescription", {
      theme: "snow",
    });
    var quill = new Quill("#editTip", {
      theme: "snow",
    });
    var quill = new Quill("#editInclude", {
      theme: "snow",
    });
    var quill = new Quill("#editChecklist", {
      theme: "snow",
    });
    var quill = new Quill("#editItinerary", {
      theme: "snow",
    });
  </script>
</body>

</html>