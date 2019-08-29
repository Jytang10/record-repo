<?php

require_once('functions.php');
require_once('db_connection.php');
session_start();
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
$order_items = json_encode($order['cart'], JSON_HEX_APOS);

$query = "INSERT INTO `orders` (`name`, `address`, `city`, `state`, `zip`, `email`, `credit_card`, `order_items`) 
          VALUES ('{$name}','{$address}','{$city}', '{$state}', '{$zip}', '{$email}', '{$credit_card}', '{$order_items}')";

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

unset($_SESSION['cardId']);
$_SESSION = array();

?>