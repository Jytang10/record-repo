<?php
header('Content-Type: application/json');
define('INTERNAL', true);   

require_once("functions.php");
session_start();
set_exception_handler("error_handler");
startUp();
require_once("db_connection.php");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        require_once('cart_get.php');
        break;
    case 'POST':
        require_once('cart_add.php');
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