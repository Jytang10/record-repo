<?php
require_once('functions.php');
require_once('db_connection.php');

set_exception_handler("error_handler");
startUp();

// if(!$conn){
//   throw new Exception(mysqli_connect_error($conn));
// };

// $whereClause = "";
// $id = false;

// if (!empty($_GET["id"])) {
//   if(!is_numeric($_GET["id"])){
//     throw new Exception("id needs to be a number");
//   }
//   $id = intval($_GET["id"]);
//   $whereClause = "WHERE `id` = $id" ;
// }

// $query = "SELECT * FROM `products` $whereClause";
// $result = mysqli_query($conn, $query);

// if (!$result){
//   throw new Exception(mysqli_error($result));
// };

// $output = [];

// while ($row = mysqli_fetch_assoc( $result )){
//   array_push($output,$row);
// }

// if (mysqli_num_rows($result) === 0 && $id !== false ){
//   throw new Exception("Invalid ID: " . $id);
// };

// function utf8ize($d) {
//   if (is_array($d)) {
//       foreach ($d as $k => $v) {
//           $d[$k] = utf8ize($v);
//       }
//   } else if (is_string ($d)) {
//       return utf8_encode($d);
//   }
//   return $d;
// }

// echo json_encode(utf8ize($output));

if (empty($_GET['id'])) {
  $output = file_get_contents('dummy-products-list.json');
  print($output);
} else {
  readfile('dummy-product-details.json');
}

?>