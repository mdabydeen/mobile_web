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
 $("#title").append('Error retreving XML');
}

function handleResponse(xml) {
 	//Initialize variables
	max=0;
m=0;
	var country;
	var feild;
	var value;
	var year;
  	var graph;
        xPadding = 50;
        yPadding = 50;
	var s = 0;
	graph = $('#graph');
        var c = graph[0].getContext('2d');            
        c.lineWidth = 2;
        c.strokeStyle = '#333';
        c.font = 'italic 8pt sans-serif';
        c.textAlign = "center";

//get max

$(xml).find("record").each(function()
      	{
if(m==0){
country = $(this).find("country").text();
		feild = $(this).find("field_of_education").text();
m=1;}

				if(feild==$(this).find("field_of_education").text()){
					if(parseInt(max) < parseInt($(this).find("value").text())){
					max=$(this).find("value").text();
					}
				}
});
max = parseInt(max)+1000;



	//Go through each record
	$(xml).find("record").each(function()
      	{

		//Check if first item parsed
		if(s == 0){
		//initialize the variables
		country = $(this).find("country").text();
		feild = $(this).find("field_of_education").text();
 			data = { values:[
        			{X:$(this).find("year").text(),
				Y:$(this).find("value").text()},
			]};
		//update (not first item parsed)
		s++;
		}
		else{
			//Check if country and feild are same if so add new values to list
			if(country == $(this).find("country").text()){
				if(feild==$(this).find("field_of_education").text()){
					data.values.push(
						{X:$(this).find("year").text(),
						Y:$(this).find("value").text()}
					);
				}
			}
		}
	});

                
                // Draw the axises
                c.beginPath();
                c.moveTo(xPadding, 0);
                c.lineTo(xPadding, graph.height() - yPadding);
                c.lineTo(graph.width(), graph.height() - yPadding);
                c.stroke();
                
                // Draw the X value texts
                for(var i = 0; i < data.values.length; i ++) {
                    c.fillText(data.values[i].X, getXPixel(i), graph.height() - yPadding + 20);
                }
                
                // Draw the Y value texts
                c.textAlign = "right"
                c.textBaseline = "middle";
                for(var i = 0; i < max; i += 1000) {
                    c.fillText(i, xPadding - 10, getYPixel(i));
                }
                
                c.strokeStyle = '#f00';
                
                // Draw the line graph
                c.beginPath();
                c.moveTo(getXPixel(0), getYPixel(data.values[0].Y));
                for(var i = 1; i < data.values.length; i ++) {
                    c.lineTo(getXPixel(i), getYPixel(data.values[i].Y));
                }
                c.stroke();
                
                // Draw the dots
                c.fillStyle = '#333';
                
                for(var i = 0; i < data.values.length; i ++) {  
                    c.beginPath();
                    c.arc(getXPixel(i), getYPixel(data.values[i].Y), 4, 0, Math.PI * 2, true);
                    c.fill();
                }





}
    

            // Returns the max Y value in our data list
            function getMaxY() {
                var max = 0;
                
                for(var i = 0; i < data.values.length; i ++) {
                    if(data.values[i].Y > max) {
                        max = data.values[i].Y;
                    }
                }
		 max = parseInt(max)+1000;
                return max;
            }
            
            // Return the x pixel for a graph point
            function getXPixel(val) {
                return ((graph.width - xPadding) / data.values.length) * val + (xPadding * 1.5);
            }
            
            // Return the y pixel for a graph point
            function getYPixel(val) {
                return graph.height - (((graph.height - yPadding) / max) * val) - yPadding;
            }
