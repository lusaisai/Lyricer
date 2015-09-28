Lyricer
=======
This is a simple standalone javascript library to parse and show LRC lyric in a web page.

Usage
-----
Include the js and css file in your page.
```html
    <script type="text/javascript" src="lyricer.min.js"></script>
	<link rel="stylesheet" href="lyricer.min.css">
```

In your page, you need to create an empty div with the default id 'lyricer'. This div is to place the html lyrics.
```html
    <div id="lyricer"></div>
```

In your js code, you can  create a Lyricer object, provding an object of options, or leave it empty.
```javascript
    var lrc = new Lyricer({"showLines": 10, "clickable": false});
    var lrc = new Lyricer();
```

To set lrc text, run the following method,
```javascript
lrc.setLrc(lrctext);
```

The main method is to move to a specific time in seconds. The following line moves the html lyrics in your page to the line when the song plays at time 100 seconds.
```javascript
    lrc.move(100);
```

Usually, you can create a function object around the move method and bind it to the timeupdate event of an audio, for example,
```javascript
    audio.addEventListener( "timeupdate", function() {
		lrc.move(audio.currentTime);
	});
```

When you click a line of lyrics, it will generate a 'lyricerclick' event, which can tell you the starttime of that line. This feature can be used to seek the audio via lyrics.
```javascript
window.addEventListener('lyricerclick', function(e){
    if (e.detail.time > 0) {
        audio.currentTime = e.detail.time;
    }
});
```

Options
-----
|Option|Explaination|
|---|---|
|showLines|There're 8 lines' lyrics before/after the current playing one, to change it, assgin a different value as follows.|
|clickable|Turn on/off 'lyricerclick' feature|
