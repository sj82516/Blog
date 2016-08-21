### 使用Popup Window實作Oauth授權頁面
在oauth學習中主要針對Server-Side實作  
但是原本的授權頁面會整個跳轉，所以最後整個頁面會需要重新Render  
套用到像是Angular2這類的SPA，整個頁面重繪對我來說有點討厭:p  
所以就想要用 Popup Window跑授權流程，最後再將結果回傳  

#### 實作  
我實做了兩個版本，一個是基本款，一個是套用在Angular2  
