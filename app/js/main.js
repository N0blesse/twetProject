$(document).ready(function(){

	var getDate = function(){
		var d = new Date(),
			day = d.getDate(),
			hrs = d.getHours(),
			min = d.getMinutes(),
			//sec = d.getSeconds(),
			month = d.getMonth(),
			year = d.getFullYear();

		var monthArray = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря");
		var actualDate = `${day} ${monthArray[month]} ${year} года ${hrs}:${min}`;
		return actualDate;
	};

	var countTweets = function(){
		var tweetCounter = $('.tweet-card').length;
		$('#tweetsCounter').text(tweetCounter);
	};

	var wrapURLs = function (text, new_window) {
          var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
          var target = (new_window === true || new_window == null) ? '_blank' : '';

          return text.replace(url_pattern, function (url) {
            var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
            var href = protocol_pattern.test(url) ? url : 'http://' + url;
            return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
          });
    };

	var createTweet = function(date, text){
		var $tweetBox = $('<div class="card tweet-card">'); // создаём обёртку для твита
		var $tweetDate = $('<div class="tweet-date">').text(date);// создаём дату
		var $tweetText = $('<div class="tweet-text">').html(wrapURLs(text)).wrapInner('<p></p>');// создаём контейнер с твитом
		
		var additionalClassName;

		if (text.length < 100){
			additionalClassName = 'font-size-large';
		} else if (text.length > 150){
			additionalClassName = 'font-size-small';
		}else{
			additionalClassName = 'font-size-normal';
		};

		$tweetText.addClass(additionalClassName);

		$tweetBox.append($tweetDate).append($tweetText); //Получаем разметку твита с датой и текстом
		$('#tweetList').prepend($tweetBox);
		countTweets();
	};

	var tweetsBase = [
			{
				date: '10 июля 2018',
				text: 'Катана - длинный японский меч. В современном японском слово «катана» также обозначает любой меч. Длина клинка — от 2 до 2,5 сяку (60,6-75,7 см), общая длина с рукоятью условно ≈ 85-105 см (обычно 90-100 см). Если длина клинка меньше 2 сяку, то это короткий меч вакидзаси, а если больше 2,5 сяку, то окатана (большая катана) или тати, но помимо размера, тати традиционно имеет больший изгиб и другую отделку с креплением (Аси) к доспехам. '
			},
			{
				date: '09 июля 2018',
				text: 'Спата - прямой и длинный обоюдоострый меч, размером от 75 см до 1 м, использовавшийся на территории Римской империи c I по VI века нашей эры. '
			},
			{
				date: '08 июля 2018',
				text: 'Шпага - холодное колюще-рубящее или колющее оружие, разновидность меча, состоящее из длинного (около 1 метра и более), прямого одно-двухлезвийного или гранёного клинка и рукояти (эфеса) с дужкой и гардой различной формы. В спортивном фехтовании существуют также рапира и эспадрон. Но если рапира возникла как облегчённая шпага, то эспадрон имеет независимое происхождение (он был призван имитировать при тренировке лёгкую фехтовальную саблю). '
			}
		];

	tweetsBase.forEach(function(tweet){
		createTweet(tweet.date, tweet.text);
	});

	// Форма отправки твита
	$('#postNewTweet').on('submit', function(ev){
		ev.preventDefault(); //отменяем отправку формы
		var tweetText = $('#tweetText').val();// получаем текст твита
		createTweet(getDate(), tweetText);
		$('#tweetText').val('');
	});

});