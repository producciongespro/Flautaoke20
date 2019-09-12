import React, { Component } from 'react';
import "./Botones.css";



class Botones extends Component {

constructor (param) {
    super (param);
    this.state = {
        tipoBtn : param.tipoBtn
    }

}

claseBtn=""; // clase  css del botón
contenidoBtn = ""; // alamacena el contenido puede esr etiqeuta texto u objeto imagen


  componentWillMount () {
       // console.log( "Tipo btn", this.state.tipoBtn);
      // console.log("Id BTN", this.props.idBtn );
       

        switch (this.state.tipoBtn) {
            case "text":
                this.claseBtn =  "btn-custom-text animated";
                this.contenidoBtn  = this.props.etiqueta;               
            break;
            case "img":
                this.claseBtn =  "btn-custom-img animated";
                this.contenidoBtn  =   <img  className="img-fluid" src= {this.props.etiqueta} data-target= {this.props.idBtn }  alt="Módulos" />
            break;
        
            default:
            console.log("Opción fuera de rango");            
            break;
        }
              
    }


  render() {
    return (
        < div className={this.claseBtn}  onClick={this.props.onClick} id={this.props.idBtn} >
            { this.contenidoBtn }
        </div>
           
        
    );
  }
}

export default Botones;
