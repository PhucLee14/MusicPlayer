const $ = document.querySelector.bind(document);
        const $$ = document.querySelectorAll.bind(document);

        const playingBtn = $('.playing');
        const playerBtn = $('.player');
        const heading = $('.song-infor h2');
        const headingSinger = $('.song-infor h3');

        const cd = $('.cd');
        const cdThumb = $('.cd-thumb');
        const playBtn = $('.btn-play');
        const nextBtn = $('.btn-next');
        const preBtn = $('.btn-pre');
        const repeatBtn = $('.btn-repeat');

        const progress = $('.progress');
        const volumeCurrent = $('.volume');
        const audio = $('#audio');
        const volumeBtn = $('.volume-btn');

        const playlist = $('.playlist');

        const app = {
            currentIndex: 0,
            isMute: false,
            isPLaying: false,
            isRepeat: false,
            songs: [
                {
                    name: 'Tôi Là Ai Trong Em',
                    singer: 'Hoàng Dũng',
                    path: './songs/Tôi Là Ai Trong Em  Hoàng Dũng Official Lyrics Video.mp3',
                    img: './img/ToiLaAiTrongEm.png',
                },
                {
                    name: 'Hẹn Một Mai',
                    singer: 'Bùi Anh Tuấn',
                    path: './songs/Hẹn một mai  Bùi Anh Tuấn.mp3',
                    img: './img/BAT.jpg',
                },
                {
                    name: 'Anh Thương Em Nhất Mà',
                    singer: 'La. x Log x Tib',
                    path: './songs/Anh Thương Em Nhất Mà  Lã x Log x TiB  OFFICIAL.mp3',
                    img: './img/atenm.jpg',
                },
                {
                    name: 'Nơi Này Có Anh',
                    singer: 'SON TUNG MTP',
                    path: './songs/NƠI NÀY CÓ ANH  OFFICIAL MUSIC VIDEO  SƠN TÙNG MTP.mp3',
                    img: './img/nnca.jpg',
                },
                {
                    name: 'Nơi Tình Yêu Kết Thúc',
                    singer: 'Bùi Anh Tuấn',
                    path: './songs/y2mate.com - Nơi Tình Yêu Kết Thúc  lyric video   Bùi Anh Tuấn.mp3',
                    img: './img/BAT.jpg',
                },
                {
                    name: 'Yêu Người Có Ước Mơ',
                    singer: 'buitruonglinh',
                    path: './songs/Yêu Người Có Ước Mơ  buitruonglinh.mp3',
                    img: './img/yncum.jpg',
                },
                {
                    name: 'Chỉ Một Đêm Nữa Thôi',
                    singer: 'RPT MCK ft Tlinh',
                    path: './songs/06 Chỉ Một Đêm Nữa Thôi  RPT MCK  ft tlinh    99  the album.mp3',
                    img: './img/mck.jpg',
                },
                {
                    name: 'Thôi Em Đừng Đi',
                    singer: 'RPT MCK  ft Trung Trần',
                    path: './songs/07 Thôi Em Đừng Đi  RPT MCK  ft Trung Trần    99  the album.mp3',
                    img: './img/mck.jpg',
                },
                {
                    name: 'Cuốn Cho Anh Một Điếu Nữa Đi',
                    singer: 'RPT MCK',
                    path: './songs/09 Cuốn Cho Anh Một Điếu Nữa Đi  RPT MCK   99  the album.mp3',
                    img: './img/mck.jpg',
                },
                {
                    name: 'Anh Đã Ổn Hơn',
                    singer: 'RPT MCK',
                    path: './songs/14 Anh Đã Ổn Hơn  RPT MCK  99 the album.mp3',
                    img: './img/mck.jpg',
                },
                {
                    name: 'Thờ Er',
                    singer: '16 BrT ft RPT MCK',
                    path: './songs/Thờ er remix  BrT ft MCK  Prod by Snowz.mp3',
                    img: './img/mck.jpg',
                },
            ],
            
            render: function() {
                const htmls = this.songs.map((song, index) => {
                    return `
                    <div class="song ${index === this.currentIndex ? 'active' :''}" data-index = "${index}">
                        <div class="thumb">
                            <img src="${song.img}" alt="">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fa-solid fa-ellipsis"></i>
                        </div>
                    </div>
                    `
                })
                playlist.innerHTML = htmls.join("");
            },

            defineProperties: function() {
                Object.defineProperty(this,'currentSong', {
                    get: function() {
                        return this.songs[this.currentIndex];
                    }
                });
            },

            nextCurrentSong: function() {
                this.currentIndex++;
                if(this.currentIndex >= this.songs.length) {
                    this.currentIndex = 0;
                }
                this.loadCurrentSong();
            },
            preCurrentSong: function() {
                this.currentIndex--;
                if(this.currentIndex < 0) {
                    this.currentIndex = this.songs.length - 1;
                }
                this.loadCurrentSong();
            },

            handleEvents: function() {
                //Xử lí phóng to thu nhở CD
                const cdWidth = cd.offsetWidth;
                const _this= this;
                //Xử lí CD quay/dừng

                const cdThumbAnimate = cdThumb.animate([
                    {transform: 'rotate(360deg)'}
                ], {
                    duration: 10000,
                    iterations: Infinity
                })
                cdThumbAnimate.pause();

                //Xử lí thu phóng CD
                document.onscroll = function() {
                    const scrollTop = window.scrollY;
                    const newcdWidth = cdWidth - scrollTop;

                    cd.style.width = newcdWidth > 0 ? newcdWidth + "px" : 0
                    cd.style.opacity = newcdWidth / cdWidth;
                }

                //Xử lí khi click play
                playBtn.onclick = function() {
                    if(_this.isPLaying) {
                        audio.pause();
                    }
                    else {
                        audio.play();
                    }
                }

                //Xử lí audio chạy
                audio.onplay = function() {
                    _this.isPLaying = true;
                    playerBtn.classList.add('playing');
                    cdThumbAnimate.play();
                }
                
                //Xử lí audio dừng
                audio.onpause = function() {
                    _this.isPLaying = false;
                    playerBtn.classList.remove('playing');
                    cdThumbAnimate.pause();
                }

                //Xử lí chuyển bài
                audio.onended = function() {
                    if(_this.isRepeat) {
                        audio.play();
                    }
                    else {
                        nextBtn.click();
                    }
                }

                //Xử lí chạy thanh progress
                audio.ontimeupdate = function() {
                    if(audio.duration) {
                        const progressPercent  = Math.floor(audio.currentTime * 100 / audio.duration);
                        progress.value = progressPercent;
                    }
                }

                //Xử lí tua
                progress.oninput = function(e) {
                    const seekTime = audio.duration/100 * e.target.value;
                    audio.currentTime = seekTime;
                }

                volume.oninput = function(e) {
                    const currentVolume = volume.value / 100;
                    audio.volume = currentVolume;
                }

                //Chuyển bài tiếp theo
                nextBtn.onclick = function() {
                    _this.nextCurrentSong();
                    audio.play();
                    _this.render();
                }

                //Chuyển bài trước đó
                preBtn.onclick = function() {
                    _this.preCurrentSong();
                    audio.play();
                    _this.render();
                }


                repeatBtn.onclick = function() {
                    _this.isRepeat = !_this.isRepeat;
                    repeatBtn.classList.toggle('active',_this.isRepeat);
                }

                playlist.onclick = function(e) {
                    const songNode = e.target.closest('.song:not(.active)');
                    if(songNode || e.target.closest('.option')) {
                        _this.currentIndex = Number(songNode.dataset.index);
                        _this.loadCurrentSong();
                        _this.render();
                        audio.play();
                    }
                }

                volumeBtn.onclick = function() {
                    
                }
            },

            loadCurrentSong: function() {

                heading.textContent = this.currentSong.name;
                headingSinger.textContent = this.currentSong.singer;
                cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`
                audio.src = this.currentSong.path;

                // console.log(heading, cdThumb, audio);
            },
            
            start: function() {
                //Định nghĩa thuộc tính
                this.defineProperties();

                //Lắng nghe / xử lí sự kiện
                this.handleEvents();

                //Tải thông tin bài hát đầu tiên vào UI
                this.loadCurrentSong();

                //Render playlist
                this.render();
            }
        }

        app.start();