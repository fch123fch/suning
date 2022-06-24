<?php

include('./conn.php');

// header('Access-Control-Allow-Origin:*'); // 开放请求权限

$username = $_REQUEST['username'];

$password = $_REQUEST['password'];

$sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";

$res = $conn->query($sql);

if($res->num_rows>0){
  // echo '<script>alert("登录成功");</script>';
  // // echo json_encode($res);
  echo json_encode('登录成功');
}else{
  echo '<script>alert("登录失败");</script>';
}
?>