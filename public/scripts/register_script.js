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
        const json = await result.json();
        if(!result.ok){
            console.log(json.message)
            let p = document.getElementById('message');
            if(!p){
                p.document.createElement('p');
                p.innerHTML = json.message;
                document.getElementById('login-box').appendChild(p);
            }
            p.innerHTML = json.message;
            // throw new Error('Network response was not OK. (abhinav messsage)');
        }
    }
    catch(err){
        console.error('Error: ', err);
    }
}
addEventListener('signup-button', signUpButton);

function signUpButton(event){
    event.preventDefault();
    

}
