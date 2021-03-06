<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];
$errors = array();
$mensaje = array();
// verifica si la peticiòn es de tipo AJAX
  //if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH'])== 'xmlhttprequest'    ) {
    require('funcs/conexion.php');
    require('funcs/funcs.php');
    $mysqli = conectarDB();
    //sleep(1);	
	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);    
    session_start();    
    $mysqli->set_charset('utf8');
	    
	$usuario = $dataObject-> usuario;
	$pas =	$dataObject-> clave;
    
    if ($nueva_consulta = $mysqli->prepare("Select nombre, apellido1, apellido2, usuario, tipoUsuario, idUsuario, avatar, correo, centroEducativo, claveEncriptada, formacion, clases, tieneCorreo, notificaciones From usuarios Where usuario = ?")) {
        $nueva_consulta->bind_param('s', $usuario);
        $nueva_consulta->execute();
        $resultado = $nueva_consulta->get_result();
        if ($resultado->num_rows == 1) {
            $datos = $resultado->fetch_assoc();
             $encriptado_db = $datos['claveEncriptada'];
            if (   (password_verify($pas, $encriptado_db)   )    )
            {
                $_SESSION['usuario'] = $datos['usuario'];
                echo json_encode(array('error'=>false,'usuario'=>$datos['usuario'], 'nombre'=>$datos['nombre'],  'apellido1'=>$datos['apellido1'],  'apellido2'=>$datos['apellido2'],    'correo'=>$datos['correo'],     'centroEducativo'=>$datos['centroEducativo'],       'idUsuario'=>$datos['idUsuario'], 'avatar'=>$datos['avatar'],  'formacion'=>$datos['formacion'], 'clases'=>$datos['clases'], 'tieneCorreo'=>$datos['tieneCorreo'], 'notificaciones'=>$datos['notificaciones']    ) );
              }

               else {
                //  $errors[] = "El usuario y/o clave son incorrectas, vuelva a intentarlo.";
                 echo json_encode(array('error'=>true, 'error_msg' => 'La clave es incorrecta, vuelva a intentarlo.'));
                    }
        }
        else {
              //$errors[] = "El usuario y/o clave son incorrectas, vuelva a intentarlo.";
              echo json_encode(array('error'=>true, 'error_msg' => 'El usuario no existe.'));
        }
        $nueva_consulta->close();
      }
 // }
$mysqli->close();
?>
