import React from 'react';
import referenciasJSON from '../../data/referencias.json';
const referencias = referenciasJSON[0];

const InfoCancion = (props) => {
   
    return ( 
        <React.Fragment>
         
           {/*{ comentario en react               
                <img className="img-flotante" src={urlImg} alt="canción"  />                
            }*/}
			
			<div className="container img-fluid  cont-info-cancion">

				<div className="row">
					<div className="col-2">	
					<img className="ico-infocanc" src={referencias.img+"niv_inicial.png"} alt="logoInicial"/>				
					</div>
					<div className="col-10">									
					</div>
				</div>

					<div className="row">
					<div className="col-2"> </div>	
							<div className="col-8 ">
							<img className="ico-infocanc2 animated zoomInDown" src={referencias.img+"nivel_principal.png"} alt="FondoCanciones"/>
								<h3 className="text-cancion" >{props.cancionActual.nombre}</h3>
								<h5 className="text-cancion2">{props.cancionActual.ritmo}	</h5>  	
							</div>
						<div className="col-2"> </div>
					</div>
					<br />

				<div className="row">
					<div className="col-10">						
					</div>
					<div className="col-2  ">
					<img className="ico-infocanc3"  src={referencias.img+"nivel_secundaria.png"} alt="FondoCanciones"/>							
					</div>
				</div>

				<div className="row">
					<div className="col-12">
						{
							
						}
					</div>
				</div>

				<div className="row">
					<audio src={referencias.assets + "audio/" + props.cancionActual.id + ".mp3" } controls preload="true" autoPlay  ></audio>
				</div>	

					
			</div>
            

        </React.Fragment>

     );
}
 
export default InfoCancion;