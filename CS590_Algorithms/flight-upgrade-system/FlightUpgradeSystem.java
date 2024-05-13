/**
 * Author: Monica Suresh
 * Course: CS-590
 * Assignment: Module 4 Priority Queues and Heaps Application Programming Assignment
 * Date: 10/19/2022
 */

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;

public class FlightUpgradeSystem {
    static Request[] heap;
    static int size = -1;

    static Flier[] fliers;
    static int nextEmptyCell = 0;
    static int flightNumber = 1;

    /**
     *
     * @param i - The given node
     * @return - Returns the index of the parent node
     */
    static int parent(int i)
    {
        return (i - 1) / 2;
    }

    /**
     *
     * @param i - The given node
     * @return - Returns the left child of the given node.
     */
    static int leftChild(int i)
    {
        return ((2 * i) + 1);
    }

    /**
     *
     * @param i - The given node
     * @return - Returns the right child of the given node.
     */
    static int rightChild(int i)
    {
        return ((2 * i) + 2);
    }

    /**
     *
     * @param i
     * Shifts the nodes to maintain the heap order
     */
    static void upHeapBubble(int i)
    {
        while (i > 0 &&
                heap[parent(i)].compareTo(heap[i]) > 0)
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
    static void downHeapBubble(int i)
    {
        int max = i;

        int left = leftChild(i);

        if (left <= size &&
                heap[left].compareTo(heap[max]) < 0)
        {
            max = left;
        }

        int right = rightChild(i);

        if (right <= size &&
                heap[right].compareTo(heap[max]) < 0)
        {
            max = right;
        }

        if (i != max)
        {
            swapNodes(i, max);
            downHeapBubble(max);
        }
    }

    /**
     * @param firstName - The fliers first name
     * @param lastName  - The fliers last name
     * @param r         - The fliers request
     * @return - Returns the heap.
     */
    static Request[] addUpgradeRequest(String firstName, String lastName, Request r)
    {
        size = size + 1;
        r.setLocator(nextEmptyCell++);
        heap[size] = r;
        Flier flier = new Flier(firstName, lastName, r.getKey(), size, false);
        fliers[nextEmptyCell - 1] = flier;

        // Bubble up to maintain the heap order
        upHeapBubble(size);

        printAddRequest(flier);
        return heap;
    }

    private static void printAddRequest(Flier flier) {
        System.out.println("Added a new flier to the waiting list. \nName: " + flier.getFirstName() + " "
                + flier.getLastName() + "\nFrequent Flier Status: " +
                flier.getFlyerStatus() + "\nConfirmation Code: " + (nextEmptyCell - 1) +
                "\nDate of request: " + heap[flier.getLocationInWaitingList()].getValue() + "\n");
    }

    /**
     * This method removes the element with the highest priority.
     * @return Returns the flier with the highest priority
     */
    static Flier removeMin()
    {
        Request result = heap[0];

        // Replaces the root node with the last node in the heap
        heap[0] = heap[size];
        size = size - 1;

        // Bubbles down to maintain heap order.
        downHeapBubble(0);
        Flier removedFlier = fliers[result.getLocator()];
        return removedFlier;
    }

    /**
     *
     * @return - Returns the current max
     */
    static Request getMax()
    {
        return heap[0];
    }

    /**
     * Removes a request from the given index.
     * @param i - The index to remove from
     */
    static void remove(int i)
    {
        heap[i] = getMax();

        // Bubbles up to the root of the heap
        upHeapBubble(i);

        // Removes the node with the highest priority
        removeMin();
    }

    static void swapNodes(int i, int j)
    {
        Flier flieri = fliers[heap[i].getLocator()];
        flieri.setLocationInWaitingList(j);
        Flier flierj = fliers[heap[j].getLocator()];
        flierj.setLocationInWaitingList(i);
        Request temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }

    /**
     * This method process the k highest priority fliers by calling removeMin k number of times
     * and printing the k highest priority fliers.
     *
     * @param k - The number of Fliers process
     * @return - Returns the heap.
     */
    static Request[] processKHighestPriorityFliers(int k) {
        System.out.println("These are the " + k + " highest priority fliers: ");
        for (int i = 0; i < k; i++) {
            Flier maxFlier = removeMin();
            printKHighestPriorityFliers(k, maxFlier);
        }
        return heap;
    }

    private static void printKHighestPriorityFliers(int k, Flier maxFLier) {
        System.out.println("First name: " + maxFLier.getFirstName() + "\nLast name: "
                + maxFLier.getLastName() + "\nFlier Status: " + maxFLier.getFlyerStatus() + "\n");
    }

    /**
     * @param confirmationCode - The confirmation code to input.
     * @return - Returns the heap.
     */
    static Request[] cancelUpgrade(int confirmationCode) {
        Flier flierToCancel = fliers[confirmationCode];
        if (flierToCancel.isCanceled()) {
            System.out.println("Your request has already been canceled");
            return heap;
        }

        int location = flierToCancel.getLocationInWaitingList();
        remove(location);
        flierToCancel.setCanceled(true);
        printRemovedFlier(flierToCancel, confirmationCode);
        return heap;
    }

    private static void printRemovedFlier(Flier canceledFlier, int confirmationCode) {
        System.out.println("Cancelled Request: \n" + "First name: " + canceledFlier.getFirstName() + "\nLast name: " +
                canceledFlier.getLastName() + "\nFlier Status: " + canceledFlier.getFlyerStatus() +
                "\nConfirmation code: " + confirmationCode + "\n");
    }

    static void printStartMenu() throws IOException {
        BufferedReader reader = new BufferedReader(
                new InputStreamReader(System.in));
        String line = "";
        int heapArraySize = 1024;
        int fliersArraySize = 1024;
        while (true) {
            System.out.println("Welcome to the New Unknown Airline Flight Upgrade System!");
            System.out.println("Now serving flight NUA" + flightNumber++);
            System.out.println("Enter the maximum amount of requests that the upgrade system can store (This will be " +
                    "the size of the heap array): ");
            line = reader.readLine();
            try {
                heapArraySize = Integer.parseInt(line);
            } catch (Exception e) {
                System.out.println("Error. You've not entered a number.\n");
                continue;
            }

            System.out.println("Enter the maximum amount of flier confirmation codes " +
                    "that the upgrade system can store (This will be " +
                    "the size of the heap fliers array. \nMake sure make this at least twice the amount of the heap" +
                    " \narray so that there will be room for extra fliers when fliers cancel requests.): ");
            line = reader.readLine();
            try {
                fliersArraySize = Integer.parseInt(line);
            } catch (Exception e) {
                System.out.println("Error. You've not entered a number.\n");
                continue;
            }

            FlightUpgradeSystem.heap = new Request[heapArraySize];
            FlightUpgradeSystem.fliers = new Flier[fliersArraySize];
            printMainMenu();
        }
    }

    /**
     * This method prints the main menu and prompts the user to enter a number associated with
     * the menu option.
     * @throws IOException
     */
    static void printMainMenu() throws IOException {
        BufferedReader reader = new BufferedReader(
                new InputStreamReader(System.in));
        String line = "";
        while (true) {
            System.out.println("Enter a number associated with " +
                    "the action you'd like to perform: \n1) Add an upgrade request \n2) Cancel an upgrade request " +
                    "\n3) Process k highest priority fliers\n4) Exit menu");
            line = reader.readLine();
            int optionValue = 0;
            try {
                optionValue = Integer.parseInt(line);
            } catch (Exception e) {
                System.out.println("Error. You've not entered a number.\n");
                continue;
            }

            if (optionValue == 1) {
                if (size == heap.length - 1) {
                    System.out.println("Error. There's no more room left to store requests.\n");
                    continue;
                }

                if (nextEmptyCell == fliers.length) {
                    System.out.println("Error. There's no more room left to store confirmation codes.\n");
                    continue;
                }
                printAddFlierOptions();
            } else if (optionValue == 2) {
                printCancelUpgradeOption();
            } else if (optionValue == 3) {
                if (size < 0) {
                    System.out.println("Error: There aren't any people in the waiting list. \n");
                    continue;
                }
                printKHighestPriorityFliersMenuOption();
                FlightUpgradeSystem.size = -1;
                FlightUpgradeSystem.nextEmptyCell = 0;
                break;
            } else if (optionValue == 4) {
                System.exit(0);
            }
        }
    }

    /**
     * This method prints the add flier option menu.
     * @throws IOException
     */
    static void printAddFlierOptions() throws IOException {
        BufferedReader reader = new BufferedReader(
                new InputStreamReader(System.in));

        String firstName = "";
        while (true) {
            System.out.println("Enter your first name: ");
            firstName = reader.readLine();
            if (!firstName.matches("[a-zA-Z]+")) {
                System.out.println("You've not entered a valid first name. \n");
                continue;
            }
            break;
        }

        String lastName = "";
        while (true) {
            System.out.println("Enter your last name: ");
            lastName = reader.readLine();
            if (!lastName.matches("[a-zA-Z]+")) {
                System.out.println("You've not entered a valid last name. \n");
                continue;
            }
            break;
        }

        String flierStatus = "";
        while (true) {
            System.out.println("Enter your flier status: ");
            flierStatus = reader.readLine().toLowerCase();
            List<String> frequentFlierStatusList = Arrays.asList("super", "platinum", "gold", "silver");
            if (!frequentFlierStatusList.contains(flierStatus)) {
                System.out.println("You've entered an invalid flier status. \n");
                continue;
            }
            break;
        }

        addUpgradeRequest(firstName, lastName, new Request(flierStatus));
    }

    /**
     * This method prints the cancel upgrade menu.
     * @throws IOException
     */
    static void printCancelUpgradeOption() throws IOException {
        if (size < 0) {
            System.out.println("Error: There aren't any requests to cancel. \n");
            return;
        }

        BufferedReader reader = new BufferedReader(
                new InputStreamReader(System.in));
        int confirmationCode = 0;

        while (true) {
            System.out.println("Enter your confirmation code: ");
            String line = reader.readLine();
            try {
                confirmationCode = Integer.parseInt(line);
            } catch (Exception e) {
                System.out.println("Error: The confirmation code must be a number. ");
                continue;
            }

            if (confirmationCode < 0 || confirmationCode >= nextEmptyCell) {
                System.out.println("Error: The confirmation code must be greater than 0, but less than "
                        + nextEmptyCell + "\n");
                continue;
            }
            break;
        }
        cancelUpgrade(confirmationCode);
    }

    /**
     * This method prints the processing k highest priority fliers menu.
     * @throws IOException
     */
    static void printKHighestPriorityFliersMenuOption() throws IOException {
        BufferedReader reader = new BufferedReader(
                new InputStreamReader(System.in));

        int k = 0;
        while (true) {
            System.out.println("Enter the number of upgrades to process: ");
            String line = reader.readLine();
            try {
                k = Integer.parseInt(line);
            } catch (Exception e) {
                System.out.println("Error. Enter a number: ");
                continue;
            }

            if (k < 1 || k > size + 1) {
                System.out.println("Error. You must enter a number between 1 and the number of people in the waiting " +
                        "list. The number of people in the waiting list is " + (size + 1) + "\n");
                continue;
            }

            break;
        }
        processKHighestPriorityFliers(k);
    }

    public static void main(String[] args) throws IOException {
        printStartMenu();
    }
}
