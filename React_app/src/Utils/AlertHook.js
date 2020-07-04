import { useState } from 'react';

const useDisplayAlert = () => {
    const [display_alert, set_alert_status] = useState({
        'display': false,
        'display_msg': '',
        'display_type': 'error'
    }
    )

    const set_dispaly_alert = (status) => {
        console.log(display_alert)
        set_alert_status(
            {...display_alert, ...status}
        )
        console.log(display_alert)
    }

        return [display_alert, set_dispaly_alert];
}

export default useDisplayAlert