### Callback演進  
[影片連結](https://www.youtube.com/watch?v=lil4YCCXRYc)  
JS的一大核心特色就在於event-driven，撰寫Async code就不可避免層層的callback  
能夠寫出漂亮的Async code，我想這是成為良好的JS程式設計師的第一步  

##### 核心觀念-Push & Pull  
先前一直糾結於Async和Sync程式上的設計，並不是說不會寫async code  
而是每次在思考時切換總是覺得卡卡的，其中最主要的癥結點在於
對於value取得方式的不熟悉(value提供者 Provider與value索取者 Consumer)，也就是Push和Pull兩套機制的差異(詳見影片)    
簡單來說  一般呼叫function所採用的都是Pull機制  
ex. var a = function(val); 我們期待function將值回傳到變數a上，接著我們就會拿變數a繼續執行下面的程式  
所以a是Consumer，function()是Provider，Consumer可以主動要求Provider回傳值，而Provider無法決定何時被呼叫!  
data是位於return position，相當於從Provider中拉(Pull)出來
相對的 使用callback  
ex. readFile(function(file){console.log(file.name)});  
資料的Provider為readFile這個Async function，而Consumer自然是我們定義的callback function  
和Pull機制相反的是，Consumer不能決定何時取得值，此時data是位於augment position，被動的等待Provider執行完成後Push值!  

##### 實戰:Callback hell -> Promise -> Generator -> Async  
程式請參考 /src/async.js，附上[中文參考網頁](http://huli.logdown.com/posts/292655-javascript-promise-generator-async-es6)
使用Babel當作transpiler、RxJS提供Observable並運行在NodeJS v6.x上  
為了模擬出前後互相關聯的Async function，我設立了三個讀取檔案的function  
Callback hell和Promise網路上資料也都非常多，在此不多贅述，不過Promise觀念十分重要  
因為後面幾種也都需要使用Promise  

首先看Generator，在影片中也有介紹，Generator最神奇地方在於 他同時符合push和pull這兩種機制   
在 function* ()中，透過yeild設定每一個中斷點停止的位置，在run()中，透過generator.next()將宣告的Promise pull出來    
接著以Async方式執行完後，將值push回function*()中，接著等待執行下一行    
這真的是太神奇了，你可以自由決定何時call generator.next()，也可以決定要push什麼值回去    
操作的彈性我個人覺得比其他幾種都強大許多!   
相對也比較複雜些，例如說要自己寫run function(也可以用TJ co module)   
觀念也比較難懂，例如說  
```
function* generator(){
  let a = yield promiseA();
  let b = yield promiseB(a);
}  
function run(g){
  let p = g.next(); // {done:"false", "value":promiseA} 取得promiseA  
  p.value.then((r)=>{g.next(r)}) // 此時 a=r ! 如果不斷的 .next，需要另外用一個函式包起來，詳見程式碼    
}  
```  

自己寫 run()實在是很麻煩，所以ES2016推出了 Async，完美的簡化了Generator    
寫Async function根本就變成在寫Sync function一樣，實在是太潮了啊～  
這部分code就蠻簡單直白了，頂多注意一下try{}catch{}   

##### Observable  
前述的Async function最終都只能回傳一個值，就好像是讀取一份文件或是發出一個request，處理完一份後就結束了  
如果需要不斷地回傳值，例如說 addEventListen、listen on socket，就需要新的design pattern，也就是Observable  
[參考資料 官方Manual](http://reactivex.io/rxjs/manual/index.html) 這寫得蠻詳盡且平易近人，看過一遍就大概可以理解  
主要核心是這段話 "ReactiveX combines the Observer pattern with the Iterator pattern and functional programming with collections to fill the need for an ideal way of managing sequences of events."  
簡單來說 rxjs為了處理接二連三的事件，結合了Observer和Iterator design pattern以及函式編程，詳細的[中文介紹](http://blog.techbridge.cc/2016/05/28/reactive-programming-intro-by-rxjs/)    
RxJS有兩大特色：  
1.Observer pattern  
其中有兩大核心角色 Observable和Observer，Observable是data producer，可以是Sync也可以是Async  
Observable可以接受多個Observer，而Observer中定義如何處理Observable回傳的值(分成 next, error, oncomplete三個狀態)  
與前述Async function最大差別是 Observer可以捨棄Observable! 這對於UI面超級重要啊！
例如說 使用者按下某個按鈕，出發了一個http request，但此時使用者跳轉到其它頁面，這時http才剛好response，那此時該如何處置response?  
最好的方法就是不理他！ 再原本的Promise中無法捨棄，可能會造成memory leak，而Observer恰恰可以解決這個問題，我想這也是Angular2採用的原因  
2.Operator  
RxJS定義了大量的Operator，例如說 setTimeout、map、filter，可以完美的與Observable對接，讓處理data更加流暢與簡潔！  
因為太多了，所以還是爬官方manual比較實在   

##### 總結  
強烈建議看完 上附的影片和中英三個介紹網頁，寫Async function真的是樂趣無窮，有很多不同的做法可以實現  
細細品嘗每種做法與JS一步步語法上的演進，真的是太讚啦～
