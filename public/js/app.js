const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
messageOne = document.querySelector('#message-1');
messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    
    fetch('/weather?address=' + location)
        .then(response => {
            messageOne.textContent = '';
            response.json()
                .then(data => {
                    if(data.error){
                        console.log(data.error);
                        messageOne.textContent = data.error;
                    }
                    else{
                        console.log(data.forecast);
                        messageOne.textContent = data.location;
                        messageTwo.textContent = data.forecast;
                    }
                })
        })
})