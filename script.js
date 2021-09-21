const mymap =  L.map('mapid');
function showMap(lat, lng) {
	mymap.setView([lat, lng], 13);
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1,
	accessToken: 'pk.eyJ1IjoiYW5hcGltb2xvZGVjIiwiYSI6ImNrdDQzbXkyaTBkY2EydXE4dWMyOWc3aDcifQ.d7_aCWWjR1K-e1_BKXdOig'
	}).addTo(mymap);
}



let inputIP = document.getElementById("myIP");

// Execute a function when the user releases a key on the keyboard
inputIP.addEventListener("keyup", function(event) {
	   if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("myBtn").click();
	}
});

function goTrack() {
	let inputIP = document.getElementById("myIP").value;
	console.log(inputIP)
	MakeGet(inputIP);
	}

function MakeGet_first(ip) {
let url = "https://geo.ipify.org/api/v1?apiKey=" + "at_9j6iDh1a2wutDTj21Cq4jZugV7l3G" + "&ipAddress=" + ip;
fetch(url)
	.then(response => response.json())
	.then(res => {
		fillInfo(res)
		showMap(res.location.lat, res.location.lng)
	})
	
	.catch(error => {
	// handle the error
		console.log("Error:" + error)
	});
}

function MakeGet(ip) {
let url = "https://geo.ipify.org/api/v1?apiKey=" + "at_9j6iDh1a2wutDTj21Cq4jZugV7l3G" + "&ipAddress=" + ip;
fetch(url)
	.then(response => response.json())
	.then(res => {
		console.log(res)
		fillInfo(res)
		console.log("before map")
		console.log(mymap, res.location.lat)
		mymap.panTo(new L.LatLng(res.location.lat, res.location.lng));
		console.log("after map")
	})
	
	.catch(error => {
	// handle the error
		console.log("Error:" + error)
	});
}

function fillInfo(res) {

	let city = res.location.city;
	let reg = res.location.region;
	let postal = res.location.postalCode == "" ? "" : res.location.postalCode;
	let tzone = "UTC" + res.location.timezone;
	let isp = res.isp;
	let ip = res.ip;
	console.log(city, reg, postal, tzone, isp,ip)
	document.getElementById("city-here").innerHTML = city;
	document.getElementById("reg-here").innerHTML = reg;
	document.getElementById("postal-here").innerHTML = postal;
	document.getElementById("time-here").innerHTML = tzone;
	document.getElementById("isp-here").innerHTML = isp;
	document.getElementById("ip-here").innerHTML = ip;

}
function getIP(json) {
	const currentIP = json.ip;
	MakeGet_first(currentIP);
}