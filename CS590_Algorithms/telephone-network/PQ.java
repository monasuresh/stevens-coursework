public class PQ {
    static PriorityQueueElement[] heap;
    static int size = -1;

    public PQ(PriorityQueueElement[] heap) {
        this.heap = heap;
        this.size = heap.length - 1;
    }

    public PriorityQueueElement[] getHeap() {
        return heap;
    }

    public void setHeap(PriorityQueueElement[] heap) {
        this.heap = heap;
    }

    /**
     *
     * @param i - The given node
     * @return - Returns the index of the parent node
     */
    public int parent(int i)
    {
        return (i - 1) / 2;
    }

    /**
     *
     * @param i - The given node
     * @return - Returns the left child of the given node.
     */
    public int leftChild(int i)
    {
        return ((2 * i) + 1);
    }

    /**
     *
     * @param i - The given node
     * @return - Returns the right child of the given node.
     */
    public int rightChild(int i)
    {
        return ((2 * i) + 2);
    }

    /**
     *
     * @param i
     * Shifts the nodes to maintain the heap order
     */
    public void upHeapBubble(int i)
    {
        while (i > 0 &&
                heap[parent(i)].compareTo(heap[i]) < 0)
        {
            // Swaps the parent and the current node
            swapNodes(parent(i), i);

            // Sets i to equal the parent of i
            i = parent(i);
        }
    }

    /**
     *
     * @param i
     * Shifts the node down to maintain the heap order
     */
    public void downHeapBubble(int i)
    {
        int max = i;

        int left = leftChild(i);

        if (left <= size &&
                heap[left].compareTo(heap[max]) > 0)
        {
            max = left;
        }

        int right = rightChild(i);

        if (right <= size &&
                heap[right].compareTo(heap[max]) > 0)
        {
            max = right;
        }

        if (i != max)
        {
            swapNodes(i, max);
            downHeapBubble(max);
        }
    }
    public PriorityQueueElement removeMin()
    {
        PriorityQueueElement result = heap[0];

        // Replaces the root node with the last node in the heap
        heap[0] = heap[size];
        size = size - 1;

        // Bubbles down to maintain heap order.
        downHeapBubble(0);
        return result;
    }

    /**
     *
     * @return - Returns the current max
     */
    public PriorityQueueElement getMax()
    {
        return heap[0];
    }

    /**
     * Removes a request from the given index.
     * @param i - The index to remove from
     */
    public void remove(int i)
    {
        heap[i] = getMax();

        // Bubbles up to the root of the heap
        upHeapBubble(i);

        // Removes the node with the highest priority
        removeMin();
    }

    public boolean isEmpty() {
        return size == -1;
    }

    public PriorityQueueElement[] insert(PriorityQueueElement priorityQueueElement)
    {
        size = size + 1;
        heap[size] = priorityQueueElement;
        priorityQueueElement.getV().setLocationInPriorityQueue(size);

        // Bubble up to maintain the heap order
        upHeapBubble(size);

        return heap;
    }

    public void swapNodes(int i, int j)
    {
        PriorityQueueElement temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
        heap[i].getV().setLocationInPriorityQueue(i);
        heap[j].getV().setLocationInPriorityQueue(j);
    }

    static void buildHeapFromArray(PriorityQueueElement[] arr) {
        for(int i = (arr.length/2)-1 ; i >= 0; i--)
        {
            downHeapBubbleToBuildHeap(arr, i, arr.length);
        }
    }

    static void downHeapBubbleToBuildHeap(PriorityQueueElement heap[], int parent, int size)
    {
        int largest = parent;
        int leftChild = 2 * parent + 1;
        int rightChild = 2 * parent + 2;

        if(leftChild < size && heap[leftChild].compareTo(heap[largest]) > 0)
            largest = leftChild;
        if(rightChild < size && heap[rightChild].compareTo(heap[largest]) > 0)
            largest = rightChild;
        if(parent != largest)
        {
            PriorityQueueElement temp = heap[parent];
            heap[parent] = heap[largest];
            heap[largest] = temp;
            heap[parent].getV().setLocationInPriorityQueue(parent);
            heap[largest].getV().setLocationInPriorityQueue(largest);
            downHeapBubbleToBuildHeap(heap,largest,size);
        }
    }
}
