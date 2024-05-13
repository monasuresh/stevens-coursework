import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class TelephoneNetworkSystem {
    public static void main(String[] args) throws IOException {
        printMenu();
    }

    /**
     *
     * @param g The graph which represents a network of switching centers
     * @param x A string that represents the key for the source vertex
     * @param y A string that represents the key for the destination vertex
     * @return An int value which is the max bandwidth between x and y
     */
    public static int findMaxBandwidth(Graph g, String x, String y) {
        int[] D = new int[g.getV().size()]; // Initializes a new D array to hold the best paths found so far from x to each vertex u
        int positionInDX = g.getV().get(x).getPositionInD();
        int positionInDY = g.getV().get(y).getPositionInD();
        D[positionInDX] = (int) Double.POSITIVE_INFINITY; // Initializes the source vertex D label to positive infinity
        PriorityQueueElement[] priorityQueueElements = new PriorityQueueElement[g.getV().size()]; // Initializes a new priority queue
        priorityQueueElements[positionInDX] = new PriorityQueueElement(D[positionInDX], g.getV().get(x)); // Adds the source vertex to the priority queue
        g.getV().get(x).setInPriorityQueue(true);
        g.getV().get(x).setLocationInPriorityQueue(positionInDX);

        // Inserts elements into priority queue array.
        // The D labels are the key and the vertex is the value

        for(Map.Entry<String, Vertex> entry: g.getV().entrySet()) {
            int positionInD = entry.getValue().getPositionInD();
            if (positionInD != positionInDX) {
                // Sets all the D label of all vertices that are not equal to the source to 0 and adds them to the priority queue
                D[positionInD] = 0;
                priorityQueueElements[positionInD] = new PriorityQueueElement(D[positionInD], entry.getValue());
                entry.getValue().setInPriorityQueue(true);
                entry.getValue().setLocationInPriorityQueue(positionInD);
            }
        }

        // Builds a heap from the priority queue array in O(n) time.
        PQ.buildHeapFromArray(priorityQueueElements);
        PQ queue = new PQ(priorityQueueElements);


        // While the queue is not empty...
        while (!queue.isEmpty()) {
            // Does a remove min operation and pulls the vertex u into the cloud
            Vertex u = queue.removeMin().getV();
            u.setInPriorityQueue(false);
            int positionInDU = u.getPositionInD();

            // If u is equal to y then it returns the max bandwidth which is the D[u]
            if (positionInDU == positionInDY) {
                return D[positionInDU];
            } else {
                // Otherwise it iterates through the map and for each vertex incident on u z that's in the priority queue..
                for(Map.Entry<String, Neighbor> entry: u.getAdjacencyList().entrySet()) {
                    Vertex z = entry.getValue().getU();
                    if (z.isInPriorityQueue()) {
                        // checks to see if the minimum between what's in D[u] and w(u, z)
                        int bandwidth = Math.min(D[positionInDU], entry.getValue().getBandwidth());
                        if (bandwidth > D[z.getPositionInD()]) {
                            // If the bandwidth is greater than D[z] it sets D[z] to the bandwidth and changes the key of D[z]
                            D[z.getPositionInD()] = bandwidth;
                            queue.remove(z.getLocationInPriorityQueue());
                            queue.insert(new PriorityQueueElement(D[z.getPositionInD()], z));
                        }
                    }
                }
            }
        }
        return 0;
    }

    /**
     * Prints the menu for the switching centers system. The user can input the vertices and edges
     * for the graph and source and destination vertices.
     * @throws IOException
     */
    public static void printMenu() throws IOException {
        System.out.println("Welcome to the switching centers system.");
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        String vertices = "";
        Graph g = null;

        while (true) {
            boolean isSameVertex = false;
            g = new Graph();
            System.out.println("Enter vertices separated by ;. For example, A;B;C;D. Case matters. " +
                    "For example, A is not considered the same vertex as a. \nHit the enter key when " +
                    "you are done entering the vertices: ");
            vertices = bufferedReader.readLine();
            String[] verticesArray = vertices.split(";");

            if (verticesArray.length <= 1) {
                System.out.println("Error: There must be more than one switching center. Enter more than one vertex. " +
                        "Make sure that ; is the delimiter for the vertices.");
                continue;
            }

            for (int i = 0; i < verticesArray.length; i++) {
                String vertex = verticesArray[i];
                if (!g.getV().containsKey(vertex)) {
                    g.insertVertex(vertex);
                } else {
                    System.out.println("The vertex is already in the graph. Enter vertices again.");
                    isSameVertex = true;
                    break;
                }
            }

            if (isSameVertex) {
                continue;
            }

            break;
        }

        String sourceVertex = "";
        while (true) {
            System.out.println("Enter a source vertex: ");
            sourceVertex = bufferedReader.readLine();
            if (!g.getV().containsKey(sourceVertex)) {
                System.out.println("Error: This vertex is not present in the graph. Try again.");
                continue;
            }
            break;
        }

        String destinationVertex = "";
        while (true) {
            System.out.println("Enter a destination vertex: ");
            destinationVertex = bufferedReader.readLine();
            if (!g.getV().containsKey(destinationVertex)) {
                System.out.println("Error: This vertex is not present in the graph. Try again.");
                continue;
            }

            if (sourceVertex.equals(destinationVertex)) {
                System.out.println("The source destination cannot be the same as the destination vertex. Try another destination vertex");
                continue;
            }
            break;
        }

        String edge = "";
        System.out.println("Enter edges with their weight separated by ;. Hit enter after you enter each edge. " +
                "For example, A;B;10 \nType done and hit enter when " +
                "you are done entering the edges: ");
        while (true) {
            edge = bufferedReader.readLine();

            if (edge.toLowerCase().equals("done")) {
                break;
            }

            String[] edgeArray = edge.split(";");
            if (edgeArray.length < 3 || edgeArray.length > 3) {
                System.out.println("Error: You must enter three values separated by ;. Try again");
                continue;
            }

            if (edgeArray[0].equals(edgeArray[1])) {
                System.out.println("Error: Both vertices of an edge cannot be the same. Enter two different vertices" +
                        " for the edge. Enter " +
                        "edges with their weight separated by ;");
                continue;
            }

            if (!g.getV().containsKey(edgeArray[0]) || !g.getV().containsKey(edgeArray[1])) {
                System.out.println("Error: One of the vertices does not exist in the graph. Please reenter the " +
                        "edges with their weight separated by ;");
                continue;
            } else {
                int weight = 0;
                try {
                    weight = Integer.parseInt(edgeArray[2]);
                } catch (Exception e) {
                    System.out.println("Error: You either entered a non-digit for the bandwidth or a non-int. The bandwidth must be an integer" +
                            " greater than or equal to 0. " +
                            "Reenter the edges with their weight separated by ;");
                    continue;
                }

                if (weight <= 0) {
                    System.out.println("Error: You entered a negative number for the bandwidth. The bandwidth must be a positive number. " +
                            "Reenter the edges with their weight separated by ;");
                    continue;
                }
            }

            if (g.getV().get(edgeArray[0]).getAdjacencyList().containsKey(edgeArray[1])) {
                System.out.println("Error: This edge already exists in the graph. Enter another edge that doesn't exist");
                continue;
            }

            g.insertEdge(edgeArray[0], edgeArray[1], Integer.parseInt(edgeArray[2]));
            HashMap<String, Neighbor> bandwidth = g.getV().get(edgeArray[0]).getAdjacencyList();
        }

        int maxBandwidth = findMaxBandwidth(g, sourceVertex, destinationVertex);
        System.out.println("The max bandwidth between "+ sourceVertex + " and " + destinationVertex +
                " is: " + maxBandwidth);
    }


}
