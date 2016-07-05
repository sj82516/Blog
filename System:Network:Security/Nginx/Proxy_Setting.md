### Nginx Proxy Server  
To increase web server throughput, you can use nginx as proxy server.
The main purpose is to load balance multi backend servers or to pass requests to corresponding servers.  
Reference: [official doc](https://www.nginx.com/resources/admin-guide/reverse-proxy/)
##### 1. Passing Request Headers  
You can add some custom header when passing request to backend server.
```
location /some/path/ {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_pass http://localhost:8000;
}```

##### 2. Control buffer  
When backend servers respond to nginx, default nginx would store response in buffer
and send to clients until whole response received.  
It would helpful when client is slow.  
```
location /some/path/ {
    proxy_buffers 16 4k;
    proxy_buffer_size 2k;
    proxy_pass http://localhost:8000;
}```

If client is time sensitive, you can turn it off.  
```
location /some/path/ {
    proxy_buffers 16 4k;
    proxy_buffer_size 2k;
    proxy_pass http://localhost:8000;
}```

##### Load balance  
It is easy to do load balance in nginx. The basic setup is to declare upstream group and then proxy_pass to that group.
```
http {
    upstream backend {
        [load_balance_method] ;

        server backend1.example.com weight=5;
        server backend2.example.com down; --> down: shut down this server slowly.
        server 192.0.0.1 backup; --> turn on onless other servers all down.
    }
    server {
        location / {
            proxy_pass http://backend;
        }
    }
}```

##### Load balance Method  
1. round robin: default  
2. least_conn;  
with the least number of active connections  
3. ip_hash;
4. hash $request_uri consistent;   
// suppose there are A,B,C servers and {1,2,3} requests to A , {4-6} to B and {7-9} to C. If shut C down, normally the hash function would redirect all requests to A,B server. But add "consistent", {1-3} still stick to A and {4-6} to B. left {7-9} would pass to A or B.
5. least_time header;

##### Nginx Plus additional abilities.
1. Session Persistence  
2. Limiting the Number of Connections
3. Health Monitoring
4. on-the-fly change
