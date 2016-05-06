### 關於NodeJS - CallBack / Async ....  
常常會說NodeJS是Single Thread , Asynchronise，又常常會與CallBack搞混在一次，有時我也搞得一頭霧水，今天看了這支影片才開始真正了解NodeJS在Runtime時的表現。[影片連結](https://www.youtube.com/watch?v=8aGhZQkoFbQ)   
對應的測試程式參考Async.js  

首先重要的是 Async 概念，這裡指的Async專指 Asynchronise I/O，例如AJAX、處理Url Request、DB Connection等，因為I/O操作需要耗費大量時間，所以透過Async機制可以降低浪費的時間，但是在Runtime , V8又如何實現這項機制呢？  

##### JS Runtime
以下是從影片中截圖筆記，如有疑慮煩請聯繫，會馬上刪除!
首先可以看到V8跟其他語言的Runtime類似，都有個Heap管理動態記憶體、Stack保留目前Function Status，執行方式一樣是從Stack push(function call) 和 pop(function return)  
![圖一](https://github.com/sj82516/Blog/blob/master/%E9%9B%9C%E8%A8%98/Ascyn%26CallBack/%08as1.jpg)  
如果發生了Async function call，則會由Web apis管理，等到發生Callback送到Callback Queue，有趣的是Callback Queue的task 必須等 stack完全清空後才會處理! 如果你在 main function還有處理大量複雜的函示 block thread，那Callback就遙遙無期了(exam 1)   
![圖二](https://github.com/sj82516/Blog/blob/master/%E9%9B%9C%E8%A8%98/Ascyn%26CallBack/as2.jpg)     

##### Asynchronous
延續上述JS Runtime的話題，Node JS著名的是Single-Thread，但矛盾的是Async Function說不會block住thread，那Async function又是怎麼被執行的呢？   
這個問題困擾了我好久，終於在今天找出了答案。  
[Youtube 影片連結](https://www.youtube.com/watch?v=frn-h5Hz8i8&index=1&list=PLrhD_4zbYcPPAKv5EoWIDwSjsSoc_Otcr)  
[Stack Overflow](http://stackoverflow.com/questions/22644328/when-is-the-thread-pool-used)  
![重點截圖](https://github.com/sj82516/Blog/blob/master/%E9%9B%9C%E8%A8%98/Ascyn%26CallBack/%08as3.jpg)   
NodeJS App跑在Main Thread上，如果遇到Async Function(連同Callback)Push到Event Queue上，此時Event Loop(在這裡面都是Sync!) 會向 Worker Thread Pool所求Thread執行程式，完成後調用Callback，如果Callback還是Async則重新進入Event Queue中，反之返回Main Thread。   

所以說NodeJS是Single Thread只能說過度簡化，它利用[libuv](https://github.com/libuv/libuv)(C library)實現multi-thread的控管，並將此封裝，所以使用者在編寫程式時完全不需要理解Event loop和Thread Pool，就可以寫出高效的Non-Blocking Code。   

我目前查到兩個方法    
1.使用event emit[stack-overflow問題連結](http://stackoverflow.com/questions/17740988/write-async-function-with-eventemitter)  
自己創建Event emitter，可以註冊事件插入Event Queue中，在特定情況下決定觸發，值得注意是Event.emit(function())中是Sync。  
2.使用setImmediate和nextTick：  
其中setImmediate是將該function插入Event queue的最後，完成後依序調用；
使用nextTick則會直接插在Event queue的最前方，所以整個Event queue會等nextTick的Callback結束才繼續，所以如果callback很耗CPU time，會有blocking I/O的疑慮；但是另一個好處是可以處理偽Async的問題，細節請參考此[文章](https://howtonode.org/understanding-process-next-tick)   
官網 Note: the nextTick queue is completely drained on each pass of the event loop before additional I/O is processed. As a result, recursively setting nextTick callbacks will block any I/O from happening, just like a while(true); loop.   
[CNode深度分析文](https://cnodejs.org/topic/4f16442ccae1f4aa2700109b)      
3.使用C/C++ Addons 
詳細參考[官網](https://nodejs.org/api/addons.html)，可以直接調用libuv，這部分我就暫時不多研究了XD

##### Callback  
就我的理解是 將functionA以變數形式傳遞，讓接收functionA的functionB可以決定何時執行functionB，之所以取名為Callback回呼是因為常搭配Async function，當I/O "Callback"時該執行的動作(defined in functionB)  
[參考資料](http://stackoverflow.com/questions/19739755/nodejs-callbacks-simple-example)  
寫出漂亮的Callback需要一些技巧，在[影片中](https://www.youtube.com/watch?v=obaSQBBWZLk&index=4&list=PLrhD_4zbYcPOiXLz01FP2hrosVDfZKTgj)提到四種撰寫callback的境界
1.使用原生callback function層層緊扣  
2.將function獨立宣告，稍微modulize  
3.使用Promise  
4.ES2015新功能 generator  
四種作用都是一樣的，差別在於寫出來的程式碼易讀性與否，詳見範例。    
