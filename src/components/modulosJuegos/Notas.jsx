import React from 'react';


const Notas = (props) => {

    var notas = props.cancionActual.notas.split(" ");

    return ( 
        <React.Fragment>
            <h3>Notas</h3>
            {
                notas.map((item, i) => (
                    <a href={item}  key={i}  > {item} </a>
                ) )
            }
        </React.Fragment>
     );
}
 
export default Notas;