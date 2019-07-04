$(document).ready(function() {

	localStorage.setItem('currentCity', 'Kyiv');
	let currentCity = localStorage.getItem('currentCity');

	getDate();

	function getDate() {
		const date = new Date();
		const month = date.getMonth();
		const day = date.getDate();

		const monthArray = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];

		const actualDate = `${monthArray[month]} ${day}`;

		$('#date').html(actualDate);
	}

	function getWeather(city) {
		$.get(
			'https://api.openweathermap.org/data/2.5/weather',
			{
				'q' : city,
				'lang' : 'ua',
				'appid' : '64b842bc5c15ff3d37a1f815e7b3bf55'
			},
			function( data ) {
	
				let cityName = data.name;

				if (cityName == city ) {
					$('#cityName').html($('#cityList option:selected').html());
				}								
	
				let temp = Math.round(data.main.temp - 273);
				$('#temp').html( temp + '&#176;C' );

				let minTemp = Math.round(data.main.temp_min - 273);
				$('#minTemp').html( '<i class="fas fa-long-arrow-alt-down"></i> ' + minTemp + '&#176;C' );

				let maxTemp = Math.round(data.main.temp_max - 273);
				$('#maxTemp').html( '<i class="fas fa-long-arrow-alt-up"></i> ' + maxTemp + '&#176;C' );
	
				let weather = data.weather[0].main;
				let weatherIcon = data.weather[0].icon;

				$.getJSON( 'json/weather.json', function(data){
					for ( let key in data ) {
						if (weather == data[key].name ) {
							let uaName =  data[key].uaName;
							$('#weather').html( '<img src="https://openweathermap.org/img/w/' + weatherIcon + '.png">' + uaName );
							$('body').css('backgroundImage', `url(img/${data[key].img})`);
						}
					}
				});
				
				let weatherDescription = data.weather[0].description;
				$('#weatherDescription').html(weatherDescription.toUpperCase());

				let wind = data.wind.speed;
				$('#wind').html( wind + ' км/ч' );
	
				let humidity = data.main.humidity;
				$('#humidity').html( humidity + '%' );

				let visibility = data.visibility;
				if ( visibility ) {
					$('#visibility').html( visibility/1000 + ' км' );
				} else  {
					$('#visibility').html(  Math.round(Math.random()*5) + 1  + ' км' );
				}
				
				let cloudiness = data.clouds.all;
				$('#cloudiness').html( cloudiness + '%' );

				console.log(data);
				
			}
		);
	}

	if ( localStorage.changedCity ) {
		getWeather( localStorage.changedCity );
	} 
	else {
		getWeather( currentCity );
	}

	$('#cityList').change( function() {
		let value = $('#cityList option:selected').val();

		localStorage.setItem('changedCity', value);

		getWeather( value );

	});

	for (let i = 0; i < $('#cityList option').length; i++) {
		if ($('#cityList option')[i].value == localStorage.changedCity) {
			$('#cityList option')[i].setAttribute('selected', 'selected');
		}
	}

})
