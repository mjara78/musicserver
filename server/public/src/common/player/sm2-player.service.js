class Sm2PlayerService {
	constructor($rootScope, rx){ "ngInject";

		this.$rootScope = $rootScope
		this.rx = rx

		this.currentTrack = null
        this.repeat = false
        this.repeatTrack = false
        this.shuffle = false
        this.tempTrack = []
        this.autoPlay = true
        this.isPlaying = false
        this.volume = 90
        this.trackProgress = 0
        this.playlist = []
        this.isActive = false
        this.loadedProgress = 0 

        this.lastProgressTime = new Date()
        this.lastProgressLoadedTime = new Date()

        // subjects to subscriptions for changes
        this.subjects = {
        	trackProgress: new this.rx.Subject(),
        	isActive: new this.rx.Subject(),
        	isPlaying: new this.rx.Subject(),
        	loadedProgress: new this.rx.Subject(),
        	currentTrackData: new this.rx.Subject(),
        	position: new this.rx.Subject(),
        	duration: new this.rx.Subject(), 
        	volume: new this.rx.Subject()
        } 

	}

	// Initialize SounManager2 lib
	init(){

		var _self = this

		if(typeof soundManager === 'undefined') {
            alert('Please include SoundManager2 Library!');
        }
        soundManager.setup({
	        preferFlash: false, // prefer 100% HTML5 mode, where both supported
	        debugMode: true, // enable debugging output (this.$log.debug() with HTML fallback)
	        useHTML5Audio: true,
	        onready: function() {
	            //this.$log.debug('sound manager ready!');
	        },
	        ontimeout: function() {
	            alert('SM2 failed to start. Flash missing, blocked or security error?');
	            alert('The status is ' + status.success + ', the error type is ' + status.error.type);
	        },
	        defaultOptions: {
	            // set global default volume for all sound objects
	            autoLoad: false, // enable automatic loading (otherwise .load() will call with .play())
	            autoPlay: false, // enable playing of file ASAP (much faster if "stream" is true)
	          //  flashPollingInterval: 50,
	            from: null, // position to start playback within a sound (msec), see demo
	            loops: 1, // number of times to play the sound. Related: looping (API demo)
	            multiShot: false, // let sounds "restart" or "chorus" when played multiple times..
	            multiShotEvents: false, // allow events (onfinish()) to fire for each shot, if supported.
	            onid3: null, // callback function for "ID3 data is added/available"
	            onload: null, // callback function for "load finished"
	            onstop: null, // callback for "user stop"
	            onfailure: 'nextTrack', // callback function for when playing fails
	            onpause: null, // callback for "pause"
	            onplay: null, // callback for "play" start
	            onresume: null, // callback for "resume" (pause toggle)
	            position: null, // offset (milliseconds) to seek to within downloaded sound.
	            pan: 0, // "pan" settings, left-to-right, -100 to 100
	            stream: true, // allows playing before entire file has loaded (recommended)
	            to: null, // position to end playback within a sound (msec), see demo
	            type: 'audio/mp3', // MIME-like hint for canPlay() tests, eg. 'audio/mp3'
	            usePolicyFile: false, // enable crossdomain.xml request for remote domains (for ID3/waveform access)
	            volume: this.volume, // self-explanatory. 0-100, the latter being the max.
	            whileloading: function() {
	                
	                // Check buffering progress
	                var trackLoaded = ((this.bytesLoaded/this.bytesTotal)*100)
	                var now = new Date()
					
					// Only update progress every 500 millisencons
	                if ( (now - _self.lastProgressLoadedTime) >= 500 ) {
	                	// Only update progress if new value is diferent
	                	if (_self.loadedProgress != trackLoaded) {
		                	_self.lastProgressLoadedTime = now
		                	_self.updateSubjectData('loadedProgress', trackLoaded, true)
		                }
	                }	                
	            },
	            whileplaying: function() {
	                _self.currentTrack = this.id;

	                var progress = ((this.position / this.duration) * 100)
	                var now = new Date()

	                // Only update progress every 100 millisencons
	                if ( (now - _self.lastProgressTime) >= 100 ) {
	                	// Only update progress if new value is diferent
	                	if (_self.trackProgress != progress) {
		                	_self.lastProgressTime = now
		                	_self.updateSubjectData('trackProgress',progress, true)

		                	_self.updateSubjectData('position', this.position / 1000) // in seconds
	                		_self.updateSubjectData('duration', this.duration / 1000) // in seconds
		                }
	                }
	               
	                //broadcast track position
	                //_self.$rootScope.$broadcast('currentTrack:position', this.position);
	                //broadcast track duration
	                //_self.$rootScope.$broadcast('currentTrack:duration', this.duration);
	                
	            },
	            onfinish: function() {
	                soundManager._writeDebug(this.id + ' finished playing');
	                if(_self.autoPlay === true) {
	                    //play next track if autoplay is on
	                    //get your angular app
	                    var elem = angular.element(document.body);
	                    //get the injector.
	                    var injector = elem.injector();
	                    //get the service.
	                    var $sm2Player = injector.get('$sm2Player');
	                    $sm2Player.nextTrack();
	                    //_self.updateSubjectData('currentTrackData', _self.getCurrentTrackData())
	                    //$sm2Player.$rootScope.$broadcast('track:id', $sm2Player.currentTrack);
	                }
	            }
	        }
	    });
	    soundManager.onready( (function() {
	        console.log('song manager ready!');
	        // Ready to use; soundManager.createSound() etc. can now be called.
	        var isSupported = soundManager.ok();
	        console.log('is supported: ' + isSupported);
	        //this.$rootScope.$broadcast('player:ready', true);
	    }).bind(this));
	}

	/**
     * To check if value is in array
     */
	isInArray(array, value) {
	    for(var i = 0; i < array.length; i++) {
	        if(array[i].id === value) {
	            return i;
	        }
	    }
	    return false;
    }

    /**
     * getIndexByValue used by this factory
     */
    getIndexByValue(array, value) {
        for(var i = 0; i < array.length; i++) {
            if(array[i] === value) {
                return i;
            }
        }
        return false;
    }

    /**
     * asyncLoop used by this factory
     */
    asyncLoop(o) {
        var i = -1;
        var loop = function() {
            i++;
            if(i == o.length) {
                o.callback();
                return;
            }
            o.functionToLoop(loop, i);
        };
        loop(); //init
    }

    setCurrentTrack(key) {
        this.currentTrack = key;
    }

    getCurrentTrack() {
        return this.currentTrack;
    }

    getCurrentTrackData() {
        var trackId = this.getCurrentTrack();
        var currentKey = this.isInArray(this.playlist, trackId);
        return this.playlist[currentKey];
    }

    getPlaylist(key) {
        if(typeof key === 'undefined') {
            return this.playlist;
        } else {
            return this.playlist[key];
        }
    }

    addToPlaylist(track) {
        this.playlist.push(track);
        //broadcast playlist
        //this.$rootScope.$broadcast('player:playlist', this.playlist);
    }

    isTrackValid(track) {
        if (typeof track == 'undefined') {
            console.log('invalid track data');
            return false;
        }

        if (track.url.indexOf("soundcloud") > -1) {
            //if soundcloud url
            if(typeof track.url == 'undefined') {
                console.log('invalid soundcloud track url');
                return false;
            }
        } else {
            if(soundManager.canPlayURL(track.url) !== true) {
                console.log('invalid song url');
                return false;
            }
        }
    }

    addTrack(track) {
        //check if track itself is valid and if its url is playable
        if (!this.isTrackValid) {
            return null;
        }

        //check if song already does not exists then add to playlist
        var inArrayKey = this.isInArray(this.getPlaylist(), track.id);
        if(inArrayKey === false) {
            //$log.debug('song does not exists in playlist');
            //add to sound manager
            soundManager.createSound({
                id: track.id,
                url: track.url
            });
            //add to playlist
            this.addToPlaylist(track);
        }
        return track.id;
    }

    removeSong(song, index) {
        //if this song is playing stop it
        if(song === this.currentTrack) {
            this.stop();
        }
        //unload from soundManager
        soundManager.destroySound(song);
        
        //remove from playlist
        this.playlist.splice(index, 1);
        //once all done then broadcast
        //this.$rootScope.$broadcast('player:playlist', this.playlist);
    }

    initPlayTrack(trackId, isResume) {
        if(isResume !== true) {
            //stop and unload currently playing track
            this.stop();
            //set new track as current track
            this.setCurrentTrack(trackId);
        }
        //play it
        soundManager.play(trackId);
        //set as playing
        this.updateSubjectData('isPlaying', true, true)
        this.updateSubjectData('currentTrackData', this.getCurrentTrackData())
        this.updateSubjectData('isActive', true, true)
        //this.setActive(true)
        //this.$rootScope.$broadcast('music:isActive', this.isActive);
    }

    play() {
        var trackToPlay = null;
        //check if no track loaded, else play loaded track
        if(this.getCurrentTrack() === null) {
            if(soundManager.soundIDs.length === 0) {
                console.log('playlist is empty!');
                return;
            }
            trackToPlay = soundManager.soundIDs[0];
            this.initPlayTrack(trackToPlay);
        } else {
            trackToPlay = this.getCurrentTrack();
            this.initPlayTrack(trackToPlay, true);
        }
    }

    pause() {
        soundManager.pause(this.getCurrentTrack());
        //set as not playing
        this.updateSubjectData('isPlaying', false, true)
        //this.isPlaying = false;
        //this.$rootScope.$broadcast('music:isPlaying', this.isPlaying);

    }

    stop() {
        //first pause it
        this.pause();
        this.resetProgress()
        this.updateSubjectData('duration', 0)
        //this.$rootScope.$broadcast('currentTrack:position', 0);
        //this.$rootScope.$broadcast('currentTrack:duration', 0);
        soundManager.stopAll();
        soundManager.unload(this.getCurrentTrack());
        this.updateSubjectData('isActive', false, true)
        //this.$rootScope.$broadcast('music:isActive', this.isActive);

    }

    playTrack(trackId) {
        this.initPlayTrack(trackId);
    }

    nextTrack() {
        if(this.getCurrentTrack() === null) {
            console.log("Please click on Play before this action");
            return null;
        }

        // use shuffle track list if shuffle is true
        var useTrack = angular.copy(soundManager.soundIDs);                
        if(this.getShuffleStatus() === true){
            useTrack = this.tempTrack;
        }

        var currentTrackKey = this.getIndexByValue(useTrack, this.getCurrentTrack());
        var nextTrackKey = +currentTrackKey + 1;
        var nextTrack = useTrack[nextTrackKey];
        if(this.repeatTrack === true) {
            this.playTrack(useTrack[currentTrackKey]);
        } else if(typeof nextTrack !== 'undefined') {
            this.playTrack(nextTrack);
        } else {
            // generate shuffle track list
            if(this.getShuffleStatus() === true && this.isPlaying === true){
                this.tempTrack = angular.copy(soundManager.soundIDs);
                this.tempTrack = (this.tempTrack).sort(function() { return 0.5 - Math.random(); });
                //this.$rootScope.$broadcast('music:tempTrack', this.tempTrack);
            }

            //if no next track found
            if(this.repeat === true) {
                //start first track if repeat is on
                this.playTrack(useTrack[0]);
            } else {
                //breadcase not playing anything
                this.updateSubjectData('isPlaying', false, true)
                //this.isPlaying = false;
                //this.$rootScope.$broadcast('music:isPlaying', this.isPlaying);
                this.updateSubjectData('isActive', true, true)
                //this.setActive(true)
                //this.$rootScope.$broadcast('music:isActive', this.isActive);
            }
        }
    }

    prevTrack() {
        if(this.getCurrentTrack() === null) {
            console.log("Please click on Play before this action");
            return null;
        }

        // use shuffle track list if shuffle is true
        var useTrack = angular.copy(soundManager.soundIDs);
        if(this.getShuffleStatus() === true){                    
            useTrack = tempTrack;
        }

        var currentTrackKey = this.getIndexByValue(useTrack, this.getCurrentTrack());
        var prevTrackKey = +currentTrackKey - 1;
        var prevTrack = useTrack[prevTrackKey];
        if(typeof prevTrack !== 'undefined') {
            this.playTrack(prevTrack);
        } else {
            console.log('no prev track found!');
        }
    }

    mute() {
        if(this.getMuteStatus() === true) {
            soundManager.unmute();
        } else {
            soundManager.mute();
        }
        //this.$rootScope.$broadcast('music:mute', this.getMuteStatus());
    }

    getMuteStatus() {
        return soundManager.muted;
    }

    repeatToggle() {
        if(this.getRepeatStatus() === true) {
            this.repeat = false;
        } else {
            this.repeat = true;
            this.repeatTrack = false;
            //this.$rootScope.$broadcast('music:repeatTrack', this.getRepeatTrackStatus());
        }
        //this.$rootScope.$broadcast('music:repeat', this.getRepeatStatus());
    }

    getRepeatStatus() {
        return this.repeat;
    }

    repeatTrackToggle() {
        if(this.getRepeatTrackStatus() === true) {
            this.repeatTrack = false;
        } else {
            this.repeatTrack = true;
            this.repeat = false;
            //this.$rootScope.$broadcast('music:repeat', this.getRepeatStatus());
        }
        //this.$rootScope.$broadcast('music:repeatTrack', this.getRepeatTrackStatus());
    }

    getRepeatTrackStatus() {
        return repeatTrack;
    }

    shuffleToggle() {
        if(this.getShuffleStatus() === true) {
            this.shuffle = false;
            tempTrack = angular.copy(soundManager.soundIDs);
        } else {
            this.shuffle = true;
            this.tempTrack = angular.copy(soundManager.soundIDs);
            this.tempTrack = (tempTrack).sort(function() { return 0.5 - Math.random(); });
        }
        //this.$rootScope.$broadcast('music:shuffle', this.getShuffleStatus());
        //this.$rootScope.$broadcast('music:tempTrack', this.tempTrack);
    }

    getShuffleStatus() {
        return this.shuffle;
    }

    playShuffle(){
        var trackToPlay = null;
        this.shuffle = true;
        this.tempTrack = angular.copy(soundManager.soundIDs);
        this.tempTrack = (this.tempTrack).sort(function() { return 0.5 - Math.random(); });
        //this.$rootScope.$broadcast('music:shuffle', this.getShuffleStatus());
        //this.$rootScope.$broadcast('music:tempTrack', this.tempTrack);

        if(this.tempTrack.length === 0) {
            console.log('playlist is empty!');
            return;
        }
        trackToPlay = this.tempTrack[0];
        this.initPlayTrack(trackToPlay);
    }

    getVolume() {
        return this.volume;
    }

    adjustVolume(increase) {
        var changeVolume = function(volume) {
            for(var i = 0; i < soundManager.soundIDs.length; i++) {
                var mySound = soundManager.getSoundById(soundManager.soundIDs[i]);
                mySound.setVolume(volume);
            }
            //this.$rootScope.$broadcast('music:volume', this.volume);
        };
        if(increase === true) {
            if(this.volume < 100) {
                this.volume = this.volume + 10;
                changeVolume(this.volume);
            }
        } else {
            if(this.volume > 0) {
                this.volume =this. volume - 10;
                changeVolume(this.volume);
            }
        }
    }

    adjustVolumeSlider(value) {
        var changeVolume = function(volume) {
            for(var i = 0; i < soundManager.soundIDs.length; i++) {
                var mySound = soundManager.getSoundById(soundManager.soundIDs[i]);
                mySound.setVolume(volume);
            }
            //this.$rootScope.$broadcast('music:volume', this.volume);
        };
        changeVolume(value);
        this.updateSubjectData('volume', value)
    }

    clearPlaylist(callback) {
        console.log('clear playlist');
        this.resetProgress();
        //unload and destroy soundmanager sounds
        var smIdsLength = soundManager.soundIDs.length;
        this.asyncLoop({
            length: smIdsLength,
            functionToLoop: function(loop, i) {
                setTimeout(function() {
                    //custom code
                    soundManager.destroySound(soundManager.soundIDs[0]);
                    //custom code
                    loop();
                }, 0);
            },
            callback: (function() {
                //callback custom code
                console.log('All done!');
                //clear playlist
                this.playlist = [];
                //this.$rootScope.$broadcast('player:playlist', this.playlist);
                //this.setActive(true)
                this.updateSubjectData('isActive', true, true)
                //this.$rootScope.$broadcast('music:isActive', this.isActive);
                callback(true);
                //callback custom code
            }).bind(this)
        });
    }

    resetProgress() {
        this.updateSubjectData('trackProgress', 0, true)
 		this.updateSubjectData('position', 0)
    }

    isLastTrack() {
        // use shuffle track list if shuffle is true
        var useTrack = angular.copy(soundManager.soundIDs);                
        if(this.getShuffleStatus() === true){
            useTrack = this.tempTrack;
        }
        var currentTrackKey = this.getIndexByValue(useTrack, this.getCurrentTrack());
        if(this.getRepeatStatus() === false && (this.getPlaylist()).length == currentTrackKey+1 ) {
            return true;
        }
        return false;
    }

    setPosition(value) {
        var sound = soundManager.getSoundById(this.getCurrentTrack());
        sound.setPosition(value*1000); // Convert to milliseconds
    }

    getDuration() {
        var sound = soundManager.getSoundById(this.getCurrentTrack());
        return sound.duration / 1000; // in seconds
    }

    getProgress(){
    	return this.trackProgress
    }

    getPlaying(){
    	return this.isPlaying;
    }	

    getActive(){
    	return this.isActive
    }

    getLoadedProgress(){
    	return this.loadedProgress
    }

    // Update data subject field and send new value to subscriptors
    updateSubjectData(field, value, updateValue){
    	if (updateValue){
    		this[field] = value
    	}
    	this.subjects[field].onNext(value) 
    }

}

export default Sm2PlayerService