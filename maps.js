	//Setup an array to recieve input
	countries = []; 
	var geocoder;
  	var map;

	//Get the XML File
	$(document).ready(function()
  	 {
    		 $.ajax({
      			type: "GET",
      			url: "euComputingEducation.xml",
      			dataType: "xml",
      			success: handleResponse,
        		error: failedxml
  		    });//end .ajax()
  	});

	//If xml file retreval fails display failure
	function failedxml(){
 		$("#title").append('Error retreving Maps');
	}

	function handleResponse(xml)
	{

		var country = [];
		var latlng;
		$(xml).find("country").each(function(index){
			countries[index] = $(this).text();
		});

		googleMaps();

		country = removeDuplicates(countries);
		for(i=0;i<country.length;i++){
			codeAddress(country[i]);
		}


	}//end handleResponse

	function removeDuplicates( my_array ) {
    			//my_array.sort();
   	 for ( var i = 2; i < my_array.length; i++ ) {
        		if ( my_array[i] === my_array[ i - 1 ] ) {
                   		 my_array.splice( i--, 1 );
        		}
    		}
    		return my_array;
	};

	function googleMaps(){
		
		//Setup Map Variables
		var mapOptions = {
			center: new google.maps.LatLng(43.591525,-79.638069), 
          		zoom: 5,
          		mapTypeId: google.maps.MapTypeId.ROADMAP
       		 };
        	
		//Create new Maps
		map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
        
		
	}//end google maps


	//Get Latitude & Longitude using Google Maps API
	function codeAddress(loc) {
			geocoder = new google.maps.Geocoder();
    			geocoder.geocode({'address': loc}, function(results, status) {
    			if (status == google.maps.GeocoderStatus.OK) 
			{
			   map.setCenter(results[0].geometry.location);

           		  var marker = new google.maps.Marker(
			  {
          		  	map: map,
				animation: google.maps.Animation.DROP,
          		  	position: results[0].geometry.location
       			  });
		
     			 } else {//begin else
				
				  $('#map_canvas').append("ERROR: could not find location"+status);return undefined;
      				} //end else
    			});//end geocode
			
  	 } //end code Address

	
