$(document).on("click", ".view", function(){ // function der regisrer når "view" knappen bliver trykker og viser data i en ny tabel som en specific bruger
    var input = $(this).parents("tr").find('td');
    var someval = 0
    var list = [];
    
    input.each(function(){
        if (someval <= 9) {
         console.log($(this)[0].innerHTML)
         list.push($(this)[0].innerHTML)
        }
        someval += 1
     });

     localStorage.setItem("rowdata", JSON.stringify(list));

    window.location.href = "http://127.0.0.1:5500/read-one.html"; // redirection til main html side
});