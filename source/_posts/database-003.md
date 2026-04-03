---
title: introduction to SQL
date: 2026-04-01 10:00:00
categories:
  - database
tags:
  - database
---
## SQL language
### tables & keys
row->行，对应资料

cloumn->列，对应属性

#### keys
- 1.primary key（主键）：唯一区分每一个资料的属性，需要注意的是，如果一个primary key无法唯一区分资料属性，此时可以选择多个属性以作为primary key
- 2.foreign key（外键）：指向另外一个table，通过一个新增属性，并将其设置为primary key，使得两个表格之间进行联系。需要注意的是，foreign key必须为新添加的表格的primary key。同时，foreign key也可以有很多个。

#### SQL language
- 1.创建资料库
```SQL
CREATE DATABASE `****`;
```
- 2.显示资料库
```SQL
SHOW DATABASES;
```
- 3.选择数据库
```SQL
USE `***`;
```
- 4.资料形态
```SQL
INT --整数
DECIMAL(m,n) --有小数点的数
VARCHAR(n) --子串
BOLB --(binary large object)包括图片，影片，档案等
DATE --'YYYY-MM-DD'日期
TIMESTAMP --'YYYY-MM-DD HH:MM:SS'时间戳，记录时间
```
- 5.创建table
```SQL
CREATE TABLE `xxxx`(
    `hayaku`INT PRIMARY KEY,
    `omazli`VARCHAR(4),
    `wasaby`VARCHAR(4)
)
```
- 6.显示数据库结构
```SQL
DESCRIBE `xxxx`;
```
- 7.删除数据库
```SQL
DROP `xxxx`;
```
- 8.新增/删除表格属性
```SQL
ALTER TABLE `xxxx` ADD mmmm DEIMAL(3,2);
ALTER TABLE `xxxx` DROP COLUMN mmmm;
```
- 9.存入资料
```SQL
INSERT INTO `xxxx` VALUES(1,'MANBO','HACHIMI');
INSERT INTO `xxxx`(`mm)
```
- 10.列出资料
``` SQL
SELECT * FROM `xxxx`;
```
- 11.限制/约束
```SQL
NOT NULL --不得为空
UNIQUE --单独值，不可重复
DEFAULT 'genshin' --默认值
```
- 12.