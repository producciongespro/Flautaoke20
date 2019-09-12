import React from 'react';
import referenciasJson from '../data/referencias.json';
const referencias = referenciasJson[0];

var usuario;
var imgAvatar;


const obtenerDatosPerfil = () => {
  //Obtner el objeto usuario de session
  usuario = JSON.parse( sessionStorage.getItem("usuario"));
  console.log("Usuario de session",  usuario);  
  //fomra la url del avatar
  imgAvatar = referencias.img + "avatar/" + usuario.avatar + ".png";
}


const guardarDatosPerfil = (props) => {
  //TODO Enviar datos del form al servidor **********
  console.log("Usuario", usuario);
  sessionStorage.setItem("usuario", JSON.stringify(usuario) );  
  props.handlerCerrarModal();
}

const guardarValoresTxt = (e) => {
  let item = e.target;

  switch (item.id) {
    case "txtUsuario":
      usuario.usuario = item.value;
    break;
    case "txtNombre":
      usuario.nombre = item.value;
    break;
    case "txtApellido1":
      usuario.apellido1 = item.value;
    break;
    case "txtApellido2":
      usuario.apellido2 = item.value;
    break;  
    case "txtCentroEducativo":
      usuario.centroEducativo = item.value;
    break;  
    case "txtCorreo":
        usuario.correo = item.value;
      break;  

    
    default:
      console.log("Item no especificado");      
    break;
  }

}

const guardarValoresChk = (e) => {
let item = e.target;
  console.log(item.checked );

  switch (item.id) {
    case "chkFormacion":
      usuario.formacion = item.checked;
    break;
    case "chkClases":
      usuario.clases = item.checked;
    break;
    case "chkTieneCorreo":
      usuario.tieneCorreo = item.checked;
    break;
    case "chkNotificaciones":
      usuario.notificaciones = item.checked;
    break;  
    default:
      console.log("Valor de id de input fuera de rango");      
    break;
  }


}


const abrirGaleria = ( e, props) => {
  /*
  Este método ejecuta dos rutinas:
  1 - Guarda en session el objeto usuario ya que como va abrir otro modal el objeto en memoria se peirde
  2 - llama a handlerMontarTipoModal del componente padre que lo recibe dentro de  props
  Como ese método tiene que enviar el objeto e, se adjunta como argumento desde el objeto img mediante arrow fucntion
  */
  //console.log(e.target);  
  sessionStorage.setItem("usuario", JSON.stringify(usuario) );
  props.handlerMontarTipoModal(e);
}


const Perfil = (props) => {  
  obtenerDatosPerfil();

  return (
    <React.Fragment>

      <div className="row">
        <div className="col-md-4">
          <h1 className="titmodal">  Perfil </h1><hr />

        </div>
        <div className="col-md-4">
          <div data-preset="rainbow" className="ldBar label-center" data-value="35"> </div>
        </div>

      </div>

      <div className="textos control-group form-group">

        <div className="row ">
          <div className="col-md-5 animated zoomInDown">
            <img data-tar="galeria" onClick={ (e) => abrirGaleria(e, props)  } className="img-perfil" src=
                {
                    //Carga de imagen de avatar desde el sesion storage           
                    imgAvatar
                } alt="logo avatar" />
            <input type="text-center" className="form-control"  id="txtUsuario" placeholder="*Nombre de usuario*"  defaultValue = {usuario.usuario } onChange={guardarValoresTxt}  />
          </div>
          <div className="col-md-7">
            <h5 className="text-perfil" >Información Básica</h5>
            <input type="text" className="form-control" id="txtNombre" placeholder="Nombre" defaultValue={ usuario.nombre } onChange={guardarValoresTxt}  />
            <input type="text" className="form-control" id="txtApellido1" placeholder="Primer Apellido" defaultValue={ usuario.apellido1 }  onChange={guardarValoresTxt} />
            <input type="text" className="form-control" id="txtApellido2" placeholder="Segundo Apellido" defaultValue={ usuario.apellido2 } onChange={guardarValoresTxt}  /> 
            <br /> <br />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h5 className="text-perfil" >Gana puntos: Completa lo siguiente:</h5>
            <input type="text" className="form-control" id="txtCentroEducativo" placeholder="Escriba el nombre del centro educativo" defaultValue={ usuario.centroEducativo } onChange={guardarValoresTxt}  />
            <br />
          </div>
        </div>



        <div className="row">
          <div className="col-8">
            <h6>¿Tiene formación musical previa? </h6>
          </div>

          <div className="col-4">
            <div className="pretty p-switch p-fill">
              <input id="chkFormacion" type="checkbox" onClick={guardarValoresChk}  defaultChecked={usuario.formacion} />
              <div className="state">
                <label></label>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <h6>¿Recibe clases de Educación Músical? </h6>
          </div>
          <div className="col-4">
            <div className="pretty p-switch p-fill">
              <input id="chkClases" type="checkbox"  onClick={guardarValoresChk}   defaultChecked={usuario.clases} />
              <div className="state">
                <label></label>
              </div>
            </div>
          </div>

        </div>


        <div className="row">
          <div className="col-md-8">
            <h6>¿Tiene correo electrónico? </h6>
          </div>
          <div className="col-4">
            <div className="pretty p-switch p-fill">
              <input type="checkbox" id="chkTieneCorreo"  onClick={guardarValoresChk}  defaultChecked={usuario.tieneCorreo} />
              <div className="state">
                <label></label>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <h6>¿Desea recibir notificaciones? </h6>
          </div>
          <div className="col-4">
            <div className="pretty p-switch p-fill">
              <input type="checkbox" id="chkNotificaciones" onClick={guardarValoresChk}  defaultChecked={usuario.notificaciones} />
              <div className="state">
                <label></label>
              </div>
            </div>
          </div>
        </div><br />

        <div className="row">
          <div className="col-md-8">
            <input type="email" className="form-control"  id="txtCorreo" placeholder="Introduzca su email" defaultValue= {usuario.correo}  onChange={guardarValoresTxt} />                        
          </div>
          <div className="col-md-4">
            <button  onClick = { () => guardarDatosPerfil( props) }  className="btn btn-warning" > Guardar perfil </button>
          </div>
        </div>


      </div>
    </React.Fragment>
  );
}

export default Perfil;