import React from 'react';
import referenciasJson from '../../data/referencias.json';
const referencias = referenciasJson[0];



const Flautaoke = (props) => {
    return ( 
        <React.Fragment>
            <video className="video-reponsive" src= {referencias.assets + "video/" + props.cancionActual.id + ".mp4" }  controls autoPlay ></video>
        </React.Fragment>
     );
}
 
export default Flautaoke;