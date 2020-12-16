localStorage.setItem('currentCity', 'Kyiv');
let currentCity = localStorage.getItem('currentCity');

if ( localStorage.changedCity ) {
	getWeather( localStorage.changedCity );
} 
else {
	getWeather( currentCity );
}

function getDate() {
	const date = new Date();
	const month = date.getMonth();
	const day = date.getDate();
	
	const monthArray = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
	
	const actualDate = `${monthArray[month]} ${day}`;
	
	document.querySelector('#date').textContent = actualDate;
}
getDate();

function getWeather(city) {
	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=64b842bc5c15ff3d37a1f815e7b3bf55&lang=ua`)
		.then(response => response.json())
		.then(data => {
			let cityName = data.name;

			if (cityName == city ) {
				document.querySelector('#cityName').textContent = document.querySelector('#cityList').selectedOptions[0].firstChild.data;
			}								
		
			let temp = Math.round(data.main.temp - 273);
			document.querySelector('#temp').innerHTML = temp + '&#176;C';
		
			let minTemp = Math.round(data.main.temp_min - 273);
			document.querySelector('#minTemp').innerHTML = '<i class="fas fa-long-arrow-alt-down"></i> ' + minTemp + '&#176;C';
		
			let maxTemp = Math.round(data.main.temp_max - 273);
			document.querySelector('#maxTemp').innerHTML = '<i class="fas fa-long-arrow-alt-up"></i> ' + maxTemp + '&#176;C';
		
			let weather = data.weather[0].main;
			let weatherIcon = data.weather[0].icon;
		
			fetch('json/weather.json')
				.then(response => response.json())
				.then(data => {
					for ( let key in data ) {
						if (weather == data[key].name ) {
							let uaName =  data[key].uaName;
							document.querySelector('#weather').innerHTML = '<img src="https://openweathermap.org/img/w/' + weatherIcon + '.png">' + uaName;
							document.querySelector('body').style.backgroundImage = `url(img/${data[key].img})`;
						}
					}
				});
			
			let weatherDescription = data.weather[0].description;
			document.querySelector('#weatherDescription').textContent = weatherDescription.toUpperCase();
		
			let wind = data.wind.speed;
			document.querySelector('#wind').textContent = wind + ' км/ч';
		
			let humidity = data.main.humidity;
			document.querySelector('#humidity').textContent = humidity + '%';
		
			let visibility = data.visibility;
			if ( visibility ) {
				document.querySelector('#visibility').textContent = visibility/1000 + ' км';
			} else  {
				document.querySelector('#visibility').textContent = Math.round(Math.random()*5) + 1  + ' км';
			}
			
			let cloudiness = data.clouds.all;
			document.querySelector('#cloudiness').textContent = cloudiness + '%';
		});
}

document.querySelector('#cityList').addEventListener('change', () => {
	let value = document.querySelector('#cityList').value;
	localStorage.setItem('changedCity', value);
	getWeather( value );
});

for (let i = 0; i < document.querySelector('#cityList').length; i++) {
	if (document.querySelector('#cityList')[i].value == localStorage.changedCity) {
		document.querySelector('#cityList')[i].setAttribute('selected', 'selected');
	}
}