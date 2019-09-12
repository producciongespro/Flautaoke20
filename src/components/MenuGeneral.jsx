import React from 'react';

const MenuGeneral = (props) => {
    return (

        <div className="menu col-2 animated zoomInDown">
                <div className="menu-der animated" data-tipo="acerca" onClick = {props.handlerMostrarModal } > Acerca de </div>   
                    <hr className="dec-menu"/>           
                <div className="menu-der animated" data-tipo="preguntas"  onClick = {props.handlerMostrarModal } > Preguntas </div>  
                    <hr className="dec-menu"/>    
                <div className="menu-der animated" data-tipo="ayuda"  onClick = {props.handlerMostrarModal } > Ayuda </div> 
                    <hr className="dec-menu"/>  
                <div className="menu-der animated" data-tipo="creditos"  onClick = {props.handlerMostrarModal } > Créditos </div> 
                    <hr className="dec-menu"/>    
                <div className="menu-der animated"  onClick={props.handlerCerrarSesion} > Cerrar sesión </div>      
        </div>
      );
}
 
export default MenuGeneral;