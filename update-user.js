$(document).ready(function(){
	var originaldata = [];
	var changeddata = [];
	var headers = ['Fornavn', "Efternavn", "Adresse", "Stilling", "Ansættelsesdato", "Erfaring", "Firma", "Lon", "Postnummer", "Bydel", "Dato"]

    $(document).on("click", ".edit", function(){ // function der registrer når "edit" knappen bliver trykket og samler data før oplysningerne bliver ændret.

		var input = $(this).parents("tr").find('td');		

		input.each(function(){ 
			originaldata.push($(this)[0].innerHTML);
		});

		originaldata = originaldata.slice(0,11);

		console.log("This is original data: " + originaldata)

        $(this).parents("tr").find("td:not(:last-child)").each(function(){
			$(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
		});		
		$(this).parents("tr").find(".addedit, .edit").toggle();
		$(".add-new").attr("disabled", "disabled");
    });

    $(document).on("click", ".addedit", async function(){ // function der registrer når "addedit" knappen bliver trykket og samler data om informationer om den bestemte row
		var empty = false;
		var input = $(this).parents("tr").find('input[type="text"]');

        input.each(function(){
			changeddata.push($(this).val());

			changeddata = changeddata.slice(0,11);

			if(!$(this).val()){
				$(this).addClass("error");
                alert("Please enter value in the fields!");
				empty = true;
			} else{
                $(this).removeClass("error");
            }
		});

		console.log("This is changed data: " + changeddata)
		$(this).parents("tr").find(".error").first().focus();
		if(!empty){

			var diffrence = getdifference(headers, originaldata, changeddata);

			console.log(diffrence);

			input.each(function(){
				$(this).parent("td").html($(this).val());
			});			
			$(this).parents("tr").find(".addedit, .edit").toggle();
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

function getdifference(headers, originaldata, changeddata){ // function der undersøger om ændringer i data og returnere et resultat.

	try {

		let difference = changeddata.filter(x => !originaldata.includes(x));

		console.log("This is difference: " + difference);

		var index = changeddata.indexOf(difference);

		var headerdata = headers[index];

		return difference, headerdata;

	} catch {
		alert("Please enter all fields before trying")
	}
}

