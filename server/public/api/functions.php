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
    $json_input = file_get_contents("php://input");
    $input =  json_decode($json_input, true);
    print($input);
  }
?>