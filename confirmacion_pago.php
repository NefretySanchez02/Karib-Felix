<?php
// Capturar el ID de la orden de PayPal
$orderID = $_GET['orderID'];
// Procesar la confirmación del pago aquí (por ejemplo, actualizar la base de datos)
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Confirmación de Pago</title>
<link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <h1>¡Gracias por tu compra!</h1>
    <p>Tu ID de transacción de PayPal es: <?php echo $orderID; ?></p>
</body>
</html>
