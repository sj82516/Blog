###Geometric Problem
這一章在講圖形化問題，舉例來說 如何判斷一張圖中有幾條線彼此交叉重複(1D/2D intersection)或是說某一區間內包含了多少點(1D/2D intervals)，這都是圖形問題常遇到的基本核心問題，主要透過ST(implement by BST)來解決。  

這張是課程節錄圖：
![](https://github.com/sj82516/Blog/blob/master/Algorithm/chapter9/a9.jpg)
  
1.1D range search:找出陣列中符合該區間的集合，使用BST實作，接著就iterator整棵樹找出答案，蠻直白的做法。  
2.orthogonal line segment intersection:找出哪裡發生雙線重疊，使用sweep-line algorithm，從y軸掃過去，建立水平線的ST，如果遇到垂直線則降為1D range search判斷是否重疊。  
3.2D orthogonal range search:給個二維陣列，找出某四方形範圍內的點數量，做法是先將二維陣列方格化，先區分成多個格子，接著將點對應到格子上，判斷四方形範圍在哪些格子上，只需判斷那些點即可，降低運算量。  
實作方法有2D tree(不斷二分格子)以及k-d tree，用BST建立，不斷的水平與垂直切割，更詳細內容可看講義。  
4.Interval search trees : 找出任一水平線重疊之處(ex [1,3,] [2,4])，以left point建立BST，每個Node額外儲存subtree最大的 right point 值，如果給定一個區間，比對Node上的max(right point)和區間的left point，如果大於則往左走，持續遞迴就可以找出答案。  
5.Orthogonal rectangle intersection：找出任一長方形重疊之處，用於處理器晶片layout的判斷，同樣用sweep-line algorithm搭配 Interval search trees解決。  
