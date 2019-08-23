<?php

define("INTERNAL", true);

require_once("db_connection.php");
require_once("function.php");
set_exception_handler("error_handler");

startUp();
session_start();

switch ($_SERVER["REQUEST_METHOD"]) {
  case 'POST':
    require("cart_add.php");
    break;
  case 'GET':
    require("cart_get.php");
    break;
}

if (!$conn) {
  throw new Exception(mysqli_connect_error($conn));
};

// header('Content-Type: application/json');

// $method = $_SERVER['REQUEST_METHOD'];
// $item = file_get_contents('php://input');

// if ($method == 'GET') {
//   readfile('dummy-cart-items.json');
// } else if ($method == 'POST') {
//   http_response_code(201);
//   print($item);
// } else {
//   http_response_code(404);
//   print(json_encode([
//     'error' => 'Not Found',
//     'message' => "Cannot $method /api/cart.php"
//   ]));
// }

?>