import { useHistory } from "react-router"

const useRedirect = () =>{
    const history = useHistory()
  
    function redirect(path) {
      history.push(path)
    }

    return [history, redirect];
}

export default useRedirect;
