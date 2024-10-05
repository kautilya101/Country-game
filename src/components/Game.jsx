import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import '../App.css';
import classNames from 'classnames';



const Game = ({data}) => {
  const [places,setPlaces] = useState([])
  const [selectedPlaces, setSelectedPlaces] = useState([])
  const [correctPlaces, setCorrectPlaces] = useState([]);
  const [matched, setMatched] = useState(new Set);

  useEffect(() => {
    const newArr = Object.entries(data).flat();
    setPlaces(_.shuffle(newArr));
  },[])

  const handleOnClick = (e) =>{
    const value = e.target.getAttribute('data-value');
    const newSelectedPlaces = selectedPlaces.concat(value);

    if(newSelectedPlaces.length === 2){
      const [first,second] = newSelectedPlaces; 
      if(data[first] == second || data[second] == first){
        setCorrectPlaces(newSelectedPlaces);
        setTimeout( function reset() {
          setMatched(new Set([...matched,...newSelectedPlaces]));
          setCorrectPlaces([])
          setSelectedPlaces([]);
        },1000)
      }
      else{
        setSelectedPlaces(newSelectedPlaces)
        setTimeout(function reset(){
          setSelectedPlaces([]);
        },1000)
      }
    }else{
      setSelectedPlaces(newSelectedPlaces)
    }
  }

  if(matched.size === places.length){
    return(
      <div className='game-board'>
        <h1 className='game-board-message'>
        Congratulations!
        </h1>
      </div>
    )
  }

  return (
    <div className='game-board'>
      { places.map((place) => {
          if(matched.has(place)){
            return null;
          }
        const isSelected = selectedPlaces.includes(place) || correctPlaces.includes(place) ;
        const isCorrect = correctPlaces.includes(place); // using boolean for each place to apply class
        const isIncorrect = selectedPlaces.length === 2 && isSelected && !isCorrect;
        return(
          <button 
            className={classNames(
              'place',
              isSelected && 'placeSelected',
              isIncorrect && 'incorrectMatch',
              isCorrect && 'correctMatch'
              )}
            key={place}
            onClick={handleOnClick}
            data-value={place}
          > 
          {place} 
          </button>
          )
      })}
    </div>
  );
}

export default Game;
