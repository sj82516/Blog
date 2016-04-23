### 關於BDD & TDD  
最近在學撰寫測試檔，使用mocha以及Chai，發現Chai有兩套不同的API但是功能幾乎是大同小異，一套給TDD一套給BDD，所以到底BDD和TDD有何差別呢？   

因為本身沒有太多的開發經驗，主要是收集網路上資料並做簡單的筆記：  
舊有的觀念是先有需求->程式開發->測試，這樣的流程相對來說較難掌握整個開發的速度與流暢，所以有了TDD 先將需求轉為測試檔->開發->重構，一來從測試就可以得知整個專案的方向與架構，也比較可以集中精神在一個個測試的實現上而不容易發散，一般來說TDD的測試檔還是給開發人員看的。  

那BDD則是由使用者角度出發，用直白的方式描述測試檔，使非工程人員也可以掌握，主要注重於使用者需求而非工程實現過程的邏輯，[參考影片](https://www.youtube.com/watch?v=mT8QDNNhExg)，影片中舉例 一個箱子有兩個門，機器人要從左門走到右門，這是Spec，以TDD角度他不單會考慮output是否正確，還會檢測程式內部邏輯的正確性，如果出錯就會一步步設斷點檢查(granularity)，所以說如果今天客戶突然要求修改機器人路徑走法，這樣測試檔就需要大幅度修改；而BDD只考慮到從使用者角度output是否正確，其中內部邏輯就不再另外檢測，最後講者補一個例子 Sorting，我只知道輸入輸出後排序要順序，你用MergeSort或是QuickSort都沒關係。  

簡言之，程式邏輯是個箱子，使用者只知道input與output，TDD會拆開箱子連裡頭都檢查，每個單元都必須要測試，而BDD只專注於output正確性；  
在知乎我看到的一段回應覺得蠻傳神的“BDD的核心价值是体现在正确的对系统行为进行设计，所以它并非一种行之有效的测试方法。它强调的是系统最终的实现与用户期望的行为是一致的、验证代码实现是否符合设计目标。”，  

在Chai的API中，[TDD使用的是assert()](http://chaijs.com/api/assert/)，對NodeJS的assert library做了語法的包裝；[BDD則使用expect和should](http://chaijs.com/api/bdd/)，其中有大量無實際用處的連結語(例如to,be,is,what....)，看起來相對好懂一些。  

當然，使用各種的開發模式都是為了讓程式開發流程加速、Bug更少、更robust等等，所以看到XDite精闢的文章 [返璞歸真 -- 以最適當的方式設計軟體](http://blog.xdite.net/posts/2014/04/28/back-to-basic)，看完只能跪了～ 當然以我這小小咖來說還是踏實的學好基礎再來想遙遠的架構問題。  

參考資料：  
1.http://www.slideshare.net/wantingj/tdd-bdd-47559903  
2.http://chaijs.com/guide/styles/  
3.https://www.zhihu.com/question/20161970  
4.http://www.cnblogs.com/ustbwuyi/archive/2012/10/26/2741223.html  