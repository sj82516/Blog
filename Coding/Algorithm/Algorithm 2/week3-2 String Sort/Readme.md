### String Sort  
String,連續字元，十分常見的資料型態  
在Java中，有三種String的實作方式  
1.String  
2.StringBuilder & StringBuffer  
String是immutable而StringBuilder反之，String在concat()情況下表現較差，因為每加入一個字串就要create new string，相反的在substring()表現較佳，因為只要copy reference。  
##### String sort:Key-indexed counting  
先前學的排序演算法主要都是compare-based，lower-bond為NlogN，這裡使用新的方式key-indexed counting，最主要差別在於 String的keys為已知，如[a-z],ASCII,Unicode，所以透過  
1.創建index[keys_num]  
2.計算小於該key的總數並記錄在index[key]中  
3.接著依照index[key]重新排序  
Time Complexity為linear time。  
(for one character)

##### LSD String Radix Sort  
先前的Key-Index counting是針對單一key，如果要sorting words就必須針對每個字中的相對字母做排序，LSD便是從最後一位逐一往前做Key-Index counting，讓單字依照字母順序排列  
(for fixed length string)  

##### MSD String Radix Sort  
針對string 長度不限的情況所使用，從左至右使用Key-Indexed counting。  
值得注意的是 如果遇到很長的prefix甚至是多數相同string時，MSD效能會大幅下降，因為必須比對所有重複字串，會造成大量記憶體浪費(count[R])    
最適用的場合為 random string  

##### Quick 3-way String Sort  
顧名思義，就是用修改3-way Quicksort為String專用版，實踐原理差不多  
但是相較於單純QuickSort需要比對整個string，Quick 3-way String Sort僅針對substring做比較，效率大幅提升；  
另外跟MSD相比，記憶體也節省很多，因為是使用 in array sorting。  
