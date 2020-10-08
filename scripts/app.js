var visible = false;
var important = false;
var UI ={}; //INICIALIZADOR DEL OBJETO

var hide="fas fa-eye-slash";
var visi="fas fa-eye";


var taskList = [];

function showDetails(){
    //console.log("btn clicked!!!");
    var vh = "";

    if(!visible){
        vh =  `<i id="eyes" class="${hide}" ></i>`;
        visible=true;
        UI.btnShow.html(vh+" Hide details");
        UI.secForm.removeClass("invisible");
    }
    else{
        vh =  `<i id="eyes" class="${visi}" ></i>`;
        visible=false;
        UI.btnShow.html(vh+" Show details");
        UI.secForm.addClass("invisible");

    }

}

function toogleImportant(){
    if(!important){
        UI.btnImportant.removeClass("far").addClass("fas active");
        //UI.btnImportant.removeClass("btn-light");
        //UI.btnImportant.addClass("btn-danger");       
        important=true;
    }else{
        UI.btnImportant.removeClass("fas active").addClass("far");
        //UI.btnImportant.removeClass("btn-danger");
        //UI.btnImportant.addClass("btn-light").addClass("active");
        important=false;
    }

}

function clearInputs(){
        $(".control").val("");
}

function SaveTask(){


    //alert("ddd");
    //return;

    var Title = UI.txtTitle.val();
    //var Important = UI.btnImportant.val();
    var Date = UI.txtDate.val();
    var Description = UI.txtDescription.val();
    var Alert = UI.txtAlert.val();
    var Location = UI.txtLocation.val();  

    if(!Date){
        $("#alertError").removeClass("hide");
        setTimeout(()=>{$("#alertError").addClass("hide");},3000);
        return;
    }
    
    var task = new Task(Title,important, Date, Description, Alert, Location);

    taskList.push(task);

    //console.log(taskList);

    $.ajax({
        url: 'http://fsdi.azurewebsites.net/api/tasks', 
        type: 'POST',
        data:  JSON.stringify(task),
        contentType: "application/json",
        success: function(response){
            //console.log("Pass:",response);
            displayTask(response);
            UI.boxAlert.removeClass("hide");
            setTimeout(function(){
                UI.boxAlert.addClass("hide");
            },3000);
        },
        error: function(details){
            console.log("error:", details);
        }

    });

    clearInputs();

    //loadTasks();

}

function testGet(){
    $.ajax({
        //http://fsdi.azurewebsites.net/explorer/

        url: 'http://fsdi.azurewebsites.net/api/tasks', 
        type: 'GET',
        success: function(response){
            console.log("Pass:",response);

            var text = ""; 
            response.forEach((dato) =>{
                text+=`<div class="container containerData"> 
                Id:${dato.id} | Title:${dato.title} | Description:${dato.description}
                | Important:${dato.important}  | User:${dato.user} 
                </div>`;
            });

            document.getElementById("listData").innerHTML=text;
            $("#listData").append(text);

        },
        error: function(details){
            console.log("error:", details);
        }

    });
}

function GetbyID(id){
    $.ajax({
        //http://fsdi.azurewebsites.net/explorer/

        url: `http://fsdi.azurewebsites.net/api/tasks/${id}`, 
        type: 'GET',
        success: function(response){

            //console.log(response.dueDate);

            UI.txtAlert.val(response.alertText);
            UI.txtDate.val(response.dueDate);
            UI.txtDescription.val(response.description);
            UI.txtTitle.val(response.title);
            UI.txtLocation.val(response.location);
            
            if(response.important){
                UI.btnImportant.removeClass("far").addClass("fas active");
                important=true;
            }else{
                UI.btnImportant.removeClass("fas active").addClass("far");
                important=false;
            }
        


        },
        error: function(details){
            console.log("error:", details);
        }

    });

}



function displayTask(dato){


    var dueDate = new Date(dato.dueDate);
    var createDate = new Date(dato.createdOn);

    //console.log(dato.important);
    var important="";
    if(dato.important){
        important=`<i class="fas fa-star active"></i>`;
    }else{
        important=`<i class="far fa-star"></i>`;
    }


    var sintax =`<div id="List-${dato.id}" class="container containerData"> 
    <div>
        <i class="far fa-circle check"></i>
    </div>
    <div>
        <h4>${dato.title} </h4>
        <label class="task-title">${dato.description}</label>
    </div>
    <div>   
        <label class="task-title">${dueDate.toLocaleDateString() } </label>
        <label class="task-title">${dato.location}</label>
    </div>
    <div>
        ${important}
    </div>
    </div>`;

     $("#listData").append(sintax);
     $(`#List-${dato.id}`).click(function(){  GetbyID(dato.id) } );



}

function loadTasks(){
    $.ajax({
        //http://fsdi.azurewebsites.net/explorer/

        url: 'http://fsdi.azurewebsites.net/api/tasks', 
        type: 'GET',
        success:  list =>{

            let myTask = list.filter(task => task.user==="Jesus");

            /*let myTask = list.filter((task) => {
                if(task.user==="Jesus")
                {
                    return true;
                }
                else{
                    return false;
                }
            }); */
            
            //var text = ""; 
            myTask.forEach((dato) =>{
                displayTask(dato);
            });

            //document.getElementById("listData").innerHTML=text;
        },
        error: function(details){
            console.log("error:", details);
        }

    });
}

/*
function addEventTasks(){
    $.ajax({
        url: 'http://fsdi.azurewebsites.net/api/tasks', 
        type: 'GET',
        success:  list =>{

            let myTask = list.filter(task => task.user==="Jesus");

            myTask.forEach((dato) =>{
                $(`#List-${dato.id}`).click( GetbyID(dato.id) );
            });
        },
        error: function(details){
            console.log("error:", details);
        }

    });
}*/


function test(id){

    console.log("Modifica"+id);
}



function init(){
    var Title = "this is a main page!!";
    //console.log(Title);


    //Object Literal - Aqui solo trendremos uno y para recrearlo se tiene que repetior el proceso nuevamente.
    UI = {
        btnShow: $("#btnShow"),
        btnImportant: $("#btnImportant"),
        secForm: $("#section-Form"),
        btnSave: $("#btnSave"),
        txtTitle: $("#txtTitle"),
        btnImportant: $("#btnImportant"),
        txtDate: $("#txtDate"),
        txtDescription: $("#txtDescription"),
        txtAlert: $("#txtAlert"),
        txtLocation: $("#txtLocation"),
        boxAlert: $("#alert")
        //containerData: $(".containerData")
    }

    //test(UI);

    //console.log("Modifica", UI);

    //get data from servers

    // hook events
    //$("#btnShow").click( showDetails );
    //$("#btnExclam").click(toogleImportant);
    //UI.containerData.click(  alert($(this).id) );

    UI.btnShow.click(showDetails);
    UI.btnImportant.click(toogleImportant);
    UI.btnSave.click(SaveTask);
    
    //testGet();
    loadTasks();
    //addEventTasks();
    /*
    
        * HTTP Request
        * Http methods (verbs)
        * Http status codes
        * 
        * Http vs https

        
    */
    
    //set the text of an input field
    //$("#txtTitle").val("Jesus Camarena");
}


window.onload = init;

//

/*
    //Object Literal - Aqui solo trendremos uno y para recrearlo se tiene que repetior el proceso nuevamente.
    dog = {name: 'fido'}
 
    //Object constructor
    function Dog(name){
        this.name = name;
    }

    var lola = new Dog('Lola');
    var rosco = new Dog('Rosco');


    es6
    Create class

    class 



 
 */