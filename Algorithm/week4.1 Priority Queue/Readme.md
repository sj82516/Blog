### Priority Queue
目的：快速找到最大值與最小值，應用場景例如 transaction problem，找出所有資料中的最大值但是資料又太多無法全部保存在記憶體中。  
API:  
1.insert(Key k)  
2.delMax()  
3.find(N)  
4.isEmpty()  
實作：  
1.unordered linked list:依序把值鍵結起來  
2.ordered array:用陣列儲存，依序排列  
3.binary heap:complete binary tree，使用陣列實作  

binary heap實作：  
1.從array[1]位置開始  
2.用符合階層的方式儲存值  
position p's parent = Math.floor(p/2)  
p'child is at 2 * p & 2 * p+1    
3.插入新值一律從最後一位，接著逐步判斷child值是否比parent值小，如果不是則對換  
如此一來root一定是最大值  
child's value should be less than parent's  
4.將root移掉後，最後一位補上，此時需要重新排序，實作sink()，parent如果小於child則與較大的child對換。  

heapsort實作：  
透過binary heap可以建構簡單快速的heap sort，用同樣的方式儲存資料，接著逐步移除最大值(移到陣列後方)->sink()...，就可以完成sorting  
[參考LC215](https://github.com/sj82516/Blog/blob/master/LeetCode/LC215.md)

進階應用：  
Module dynamics simulation:現在CS大量運用於科學計算中，尤其是資料視覺化模擬部分，最基本的像是模擬粒子運動狀況，基本的碰撞等等，因此如果模擬的粒子量一多，運算的量就會變得十分巨量，基本有兩個做法：  
1.Time Driven Simulation:這是最直覺的，每一段時間計算每個粒子間距，如果碰撞就處理，實作簡單但相對的十分浪費時間，因為如果兩個粒子平行運動完全不會相撞，此時大多數的計算都是多餘的。  
2.Event Driven Simulation：相反的，先透過運算速度與方向，用PQ儲存那些會在近期發生碰撞的粒子，如果時間到發生碰撞後重新計算，更新PQ內的值，這樣就可以省下大量的運算，相對實作也比較複雜。      
