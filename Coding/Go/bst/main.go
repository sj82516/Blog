package main

import (
	"bytes"
	"fmt"
	"strconv"
	"strings"

	lane "github.com/oleiade/lane"
)

//Key is in Node, BST sorting by
type Key interface {
	GetV() interface{}
	CompareTo(k Key) int
}

//String is one type of Key
type String struct {
	V string
}

//GetV return value
func (s String) GetV() interface{} {
	return s.V
}

//CompareTo is for String comparision
func (s String) CompareTo(s2 Key) int {
	return strings.Compare(s.GetV().(string), s2.GetV().(string))
}

//Value in Node
type Value interface{}

//Node is in BST Tree
type Node struct {
	Key   Key
	Value Value
	Left  *Node
	Right *Node
}

//BST is Binary Search Tree, only store Root node
type BST struct {
	Root *Node
}

func (bst BST) String() string {
	var queue = lane.NewQueue()
	preorder(bst.Root, queue)
	var buffer bytes.Buffer
	for client := queue.Dequeue(); client != nil; client = queue.Dequeue() {
		buffer.WriteString(" ")
		buffer.WriteString(client.(*Node).Key.GetV().(string))
		buffer.WriteString(":")
		buffer.WriteString(strconv.Itoa(client.(*Node).Value.(int)))
	}
	return buffer.String()
}

func preorder(n *Node, q *lane.Queue) {
	if n != nil {
		q.Enqueue(n)
		preorder(n.Left, q)
		preorder(n.Right, q)
	} else {

	}
}

//Put is function that add new Node in BST
func (bst *BST) Put(k Key, v Value) {
	bst.Root = put(bst.Root, k, v)
}

func put(n *Node, k Key, v Value) *Node {
	var in *Node
	if n == nil {
		return &Node{k, v, in, in}
	}
	cmp := n.Key.CompareTo(k)
	switch cmp {
	case 1:
		n.Left = put(n.Left, k, v)
	case 0:
		n.Value = v
	case -1:
		n.Right = put(n.Right, k, v)
	}
	return n
}

//Get is searching by Key
func (bst *BST) Get(k Key) *Node {
	return get(bst.Root, k)
}

func get(n *Node, k Key) *Node {
	if n == nil {
		return nil
	}
	cmp := n.Key.CompareTo(k)
	switch cmp {
	case 1:
		return get(n.Left, k)
	case 0:
		return n
	case -1:
		return get(n.Right, k)
	}
	return n
}

func (bst *BST) Delete(k Key) {
	bst.Root = delete(bst.Root, k)
}

func delete(n *Node, k Key) *Node {
	if n == nil {
		return nil
	}
	cmp := n.Key.CompareTo(k)
	switch cmp {
	case 1:
		n.Left = delete(n.Left, k)
	case -1:
		n.Right = delete(n.Right, k)
	case 0:
		if n.Right == nil {
			return n.Left
		}
		if n.Left == nil {
			return n.Right
		}
		temp := n
		n = min(n.Right)
		n.Right = deleteMin(temp.Right)
		n.Left = temp.Left
	}
	return n
}

func min(n *Node) *Node {
	if n.Left == nil {
		return n
	}
	return min(n.Left)
}

func deleteMin(n *Node) *Node {
	if n.Left == nil {
		return n.Right
	}
	n.Left = deleteMin(n.Left)
	return n
}

func main() {
	var in *Node
	k1 := String{"abc"}
	k2 := String{"acc"}
	n1 := &Node{k1, 1, in, in}
	bst := &BST{n1}
	bst.Put(k2, 2)
	bst.Put(String{"cba"}, 17)
	bst.Put(String{"baa"}, 15)
	bst.Put(String{"abb"}, 12)
	bst.Put(String{"aba"}, 3)
	bst.Put(String{"aaa"}, 6)
	bst.Put(String{"cca"}, 4)
	bst.Delete(String{"aaa"})
	fmt.Println(bst)
}
