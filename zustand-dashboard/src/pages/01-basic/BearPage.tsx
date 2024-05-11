import { useShallow } from 'zustand/react/shallow';
import { WhiteCard } from '../../components';
import { useBearStore } from '../../stores';

export const BearPage = () => {
  
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

        <BlackBear />

        <PolarBear />

        <PandaBear />
        
        <BearDisplay />
      </div>

    </>
  );
  
};

export const BlackBear = () => {
  const blackBears = useBearStore( state => state.blackBears );
  const increaseBlackBear = useBearStore( state => state.increaseBlackBear );

  return (
    <WhiteCard centered>
        <h2>Osos Negros</h2>

        <div className="flex flex-col md:flex-row">
          <button onClick={ ()=> increaseBlackBear(+1)}> +1</button>
          <span className="text-3xl mx-2 lg:mx-10"> { blackBears } </span>
          <button onClick={ ()=> increaseBlackBear(-1)}> -1</button>
        </div>

      </WhiteCard>
  );
};

export const PolarBear = () => {
  const polarBear = useBearStore( state => state.polarBears );
  const increasePolarBear = useBearStore( state => state.increasePolarBear );

  return(
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={ ()=> increasePolarBear(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> { polarBear } </span>
        <button onClick={ ()=> increasePolarBear(-1)}> -1</button>

      </div>

    </WhiteCard>
  )
  
}

export const PandaBear = () => {
  const pandaBear = useBearStore( state => state.pandaBears );
  const increasePandaBear = useBearStore( state => state.increasePandaBear );

  return(
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={ ()=> increasePandaBear(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {pandaBear} </span>
        <button onClick={ ()=> increasePandaBear(-1)}> -1</button>
      </div>

    </WhiteCard>
  )
  
}

export const BearDisplay = () => {
  const bears = useBearStore( useShallow( state => state.bears ) );
  //El useShallow se encarga de analizar las partes del objeto y confirmar si realmente cambiaron sino cmabian nohace nada si hace algo si renderiza
  const doNothing = useBearStore( state => state.doNothing );
  const addBear = useBearStore( state => state.addBear );
  const clearBear = useBearStore( state => state.clearBear );

  return (
    <WhiteCard>
      <h1>Osos</h1>
      <button onClick={ doNothing }>Do Nothing</button>
      <button onClick={ addBear } className='mt-2'>Agregar Oso</button>
      <button onClick={ clearBear } className='mt-2'>Eliminar osos</button>

      <pre>
        { JSON.stringify(bears, null, 2)}
      </pre>
    </WhiteCard>
  )
}
