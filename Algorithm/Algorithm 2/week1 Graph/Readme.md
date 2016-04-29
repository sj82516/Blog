### Graph  
graph是個有趣卻也艱難的領域，其中又分directed和undirected graph。   
主要定義為：set of vertices connected by edges with direction or not.  
基本可應用在表示點與點之間的連結狀態，如FB上的社交關係圖、地鐵站交通路線等等    
進而搭配演算法可以做許多圖形相關運算，如找出最短路徑、找出cycle等  

常見的圖形相關演算法有:  
------- Undirected graph 
1.DFS:1960年代就被提出的概念，透過遞迴不斷深度搜尋，探索可連結的所有點，可用來解決 迷宮問題。    
2.BFS:使用queue做廣度搜尋，一層層往下探索，所以可用來解決 最短路徑問題以及Kebin Bacon numbers(六度分隔理論)。  
3.Connected component：區隔所有的點，將彼此有連結的點歸為同一類，藉此判斷s和v是否相連(使用DFS)  
--------- Directed graph   
可用來表示有先後順序的流程圖，如combination circuit/implication gaph等  
1.reachability：從s出發可到的範圍，DFS使用實作。  
2.topology sort:將DAG轉為依序的順位(保持前後相依性關係)，使用DFS實作，此Graph必須沒有迴圈。實際用於大學課程表(預先必修)等。    
3.Strong Components：如果v可到w且w可到v，則兩者符合條件，此原理適用於等價關係。
實作使用[Kosaraju-Sharir algorithm](https://en.wikipedia.org/wiki/Kosaraju%27s_algorithm)，原理很簡單，先將圖形連結反轉輸出topology sort，接著再將圖形連結反向，用剛剛得到的sort在跑一次DFS，如此一來如果兩個點有雙向連結就可以被歸成同一類。實際用於觀察食物鏈、軟體模型彼此的相依性等。  
