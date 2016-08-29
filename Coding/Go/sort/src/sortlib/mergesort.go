package sort

//MergeSort
func MergeSort(l, r int, input, output []int) []int {
	mergesort(l, r, input, output)
	return output
}

func mergesort(l, r int, input, output []int) {
	if l >= r {
		return
	}
	mid := (int)(l+r) / 2
	mergesort(l, mid, input, output)
	mergesort(mid+1, r, input, output)

	i := l
	j := mid + 1
	k := l

	for ; i <= mid && j <= r; k++ {
		if input[i] >= input[j] {
			output[k] = input[j]
			j = j + 1
		} else {
			output[k] = input[i]
			i = i + 1
		}
	}
	if i != (mid + 1) {
		copy(output[k:r+1], input[i:mid+1])
	}
	if j != (r + 1) {
		copy(output[k:r+1], input[j:r+1])
	}

	copy(input[l:r+1], output[l:r+1])
}
