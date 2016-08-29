package main

import (
	"fmt"
	sort "sortlib"
)

func main() {
	var in = []int{5, 3, 2, 1, 4, 6, 8, 1, 2, 2, 33, 45, 12}
	var out []int
	out = make([]int, len(in), len(in))
	sort.MergeSort(0, len(in)-1, in, out)
	fmt.Println(out)
	fmt.Println(sort.QuickSort(0, len(in)-1, in))
	fmt.Println(sort.HeapSort(in))
}
