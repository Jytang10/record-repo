<?php

	if (!defined('INTERNAL')) {            // Add our INTERNAL check like in cart_add 
		print('Cannot allow direct access');
		exit();
	}

  if(empty($_SESSION['cartId'])){        // Check if SESSION[‘cart_id’] is empty
    print(json_encode(array()));          // If it is, print a json encoded empty array
    exit();                               // Exit to stop processing, we have no cart for this person
  }

  $cartId = intval($_SESSION['cartId']);  // Set the $cartId variable to the SESSION cart_id. To be safe, we probably should intval it, too
                                          // Write a query that fetches the appropriate data as found in dummy-cart-items.json
                                          // You’ll need a join with products table to get data from there
                                          // You’ll need a subquery to get the first image from images table
                                          // You’ll need to only get the cart where the cart ID is the one you are looking for
  $cart_query = "SELECT 
      c.`created`,
      ci.`count`, ci.`price`
      p.`id`, p.`name`, p.`price`, p,`artist`,
      (SELECT `url` FROM `images` WHERE `products_id` = p.`id` LIMIT 1) AS url
    FROM `cart` AS `c` 
    JOIN `cartItems` AS `ci` ON ci.`cartID` = c.`id`  
    JOIN `products` AS `p` ON ci.`productID` = p.`id`
    WHERE c.`id` = {$cartId}
    ";
  
  $cart_result = mysqli_query($conn, $cart_query);  // Send the query to mysql and get the result

  if(!$cart_result){
    throw new Exception(mysqli_error($conn));
  }

  $data = [];
  while($row = mysqli_fetch_assoc($cart_result)) {  // Iterate through array until data runs out
    $data[] = $row;                                 // while tests a falsey value which stops the loop
  }

  if($data === []) {                // If query id does not exist, no result is returned (test for valid id). Print out an empty array
    print(json_encode(array()));
  }

  if(count($data) === 1) {        //Retrieve the data you got from the query and print it out.
    print(json_encode($data));    // index 0 because this returns an array with one object inside
  } else {
    print(json_encode($data));
  }
?>