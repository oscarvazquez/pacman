(function(global){

	var Pacman = function(world, map, scoreBoard, marginTop, marginLeft) {
    	return new Pacman.init(world, map, scoreBoard, marginTop, marginLeft);
	}

	var movePacman = function(self, oldPostion, newPosition, direction){
		self.map[oldPostion] = 3;
		document.getElementById(oldPostion).className = "space"
		calculateScore(self, newPosition)
		self.map[newPosition] = 2;
		self.pacmanPosition = newPosition
		if (direction == "left") {
			document.getElementById(newPosition).className = "pacman_left"	
		} else if (direction == 'up') {
			document.getElementById(newPosition).className = "pacman_up"	
		} else if (direction == 'down') {
			document.getElementById(newPosition).className = "pacman_down"	
		} else if (direction == "right") {
			document.getElementById(newPosition).className = "pacman"	
		}
	}

	var calculateScore = function(self, newPosition){
		if(self.map[newPosition] == 0) {
			self.score += 50
		} else if (self.map[newPosition] == 4) {
			self.score += 200
		}
		self.scoreBoard.innerHTML = self.score
	}

	var PacmanControls = function(self){
		document.onkeydown = function(e){
			console.log(self.map)
			e.preventDefault()
			if(e.keyCode == 37 && self.map[((self.pacmanY*15) + self.pacmanX - 1)] != 1){
				var newPostion = ((self.pacmanY*15) + self.pacmanX - 1)
				movePacman(self, ((self.pacmanY*15) + self.pacmanX), newPostion, 'left')
				self.pacmanX -= 1
			} else if (e.keyCode == 39 && self.map[((self.pacmanY*15) + self.pacmanX + 1)] != 1) {
				var newPostion = ((self.pacmanY*15) + self.pacmanX + 1)
				movePacman(self, ((self.pacmanY*15) + self.pacmanX), newPostion, 'right')
				self.pacmanX += 1
			} else if (e.keyCode == 40 && self.map[(((self.pacmanY+1)*15) + self.pacmanX)] != 1) {
				var newPostion = (((self.pacmanY+1)*15) + self.pacmanX)
				movePacman(self, (((self.pacmanY)*15) + self.pacmanX), newPostion, 'down')
				self.pacmanY += 1
			} else if (e.keyCode == 38 && self.map[(((self.pacmanY-1)*15) + self.pacmanX)] != 1) {
				var newPostion = (((self.pacmanY-1)*15) + self.pacmanX)
				movePacman(self, (((self.pacmanY)*15) + self.pacmanX), newPostion, 'up')
				self.pacmanY -= 1
			}
			if(self.map.includes(0) == false){
				alert('GOOD JOB! YOU WON!')
				location.reload()
			}
		}
	}
	var moveGhost = function(self, oldPosition, newPosition){
		var OldGhost = document.getElementById(oldPosition);
		OldGhost.classList.remove('ghost1');
		var newGhost = document.getElementById(newPosition);
		newGhost.className = newGhost.className + " ghost1";
	}
	var moveGhost2 = function(self, oldPosition, newPosition) {
		var OldGhost = document.getElementById(oldPosition);
		OldGhost.classList.remove('ghost2');
		var newGhost = document.getElementById(newPosition);
		newGhost.className = newGhost.className + " ghost2";		
	}
	var moveGhost3 = function(self, oldPosition, newPosition) {
		var OldGhost = document.getElementById(oldPosition);
		OldGhost.classList.remove('ghost3');
		var newGhost = document.getElementById(newPosition);
		newGhost.className = newGhost.className + " ghost3";		
	}
	var moveGhost4 = function(self, oldPosition, newPosition) {
		var OldGhost = document.getElementById(oldPosition);
		OldGhost.classList.remove('ghost4');
		var newGhost = document.getElementById(newPosition);
		newGhost.className = newGhost.className + " ghost4";
	}

	var checkKill = function(self){
		positionPac = (self.pacmanY*15) + self.pacmanX
		if (self.ghost1 == positionPac){
			alert('you died homie');
			location.reload()
			self.score = 0
		} else if (self.ghost2 == positionPac){
			alert('you died homie')
			location.reload()
			self.score = 0
		} else if (self.ghost3 == positionPac){
			alert('you died homie')
			location.reload()
			self.score = 0
		} else if (self.ghost4 == positionPac) {
			alert('you died homie')
			location.reload()
			self.score = 0
		}
		self.scoreBoard.innerHTML = self.score;
	}

	var GhostControls = function(self) {
		self.ghost1 = self.map.indexOf(5);
		self.ghost2 = self.map.indexOf(6);
		self.ghost3 = self.map.indexOf(7);
		self.ghost4 = self.map.indexOf(8);
		var last = [];
		var last2 = [];
		var last3 = [];
		var last4 = [];
 		var lastTile;
		var lastTile2;
		var lastTile3;
		var lastTile4;
		setInterval(function(){
			/// use the index that i have saved in the object
			if (last.length == 35) {
				last = []
				last2 = []
				last3 = []
				last4 = []
			}

			if(self.map[self.ghost1 - 15] != 1 && ((self.ghost1 - 15) == self.pacmanPosition || (self.ghost1 - 30) == self.pacmanPosition || (self.ghost1 - 45) == self.pacmanPosition)) {
				moveGhost(self, self.ghost1, (self.ghost1 - 15))
				self.ghost1 -= 15
				lastTile = self.ghost1
			} else if (self.map[self.ghost1 + 15] != 1 && ((self.ghost1 + 15) == self.pacmanPosition || (self.ghost1 + 30) == self.pacmanPosition || (self.ghost1 + 45) == self.pacmanPosition)) {
				moveGhost(self, self.ghost1, (self.ghost1 - 15))
				self.ghost1 += 15
				lastTile = self.ghost1				
			} else if (self.map[self.ghost1 - 1] != 1 && ((self.ghost1 - 1) == self.pacmanPosition || (self.ghost1 - 2) == self.pacmanPosition || (self.ghost1 - 3) == self.pacmanPosition)) {
				moveGhost(self, self.ghost1, (self.ghost1 - 1))
				self.ghost1 -= 1
				lastTile = self.ghost1
			} else if (self.map[self.ghost1 + 1] != 1 && ((self.ghost1 + 1) == self.pacmanPosition || (self.ghost1 + 2) == self.pacmanPosition || (self.ghost1 + 3) == self.pacmanPosition)) {
				moveGhost(self, self.ghost1, (self.ghost1 + 1))
				self.ghost1 += 1
				lastTile = self.ghost1
			} else if ((self.ghost2 + 15) == self.pacmanPosition) {
				moveGhost2(self, self.ghost2, (self.ghost2 + 15))
				self.ghost2 += 15
				lastTile2 = self.ghost2 
			} else if ((self.ghost2 - 15) == self.pacmanPosition) {
				moveGhost2(self, self.ghost2, (self.ghost2 - 15))
				self.ghost2 -= 15
				lastTile2 = self.ghost2
			} else if ((self.ghost2 - 1) == self.pacmanPosition) {
				moveGhost2(self, self.ghost2, (self.ghost2 - 1))
				self.ghost2 -= 1
				lastTile2 = self.ghost2
			} else if ((self.ghost2 + 1) == self.pacmanPosition) {
				moveGhost2(self, self.ghost2, (self.ghost2 + 1))
				self.ghost2 += 1
				lastTile2 = self.ghost2
			} else if ((self.ghost3 + 1) == self.pacmanPosition) {
				moveGhost3(self, self.ghost3, (self.ghost3 + 1))
				self.ghost3 += 1
				lastTile3 = self.ghost3
			} else if ((self.ghost3 - 1) == self.pacmanPosition) {
				moveGhost3(self, self.ghost3, (self.ghost3 + 1))
				self.ghost3 -= 1
				lastTile3 = self.ghost3
			} else if ((self.ghost3 + 15) == self.pacmanPosition) {
				moveGhost3(self, self.ghost3, (self.ghost3 + 15))
				self.ghost3 += 15
				lastTile3 = self.ghost3
			} else if ((self.ghost3 - 15) == self.pacmanPosition) {
				moveGhost3(self, self.ghost3, (self.ghost3 - 15))
				self.ghost3 -= 15
				lastTile3 = self.ghost3
			} else if ((self.ghost4 - 15) == self.pacmanPosition) {
				moveGhost4(self, self.ghost4, (self.ghost4 - 15))
				self.ghost4 -= 15
				lastTile4 = self.ghost4
			} else if ((self.ghost4 + 15) == self.pacmanPosition) {
				moveGhost4(self, self.ghost4, (self.ghost4 + 15))
				self.ghost4 += 15
				lastTile4 = self.ghost4
			} else if ((self.ghost4 + 1) == self.pacmanPosition) {
				moveGhost4(self, self.ghost4, (self.ghost4 + 1))
				self.ghost4 += 1
				lastTile4 = self.ghost4
			} else if ((self.ghost4 - 1) == self.pacmanPosition) {
				moveGhost4(self, self.ghost4, (self.ghost4 - 1))
				self.ghost4 -= 1
				lastTile4 = self.ghost4
			} else {
				if (self.map[self.ghost1 + 15] != 1 && last.includes(self.ghost1 + 15) == false) {
					moveGhost(self, self.ghost1, (self.ghost1 + 15))
					self.ghost1 += 15;
					lastTile = self.ghost1
				} else if (self.map[self.ghost1 - 1] != 1 && last.includes(self.ghost1 - 1) == false) {
					moveGhost(self, self.ghost1, (self.ghost1 - 1))
					self.ghost1 -= 1;
					lastTile = self.ghost1
				} else if (self.map[self.ghost1 + 1] != 1 && last.includes(self.ghost1 + 1) == false) {
					moveGhost(self, self.ghost1, (self.ghost1 + 1))
					self.ghost1 += 1;
					lastTile = self.ghost1
				} else if (self.map[self.ghost1 - 15] != 1 && last.includes(self.ghost1 - 15) == false) {
					moveGhost(self, self.ghost1, (self.ghost1 - 15))
					self.ghost1 -= 15;
					lastTile = self.ghost1
				}
				if (self.map[self.ghost2 + 15] != 1 && last2.includes(self.ghost2 + 15) == false) {
					moveGhost2(self, self.ghost2, (self.ghost2 + 15))
					self.ghost2 += 15;
					lastTile2 = self.ghost2
				} else if (self.map[self.ghost2 + 1] != 1 && last2.includes(self.ghost2 + 1) == false) {
					moveGhost2(self, self.ghost2, (self.ghost2 + 1))
					self.ghost2 += 1;
					lastTile2 = self.ghost2
				} else if (self.map[self.ghost2 - 1] != 1 && last2.includes(self.ghost2 - 1) == false) {
					moveGhost2(self, self.ghost2, (self.ghost2 - 1))
					self.ghost2 -= 1;
					lastTile2 = self.ghost2
				} else if (self.map[self.ghost2 - 15] != 1 && last2.includes(self.ghost2 - 15) == false) {
					moveGhost2(self, self.ghost2, (self.ghost2 - 15))
					self.ghost2 -= 15;
					lastTile2 = self.ghost2
				}	
				if (self.map[self.ghost3 - 15] != 1 && last3.includes(self.ghost3 - 15) == false) {
					moveGhost3(self, self.ghost3, (self.ghost3 - 15))
					self.ghost3 -= 15;
					lastTile3 = self.ghost3
				} else if (self.map[self.ghost3 - 1] != 1 && last3.includes(self.ghost3 - 1) == false) {
					moveGhost3(self, self.ghost3, (self.ghost3 - 1))
					self.ghost3 -= 1;
					lastTile3 = self.ghost3
				} else if (self.map[self.ghost3 + 1] != 1 && last3.includes(self.ghost3 + 1) == false) {
					moveGhost3(self, self.ghost3, (self.ghost3 + 1))
					self.ghost3 += 1;
					lastTile3 = self.ghost3
				} else if (self.map[self.ghost3 + 15] != 1 && last3.includes(self.ghost3 + 15) == false) {
					moveGhost3(self, self.ghost3, (self.ghost3 + 15))
					self.ghost3 += 15;
					lastTile3 = self.ghost3
				} 
				if (self.map[self.ghost4 - 15] != 1 && last4.includes(self.ghost4 - 15) == false) {
					moveGhost4(self, self.ghost4, (self.ghost4 - 15))
					self.ghost4 -= 15
					lastTile4 = self.ghost4
				} else if (self.map[self.ghost4 + 1] != 1 && last4.includes(self.ghost4 + 1) == false) {
					moveGhost4(self, self.ghost4, (self.ghost4 + 1))
					self.ghost4 += 1
					lastTile4 = self.ghost4
				} else if (self.map[self.ghost4 - 1] != 1 && last4.includes(self.ghost4 - 1) == false) {
					moveGhost4(self, self.ghost4, (self.ghost4 - 1))
					self.ghost4 -= 1
					lastTile4 = self.ghost4
				} else if (self.map[self.ghost4 + 15] != 1 && last4.includes(self.ghost4 + 15) == false) {
					moveGhost4(self, self.ghost4, (self.ghost4 + 15))
					self.ghost4 += 15
					lastTile4 = self.ghost4
				}
			}		
			last.push(lastTile)
			last2.push(lastTile2)
			last3.push(lastTile3)
			last4.push(lastTile4)
			checkKill(self)
		}, 140) 
	}
	Pacman.prototype = {
		drawWorld: function() {
			this.world.innerHTML = ""
			for(var i = 0; i < this.map.length; i ++){
				var top = Math.floor(i/15) * 50 + this.marginTop
				var left = (i%15) * 50 + this.marginLeft
				if(this.map[i] == 1){
					this.world.innerHTML += "<div id = '" + i + "' class='wall' style='top:" + top + "px;left:" + left + "px'></div>";
				} else if (this.map[i] == 0) {
					this.world.innerHTML += "<div id = '" + i + "' class='coin' style='top:" + top + "px;left:" + left + "px'></div>";
				} else if (this.map[i] == 2) {
					this.world.innerHTML += "<div id = '" + i + "' class='pacman' style='top:" + top + "px;left:" + left + "px'></div>";
				} else if (this.map[i] == 3) {
					this.world.innerHTML += "<div id = '" + i + "' class='space' style='top:" + top + "px;left:" + left + "px'></div>";
				} else if (this.map[i] == 4) {
					this.world.innerHTML += "<div id = '" + i + "' class='cherry' style='top:" + top + "px;left:" + left + "px'></div>";
				} else if (this.map[i] == 5) {
					this.world.innerHTML += "<div id = '" + i + "' class='space ghost1' style='top:" + top + "px;left:" + left + "px'></div>";
				} else if (this.map[i] == 6) {
					this.world.innerHTML += "<div id = '" + i + "' class='space ghost2' style='top:" + top + "px;left:" + left + "px'></div>";
				} else if (this.map[i] == 7) {
					this.world.innerHTML += "<div id = '" + i + "' class='space ghost3' style='top:" + top + "px;left:" + left + "px'></div>";
				} else if (this.map[i] == 8) {
					this.world.innerHTML += "<div id = '" + i + "' class='space ghost4' style='top:" + top + "px;left:" + left + "px'></div>";
				}
			}
			this.scoreBoard.innerHTML = this.score;
			PacmanControls(this);
			GhostControls(this);
		}
	}

	Pacman.init = function(world, map, scoreBoard, marginTop, marginLeft) {
		this.marginTop = marginTop;
		this.marginLeft = marginLeft;
		this.map = map;
		this.world = document.getElementById(world);
		this.scoreBoard = document.getElementById(scoreBoard);
		this.score = 0;
		this.pacmanX = 2;
		this.pacmanY = 7;
	}

	Pacman.init.prototype = Pacman.prototype;

	global.Pacman = global.Pacman = Pacman;


}(window));