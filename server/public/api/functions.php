<?php
  function error_handler($error){
    $output = [
      "success"=>false,
      "error"=>$error -> getMessage()
    ];
    $json_output = json_encode($output);
    http_response_code(500);
    print($json_output);
  }

  function startUp(){
    header('Content-Type: application/json');
  }

  function getBodyData(){
    $data = json_decode(file_get_contents('php://input'), true);
  }

?>