var sheet = SpreadsheetApp.getActiveSpreadsheet();

function getSession() {
  var date = new Date();
  var ss = sheet.getSheetByName('session');
  
  ss.activate();
  
  var id = "1Hl6Nt23HJzqOj7AUoUGsF_3ziAoYIVPmWYsO9E__1SM";
  var an_sheet = SpreadsheetApp.openById(id);
  var cellNum = an_sheet.getLastRow();
  var url_amount = cellNum-150; //取得数
  

  var mag_url = [];
  for (var i=0; i<cellNum ; i++){ //67は初期値
    var cell = i+67;
   mag_url[i] = an_sheet.getRange("A"+ String(cell)).getValue();//URLを順にぶち込む。
  }
  
   var Filters = [];
   for (var i=0; i<url_amount; i++){
   Filters[i] = 'ga:pagePath=~/mag/' + mag_url[i];
   Filters[i].trim();
  }
  
  //C列に書き込み。
  for (var i=0; i<url_amount; i++ ){
    ss.getRange(i+2,3).setValue('https://www.cchan.tv/mag/'+mag_url[i]);
  } 
  
 Logger.log(Filters[0]);  
}

function analytics_30days(){
  var ss = sheet.getSheetByName('pageview');
  ss.activate();
  /* mag取得 */
  
  var date = new Date();
  //ss.activate();
  
  var id = "1Hl6Nt23HJzqOj7AUoUGsF_3ziAoYIVPmWYsO9E__1SM";
  var an_sheet = SpreadsheetApp.openById(id);
  var cellNum = an_sheet.getLastRow();
  var url_amount = cellNum-300; //取得数
  var mag_url = [];
  for (var i=0; i<cellNum ; i++){ //67は初期値
    var cell = i+67;
   mag_url[i] = an_sheet.getRange("A"+ String(cell)).getValue();//URLを順にぶち込む。
  }
  
  var Filters = [];
  for (var i=0; i<url_amount; i++){                   
   Filters[i] = 'ga:pagePath=~/mag/' + mag_url[i];
   Filters[i] = Filters[i].toString().trim();
  }
  
  /* Titleをセット*/
  
 
  /* Analytics */
  var today = new Date();
  var twoWeekAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  var startDate = Utilities.formatDate(twoWeekAgo, Session.getTimeZone(),'yyyy-MM-dd');
  var endDate = Utilities.formatDate(today, Session.getTimeZone(),'yyyy-MM-dd');
  
  var tableId  = 'ga:132378190';
  var metric = 'ga:pageviews';
  
 for (var i=0; i<url_amount; i++){
  var options = {
    'dimensions': 'ga:date',
   // 'sort': '-ga:visits,ga:source',
    'filters': Filters[i],
    'max-results': 25
  };
   
  var data = Analytics.Data.Ga.get(tableId, startDate, endDate, metric, options);
  var getdata = JSON.parse(data);
  var rows = getdata["rows"];   
  
   //pageviewをセット
  for(var j=0;j<rows.length;j++){
    ss.getRange(i+2,j+4).setValue(rows[j][1]);
   }
   ss.getRange(i+2,3).setValue('https://www.cchan.tv/mag/'+mag_url[i]); //URL
 }
  //日時をセット
  for(var j=0;j<rows.length;j++){
    ss.getRange(1, j+4).setValue(rows[j][0]);
  } 
}


