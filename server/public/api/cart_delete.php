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

?>