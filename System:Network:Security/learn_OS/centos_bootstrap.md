### CentOS 開機流程  
[資料來源一.Udemy Course0](https://www.udemy.com/linux-administration)  
[資料來源二.鳥哥 第十九章](http://linux.vbird.org/linux_basic/0510osloader.php)  

![img source from 鳥哥](https://github.com/sj82516/Blog/blob/master/System:Network:Security/learn_OS/img/osloader-flow-initramfs.jpg)

##### BIOS  
1.OS independent   
2.primary to start boot loader  
3. `$ ls -F /boot` // check all BIOS start module 
<pre>
	vmlinuz-3.10.0.....
	initramfs  //Initial RAM Disk
	grub2  // Boot Loader
</pre>
4.POST: Check hardwares  
##### Boot Loader   
1.Current CentOS v7 : Grub2  
`$ cat /boot/grub2/grub.cfg` // grub2 setting , normally not to edit  
`$ cat /etc/default/grub` // edit this grub2 config instead  
<pre>
GRUB_TIMEOUT=5                   # countdown  
GRUB_DEFAULT=saved               # default bootsrap menu 
GRUB_DISABLE_SUBMENU=true        # normally hide
GRUB_TERMINAL_OUTPUT="console"   
GRUB_CMDLINE_LINUX="rd.lvm.lv=centos/root rd.lvm.lv=centos/swap crashkernel=auto rhgb quiet"
GRUB_DISABLE_RECOVERY="true"     # cancel resecue menu  
</pre>
`$ grub2-mkconfig` // rebuild grub.cfg  

2.Primary to load OS Kernel  
3.Kernel detect hardware and load drivers(modules)  
4.Module stored in /lib/modules/  
`$ /lib/modules/$(uname -r)/kernel`  
<pre>/arch /crypto /fs /net ....</pre>
`$ lsmod` // show all modules  
`$ modprobe [-cfr] module_name`  //manually load module   
`$ modprobe -r module_name` // manually remove module  
5.Kernel call systemd.  
6.Using target instead of runlevel.  
`$ ll -d /usr/lib/systemd/system/runlevel*.target | cut -c 28-`
<pre>
May  4 17:52 /usr/lib/systemd/system/runlevel0.target -> poweroff.target
May  4 17:52 /usr/lib/systemd/system/runlevel1.target -> rescue.target
May  4 17:52 /usr/lib/systemd/system/runlevel2.target -> multi-user.target
May  4 17:52 /usr/lib/systemd/system/runlevel3.target -> multi-user.target
May  4 17:52 /usr/lib/systemd/system/runlevel4.target -> multi-user.target
May  4 17:52 /usr/lib/systemd/system/runlevel5.target -> graphical.target
May  4 17:52 /usr/lib/systemd/system/runlevel6.target -> reboot.target</pre>  
`$ systemctl isolate [target]` //exec diff target  
`$ systemctl set-default [target]` //usaully, graphic.target or multi-user.target(text mode)  
`$ systemctl list-dependencies graphical.target` // show all depedency services  


##### Initial RAM Disk  
1.when bootstraping, kernel cannot recognize Disk format (SATA, SSD...) because the root file haven't amount(cannot load /lib/modules). In this case, initrd store the disk and file system drivers , then loaded by boot loader.  
2.location: /boot/initrd or /boot/initramfs    
3.Systemd would manage initrd and form temp file directory.  

##### Questions and answers  
1.In multi-OS machine, such as linux and Win. How to switch bootloader?  
Ans: Each OS disk partition would reserve it's own boot loader. And in main MBR boot sector will be replace by the last installed OS.  
In the menu provided by boot loader, user can select which OS to bootstrap, then the default boot loader will switch to selected boot loader.  
However, Windows boot loader doesn't have switching boot loader ability. It is common to install Windows and then Linux if needed.  

2.How to set up new boot loader menu  
Ans: `$ vim /etc/grub.d/40_custom`  
The content is copied part of /boot/grub2/grub.cfg and modified to open graphical bootstrap.    
<pre>
menuentry 'My graphical CentOS, with Linux 3.10.0-229.el7.x86_64' --class rhel fedora
          --class gnu-linux --class gnu --class os --unrestricted --id 'mygraphical' {
        load_video
        set gfxpayload=keep
        insmod gzio
        insmod part_gpt
        insmod xfs
        set root='hd0,gpt2'
        if [ x$feature_platform_search_hint = xy ]; then
          search --no-floppy --fs-uuid --set=root --hint='hd0,gpt2'  94ac5f77-cb8a-495e-a65b-...
        else
          search --no-floppy --fs-uuid --set=root 94ac5f77-cb8a-495e-a65b-2ef7442b837c
        fi
        linux16 /vmlinuz-3.10.0-229.el7.x86_64 root=/dev/mapper/centos-root ro rd.lvm.lv=centos/root rd.lvm.lv=centos/swap crashkernel=auto rhgb quiet elevator=deadline <b>systemd.unit=graphical.target</b>
        initrd16 /initramfs-3.10.0-229.el7.x86_64.img
} </pre>  
`$ grub2-mkconfig -o /boot/grub2/grub.cfg`  

3.bootloader switch require password   
`$ vim /etc/grub.d/01_users`  // add user
`$ vim /etc/grub.d/10_linux` // [in menuentry] --unrestricted => --users user_name --restricted
