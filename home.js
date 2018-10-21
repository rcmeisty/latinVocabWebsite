// Initialize Firebase

  var config = {
    apiKey: "AIzaSyDU114NM8FKQKWsEd3DgmWSzYPwfgoE3vI",
    authDomain: "latincurriculumstages.firebaseapp.com",
    databaseURL: "https://latincurriculumstages.firebaseio.com",
    projectId: "latincurriculumstages",
    storageBucket: "latincurriculumstages.appspot.com",
    messagingSenderId: "502105521656"
  };
  firebase.initializeApp(config);


var dbReference = firebase.database().ref();
dbReference.on("value", gotTerms);
var clickTerms =3;
var allTerms;
function gotTerms(results){
  allTerms = results.val();
  console.log(allTerms);
  return allTerms;
}
var searchText;
var refWordE;
var refWordL;
var termsToWrite = "";
var searchTextLength;
$("#search").keyup(function(){
  refWordE = "";
  refWordL = "";
  searchText= "";
  searchText = $("#search").val();
  var addToPrint = "<tr></tr>";
  console.log(searchText.toLowerCase());
  var i;
  searchTextLength = searchText.length;
  if(searchText==""){
    $("#wordsInsert").html("<tr></tr>");
  } else{
  for(i=0;i<allTerms.length;i++){
    refWordE = allTerms[i].englishWord;
    refWordE = refWordE.substr(0,searchTextLength);
    refWordL = allTerms[i].latinWord;
    refWordL = refWordL.substr(0,searchTextLength);
    if(refWordE==searchText){
      addToPrint = addToPrint + "<tr><td>"+allTerms[i].englishWord+"</td><td>"+allTerms[i].latinWord+"<tr><td>"+allTerms[i].stageNumber+"</td><td>"+"</td></tr>";
    }else if(refWordL==searchText){
      addToPrint = addToPrint + "<tr><td>"+allTerms[i].englishWord+"</td><td>"+allTerms[i].latinWord+"<tr><td>"+allTerms[i].stageNumber+"</td><td>"+"</td></tr>";
    } else if(searchText==""){
      $("#wordsInsert").html("<tr></tr>");
      break;
   }
  }
    $("#wordsInsert").html(addToPrint);
 }
});
$("#seeAllTerms").click(function(){
  var allTermsToPrint = "";
  clickTerms = clickTerms + 1;
  if (clickTerms % 2 == 0){
  $("#wordsInsert").html(allTermsToPrint);
  var t;
  for(t=0;t<allTerms.length;t++){
    allTermsToPrint = allTermsToPrint + "<tr><td>" + allTerms[t].englishWord + "</td><td>" + allTerms[t].latinWord +"<tr><td>"+allTerms[i].stageNumber+"</td><td>"+ "</td></tr>";
  }
  $("#wordsInsert").html(allTermsToPrint);
  $("#seeAllTerms").html("Hide Terms in Database");
  }else {
    $("#seeAllTerms").html("See all Terms in Database");
    allTermsToPrint = "";
    $("#wordsInsert").html(allTermsToPrint);
  }
})
var showing = 1;
function showFunction(){
  if(showing===0){
    $("#addTermDiv").hide();
    showing=1;
  }else{
    $("#addTermDiv").show();
    showing=0;
  }
}
$("#addTermDiv").hide();
$("#addTermDivButton").click(function(){
  showFunction();
});

var latinTermInput;
var englishTermInput;
var stageNumberInput;

$("#addTerm").click(function(){
  latinTermInput = $("#latinTermInput").val();
  englishTermInput = $("#englishTermInput").val();
  stageNumberInput = $("#stageNumberInput").val();
  firebase.database().ref('/'+allTerms.length).set({
    englishWord: englishTermInput,
    latinWord: latinTermInput,
    stageNumber: stageNumberInput
  });
  $("#englishTermInput").val('');
  $("#latinTermInput").val('')
})
