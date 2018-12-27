var TaskPoster = function() {
  this.failList = "";
  self = this;
  
  this.postChecklistTask = function(task, notes, checklist) {
    var taskObj = self.makeTaskObj(task, notes)
    var taskId = self.postTasks([taskObj]);
    checklist.forEach(function(item) {
      var postChecklistResult = postHabApi("/api/v3/tasks/" + taskId + "/checklist", item);
      if (!postChecklistResult) { 
        self.addToFailList(item["text"]); 
      }
    });
  }
  
  this.postTasks = function(tasks) {
    var postResult = postHabApi("/api/v3/tasks/user", tasks);
    if (postResult) {
      return postResult["data"]["id"];
    } else {
      tasks.forEach(function(task) {
        self.addToFailList(task["text"]);
      });
      return null;
    }
  }
  
  this.makeTaskObj = function(text, notes) {
    return {
          "text": text, 
          "type": "todo",
          "priority": "1.5",
          "notes": notes,
          "collapseChecklist": true,    
        }
  }

  this.addToFailList = function(fail) {
    self.failList += "<" + fail + ">\n";
  }
}
