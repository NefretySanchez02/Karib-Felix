<?php

//require_once 'security.php';

use App\Core\CRUD\Excursion;
use App\Core\Box\Tools;

require_once '../App/Core/CRUD/Excursion.php';
//require_once '../App/BlackBox/uploader/RSFileUploader.php';
//require_once '../Core/Box/Tools.php';

date_default_timezone_set('America/Bogota');

if (!(isset($_POST['action']) || isset($_GET['action']))) {
    die('{"success": 0, "error": "No action sent"}');
}

if ($_GET['action'] == "list") {
    listItems();
} else if ($_GET['action'] == "get") {
    get();
} else if ($_GET['action'] == "getByName") {
    getByName();
} else if ($_POST['action'] == "create") {
    create();
} else if ($_POST['action'] == "updatePhoto") {
    updateImage();
} else if ($_POST['action'] == "updateSheet") {
    updateSheet();
}else if ($_POST['action'] == "delete") {
    delete();
} else if ($_POST['action'] == "update") {
    update();
} else {
    die('{"success": 0, "error": "No valid action or method"}');
}



function listItems()
{
    $newsManager = new Excursion();
    $newsItem_list = $newsManager->find(array("sort" => array("id" => "ASC")));
    print_r($newsItem_list);

    $response = array();

    $response["success"] = 1;
    $response["messages"] = $newsItem_list;

    echo json_encode($response);
}

function getByName()
{
    $newsManager = new Excursion();

    $title = filter_input(INPUT_GET, "id_mapa", FILTER_SANITIZE_STRING);
    if (empty($title))
        die(json_encode(array("success" => 0, "error_msg" => "slug param has and invalid value")));

    $newsItem = $newsManager->getListType($title);
    if (!$newsItem) {

    }

    $response = array();

    $response["success"] = 1;
    $response["news_item"] = $newsItem;
    //$response["services_count"] = count($servicios);

    echo json_encode($response);
}

function get()
{
    $newsManager = new Excursion();

    $slug = filter_input(INPUT_GET, "slug", FILTER_SANITIZE_STRING);
    if (empty($slug))
        die(json_encode(array("success" => 0, "error_msg" => "slug param has and invalid value")));

    $newsItem = $newsManager->getById($slug);
    if (!$newsItem) {

    }

    $response = array();

    $response["success"] = 1;
    $response["news_item"] = $newsItem;
    //$response["services_count"] = count($servicios);

    echo json_encode($response);
}

function updateImage()
{
    $target_dir = "../assets/img/excursion/";
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    $check = getimagesize($_FILES["image"]["tmp_name"]);
    if ($check !== false) {
        $uploadOk = 1;
    } else {
        $uploadOk = 0;
    }
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
    } else {
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            echo "The file " . htmlspecialchars(basename($_FILES["image"]["name"])) . " has been uploaded.";
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }

}

function updateSheet()
{
    $target_dir = "../assets/files/excursion/";
    $target_file = $target_dir . basename($_FILES["file"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        echo "The file " . htmlspecialchars(basename($_FILES["file"]["name"])) . " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }

}

function update()
{

    $serviceManager = new Excursion();
    $service_data[0] = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);
    $service_data[1] = filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_STRING);
    $service_data[2] = filter_input(INPUT_POST, 'descripcion');
    $service_data[3] = filter_input(INPUT_POST, 'tip');
    $service_data[4] = filter_input(INPUT_POST, 'img_tip', FILTER_SANITIZE_STRING);
    $service_data[5] = filter_input(INPUT_POST, 'p_encuentro', FILTER_SANITIZE_STRING);
    $service_data[6] = filter_input(INPUT_POST, 'equipos');
    $service_data[7] = filter_input(INPUT_POST, 'checklist');
    $service_data[8] = filter_input(INPUT_POST, 'itinerario');
    $service_data[9] = filter_input(INPUT_POST, 'precio', FILTER_SANITIZE_STRING);
    $service_data[10] = filter_input(INPUT_POST, 'currency', FILTER_SANITIZE_STRING);
    $service_data[11] = filter_input(INPUT_POST, 'duracion', FILTER_SANITIZE_STRING);
    $service_data[12] = filter_input(INPUT_POST, 'nivel', FILTER_SANITIZE_STRING);
    $service_data[13] = filter_input(INPUT_POST, 'min_persona', FILTER_SANITIZE_STRING);
    $service_data[14] = filter_input(INPUT_POST, 'edad', FILTER_SANITIZE_STRING);
    $service_data[15] = filter_input(INPUT_POST, 'lugar', FILTER_SANITIZE_STRING);
    $service_data[16] = filter_input(INPUT_POST, 'idioma', FILTER_SANITIZE_STRING);
    $service_data[17] = filter_input(INPUT_POST, 'ficha', FILTER_SANITIZE_STRING);
    $service_data[18] = filter_input(INPUT_POST, 'imagen', FILTER_SANITIZE_STRING);

    $qres = $serviceManager->updateExcursionById($service_data);

    $response = array();
    if ($qres) {
        $response["success"] = 1;
        $response["data"] = "Register could be updated";
    } else {
        $response["success"] = 0;
        $response["error"] = "Register couldn't be updated";
    }

    echo json_encode($response);
}

function delete()
{
    $service_id = filter_input(INPUT_POST, 'id_item', FILTER_SANITIZE_NUMBER_INT);
    $serviceManager = new Excursion();
    $qres = $serviceManager->deleteById($service_id);
    $response = array();
    $response["success"] = 1;
    echo json_encode($response);
}

function create()
{
    $serviceManager = new Excursion();
    $messaje = array();
    $service_data[0] = filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_STRING);
    $service_data[1] = filter_input(INPUT_POST, 'descripcion');
    $service_data[2] = filter_input(INPUT_POST, 'tip');
    $service_data[3] = filter_input(INPUT_POST, 'img_tip', FILTER_SANITIZE_STRING);
    $service_data[4] = filter_input(INPUT_POST, 'p_encuentro', FILTER_SANITIZE_STRING);
    $service_data[5] = filter_input(INPUT_POST, 'equipos');
    $service_data[6] = filter_input(INPUT_POST, 'checklist');
    $service_data[7] = filter_input(INPUT_POST, 'itinerario');
    $service_data[8] = filter_input(INPUT_POST, 'precio', FILTER_SANITIZE_STRING);
    $service_data[9] = filter_input(INPUT_POST, 'currency', FILTER_SANITIZE_STRING);
    $service_data[10] = filter_input(INPUT_POST, 'duracion', FILTER_SANITIZE_STRING);
    $service_data[11] = filter_input(INPUT_POST, 'nivel', FILTER_SANITIZE_STRING);
    $service_data[12] = filter_input(INPUT_POST, 'min_persona', FILTER_SANITIZE_STRING);
    $service_data[13] = filter_input(INPUT_POST, 'edad', FILTER_SANITIZE_STRING);
    $service_data[14] = filter_input(INPUT_POST, 'lugar', FILTER_SANITIZE_STRING);
    $service_data[15] = filter_input(INPUT_POST, 'idioma', FILTER_SANITIZE_STRING);
    $service_data[16] = filter_input(INPUT_POST, 'ficha', FILTER_SANITIZE_STRING);
    $service_data[17] = filter_input(INPUT_POST, 'imagen', FILTER_SANITIZE_STRING);
    $qres = $serviceManager->createExcursion($service_data);

    $response = array();
    if ($qres) {
        $response["success"] = 1;
        $response["data"] = "Register could be updated";
    } else {
        $response["success"] = 0;
        $response["error"] = "Register couldn't be updated";
    }

    echo json_encode($response);
}