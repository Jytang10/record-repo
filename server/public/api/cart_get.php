<?php

	if (!defined('INTERNAL')) {
		print('Cannot allow direct access');
		exit();
	}

  if(empty($_SESSION['cartId'])){
    print_r(getBodyData([]));
    exit();
  }

  $cartId = intval($_SESSION['cartId']);  

  $cart_query = "SELECT c.`price`, c.`count`, p.`name`, p.`id`, p.`artist`,
                (SELECT `url` FROM `images` WHERE `products_id` = p.`id` LIMIT 1) AS`url`
                FROM `cartItems` AS `c`
                INNER JOIN `products` AS `p` ON c.`productID` = p.`id`
                WHERE c.`cartID` = {$cartId}";
  
  $cart_result = mysqli_query($conn, $cart_query);

  if(!$cart_result){
    throw new Exception(mysqli_error($conn));
  }

  $data = [];
  while($row = mysqli_fetch_assoc($cart_result)) {
    $data[] = $row;
  }

  if($data === []) { 
    print_r("[]");
    exit();
  }

  print(json_encode($data, JSON_UNESCAPED_SLASHES));
?>