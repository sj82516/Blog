###MergeSort & QuickSort  
#### 一. MergeSort
步驟：將陣列切半，不斷地切，直到剩一個元素後開始合併。  
時間複雜度證明：  
C(N)<= C(N/2)+C(N/2) + N for N>1 with C(1) = 0;   
C(N) = 2*C(N/2) + N = 2*(2*(C(N/4)+N-1) + N   
= 4* C(N/4) + 3N -2 ....   
~ NlogN  
改進：  
因為使用遞迴，所以cost很高，所以可以從幾個方向改進  
1.當小陣列夠小的話就使用insertion sort，可以提高10~15%  
2.檢查子陣列是否已排序，減少遞迴次數  
3.減少陣列的搬移(High level Skill)  

ButtomUp-MergeSort:  
步驟：用Array輪詢，用size切段，size從2,4,8....    

#### 二. Quick Sort  
被譽為20世紀最偉大的十大演算法之一，發明者因而得圖靈獎  
步驟：先打亂原陣列(*Shuffle)，將著隨機選定一個基準點，設定左右指針從兩側開始，連續對換直到左側子陣列都小於等於基準點且右側子陣列都大於等於基準點，持續遞迴就可以完成排序。  
Avg Case:NlgN ， Worst Case:N^2;  
*Shuffle:如果原陣列已經排序過，就會發生Worst Case，因為左右指針會跑完整個N-1子陣列，所以時間複雜度就為O(N^2)，又因為是遞迴所以表現甚至比Selection Sort等更差，所以為了避免Worst Case出現，一開始將陣列再次打亂發生的機率就非常低。  
參考 [Wiki 快速排序之正規分析](https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F)  
但是一般來說，Quick Sort優於Merge sort，因為Quick Sort不需要另外的陣列暫存結果(auxiliary array)  

時間複雜度證明：  
C(N) = (N+1) + ((C0+Cn-1)/N) + ((C1+Cn-2)/N) + ....      
(N+1) for partition times ;  ((C(0)+C(N-1))/N) for partition posibility   
N * C(N) = N * (N+1) + 2 (C0 +... + C(N-1)))  
N * C(N) - (N-1) C(N-1) = 2N + 2C(N-1) ---> 兩邊同減 (N-1) * C(N-1)  
C(N)/N = C(N-1)/N + 2/(N+1) = C(N-2)/C(N-1) + 2/N + 2/(N+1)...  
=2/3+2/4+...+2/(N+1) = 2(N+1)(1/3+...+1(N+1)) ~ 2(N+1)ln N  

改進：  
1.對於小的子陣列使用Insection sort  
2.基準點落在中間會比較好(使用 median-3 algorithm)   
3.如果有重複元素，改用3-way quick sort (切成大於、小於、等於三份)

#### 三. 關於Sorting  
排序演算法可說是Computer Science的基石，不論是影像處理、作業系統等，都會大量使用到排序演算法，甚至有一度作業系統使用qsort()就遇到元素重複問題導致效能低落，可見排序演算法的重要性。

證明：如何得知Sorting的lower bound為NlgN?  
使用Decision Tree方法  
假設一陣列長度為n且元素不重複，元素全排列共有n!種組合，其中只有一個是排序過的序列，每次判斷我們都可以得知這個陣列是True or False(排列過與否)，如果看Worst Case，每次判斷都會將原本可能組合刪去一半，所以總判斷的次數是 lg(n!) ~ NlgN。  

除了基本的空間複雜度與時間複雜度，在挑選排序演算法還有一個考量是 stability  
假設一資料表有兩個欄位，今天依照欄位一排序，那欄位二的順序是會被打亂  
ex 符合stable
<table> 
<tr> <td> 1 </td> <td> A1 </td> </tr>
<tr> <td> 1 </td> <td> A3 </td> </tr>
<tr> <td> 2 </td> <td> A1 </td> </tr>
<tr> <td> 2 </td> <td> A2 </td> </tr>
</table>
不符合stable
<table> 
<tr> <td> 1 </td> <td> A3 </td> </tr>
<tr> <td> 1 </td> <td> A1 </td> </tr>
<tr> <td> 2 </td> <td> A1 </td> </tr>
<tr> <td> 2 </td> <td> A2 </td> </tr>
</table>  
最主要看排序演算法在移動位置時是否有打亂，例如Selection Sort不是Stable，因為每次挑選完最小值換位時會打亂原本的序列，其餘可以參考影片截圖。  
![排序比較圖]{}  

#### 後記
這堂課老師講課很仔細，不單是講演算法本身，還有演算法應用的地方以及如何改進，另外課程主要是用Java，所以會有一些實作時要注意的小細節與常用API的核心(y)  
舉例來說 Java內建Array.sort()，有趣的是當JVM發現Array.sort(T) T是基本型態(int,char...)選擇使用QuickSort()而如果T是Object則使用MergeSort()，當然JVM用的都是tuned過的sorting，但是運行機制的不同在於  
使用Object表示使用者不太在意空間的上限，又因為Merge Sort()表現穩定故選之；  
另一方面如果使用者用基本型態變數，表示對空間可能有所要求，所以用另一個，老師不講我還不知道有這樣的設計道理在，我覺得這才是老師應該在上課要傳授的東西 在真實世界中程式設計的原理與應用。
