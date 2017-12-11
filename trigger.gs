/* トリガーをつくるぜ。 */

  var sheet = SpreadsheetApp.getActiveSpreadsheet();  

/* mag取得 */
  var date = new Date();
  
  var id = "1Hl6Nt23HJzqOj7AUoUGsF_3ziAoYIVPmWYsO9E__1SM";
  var an_sheet = SpreadsheetApp.openById(id);
  var cellNum = an_sheet.getLastRow();
  var url_amount = cellNum-700; //取得数

  var made = an_sheet.getActiveSheet().getRange(67, 16, cellNum).getValues();
  var mag_ids = an_sheet.getActiveSheet().getRange(67, 1, cellNum).getValues(); //67初期値
 
  var Filters = [];
  for (var i=0; i<url_amount; i++){                   
   Filters[i] = 'ga:pagePath=~/mag/' + mag_ids[i][0];
   Filters[i] = Filters[i].toString().trim();
  }
  
  var now = new Date();
  var yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  var tableId  = 'ga:132378190';

function new_pageviews(){
  
  var ss = sheet.getSheetByName('new_pageview');
  ss.activate();
   
  sheet.insertColumnAfter(4);
  ss.getRange(1, 5).setValue(yesterday);

  var metric = 'ga:pageviews';
      
   for (var i=0; i<url_amount; i++){
      var options = {
        'dimensions': 'ga:date',
        'filters': Filters[i],
        'max-results': 1
       };
      try{
      var data = Analytics.Data.Ga.get(tableId, 'yesterday', 'yesterday', metric, options);
      var getdata = JSON.parse(data);
      var rows = getdata["rows"];   
      } catch (e){
      Logger.log(rows);
      }
      ss.getRange(i+2,5).setValue(rows[0][1]);
      ss.getRange(i+2,4).setValue('https://www.cchan.tv/mag/'+mag_ids[i][0]); //URL
    }
}

function new_percentNewSessions(){
  var ss = sheet.getSheetByName('new_percentNewSessions');
  ss.activate();
   
  sheet.insertColumnAfter(4);
  ss.getRange(1, 5).setValue(yesterday);

  var metric = 'ga:percentNewSessions';
    
    for (var i=0; i<url_amount; i++){
  
      var options = {
        'dimensions': 'ga:date',
        // 'sort': '-ga:visits,ga:source',
        'filters': Filters[i],
        'max-results': 1
      };
      try{ 
      var data = Analytics.Data.Ga.get(tableId, 'yesterday', 'yesterday', metric, options);
      var getdata = JSON.parse(data);
      var rows = getdata["rows"];   
      } catch(e){
        
      }
      Logger.log(rows);
   
      ss.getRange(i+2,5).setValue(rows[0][1]);
      ss.getRange(i+2,4).setValue('https://www.cchan.tv/mag/'+mag_ids[i][0]); //URL
    }
}

function new_sessions(){
  var ss = sheet.getSheetByName('new_sessions');
  ss.activate();
   
  sheet.insertColumnAfter(4);
  ss.getRange(1, 5).setValue(yesterday);

  var metric = 'ga:sessions';
    
    for (var i=0; i<url_amount; i++){
  
      var options = {
        'dimensions': 'ga:date',
        // 'sort': '-ga:visits,ga:source',
        'filters': Filters[i],
        'max-results': 1
      };
      try{
      var data = Analytics.Data.Ga.get(tableId, 'yesterday', 'yesterday', metric, options);
      var getdata = JSON.parse(data);
      var rows = getdata["rows"];   
      } catch(e){
        
      }
      Logger.log(rows);
   
      ss.getRange(i+2,5).setValue(rows[0][1]);
      ss.getRange(i+2,4).setValue('https://www.cchan.tv/mag/'+mag_ids[i][0]); //URL
    }
}

function new_organicSearches(){
  var ss = sheet.getSheetByName('new_organicSearches');
  ss.activate();
   
  sheet.insertColumnAfter(4);
  ss.getRange(1, 5).setValue(yesterday);

  var metric = 'ga:organicSearches';
    
    for (var i=0; i<url_amount; i++){
  
      var options = {
        'dimensions': 'ga:date',
        // 'sort': '-ga:visits,ga:source',
        'filters': Filters[i],
        'max-results': 1
      };
      try{
      var data = Analytics.Data.Ga.get(tableId, 'yesterday', 'yesterday', metric, options); //2017-11-01
      var getdata = JSON.parse(data);
      var rows = getdata["rows"];   
      } catch (e){
       Logger.log(e); 
      }
      Logger.log(rows);
   
      ss.getRange(i+2,5).setValue(rows[0][1]);
      ss.getRange(i+2,4).setValue('https://www.cchan.tv/mag/'+mag_ids[i][0]); //URL
      
      ss.getRange(i+2,3).setValue(made[i][0]);
    }
}

function new_uniquePageviews(){
  var ss = sheet.getSheetByName('new_uniquePageviews');
  ss.activate();
   
  sheet.insertColumnAfter(4);
  ss.getRange(1, 5).setValue(yesterday);

  var metric = 'ga:uniquePageviews';
    
    for (var i=0; i<url_amount; i++){
  
      var options = {
        'dimensions': 'ga:date',
        // 'sort': '-ga:visits,ga:source',
        'filters': Filters[i],
        'max-results': 1
      };
      try{
      var data = Analytics.Data.Ga.get(tableId, 'yesterday', 'yesterday', metric, options);
      var getdata = JSON.parse(data);
      var rows = getdata["rows"];   
      } catch(e){
        
      }
      Logger.log(rows);
   
      ss.getRange(i+2,5).setValue(rows[0][1]);
      ss.getRange(i+2,4).setValue('https://www.cchan.tv/mag/'+mag_ids[i][0]); //URL
    }
}

function writers(){
  var writers = an_sheet.getActiveSheet().getRange(67, 9, cellNum).getValues(); //67初期値
 
  Logger.log(writers);
  var ss_writer = ['new_pageview','new_sessions','new_organicSearches','new_uniquePageviews','new_percentNewSessions',
                   'pageview','sessions','organicSearches','uniquePageviews','percentNewSessions'];
 
  for(i=0;i<ss_writer.length;i++){
    var ss = sheet.getSheetByName(ss_writer[i]);
    var ssw = ss.getRange(2, 2,writers.length)
    ssw.clear();
    ssw.setValues(writers);
  }
}

