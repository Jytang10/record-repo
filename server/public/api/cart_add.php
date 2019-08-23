<?php

require_once("db_connection.php");
require_once('functions.php');
set_exception_handler("error_handler");

if (defined('INTERNAL')) {
  exit('Cannot allow direct access');
}

$id = getBodyData();

if (intval($id) < 0) {
  throw new Exception('id less than zero');
}

?>