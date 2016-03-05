/**
 * Created by JFCS on 2/26/16.
 */
var employeeArray = [];
var primaryKey = 0;
var randomNum = 0;
var marvelArray=[];
var marvelCharId = 0;
var marvelApiImage = {};
var marvelApiDescription = '';
var marvelName ='';
var results = {};

$(document).ready(function(){
    init();
    enable();

});

function init(){
    for(var i = 0; i < employeeArray.length; i++) {
        marvel(employeeArray[i]);

    }

}

function enable(){
    $('.empContainer').on('click','.delete',deleteEmployee);
    $('.get-random-char').on('click',randomCharacter);
    $('.get-random-comic').on('click',randomComic);
    $('.get-random-series').on('click',randomSeries);
    $('#employee-form').on('submit',processForm);

}

function Employee(firstname, lastname, id , title, salary ) {
    this.firstName = firstname;
    this.lastName = lastname;
    this.employeeId = id;
    this.employeeTitle = title ;
    this.employeeSalary = salary ;

    employeeArray.push(this);
}


function deleteEmployee(){
    $(this).parent().remove();
}


function processForm(event){
    event.preventDefault();

    var values = {};
    $.each($('#employee-form').serializeArray(), function(i,field){
        values[field.name] = field.value;
    });
    console.log(values);
    marvel(values);
    employeeArray.push(values);
    $('#employee-form').find('input[type=text],input[type=number]').val("");
}


//console.log(employeeArray);

///////////
// need to build a back end version of this.
///////////
//function marvel (employee){
//    var name = employee.employeeTitle;
//    $.ajax({
//        type:'GET',
//        url: "http://gateway.marvel.com//v1/public/characters?name="+name+"&",
//        data:
//        {"apikey":apiKey,
//            "ts": apiTs,
//            "hash": apiHash},
//        headers: {   Accept:'*/*' },
//        success: function(response){
//            console.log(response);
//            results = response.data.results;
//            if(results.length > 0) {
//                randomNum = randomNumber(0,results.length -1);
//                marvelApiImage = results[randomNum].thumbnail.path + "/standard_xlarge.jpg";
//                marvelCharId = results[randomNum].id;
//                if(results[randomNum].description.length > 0) {
//                    marvelApiDescription = results[randomNum].description;
//                } else {
//                    marvelApiDescription = "No Back Story Available ";
//                }
//
//            } else {
//                marvelApiImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
//                marvelApiDescription = "No Back Story Available ";
//            }
//            employee.image = marvelApiImage;
//            employee.description = marvelApiDescription;
//            employee.employeeId = marvelCharId;
//            marvelArray.push(response);
//            AppendDom(employee);
//        }
//    });
//
//
//}


//////////////////
// append api callback info to the dom.
/////////////////

function AppendDom(employee) {
    primaryKey++;
    employee.key = primaryKey;
    $('.empContainer').append("<div class='well col-sm-3'></div>");
    $el = $('.empContainer').children().last();
    $el.data('data', employee.key);
    $el.append('<p>Name: ' + employee.firstName + ' ' + employee.lastName + '</p>');
    $el.append('<p>Id #: ' + employee.employeeId + '</p>');
    $el.append('<p>Alias: ' + employee.employeeTitle + '</p>');
    $el.append('<img class="img-responsive img-circle" src=' + employee.image + ' >');
    $el.append('<p>BackStory: ' + employee.description + '</p>');
    $el.append('<button class="btn btn-danger delete"> Remove Employee </button>');
    $el.append('<button class="btn btn-primary moreinfo"> More Info </button>');
}



function AppendDomComic(employee) {
    primaryKey++;
    employee.key = primaryKey;
    $('.empContainer').append("<div class='well col-sm-3'></div>");
    $el = $('.empContainer').children().last();
    $el.data('data', employee.key);
    //$el.append('<p>Name: ' + employee.firstName + ' ' + employee.lastName + '</p>');
    $el.append('<p>Id #: ' + employee.employeeId + '</p>');
    $el.append('<p>Title: ' + employee.employeeTitle + '</p>');
    $el.append('<img class="img-responsive " src=' + employee.image + ' >');
    $el.append('<p>Story: ' + employee.description + '</p>');
    $el.append('<button class="btn btn-danger delete"> Remove Employee </button>');
    //$el.append('<button class="btn btn-primary moreinfo"> More Info </button>');
}

//////////////
// pick a random comic,character or series ajax calls.
////////////
function randomSeries (){
    var employee = {};
    $.ajax({
            type:'GET',
            url:'/series',
        success: function(response){
            console.log(response);
            results = response.data.results;
            if(results.length > 0) {
                randomNum = randomNumber(0,results.length -1);
                marvelApiImage = results[randomNum].thumbnail.path + "/standard_xlarge.jpg";
                marvelCharId = results[randomNum].id;
                marvelName = results[randomNum].title;
                if(results[randomNum].description !== null) {
                    marvelApiDescription = results[randomNum].description;
                } else {
                    marvelApiDescription = "No Back Story Available ";
                }
                console.log(marvelCharId);
            } else {
                marvelApiImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
                marvelApiDescription = "No Back Story Available ";
            }
            employee.employeeTitle = marvelName;
            employee.image = marvelApiImage;
            employee.description = marvelApiDescription;
            employee.employeeId = marvelCharId;
            marvelArray.push(response);
            AppendDomComic(employee);
        }
    });
}

function randomComic (){

    var employee = {};
    $.ajax({
        type:'GET',
        url:'/comic',
        success: function(response){
            console.log(response);
            employeeArray.push(response);
            console.log(employeeArray);
            results = response.data.results;
            if(results.length > 0) {
                randomNum = randomNumber(0,results.length -1);
                marvelApiImage = results[randomNum].thumbnail.path + "/standard_xlarge.jpg";
                marvelCharId = results[randomNum].id;
                marvelName = results[randomNum].title;
                if(results[randomNum].description !== null) {
                    marvelApiDescription = results[randomNum].description;
                } else {
                    marvelApiDescription = "No description Available ";
                }
                console.log(marvelCharId);
            } else {
                marvelApiImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
                marvelApiDescription = "No description Available ";
            }
            employee.employeeTitle = marvelName;
            employee.image = marvelApiImage;
            employee.description = marvelApiDescription;
            employee.employeeId = marvelCharId;
            marvelArray.push(response);
            AppendDomComic(employee);
        }
    });
}

function randomCharacter (){
    var employee = {};
    $.ajax({
        type:'GET',
        url:'/characters',
        success: function(response){
            console.log(response);
            results = response.data.results;
            if(results.length > 0) {
                randomNum = randomNumber(0,results.length -1);
                marvelApiImage = results[randomNum].thumbnail.path + "/standard_xlarge.jpg";
                marvelCharId = results[randomNum].id;
                marvelName = results[randomNum].name;
                if(results[randomNum].description.length > 0) {
                    marvelApiDescription = results[randomNum].description;
                } else {
                    marvelApiDescription = "No Back Story Available ";
                }

            } else {
                marvelApiImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
                marvelApiDescription = "No Back Story Available ";
            }
            employee.employeeTitle = marvelName;
            employee.image = marvelApiImage;
            employee.description = marvelApiDescription;
            employee.employeeId = marvelCharId;
            marvelArray.push(response);
            AppendDom(employee);
        }
    });
}