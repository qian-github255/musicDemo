## 歌曲搜索接口
- 请求地址 :    https://autumnfish.cn/search
- 请求方法 :    get
- 关键字 :      keywords
- 相应内容 :    歌曲对应搜索结果

## 歌曲url获取
- 请求地址 : https://autumnfish.cn/song/url
- 请求方法 ：get
- 请求参数 ：id（歌曲id）
- 相应内容 ：歌曲的url地址

## 歌曲封面获取
- 请求地址 ：https://autumnfish.cn/song/detail 
- 请求方法 : get
- 请求参数 : ids
- 相应内容 : 歌曲详情，包含封面信息

## 热门评论获取
- 请求地址 : https://autumnfish.cn/comment/hot?type=0
- 请求方法 : get
- 请求参数 : id(歌曲id type固定为0)
- 响应内容 : 歌曲的热门评论


## mv获取
- 请求地址 : https://autumnfish.cn/mv/url
- 请求方法 : get
- 请求参数 : id (mvid 为0 的时候代表没有对应mv)
- 响应内容 : mv地址