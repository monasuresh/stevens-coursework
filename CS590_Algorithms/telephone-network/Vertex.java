import java.util.ArrayList;
import java.util.HashMap;

public class Vertex {
    private String key;

    private HashMap<String, Neighbor> adjacencyList;
    private Integer locationInPriorityQueue = -1;
    private int positionInD;

    private boolean isInPriorityQueue;


    public Vertex(String key) {
        this.key = key;
        this.adjacencyList = new HashMap<String, Neighbor>();
        this.isInPriorityQueue = false;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public HashMap<String, Neighbor> getAdjacencyList() {
        return adjacencyList;
    }

    public void setAdjacencyList(HashMap<String, Neighbor> adjacencyList) {
        this.adjacencyList = adjacencyList;
    }

    public int getLocationInPriorityQueue() {
        return locationInPriorityQueue;
    }

    public void setLocationInPriorityQueue(int locationInPriorityQueue) {
        this.locationInPriorityQueue = locationInPriorityQueue;
    }

    public int getPositionInD() {
        return positionInD;
    }

    public void setPositionInD(int positionInD) {
        this.positionInD = positionInD;
    }

    public boolean isInPriorityQueue() {
        return isInPriorityQueue;
    }

    public void setInPriorityQueue(boolean inPriorityQueue) {
        isInPriorityQueue = inPriorityQueue;
    }
}
