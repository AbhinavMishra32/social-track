const form = document.getElementById('login-form');
form.addEventListener('submit', loginUser);

async function loginUser(event){
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = {username, password}
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    try{
        const result = await fetch('/api/register', options);
        if(!result.ok){
            throw new Error('Network response was not OK. (abhinav messsage)');
            console.log(json.message)
        }
        const json = await result.json();
        // console.log(json.status);
        console.log(json.message)
    }
    catch(err){
        console.error('Error: ', err);
    }
}