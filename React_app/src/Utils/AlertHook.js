import { React, useState } from 'react';
import { Alert } from 'antd';

const useDisplayAlert = (init_values) => {
    var default_init = {
        'display': false,
        'display_msg': '',
        'display_type': 'error'
    }

    if (init_values) {
        default_init = init_values
    }

    const [display_alert, set_alert_status] = useState(default_init)
    const set_dispaly_alert = (status) => {
        set_alert_status(
            {...display_alert, ...status}
        )
    }

    return [display_alert, set_dispaly_alert];
}

export default useDisplayAlert