var sheet = SpreadsheetApp.getActiveSpreadsheet();
var tableId  = 'ga:132378190';

function record(){
 
  var ss = sheet.getSheetByName("record");
  ss.activate();
  
  var mag_ids = ss.getRange(2, 2, ss.getLastRow()).getValues()
  
  var Filters = [];
  for (var i=0; i<mag_ids.length; i++){
    if(mag_ids[i][0]==''){break;}
   Filters[i] = 'ga:pagePath=~/mag' + mag_ids[i][0];
   Filters[i] = Filters[i].toString().trim();
  }
 
  
 // Analytics(ss, mag_ids, Filters);
  /*
}

function Analytics(ss, mag_ids, Filters){
 /* Analytics */
  
  var metric = 'ga:organicSearches';
  var options = [];
  var data = [];
  var getdata = [];
  var rows =[];
  
 for (var i=0; i<Filters.length; i++){
  options[i] = {
    'dimensions': 'ga:date',
   // 'sort': '-ga:visits,ga:source',
    'filters': Filters[i],
    'max-results': 62
  };
   
   try{
   data[i] = Analytics.Data.Ga.get(tableId, '2017-12-01', '2017-12-31', metric, options[i]);  //Monthly date
   getdata[i] = JSON.parse(data[i]);
   rows[i] = getdata[i]["rows"];
   } catch (e){
 //    Logger.log(e);
   }
  for(var j=0;j<rows[i].length;j++){
  //  if(typeof rows[i][j][0] == 'undefined'){break;}
    ss.getRange(i+2,j+7).setValue(rows[i][j][1]);
    //Logger.log(rows[i][j]);
   }
 }
}
