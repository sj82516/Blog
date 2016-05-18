### How Browser work  
每天都會打開瀏覽器，但從未真正了解瀏覽器的工作原理，查了一些資料做筆記。  
主要參考資料：  
1. [Youtube影片](https://www.youtube.com/watch?v=SmE4OwHztCc)  
2. [HTML5 Rock文章](http://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#The_rendering_engine)  

一般瀏覽器主要包含： 使用者介面、Render Engine、JS VM、Binding(和系統嫁接的API，像是Network , storage之類)   
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
這個步驟會將DOM結合CSSOM產生Render tree(以Webkit為例)，每個elemnet產生RenderObject，




