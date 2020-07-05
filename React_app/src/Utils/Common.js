import React from 'react';
import { Alert } from 'antd';

const displayAlert = (display_alert, callback) => {
    if (display_alert.display === true) {
        return (<Alert
            message={display_alert.display_type}
            description={display_alert.display_msg}
            type={display_alert.display_type}
            closable
            onClose={() => { callback({'display': false}) }}
        />)
    }
  }

export default displayAlert