<?php

  header('content-type:text/html;charset=utf-8');

  // 获得数据库中的数据
  $mysql_conf = array(
    'host'=>'localhost:3306',  // 主机名端口号
    'user'=>'root', // 登录用户名
    'pass'=>'root', // 登录密码
    'db'=>'h5-2206'  //  数据库名
  );  

  $conn = @new mysqli($mysql_conf['host'],$mysql_conf['user'],$mysql_conf['pass']);

  // var_dump($conn);
  
  if($conn->connect_error){ // 出现错误
    // die();  结束进程 终止代码向下执行
    die('连接错误'.$conn->connect_errno); // 终止代码执行 并输出错误代码
  }

  // 设置查询字符集
  $conn->query('set names utf-8');

  // 选择数据库
  $selected = $conn->select_db($mysql_conf['db']);

  if(!$selected){
    die('数据库选择错误'.$conn->error);
  }

?>