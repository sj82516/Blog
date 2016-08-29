package sort

import heap "heap"

func HeapSort(input []int) []int {
	var output []int
	pq := new(heap.PriorityQueue)
	pq.Init()
	for _, v := range input {
		pq.Push(&heap.Item{Priority: v, Value: ""})
	}
	for i := len(*pq); i > 1; i-- {
		output = append(output, pq.Pop().Priority)
	}
	return output
}
