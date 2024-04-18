<?php

namespace App\Core\CRUD;


require_once 'Model.php';

/**
 * Description of User
 *
 * @author rafaelsanchez
 */
class Excursion extends Model
{
    const SQL_TABLE = "excursion";

    const MODEL_CONFIG = array(
        "tablename" => "excursion",
        "fields" => array(
            "id" => array("type" => "INT", "length" => "10"),
            "nombre" => array("type" => "STR", "length" => "250"),
            "descripcion" => array("type" => "STR", "length" => "250"),
            "tip" => array("type" => "STR", "length" => "250"),
            "img_tip" => array("type" => "STR", "length" => ""),
            "p_encuentro" => array("type" => "STR", "length" => "250"),
            "equipos" => array("type" => "STR", "length" => "250"),
            "checklist" => array("type" => "STR", "length" => "250"),
            "itinerario" => array("type" => "STR", "length" => "250"),
            "precio" => array("type" => "STR", "length" => "250"),
            "duracion" => array("type" => "STR", "length" => "250"),
            "nivel" => array("type" => "STR", "length" => "250"),
            "min_persona" => array("type" => "STR", "length" => "250"),
            "edad" => array("type" => "STR", "length" => "250"),
            "lugar" => array("type" => "STR", "length" => "250"),
            "idioma" => array("type" => "STR", "length" => "250"),
            "ficha" => array("type" => "STR", "length" => "250")          
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

    public static function updateExcursionById($datap)
    {
        $fields_array = array(
            // array( array("field" => FIELD-NAME, "value" => FIELD-VALUE, "type" => ["INT" | "STR"] ) )
            array("field" => "id", "value" => $datap[0], "type" => "INT"),
            //Send the table id field in the first array position
            array("field" => "nombre", "value" => $datap[1], "type" => "STR"),
            array("field" => "descripcion", "value" => $datap[2], "type" => "STR"),
            array("field" => "tip", "value" => $datap[3], "type" => "STR"),
            array("field" => "img_tip", "value" => $datap[4], "type" => "STR"),
            array("field" => "p_encuentro", "value" => $datap[5], "type" => "STR"),
            array("field" => "equipos", "value" => $datap[6], "type" => "STR"),
            array("field" => "checklist", "value" => $datap[7], "type" => "STR"),
            array("field" => "itinerario", "value" => $datap[8], "type" => "STR"),
            array("field" => "precio", "value" => $datap[9], "type" => "STR"),
            array("field" => "currency", "value" => $datap[10], "type" => "STR"),
            array("field" => "duracion", "value" => $datap[11], "type" => "STR"),
            array("field" => "nivel", "value" => $datap[12], "type" => "STR"),
            array("field" => "min_persona", "value" => $datap[13], "type" => "STR"),
            array("field" => "edad", "value" => $datap[14], "type" => "STR"),
            array("field" => "lugar", "value" => $datap[15], "type" => "STR"),
            array("field" => "idioma", "value" => $datap[16], "type" => "STR"),
            array("field" => "ficha", "value" => $datap[17], "type" => "STR")
        );
        $sql = parent::generateUpdateQuery(self::SQL_TABLE, $fields_array);
        $params = array(
            array("value" => $fields_array[0]["field"], "type" => "INT")
        );
        $affected_arrows = parent::executeQuery($sql, $params, false);
        return $affected_arrows;
    }

    public static function createExcursion($data)
    {
        $fields_array = array(
            array("field" => "nombre", "value" => $data[0], "type" => "STR"),
            array("field" => "descripcion", "value" => $data[1], "type" => "STR"),
            array("field" => "tip", "value" => $data[2], "type" => "STR"),
            array("field" => "img_tip", "value" => $data[3], "type" => "STR"),
            array("field" => "p_encuentro", "value" => $data[4], "type" => "STR"),
            array("field" => "equipos", "value" => $data[5], "type" => "STR"),
            array("field" => "checklist", "value" => $data[6], "type" => "STR"),
            array("field" => "itinerario", "value" => $data[7], "type" => "STR"),
            array("field" => "precio", "value" => $data[8], "type" => "STR"),
            array("field" => "currency", "value" => $data[9], "type" => "STR"),
            array("field" => "duracion", "value" => $data[10], "type" => "STR"),
            array("field" => "nivel", "value" => $data[11], "type" => "STR"),
            array("field" => "min_persona", "value" => $data[12], "type" => "STR"),
            array("field" => "edad", "value" => $data[13], "type" => "STR"),
            array("field" => "lugar", "value" => $data[14], "type" => "STR"),
            array("field" => "idioma", "value" => $data[15], "type" => "STR"),
            array("field" => "ficha", "value" => $data[16], "type" => "STR")
        );
        $sql = parent::generateInsertQuery(self::SQL_TABLE, $fields_array);
        $affected_arrows = parent::executeQuery($sql, false);
        return $affected_arrows;
    }
}