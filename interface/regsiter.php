<?php

  include('./conn.php');

  // header('Access-Control-Allow-Origin:*'); // 开放请求权限

  $username = $_REQUEST['username'];
  $password = $_REQUEST['password'];

  $sql = "select * from users where username='$username'";

  $res = $conn->query($sql);

  if($res->num_rows<=0){
    // echo '{"message":"用户名已存在","username":"'.$username.'","color":"red"}';
    // echo '<script>alert("注册成功")</script>';
    // echo '<script>location.href="./login.html";</script>';
    $sql1 = "INSERT INTO `users`( `username`, `password`, `email`, `phone`, `sex`) VALUES ('$username','$password','001','001','1');";
    $res1 = $conn->query($sql1);
    echo json_encode('注册成功');
  }else{
    // echo '{"message":"用户名可以使用","username":"'.$username.'","color":"greenyellow"}';
    // echo '<script>alert("注册失败")</script>';
    echo json_encode('注册失败');
  }


?>