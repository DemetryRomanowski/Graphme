const express = require('express');
const app = express();
const path = require('path');
const si = require('systeminformation');
const http = require('http').Server(app);
const io = require('socket.io')(http);

let TIMEOUT = 1000; //The refresh time for the all the data and update on the page
let GRAPH_SIZE = 10; //The x axis count.
let PORT = 8080; //The port to open the server on.

//Blank data template
let data = {
	total_usage: 0, 
	process_list: [], 
	current_time: '',
	graph_size: GRAPH_SIZE
};

/**
 * Get the current date and time
 *
 * @returns String the Date string in YYYY:MM:DD:HH:mm:ss
 **/
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

/**
 * Get the time
 *
 * @returns String time string in HH:mm:ss
 **/
function getTime() { 
	var date = new Date(); 

	var hour = date.getHours(); 
	hour = (hour < 10 ? "0" : "") + hour; 

	var min = date.getMinutes(); 
	min = (min < 10 ? "0" : "") + min; 

	var sec = date.getSeconds(); 
	sec = (sec < 10 ? "0" : "") + sec; 

	return hour + ":" + min + ":" + sec;
}

/**
 * Get the os data from a promise
 **/
function get_process_usage()
{

	si.processes((processes) => {
		var total_usage = 0; 
		
		//Empty the process_list as to not add duplicates.
		data.process_list = []; 

		for(var i = 0; i < processes.list.length; i++)
		{
			total_usage += Math.ceil(processes.list[i].pcpu);
			data.process_list.push({
				name: processes.list[i].name,
				pcpu: Math.ceil(processes.list[i].pcpu)
			});
			//console.log(processes.list[i].pcpu);
		}
		data.total_usage = total_usage;
		data.current_time = getTime(); 
	});
}

//Update according to the timeout
setInterval(get_process_usage, TIMEOUT);

//Send the homepage
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

//Use an io connection to send the data
io.on('connection', (socket) => {
	console.log('Connected');
	setInterval(() => {
		socket.emit('data', data); 
	}, TIMEOUT);
});

//Start the server on 8080
http.listen(PORT, () => { 
	console.log("Server started on " + PORT);
});

