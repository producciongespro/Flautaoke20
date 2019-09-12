import React, { Component } from 'react';
import './GaleriaAvatar.css';
import  avatarJson from '../../data/avatar.json';
import referenciasJSON from '../../data/referencias.json';
const referencias = referenciasJSON[0];

class GaleriaAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grupo: 1,
            idAvatar: "",
            nombreAvatar : "",
            detalleActivado: false
        }
    }

    handlerZoomAvatar = (e) => {
        const idAvatar = e.target.id;      
        const etiqueta =  e.target.dataset.etiqueta;        
        
        this.setState({
            detalleActivado: true,
            idAvatar: idAvatar,
            nombreAvatar : etiqueta
        });
    }

    handlerSeleccionarAvatar = (e) => {
        const idAvatar = e.target.id; 
        
        //obtiene el avatar del ususario que está en session
        let usuario = JSON.parse(sessionStorage.getItem("usuario"));
        usuario.avatar = idAvatar;

        sessionStorage.setItem("usuario", JSON.stringify(usuario) );
        this.props.handlerMontarTipoModal(e);
    }

    handlerIrGaleria = () => {
        this.setState({ detalleActivado: false  });
    }


    render() {
        return (
            <React.Fragment>
                {
                    //DETALLE AVATAR
                    this.state.detalleActivado ? (
                        <React.Fragment>
                            <h3> { this.state.nombreAvatar } </h3>
                            <div className="row">
                                <div className="col-6 text-right">
                                    <button  id = {this.state.idAvatar}   data-tar = "perfil" onClick={this.handlerSeleccionarAvatar} className="btn btn-success" > Seleccionar a {this.state.nombreAvatar} </button>
                                </div>
                                <div className="col-6 text-left">
                                    <button onClick={this.handlerIrGaleria} className="btn btn-danger">Volver a galería</button>
                                </div>                                
                            </div>
                            <div className="row">
                                <div className="col-12 text-center">
                                    <img className="img-fluid"  src={ referencias.img + "avatar/"+ this.state.idAvatar + ".png" } alt="detalle" />
                                </div>
                            </div>
                        </React.Fragment>
                    ) : (
                            <React.Fragment>
                                {/* GALERÍA DE AVATAR*/}
                                <h3 className="text-center">Galeria Avatar</h3>
                                <div className="row">
                                    <div className="col-12 text-right">
                                        <button data-tar = "perfil" onClick = {this.props.handlerMontarTipoModal }  className="btn btn-info">Volver al perfil</button>
                                    </div>
                                </div>

                                <div className="row">
                            {
                                avatarJson.map((item, i) => (                                    
                                    <div key={"avatar"+i} className="col-3 text-right my-2">
                                        <img  className="img-avatar animated bounceIn"  id={ item.id }  data-etiqueta = {item.etiqueta}  onClick={this.handlerZoomAvatar} src={this.props.referencias.img + item.archivo} alt="avatar" />
                                    </div>
                                    
                                ))
                            }
                            </div>

                                    
                            </React.Fragment>
                        )
                }
            </React.Fragment>
        );
    }
}

export default GaleriaAvatar;