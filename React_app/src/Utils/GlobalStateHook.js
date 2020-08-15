import { useState, useEffect } from 'react';

const useGlobalState = (init_data) => {
    const global_state_store = "global_state_store"

    const initialize_state = () => {
        var storage_value = localStorage.getItem(global_state_store)
        if (storage_value !== "NaN") {
            const local_storage_value = JSON.parse(storage_value)
            return local_storage_value
        }
        return NaN
    }

    const [global_state, update_state] = useState(
        initialize_state() || init_data)

    useEffect(() => {
        localStorage.setItem(global_state_store, JSON.stringify(global_state));
    }, [global_state_store, global_state]);

    const update_global_state = (status) => {
        const res = { ...global_state, ...status }
        update_state(res)
    }

    return [global_state, update_global_state];
}

export default useGlobalState;