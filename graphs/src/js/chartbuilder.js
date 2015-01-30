function build_chart() {	

	var canvasContext = $("canvas").get(0).getContext("2d");
	var chartObject = new Chart(canvasContext);

	function lineChartData(){
		return {
			labels : getData('.headers'),
			datasets : [
			{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : getData('.data1')
			},
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#111",
				data : getData('.data2')
			}
			]	
		};
	}

	function getData(type)
	{
		var result = new Array(7);
		var data = $(type+' td');
		if(type.indexOf(".data") > -1){
			data = data.children('div');
		}

		var cellValue;
		for (var i = 0; i < data.length; i++) {       
			cellValue = data[i].innerHTML;
			if(isNaN(cellValue)){
				result[i] = cellValue;
			}
			else{
				result[i] = Number(cellValue);
			}   
		}

		return result;
	};   

	function buildChartData(){
		chartObject.Line(lineChartData());
	}

    buildChartData();
	$(document).ready(function() {
		$("#btn").click(
			function(){
				buildChartData();
			}
			);
	});

	chartObject.Line.defaults = {
	                	//Boolean - If we show the scale above the chart data			
	                	scaleOverlay : true,
	                	//Boolean - If we want to override with a hard coded scale
	                	scaleOverride : true,
	                	//** Required if scaleOverride is true **
	                	//Number - The number of steps in a hard coded scale
	                	scaleSteps : 1,
	                	//Number - The value jump in the hard coded scale
	                	scaleStepWidth : 100,
	                	//Number - The scale starting value
	                	scaleStartValue : 0,
	                	//String - Colour of the scale line	
	                	scaleLineColor : "rgba(0,0,0,.1)",	
	                	//Number - Pixel width of the scale line	
	                	scaleLineWidth : 1,
	                	//Boolean - Whether to show labels on the scale	
	                	scaleShowLabels : true,
	                	//Interpolated JS string - can access value
	                	scaleLabel : "<%=value%>",
	                	//String - Scale label font declaration for the scale label
	                	scaleFontFamily : "'Arial'",
	                	//Number - Scale label font size in pixels	
	                	scaleFontSize : 12,
	                	//String - Scale label font weight style	
	                	scaleFontStyle : "normal",
	                	//String - Scale label font colour	
	                	scaleFontColor : "#666",	
	                	///Boolean - Whether grid lines are shown across the chart
	                	scaleShowGridLines : true,
	                	//String - Colour of the grid lines
	                	scaleGridLineColor : "rgba(0,0,0,.05)",
	                	//Number - Width of the grid lines
	                	scaleGridLineWidth : 1,	
	                	//Boolean - Whether the line is curved between points
	                	bezierCurve : true,
	                	//Boolean - Whether to show a dot for each point
	                	pointDot : true,
	                	//Number - Radius of each point dot in pixels
	                	pointDotRadius : 3,
	                	//Number - Pixel width of point dot stroke
	                	pointDotStrokeWidth : 1,
	                	//Boolean - Whether to show a stroke for datasets
	                	datasetStroke : true,
	                	//Number - Pixel width of dataset stroke
	                	datasetStrokeWidth : 2,
	                	//Boolean - Whether to fill the dataset with a colour
	                	datasetFill : true,
	                	//Boolean - Whether to animate the chart
	                	animation : true,
	                	//Number - Number of animation steps
	                	animationSteps : 60,
	                	//String - Animation easing effect
	                	animationEasing : "easeOutQuart",
	                	//Function - Fires when the animation is complete
	                	onAnimationComplete : null
	                } 
}
build_chart();
