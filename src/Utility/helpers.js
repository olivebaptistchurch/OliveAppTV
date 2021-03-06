import {useEffect, useRef} from 'react';

// Allows us to update state with a timeout function
// Otherwise, we get an error
export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function callbackFunction() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(callbackFunction, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
