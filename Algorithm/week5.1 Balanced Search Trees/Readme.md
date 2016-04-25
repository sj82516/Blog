### Binary Search Tree
這章主要講基本的BST以及後續改進的版本，基本的BST可以透過linked list實作，這部分蠻基本的就蠻有多做筆記。  
值得注意的是 刪除功能的實現：  
簡單的方法是將該點的值設為null，但如果要以node層面移除的話需要用Hibbard deletion  
1.no child:直接刪除  
2.1 child: child直接補上  
3.2 child: 為了減少搬移，選擇right child的subtree 的最小值，替換被刪除的node  
Hibbard deletion最大缺點在於會讓樹變得不平衡，worst case會使search,insert等時間複雜度變為linear；  
另外BST遇到由小到大的序列就會變成worst case，為了要讓tree balance，接下來有介紹幾種不同的實作方式。  

2-3 Tree:  
每個node可以儲存2~3個連結，實作方式有點複雜，詳見參考[wiki](https://en.wikipedia.org/wiki/2%E2%80%933_tree)  

Red-Black Tree:  
概念由2-3 Tree演變而來，但是透過更簡單的方式實作，每個Node儲存2個連結，透過儲存顏色 (紅)模擬3 Node，課堂實作的是 Left-leaning Red-Black Tree (LLRB)  
實作上共有幾個主要考量：  
1. 每個值插入後都為紅  
2. 如果右邊紅左邊黑，需要 rotateLeft()  
3. 如果左邊紅且左邊的左邊也是紅， rotateRight()  
4. 左邊紅右邊紅，flipColor() 都變為黑  

B-Tree:  
2-3 Tree進階版，每個Node能儲存的數量為每個Memory page量，ex 1024  
B-Tree主要用於System的讀寫檔案系統中，減少disk到memory的查詢時間。  
詳細參考[wiki](https://zh.wikipedia.org/wiki/B%E6%A0%91)
