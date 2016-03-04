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
var apiKey ="";
var apiTs = "";
var apiHash ="";

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

//var deadpool = new Employee('Wade', 'Wilson', 1999, 'Deadpool',55000);
//var ghostRider = new Employee('Johnny','Blaze',1968,"Ghost Rider",24000);
//var doctorStrange = new Employee('Vincent','Strange',1969,"Doctor Strange",360000);
//var spidey = new Employee('Peter','Parker',1967,"Spider-Man",29000);
//var magneto = new Employee('Max','Eisenhardt',1965,"Magneto",240000);
//var cyclops = new Employee('Scott','Summers',1963,"Cyclops",47000);
//var profX = new Employee('Charles','Xavier',1964,"Professor X",65000);
//var beast = new Employee('Hank','Mccoy',1966,"Beast",24000);
//var starLord = new Employee('Peter','Quill',1976,"Star-Lord",24000);
//var hulk = new Employee('Bruce','Banner',1977,"Hulk",214000);
//var ironMan = new Employee('Tony','Stark',1976,"Iron Man",12124000);
//var bob = new Employee('Bob','Agent of Hydra',1986,"Bob, Agent of Hydra",55000);

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


console.log(employeeArray);


function marvel (employee){
    var name = employee.employeeTitle;
    $.ajax({
        type:'GET',
        url: "http://gateway.marvel.com//v1/public/characters?name="+name+"&",
        data:
        {"apikey":apiKey,
            "ts": apiTs,
            "hash": apiHash},
        headers: {   Accept:'*/*' },
        success: function(response){
            console.log(response);
            results = response.data.results;
            if(results.length > 0) {
                randomNum = randomNumber(0,results.length -1);
                marvelApiImage = results[randomNum].thumbnail.path + "/standard_xlarge.jpg";
                marvelCharId = results[randomNum].id;
                if(results[randomNum].description.length > 0) {
                    marvelApiDescription = results[randomNum].description;
                } else {
                    marvelApiDescription = "No Back Story Available ";
                }

            } else {
                marvelApiImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
                marvelApiDescription = "No Back Story Available ";
            }
            employee.image = marvelApiImage;
            employee.description = marvelApiDescription;
            employee.employeeId = marvelCharId;
            marvelArray.push(response);
            AppendDom(employee);
        }
    });


}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);

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
            AppendDom(employee);
        }
    });
}

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

//function randomComic (){
//    var offset = randomNumber(1,36508);
//    var employee = {};
//    $.ajax({
//        type:'GET',
//        url: "http://gateway.marvel.com:80/v1/public/comics?limit=1&offset="+offset+"&",
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
//                marvelName = results[randomNum].title;
//                if(results[randomNum].description !== null) {
//                    marvelApiDescription = results[randomNum].description;
//                } else {
//                    marvelApiDescription = "No description Available ";
//                }
//                console.log(marvelCharId);
//            } else {
//                marvelApiImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
//                marvelApiDescription = "No description Available ";
//            }
//            employee.employeeTitle = marvelName;
//            employee.image = marvelApiImage;
//            employee.description = marvelApiDescription;
//            employee.employeeId = marvelCharId;
//            marvelArray.push(response);
//            AppendDomComic(employee);
//        }
//    });
//}
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

