$(document).ready(async function (){
    $('[data-toggle="tooltip"]').tooltip();

    var dictinfo = await fetch("http://localhost/restapi/read_alle.php") // henter data fra rest api
    .then(res => res.json())

    console.log(dictinfo[0]['Fornavn']);

    for (i = 0; i <= dictinfo.length - 1; i++) { // opretter rows i tabellen

        var row = '<tr>' +
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
        '<td style="overflow: hidden; white-space: nowrap;">' +
        '<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
        '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
        '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>' +
        '<a class="view" title="View" data-toggle="tooltip"><i class="material-icons">&#xe8f4;</i></a>' +
        '<a class="addedit" title="Addedit" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
        '</td>' +
        '</tr>';
    
        $("table").append(row);
    }

    var infolist = appendtolist(dictinfo);

    var input = $("table").find("tr").find('input[type="text"]');

    console.log(dictinfo[1])

        for (var i = 0; i <= infolist.length; i++) {
                input.each(function(lenght) {
                    $(this).parent("td").html(infolist[lenght]);
                });
        }
});


function appendtolist(dict) { // ligger data i en liste
    var mylist = [];

    for (var i = 0; i <= dict.length - 1; i++) {
        
        mylist.push(dict[i]['Fornavn']);
        mylist.push(dict[i]['Efternavn']);
        mylist.push(dict[i]['Adresse']);
        mylist.push(dict[i]['Stilling']);
        mylist.push(dict[i]['Ansettelsesdato']);
        mylist.push(dict[i]['Erfaring']);
        mylist.push(dict[i]['Firma']);
        mylist.push(dict[i]['Lon']);
        mylist.push(dict[i]['Postnummer']);
        mylist.push(dict[i]['Bydel']);
        mylist.push(dict[i]['Dato']);
        
    }
    return mylist
}