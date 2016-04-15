###Chapter1 Union-Find  
主要解決點與點之間的連結問題  
本章中介紹了三種解決方式  
1.QuickFind  
init:使用一陣列id儲存目前個點的連結點(自己)  
union:(p,q)輪詢陣列id，將id中值等於p的全設為q，表示連結   
connected:如果id[p]==id[q]，表示兩點有連結   
2.QuickUnion  
init:使用一陣列id儲存目前個點的連結點(自己)  
union:用樹枝狀結構，(p,q)將id[p]統一設為q表示連結   
connected:另外設個root方程式，判斷p、q點的root為誰，如果相同表示有連結  
3.Weighted QuickUnion：  
做法類似於QuickUnion，差別在QuickUnion的worst case為一長條的樹枝狀圖，這樣找尋root時最差為O(n)，透過判斷目前p,q誰擁有較大的樹狀結構，將小的併入大的，如此一來worst case就為O(lg n)  
其餘詳見程式碼