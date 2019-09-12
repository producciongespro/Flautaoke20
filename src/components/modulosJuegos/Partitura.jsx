import React from 'react';

const Partitura = (props) => {
    return ( 
        <React.Fragment>
            <h3>Partitura</h3>            
            <iframe src={props.cancionActual.url_partitura } frameBorder="0"></iframe>
            


        </React.Fragment>
     );
}
 
export default Partitura;