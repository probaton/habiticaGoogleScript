function scheduleTasks() {
  var rawEvents = CalendarApp.getCalendarsByName("HabiticaReminders")[0].getEventsForDay(new Date());
  var batchEvents = [];
  var taskPoster = new TaskPoster();
  
  rawEvents.forEach(function(event) {
    var parsedNotes = parseNotes(event.getDescription());
    if (parsedNotes["checklist"]) {
      taskPoster.postChecklistTask(event.getTitle(), parsedNotes["taskNotes"], parsedNotes["checklist"]);
    } else {
      batchEvents.push(taskPoster.makeTaskObj(event.getTitle(), parsedNotes["taskNotes"]));
    }
  });
  taskPoster.postTasks(batchEvents);

  if (taskPoster.failList) {
    var errorMessage = "The following tasks and checklist items failed to post:\n" + taskPoster.failList;
    throw new Error(errorMessage);
  }
}
    
function parseNotes(eventNotes) {
  var noteLines = eventNotes.split("\n");
  var checklist = [];
  var taskNotes = "";

  noteLines.forEach(function(noteLine) {
    if (noteLine.indexOf("- ") == 0) {
      checklist.push({ "text": noteLine.slice(2) });
    } else {
      taskNotes += noteLine + "\n";
    }
  });
  return checklist.length > 0 ? { taskNotes: taskNotes, checklist: checklist } : { taskNotes: eventNotes };
}
