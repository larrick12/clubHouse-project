// main.js
	const update = document.querySelector('#id');
	update.addEventListener('click', _=>{
		// send PUT request here
			fetch('/', {
			method: 'put', 
			headers: {'Content-Type': 'application/json'}, 
			body: JSON.stringify({
				name: name,	
			})
		})
		.then(res => {
			if(res.ok) return res.json()
		})
		.then(response => {
			window.location.reload(true)
		})
	})
	const messageDiv = document.querySelector('#id')
	
	
	const deleteButton = document.querySelector('#id');
	
	deleteButton.addEventListener('click', _ => {
  	fetch('/', {
    	method: 'delete',
    	headers: { 'Content-Type': 'application/json' },
    	body: JSON.stringify({
      	name: name
    	})
  	})
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      if (response === 'Nothing to delete') {
        messageDiv.textContent = 'Nothing to delete'
      } else {
        window.location.reload(true)
      }
    })
    .catch(error => console.error(error))
	})
