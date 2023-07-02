// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  
  $(function() {
    var savedEvents = {}; // Initialize savedEvents variable
  
    function displayCurrentDate() {
      var today = dayjs();
      var dayNumber = today.date();
      var daySuffix;
  
      if (dayNumber >= 11 && dayNumber <= 13) {
        daySuffix = "th";
      } else if (dayNumber % 10 === 1) {
        daySuffix = "st";
      } else if (dayNumber % 10 === 2) {
        daySuffix = "nd";
      } else if (dayNumber % 10 === 3) {
        daySuffix = "rd";
      } else {
        daySuffix = "th";
      }
  
      var formattedDate = today.format("dddd, MMMM ") + dayNumber + daySuffix;
      $("#currentDay").text(formattedDate);
    }
  
    function applyTimeBlockClasses() {
      var currentHour = dayjs().format("H");
      $(".time-block").each(function() {
        var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
        $(this).removeClass("past present future");
        if (timeBlockHour < currentHour) {
          $(this).addClass("past");
        } else if (timeBlockHour == currentHour) {
          $(this).addClass("present");
        } else {
          $(this).addClass("future");
        }
      });
    }
  
    function saveEvent() {
      var timeBlockId = $(this).parent().attr("id");
      var description = $(this).siblings(".description").val();
      savedEvents[timeBlockId] = description;
      localStorage.setItem(timeBlockId, description);
    }
  
    function retrieveSavedEvents() {
      $(".time-block").each(function() {
        var timeBlockId = $(this).attr("id");
        var description = localStorage.getItem(timeBlockId);
        if (description) {
          savedEvents[timeBlockId] = description;
          $(this).find(".description").val(description);
        }
      });
    }
  
    displayCurrentDate();
    applyTimeBlockClasses();
    retrieveSavedEvents();
  
    $(".saveBtn").on("click", saveEvent);
  });
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
