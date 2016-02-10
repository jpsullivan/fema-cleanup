var player = new MediaElementPlayer('audio', {
    audioWidth: 0,
    features: [], 
    success: function (mediaElement, domObject) {}
});

var audioOn = true;
	var audioSrc = '';
	function playSoundClip(path)
	{
		player.pause();
		audioSrc = path;
		player.setSrc(audioSrc);		
		if (audioOn)
		{
			player.play();
		}
	}
	function audioToggle(toggleAnchor)
	{
		if (audioOn)
		{
			player.pause();
			audioOn = false;
			$(toggleAnchor).html('Turn Audio On');
		}
		else
		{
			audioOn = true;
			$(toggleAnchor).html('Turn Audio Off');
			if (audioSrc.length > 0)
			{
				player.play();
			}
		}
	}