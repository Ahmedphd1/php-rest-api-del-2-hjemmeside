$(document).ready(function(){ 
    $(document).on("click", ".delete",async function(){ // function der registrer når "delete" knappen bliver trykket og sletter en row fra tabellen
		var tdrows = $(this).parents("tr").find('td');

		var addresse = tdrows[2].innerHTML;

		console.log(addresse);

		var myresponse = await postdata("http://localhost/restapi/delete_user.php?address=".concat(addresse)) // api call til rest api der sletter data fra databasen
						 		.then(data => data)
		
		console.log(myresponse.status)
		if (myresponse.status == 404) {
			alert("Error encountered.... Please try again");
		} else {
			alert("User deleted!");
			$(this).parents("tr").remove();
			$(".add-new").removeAttr("disabled");

		}
	});
});

async function postdata(url) { // function der poster data til databasen
	var response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
    	mode: 'cors',
		headers: {
			'Accept': 'application/json'
		}

	}); 

	return response;
}