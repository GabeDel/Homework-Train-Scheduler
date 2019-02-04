

$(document).ready(function() { 
   // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCrFb7Tj7Qz6xdlbRB3QQ79HSMpogCPAlM",
    authDomain: "train-schedule-45797.firebaseapp.com",
    databaseURL: "https://train-schedule-45797.firebaseio.com",
    projectId: "train-schedule-45797",
    storageBucket: "train-schedule-45797.appspot.com",
    messagingSenderId: "905520441921"
  };
  firebase.initializeApp(config);
    
    // Reference the database
    
      var database = firebase.database();
    
      // Initial Values
      var trainName = "";
      var destination  ="";
      var frequency = 0;
      var nextArrival = 0;
      var mntsAway = 0;


    
    // Capture User Button
    
    $("#newTrainForm").on("submit", function(event) {
        event.preventDefault();
    
        // Grab values from text boxes
        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        frequency = $("#frequency").val().trim();
        nextArrival = $("#Arrival").val().trim();
        mntsAway = $("#minutesAway").val().trim();
    
        // Code for handling push
        database.ref().push({
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            nextArrival: Arrival,
            mntsAway: minutesAway,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    
        $("#all-display").append()
          
        
    
        
    
    });
    
    database.ref().on("child_added", function(childSnapshot) {
    
      console.log(childSnapshot.val());
      
      var trainName = (childSnapshot.val().trainName);
      var destination = (childSnapshot.val().destination);
      var frequency = (childSnapshot.val().frequency);
      var nextArrival = (childSnapshot.val().nextArrival);
      var mntsAway = (childSnapshot.val().minutesAway);

      var $row = $('<tr></tr>').appendTo('#all-display');

      $('<td></td>').appendTo($row).text(trainName);
      $('<td></td>').appendTo($row).text(destination);
      $('<td></td>').appendTo($row).text(frequency);
      $('<td></td>').appendTo($row).text(nextArrival)
    //   $('<td></td>').appendTo($row).text(minutesAway)
    });

});
var tFrequency = 3;

// Time is 3:30 AM
var firstTime = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));