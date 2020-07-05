const postData = async function post(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
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

export default postData;