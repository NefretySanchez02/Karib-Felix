<?php
require 'backoffice/PHPMailer/src/Exception.php';
require 'backoffice/PHPMailer/src/PHPMailer.php';
require 'backoffice/PHPMailer/src/SMTP.php';

$email_suscrib = $_REQUEST['email_suscription'];

$message = '
		<html>
		<head>
		<title>HTML email</title>
		</head>
		<body>
		<table border="0" align="center" cellpadding="0" cellspacing="0">
		<tr>
        Buenas, el correo ' . $email_suscrib . ' desea suscribirse al boletín mensual y estar informado.
		</tr>
		</table>
		</body>
		</html>
		';

$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->setFrom("contact@karibkayakypaddle.com", 'Newsletter');
$mail->addAddress("info@karibkayakypaddle.com", "Newsletter");
$mail->isHTML(true);

$mail->Subject = "Newsletter";
$mail->Body = $message;

if (!$mail->send()) {
    echo 'Message could not be sent.';

} else {
    echo '1';
}

?>