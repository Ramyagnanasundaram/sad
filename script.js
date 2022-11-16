// Mythium Archive: https://archive.org/details/mythium/

jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'download'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/everything_202211/Sad/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Netru-Aval-Irundhal",
                "duration": "2:46",
                "file": "Netru-Aval-Irundhal"
            }, {
                "track": 2,
                "name": "Nee-Tholaindhaayo",
                "duration": "8:30",
                "file": "Nee-Tholaindhaayo.mp3"
            }, {
                "track": 3,
                "name": "Mudhal-Nee-Mudivum-Nee",
                "duration": "5:01",
                "file": "Mudhal-Nee-Mudivum-Nee-Title-Track-MassTamilan.io"
            }, {
                "track": 4,
                "name": "Kanave-Kanave",
                "duration": "8:31",
                "file": "Kanave-Kanave-MassTamilan.com"
            }, {
                "track": 5,
                "name": "Kadhal-Vaithu",
                "duration": "5:05",
                "file": "Kadhal-Vaithu"
            }, {
                "track": 6,
                "name": "Indru-Netru-Naalai",
                "duration": "2:48",
                "file": "Indru-Netru-Naalai"
            }, {
                "track": 7,
                "name": "Imaye-Imaye",
                "duration": "5:44",
                "file": "Imaye-Imaye"
            }, {
                "track": 8,
                "name": "Ezhu-Velaikkara-Indre",
                "duration": "5:26",
                "file": "Ezhu-Velaikkara-Indre-MassTamilan.com"
            }, {
                "track": 9,
                "name": "Ennodu-Nee-Irundhal",
                "duration": "5:46",
                "file": "Ennodu-Nee-Irundhal"
            }, {
                "track": 10,
                "name": "AEnakenna-Yaarum-Illaye",
                "duration": "5:25",
                "file": "Enakenna-Yaarum-Illaye-(Zingaroe-Remix)-MassTamilan.com"
            
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
                updateDownload(id, audio.src);
            },
            updateDownload = function (id, source) {
                player.on('loadedmetadata', function () {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});