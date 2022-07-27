/* An alternateive to React's useState.
Use only when component require multiple states (> 5) or when state require deep nested items*/

import { useReducer } from "react";

export function useStateReducer(reducer, initState) {
    const [state, dispatch] = useReducer(reducer, initState);
    return [state, dispatch];
}