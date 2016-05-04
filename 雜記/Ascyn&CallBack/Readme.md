### 關於NodeJS - CallBack / Async ....  
常常會說NodeJS是Single Thread , Asynchronise，又常常會與CallBack搞混在一次，有時我也搞得一頭霧水，今天看了這支影片才開始真正了解NodeJS在Runtime時的表現。[影片連結](https://www.youtube.com/watch?v=8aGhZQkoFbQ)  

首先重要的是 Async 概念，這裡指的Async專指 Asynchronise I/O，例如AJAX、處理Url Request、DB Connection等，因為I/O操作需要耗費大量時間，所以透過Async機制可以降低浪費的時間，但是在Runtime , V8又如何實現這項機制呢？  

以下是從影片中截圖筆記，如有疑慮煩請聯繫，會馬上刪除!
首先可以看到V8跟其他語言的Runtime類似，都有個Heap管理動態記憶體、Stack保留目前Function Status，執行方式一樣是從Stack push(function call) 和 pop(function return)  
![圖一](https://github.com/sj82516/Blog/blob/master/%E9%9B%9C%E8%A8%98/Ascyn%26CallBack/%08as1.jpg)  
如果發生了Async function call，則會由Web apis管理，等到發生Callback送到Callback Queue，有趣的是Callback Queue的task 必須等 stack完全清空後才會處理! 如果你在 main function還有處理大量複雜的函示 block thread，那Callback就遙遙無期了(exam 1) 
![圖二](https://github.com/sj82516/Blog/blob/master/%E9%9B%9C%E8%A8%98/Ascyn%26CallBack/as2.jpg)   
至於Web apis如何處理setTimeout和AJAX Async Call這目前我還不知道，持續搜尋中....  

大多數看到的Async Function都是原生Library提供，著名的Async.js也只是重新封裝Callback以利於版面整潔，究竟能否自己撰寫Async Function呢？  
我目前查到一個方法和一個我原本以為正確的方法(=>錯的)  
1.錯誤觀念-使用event emit[stack-overflow問題連結](http://stackoverflow.com/questions/17740988/write-async-function-with-eventemitter)  
裡頭回答到 使用event emit和on只是將callback function先存在array中，等到呼叫後才一一執行，所以整個Event是Sync的。  
2.正確方法-使用setImmediate和nextTick  
  
