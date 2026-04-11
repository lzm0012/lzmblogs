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
#### 非递归分治
例如：选择排序、插入排序、冒泡排序、堆排序

堆排序的过程：首先建立大根堆，将父节点与左右子节点进行交换（也即下沉），直到形成父节点>左节点>右节点的过程，然后将最大的父节点和最小的子节点交换，重新进行上一过程，由于手动实现了迭代，所以不需要使用递归。

```cpp
template <typename T>
void heapify(T data[], int n, int i) {
  while (true) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;

    if (l < n && data[l] > data[largest]) largest = l;
    if (r < n && data[r] > data[largest]) largest = r;

    if (largest == i) break;
    std::swap(data[i], data[largest]);
    i = largest;
  }
}

template <typename T>
void heap_sort(T data[], int n) {
  // 建大根堆
  for (int i = n / 2 - 1; i >= 0; --i) {
    heapify(data, n, i);
  }

  // 每次将堆顶最大值放到末尾，并重建堆
  for (int i = n - 1; i > 0; --i) {
    std::swap(data[0], data[i]);
    heapify(data, i, 0);
  }
}
```
