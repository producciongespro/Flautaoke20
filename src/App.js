//Módulos
import React, { Component } from 'react';

//Librerias
import alertify from 'alertifyjs';
import axios from 'axios';

//CSS
import './css/animate.css';
import "./css/master.css";

//Componentes
import { Portada, Inicio, Historia, Mantenimiento, Tecnicas, Digitacion, Simbologia, Encabezado, Footer } from "./components/Estaticos";
import Botones from './components/Botones';
import Modal from './components/Modal';
import Login from './components/Login.jsx';
import Canciones from './components/Canciones';
import MenuGeneral from './components/MenuGeneral';
import Spinner from './components/Spinner/Spinner';

//Componentes - módulos del juego
import InfoCancion from './components/modulosJuegos/InfoCancion';
import HistoriaCancion from './components/modulosJuegos/HistoriaCancion';
import Notas from './components/modulosJuegos/Notas';
import Partitura from './components/modulosJuegos/Partitura';
import Flautaoke from './components/modulosJuegos/Flautaoke';

//Json
import listaBotones from "./data/botones.json";
import referenciasJSON from './data/referencias.json';
const referencias = referenciasJSON[0];
const arrayBtnIzquierdo = listaBotones[0];
const arrayimgBtDerecho = listaBotones[1];



//dataset con canciones de la BD:
var cancionesBD;




class App extends Component {
  constructor() {
    super();
    this.state = {
      componenteActual: <Portada titulo="Portada" />,
      isAccesado: false,
      isModalActivo: false,
      isBotoneraDerechaActiva: false,
      isMenuGeneralActivo: false,
      modalComponent: "",
      typeContent: "",
      ajaxOcupado: false

    }    
    this.arrayBtnIzquierdo = [];
    this.arrayimgBtDerecho = [];
    this.cancionActual = "";
  }



  /* CICLO DE VIDA DE LA APLICACIÓN ************* */
  componentWillMount() {

    //obtener las canciones:
    axios.get(referencias.obtenerCanciones)
      .then(function (response) {
        //console.log(response);
        cancionesBD = response.data;
        //console.log("Canciones:", cancionesBD);

      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("fin obtener canciones");
      });


  }
  /* FIN CICLO DE VIDA DE LA APLICACIÓN --------------------------*/


  /* MANEJADOR DE EVENTOS PARA CARGA DE COMPONENTES ***********  */
  handlerMontarComponentesGenericos = (e) => {
    //this.vista = e.target.dataset.val;
    //console.log("Id botón cliqueado:", e.target.id);

    //cierra el menú general en caso de que esté abierto:
    this.setState({ isMenuGeneralActivo: false });

    switch (e.target.id) {
      case "inicio":
        this.setState({
          componenteActual: <Inicio handlerMostrarCanciones={this.handlerMostrarCanciones} />
        });
        break;
      case "historia":
        this.setState({
          componenteActual: <Historia />
        });
        break;
      case "mantenimiento":
        this.setState({
          componenteActual: <Mantenimiento />
        });
        break;
      case "tecnicas":
        this.setState({
          componenteActual: <Tecnicas />
        });
        break;
      case "digitacion":
        this.setState({
          componenteActual: <Digitacion />
        });
        break;
      case "simbologia":
        this.setState({
          componenteActual: <Simbologia />
        });
        break;

      default:
        console.log("Opción fuera de rango");
        break;
    }


  }

  //Manejador de eventos para los botones de la derecha
  handlerMontarComponentesModulosJuego = (e) => {
    const opcion = e.target.dataset.target;
    console.log("Id botón cliqueado:", opcion);



    if (this.state.isBotoneraDerechaActiva) {
      switch (opcion) {
        case "info":
          this.setState({
            componenteActual: <InfoCancion cancionActual={this.cancionActual} />
          });
          break;
        case "historiaC":
          this.setState({
            componenteActual: <HistoriaCancion texto={this.cancionActual.historia} />
          });
          break;
        case "notas":
          this.setState({
            componenteActual: <Notas cancionActual={this.cancionActual} />
          });
          break;
        case "partituras":
          this.setState({
            componenteActual: <Partitura cancionActual={this.cancionActual} />
          });
          break;
        case "flautaoke":
          this.setState({
            componenteActual: <Flautaoke cancionActual={this.cancionActual} />
          });
          break;

        default:
          console.log("Opción fuera de rango");
          break;
      }

    } else {

      alertify
        .alert(referencias.version, "Debes primero seleccionar una canción.", function () {
          console.log("ok");

        });

    }

  }
  /* FIN MANEJADOR DE EVENTOS PARA CARGA DE COMPONENTES  ------------------*/


  /* MANEJADORES DE EVENTOS GENERALES ***********  */

  //Entrar en session
  handlerLogin = (user, password) => {
    //    console.log("user desde app", user);
    //    console.log("pass desde app", password);   
    const me = this;
    let data = {
      "usuario": user,
      "clave": password
    }
    //console.log("DAta", data ); 
    //console.log("**ref", referencias.login);
    this.setState({ ajaxOcupado: true });

    axios.post(referencias.login, data)
      .then(function (response) {
        //console.log(response.data);
        const mensajeError = response.data.error_msg;
        if (response.data.error === false) {          
          //Almacenamiento en session el objeto usuario          
          sessionStorage.setItem("usuario",  JSON.stringify(response.data)  );                             
          me.setState({
            isAccesado: true
          })          

        } else {
          console.log("Error IF acceso usuario");
          alertify
            .alert(referencias.version, mensajeError, function () {
              document.getElementById("idUser").value = "";
              document.getElementById("txtPwd").value = "";
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        me.setState({
          ajaxOcupado: false
        })
      });

  }

  handlerCerrarSesion = () => {
    alertify.confirm(referencias.version, "¿Realmente desea salir?",
      () => {
        this.setState({
          isAccesado: false,
          isMenuGeneralActivo: false
        })
      },
      function () {
        console.log("accion cancelada");
      });


  }

  handlerMostrarModal = (e) => {
    e.preventDefault();
    const tipo = e.target.dataset.tipo;
    console.log("TIPO ", tipo);


    this.setState({
      isModalActivo: true,
      typeContent: tipo,
      isMenuGeneralActivo: false,
      modalComponent: <Modal handlerCerrarModal={this.handlerCerrarModal} tipo={tipo} />
    });
  }

  handlerCerrarModal = () => {
    this.setState({
      isModalActivo: false
    }, () => {
      console.log("modal activo", this.state.isModalActivo);
    });
  }


  handlerMenuGeneral = () => {
    if (this.state.isMenuGeneralActivo) {
      this.setState({ isMenuGeneralActivo: false });
    } else {
      this.setState({ isMenuGeneralActivo: true });
    }
  }




  handlerMostrarCanciones = (e) => {
    const nivel = e.target.dataset.nivel;
    console.log("Nivel seleccionado", nivel);

    this.setState({
      isModalActivo: true,
      isMenuGeneralActivo: false,
      modalComponent: <Canciones handlerCerrarCanciones={this.handlerCerrarCanciones} handlerSeleccionarCancion={this.handlerSeleccionarCancion} array={cancionesBD} nivel={nivel} />
    });


  }

  handlerCerrarCanciones = () => {
    this.setState({
      isModalActivo: false
    }, () => {
      console.log("isModalActivo:", this.state.isModalActivo);
    });
  }


  handlerSeleccionarCancion = (e) => {
    const opcion = e.target.id;
    console.log("handlerSeleccionarCancion", opcion);
    this.buscarCancionPorId(cancionesBD, opcion);
    this.handlerCerrarCanciones();
    this.setState({
      isBotoneraDerechaActiva: true,
      componenteActual: <InfoCancion cancionActual={this.cancionActual} />
    });

  }

  buscarCancionPorId = (array, id) => {
    const limite = array.length;
    for (let index = 0; index < limite; index++) {
      if (array[index].id === id) {
        this.cancionActual = array[index];
      }
    }


  }

  /* FIN MANEJADORES DE EVENTOS GENERALES -----------------  */




  render() {
    return (
      <div className="App">
        {
          this.state.isAccesado ?
            <React.Fragment>
              <Encabezado handlerMostrarModal={this.handlerMostrarModal} nombreCancion={this.cancionActual.nombre} handlerMenuGeneral={this.handlerMenuGeneral} />

  

              <div className="row">
                <div className="col-2 base-botonera">
                  {
                    arrayBtnIzquierdo.map((item, i) => (
                      <Botones className="menu_izq" key={"btnIzquuierdo" + i} etiqueta={item.etiqueta} tipoBtn="text" idBtn={item.id} onClick={this.handlerMontarComponentesGenericos} />
                    ))
                  }

                </div>
                <div className="col-8 base-visor">                  
                  {this.state.componenteActual}
                </div>
                <div className="col-1 base-botonera-derecha">
                  {
                    arrayimgBtDerecho.map((item, i) => (
                      <Botones key={"btnDerecho" + i} etiqueta={referencias.img + item.nombre} tipoBtn="img" idBtn={item.id} onClick={this.handlerMontarComponentesModulosJuego} />
                    ))
                  }
                </div>
                {
                  this.state.isMenuGeneralActivo && (
                    <MenuGeneral handlerMostrarModal={this.handlerMostrarModal} handlerCerrarSesion={this.handlerCerrarSesion} />
                  )
                }




              </div>

              <Footer />

              {/*  contenedor de Modal    */}
              <div className="contModal row">
                <div className="col-12">
                  {this.state.isModalActivo && this.state.modalComponent}
                </div>
              </div>

            </React.Fragment>
            :
            <React.Fragment>


                {
                //spinner ajax de login
                this.state.ajaxOcupado && (
                  <Spinner />
                )
              }

              <Login mostrarModal={this.handlerMostrarModal} data-tipo="registro" handlerLogin={this.handlerLogin} usuario="usuario" />
              <div className="contModal row">
                <div className="col-12">
                  {this.state.isModalActivo && this.state.modalComponent}
                </div>
              </div>
            </React.Fragment>
        }




      </div>
    );
  }
}

export default App;
