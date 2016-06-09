###[Coursera - 普林斯頓算法一&算法二](https://class.coursera.org/algs4partI-010/lecture)
在此筆記上課內容與邊寫的程式碼  
原課程使用Java作為作業語言  
配合自我的學習，改用Javascript(Run on NodeJS v5.1.0)  
測試用mocha  
執行方式 : mocha test*.js  

###總結  
這章主講資料結構以及最基本的Sorting。  
Linked List 和 Array為最基本的組成元素  
Stack(FILO)常用於取代遞迴的迴圈法中，Queue(FIFO)則用於排隊問題上  
Priority Queue(Binary Heap)則用於連續找出最大(小)值->HeapSort，或是儲存連續最大最小值->最大交易問題  
接著是重頭戲 Symbol Tables : 儲存Key-Value  
實作方式主要用BST(Left-Leaning Red Black Tree)以及Hash Tables  
BST常用於資料庫實作/File System；Hash Tables 則用於字典對照 / DNS LookUp / 詞彙搜尋等
