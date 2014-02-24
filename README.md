Lyricer
=======
This is a simple standalone javascript library to parse and show LRC lyric in a web page.

Usage
-----
Include the js and css file in your page.
```html
    <script type="text/javascript" src="lyricer-1.0.0.js"></script>
	<link rel="stylesheet" href="lyricer-1.0.0.css">
```

In your js code, you can  create a Lyricer object, provding the LRC string as the argument, or leave it empty, it can be set/change later.
```javascript
    var lrc = new Lyricer(lrctext);
    var lrc = new Lyricer();
    lrc.setLrc(lrctext);
```

In your page, you need to create an empty div with the default id 'lyricer'. The id can be changed through js code. This div is to place the html lyric.
```html
    <div id="lyricer"></div>
```
```javascript
    lrc.divID = "yourid";
```

The main method is to move to a specific time in seconds. The following line moves the html lyric in your page to the line when the song plays at time 100 seconds.
```javascript
    lrc.move(100);
```

Usually, you can create a function object around the move method and bind it to the timeupdate event of an audio, for example,
```javascript
    audio.addEventListener( "timeupdate", function() {
		lrc.move(audio.currentTime);
	} );
```
