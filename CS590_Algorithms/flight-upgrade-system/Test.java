import java.util.ArrayList;
import java.util.TreeMap;
import java.util.TreeSet;

public class Test {

    public static void main(String[] args) {
        FlightUpgradeSystem.heap = new Request[1024];
        FlightUpgradeSystem.fliers = new Flier[1024];
        // Test Case 1 Add Upgrade Request
        Request[] heap = FlightUpgradeSystem.addUpgradeRequest("Monica", "Suresh", new Request("Gold"));
        FlightUpgradeSystem.addUpgradeRequest("test1", "test1", new Request("Silver"));
        FlightUpgradeSystem.addUpgradeRequest("test2", "test2", new Request("Gold"));

        System.out.println("Tests that adding upgrade requests maintains the heap order: ");
        System.out.println("Expected value: Monica Gold test1 Silver test2 Gold");
        System.out.println("Actual value: " + FlightUpgradeSystem.fliers[heap[0].getLocator()].getFirstName()
                + " " + heap[0].getKey() + " " + FlightUpgradeSystem.fliers[heap[1].getLocator()].getFirstName()
                + " " + heap[1].getKey() + " " + FlightUpgradeSystem.fliers[heap[2].getLocator()].getFirstName()
                + " " + heap[2].getKey() + "\n");

        // Test Case 2 Cancel Upgrade Request
        FlightUpgradeSystem.cancelUpgrade(2);
        System.out.println("Tests that cancelling upgrade requests maintains the heap order: ");
        System.out.println("Expected value: Monica Gold test1 Silver");
        System.out.println("Actual value: " + FlightUpgradeSystem.fliers[heap[0].getLocator()].getFirstName()
                + " " + heap[0].getKey() + " " + FlightUpgradeSystem.fliers[heap[1].getLocator()].getFirstName()
                + " " + heap[1].getKey() + "\n");

        // Test Case 3 Process Upgrade Request
        FlightUpgradeSystem.processKHighestPriorityFliers(1);
        System.out.println("Tests that processing k requests maintains the heap order: ");
        System.out.println("Expected value: test1 Silver");
        System.out.println("Actual value: " + FlightUpgradeSystem.fliers[heap[0].getLocator()].getFirstName()
                + " " + heap[0].getKey() + "\n");
    }
}
