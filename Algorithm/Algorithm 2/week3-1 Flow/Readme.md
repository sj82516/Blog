### Maximun Flow and MinCut  
Graph系列的最後一環，給定一個Weighted Directed Graph，Weigth表示上限流量，求  
1.Mincut：將a,b兩點區隔開的切線上流量總和最小者  
2.Maximun flow：從a->b最大流量  
實際應用上若以網路來看，Mincut可用於找出最小花費切斷某區域流量的方法，而Maximun flow可用於試圖監聽某區域最大資訊量的方法。  
名詞定義：  
1. st-cut：將所有的點分成兩群，但是s和t必須在不同群中。  
2. capacity：A set到B set流量上限總和   

為何Mincut和Maxflow是同樣的問題呢？    
主要有兩個therom   
1.Augmenting path theorem:
flow f is maxflow iff no augmenting paths.     
2.Maxflow-mincut theorem:   
Value of maxflow = capacity of mincut  
證明方法透過證明下列三個條件為等價  
1.There exists a cut whose capacity equals the value of flow f.
2.f is maxflow.  
3.There is no augmenting path with respect to f.  

實做方法Ford-Fulkerson algorithm：  
將原本的directed graph轉為undirected graph,每個edge有兩個值 foward edge ad backward edge residual capacity.  
Start with 0 flow.  
While there exists an augmenting path:  
 - find an augmenting path  
 - compute bottleneck capacity  
 - increase flow on that path by bottleneck capacity  
 

 