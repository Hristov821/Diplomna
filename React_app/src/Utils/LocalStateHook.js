import { useState } from 'react';

const useLocalState = (init_data) => {
    const [local_state, set_local_state] = useState(init_data)
    
    const update_local_state = (status) => {
        const res = {...local_state, ...status}
        set_local_state(res)
    }

    return [local_state, update_local_state];
}
export default useLocalState;