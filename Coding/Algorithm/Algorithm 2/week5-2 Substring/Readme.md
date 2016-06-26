### Substring  
找尋一字串中是否有符合某特定字串，在各方面都大量使用，最基本的像是Google Search  
或是像科學家找尋特定基因段，如何快速搜尋就是一個值得研究的領域   
在以下演算法中，有個基本的區別 使否需要Backup  
Backup指得是 當我比對完某一位字元後，之後是否還需要再比對，這個條件影響了時間複雜度。  

以下皆假設 N為被搜尋字串長度，M為搜尋字串長度
##### Brute Force  
逐一比對字元，如果不符合就往下一位重新比對，這符合Backup條件，時間複雜度最差為 M*N  
##### KMP Algorithm  
這個作法極為聰明，首先建立DFA，DFA上會記錄在每個不同state遇到不同字元時該往哪個State去   
因此不需要Backup，進而降低時間複雜度，為O(N)  
##### Boyer-Moore  
類似於暴力解，但是從M的尾部開始比對，如果最後一位都不合了就遑論前面是否一樣，進而減少比對浪費的次數  
基本解法的時間複雜度為 M*N，但如果用KMP-like解法可降為 linear time。  
##### Rabin-Karp  
這個解法十分有趣，比對流程跟暴力解一樣，從頭一位一位往下前進，但是改用hash而非原本的字串比對方式  
解法有趣之處在於 原本Hash所需時間也是 linear time，照理說時間複雜度跟暴力解一樣  
但是運用數學的技巧，用Constant time方式算出hash number，進而將時間複雜度降為 linear time！  

關鍵算法在於 先求出N中的前M位字串Hash number，txthash = (txthash*R + N.charAt(i))%Q  
R為字元限度，如ACII為256，Q為任一大的質數，這個方法跟先前的hash function一致  
接著要往下一位元，並不需要重新計算，只需要  
1.減去最左位元 txthash = (txthash - N.charAt(最左位元)* R^(M-1))  
2.加入下一位元 txthash = (txthash*R + N.charAt(最右位元))  
這樣就用constant time完成了!數學真是偉大啊(嘆～  

這個算法有兩個版本，分別是Carlo和Vegas，差別在於發生collision時是否再次比對字串，因為有極低的機率會發生字串不同！  
