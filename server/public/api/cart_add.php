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
		$cartId = false;
	} else {
		$cartId = $_SESSION['cartId'];		
	}

	$price_query = "SELECT `price` FROM `products` WHERE id = $id";
	$price_result = mysqli_query($conn, $price_query);

	if(!$price_result){
		throw new Exception('price query error '.mysqli_error($conn));
	}

	if( mysqli_num_rows($price_result) === 0){
		throw new Exception("No product matches product id $id");
	}

	$product_data = mysqli_fetch_assoc($price_result);
	$product_price = (int)$product_data['price'];

	$transaction_query = "START TRANSACTION";
	$transaction_result = mysqli_query($conn, $transaction_query);

	if(!$transaction_result){
		throw new Exception('transaction query error '.mysqli_error($conn));
	}

	if ($cartId === false) {
		$insert_query = "INSERT INTO `cart` SET `created` = NOW()";
		$insert_result = mysqli_query($conn, $insert_query);

		if(!$insert_result){
			throw new Exception('insert query error '.mysqli_error($conn));
		}
		if(mysqli_affected_rows($conn) === 0){
			throw new Exception('Data was not added to cart table');
		}

		$cartId = mysqli_insert_id($conn);
		$_SESSION['cartId'] = $cartId;
	}

	$cart_item_query = "INSERT INTO `cartItems` SET
		`count` = 1,																		
		`productID`= {$id},
		`price` = {$product_price},
		`added` = NOW(),
		`cartID` = {$cartId}
		ON DUPLICATE KEY UPDATE 
		`count` = `count` + 1
	";

	$cart_item_result = mysqli_query($conn, $cart_item_query);

	if(!$cart_item_result){
		throw new Exception('cart item insert error '.mysqli_error($conn));
	}
	if(mysqli_affected_rows($conn) < 1 ){
		$rollback_query = "ROLLBACK";
		mysqli_query($conn, $rollback_query);
		throw new Exception('Failed to insert into cart items');
	}
	
	$commit_query = "COMMIT";
	mysqli_query($conn, $commit_query);

	print(json_encode([
		'message' => 'Items added to cart'
	]));
?>