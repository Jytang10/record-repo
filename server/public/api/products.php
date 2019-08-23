<?php
require_once('functions.php');
require_once('db_connection.php');

set_exception_handler("error_handler");
startUp();

if(!$conn){
  throw new Exception(mysqli_connect_error($conn));
};

if (empty($_GET["id"])) {
  $query = "SELECT p.`id`, p.`name`, p.`price`, p.`artist`, p.`description`, 
            GROUP_CONCAT(i.`url`) AS `images`
   	        FROM `products` AS p 
   	        JOIN `images` AS i 
            ON p.`id` = i.`products_id` 
            GROUP BY p.`id`";
} else {
  $id = $_GET["id"];
  if (is_numeric($id)) {
    $query = "SELECT p.`id`, p.`name`, p.`price`, p.`artist`, p.`description`, 
              GROUP_CONCAT(i.`url`) AS `images`
              FROM `products` AS p 
   	          JOIN `images` AS i 
              ON p.`id` = i.`products_id`
              WHERE p.`id` = $id
              GROUP by p.`id`";
  } else {
    throw new Exception('id needs to be a number');
  }
}

$result = mysqli_query($conn, $query);

if (!$result){
  throw new Exception(mysqli_error($result));
};

$output = [];

while ($row = mysqli_fetch_assoc( $result )){
  $row['images'] = explode(",", $row['images']);
  array_push($output,$row);
}


if (mysqli_num_rows($result) === 0 && $id !== false ){
  throw new Exception("Invalid ID: " . $id);
};

function utf8ize($d) {
  if (is_array($d)) {
      foreach ($d as $k => $v) {
          $d[$k] = utf8ize($v);
      }
  } else if (is_string ($d)) {
      return utf8_encode($d);
  }
  return $d;
}

echo json_encode(utf8ize($output), JSON_UNESCAPED_SLASHES);

?>