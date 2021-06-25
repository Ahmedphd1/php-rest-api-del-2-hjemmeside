$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
	// Append table with add row form on add new button click
    $(".add-new").click(function(){ // function der opretter ny row i tabellen når "add-new" knappen bliver trykker
		$(this).attr("disabled", "disabled");
		var index = $("table tbody tr:last-child").index();

        var row = '<tr>' + // html elementer
        '<td style="overflow: hidden; white-space: nowrap;"><input type="text" class="form-control" name="fornavn" id="fornavn"></td>' +
        '<td style="overflow: hidden; white-space: nowrap;"><input type="text" class="form-control" name="efternavn" id="efternavn"></td>' +
        '<td style="overflow: hidden; white-space: nowrap;"><input type="text" class="form-control" name="adresse" id="adresse"></td>' +
        '<td style="overflow: hidden; white-space: nowrap;"><input type="text" class="form-control" name="stilling" id="stilling"></td>' +
        '<td style="overflow: hidden; white-space: nowrap;"><input type="text" class="form-control" name="ansættelsesdato" id="ansættelsesdato"></td>' +
        '<td style="overflow: hidden; white-space: nowrap;"><input type="text" class="form-control" name="erfaring" id="erfaring"></td>' +
        '<td style="overflow: hidden; white-space: nowrap;"><input type="text" class="form-control" name="firma" id="firma"></td>' +
        '<td style="overflow: hidden; white-space: nowrap;"><input type="text" class="form-control" name="lon" id="lon"></td>' +
        '<td style="overflow: hidden; white-space: nowrap;"><input type="text" class="form-control" name="postnummer" id="postnummer"></td>' +
        '<td style="overflow: hidden; white-space: nowrap;"><input type="text" class="form-control" name="by" id="by"></td>' +
        '<td style="overflow: hidden; white-space: nowrap;"><input type="text" class="form-control" name="dato" id="dato"></td>' +
		'<td>' +
        '<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
        '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
        '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>' +
        '<a class="view" title="View" data-toggle="tooltip"><i class="material-icons">&#xe8f4;</i></a>' +
		'<a class="addedit" title="Addedit" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
		'</td>' +
        '</tr>';

    	$("table").append(row);		
		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });

	$(document).on("click", ".add", async function(){ // function der henter data og indsætter dem i en ny row
		var empty = false;
		var input = $(this).parents("tr").find('input[type="text"]');
		var infolist = [];

		console.log(input);
        input.each(function(){
            console.log($(this).val())
			infolist.push($(this).val())
			if(!$(this).val()){
				$(this).addClass("error");
                alert("Please enter value in the fields!");
				empty = true;
			} else{
                $(this).removeClass("error");
            }
		});

		// api call der poster data til databasen og opretter en ny bruger
		var myresponse = await postdata(`http://localhost/restapi/create_user.php?fornavn=${infolist[0]}&efternavn=${infolist[1]}&postnummer=${infolist[8]}&bydel=${infolist[9]}&stilling=${infolist[3]}&erfaring=${infolist[5]}&firma=${infolist[6]}&løn=${infolist[7]}&adresse=${infolist[2]}`)
		.then(data => data)

		$(this).parents("tr").find(".error").first().focus();
		
		if (myresponse.status == 404) {
			alert("Cannot create user. Please try again");
		} else {

			if(!empty){
				input.each(function(){
					$(this).parent("td").html($(this).val());
				});
	
				$(this).parents("tr").find(".add, .edit").toggle();
				$(".add-new").removeAttr("disabled");
			}
		}
    });
});

async function postdata(url) { // function der poster data
	var response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
    	mode: 'cors',
		headers: {
			'Accept': 'application/json'
		}

	}); 

	return response;
}
