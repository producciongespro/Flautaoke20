import React from 'react';
import referenciasJson from '../data/referencias.json';
const referencias = referenciasJson[0];

const guardarDatosPerfil = (props) => {
  //TODO Enviar datos del form al servidor **********
  props.handlerCerrarModal();
}

var usuario;
var imgAvatar;


const obtenerDatosPerfil = () => {
  //Obtner el objeto usuario de session
  usuario = JSON.parse( sessionStorage.getItem("usuario"));
  console.log("Usuario de session",  usuario);  
  //fomra la url del avatar
  imgAvatar = referencias.img + "avatar/" + usuario.avatar + ".png";
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
            <img data-tar="galeria" onClick={props.handlerMontarTipoModal} className="img-perfil" src=
            {
                //Carga de imagen de avatar desde el sesion storage           
                imgAvatar
            } alt="logo avatar" />
            <input type="text-center" className="form-control" placeholder="*Nombre Perfil*"  defaultValue = {usuario.usuario }  />
          </div>
          <div className="col-md-7">
            <h5 className="text-perfil" >Información Básica</h5>
            <input type="text" className="form-control" placeholder="Nombre" defaultValue={ usuario.nombre }  />
            <input type="text" className="form-control" placeholder="Primer Apellido" defaultValue={ usuario.apellido1 }  />
            <input type="text" className="form-control" placeholder="Segundo Apellido" defaultValue={ usuario.apellido2 }  /> 
            <br /> <br />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h5 className="text-perfil" >Gana puntos: Completa lo siguiente:</h5>
            <select className="form-control" name="Centro">
              <option select="true" disabled={true} value="1">Centro Educativo</option>
              <option value="2">Base de datos</option>
            </select><br />
          </div>
        </div>



        <div className="row">
          <div className="col-8">
            <h6>¿Tiene formación musical previa? </h6>
          </div>

          <div className="col-4">
            <div className="pretty p-switch p-fill">
              <input type="checkbox" />
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
              <input type="checkbox" />
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
              <input type="checkbox" />
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
              <input type="checkbox" />
              <div className="state">
                <label></label>
              </div>
            </div>
          </div>
        </div><br />

        <div className="row">
          <div className="col-md-8">
            {
              usuario.correo !=="vacio" ?
                <input type="email" className="form-control" placeholder="Introduzca su email" defaultValue= {usuario.correo} />
                :
                <input type="email" className="form-control" placeholder="Introduzca su email" />
            }
            
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