### Docker Setup  

對於Docker中Container獨立性與平臺易移植性感到十分嚮往，所以決定開始用Docker作為Dev & Deploy的開發平台。    
參考資料主要為官網的三小時的[訓練影片](https://training.docker.com/self-paced-training)，截圖來自同影片。    

#### 名詞解釋  
工具名詞  
Client:採用Client/Server架構，client可以輸入指令與連結    
Host:負責run docker deamon的主機  
![img](https://github.com/sj82516/Blog/blob/master/%E9%9B%9C%E8%A8%98/Docker/Setup-img/d1.jpg)    
Engine:負責執行Container的基層(等同Deamon)  
Registry & Repo：published images  
![img](https://github.com/sj82516/Blog/blob/master/%E9%9B%9C%E8%A8%98/Docker/Setup-img/d3.jpg)  
Hub:瀏覽Registry&Repo的地方      
Swarm:cluster tool  
Compose:create and manage multi-container tool    
Kitematic:Client GUI工具    
內部元件名詞  
Images:read only的repo，可從hub抓自己所需的images，如ubuntu、centOS，或是其他內建軟體的Nginx、NodeJS皆有官方支援的images。   
Container:writable，彼此是isolated，為開發的環境。   
![img](https://github.com/sj82516/Blog/blob/master/%E9%9B%9C%E8%A8%98/Docker/Setup-img/d2.jpg)  


#### 1.在主機上安裝Docker Deamon (Ubuntu)   
`$ wget -qO- https://get.docker.com | sh  `  
官方釋出的安裝方式，自動裝完所有需要的packages  
#### 2.pull Docker images  
`	$ docker docker search [OPTIONS] TERM`  
`  	$ docker pull [OPTIONS] NAME[:TAG] | [REGISTRY_HOST[:REGISTRY_PORT]/]NAME[:TAG]`    
` $ docker search -s=1000 ubuntu`  
` $ docker pull ubuntu`   
* -s : 指名星星數多少以上     
* pull時可指定版本，default : latest  

#### 3.run images to create own Container  
`	$ docker run [options] [repo:tag] [instruction]`  
` $ docker run -t -i ubuntu:14.04 /bin/bash  `
* 如果本地端沒有ubuntu:14.04版本，會自動從Hub抓    
* -t : pseudo terminal , -i:STDIN, -d:背景執行, -p:Port mapping  
* [instruction]表示初始執行指令  
* 每次run都會開啟新的container!  

#### 4.run and stop container  
`	$ docker start [OPTIONS] CONTAINER [CONTAINER...]`  
`  	$ docker stop [OPTIONS] CONTAINER [CONTAINER...] `
#### 5.list all images and container  
` $ docker images`->列出所有images  
` $ docker ps`->列出還在執行中的container  
` $ docker ps -a`->列出所有container，包含已停止的
` $ docker rmi` ->remove images   
` $ docker rm`-> remove container  
#### 6.build up your own images  
共有兩種方式  
##### A.commit  
`$ docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]`  
`$ docker commit 7321 hello/world:1.0`  
* 取得Container可以透過 輸入ID前3～4碼或是Name    
* Repo命名常見規則為 USER_NAME/REPO_Name:Version   

=======
##### B.使用Dockerfile build images  
Dockerfile為configuration file,書寫規則為  
```
	FROM : [base images]
	RUN : [command when building]  
	CMD : [default command for executing containers]  
	ENTRYPOINT : [execute the command and take args]
	VOLUEM : [attach host folder]  
```  
* CMD and ENTRYPOINT差別在於ENTRYPOINT可以讀取參數,see this
	[page](http://stackoverflow.com/questions/21553353/what-is-the-difference-between-cmd-and-entrypoint-in-a-dockerfile)   
* RUN執行一次便會Commit一個new image，所以如果有多個commant最好用'&&' 連結，避免多次commit造成速度緩慢  
* 我的操作  
`$ nano Dockerfile`
```
	FROM ubuntu:14.04  
	RUN apt-get update
		&& apt-get install -y nginx curl
		&& curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
		&& apt-get install -y nodejs
```
`$ docker build yj/node-server:1.0 .`  
最後一個'.'表示搜尋當前目錄底下的Dockerfile(default name)，也可以放在不同目錄以及不同名稱。    

#### 7.publish your images to Hub   
首先到 https://hub.docker.com註冊帳號  
接著'create'-> 'create repo'  
輸入的名稱及為repo name  
在terminal 中先輸入  
`$ docker login`-> 輸入帳密  
`$ docker push [USER_NAME]/[REPO_NAME]:tag`  
`$ docker push yuanchieh/node-server:1.0`  
到hub.docker.com即可看到image了  
#### 8.Volume  
可以直接將host folder attach到image中形成container，之後可以在local端開發 包成新的image後發布，這樣部屬與開發不但可以分離，而且部屬會非常輕鬆與快速！  
此外，container和attached folder彼此獨立，folder不會因為container消失而不見  
`$ mkdir test`  
`$ echo "hello" >> test/a.txt`  
`$ pwd` -> 取得目前資料夾的絕對路徑  
`$ docker -t -i -v [Host_Folder_Abs_Path]:[Container_Abs_Path] bash`   
這時在container中及可以看到資料夾，而且在這裡的更動會影響host folder  
* 注意：如果想將volume file與container一同commit為新版本 image是做不到的，因為每次docker run都會產生新的container，除非重新attach不然兩者應為isolated。  
但可以在container中使用`$ cp`或是用`$ docker cp ....`達到將file永存在container commit後的new image中！ (OS.就好像使用外接硬碟)  
#### 9.Port and Link  
指定Container和Host Port對接，也可用於兩Container port link(常用於連結DB)  


#### 10.CI    
![img](https://github.com/sj82516/Blog/blob/master/%E9%9B%9C%E8%A8%98/Docker/Setup-img/d4.jpg)  
Dcoker可以和Github做良好的結合，每次git commit後，Docker會自動re-build image！   
1.先在github create repo  
2.到docker hub 'create' -> 'create new auto build'  
3.link github account and connect repo  
4.此時需要設定Dockerfile才能建置  
5.local端每次commit後都會重新build image  
My settings : auto install nodejs v5.x and run test.js as default command.  
[My hub repo](https://hub.docker.com/r/yuanchieh/docker-test/)  
[My github repo](https://github.com/YuanChieh/docker-test)  
如果能在production machine自動update image就十分方便了(研究中...)  

#### 11.Create own Registry  
如同github，docker也可以自建registry server   
`$ docker install registry` -> 影片中還有分v1.0和v2.0，但我看Hub中沒有版本之分了  
`$ docker run -d -p 5000:5000 registry` ->背景程式執行  
`$ docker tag [Target Images]/[Repo] [hostname]:5000/[Repo]`  
`$ docker push [hostname]:5000/[Repo]`  
`$ docker pull [hostname]:5000/[Repo]`  
`$ docker tag yuanchieh/node-server:1.0 localhost:5000/node-server:1.0`    
`$ docker push localhost:5000/node-server:1.0`   
* Docker Rgistry會依據hostname對應push、pull的Server address，所以通常會用tag先變換名稱。  
* 如果要用remote server，必須先建立TLS，目前沒辦法實測，但影片中有提到 透過修改`etc/default/docker`可用insecurity方式連結。  

======

Docker Machine / Swarm / Compose  
當部署時，往往會需要部署到多台機器上，一台跑Nginx、幾台當AP Server還有DB Server，如果不幸還跑在不同平台上如 DigitalOcean、Amazon...，管理起來會十分的崩潰，所以Docker提供這三樣工具方便管理多台Server。  
