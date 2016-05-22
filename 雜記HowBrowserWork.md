### How Browser work  
每天都會打開瀏覽器，但從未真正了解瀏覽器的工作原理，查了一些資料做筆記。  
主要參考資料：  
1. [Youtube影片](https://www.youtube.com/watch?v=SmE4OwHztCc)  
2. [HTML5 Rock文章](http://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#The_rendering_engine)  

一般瀏覽器主要包含： 使用者介面、Render Engine、JS VM(V8、TraceMonkey)、Binding(和系統嫁接的API，像是Network , storage之類)   
目前先專注於討論Render Engine，當瀏覽器收到HTML,CSS,JS檔案後主要流程為  
1.Parsing(HTML to DOM tree, CSS to CSSOM tree) -> 2.Render Tree Construct -> 3.Layout -> 4.Painting.  
市面兩大主流引擎Webkit(Chrome, Opera, Safari)和Gecko(Firefox)的實際流程有些許不同，但大同小異。  

####Parsing:  
Parsing主要就是將字串轉為有用的expression，其中包含lexical analysis和syntax alalysis，有修過《編譯器》相關課程就不難理解，HTML5 Rock有補充這方面的知識。
HTML有幾個特點
1.是個很寬鬆的語言，相較於XML一個出錯就全錯，HTML parser會嘗試修補錯誤，例如tag放錯位置、沒有close tag、inline element應該在正確的block element中(ex. \<li>要在\<ul>或是\<ol>中、\<tr>要在\<table>內)等等，HTML5 Rock一文中有大量的描述。  
2.上下文相關的語法(not a context free gramma)  
3.parsing過程可能會有更動(reentrant)，像是JS的document.write()等function可以改變HTML結構  
因此，html parsing流程為Tokenization->Tree construction -> DOM，Tokenization主要是針對上下文相關的tag所設計的lexical analysis，使用state machine，將解析到的HTML tag轉為token。  
狀態從"Data State"開始，讀到'<'變為"Tag open state"，接著不斷讀取a-z，此時為"Tag name state"，讀到'>'變回"Data state"，此時就完成一個token '< tag_name >'，下一個token為結束tag前的字串，最後是'<' + / + tag_name '>'，一路解析下去完成tokenization。  
將著 Tree Construction就將一個個Token轉為Tree，同樣用state machine方式，從 initial made -> before HTML -> before head -> in head -> after head......，在不同tag中一一轉為 html element並插入DOM Tree中，變成類似的結果(影片7:21範例)  
<table>
<tr>
<td>Parse Tree</td>
<td>DOM Tree</td>
</tr>
<tr>
<td>
<pre>
-HTML    
|---head  
|---body  
	|---p  
	|	|--- #text  
	|---div  
		|--- span  
			|--- #text  
</pre>
</td>
<td>
<pre>
-HTMLHtmlElement    
|---HTMLHeadElement  
|---HTMLBodyElement  
	|---HTMLParagraphElement  
	|	|--- Text  
	|---HTMLDivElement  
		|--- HTMLSpanElement  
			|--- Text  
</pre>
</td>
</tr>
</table>   

CSS parsing相對比較單純，畢竟它無關上下文，一樣透過parsing轉為CSSOM Tree。

此時parsing HTML和CSS是分頭進行的，因為兩者目前不會相互影響。  

*注意點：  
1.\<script>  
如果HTML parsing時遇到\<script>會停止parsing，立即執行script！這會影響頁面呈現的流暢度，這也是為什麼JS file沒必要盡量放在HTML File的末端，而相對的CSS要放在頂部加載才能儘早parsing。  
2.Speculative parsing  
如果遇到需要加載外部資源，如link,img,script,style，Borwser會開啟併行加載且繼續執行HTML Parsing，因為通常這些外部資源不會直接影響DOM tree  
3.Style sheets:  
通常style sheet不會影響DOM tree，所以可以併行加載，但是在script(JS)中，可以對CSS進行操作，預防CSS加載未完成可能會產生錯誤，所以script如果停住直到CSS加載完成!  

####Render Tree 
這個步驟會將DOM結合CSSOM產生由RenderObejct物件(包含DOM節點、Style和Layer)組成的Render tree(以Webkit為例)，其中Obeject的創建會根據style中的display而有所不同，會有RenderInline、RenderBlock、RenderListItem等等，此外 DOM和Render Tree並非一對一關係，Render tree只創建會被繪製的物件(非創建-display:none,或是head、script等非顯示標籤)   
在運算每個RenderObject屬性不是件簡單的事，尤其是在style computation，其中的困難有  
1.Style資料量很大，包含了瀏覽器預設格式與使用者自訂格式等等  
2.如何快速找到符合條件的Style Rule  
3.遇到相當複雜的疊層Style Rule(div div div....)  
相對應的解決方法為：  
Sharing Style Data-通常在定義Style時會有相當多的物件共享一份同樣的格式，所以在  Webkit parse CSS不會產生Rule tree，採用matching方式讓RenderObject指向style，總共會跑四次matching(non-high priority屬性[會嚴重影響其他屬性的，例如display]->high-priority important -> normal-priority non-important -> normal-priority important)，如果屬性相同則後者會覆蓋前者。    
此外，在符合某些條件的節點共用一份style，像是在同一滑鼠狀態下(假設一個被hover、另一個也會被hover)、相同Tag name、相同class name等等。    
而Gecko在parsing CSS時，Gecko產生了Style Contexts Tree，在底部的節點有較高的權限(可覆蓋前者)，透過路徑的建立快速找到Rule tree(DOM)對應Style Context tree，過程有點複雜，看得我都有點矇了，可直接參考文章。  

####Layout  
文章中提到 Render tree不會包含物件尺寸與座標，這點和影片說法有點出入，但是在Layout階段主要做的事 traverse render tree並計算節點的位置，在traverse時計算座標流程為  
1.Parent render object確定寬度  
2.處理child layout，確定child height  
3.parent依照child height + margin決定height    
4.dirty設為false(完成layout)  
如果遇到物件改變大小或是螢幕大小改變時，並不會馬上觸發relayout，而是將該物件標示為dirty，等到一定條件(Webkit有Timer)後才會將dirty render object relayout避免過度頻繁更新畫面消耗CPU資源(batch 批量處理)。
此外，在某些條件下會立即觸發relayout  
1.螢幕尺寸改變  
2.改變字型或字體  
3.在JS中改變特定屬性(見範例)    
影片中有個範例，將設定值放在同一區塊執行減少relayout次數。    
<table>
<tr>
<td>壞程式</td>
<td>好程式</td>
</tr>
<tr>
<td>
<pre>
	var h1 = div.clientWidth/1.7;
	div.style.height = h1 + 'px';
	
	var h2 = div2.clientWidth/1.7;
	div2.style.height = h2 + 'px';
	
	->觸發兩次relayout
</pre>
</td>
<td>
<pre>
	var h1 = div.clientWidth/1.7;
	var h2 = div2.clientWidth/1.7;
	
	div.style.height = h1 + 'px';
	div2.style.height = h2 + 'px';
	
	->觸發一次relayout
</pre>
</td>
</tr>
</table>   

#### Paint  
依照render object中z-index的不同而產生layers，採取漸進式繪製 一層層繪製，從背景顏色->背景圖片->邊筐->children->outline等等，layout對應產生bitmap後交由CPU(or GPU繪製)，最後合成所有bitmap顯示到螢幕上。  
影片有提到一個優化的技巧  將css分成兩個版本，一開始先載入最基本的css做layout，讓頁面快速產生接著在載入圖片或是標題等等次要的資源，讓使用者可以在最短時間接收資訓。  
  
#### Recap
1. parsing->DOM tree  
2. DOM tree -> Render tree
3. Layout compute
4. painting bimaps and composition  
瀏覽器果然是個十分複雜又精密的設計，光是介紹文章就看得十分吃力，希望有一天能夠看懂source code   










