<?php
//Inicia una nueva sesiиоn o reanuda la existente 
    session_start(); 
//Destruye toda la informaciиоn registrada de una sesiиоn
    session_destroy(); 
	
//Redirecciona a la pивgina de login
    header('location: ../index.php'); 
?>