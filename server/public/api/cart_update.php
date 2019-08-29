<?php

  if (!defined('INTERNAL')) {
  print('Cannot allow direct access'); 
  exit();
  }

  $data = getBodyData();

  if(isset($data['id'])) {
		$id = intval($data['id']);
		if ($id < 1) {
			throw new Exception('invalid id. must be a number greater than 0');
		}
	} else {
		throw new Exception('Must have a product id to add to cart');
  }
  
  if (empty($_SESSION['cartId'])) {
    print(json_encode(array()));
    exit();
	} else {
		$cartId = $_SESSION['cartId'];	
  }
  
  $update_query  = "UPDATE `cartItems` SET `count` = `count` - 1 WHERE `productID` = {$id}";
  $update_result = mysqli_query($conn, $update_query);

  if (!$update_result) {
    throw new exception('cart update error '.mysqli_error($conn));
  };
  if (mysqli_affected_rows($conn) === 0) {
    throw new Exception('could not update cart '.mysqli_error($conn));
  };

  print(json_encode([
		'message' => 'Cart updated'
	]));
?>