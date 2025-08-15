```shell

(base) ayush@lucas:~$ docker ps
CONTAINER ID   IMAGE                      COMMAND            CREATED              STATUS              PORTS                                                                                      NAMES
2d7970585856   redis/redis-stack:latest   "/entrypoint.sh"   About a minute ago   Up About a minute   0.0.0.0:6379->6379/tcp, [::]:6379->6379/tcp, 0.0.0.0:8001->8001/tcp, [::]:8001->8001/tcp   redis-stack
(base) ayush@lucas:~$ docker exec -it 2d7970585856 bash
root@2d7970585856:/# redis-cli
127.0.0.1:6379> set name:1 ayush
OK
127.0.0.1:6379> set name:2 monika
OK
127.0.0.1:6379> get name:2
"monika"
127.0.0.1:6379> 


```