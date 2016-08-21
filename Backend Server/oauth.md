### OAUTH 學習  
#### 基本觀念  
[參考影片](https://www.youtube.com/watch?v=8qg4p3Lz_Xg)  
影片裡頭詳盡的介紹了Oauth2以及OpenID(對應Authorization和Authentication的差異)   
簡單筆記一下：  
1.Oauth的緣起：   
現在每人會使用的網站數越來越多，每個網站都需要辦理帳號密碼，對於某些網站我們似乎不太信任他們保管密碼的能力，而且使用者大多習慣一個密碼用到底，如果一個網站外洩資料就會產生十分大的影響。  
Oauth透過授權流程，讓我們只要在主要的網站設定帳號密碼(如FB、Google...)，其他網站只需要透過授權就可以取得使用者准許的資源，安全又方便。  

2.授權中的四個角色：客戶端、授權伺服器、資源擁有者以及資源擁有伺服器，以及彼此在Oauth流程中的互動  
客戶端(一般的網站)顯示授權頁面，要求資源擁有者授權，結果發至授權伺服器  
授權伺服器-----夾帶code並呼叫 http://客戶端/callback 網址----->客戶端
客戶端-------夾帶code------->授權伺服器  
授權伺服器----回傳access_token--->客戶端  
客戶端-------拿access_token----->資源擁有伺服器  
資源伺服器回傳相對應資料    

3.附註   
Facebook和Google都有提供implicit login，可以直接在瀏覽器用JS發出請求  
Facebook還有直接提供Javascript SDK  
但是官網也提到 在瀏覽器端直接請求授權風險很大，所以我實做都是在Server-Side

#### 實作
* 使用 NodeJS v5.x / Express v4.x / Request v2.x
* 流程:
  1. 由瀏覽器HTML頁面按下登入按鈕觸發
  2. 後端接收到請求後，轉發到OAUTH Server
  3. OAUTH Server回傳瀏覽器請求確認頁面  
  4. 確認後，OAUTH Server發送請求(附帶code)到後端callback url
  5. 後端用GET附帶code向OAUTH Server請求access_token  
  6. OAUTH Server回覆access_token  
  7. 後端拿到access_token即可向OAUTH Server請求使用者資訊

##### 1.Github  
[參考官方文件](https://developer.github.com/v3/oauth/#scopes)  
![申請頁面](https://github.com/sj82516/Blog/blob/master/Backend%20Server/oauth_imgs/github.png)  
其中有雷是   
1.github_oauth_url中不需夾帶redirect_url! 在Github OAuth頁面設定好即可，我原先有夾帶但是試了幾次都會出錯，拿到就perfect!  
2.拿access_token換使用者資料步驟header要夾帶User-Agent，我在這一步卡了有點久OTZ 感覺官方文件可以補充的更詳盡些(明明就是自己眼殘lol)  
3.Authorization callback URL一定要填寫正確，ex.http://localhost:3000/github/callback  

###### Server-Side

```Javascript
//存在環境變數或是外部文件中比較安全
var github_client_id=;
var github_secret_id=;

//回傳OAUTH Server請求網址，由瀏覽器重新導向
router.get('/github', function(req, res){
  var github_oauth_url = "https://github.com/login/oauth/authorize" +
      "?client_id=" + github_client_id  +
      "&scope=user" +
      "&state=ba36ba245cb4cea4c48cc0f54d4bf72912dd02be" ;
  res.send(JSON.stringify({"redirect_url":github_oauth_url}));
});

router.get('/github/callback', function(req, res){
    //拿code換access_token
    var code = req.query.code;
    var token_option = {
        url:"https://github.com/login/oauth/access_token",
        method:"POST",
        form:{
            code: code,
            client_id: github_client_id,
            client_secret: github_secret_id
        }};
  request(token_option, function(err, response, body){
      if(err){
          res.send(response);
      }
      //回傳值不是JSON Format,所以要自己用Regular Expression取出
      var regex = /\=([a-zA-Z0-9]+)\&([a-zA-Z])+\=([a-zA-Z0-9]+)/;
      var result = body.match(regex);
      var token = result[1];
      console.log(body);

      //拿access_token換使用者資料
      var info_option = {
          url:"https://api.github.com/user",
          method:"GET",
          headers:{
              "User-Agent": "Awesome-Octocat-App",
              "Authorization":"token "+ token
          }
      }
      request(info_option, function(err, response, body){
         if(err){
             res.send(err);
         }
         res.send(body);
      });
  });
});
```           


###### Browser-Side  
基本上就是發出xhr，Server回傳redirect_url，瀏覽器跳轉頁面

```Javascript
var githibOath = document.getElementById("github-oauth");
  githibOath.addEventListener("click", function(){
      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", "github", true);
      xhttp.send();
      xhttp.onreadystatechange = function () {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
              console.log(xhttp.responseText)
              window.location.href = JSON.parse(xhttp.responseText).redirect_url;
          }
      };
});
```   

#### 2. Google
[參考官方文件-Server Side實作流程](https://developers.google.com/identity/protocols/OAuth2WebServer)  
[官方文件-申請Google憑證](https://developers.google.com/identity/sign-in/web/devconsole-project)  
[官方文件-scope們](https://developers.google.com/identity/protocols/googlescopes)   
附註:點進scope網頁中，可以看到一連串的scope定義，如果你把scope url(ex.https://www.googleapis.com/auth/adexchange.buyer)貼近
瀏覽器中，你會發現頁面只顯示個別命名字(ex. adexchange.buyer)，這個部分是用於下方的scope定義中  
本質上與Gihub申請流程差不多，只是參數多了點，scope可選擇範圍多了很多的多lol   
至於Google Console中的設定參考下圖  
![流程一](https://github.com/sj82516/Blog/blob/master/Backend%20Server/oauth_imgs/google1.jpg)  
選擇OAuth  
![流程二](https://github.com/sj82516/Blog/blob/master/Backend%20Server/oauth_imgs/google2.jpg)  
![流程三](https://github.com/sj82516/Blog/blob/master/Backend%20Server/oauth_imgs/google3.jpg)  
![流程四](https://github.com/sj82516/Blog/blob/master/Backend%20Server/oauth_imgs/google4.png)  
###### Server-Side
```Javascript   
// for google oauth
router.get("/google", function(req, res, next){
    var google_oauth_url = "https://accounts.google.com/o/oauth2/v2/auth?" +  
    //Scope可以參考文件裡各式各樣的scope，可以貼scope url或是個別命名
    "scope=email%20profile&"+
    "redirect_uri=http://localhost:3000/google/callback&"+
    "response_type=code&"+
    "client_id=" + google_client_id;
    res.send(JSON.stringify({"redirect_url":google_oauth_url}));
});
router.get("/google/callback", function(req, res) {
    var code = req.query.code;
    //拿code換token
    var token_option = {
        url:"https://www.googleapis.com/oauth2/v4/token",
        method:"POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        form:{
            code: code,
            client_id: google_client_id,
            client_secret: google_secret_id,
            grant_type:"authorization_code",
            //要跟Google Console裡填的一樣喔
            redirect_uri:"http://localhost:3000/google/callback"
        }
    };
    request(token_option, function(err, resposne, body) {
        var access_token = JSON.parse(body).access_token;
        var info_option = {
            url:"https://www.googleapis.com/oauth2/v1/userinfo?"+"access_token="+access_token,
            method:"GET",
        };
        request(info_option, function(err, response, body){
            if(err){
                res.send(err);
            }
            res.send(body);
        });
    })
});
```   
#### Facebook  
[官方文件](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow)
Facebook流程也差不多，只是多了兩步 驗證token的動作以及應用程式的access_token索取的動作  
首先到[facebook developer](https://developers.facebook.com/)  
選擇新增應用程式  
![流程一](https://github.com/sj82516/Blog/blob/master/Backend%20Server/oauth_imgs/facebook5.jpg)  
選擇WWW網站後，填寫資料   
![流程二](https://github.com/sj82516/Blog/blob/master/Backend%20Server/oauth_imgs/facebook3.jpg)  
![流程三](https://github.com/sj82516/Blog/blob/master/Backend%20Server/oauth_imgs/facebook2.jpg)  
新增"facebook登入"產品  
![流程四](https://github.com/sj82516/Blog/blob/master/Backend%20Server/oauth_imgs/facebook1.png)  
記得要改為下列設定喔，callback依然要記得設定   
![流程五](https://github.com/sj82516/Blog/blob/master/Backend%20Server/oauth_imgs/facebook4.png)  

###### Server-Side  

```   
//for facebook oauth
router.get("/facebook", function(req, res, next){
    var facebook_oauth_url = "https://www.facebook.com/dialog/oauth?" +
            "redirect_uri=http://local.example.com:3000/facebook/callback"+
            "&client_id=" + facebook_client_id +
            "&scope=public_profile"+
            "&response_type=code";
    res.send(JSON.stringify({"redirect_url":facebook_oauth_url}));
});
router.get("/facebook/callback", function(req, res, next) {
    var code = req.query.code;
    var token_option = {
        url:"https://graph.facebook.com/v2.3/oauth/access_token?" +
            "client_id=" + facebook_client_id +
            "&client_secret=" + facebook_secret_id +
            "&code=" + code +
            "&redirect_uri=" + "http://local.example.com:3000/facebook/callback",
        method:"GET"
    };
    // facebook_console_id參考附著
    request(token_option, function(err, resposne, body) {
        var access_token = JSON.parse(body).access_token;
        var info_option = {
            url:"https://graph.facebook.com/debug_token?"+
            "input_token="+access_token +
            "&access_token="+facebook_console_id,
            method:"GET"
        };
        //Keep the user_id in DB as uni-key
        request(info_option, function(err, response, body){
            if(err){
                res.send(err);
            }

            //Get user info
            request({url:"https://graph.facebook.com/me?access_token=" + access_token}, function(err, response, body){
                if(err){
                    res.send(err);
                }else{
                    res.send(body);
                }
            });
        });
    });
});   
```  

附註：facebook_console_id  
[官方文件](https://developers.facebook.com/docs/facebook-login/access-tokens/#apptokens)  
要取得應用程式自身的access-tokens，只要發出請求
<pre>
GET /oauth/access_token
    ?client_id={app-id}
    &client_secret={app-secret}
    &grant_type=client_credentials
</pre>
我是用POSTMAN發出，最後將此token記錄下來當常數，因為官網沒有寫expire時間，估計就是永久有效吧(不確定lol)  

#### 總結  
1.POSTMAN是Debug好物，用來發request十分方便   
2.目前的流程過於簡陋，例如說登入整個頁面都會跑掉，如果搭配SPA就不方便了，下一步來改成Popup window處理。   
3.參考 https://github.com/sj82516/Bookstore/releases version0.0.1，抓下來 npm install && npm start，
記得改routing path與各個頁面的callback URL。
4.另外，我在檔案中 github和google都是用localhost，而facebook則是用local.example.com，後者是我自己加上去的alias name  
同樣也是指到localhost，至於為什麼這麼做.... 一開始我以為facebook不支援localhost，所以才搞出來的烏龍，實際上用localhost即可
