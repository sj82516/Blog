### CentOS Users, Groups and File Permission  
[Source1]
[Source2]

#####Learn how to add users, groups and give diff file permission.    
1. `$ useradd -c [Commit message] -m (create folder under /home/) -M(not create folder) -d [/work/dir] -s [/shell path] -g [default group] -G [groups] user_name`   
2. `$ cat /etc/passwd` // list all users  
3. `$ passwd user_name`  //set password for user  
4. `$ id user_name` //user info  
5. `$ groupadd group_name`  
6. `$ cat /etc/group` // list all groups    
6. `$ chmod -R(recursively, for files in the forlder) xyz dirname/filename`      
7. `$ chmod a+/-[r,w,x]` // add or minux users,group,others permission    
7. `$ chgrp -R dirname/filename`    
10. `$ chown -R user_name dirname/filename`   

======  
* permission: (r,w,x) * (users,group,others). x:for execution. if you don't have /dir x permission, you cannot do `$ cd /dir`!  
* normally , r and x will bind together because if you only open r permission. The user cannot switch to that directory.  
* It is pretty weird that if you own forlder (r+w+x), one file under the forlder you get no permission. By definition, you cannot r/w/e the file. In fact, you cannot read and exec the file but you can delete it!.  
* If you want to {ls,cd} /dir , you need 
	1.dir: x, r permission
* If you want to {cat,more,less} /dir/file,  you need  
	1. dir: x permission
	2. file:r permission
* Can file execute without read permission ?   
[For script :no, for binary file:yes.   
Because script is run by 'shell,python or other interpreter', it need to read file;   
In the other hand, binary file or regualr instruction(ls,cd...) is directly load into kernel.](http://unix.stackexchange.com/questions/34202/can-a-script-be-executable-but-not-readable)  
* Specail permission :
	1. SUID : Set UID. ex:`$ ls -l /etc/passwd` => -rwsr-xr-x:  
	root can directly modify /etc/passwd, normal user cannot. But normal user could use `$passwd` to change his own password!  
	2. SGID : Set GID. If user create new file. The effective group under this dir would apply to new file.  
	ex:userA and userB in the same group. To create a share forlder that userA and userB can cowork.    
	`$ mkdir test`  
	`$ chgrp /test group`  
	`$ chmod 770 /test`  
	`$ su userA`  
	`$ cd /test && touch hello.txt`   
	`$ ls -l hello.txt` -> userA:userA -rw-rw-r-- , userB cannot modify this new file now!  
	===> use SGID    
	`$ mkdir test`  
	`$ chgrp /test group`  
	`$ chmod 2770 /test` // 2 for SGID  
	`$ su userA`  
	`$ cd /test && touch hello.txt`   
	`$ ls -l hello.txt` => userA:group -rw-rw-r--.  
  
  