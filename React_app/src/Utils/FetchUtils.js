

const postData = async function post(url = '', data = {}) {
    const hed = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }

    if (data.access_token){
      const authorization = 'Bearer ' + data.access_token;
      hed['Authorization'] = authorization
    }

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: hed,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    }).then(response => Promise.all([response.ok, response.text()])).
      then(data => ({ status: data[0], response: JSON.parse(data[1]) })).
        catch(error => {
      console.log("Error logged");
    })

    return response
}

const getData = async function post(url = '', data = {}) {
    const hed = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }

    if (data.access_token){
      const authorization = 'Bearer ' + data.access_token;
      hed['Authorization'] = authorization
    }
    
    url = url + '?'
    Object.keys(data).forEach(element => {
      url += encodeURIComponent(element) + '=' + encodeURIComponent(data[element]) + '&'
    });
    
    const response = await fetch(url, {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: hed,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then(response => Promise.all([response.ok, response.text()])).
    then(data => ({ status: data[0], response: JSON.parse(data[1]) })).
      catch(error => {
    console.log(error);
  })

  return response
}

export {postData, getData};