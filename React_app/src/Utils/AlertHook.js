import { React, useState } from 'react';
import { Alert } from 'antd';

const useDisplayAlert = () => {
    const [display_alert, set_alert_status] = useState({
        'display': false,
        'display_msg': '',
        'display_type': 'error'
    }
    )

    const set_dispaly_alert = (status) => {
        set_alert_status(
            {...display_alert, ...status}
        )
    }

    return [display_alert, set_dispaly_alert];
}

export default useDisplayAlert