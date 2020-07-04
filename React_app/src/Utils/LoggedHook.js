import { useState } from 'react';

const useUserIsLogged = () => {
    const [is_logged, set_user_status] = useState(false)
    
    const set_logged_in_status = (status) => {
      set_user_status(status)
    }
    return [is_logged, set_logged_in_status];
}
  
export default useUserIsLogged;