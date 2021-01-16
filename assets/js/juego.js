const modulo = (()=>{
  'use strict'

    let deck            = [],
        nuevoDeck       = [],
        puntosJugadores = [];

    const tipos       = ['C','D','H','S'],
          especiales  = ['A', 'J','Q','K'];

    // Variables  para manejo del DOM

    const  btnPedirCartas   = document.querySelector('#btnPedirCartas'),
           btnDetenerJuego  = document.querySelector('#btnDetenerJuego'),
           btnNuevoJuego    = document.querySelector('#btnNuevoJuego'),
           smallPuntos      = document.querySelectorAll('small');

    let  divCartasJugadores = document.querySelectorAll('.divCartas');


//    Inicializacion del juego

      const iniciarJuego = ( numJugadores = 2 )=> {
          console.clear();
          console.warn( 'Ya se inicio el juego' );
            puntosJugadores = [];
            for(let i =0; i < numJugadores; i++ ) {
                    puntosJugadores.push(0);
                  }
                  
                  smallPuntos.forEach(e => e.innerHTML = 0);
                  divCartasJugadores.forEach(e => e.innerHTML = '');
                  
                  
                  btnPedirCartas.disabled = false;
                  btnDetenerJuego.disabled = false;
                  crearCartas();
    
      }

    // Funcion ceadora de las cartas 
   const crearCartas = ()=>{ 
       deck = [];
       nuevoDeck = []
        for (let i = 2; i <= 10; i++) for (const tipo of tipos)     deck.push( `${i}${tipo}` ); 
        for (const tipo of tipos)     for (const esp of especiales) deck.push( `${esp}${tipo}` );    

            for(let i = 0; i < deck.length; i++){
                let  control =  Math.round(Math.random() * 51 );
                    ( nuevoDeck.includes(deck[control]) ) ? i-- : nuevoDeck.push( deck[control] );
                }
                return deck = nuevoDeck;

        }
  
    //Funcion para pedir una carta

    const pedirCarta = () => {
        if(deck.length === 0) throw 'Ya no hay mas cartas';
        return deck.pop( deck );
    }
  
    //Funcion del valor de la carta

    const valorCartas = ( carta ) => {
        const valor = carta.substring(0, carta.length -1);
        return (isNaN( valor ))    ? 
                 ( valor === 'A' ) ?  11: 10
                 :parseInt( valor, 10 );
    }

    //Puntos acumulados de cada jugador

    const puntosAcumulados = ( carta, turno ) =>{
           puntosJugadores[turno] =  puntosJugadores[turno] += valorCartas( carta );
           smallPuntos[turno].innerHTML = puntosJugadores[turno];
           return puntosJugadores[turno]
    }

    //Creacion de cartas en el  HTML

    const crearCartasHTML = ( carta, turno ) => {
        const cartasHTML = document.createElement('img');
            cartasHTML.src = `assets/cartas/${ carta }.png`;
            cartasHTML.classList.add('cartas');
            divCartasJugadores[turno].append( cartasHTML );
         

    }

    //Determinar el jugador  ganador

   const jugadorGanador = () =>{
       const [ puntosMinimos, puntosComputador ] = puntosJugadores;
    setTimeout(()=>{
        if( puntosMinimos === puntosComputador ) alert( 'Nadie gana ):' );
        else if(puntosComputador > 21) alert( 'Has ganado' );
        else alert( 'El computador gana' );
    }, 500);
   }


    // Logica del Computador

    const turnoComputador = ( puntosMinimos ) => {
       let puntosComputador = 0;
        do {
            const carta =  pedirCarta();

            puntosComputador =  puntosAcumulados( carta, puntosJugadores.length  -1 );
            crearCartasHTML( carta, puntosJugadores.length  -1 );
   

        } while ( (puntosComputador < puntosMinimos) && (puntosMinimos <=21) );

        jugadorGanador();
    }



    //Eventos 

    //Pedir cartas
    btnPedirCartas.addEventListener('click', ()=>{
       const carta =  pedirCarta();
       const puntosJugador =  puntosAcumulados( carta, 0 );

       crearCartasHTML( carta, 0 );



        if(puntosJugador > 21) {
            btnPedirCartas.disabled = true;
            btnDetenerJuego.disabled = true;
            console.warn('Has Perdido');

            turnoComputador( puntosJugador );

        }else if(puntosJugador === 21 ){
            btnPedirCartas.disabled = true;
            btnDetenerJuego.disabled = true;
            console.warn('Has ganado');

            turnoComputador( puntosJugador );
        }
        
    });

    //Evento de detener el juego

    btnDetenerJuego.addEventListener('click', ()=>{
        btnPedirCartas.disabled = true;
        btnDetenerJuego.disabled = true;

        turnoComputador( puntosJugadores[0] );
    
    
    });

    //Eventoo NuevoJuego

    btnNuevoJuego.addEventListener('click', ()=>{
        iniciarJuego();

    });


   return iniciarJuego();

})();














