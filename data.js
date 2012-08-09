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
	$("table").append('Error retreving XML');
}

function handleResponse(xml) {
	s=0;
	$("table").append("<tr><th>Country</th><th>Feild Of Education</th><th>Year</th><th>Values</th></tr>");
	//Go through each record
	$(xml).find("record").each(function()
       	{
	record = $(this);
		//Check if first item parsed
		if(s == 0){
			//initialize the variables
			country = $(this).find("country").text();
			feild = $(this).find("field_of_education").text();
  			$("table").append("<tr><td>"+$(this).find("country").text()+"</td>");
			displayTable(this);
			//update (not first item parsed)
			s++;
		}
		else{
			//Check if country and feild are same if so add new values to list
			if(country == $(this).find("country").text()){
				if(feild==$(this).find("field_of_education").text()){
					displayTable(record);
				}
				else{
					feild = $(this).find("field_of_education").text();
					displayTable(record)	
				}
			}
			else{
				$("table").append("<tr><td>"+$(this).find("country").text()+"</td>");
				displayTable($(this));
				country = $(this).find("country").text();
				feild = $(this).find("field_of_education").text();
			}
		}
	});
	function displayTable(record){
		$("table").append("<tr><td></td><td>"+$(record).find("field_of_education").text()+"</td><td>"+$(record).find("year").text()+"</td><td>"+$(record).find("value").text()+"</td></tr>");
}

}

   
