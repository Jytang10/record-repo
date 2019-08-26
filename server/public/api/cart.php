<?php

header('Content-Type: application/json');
define('INTERNAL', true);

require_once("functions.php");
session_start();
set_exception_handler("error_handler");
require_once("db_connection.php");

$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');

switch ($method) {
    case 'GET':
        require_once('cart_get.php');
        break;
    case 'POST':
        // http_response_code(201);
        require_once('cart_add.php');
        print($item);
        break;
    case 'DELETE':
        require_once('cart_delete.php');
        break;
    default:
        http_response_code(404);
        print(json_encode([
        'error' => 'Not Found',
        'message' => "Cannot $method /api/cart.php"
        ]));
        break;
}

?>