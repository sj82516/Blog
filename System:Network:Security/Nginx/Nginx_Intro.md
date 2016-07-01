### Nginx
It's so widely used in proxy server and cache server.  
It's time to learn it clearly.  
Reference : [Nginx official Doc](https://nginx.org/en/docs/beginners_guide.html)
##### Default Structure  
1. Nginx run one main process for read config and manage several worker processes.
The number of worker processes can define by in main context.
```> worker_processes number | auto ```  

2. The config file store in "/usr/local/etc/nginx/nginx.conf"  
3. There are several instructions  
```$ nginx -s (stop|reload|reopen|quit) ```   

##### Basic Setting  
```
  http {
    server {
      root /data/www;
      listen __;
      server_name www.example.com;
      {server_name default_server;}

      <-- rewrite: replace request uri to new one. default would rerun 10 times and return 500! need to be careful.
      rewrite ^(/download/.*)/media/(.*)\..*$ $1/mp3/$2.mp3 last; --> last: default value, run rewrite in new uri.
      rewrite ^(/download/.*)/audio/(.*)\..*$ $1/mp3/$2.ra  break; --> break: stop here.
      return  403; --> no hits, return.

      <-- routing -->
      location / {
        proxy_pass http://localhost:8080/:  <- proxy server ,need some changes to apply to fastCGI
        <-- no "root" in location block, it will inherit from server.
      }
      location ~ \.(gif|jpg|png)$ { <- "~" for Regular express prefix
        root /data/images/;
      }

      <-- return: return can directly response to client with content and status code  -->
      location /moved/url/ {
        return 301 http://it/moved/here; -> redirect to new URL
      }

      <-- sub_filter: rewrite HTTP response, such as http:// to https:// or replace one substring to another -->
      location / {
        sub_filter 'href="http://127.0.0.1:8080/' 'href="http://$host/';
      }

      <-- error_page: make internal route when error happen. -->
      location /old/path.html {
        error_page 404 =301 http:/example.com/new/path.html;
      }

      <-- try_files : check whether the file or dir exist or not and make internal redirect -->
      location /old/path.html {
        try_files  try_files $uri /images/default.gif;
        try_files $uri $uri/ $uri.html =404; --> can add status code
      }
    }
  }
```
1. Routing rules  
  a. "=" define the exact matching URI. If it hits, search stops.         
  b. "^~" prefix, "^~ /image" would match "/image1, /image, /image2...."
   c. longest regular expression prefix hits.
2. Server is virtual machine that can handle request and response.
3. You could add multi servers in one http block.
4. If match several server listening port, it would check server name.  
5. If failed, it would return to "default_server";    

##### Optimize Serving Static Content Speed    
1. Enabling sendfile and tcp_nopush:This is for large files transition.   
turn on sendfile, linux would copy file to tcp buffer much more fast. [more info](http://www.vpsee.com/2009/07/linux-sendfile-improve-performance/)  
tcp_nopush: this would buffer several pks and send them together, in order to reduce header repeated.
```
location /mp3 {
    sendfile   on;
    sendfile_max_chunk 1m; --> prevent lock worker process
    tcp_nopush on;
    ...
}```
2. tcp_nodelay: suitable for steaming, which require small pks frequently and in-time.
reverse to tcp_nopush, it would send pks directly.  
```
location /mp3  {
    tcp_nodelay       on;    
    keepalive_timeout 65;  
    ...
}```    
3. Optimizing the Backlog Queue  
Increase connection amount.  
```
$ netstat -Lan // check process connection amount.
$ sudo sysctl -w net.core.somaxconn=4096
$ vi /etc/sysctl.conf
>> net.core.somaxconn = 4096 ```  

4. much more about tcp  
when to use tcp_nodelay and tcp_nopush is really interesting.  
see more [here](http://stackoverflow.com/questions/3761276/when-should-i-use-tcp-nodelay-and-when-tcp-cork)  
