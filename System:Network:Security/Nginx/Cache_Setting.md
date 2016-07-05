### Nginx Cache Control  

##### Basic Cache setup  
```
http {
    proxy_cache_path /data/nginx/cache keys_zone=one:10m; --> 10m means "10 mega bytes volume for meta data, not real file size"

    server {
        proxy_cache one;
        location / {
            proxy_pass http://localhost:8000;
        }
    }
}```

##### Specify Request to cache
```
  proxy_cache_key "$host$request_uri$cookie_user";
  //Specify cache key, if key hits, nginx will return cached file.  
  proxy_cache_min_uses 5;
  //At least hit 5 times , this response would be cached.
  proxy_cache_methods GET HEAD POST;
```

##### Limiting or Bypassing Caching  
You don't want to cache all responses, you could add some limitation on it.
```
proxy_cache_valid 200 302 10m;
proxy_cache_valid 404      1m;
proxy_cache_valid any 5m;
// m for minutes  

proxy_cache_bypass $cookie_nocache $arg_nocache$arg_comment;
proxy_no_cache $http_pragma $http_authorization;
//not to cache if the condition happens.  
```

##### Purge   
Normally , Nginx would not remove cached file until it is outdated or exceed the max volume.
But sometimes you want to clean up all cache, you can call purge to clean up by hand.  
call $ curl -X PURGE -D – "https://www.example.com/*" and below settings.
```
http {
    ...
    proxy_cache_path /data/nginx/cache levels=1:2 keys_zone=mycache:10m purger=on;

    map $request_method $purge_method {
        PURGE 1;
        default 0;
    }

    server {
        listen      80;
        server_name www.example.com;

        location / {
            proxy_pass        https://localhost:8002;
            proxy_cache       mycache;
            proxy_cache_purge $purge_method;
        }
    }

    // restrict incoming command host.
    geo $purge_allowed {
       default         0;
       10.0.0.1        1;
       192.168.0.0/24  1;
    }
    // map module: set up key-value pair
    map $request_method $purge_method {
       PURGE   $purge_allowed;
       default 0;
    }
}```

##### Byte-Range Caching  
Initial cache fill operation may take some time, especially for large files.
*Make sure your NGINX is compiled with the slice module.   
```
location / {
    slice             1m;
    proxy_cache       cache;
    proxy_cache_key   $uri$is_args$args$slice_range;
    proxy_set_header  Range $slice_range;
    // 206: Partial Content
    proxy_cache_valid 200 206 1h;
    proxy_pass        http://localhost:8000;
}```
