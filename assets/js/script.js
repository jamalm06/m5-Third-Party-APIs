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
