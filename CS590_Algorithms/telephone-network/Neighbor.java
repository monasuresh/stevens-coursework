public class Neighbor {
    private Vertex u;
    private int bandwidth;

    public Neighbor(Vertex u, int bandwidth) {
        this.u = u;
        this.bandwidth = bandwidth;
    }

    public Vertex getU() {
        return u;
    }

    public void setV(Vertex u) {
        this.u = u;
    }

    public int getBandwidth() {
        return bandwidth;
    }

    public void setBandwidth(int bandwidth) {
        this.bandwidth = bandwidth;
    }
}
