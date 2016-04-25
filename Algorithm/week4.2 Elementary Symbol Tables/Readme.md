### Symbol Table
目的：解決Key-Value問題，常見於網路 DNS Table、File System等等，相當重要的資料結構。  

API:  
1.put(Key,Value)  
2.get(Key) return Value  
3.delete(Key)  
4.contains(Key) return boolean  
5.Keys() return iterable   
.....  

實作:  
1.unorder list  
2.Ordered array (binary search for functions)

實作問題：飛機航班查詢表  
API:ST擴充  
1.floor(Key) return key:找出離Key時間點最近的航班且時間點晚於Key  
2.ceiling(Key) return key:找出離Key時間點最近的航班且時間點早於Key   
3.rank(Key) return int: 找出共有多少航班早於Key  
4.keys(Key1, Key2) return Iterable<Key>: 找出兩時間點內的所有航班  
....  
