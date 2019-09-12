<?php
  session_start();
  session_destroy();
  header('Location: ../'); //redireccionamiento a login (index.php)
 ?>
