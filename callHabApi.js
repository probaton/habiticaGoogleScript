function getHabReqOpts(method) {
  return {
    "method" : method,
    "headers" : {
      "x-api-user": "6d7d6651-604d-4e7c-adff-a040770a6768", 
      "x-api-key": "1017eb7e-d662-4b12-ba8f-9ab9ab09ca59",
    },
    "muteHttpExceptions": true
  };
}
  
// Calls the Habitica API with the requested endpoint and options. Returns the 
// response data if the call is successful or NULL if it is not. 
function callHabApi(endpoint, opts) {  
  var apiUrl = "https://habitica.com" + endpoint;
  var response = UrlFetchApp.fetch(apiUrl, opts);
  if (response) {
    var statusCode = response.getResponseCode();
    if (statusCode != 200 && statusCode != 201) {
      Logger.log("Request failed\nURL: " + apiUrl
                  + "\nStatus code: " + statusCode
                  + "\nMessage: " + response.getContentText()
                );
      return null;
    }
    return JSON.parse(response);
  } else {
    Logger.log("Habitica request did not receive a reponse");
    return null;
  }
}

function getHabApi(endpoint) {
  return callHabApi(endpoint, getHabReqOpts("get"));
}

function postHabApi(endpoint, data) {
  var opts = getHabReqOpts("post");
  if (data) {
    opts["contentType"] = "application/json";
    opts["payload"] = JSON.stringify(data);
  }

  return callHabApi(endpoint, opts);
}
