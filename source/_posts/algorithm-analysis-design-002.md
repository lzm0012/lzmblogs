---
title: 算法分析与设计 002
date: 2026-03-21 00:00:00
categories:
  - 算法分析与设计
tags:
  - 算法
katex: true
---
## 分治策略

### 分治递归

#### 归并排序
- 将序列从中间分为两个子序列
- 对两个子序列进行归并排序
```cpp
template <typename T>
void merge_sort(T data[], T out[], int s, int m, int l) {
  int i = s;
  int j = m + 1;
  int k = s;

  while (i <= m && j <= l) {
    if (data[i] <= data[j]) out[k++] = data[i++];
    else out[k++] = data[j++];
  }

  while (i <= m) out[k++] = data[i++];
  while (j <= l) out[k++] = data[j++];

  for (int p = s; p <= l; ++p) data[p] = out[p];
}

template <typename T>
void merge_sort(T data[], T out[], int s, int l) {
  if (s >= l) return;

  int m = s + (l - s) / 2;
  merge_sort(data, out, s, m);
  merge_sort(data, out, m + 1, l);
  merge_sort(data, out, s, m, l);
}
```
