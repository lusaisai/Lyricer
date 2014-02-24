(function () {
	// The constrcutor can be empty or passed in the lrc string
	var Lyricer = function (argument) {
		this.divID = "lyricer"; // the default html container id
		this.currentcss = "lyricer-current-line"; // this css for the line current playing
		this.lineidPrefix = "lyricer-line"; // the id prefix for each line
		this.totalShowLines = 8; //lines showing before and after; 
		if (argument) {
			this.setLrc(argument);
			this.setHtml();
		};
	};

	Lyricer.prototype.setLrc = function(rawLrc) {
		this.tags = {};
		this.lrc = [];
		this.rangeLrc = [];

		var tagRegex = /.*\[([a-z]+):(.*)\].*/;
		var lrcRegex = /.*\[([0-9]+):([0-9.]+)\](.*)/;
		var rawLrcArray = rawLrc.split(/[\r\n]/);
		var tag;
		for (var i = 0; i < rawLrcArray.length; i++) {
			// handle tags first
			tag = tagRegex.exec(rawLrcArray[i]);
			if ( tag && tag[0] ) {
				this.tags[tag[1]] = tag[2];
				continue;
			}
			// handle lrc
			lrc = lrcRegex.exec(rawLrcArray[i]);
			if ( lrc && lrc[0] ) {
				this.lrc.push( { "starttime": parseInt(lrc[1]) * 60 + parseFloat(lrc[2]), "line": lrc[3] } );
			};
		};

		// sort lrc array
		this.lrc.sort(function (a,b) {
			return a.starttime - b.starttime;
		});

		// crate the range lrc array
		var starttime = 0;
		var line = "";
		for (var i = 0; i < this.lrc.length; i++) {
			endtime =  parseFloat(this.lrc[i].starttime);
			this.rangeLrc.push( { "starttime": starttime, "endtime": endtime, "line": line } );
			starttime = endtime;
			line = this.lrc[i].line;
		};
		this.rangeLrc.push( { "starttime": starttime, "endtime": 999.99, "line": line } );
		this.totalLines = this.rangeLrc.length;
		this.setHtml();
	};

	Lyricer.prototype.setHtml = function() {
		this.currentLine = 0;
		
		var container = document.getElementById(this.divID);
		container.innerHTML = "";
		var ul = document.createElement("ul");
		container.appendChild(ul);
		for (var i = 0; i < this.totalLines; i++) {
			var li = document.createElement("li");
			li.innerHTML = this.rangeLrc[i].line;
			if (!li.innerHTML) {li.innerHTML="&nbsp;"};
			li.setAttribute("id", this.lineidPrefix + i);
			if ( i == this.currentLine ) { li.className = this.currentcss };
			ul.appendChild(li);
		};

		// hide the later ones
		for (var i = this.totalShowLines; i < this.totalLines; i++) {
			document.getElementById(this.lineidPrefix + i).style.display = "none";
		};
	};

	Lyricer.prototype.move = function(time) {
		for (var i = 0; i < this.totalLines; i++) {
			if (time >= this.rangeLrc[i].starttime && time < this.rangeLrc[i].endtime) {
				this.currentLine = i;
				moveToLine(this,this.currentLine);
				return;
			};
		};
	};

	var moveToLine = function (self, line) {
		var startShow = line - self.totalShowLines;
		var endShow = line + self.totalShowLines;
		for (var i = 0; i < self.totalLines; i++) {
			var li = document.getElementById(self.lineidPrefix + i);
			if ( i >= startShow && i <= endShow ) {
				li.style.display = "block";
			} else{
				li.style.display = "none";
			};
			if (i==line) {
				li.className = self.currentcss;
			} else {
				li.className = "";
			};
		};
	};
	
	window.Lyricer = Lyricer; //exposed to global

})();
