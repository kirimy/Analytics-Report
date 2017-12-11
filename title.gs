

function getTitle() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var ss = sheet.getSheetByName('title');
  ss.clear();
  var id = "1Hl6Nt23HJzqOj7AUoUGsF_3ziAoYIVPmWYsO9E__1SM";
  var an_sheet = SpreadsheetApp.openById(id);
  var cellNum = an_sheet.getLastRow();
  var url_amount = cellNum-400; //取得数
 
  var mag_ids = an_sheet.getActiveSheet().getRange(67, 1, cellNum).getValues(); //67初期値
 
  var range_url = [];
  var myRegexp = /<title>([\s\S]*?)<\/title>/i;
  
  //C列にURLを書き込み
  var errors = new Array();
  for (var i=0; i<url_amount; i++ ){
    range_url[i] = 'https://www.cchan.tv/mag/'+mag_ids[i][0];
    ss.getRange(i+2,3).setValue(range_url[i]); 
    
    try{
      var response = UrlFetchApp.fetch(range_url[i]);
      Utilities.sleep(50);
      var match = myRegexp.exec(response.getContentText("UTF-8"),{
      method: "PUT",
        contentType: "text/html; charset=utf-8",
        // payload: JSON.stringify(payload),
        muteHttpExceptions: true,
      });
      var title = match[1];
    }catch(e){
      errors.push("Message: " + e.message + "\r\nFile: " + e.fileName + "\r\nLine: " + e.lineNumber + "\r\n");
      for (var i=0; i<errors.length; i++ ){
        Logger.log(errors[i]);
      }
    }
    ss.getRange(ss.getLastRow(), 1).setValue(title); 
  }
}

function test(){
  
  
}


function url() {
 var response = UrlFetchApp.fetch("https://www.cchan.tv/mag/fed1c2721b3c4a6caea507712a30a6a9/")
 var myRegexp = /<title>([\s\S]*?)<\/title>/i;
 var match = myRegexp.exec(response.getContentText("UTF-8"));
 　 var title = match[1];

   title = title.replace(/(^\s+)|(\s+$)/g, "");
 Logger.log(title);
}