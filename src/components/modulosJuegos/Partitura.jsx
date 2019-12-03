import React from 'react';

const Partitura = (props) => {
    return ( 
        <React.Fragment>
            <h3 className="titulos-partituras">Partitura</h3> 
            {
                console.log("Partitura", props.cancionActual.url_partitura)
                
            }           
            <iframe title="partitura"  src={props.cancionActual.url_partitura } height="450" width="900" frameBorder="0" allowFullScreen></iframe>
            


        </React.Fragment>
     );
}
 
export default Partitura;