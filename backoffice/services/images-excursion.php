<?php
error_reporting(0);

//require_once 'security.php';

use App\Core\CRUD\Img_Excursion;
use App\Core\Box\Tools;

require_once '../App/Core/CRUD/ImgExcursion.php';
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
} else if ($_POST['action'] == "delete") {
    delete();
} else {
    die('{"success": 0, "error": "No valid action or method"}');
}



function listItems()
{
    $newsManager = new Img_Excursion();
    $title = filter_input(INPUT_GET, "id_mapa", FILTER_SANITIZE_STRING);
    if (empty($title))
        die(json_encode(array("success" => 0, "error_msg" => "id_map param has and invalid value")));

    $newsItem = $newsManager->getByIdMapIndex($title);
    if (!$newsItem) {

    }

    $response = array();

    $response["success"] = 1;
    $response["news_item"] = $newsItem;

    echo json_encode($response);
}

function getByName()
{
    $newsManager = new Img_Excursion();

    $title = filter_input(INPUT_GET, "id_curso", FILTER_SANITIZE_STRING);
    if (empty($title))
        die(json_encode(array("success" => 0, "error_msg" => "id_map param has and invalid value")));

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
    $newsManager = new Img_Excursion();

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

function insert($name, $id)
{
    $serviceManager = new Img_Excursion();
    $service_data[0] = $name;
    $service_data[1] = $id;
    $qres = $serviceManager->createImagen($service_data);
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

function create()
{
    $target_dir = "../assets/img/excursion/";
    $countfiles = count($_FILES['files']['name']);
    $id_map = $_POST['id_excursion'];
    $files_arr = array();

    for ($index = 0; $index < $countfiles; $index++) {
        $filename = $_FILES['files']['name'][$index];
        $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        $valid_ext = array("png", "jpeg", "jpg");
        if (in_array($ext, $valid_ext)) {
            $path = $target_dir . $filename;
            if (move_uploaded_file($_FILES['files']['tmp_name'][$index], $path)) {
                echo "File upload";
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        }
    }

    for ($index = 0; $index < $countfiles; $index++) {
        $filename = $_FILES['files']['name'][$index];
        insert($filename, $id_map);
    }
}

function delete()
{
    $service_id = filter_input(INPUT_POST, 'id_excursion', FILTER_SANITIZE_NUMBER_INT);
    $service_name = filter_input(INPUT_POST, 'foto', FILTER_SANITIZE_STRING);
    $target_dir = "../assets/img/excursion/";
    $target_file = $target_dir . $service_name;
    $serviceManager = new Img_Excursion();
    $qres = $serviceManager->deleteById($service_id);
    print($target_file);
    if (!unlink($target_file)) {
        echo "Error delete image in folder";
    } else {
        echo "Delete Image";
    }

    $response = array();
    $response["success"] = 1;
    echo json_encode($response);
}