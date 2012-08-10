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
        var graph;
	var xPadding = 50;
	var yPadding = 30;
	ccount = 0;
	color=["red","green","blue","orange","black","purple"];
	countries=[];
	feilds=[];
	country=[];
	feild=[];
	index=0;
	$(xml).find("record").each(function(){	
		index++;
		countries[index] = $(this).find("country").text();
		feilds[index] = $(this).find("field_of_education").text();
	});
	country = removeDuplicates(countries);
	feild = removeDuplicates(feilds);
	graph = $('#graph1');

	for(a=0;a<feild.length-1;a++){
		$("#Title"+a).append("<br /><h1>"+feild[a]+"</h1>");
		if(a==1){graph = $('#graph2');}
		c = graph[0].getContext('2d');
		for(b=0;b<country.length;b++){
			initial=0;
			if(b<country.length-1){$("#Legend"+a).append("<font color=\""+color[ccount]+"\">"+country[b]+"</font><br />");}
			$(xml).find("record").each(function(){
				if($(this).find("country").text()==country[b]){
					if($(this).find("field_of_education").text()==feild[a]){

						if(initial==0){
							data = { values:[
        						{X:$(this).find("year").text(),
							Y:$(this).find("value").text()},
							]};
							
							initial++;
						}
						else{					
						data.values.push(
							{X:$(this).find("year").text(),
							Y:$(this).find("value").text()}
						);
						}
					}
				}
			});
								drawLines();
								ccount++;
		}
		drawGraph();
		ccount=0;	
		console.log(data);
}



//Draw the Graph
	function drawGraph(){
		//Initialize All Variables
		c.lineWidth = 2;
		c.strokeStyle = '#333';
		c.font = 'italic 8pt sans-serif';
		c.textAlign = "center";	
		c.beginPath();
		c.moveTo(xPadding, 0);
		c.lineTo(xPadding, graph.height() - yPadding);
		c.lineTo(graph.width(), graph.height() - yPadding);
		c.stroke();
		for(var i = 0; i < data.values.length; i ++) {
    			c.fillText(data.values[i].X, getXPixel(i), graph.height() - yPadding + 20);
		}
		c.textAlign = "right"
		c.textBaseline = "middle";
 		if(a==0){
			for(var i = 0; i < getMaxY(); i += 500) {
    				c.fillText(i, xPadding - 10, getYPixel(i));
			}
		}
		else{
			for(var i = 0; i < getMaxY(); i += 5000) {
    				c.fillText(i, xPadding - 10, getYPixel(i));
			}
		}
	}


//Draw Lines on graph
function drawLines(){
	c.strokeStyle = color[ccount];
	c.beginPath();
	c.moveTo(getXPixel(0), getYPixel(data.values[0].Y));
 
	for(var i = 1; i < data.values.length; i ++) {
    		c.lineTo(getXPixel(i), getYPixel(data.values[i].Y));
	}
	c.stroke();
	c.fillStyle = '#333';
 
	for(var i = 0; i < data.values.length; i ++) { 
   		 c.beginPath();
   		 c.arc(getXPixel(i), getYPixel(data.values[i].Y), 4, 0, Math.PI * 2, true);
    	c.fill();
	}

}

//Max value for graph drawing
function getMaxY() {
    var max = 0;
     
    for(var i = 0; i < data.values.length; i ++) {
        if(data.values[i].Y > max) {
            max = data.values[i].Y;
        }
    }
	max=parseInt(max)+3000;
    return max;
}
 
function getXPixel(val) {
    return ((graph.width() - xPadding) / data.values.length) * val + (xPadding * 1.5);
}

function getYPixel(val) {
    return graph.height() - (((graph.height() - yPadding) / getMaxY()) * val) - yPadding;
}
//removes duplicate values from array
function removeDuplicates( my_array ) {
	my_array.sort();
   	 for ( var i = 0; i < my_array.length; i++ ) {
        		if ( my_array[i] == my_array[ i - 1 ] ) {
                   		 my_array.splice( i--, 1 );
        		}
    		}
    		return my_array;
	};
}

