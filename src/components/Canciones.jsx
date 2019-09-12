import React from 'react';



const classModalBody = "modal-body "; // Se agrega "modal-body large cuando carga un pdf"
const modalAncho = "modal-dialog"; // clase que contiene el tamaño del modal





const filtrarPorNivel = (array, nivel) => {
  var arrayFiltrado = [];
  for (let index = 0; index < array.length; index++) {
    if (array[index].nivel === nivel) {
      arrayFiltrado.push(array[index]);
    }
  }
  return arrayFiltrado;
}


const Canciones = (props) => {
  const arrayFiltrado = filtrarPorNivel(props.array, props.nivel);
  console.log(arrayFiltrado);




  return (

    <div>
      <div className="modal fade show  element-top" id="modalScreen"   >
        <div className={modalAncho} role="document">
          <div className="modal-content">

            <div className="col-12 text-right">
              <button onClick={props.handlerCerrarCanciones} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>


            <div className="row">
            <div className="col-2">
              <img className="animated-bouncelnLeft img-fluid iconoCancion " src="http://recursos.mep.go.cr/ws_flautaoke/assets/img/inicial.png" alt="CancionesInicales"/>
            </div>
            <div className="col-9 text-center">
              <h3 className="tituNiveles" >Canciones del nivel  {props.nivel}   </h3>
            </div>
            </div>



            <div className={classModalBody} >



              {arrayFiltrado.map((item, i) => (
                <div className="row lista-canciones" key={"cancion" + i}    >                
                    <div className="col-2 text-right">
                       <img src="http://recursos.mep.go.cr/ws_flautaoke/assets/ico/padlock.png" alt="candado" className="img-fluid"/>
                    </div>                 
                    <div className="col-5 text-left ">
                      {item.nombre}
                    </div>
                    <div className="col-2 text-right">
                        <img className="img-fluid" src="http://recursos.mep.go.cr/ws_flautaoke/assets/img/monedas.png" alt="monedas"/>
                    </div>
                    <div className="col-1 text-left">
                        <span className="badge badge-warning"> {item.valor}  </span>
                    </div>
                    <div className="col-2 text-right animated lista-canciones-play">                   
                          <img   id={item.id}  onClick={props.handlerSeleccionarCancion} src="http://recursos.mep.go.cr/ws_flautaoke/assets/ico/music-player-play.png" alt="play" className="img-fluid"/>
                    </div>      
                </div>
              ))

              }
            </div>

            <div className="row">
            <div className="col-9">
           </div>
            <div className="col-2">
              <img className=" animated-bouncelnLeft img-fluid iconoCancion" src="http://recursos.mep.go.cr/ws_flautaoke/assets/img/tres_cuadros.png" alt="decoración"/>
            </div>
            </div>


          </div>
        </div>
      </div>
  

      <div className="modal-backdrop fade show"></div>
            
     


    </div>

  );
}

export default Canciones;


