(()=>{
  'use strict'

    let deck          = [];
    const tipos       = ['C','D','H','S'];
    let nuevoDeck     = [];
    const especiales  = ['A', 'J','Q','K'];
    let puntosJugador = 0;
    let puntosComputador = 0;

    // Variables  para manejo del DOM

    const  btnPedirCartas  = document.querySelector('#btnPedirCartas');
    const  btnDetenerJuego = document.querySelector('#btnDetenerJuego');
    const  btnNuevoJuego   = document.querySelector('#btnNuevoJuego');

    const cartasJugador    = document.querySelector('#jugador-cartas');
    const cartasComputador = document.querySelector('#conputador-cartas');
    const smallPuntos      = document.querySelectorAll('small');

    // console.log( cartasHTML );



    // Funcion ceadora de las cartas 
    const crearDeck = () => {
        for(let i = 2; i <= 10; i++){
            for (const tipo of tipos) {
                deck.push( `${i}${tipo}` );
            }
        }
        for (const tipo of tipos) {
            for (const esp of especiales) {
                deck.push( `${esp}${tipo}` );
            }       
        }
        return deck

    }

    crearDeck();

    const mezclarCartas = () =>{
        for(let i = 0; i < deck.length; i++){
       let control =  Math.round(Math.random() * 51 );
            ( nuevoDeck.includes(deck[control]) ) ? 
            i-- : nuevoDeck.push( deck[control] ) ;
        }
        return nuevoDeck
    }

    mezclarCartas()  

    //Funcion para pedir una carta

    const pedirCarta = () => {
        if(nuevoDeck.length === 0) throw 'Ya no hay mas cartas';
        return nuevoDeck.pop( nuevoDeck );
        
    }


    //Funcion del valor de la carta

    const valorCartas = ( carta ) => {
        const valor = carta.substring(0, carta.length -1);
        return (isNaN( valor ))  ? ( valor === 'A' ) ?  11: 10
                                :parseInt( valor, 10 );
    }


    valorCartas( pedirCarta());

    // Logica del Computador

    const turnoComputador = ( puntosMinimos ) => {

        do {
            const carta =  pedirCarta();

            puntosComputador += valorCartas( carta );
            smallPuntos[1].innerHTML = puntosComputador;
        
            const cartasHTML = document.createElement('img');
            cartasHTML.src = `assets/cartas/${ carta }.png`;
            cartasHTML.classList.add('cartas');
            cartasComputador.append( cartasHTML );

            if(puntosMinimos > 21) break;

        } while ( (puntosComputador < puntosMinimos) && (puntosMinimos <=21) );

    setTimeout(()=>{
        if( puntosMinimos === puntosComputador ) alert( 'Nadie gana ):' );
        else if(puntosComputador > 21) alert( 'Has ganado' );
        else alert( 'El computador gana' );
    }, 500);
    }



    //Eventos 

    //Pedir cartas
    btnPedirCartas.addEventListener('click', ()=>{
        const carta =  pedirCarta();

        puntosJugador += valorCartas( carta );
        smallPuntos[0].innerHTML = puntosJugador;

        const cartasHTML = document.createElement('img');
        cartasHTML.src = `assets/cartas/${ carta }.png`;
        cartasHTML.classList.add('cartas');
        cartasJugador.append( cartasHTML );

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
        turnoComputador( puntosJugador );
    
    
    });

    //Eventoo NuevoJuego

    btnNuevoJuego.addEventListener('click', ()=>{
        console.clear();
        nuevoDeck =[];
        puntosJugador    = 0;
        puntosComputador = 0;
        smallPuntos[0].innerHTML   = 0;
        smallPuntos[1].innerHTML   = 0;
        cartasJugador.innerHTML = '';
        cartasComputador.innerHTML = '';
        btnPedirCartas.disabled = false;
        btnDetenerJuego.disabled = false;
        mezclarCartas();


    })

})();














