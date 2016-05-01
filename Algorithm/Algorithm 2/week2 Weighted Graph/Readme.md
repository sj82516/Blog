### Weighted Graph  
延續第一章的Graph，只是每個edge多了一個property : weight   
一樣先討論Undirected Weighted Graph接著討論Directed Weight Graph  

##### Minimun Spanning Tree  
找出連結所有點且總和最小的Tree(acyclic)，可應用於網路應用、科學研究等，實作理論運用Greedy Algorithm，不斷地將Graph分群，並從中找出對小路徑(Cut Poperty)，逐一建構出MST，本堂課提供兩個實踐的演算法  
1.Kruskal Algorithm:  
將所有的edge依照weigth順序排列，一步步取出最小的edge建構MST，每一步都檢查加入此edge後是否產生cycle(使用Union Find!)，如果是則捨棄加入下一個。  
2.Prim's Algorithm:  
從vertex 0 開始，開始選最小的edge開始建構子樹，用所有在子樹節點連結的edge找出最小值不斷擴大(使用Piority Queue，先排除會造成cycle的edge)，直到size符合為止。  
有兩種不同的版本，lazy&eager，差別僅在維持edge最小值找尋的資料結構，前者使用PQ後者使用IndexMinPQ，這邊我實作用eager版本。  

##### Shortest Path  
在Directed Weighted Graph中找出最短路徑，實際可應用於一般的GPS導航系統中，重要性自然不言而喻，條件限制上不能有cycle，也不能有負值，實作上可用  
1.Dijkstra's Algorithm(可處理cycle，不能有負值):  
將所有的edge依照weight排序，從最小點開始，同樣一個一個edge試直到整個SPT長完，要注意的是每擴展一個點都要relax(避免有其他路徑更短)，此方法類似於Prim's Algorithm，詳細可參考[此影片](https://www.youtube.com/watch?v=gdmfOwyQlcI)。  
2.edge-weight DAG(可處理負值，不能有cycle):  
先轉出topological sort，接著依照topology sort序列一樣一一relax每個相連的edge。  

如果出現負值，在沒有negative cycle(某cycle weight總和為負)情況下可用  
Bellman-Ford Algorithm(不能有負迴圈):  
原理很簡單，用兩個for迴圈不斷relax所有vertices就可以找正確的SPT，詳細可見[此影片](https://www.youtube.com/watch?v=obWXjtg0L64)，時間複雜度為(V+E)。  
