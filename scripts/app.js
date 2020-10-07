function testGet(){
    $.ajax({
        //http://fsdi.azurewebsites.net/explorer/

        url: 'https://localhost:44319/usuarios', 
        //contentType: 'json',
        type: 'GET',
        success: function(response){

            var array = JSON.parse(response);

            //document.getElementById("listData").innerHTML=response;
            
            var text = ""; 
            array.forEach((dato) =>{
                //console.log(dato.ID);

                text+=`<div class="container containerData">Id:${dato.ID} | Title:${dato.NOMBRE} | Description:${dato.DESCR}
                </div>`;
            });
            document.getElementById("listData").innerHTML=text;
            
        },
        error: function(details){
            console.log("error:", details);
        }

    });
}


testGet();
