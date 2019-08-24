<?php

header('Content-Type: application/json');
define('INTERNAL', true);

require_once("functions.php");
session_start();
set_exception_handler("error_handler");
require_once("db_connection.php");

$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');

if ($method == 'GET') {
  require_once('cart_get.php');
} else if ($method == 'POST') {
  http_response_code(201);
  require_once('cart_add.php');
  print($item);
} else if ($method == 'DELETE') {
  $id = $_GET['id'];
  $sql = "DELETE FROM `product_details` WHERE id = $id";    //product_details might need to be a different name
  $retval = mysqli_query($conn, $sql);
  if(!$retval) {
    die('Could not remove data: ' . mysqli_error());
  }
  echo $retval;
  mysqli_close($conn);
} else {
  http_response_code(404);
  print(json_encode([
    'error' => 'Not Found',
    'message' => "Cannot $method /api/cart.php"
  ]));
}

?>