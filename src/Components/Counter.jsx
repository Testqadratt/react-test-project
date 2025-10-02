import React from "react";

export const Counter = function() {
    const [conter, setCounter] = React.useState(0);

    function increment() {
        setCounter(conter + 1);
    }
  
     function decrement() {
       setCounter(conter - 1);
     }

    return (
        <div>
            <h1>{conter}</h1>
            <button onClick={increment}>
              increment
            </button>
            <button onClick={decrement}>
              decrement
            </button>
          </div>
    )
}
