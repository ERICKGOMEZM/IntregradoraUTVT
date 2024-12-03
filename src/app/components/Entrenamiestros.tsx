// src/components/Entrenamientos.tsx
import React from 'react';

const Entrenamientos = ({ taller }: { taller: string }) => {
  // Aquí puedes agregar lógica para mostrar diferentes entrenamientos dependiendo del taller
  const entrenamientos = taller === 'Voleibol' 
    ? ['Entrenamiento A', 'Entrenamiento B'] 
    : taller === 'voleibol'
    ? ['Entrenamiento C', 'Entrenamiento D'] 
    : ['Entrenamiento E', 'Entrenamiento F'];

  return (
    <div>
      <h2>Entrenamientos del taller de {taller}</h2>
      <ul>
        {entrenamientos.map((entrenamiento, index) => (
          <li key={index}>{entrenamiento}</li>
        ))}
      </ul>
    </div>
  );
};

export default Entrenamientos;
