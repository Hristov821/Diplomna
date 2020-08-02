import { useHistory } from "react-router"

const useRedirect = () =>{
    const history = useHistory()
  
    function redirect(path, args) {
      history.push(path, args)
    }

    return [history, redirect];
}

export default useRedirect;
