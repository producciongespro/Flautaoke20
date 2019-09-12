import React from 'react';

const HistoriaCancion = (props) => {
    return ( 
        <React.Fragment>
            <h3>Historia de la canción</h3>
            <hr/>
            <p>
               {props.texto} 
            </p>
        </React.Fragment>
     );
}
 
export default HistoriaCancion;