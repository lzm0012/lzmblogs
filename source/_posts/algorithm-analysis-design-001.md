---
title: 算法分析与设计 001
date: 2026-03-14 10:00:00
categories:
  - 算法分析与设计
tags:
  - 算法
  - 复杂度分析
katex: true
---

# 算法分析与设计 001

## 1. 算法复杂度分析

### 1.1 时间复杂度

时间复杂度描述算法执行时间随输入规模增长的变化趋势，使用大 $O$ 符号表示。

**定义：** 若存在正常数 $c$ 和 $n_0$，使得对所有 $n \geq n_0$，有 $T(n) \leq c \cdot f(n)$，则称 $T(n) = O(f(n))$。

**如何证明$O(n!)>O(a^n)$（其中a为任意正整数）？**

根据**斯特林公式**可知，$n!\approx \sqrt{2\pi n}(\frac{n}{e})^n$，也即为对于任意$a$，由于$n\gg \lceil ae \rceil$，故可认为$n!$复杂度高于$a^n$。

### 1.2 渐变分析

基本符号：上界$O$，下界$\Omega$，紧界$\Theta$，非紧上界$o$，非紧下界$\omega$
#### 1.2.1 上界
上界$O$，若存在正数$c$和$n_0$，使得对于所有的$n>n_0$都有：
$$
0\le f(n)\le cg(n)
$$
则称$f(n)$的渐进上界为$g(n)$，记作$f(n)=O(g(n))$

证明：所有度为K的多项式上界均为$O(n^k)$

证明：不妨设$T_0 = a_kn^k+...+a_1n+a_0$

let $n_0=1$ and let $a^*=max_i|a_i|$
$$
T(n) = \Sigma_{i=0}^ka_in^{i}\le (k+1)a^*n^k
$$
$\therefore$ let $c=k+1$

$QED$
#### 1.2.2 紧界
定义：若对于正数$c_1$,$c_2$和$n_0$使得对于所有$n>n_0$有：
$$
c_1g(n)\le f(n) \le c_2g(n)
$$
则称$f(n)$紧界为$g(n)$，记作$f(n) = \Theta g(n)$

定理：若$\displaystyle \lim_{n \to \infty} \frac{f(n)}{g(n)} = c$，则$f(n) = \Theta g(n)$

### 1.3递归方程分析
- 迭代展开
- 递归树表示
- 假设归纳
- 主定理
#### 1.3.1 迭代展开
e.g. 汉诺塔问题

**解决思路**：将$n-1$个盘子从A柱移到B柱，再将第$n$个大盘子移到C柱，最后再将$n-1$个盘子从B柱移到C柱。

所以可得递归方程：$T(n) = 2T(n-1)+1$
推导：
$$
T(n)+1 = 2(T(n-1)+1)=\dots=2^{n-i}(T(i)+1)
$$
即$T(n)+1=2^{n-1}(T(1)+1)=2^n$，可得$T(n)=2^{n}-1$，即$O(n)=2^n$

e.g.2. $T(n)=2T(\frac{n}{2})+n-1$

推导：设$n=2^k$，则有：
$$
\begin{equation}
\begin{aligned}
T(2^k)&=2T(k-1)+2^k-1\\
&=4T(k-2)+2^k-2+2^k-1\\
&=\dots \\
&=2^kT(1)+k\cdot 2^k-(2^{k-1}+\dots+4+2+1)\\
&=n+nlog_2n-log_2n+1\\
&=n+1+(n-1)log_2n
\end{aligned}
\end{equation}
$$
