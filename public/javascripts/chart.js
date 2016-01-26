$(document).ready(function(){
	$.ajax({
		url: '/poll/pollresultjson/'+$("#id").val(),
		type: 'get', 
		success: function(res){
			var ctx = document.getElementById("myChart").getContext("2d");
			data = {};
			var labels = [];
			var count = []
			$.each(res.options, function(index,value){
				labels.push(value.name);
				count.push(value.count);
			});
			data.labels = labels;
			data.datasets = [
			    {
			        label: "My First dataset",
			        fillColor: "rgba(220,220,220,0.5)",
			        strokeColor: "rgba(220,220,220,0.8)",
			        highlightFill: "rgba(220,220,220,0.75)",
			        highlightStroke: "rgba(220,220,220,1)",
			        data: count
			    },
			]
			console.log(data)
			var myBarChart = new Chart(ctx).Bar(data);
		}
	});
});