<?php

	if (!defined('INTERNAL')) {
		print('Cannot allow direct access');
		exit();
	}

	$data = getBodyData();													// get the json body, store to variable $id

	if(isset($data['id'])) {												// See if id came in the json body data
		$id = intval($data['id']);										// Store it into a variable, $id, if it did
		if ($id < 1) {														//check if it is greater than 0
			throw new Exception('id less than zero');				//throw an error otherwise
		}
	} else {
		throw new Exception('Must have a product id to add to cart');
	}

	// if(isset($data['count'])) {										// See if count came in the json body data
	// 	$count = $data['count'];										// Store it into a variable, $count if it did
	// } else {
	// 	throw new Exception('Please send product count');
	// }

	if (empty($_SESSION['cartId'])) {							// Make conditional to test if $_SESSION[‘cartId’] is empty
		$cartId = false;														// If empty, store false into the variable
	} else {
		$cartId = $_SESSION['cartId'];							// If not, store $_SESSION[‘cartId’] into a variable $cartID					
	}

	$price_query = "SELECT `price` FROM `products` WHERE id = $id"; // Make a query to get the price from products for the given id you got from the body json
	$price_result = mysqli_query($conn, $price_query);  	//  Send the query to the database and store the result

	if(!$price_result){															// Make sure result is valid
		throw new Exception('price query error '.mysqli_error($conn));
	}

	if( mysqli_num_rows($price_result) === 0){				// Check how many rows came back.
		throw new Exception("No product matches product id $id");		// Throw an exception if there isn’t one. It wasn’t a valid product id
	}

	$product_data = mysqli_fetch_assoc($price_result); 	// Extract the data for the row from the database, store the results into productData
	$product_price = (int)$product_data['price'];

	$transaction_query = "START TRANSACTION";     // Send a query to the database with the words “START TRANSACTION”
	$transaction_result = mysqli_query($conn, $transaction_query);

	if(!$transaction_result){											// Check to make sure the transaction was started by testing the result
		throw new Exception('transaction query error '.mysqli_error($conn));
	}

	if ($cartId === false) {  // Make an insert query to insert a new entry into the cart table if cardId is false
		$insert_query = "INSERT INTO `cart` SET `created` = NOW()";  // Specify ‘created’ as being equal to the mysql function NOW()
		$insert_result = mysqli_query($conn, $insert_query);  // Send your query to mysql and get the result

		if(!$insert_result){												// Check if your result is valid or throw an error
			throw new Exception('insert query error '.mysqli_error($conn));
		}
		if(mysqli_affected_rows($conn) === 0){				// Use mysqli_affected_rows to see if a row was inserted or not.
			throw new Exception('Data was not added to cart table');
		}

		$cartId = mysqli_insert_id($conn);					// Use mysqli_insert_id to get the id of the cart that was created
		$_SESSION['cartId'] = $cartId;							// store it into both cartId and $_SESSION[‘cartId’]
	}



																									// Make a query to insert data into the cartItems table
																									// Add count=1
																									// Add productID = the id you were passed in and sanitzed
																									// Add price = the price you got from the product table earlier
																									// Add added = NOW()
																									// cartID = the ID you got either from SESSIONS or from the insert previously
																									// Add a new bit onto the end of this query “ON DUPLICATE KEY UPDATE”
	$cart_item_query = "INSERT INTO `cartItems` SET
		`count` = 1,																		
		`productID`= {$id},
		`price` = {$product_price},
		`added` = NOW(),
		`cartID` = {$cartId}
		ON DUPLICATE KEY UPDATE 
		`count` = `count` + 1
	";

	$cart_item_result = mysqli_query($conn, $cart_item_query);  // Send your query to mysql and get the result back

	if(!$cart_item_result){																	// Test the result and act appropriately
		throw new Exception('cart item insert error '.mysqli_error($conn));
	}
	if(mysqli_affected_rows($conn) < 1 ){								// Check to make sure your query updated AT LEAST 1 row. DUPLICATE KEY updates sometimes report updating 2 rows since they tried to insert first.
		$rollback_query = "ROLLBACK";
		mysqli_query($conn, $rollback_query);														// If not, send this query to mysql: “ROLLBACK” (this will undo the first cart insert so you don’t have partial inserts)
		throw new Exception('Failed to insert into cart items');				// Throw an exception now as normal
	}
	
	$commit_query = "COMMIT";
	mysqli_query($conn, $commit_query); // Your query is now complete, we need to finalize the transaction: send to mysql this: “COMMIT”

	print(json_encode([
		'message' => 'Items added to cart'
	]));
?>