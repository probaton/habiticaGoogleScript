function buffAfterCron() {
  var userData = getHabApi("/export/userdata.json");
  var chat = getHabApi("/api/v3/groups/party/chat")["data"];
  if (!chat || !userData) {
      Logger.log("Failed to cast buff because preliminary API call failed.");
      return;
  }
  var cron = new Date(userData.lastCron).getTime();
  
  chat.some(function(message) {
    var castText = "`Probaton casts Protective Aura for the party.`";
    if (message.timestamp > cron) {
      if (message.text === castText) { return true; }
    } else { 
      useSkill("protectAura");
      return true; 
    }
  });
}

function useSkill(skill, habitId) {
  console.log(skill, habitId);
  var endpoint = "/api/v3/user/class/cast/" + skill;
  endpoint += habitId ? "?targetId=" + habitId : "";
  postHabApi(endpoint);
}
