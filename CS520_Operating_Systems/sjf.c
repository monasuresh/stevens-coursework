#include <stdio.h>
#include <stdlib.h>
#include <string.h>

//Author: Monica Suresh
// CS 520
// Programming assignment 1
// Shortest Job First scheduling algorithm

typedef struct Process_struct {
	char name[50];
	int priority;
	int cpuBurst;
} Process;

// Node structure
typedef struct ProcessNode_struct {
	Process dataVal;
	struct ProcessNode_struct* nextNodePtr;
} ProcessNode;

// Linked list structure
typedef struct LinkedList {
	struct ProcessNode_struct* head;
	struct ProcessNode_struct* tail;
} LinkedList;

// Create a new node
ProcessNode* createNode(Process initData) {
	ProcessNode* newNode = (ProcessNode*)malloc(sizeof(ProcessNode));
	newNode->dataVal = initData;
	newNode->nextNodePtr = NULL;
	return newNode;
}

// Create a new linked list
LinkedList* createLinkedList() {
	LinkedList* newList = (LinkedList*)malloc(sizeof(LinkedList));
	newList->head = NULL;
	newList->tail = NULL;
	return newList;
}

// Insert a node in ascending order based on CPU burst
void insertNodeBasedOnSJFAlgorithm(LinkedList* list, ProcessNode* newNode) {
	// If the list is empty
	if (list->head == NULL) {
		list->head = newNode;
		list->tail = newNode;
	}
	
	// If the new node should be inserted after nodes with the same CPU burst or as the new head
	else {
		ProcessNode* current = list->head;
		ProcessNode* prev = NULL;

		// Find the appropriate position to insert the new node
		while (current != NULL && current->dataVal.cpuBurst <= newNode->dataVal.cpuBurst) {
			prev = current;
			current = current->nextNodePtr;
		}

		// If the new node should be the new head
		if (prev == NULL) {
			newNode->nextNodePtr = list->head;
			list->head = newNode;
		}
		
		// Insert the new node after the nodes with the same CPU burst or in between other nodes
		else {
			newNode->nextNodePtr = current;
			prev->nextNodePtr = newNode;
		}

		// If the new node is the last node, update the tail
		if (current == NULL) {
			list->tail = newNode;
		}
	}
}

// Function to print the nodes of the linked list and remove them
void printAndRemoveProcesses(LinkedList* list) {
	while (list->head != NULL) {
		ProcessNode* current = list->head;
		list->head = current->nextNodePtr;
		
		printf("Running task = [%s] [%d] [%d] for %d ms.\n", 
		current->dataVal.name, current->dataVal.priority, 
		current->dataVal.cpuBurst, current->dataVal.cpuBurst);
		
		free(current);
	}

	// After removing all nodes, update the tail to NULL
	list->tail = NULL;
}



int main(int argc, char* argv[]) {
	if (argc != 2) {
        	printf("Error. You have not provided the correct arguments. Usage: ./program <file_name>\n");
        	exit(1);
        }
        
	LinkedList* list = createLinkedList();

	// Open the file
	FILE* file = fopen(argv[1], "r");
	
	if (file == NULL) {
		printf("File does not exist or incorrect file type. Failed to open the file.\n");
		exit(1);
	}

	fseek(file, 0, SEEK_END); // This moves the fp to the end of the file
    	
    	if (ftell(file) == 0) { // Check to see if the current position of the fp is at the beginning of the file.
        	printf("Error. The file is empty.\n");
        	exit(1);
    	}
    	
    	fseek(file, 0, SEEK_SET);
    
	char line[1024];
	while (fgets(line, sizeof(line), file)) {
		// Parse the line and create a process
		char name[100];
		int priority, cpuBurst;
		int count = 0;
		for (int i = 0; line[i] != '\0'; i++) {
			if (line[i] == ',') {
				count++;
			}
		}

		count = count + 1;

		if (count != 3) {
			printf("Error. The current line either has too many or too little comma-separated values");
			fclose(file);
			exit(1);
		}
		
		int result = sscanf(line, "%[^,], %d, %d", name, &priority, &cpuBurst);
		if (result < 3) {
			printf("Error. The cpu burst or priority is not a number or an entry is missing for either of those.");
			fclose(file);
			exit(1);
		} else if (result > 3) {
			printf("Error. The data is incorrectly formatted.");
			fclose(file);
			exit(1);
		}
		
		if (cpuBurst <= 0) {
			printf("Error in process %s. The CPU burst must be a positive value\n", name);
			continue;
		}
		
		if (priority <= 0 || priority > 10) {
			printf("Error in process %s. The priority must range from 1 to 10\n", name);
			continue;
		}

		Process process;
		strcpy(process.name, name);
		process.priority = priority;
		process.cpuBurst = cpuBurst;

		// Create a process and insert it into the linked list
		ProcessNode* newNode = createNode(process);
		insertNodeBasedOnSJFAlgorithm(list, newNode);	
	}

	// Close the file
	fclose(file);

	// Print the processes
	printAndRemoveProcesses(list);

	return 0;
}
