import React from 'react';
import Slider from './Slider/Slider';
import refernciasJson from '../data/referencias.json';
const referencias = refernciasJson[0];


var user, password;

const getUser = (e) => {
    user = e.target.value;
    //console.log(user);
}
const getPassword = (e) => {
    password = e.target.value;
    //console.log(password);
}


const Login = (props) => {

    //Limpia las variables:
    user = "";
    password = "";


    return (
        <React.Fragment>
            <div className="row" >
                <div className="col-12 div-encabezado-login">                  
                    
                            <div className="row">

                                <div className="col-4"></div>

                                <div className="col-3">
                                    <input type="text" autoComplete="username" className="form-control" onChange={getUser} id="idUser" placeholder="Digite el usuario" name="usuario" />
                                </div>
                                <div className="col-3">
                                    <input type="password" autoComplete="current-password" className="form-control" onChange={getPassword} id="txtPwd" placeholder="Digite la contraseña" name="contraseña" />
                                </div>

                                <div className="col-1">
                                <button className="btn btn-warning btn-block " onClick={() => props.handlerLogin(user, password )} > Entrar </button>
                            </div>

                            <div className="col-1">
                                <button className="btn btn-warning btn-block " onClick={props.mostrarModal} data-tipo="registro" > Registro </button>
                            </div> 

                            </div>
                    
           



                </div>
            </div>


            <div className="row" >
                <div className="col-6">
                    <img className="img-fluid img-logo-port" src={referencias.img + "icono-logo.png"} alt="logo flautaoke" />
                </div>
            </div>

            <div className="row posit_img_portada ">
                <Slider referencias={referencias} />
            </div>




            <div className="row">
                <div className="col-12 pie_portada">
                    <p> <strong>MEP-GESPRO</strong></p>
                    <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/cr/">
                        <img className="img-fluid icono-creative" src={referencias.img + "logo-creative.png"} alt="Logo creative" /></a>
                </div>
            </div>


        </React.Fragment>
    );
}

export default Login;