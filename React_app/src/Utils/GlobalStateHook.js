import { useState } from 'react';

const useGlobalState = (init_data) => {
    const [global_state, update_state] = useState(init_data)
    
    const update_global_state = (status) => {
        const res = {...global_state, ...status}
        update_state(res)
    }
    console.log(global_state)

    return [global_state, update_global_state];
}
  
export default useGlobalState;