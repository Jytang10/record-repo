<?php

require_once('functions.php');
require_once('db_connection.php');

set_exception_handler("error_handler");
startUp();

if(!$conn){
  throw new Exception(mysqli_connect_error($conn));
};

$order = file_get_contents('php://input');
$order = json_decode($order, true);

$name = $order['name'];
$address = $order['address'];
$city = $order['city'];
$state = $order['state'];
$zip = $order['zip'];
$email = $order['email'];
$credit_card = $order['ccnumber'];
$order_items = $order['cart'];

$query = "INSERT INTO `orders` (`name`, `address`, `city`, `state`, `zip`, `email`, `ccnumber`, `cart`) VALUES ('{$name}','{$address}','{$city}', '{$state}', '{$zip}', '{$email}', '{$credit_card}', '{$order_items}')";

$result = mysqli_query($conn, $query);

if(!$result){
    throw new Exception( mysqli_error($conn) );
}

if ($result) {
    $message = 'Order Success!';
    $json = json_encode($message);
    echo $json;
} else {
    throw new Exception("Could not place order: " . mysqli_error($conn));
}

// header('Content-Type: application/json');
// $method = $_SERVER['REQUEST_METHOD'];
// $order = file_get_contents('php://input');
// if ($method != 'POST') {
//   http_response_code(404);
//   print(json_encode([
//     'error' => 'Not Found',
//     'message' => "Cannot $method /api/orders.php"
//   ]));
// } else {
//   http_response_code(201);
//   print_r($order);
// }

?>