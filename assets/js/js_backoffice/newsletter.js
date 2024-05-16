function SendNewsletter() {
    var dataparam = $("#newsletter-form").serialize();
    console.log(dataparam)
    $.ajax({
      url: "newsletter.php",
      type: "POST",
      data: dataparam,
      datatype: "json",
      success: function (response) {
        if (response == 1) {
          alert("Gracias, recibira noticias y actualizaciones a su correo");
          window.location.reload();
        } else {
          alert("Error enviando suscripción, por favor intente mas tarde");
          window.location.reload();
        }
      },
    });
  }
  