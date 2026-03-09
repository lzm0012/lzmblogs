---
title: Database 001
date: 2026-03-09 10:05:00
categories:
  - database
tags:
  - database
---

# Database 001

## chapter 1：introduction to database

### 1.SQL language
e.g.

```SQL
select instructor name
from instructor
where instructor.dept_name = History
```
在 relation model 中，数据以 **retion** 的形式进行表示，而 SQL 语言的作用是用一种标准化语言，对关系数据进行定义、查询、更新和管理

因此我们可以说， **SQL 语言本质是面向关系函数的声明式语言**。

* **relation**  表示一张表
* **tuple** 元组，表示一行
* **attribute** 属性，表中的一列
* **schema** 属性，即表的结构

**query processor componet**

DDL interpreter -> DML compiler -> Query evaluation engine

* DDL Interpreter 更新数据库系统目录

当收到输入的时候，发生下述操作：
```
SQL语句
   ↓
语法解析
   ↓
更新系统目录
   ↓
分配存储结构
```
* DML Compiler（Data Manipulation Language Compiler）负责编译 SQL 语言

由于用户的输入为声明式语言，因此数据库自己必须决定采用什么样的算法，因此需要一个**编译阶段**如下：
```
SQL
 ↓
关系代数表达式
 ↓
逻辑查询计划
 ↓
物理查询计划
```

（1）Parser（语法解析）

将SQL转换为**语法树**

（2）Query Rewrite（查询重写）

优化逻辑表达式。

（3）Query Optimizer（查询优化）

生成多个候选执行计划，估计成本并选择最低的实现路线

```
Cost = I/O cost + CPU cost
```
* Query Evaluation Engine 查询执行引擎,执行DML优化器生成的查询计划
 
主要作用：执行优化器生成的查询计划

### 2.transaction management 事务管理
* 事务管理

在出现高并发场景（如下）的时候：
```SQL
UPDATE account SET balance = balance - 100 WHERE id = 1;
UPDATE account SET balance = balance + 100 WHERE id = 2;
```
数据库系统必须保证：一组相关操作要么全部完成，要么全部不执行。

* “事务”（transaction）定义

事务是数据库中的一个逻辑操作单元，包含一组 SQL 操作，这些操作必须作为一个整体执行

**事务的ACID性质**

1.Atomicity（原子性）

事务中的操作要么全部执行，要么全部不执行。

如果系统崩溃，数据库会回滚事务。

实现机制通常依赖：

* 日志系统（Write-Ahead Logging）

* Undo log

2.Consistency（一致性）

事务执行前后，数据库必须保持合法状态，如果事务破坏约束，数据库应当拒绝提交。

3.Isolation（隔离性）

多个事务并发执行时，结果应当等价于某种串行执行顺序。

e.g.

事务A
```SQL
UPDATE stock SET count = count - 1;
```
事务B
```SQL
SELECT count FROM stock;
```

事务管理需要通过并发控制(Concurrency Control)解决。

4 Durability（持久性）

事务一旦提交：
```SQL
COMMIT
```
其结果必须永久保存，即使系统崩溃。

实现方式：
* WAL日志
* checkpoint
* recovery机制