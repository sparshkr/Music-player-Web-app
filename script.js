document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audioPlayer');
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const nextButton = document.getElementById('nextButton');
    const searchInput = document.getElementById('searchInput');
    const playlist = document.getElementById('playlist');
    const lyricsContainer = document.getElementById('lyrics');
  
    let currentIndex = 0;
    const songs = Array.from(playlist.getElementsByTagName('li'));
  
    function playSong(index) {
      const song = songs[index];
      audio.src = song.dataset.src;
      audio.play();
  
     
      currentIndex = index;
  
      
      displayLyrics('');
  
      
      Array.from(playlist.getElementsByTagName('li')).forEach(function(songItem) {
        songItem.classList.remove('current');
      });
      song.classList.add('current');
    }
  
    function playNextSong() {
      currentIndex = currentIndex + 1;
      if (currentIndex >= songs.length) {
      currentIndex = 0;
      }
      playSong(currentIndex);
    }
  
    function searchSongs() {
      const searchTerm = searchInput.value.toLowerCase();
      songs.forEach(function(song, index) {
        const title = song.dataset.title.toLowerCase();
        const artist = song.dataset.artist.toLowerCase();
        const match = title.includes(searchTerm) || artist.includes(searchTerm);
        song.style.display = match ? 'block' : 'none';
        // if (!match && currentIndex === index) {
        //   alert("Not Found");
        // } 
      });
    }
  
 
    // const currentSong = songs[currentIndex];
    // const artist = currentSong.dataset.artist;
   
    function getLyrics(artist) {
      const lyricsPath = `lyrics/${artist}.txt`;
    
      fetch(lyricsPath)
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error('Lyrics not found.');
          }
        })
        .then(lyrics => {
          displayLyrics(lyrics);
        })
        .catch(error => {
          console.log('Error loading local lyrics:', error);
          displayLyrics('Failed to load lyrics.');
        });
    }
    
    
    
   
    
  
    function displayLyrics(lyrics) {
      lyricsContainer.textContent = lyrics;
    }
  
    playButton.addEventListener('click', function() {
      
      console.log(artist);
      getLyrics(artist);
      audio.play();
    });
  
    pauseButton.addEventListener('click', function() {
      audio.pause();
    });
  
    nextButton.addEventListener('click', function() {
      playNextSong();
    });
  
    searchInput.addEventListener('input', function() {
      searchSongs();
    });
  
    playlist.addEventListener('click', function(event) {
      if (event.target.tagName === 'LI') {
        const songIndex = songs.indexOf(event.target);
        currentIndex = songIndex; 
        console.log(currentIndex);
        const currentSong = songs[currentIndex];
        const artist = currentSong.dataset.artist;
        playSong(songIndex);
        getLyrics(artist);
      }
    });
  
    audio.addEventListener('ended', function() {
      playNextSong();
    });
  
    // playSong(currentIndex);
  });
  