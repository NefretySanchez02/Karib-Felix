<?php

namespace App\Core\CRUD;


require_once 'Model.php';

/**
 * Description of User
 *
 * @author rafaelsanchez
 */
class Course extends Model
{
    const SQL_TABLE = "curso";

    const MODEL_CONFIG = array(
        "tablename" => "curso",
        "fields" => array(
            "id" => array("type" => "INT", "length" => "10"),
            "titulo" => array("type" => "STR", "length" => "250"),
            "subtitulo_banner" => array("type" => "STR", "length" => "250"),
            "titulo_banner" => array("type" => "STR", "length" => "250"),
            "parrafo_banner" => array("type" => "STR", "length" => ""),
            "texto_boton" => array("type" => "STR", "length" => "250"),
            "url_boton" => array("type" => "STR", "length" => "250"),
            "imagen_1" => array("type" => "STR", "length" => "250"),
            "imagen_2" => array("type" => "STR", "length" => "250")
        )
    );

    function __construct()
    {
        parent::__construct(self::MODEL_CONFIG);
    }


    public function get($id)
    {
        return parent::findOne(array("id" => $id));
    }

    public function getById($id)
    {
        return parent::findOne(array("id" => $id));
    }

    public function deleteById($id)
    {
        $sql = parent::generateDeleteQuery(self::SQL_TABLE, "id", $id);
        $params = array(
            array("value" => $id, "type" => "INT")
        );
        echo $sql;
        return parent::executeQuery($sql, $params, false);
    }

    public function getListType($tipo)
    {
        $sql = parent::generateListForColumn(self::SQL_TABLE, "id_Mapa", $tipo);
        $params = array(
            array("value" => $tipo, "type" => "STR")
        );

        return $sql;
    }

    public function getListByName($title)
    {
        $sql = parent::searchList(self::SQL_TABLE, "nombre", $title);
        $params = array(
            array("value" => $title, "type" => "STR")
        );
        return $sql;
    }

    public static function updateCourseById($datap)
    {
        $fields_array = array(
            // array( array("field" => FIELD-NAME, "value" => FIELD-VALUE, "type" => ["INT" | "STR"] ) )
            array("field" => "id", "value" => $datap[0], "type" => "INT"),
            //Send the table id field in the first array position
            array("field" => "nombre", "value" => $datap[1], "type" => "STR"),
            array("field" => "descripcion", "value" => $datap[2], "type" => "STR"),
            array("field" => "precio", "value" => $datap[3], "type" => "STR"),
            array("field" => "currency", "value" => $datap[4], "type" => "STR"),
            array("field" => "duracion", "value" => $datap[5], "type" => "STR"),
            array("field" => "nivel", "value" => $datap[6], "type" => "STR"),
            array("field" => "ubicacion", "value" => $datap[7], "type" => "STR"),
            array("field" => "ficha", "value" => $datap[8], "type" => "STR"),
        );
        $sql = parent::generateUpdateQuery(self::SQL_TABLE, $fields_array);
        $params = array(
            array("value" => $fields_array[0]["field"], "type" => "INT")
        );
        $affected_arrows = parent::executeQuery($sql, $params, false);
        return $affected_arrows;
    }

    public static function createCourse($data)
    {
        $fields_array = array(
            array("field" => "nombre", "value" => $data[0], "type" => "STR"),
            array("field" => "descripcion", "value" => $data[1], "type" => "STR"),
            array("field" => "precio", "value" => $data[2], "type" => "STR"),
            array("field" => "currency", "value" => $data[3], "type" => "STR"),
            array("field" => "duracion", "value" => $data[4], "type" => "STR"),
            array("field" => "nivel", "value" => $data[5], "type" => "STR"),
            array("field" => "ubicacion", "value" => $data[6], "type" => "STR"),
            array("field" => "ficha", "value" => $data[7], "type" => "STR")
        );
        $sql = parent::generateInsertQuery(self::SQL_TABLE, $fields_array);
        $affected_arrows = parent::executeQuery($sql, false);
        return $affected_arrows;
    }
}