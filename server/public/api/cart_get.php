<?php

	if (!defined('INTERNAL')) {            // Add our INTERNAL check like in cart_add 
		print('Cannot allow direct access');
		exit();
	}

  if(empty($_SESSION['cart_id'])){        // Check if SESSION[‘cart_id’] is empty
    print(json_encode(array()));          // If it is, print a json encoded empty array
    exit();                               // Exit to stop processing, we have no cart for this person
  }

  $cartId = intval($_SESSION['cart_id']);  // Set the $cartId variable to the SESSION cart_id. To be safe, we probably should intval it, too
                                          // Write a query that fetches the appropriate data as found in dummy-cart-items.json
                                          // You’ll need a join with products table to get data from there
                                          // You’ll need a subquery to get the first image from images table
                                          // You’ll need to only get the cart where the cart ID is the one you are looking for
  $cart_query = "SELECT 
    c.`created`,
    ci.`count`, ci.`price`
    p.`id`, p.`name`, p.`price`,
    (SELECT url FROM `images` WHERE `products_id` = p.`id` LIMIT 1 ) AS `image`
    FROM `cart` AS `c` 
    JOIN `cartItems` AS `ci` ON ci.`cartId` = c.`id`
    JOIN `products` AS `p` ON ci.`productId` = p.`id`
    WHERE c.`id` = $cart_id
    ";
  
  $cart_data = mysqli_query($conn, $cart_query);  // Send the query to mysql and get the result

  if(!$cart_data){
    throw new Exception(mysqli_error($conn));
  }

  if(mysqli_num_rows($cart_data) === 0){  // If there is nothing there, make sure it prints out an empty array
    print(json_encode(array()));
    exit(); 
  }

  print(json_encode($cart_data));  //Retrieve the data you got from the query and print it out.

?>