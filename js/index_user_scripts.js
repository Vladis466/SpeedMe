/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */
/*jshint browser:true */
/*jslint smarttabs:true */
/*global $ */(function()
{
 "use strict";
 var userLocation;
 var app_ids = "JBfuM1JnMuZWX47JjcvF";
 var app_codes = "GBFpb1860qq-nkui-Lw_uA";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
     /* button  Button */
    $(document).on("click", ".uib_w_1", function(evt)
    {
        /* your code goes here */ 
		navigator.geolocation.getCurrentPosition(onSuccess, onError);


		//intel.xdk.device.getRemoteData("http://proj2-1095.appspot.com/studyProcedures", "GET", "", 'getspeed_Parser', "error_handler");

		//callAJAX();
			
    });
    
	   
 }
	
	




	
	

		

    var onSuccess = function(position) 
	{  
		
		userLocation =

          position.coords.latitude.toFixed(2)     +    ','   +
          position.coords.longitude.toFixed(2)    ;   
          /*'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + "<br>" +
          'Timestamp: ' +"<br>" + position.timestamp                + "<br>";*/
		document.getElementById("frontPage").innerHTML = "<h3>"+userLocation+"</h3>"; 
		
		//alert(typeof(userLocation));
		intel.xdk.device.getRemoteData("https://legacy.route.cit.api.here.com/routing/6.2/getlinkinfo.json" + "?app_id=" + app_ids + "&app_code=" + app_codes + "&waypoint=" + userLocation, "GET","", "getspeed_Parser", "error_handler");
		

		
     };
	
	
	
	
	
	
	
	
 document.addEventListener("app.Ready", register_event_handlers, false);	
})();


function success_handler (data) {  alert("success: "); }

	 
//parse data to get speed at certain position
function getspeed_Parser(data)
{  
	//Speed limit to be displayed as an integer
	var speedInt;
	//Could not manage to get JSON object extraction out right.
	var data2 = JSON.stringify(data);
	var obj = JSON.parse(data2);
	

	//Parse the speed limit and street using a regular expression instead
	var Splitter2 = String(obj).split('"BaseSpeed":');
	var Splitter = String(obj).split('"SpeedLimit":');
	var reSpeed = /(\d+.\d+)/;
	var reRoad = /Label":(.+?(?=")")/;
	var finalRoad = Splitter[1].match(reRoad);
	var finalSpeed = Splitter[1].match(reSpeed);	
	if (isNumber(finalSpeed))
		{
			finalSpeed = Splitter[1].match(reSpeed);			
		}
		
	
	if($('#ToggleUnits').is(":checked")) {
		//IN KM/HR
		//$('#ToggleUnits').prop("checked", false);
		speedInt = parseInt(parseFloat(finalSpeed[0]) * 3.6);
		if (speedInt % 5 !== 0)
			{
				speedInt += 1;
			}	
		document.getElementById("frontPage").innerHTML = "Location:" + "<br>" + finalRoad[1] + "<br>" + "<br>" + "Speed Limit: \n " + "<br>" + "<br>" + "<h1>" + String(speedInt) + " kph<h1>";
		
	} else {
		//IN M/HR
		speedInt = parseInt(parseFloat(finalSpeed[0]) * 2.23694);
		if (speedInt % 5 !== 0)
			{
				speedInt += 1;
			}	
		if (speedInt == 32)
			{
				speedInt = 25;
			}
		document.getElementById("frontPage").innerHTML = "Location:" + "<br>" + finalRoad[1] + "<br>" + "<br>" + "Speed Limit: \n " + "<br>" + "<br>" + "<h1>" + String(speedInt) + " mph<h1>";
	}


	//Number checking function
	function isNumber(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}
	

}


	//Attempt at using JQuery for the AJAX call...."Object is not a function error"
	//could not be resolved.
	/*function callAJAX()
	{
		var app_ids = "JBfuM1JnMuZWX47JjcvF";
		var app_codes = "GBFpb1860qq-nkui-Lw_uA";
		$.ajax({
		  url: 'https://legacy.route.cit.api.here.com/routing/6.2/getlinkinfo.json',
		  type: 'GET',
		  dataType: 'jsonp',
		  timeout: 3000,
		  jsonp: 'jsoncallback',
		  data: {
			waypoint: '44.9383,-122.9906',
			app_id: app_ids,
			app_code: app_codes
		  },
		  success: function (data) {
			alert(JSON.stringify(data));
		  },
		  error: function() {
            alert("error occured");
      }
		});		
	}*/
	


	function onError(error) 
	{
	document.getElementById("frontPage").innerHTML = 'code: '    + error.code    + '\n' + 'message: ' + error.message + '\n';
    }
	
	function error_handler(data) {  alert("error: " + data); }	
