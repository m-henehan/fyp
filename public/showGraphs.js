function showGraphs()
{
   
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://us-central1-fyp-8639e.cloudfunctions.net/returnUserGraphs', true);
	//+ "?uid=" + getCookie('uid')
	console.log("get worked");
	console.log(xhr);
    //Track the state changes of the request
    xhr.onreadystatechange = function()
    {
        console.log("started");
        var DONE = 4; //readyState 4 means the request is done
        var OK = 200; // status 200 is a successful return
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
				
				
				let graphlist = [];
				var sHTML = "<p>";
                let data = JSON.parse(xhr.responseText);
                for (let i = 0; i < data.length; i++) {
					console.log(i);
                    console.log(data[i]);
					if(data[i].uid === getCookie('uid')){
						document.getElementById("graphs").innerHTML += "<div id='graph-react'><canvas id='myCanvas" +i+"'></canvas></div>";
						fishbone(data[i].causes, data[i].effect, i);
						sHTML += JSON.stringify(data[i]);
					}
                    graphlist.push(data[i].code);
                }
                console.log("graphlist:" + graphlist[0]);
				sHTML += "</p>";
				console.log(sHTML);
                document.getElementById("graphs").innerHTML += sHTML;
				
			
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    }
    xhr.send(null);
}

function fishbone(causes, effect, i)
{
	let causes1 = causes.split(",");
	console.log(causes);
	console.log(causes1[0]);
	console.log(effect);
	var canv = "myCanvas" +i;
	var c = document.getElementById(canv);
	var ctx = c.getContext("2d");
	console.log(ctx);
	c.width = 300;
	ctx.font = "bold 10px Arial";
		
	if (causes === ""){
		alert("No causes");
		console.log("no causes");
		return(1);
	}	

	ctx.moveTo(10, 75);
	ctx.lineTo(270, 75);
	ctx.fillText(effect, (273), (80));
	let lines = causes1.length;
	console.log(lines);
	let space = 250/(Math.round(lines/2));
	console.log("Space: " +space);
	let length_line = 250;

	ctx.moveTo(250, 75);
	ctx.lineTo(250-50, 120);
	ctx.fillText(causes1[0], (190), (130));
	
	for(let i=1; i<lines; i++){
		console.log("for loop");
		let result = (i % 2  == 0) ? 1 : 0;
		//check if odd or even (even is 1, odd is 0)
		length_line = length_line - space*result;
		ctx.moveTo(length_line, 75);
		ctx.lineTo(length_line-50, 90*(result) + 30);
		
		ctx.fillText(causes1[i], (length_line -60), 105*(result) + 25);
	}
	ctx.stroke();
	console.log("Should have filled canvas");

}
