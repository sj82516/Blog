### Docker Toolbox 
####Machine  
同時管理多台Server，可以與Digital Ocean, Azure , Amazon等PaaS平台串接，快速啟動與管理docker  
 ![img](https://github.com/sj82516/Blog/blob/master/%E9%9B%9C%E8%A8%98/Docker/Setup-img/d6.jpg)  
######基本操作  
 `$ docker-machine create --driver virtualbox [Machine_name]`  
 `$ docker-machine ls`  
 `$ docker-machine env default`  查看參數
 `$ eval "$(docker-machine env default)"`   轉換操作docker machine   
 `$ docker-machine ssh dev` // ssh登入
######創建遠端Server  
 我使用的是[AWS](https://docs.docker.com/machine/examples/aws/)，參考官網作法即可創建成功。  
 

####Swarm  
集群管理，自動分配containers到多個node上  
![img](https://github.com/sj82516/Blog/blob/master/%E9%9B%9C%E8%A8%98/Docker/Setup-img/d7.jpg)  

####Compose   
在部署網站時，會需要部署DB、AP、Proxy等多個不同的container，透過docker-compose可以一次性部署並處理containers間的連結(link)    
![img](https://github.com/sj82516/Blog/blob/master/%E9%9B%9C%E8%A8%98/Docker/Setup-img/d5.jpg)  

[問題] local vm ip mapping問題