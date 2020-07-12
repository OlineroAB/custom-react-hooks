import { useState, useRef, useEffect, useCallback } from 'react';

const useStateWithCallback = (initialState) => {
  const [state, setState] = useState(initialState);
  const resolverRef = useRef(null);

  useEffect(() => {
    if (resolverRef.current) {
      resolverRef.current(state);
      resolverRef.current = null;
    }
  }, [resolverRef.current, state]);

  const _setState = useCallback((setStateAction, callback) => {
    setState(setStateAction);
    resolverRef.current = callback;
  }, [setState])

  return [state, _setState];
};

export default useStateWithCallback
