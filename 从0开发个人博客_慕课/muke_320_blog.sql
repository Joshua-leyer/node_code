use myblog;
-- show tables;
-- insert into users(username, `password`, realname) values ("joshua2","123","黑");

-- 查询
-- select * from users;
-- select id,username from users;
-- select * from users where username='joshua2' and `password`='123';
-- select * from users where username like '%j%';

-- 查询后排序 
-- select * from users where password like '%1%' order by id desc;

-- 设置安全模式 SET SQL_SAFE_UPDATES = 0;

-- 更新

 -- update users set realname='蓝' where id='1';

-- update users set realname='黑' where username='joshua2';

-- delete from users where username='joshua2';

-- select * from users where state='1';
-- 不等于0 的选择 select * from users where state<>'1';
-- 通常可以修改state的值来给数据删除的，做标记，不会真正的删除  软删除
-- update users set state='0' where username='joshua3';


-- select * from users

-- blog --





