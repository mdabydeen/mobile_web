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
			$("#content").append("<table border=\"1\">");
			country = $(this).find("country").text();
			feild = $(this).find("field_of_education").text();
  			$("#content").append("<tr><td>"+$(this).find("country").text()+"</td>");
			$("#content").append("<td>"+$(this).find("field_of_education").text()+"</td>");
			//update (not first item parsed)
			s++;
		}
		else{
			//Check if country and feild are same if so add new values to list
			if(country == $(this).find("country").text()){
				if(feild==$(this).find("field_of_education").text()){
					$("#content").append("<td>FAIKSJHFS"+$(this).find("field_of_education").text()+"</td>");			
				}
				else{
					$("#content").append("</tr><td></td><tr><td>"+$(this).find("field_of_education").text()+"</td>");
					feild = $(this).find("field_of_education").text();	
				}
			}
			else{
				$("#content").append("</tr><tr><td>"+$(this).find("country").text()+"</td>");
				$("#content").append("<td>"+$(this).find("field_of_education").text()+"</td>");
				country = $(this).find("country").text();
				feild = $(this).find("field_of_education").text();
			}
		}
	});
	$("#content").append("</table>");
}

   
