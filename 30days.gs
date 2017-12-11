  var sheet = SpreadsheetApp.getActiveSpreadsheet();

  var date = new Date();
  var id = "1Hl6Nt23HJzqOj7AUoUGsF_3ziAoYIVPmWYsO9E__1SM";
  var an_sheet = SpreadsheetApp.openById(id);
  var cellNum = an_sheet.getLastRow();
  var url_amount = cellNum - 600; //取得数

  var mag_ids = an_sheet.getActiveSheet().getRange(67, 1, cellNum).getValues(); //67初期値
  
  var Filters = [];
  for (var i=0; i<url_amount; i++){                   
   Filters[i] = 'ga:pagePath=~/mag/' + mag_ids[i][0];
   Filters[i] = Filters[i].toString().trim();
  }

  /* Title のヨテイ*/

　　　/* Analytics */
  
  var tableId  = 'ga:132378190';

/* pageview */
function analytics_30days_pageviews(){
  var ss = sheet.getSheetByName('pageview');
  ss.activate();
  
 
  /* Analytics */ 
  var metric = 'ga:pageviews';
  var today = new Date();
  var oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  var startDate = Utilities.formatDate(oneMonthAgo, 'Asia/Tokyo','yyyy-MM-dd');
  var endDate = Utilities.formatDate(today, 'Asia/Tokyo','yyyy-MM-dd');
  
 for (var i=0; i<url_amount; i++){
  var options = {
    'dimensions': 'ga:date',
   // 'sort': '-ga:visits,ga:source',
    'filters': Filters[i],
    'max-results': 30
  };
   
   try{
     var data = Analytics.Data.Ga.get(tableId, startDate, endDate, metric, options);
     var getdata = JSON.parse(data);
     var rows = getdata["rows"];
   }catch (e){
   Logger.log(e);
 }
     
  for(var j=0;j<rows.length;j++){
    ss.getRange(i+2,34-j).setValue(rows[j][1]);
   }
   ss.getRange(i+2,4).setValue('https://www.cchan.tv/mag/'+mag_ids[i][0]); //URL
 }
  //days
  for(var j=0;j<rows.length;j++){
    ss.getRange(1, 34-j).setValue(rows[j][0]);
  } 
}

 

/* sessions */
function analytics_30days_sessions(){
  var ss = sheet.getSheetByName('sessions');
  ss.activate();
  
 
  /* Analytics */ 
  var metric = 'ga:sessions';
  var today = new Date();
  var oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  var startDate = Utilities.formatDate(oneMonthAgo, 'Asia/Tokyo','yyyy-MM-dd');
  var endDate = Utilities.formatDate(today, 'Asia/Tokyo','yyyy-MM-dd');
  
 for (var i=0; i<url_amount; i++){
  var options = {
    'dimensions': 'ga:date',
    'filters': Filters[i],
    'max-results': 30
  };
   try{
  var data = Analytics.Data.Ga.get(tableId, startDate, endDate, metric, options);
  var getdata = JSON.parse(data);
  var rows = getdata["rows"];  
     }catch (e){
   Logger.log(e);
 }
   Logger.log(rows);
  
  for(var j=0;j<rows.length;j++){
    ss.getRange(i+2,34-j).setValue(rows[j][1]);
   }
   ss.getRange(i+2,4).setValue('https://www.cchan.tv/mag/'+mag_ids[i]); //URL
 }
  //days
  for(var j=0;j<rows.length;j++){
    ss.getRange(1, ss.getLastColumn()-j).setValue(rows[j][0]);
  } 
}

/* ga:organicSearches */
function analytics_30days_organicSearches(){
  var ss = sheet.getSheetByName('organicSearches');
  ss.activate();
 
  /* Titleをセット*/
  
 
  /* Analytics */
  var metric = 'ga:organicSearches';
  var today = new Date();
  var oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  var startDate = Utilities.formatDate(oneMonthAgo, 'Asia/Tokyo','yyyy-MM-dd');
  var endDate = Utilities.formatDate(today, 'Asia/Tokyo','yyyy-MM-dd');
  
 for (var i=0; i<url_amount; i++){
  var options = {
    'dimensions': 'ga:date',
   // 'sort': '-ga:visits,ga:source',
    'filters': Filters[i],
    'max-results': 30
  };
   
   try{
  var data = Analytics.Data.Ga.get(tableId, startDate, endDate, metric, options);
  var getdata = JSON.parse(data);
  var rows = getdata["rows"];   
   } catch (e){
     Logger.log(e);
   }
  for(var j=0;j<rows.length;j++){
    ss.getRange(i+2,34-j).setValue(rows[j][1]);
   }
   ss.getRange(i+2,4).setValue('https://www.cchan.tv/mag/'+mag_ids[i][0]); //URL
 }
  //days
  for(var j=0;j<rows.length;j++){
    ss.getRange(1, 34-j).setValue(rows[j][0]);
  } 
}

