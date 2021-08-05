const vm = new Vue({
    el : "#wrap",
    data : {
        currentSong : '', //搜索的歌曲名称
        isShowLogo : true,  //是否展示图片
        songList : {},  // 搜索结果
        songUrl : '',   // 播放歌曲的url；
        songImg : "",
        isPlaying : true,  //是否在播放
        commentList : [],  //评论列表
        videoUrl : '',  // 视频链接
        showVideo : false,
        lyricIndex  : '',
        currentMusicLyric : {
            // "0": " 作词 : 花粥\n",
            // "1": " 作曲 : 花粥\n",
            // "15": "余音袅袅我看了太多热闹\n",
            // "18": "看一尘不染的白纸都变得浮躁\n",
            // "21": "善者寥寥在泥沼之中煎熬\n",
            // "24": "而置身事外的君子在一旁冷笑\n",
            // "27": "没完没了的暗箭持续叫嚣\n",
            // "31": "怕没人注意到他们得意着作妖\n",
            // "34": "纷纷扰扰这人间缺个公道\n",
            // "37": "我辞三界 别五行自顾去逍遥\n",
            // "41": "此去必经年 荒野寒暑换红颜\n",
            // "47": "往事散云烟 十寸光阴换一钱\n",
            // "53": "只身山水间 耳不闻恶语闲言\n",
            // "60": "举头问苍天 何时得以赴黄泉\n",
            // "93": "走走停停又逛了几个世纪\n",
            // "96": "看川流不息灯红酒绿变成孤寂\n",
            // "99": "战战兢兢的人们未曾怀疑\n",
            // "102": "在此地荣华富贵是唯一的真理\n",
            // "105": "机关算尽后徒留一地黄金\n",
            // "108": "那冢里枯骨不得安息无人在意\n",
            // "112": "夜色降临时落下一声叹息\n",
            // "115": "我乘兴来 败兴去也乐得随意\n",
            // "131": "此去必经年 荒野寒暑换红颜\n",
            // "138": "往事散云烟 十寸光阴换一钱\n",
            // "144": "只身山水间 耳不闻恶语闲言\n",
            // "151": "举头问苍天 何时得以赴黄泉\n",
            // "157": "此去必经年 荒野寒暑换红颜\n",
            // "164": "往事散云烟 十寸光阴换一钱\n",
            // "170": "只身山水间 耳不闻恶语闲言\n",
            // "177": "举头问苍天 何时得以赴黄泉\n",
            // "183": "制作人：陈伟伦\n",
            // "185": "监制：王晨雨@S.A.G\n",
            // "186": "编曲／小号：陈伟伦\n",
            // "188": "贝斯：张子涵@S.A.G\n",
            // "190": "和声：陈伟伦／花粥\n",
            // "191": "录音师：伊乐其@S.A.G\n",
            // "193": "混音师：姜北生@S.A.G\n",
            // "194": "母带工程师：姜北生@S.A.G\n",
            // "196": "录音棚：S.A.G录音棚\n",
            // "197": "版权：北京博生兄弟文化传播有限公司（S.A.G)\n"
        },
    },  
    methods : {
        // 搜索功能
        searchSong : function () {
            var that = this
            axios.get('https://autumnfish.cn/search?keywords=' + this.currentSong).then(function(res){
                // console.log(`res`, res)
                that.songList = res.data.result.songs;
            }).catch(function(error){
                console.log(`err`, error)
            })
        },
        // 播放功能
        playAudio : function (songId) {
            var that = this ;
            axios.get('https://autumnfish.cn/song/url?id=' + songId).then(function(res){
                // console.log(res.data.data[0].url)
                that.songUrl = res.data.data[0].url;
            }).catch(function(err){
                console.log(`err`, err)
            })
            this.isShowLogo = true;
            // 点击播放音乐之后去获取当前音乐的封面
            this.getImg(songId);
            // 点击播放音乐之后，去获取评论
            this.getComments(songId)
            // 点击播放音乐之后，去获取歌曲id
            this.getSongInfo(songId)
        },
        // 中部图片对应
        getImg : function (songId){
            var that = this;
            axios.get('https://autumnfish.cn/song/detail?ids=' + songId).then(function (res) {
                // console.log(`res`, res)
                // console.log(res.data.songs[0].al.picUrl)
                that.songImg = res.data.songs[0].al.picUrl
            }).catch(function (err){
                console.log(`err`, err)
            })
        },
        // 获取评论
        getComments : function (songId) {
            var that = this;
            axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + songId).then(function (res) {
                // console.log(`res`, res)
                that.commentList = res.data.hotComments
            }).catch(function(err){
                console.log(`err`, err)
            })
        },
        onPause : function () {
            this.isPlaying = false;
        },
        onPlay : function(){
            this.isPlaying = true
        },
        // 播放视频
        playVideo : function (id) {
            var that = this;
            axios.get('https://autumnfish.cn/mv/url?id=' + id).then(function(res){
                // console.log(`res`, res)
                that.videoUrl = res.data.data.url;
                that.showVideo = true
            }).catch(function(err){
                console.log(`err`, err)
            })
            // 在点击播放视频的时候，需要去停止音乐的播放
            // 调用参数让图片停止旋转
            that.isPlaying = false,
            // 调用函数，暂停播放音乐
            that.$refs["audioDom"].pause();
        },
        stopPlay : function (){
            this.videoUrl = '';
            this.showVideo = false;
            this.$refs["audioDom"].play();
        },
        getSongInfo :function (id) {
            var that = this
            axios.get('https://autumnfish.cn/lyric?id=' + id).then(function(res){
                // console.log(res.data.lrc.lyric);
                let lyricArr = res.data.lrc.lyric.split('[').slice(1); // 先以[进行分割
                let lrcObj = {};
                lyricArr.forEach(item => {
                    let arr = item.split(']');	// 再分割右括号
                    // 时间换算成秒
                    let m = parseInt(arr[0].split(':')[0])
                    let s = parseInt(arr[0].split(':')[1])
                    arr[0] = m*60 + s;
                    if (arr[1] != '\n') { // 去除歌词中的换行符
                        lrcObj[arr[0]] = arr[1];
                    }
                })
                // 存储数据
                that.currentMusicLyric = lrcObj;
            }).catch(function(err){
                console.log(`err`, err)
            })
        },
        updateTime : function (el) {
            // console.log(el.target.currentTime)
            let currentTime = Math.floor(el.target.currentTime);
            // console.log(currentTime);
            let i = 0;
            for(let key in this.currentMusicLyric){
                if(+key == currentTime){
                    console.log(`key`, key)
                    this.lyricIndex = i;
                    if(i >= 5 && !this.isShowLogo){  //开始滚动
                        // 判断当前是否处于歌词区域
                        this.$refs.lyric.scrollTop = 40 *(i -5);
                    }
                }
                i ++;
            }
            
        }
    }
})