$(document).ready(async function (){
    $('[data-toggle="tooltip"]').tooltip();
    var mylist = JSON.parse(localStorage.getItem("rowdata"));

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
    '</tr>';

    $("table").append(row);	

    var mytablerows = $("table").find("tr").find("td");

    mytablerows.each(function(lenght){
        console.log(lenght);

        $(this)[0].innerText = mylist[lenght];
    });

    var dictinfo = await fetch("http://localhost/restapi/read_alle.php") // api call der henter alle data i databasen og indsætter dem i en dictionary
    .then(res => res.json())

    console.log(dictinfo);

    $(document).on("click", ".back", function(){ // "back" knappen der redirector til en anden html side
        window.location.href = "http://127.0.0.1:5500/table.html";

    });
});