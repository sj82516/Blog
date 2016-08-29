package sort

//QuickSort
func QuickSort(l, r int, input []int) []int {
	quicksort(l, r, input)
	return input
}

func quicksort(l, r int, input []int) {
	if l >= r {
		return
	}
	v := input[l]
	i := l
	lt := l
	gt := r
	for i <= gt {
		if v > input[i] {
			swap(lt, i, input)
			lt = lt + 1
			i = i + 1
		} else if v < input[i] {
			swap(gt, i, input)
			gt = gt - 1
		} else {
			i = i + 1
		}
	}
	quicksort(l, lt-1, input)
	quicksort(gt+1, r, input)
}

func swap(a int, b int, arr []int) {
	temp := arr[a]
	arr[a] = arr[b]
	arr[b] = temp
}
