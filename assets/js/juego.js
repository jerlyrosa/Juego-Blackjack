let deck         = [];
const tipos      = ['C','D','H','S'];
let nuevoDeck    = [];
const especiales = ['A', 'J','Q','K'];

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
    for(let i = 0; i < deck.length; i++){
        control =  Math.round(Math.random() * 51 );
          ( nuevoDeck.includes(deck[control]) ) ? 
          i-- : nuevoDeck.push( deck[control] ) ;
      }
      return nuevoDeck

}

console.log( crearDeck() );

//Funcion para pedir una carta

const pedirCarta = (cartas) => {
    if(nuevoDeck.length === 0) throw 'Ya no hay mas cartas';
    let carta = nuevoDeck.pop( [Math.round(Math.random() * cartas.length)] );
    return carta
}

console.log( pedirCarta( nuevoDeck ) );




//  Funcion creadora del nuevo arreglo de las cartas mezcladas(Barajadas)
// const mezclarCartas = () =>{
//     for(let i = 0; i < deck.length; i++){
//       control =  Math.round(Math.random() * 51 );
//         ( nuevoDeck.includes(deck[control]) ) ? 
//         i-- : nuevoDeck.push( deck[control] ) ;
//     }
//     return nuevoDeck
// }

// console.log(  mezclarCartas()  );

