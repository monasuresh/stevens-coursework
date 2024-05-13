import java.util.HashMap;

public class Graph {
    private HashMap<String, Vertex> V;
    private int positionInD = 0;

    public Graph() {
        this.V = new HashMap<String, Vertex>();
    }

    public HashMap<String, Vertex> getV() {
        return V;
    }

    public void setV(HashMap<String, Vertex> v) {
        V = v;
    }

    public int getPositionInD() {
        return positionInD;
    }

    public void setPositionInD(int positionInD) {
        this.positionInD = positionInD;
    }

    public void insertVertex(String v) {
        Vertex vertex = new Vertex(v);
        vertex.setPositionInD(positionInD);
        positionInD++;
        V.put(v, vertex);
    }

    public void insertEdge(String v, String u, int bandwith) {
        if (!V.containsKey(v) || !V.containsKey(u)) {
            System.out.println("One or more vertices doesn't exist");
        } else {
            V.get(v).getAdjacencyList().put(u, new Neighbor(V.get(u), bandwith));
            V.get(u).getAdjacencyList().put(v, new Neighbor(V.get(v), bandwith));
        }
    }
}
