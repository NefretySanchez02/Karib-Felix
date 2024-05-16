<?php
require 'backoffice/PHPMailer/src/Exception.php';
require 'backoffice/PHPMailer/src/PHPMailer.php';
require 'backoffice/PHPMailer/src/SMTP.php';

$checkin = $_REQUEST['checkin'];
$name = $_REQUEST['name'];
$people = $_REQUEST['people'];
$asunto = $_REQUEST['comments'];

$message = '
		<html>
		<head>
		<title>HTML email</title>
		</head>
		<body>
		<table width="50%" border="0" align="center" cellpadding="0" cellspacing="0">
		<tr>
		<td width="50%" align="right">&nbsp;</td>
		<td align="left">&nbsp;</td>
		</tr>
		<tr>
		<td align="right" valign="top" style="border-top:1px solid #dfdfdf; font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#000; padding:7px 5px 7px 0;">Nombre:</td>
		<td align="left" valign="top" style="border-top:1px solid #dfdfdf; font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#000; padding:7px 0 7px 5px;">' . $name . '</td>
		</tr>
		<tr>
		<td align="right" valign="top" style="border-top:1px solid #dfdfdf; font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#000; padding:7px 5px 7px 0;">Fecha:</td>
		<td align="left" valign="top" style="border-top:1px solid #dfdfdf; font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#000; padding:7px 0 7px 5px;">' . $checkin . '</td>
		</tr>
		<tr>
		<td align="right" valign="top" style="border-top:1px solid #dfdfdf; font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#000; padding:7px 5px 7px 0;">Numero de personas:</td>
		<td align="left" valign="top" style="border-top:1px solid #dfdfdf; font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#000; padding:7px 0 7px 5px;">' . $people . '</td>
		</tr>
		<tr>
		<td align="right" valign="top" style="border-top:1px solid #dfdfdf; font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#000; padding:7px 5px 7px 0;">Comentarios:</td>
		<td align="left" valign="top" style="border-top:1px solid #dfdfdf; font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#000; padding:7px 0 7px 5px;">' . nl2br($asunto) . '</td>
		</table>
		</body>
		</html>
		';

$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->setFrom("booking@karibkayakypaddle.com", 'Booking Form');
$mail->addAddress("info@karibkayakypaddle.com", "Booking Form");
$mail->isHTML(true);

$mail->Subject = "Disponibilidad de Reserva";
$mail->Body = $message;

if (!$mail->send()) {
    echo '<script>
    window.location = "index.html";
    alert("Error enviando mensaje, Por favor intente mas tarde")
</script>';

} else {
    echo '<script>
            window.location = "index.html";
            alert("Mensaje enviado")
        </script>';
}

?>