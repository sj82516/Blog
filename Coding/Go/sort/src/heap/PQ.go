package pq

import "strconv"

type Item struct {
	Priority int
	Value    interface{}
}

type PriorityQueue []*Item

func (pq *PriorityQueue) Init() {
	*pq = append(*pq, &Item{Priority: 0, Value: "0"})
}

func (pq *PriorityQueue) Swap(a, b int) {
	temp := (*pq)[a]
	(*pq)[a] = (*pq)[b]
	(*pq)[b] = temp
}

func (pq *PriorityQueue) Pop() *Item {
	pq.Swap(1, len(*pq)-1)
	item := (*pq)[len(*pq)-1]
	*pq = (*pq)[:len(*pq)-1]
	pq.Sink(1)
	return item
}

func (pq *PriorityQueue) Push(item *Item) {
	*pq = append(*pq, item)
	pq.Swing(len(*pq) - 1)
}

func (pq *PriorityQueue) Swing(index int) {
	i := index
	j := (int)(i / 2)
	for j >= 1 && (*pq)[j].Priority > (*pq)[i].Priority {
		pq.Swap(i, j)
		i = j
		j = (int)(i / 2)
	}
}

func (pq *PriorityQueue) Sink(index int) {
	i := index
	j := 2 * i
	for j < len(*pq) {
		var min int
		if (j + 1) >= len(*pq) {
			min = j
		} else {
			if (*pq)[j].Priority < (*pq)[j+1].Priority {
				min = j
			} else {
				min = j + 1
			}
		}
		if (*pq)[i].Priority > (*pq)[min].Priority {
			pq.Swap(i, min)
			i = min
			j = i * 2
		} else {
			return
		}
	}
}

func (pq *PriorityQueue) String() string {
	var s string
	for i, v := range *pq {
		if i == 0 {
			s = ""
		}
		s = s + "index: " + strconv.Itoa(i) + " priority:" + strconv.Itoa(v.Priority) + " value:" + v.Value.(string) + "\n"
	}
	return s
}
