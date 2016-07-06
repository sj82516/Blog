### Nginx Experiment  
Time to put all theories together.  
Using Docker to deploy servers , and NodeJs for backend server.  

##### 1. About Cache  
Honestly, cache is much more complicated then I thought.  
When implement cache , you need to care two part: server-side and client-side;  
How server and client interact with each other?  
They both depend on HTTP Header !  
Here are several good articles [English](https://www.theodo.fr/blog/2016/06/improve-the-performance-of-your-webapp-configure-nginx-to-cache/), [Chinese 1](https://blog.othree.net/log/2012/12/22/cache-control-and-etag/)  [Chinese2](https://blog.toright.com/posts/3414/%E5%88%9D%E6%8E%A2-http-1-1-cache-%E6%A9%9F%E5%88%B6.html)  
Briefly speaking,   
1. at first browser would send request to server. This time browser has no cache yet.  
2. Then server would return requested files. Corresponding to header
3. browser will cache the files in different way.  
4. Next time browser request the same page again, it would check cache locally, and send request to server.  
5. If server finds out nothing change, it would return 304.Otherwise, send new file back to browser.    
Here is the flow picture.  
![img1]()
![img2]()

The simple Nginx conf code from English ref.  
```
# JS
location ~* ^/static/js/$ {
    add_header Cache-Control public; # Indicate that the resource may be cached by public caches like web caches for instance, if set to 'private' the resource may only be cached by client's browser.

    expires     24h; # Indicate that the resource can be cached for 24 hours
}

# CSS
location ~* ^/static/css/$ {
    add_header Cache-Control pÂublic;

    # Equivalent to above:
    expires     86400; # Indicate that the resource can be cached for 86400 seconds (24 hours)

    etag on; # Add an ETag header with an identifier that can be stored by the client
}

# Images
location ~* ^/static/images/$ {
    add_header Cache-Control must-revalidate; # Indicate that the resource must be revalidated at each access

    etag on;
}
```

Of course, the real situation is much more complicated.  
You can check out [Chinese2](https://blog.toright.com/posts/3414/%E5%88%9D%E6%8E%A2-http-1-1-cache-%E6%A9%9F%E5%88%B6.html).    

##### 2. Proxy / Load balance and Cache.  
