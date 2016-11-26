<?php
  $t = isset($_GET['t']) ? $_GET['t'] : 'num';
  $callback = isset($_GET['callback']) ? $_GET['callback'] : 'fn';

  $arr1 = array('111111','2222222','3333333','44444444','555555555');

  $arr2 = array('aaaaaa', 'bbbbbbbbb','ccccc','dddddddd','eeeeeeee');

  if($t === 'num') {
    $data = json_encode($arr1);
  }else {
    $data = json_encode($arr2);
  }
  
  echo $callback.'('.$data.');';
 ?>
