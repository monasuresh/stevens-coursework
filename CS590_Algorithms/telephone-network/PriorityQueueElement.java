public class PriorityQueueElement implements Comparable<PriorityQueueElement> {
    private Integer dLabels;
    private Vertex v;

    public PriorityQueueElement(int dLabels, Vertex v) {
        this.dLabels = dLabels;
        this.v = v;
    }

    public int getdLabels() {
        return dLabels;
    }

    public void setdLabels(int dLabels) {
        this.dLabels = dLabels;
    }

    public Vertex getV() {
        return v;
    }

    public void setV(Vertex v) {
        this.v = v;
    }

    @Override
    public int compareTo(PriorityQueueElement o) {
        return this.dLabels.compareTo(o.getdLabels());
    }
}
