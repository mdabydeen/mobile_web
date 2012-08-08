//Get the xml File
 $(document).ready(function()
   {
     $.ajax({
      type: "GET",
      url: "euComputingEducation.xml",
      dataType: "xml",
      success: handleResponse,
        error: failedxml
   });
  });

//If xml file retreval fails display failure
function failedxml(){
	$("#content").append('Error retreving XML');
}

function handleResponse(xml) {
	s=0;
	//Go through each record
	$(xml).find("record").each(function()
       	{
		//Check if first item parsed
		if(s == 0){
			//initialize the variables
			country = $(this).find("country").text();
			feild = $(this).find("field_of_education").text();
  			$("#content").append($(this).find("country").text());
			//update (not first item parsed)
			s++;
		}
		else{
			//Check if country and feild are same if so add new values to list
			if(country == $(this).find("country").text()){
				if(feild==$(this).find("field_of_education").text()){
					$("#content").append($(this).find("field_of_education").text());			
				}
			}
		}
	});
}

   
