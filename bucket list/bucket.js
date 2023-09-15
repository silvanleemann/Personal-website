

const endpointUrl = 'https://eouzawi9p4m6dfc.m.pipedream.net';
const options = {
    url: endpointUrl,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

fetch(endpointUrl, options)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
    })
    .catch(error => console.log(error));


