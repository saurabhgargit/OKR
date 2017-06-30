var cookies = new String();
var header = 
    {
      "Authorization" : "",
      "Cookie" : cookies
    };
var options =
    {
      "method": "get",
      "contentType" : "application/json",
      "headers" : header
    };

var base_search_url = "https://bigbasket.atlassian.net/rest/api/2/search?";
var maxResults = 1000;
var jiraIssueURL = "https://bigbasket.atlassian.net/browse/";


function jiraLogin() {
  var response = UrlFetchApp.fetch("https://bigbasket.atlassian.net/rest/auth/1/session", options);
  var headers = response.getAllHeaders();
  var cookiesArray = response.getAllHeaders()['Set-Cookie'];
  
  for(var i = 0; i< cookiesArray.length; i++) {
    var cookie = cookiesArray[i];
    cookies = cookies + " , " + cookie;
  }
  Logger.log("Cookies " + cookies);
}

function updateSprintSheetData() {
  jiraLogin();
  var sprintFixVersion = readMetaData()['sprintFixVersion'];
  var query="jql=project=BB AND issuetype not in(subTaskIssueTypes(),Epic) AND fixVersion in ("+sprintFixVersion+") AND status in(\"Deployed to Prod\",Closed) &maxResults="+maxResults;
  var jiraData = fetchQueryData(query);
  updateJiraData(SPRINT_DEPLOYMENT_SHEET_NAME, jiraData);

}

function fetchQueryData(query) {
  var url = base_search_url+encodeURI(query);
  
  var response = UrlFetchApp.fetch(url,options);
  var jsonObject = JSON.parse(response.getContentText());
  var issueCount = jsonObject.total;
  Logger.log("Issue Count " + issueCount);
  var jiraData = new Array();
  
  for(var i = 0; i < issueCount; i++) {
    var fields = jsonObject.issues[i].fields;
    
    var issueType = fields.issuetype.name;
    var issueKey = jsonObject.issues[i].key;
    var issueURL = jiraIssueURL + jsonObject.issues[i].key;
    var issueLink = "=hyperlink(\""+issueURL+"\";\"" + issueKey + "\")";
    var summary = fields.summary;
    var status = fields.status.name;
    var reporter = fields.reporter.displayName;
    var assignee = fields.assignee.displayName;
    var fixedBy = fields.customfield_12000.displayName;
    var rcaAndFixSummary = fields.customfield_11302;
    
    
    //FixVersion
 /*   var fixVersions = fields.fixVersions;

    for(var j=0; j<fixVersions.length; j++) {
      if(fixVersion == "") {
        fixVersion = fixVersions[j].name;
      } else {
        fixVersion = fixVersion + ", " + fixVersions[j].name;
      }
    } */
 

    var issueData = [issueType, issueLink, summary, assignee, reporter, fixedBy, rcaAndFixSummary];
    Logger.log(issueData);
    jiraData.push(issueData);
  }
  return jiraData;
}




function updateJiraData(sheetName, data) { 
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);
  var count = data.length;
  
  for(var i = 0; i < count; i++) {
    var rowData = data[i];
    sheet.appendRow(rowData);
  }
}
