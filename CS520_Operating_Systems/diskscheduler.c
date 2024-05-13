#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <ctype.h>
#include <string.h>

/* Author: Monica Suresh
   Course: CS-520
   Project: Disk Scheduling Algorithms
*/

// Function prototypes
void fcfs(int * requests, int numRequests, int initial);
void sstf(int * requests, int numRequests, int initial);
void scan(int * requests, int numRequests, int initial, int diskSize, char * direction);
void look(int * requests, int numRequests, int initial, char * direction);
void cscan(int * requests, int numRequests, int initial, int diskSize);
void clook(int * requests, int numRequests, int initial, int sdiskSize);

bool isInteger(const char * str) {
  char * endptr;
  strtol(str, & endptr, 10);

  if (endptr == str) {
    return false;
  }

  while ( * endptr != '\0') {
    if (!isspace( * endptr))
      return false;
    endptr++;
  }

  return true;
}

// Function to implement First Come First Serve disk scheduling algorithm.
void fcfs(int * requests, int numRequests, int initial) {
  int totalHeadMovement = 0; // Variable to store the total head movement.

  // Iterate through each request in the given array.
  for (int i = 0; i < numRequests; i++) {
    totalHeadMovement = totalHeadMovement + abs(requests[i] - initial); // Calculate the absolute distance between the current request and the initial position and add it to the total head movement.

    initial = requests[i];
    printf("Servicing %d\n", initial);
  }

  printf("        FCFS = %d\n", totalHeadMovement);
}

void sstf(int * requests, int numRequests, int initial) {
  int totalHeadMovement = 0;
  int count = 0;

  while (count != numRequests) {
    int min = 1e9;
    int d, index;

    // Loop through all the requests to find the nearest unvisited request.
    for (int i = 0; i < numRequests; i++) {
      d = abs(requests[i] - initial); // Calculate the distance from the current head position to the request.
      if (min > d) {
        min = d; // Update 'min' with the new minimum distance.
        index = i;
      }
    }
    totalHeadMovement += min; // Add the minimum distance to the total head movement.
    initial = requests[index];
    printf("Servicing %d\n", initial);
    requests[index] = 1e9; // Mark the serviced request as visited by setting it to a large value.

    count++;
  }

  printf("        SSTF = %d\n", totalHeadMovement);
}

// Definition of the cscan method - this algorithm moves in one direction which is upwards through the cylinders
void cscan(int * requests, int numRequests, int initial, int diskSize) {
  int currentRequest = 0;
  int * left = (int * ) malloc(numRequests * sizeof(int));
  int * right = (int * ) malloc(numRequests * sizeof(int));
  int leftCount = 0;
  int rightCount = 0;
  int distance = 0;
  int * requestsServiced = (int * ) malloc((numRequests + 1) * sizeof(int));
  int totalHeadMovement = 0;

  left[leftCount++] = 0;
  right[rightCount++] = diskSize - 1;

  // Partitioning the disk requests into left and right arrays based on their position relative to the initial position.
  // Requests smaller than the initial position are added to the left array, and those greater are added to the right array.
  for (int i = 0; i < numRequests; i++) {
    if (requests[i] < initial)
      left[leftCount++] = requests[i];
    if (requests[i] > initial)
      right[rightCount++] = requests[i];
  }

  // Sorting the left and right arrays in ascending order.
  for (int i = 0; i < leftCount - 1; i++) {
    for (int j = i + 1; j < leftCount; j++) {
      if (left[i] > left[j]) {
        int temp = left[i];
        left[i] = left[j];
        left[j] = temp;
      }
    }
  }

  for (int i = 0; i < rightCount - 1; i++) {
    for (int j = i + 1; j < rightCount; j++) {
      if (right[i] > right[j]) {
        int temp = right[i];
        right[i] = right[j];
        right[j] = temp;
      }
    }
  }

  int requestCounter = 0;

  // Servicing the requests to the right of the initial position.
  for (int i = 0; i < rightCount; i++) {
    currentRequest = right[i];

    if (i != rightCount - 1) {
      requestsServiced[requestCounter++] = currentRequest; // Adding the current track to the array.
    }

    distance = abs(currentRequest - initial); // Calculating the absolute distance (seek time) between the current and next track.
    totalHeadMovement += distance; // Adding the time to the total head movement.
    initial = currentRequest; // Moving the head to the current track position.
  }

  initial = 0; // Moving the head to the beginning of the disk.

  totalHeadMovement += (diskSize - 1); // Adding the time for moving the head from the end to the beginning of the disk.

  // Servicing the requests to the left of the initial position.
  for (int i = 0; i < leftCount; i++) {
    currentRequest = left[i];

    if (i != 0) {
      requestsServiced[requestCounter++] = currentRequest; // Adding the current track to the array.
    }

    distance = abs(currentRequest - initial); // Calculating the absolute distance (seek time) between the current and next track.
    totalHeadMovement += distance; // Adding the result to the total head movement.
    initial = currentRequest; // Moving the head to the current request position.
  }

  // Printing the sequence of disk tracks being serviced.
  for (int i = 0; i < requestCounter; i++) {
    printf("Servicing %d\n", requestsServiced[i]);
  }

  // Printing the total seek count (total seek time) for the C-SCAN algorithm.
  printf("        C-SCAN = %d\n", totalHeadMovement);

  // Free the dynamically allocated memory.
  free(left);
  free(right);
  free(requestsServiced);
}

// Definition of the clook method - this algorithm moves in one direction which is upwards through the cylinders
void clook(int * requests, int numRequests, int initial, int diskSize) {
  int distance = 0; // Variable to store the distance between the current track and the next track.
  int currentRequest = 0; // Variable to store the current request being accessed.

  // Allocate memory to store the left and right sub-queues.
  int * left = (int * ) malloc(numRequests * sizeof(int));
  int * right = (int * ) malloc(numRequests * sizeof(int));

  // Allocate memory to store the seek sequence.
  int * rqServiceSequence = (int * ) malloc((numRequests + 1) * sizeof(int));

  int leftSize = 0; // Initialize the counter of the left sub-queue.
  int rightSize = 0; // Initialize the counter of the right sub-queue.
  int totalHeadMovement = 0; // Initialize the variable to count the total head movement

  // Separate the request array into left and right arrays based on their position relative to 'initial'.
  for (int i = 0; i < numRequests; i++) {
    if (requests[i] < initial)
      left[leftSize++] = requests[i];
    if (requests[i] > initial)
      right[rightSize++] = requests[i];
  }

  // Sort the left array in ascending order using Bubble Sort.
  for (int i = 0; i < leftSize - 1; i++) {
    for (int j = 0; j < leftSize - i - 1; j++) {
      if (left[j] > left[j + 1]) {
        int temp = left[j];
        left[j] = left[j + 1];
        left[j + 1] = temp;
      }
    }
  }

  // Sort the right array in ascending order using Bubble Sort.
  for (int i = 0; i < rightSize - 1; i++) {
    for (int j = 0; j < rightSize - i - 1; j++) {
      if (right[j] > right[j + 1]) {
        int temp = right[j];
        right[j] = right[j + 1];
        right[j + 1] = temp;
      }
    }
  }

  int requestCounter = 0; // Initialize the request counter

  // Process the requests in the right array.
  for (int i = 0; i < rightSize; i++) {
    currentRequest = right[i];

    rqServiceSequence[requestCounter++] = currentRequest; // Store the current request in the request sequence.

    distance = abs(currentRequest - initial); // Calculate the distance from the previous track.

    totalHeadMovement += distance; // Add the distance to the total head movement.

    initial = currentRequest; // Move the head to the current track.
  }

  if (left[0] >= 0 && left[0] < diskSize) {
    totalHeadMovement += abs(initial - left[0]); // Add the seek distance from the last track of the right array to the first track of the left array.
  }
  initial = left[0]; // Move the head to the first track of the left array.

  // Process the requests in the left array.
  for (int i = 0; i < leftSize; i++) {
    currentRequest = left[i];
    rqServiceSequence[requestCounter++] = currentRequest; // Store the current track in the request sequence.

    distance = abs(currentRequest - initial); // Calculate the distance from the previous track.

    totalHeadMovement += distance; // Add the distance to the total head movement.

    initial = currentRequest; // Move the head to the current track.
  }

  // Printing the sequence of requests being serviced.
  for (int i = 0; i < requestCounter; i++) {
    printf("Servicing %d\n", rqServiceSequence[i]);
  }

  // Printing the total head movement
  printf("        C-LOOK = %d\n", totalHeadMovement);

  // Free the dynamically allocated memory.
  free(left);
  free(right);
  free(rqServiceSequence);
}

// Function to perform the SCAN disk scheduling algorithm. The direction must be given (left or right).
void scan(int * requests, int numRequests, int initial, int diskSize, char * direction) {
  int totalHeadMovement = 0;
  int requestCounter = 0;
  int distance, currentRequest = 0;
  int * left = (int * ) malloc(numRequests * sizeof(int));
  int * right = (int * ) malloc(numRequests * sizeof(int));
  int * rqServiceSequence = (int * ) malloc((numRequests + 1) * sizeof(int));
  int positionToIgnoreRight = 0;
  int positionToIgnoreLeft = 0;

  int leftSize = 0;
  int rightSize = 0;

  // Determine the starting point based on the direction (left or right)
  if (strcmp(direction, "left") == 0) {
    left[leftSize++] = 0; // Add the initial position to the left side array
  } else if (strcmp(direction, "right") == 0) {
    right[rightSize++] = diskSize - 1; // Add the initial position to the right side array
  }

  // Split the requests into left and right sides based on the initial position
  for (int i = 0; i < numRequests; i++) {
    if (requests[i] < initial) {
      left[leftSize++] = requests[i]; // Add requests smaller than the initial position to the left side array
    }
    if (requests[i] > initial) {
      right[rightSize++] = requests[i]; // Add requests larger than the initial position to the right side array
    }
  }

  // Sort the left and right side arrays to service requests in ascending order
  for (int i = 0; i < leftSize - 1; i++) {
    for (int j = i + 1; j < leftSize; j++) {
      if (left[i] > left[j]) {
        int temp = left[i];
        left[i] = left[j];
        left[j] = temp;
      }
    }
  }

  for (int i = 0; i < rightSize - 1; i++) {
    for (int j = i + 1; j < rightSize; j++) {
      if (right[i] > right[j]) {
        int temp = right[i];
        right[i] = right[j];
        right[j] = temp;
      }
    }
  }

  int run = 2; // Variable to keep track of the number of runs (first left and then right)
  bool isLeftFirst = strcmp(direction, "left") == 0; // Flag to indicate whether the left side is serviced first

  // Perform SCAN algorithm by servicing requests alternately from left and right
  while (run != 0) {
    if (strcmp(direction, "left") == 0) {
      for (int i = leftSize - 1; i >= 0; i--) {
        currentRequest = left[i];
        if (isLeftFirst) {
          if (i != 0) {
            rqServiceSequence[requestCounter++] = currentRequest;
          }
        } else {
          rqServiceSequence[requestCounter++] = currentRequest;
        }

        distance = abs(currentRequest - initial); // Calculate the distance between the current and initial position
        totalHeadMovement += distance; // Add the distance to the total head movement

        initial = currentRequest; // Move the initial position to the current request
      }

      direction = "right"; // Switch direction to right after servicing all requests on the left
    } else if (strcmp(direction, "right") == 0) {
      for (int i = 0; i < rightSize; i++) {
        currentRequest = right[i];

        if (!isLeftFirst) {
          if (i != rightSize - 1) {
            rqServiceSequence[requestCounter++] = currentRequest;
          }
        } else {
          rqServiceSequence[requestCounter++] = currentRequest;
        }

        distance = abs(currentRequest - initial);
        totalHeadMovement += distance;

        initial = currentRequest;
      }

      direction = "left"; // Switch direction to left after servicing all requests on the right
    }

    run -= 1; // Decrease the run counter to keep track of the runs
  }

  // Print the sequence of serviced requests and the total head movement
  for (int i = 0; i < requestCounter; i++) {
    printf("Servicing %d\n", rqServiceSequence[i]);
  }
  printf("        SCAN = %d\n", totalHeadMovement);

  // Free the dynamically allocated arrays
  free(left);
  free(right);
  free(rqServiceSequence);
}

// This function simulates the LOOK disk scheduling algorithm to service disk requests.
// The LOOK algorithm services requests in a particular direction (left or right) and
// then reverses the direction once it reaches the end of the requests in that direction.

void look(int * requests, int numRequests, int initial, char * direction) {
  // Initialize variables to track total head movement, distance, and the current request being serviced.
  int totalHeadMovement = 0;
  int distance = 0;
  int currentRequest = 0;

  // Allocate memory for arrays to hold requests on the left and right of the initial head position.
  int * left = (int * ) malloc(numRequests * sizeof(int));
  int * right = (int * ) malloc(numRequests * sizeof(int));

  // Allocate memory for the request service sequence to store the order in which requests are serviced.
  int * rqServiceSequence = (int * ) malloc((numRequests + 1) * sizeof(int));
  int requestCounter = 0;

  // Initialize counters to keep track of the number of requests on the left and right.
  int leftCount = 0;
  int rightCount = 0;

  // Separate requests into two arrays: left (requests < initial) and right (requests > initial).
  for (int i = 0; i < numRequests; i++) {
    if (requests[i] < initial)
      left[leftCount++] = requests[i];
    if (requests[i] > initial)
      right[rightCount++] = requests[i];
  }

  // Sort the left and right arrays in ascending order using bubble sort.
  for (int i = 0; i < leftCount - 1; i++) {
    for (int j = 0; j < leftCount - i - 1; j++) {
      if (left[j] > left[j + 1]) {
        int temp = left[j];
        left[j] = left[j + 1];
        left[j + 1] = temp;
      }
    }
  }

  for (int i = 0; i < rightCount - 1; i++) {
    for (int j = 0; j < rightCount - i - 1; j++) {
      if (right[j] > right[j + 1]) {
        int temp = right[j];
        right[j] = right[j + 1];
        right[j + 1] = temp;
      }
    }
  }

  // Run the LOOK algorithm twice: first servicing requests on the left, then on the right.
  int run = 2;
  while (run--) {
    if (strcmp(direction, "left") == 0) {
      // Service requests on the left in the order they appear in the sorted left array.
      for (int i = leftCount - 1; i >= 0; i--) {
        currentRequest = left[i];

        // Add the current request to the service sequence.
        rqServiceSequence[requestCounter++] = currentRequest;

        // Calculate the absolute distance from the initial head position to the current request.
        distance = abs(currentRequest - initial);

        // Increment the total head movement by the distance to the current request.
        totalHeadMovement += distance;

        // Move the initial head position to the current request's position.
        initial = currentRequest;
      }

      // Reverse direction to service requests on the right in the next iteration.
      direction = "right";
    } else if (strcmp(direction, "right") == 0) {
      // Service requests on the right in the order they appear in the sorted right array.
      for (int i = 0; i < rightCount; i++) {
        currentRequest = right[i];

        // Add the current request to the service sequence.
        rqServiceSequence[requestCounter++] = currentRequest;

        // Calculate the absolute distance from the initial head position to the current request.
        distance = abs(currentRequest - initial);

        // Increment the total head movement by the distance to the current request.
        totalHeadMovement += distance;

        // Move the initial head position to the current request's position.
        initial = currentRequest;
      }

      // Reverse direction to service requests on the left in the next iteration.
      direction = "left";
    }
  }

  // Print the order in which requests were serviced.
  for (int i = 0; i < requestCounter; i++) {
    printf("Servicing %d\n", rqServiceSequence[i]);
  }

  // Print the total head movement during the entire disk scheduling process using LOOK.
  printf("        LOOK = %d\n", totalHeadMovement);

  // Free the dynamically allocated memory to prevent memory leaks.
  free(left);
  free(right);
  free(rqServiceSequence);
}

int main(int argc, char * argv[]) {
  if (argc != 2) {
    printf("Usage: %s <initial_head_position>\n", argv[0]);
    return 1;
  }

  if (!isInteger(argv[1])) {
    printf("Error: The initial head given is not a number.\n");
    return 1;
  }

  int initial = atoi(argv[1]); // Convert the argument to an integer

  // Check if initial is within the valid range (0 to 4999)
  if (initial < 0 || initial > 4999) {
    printf("Error: The initial head position must be between 0 and 4999.\n");
    return 1;
  }

  FILE * file;
  char buffer[1024];
  int numRequests = 0;
  int i, j;
  int diskSize = 5000;
  int move = 1;
  char direction[100];

  // Open the file in read mode
  file = fopen("request.txt", "r");

  // Check if the file was opened successfully
  if (file == NULL) {
    printf("Error opening the file. The name of the file must be request.txt\n");
    return 1;
  }

  // Check to see if the file is empty
  fseek(file, 0, SEEK_END);
  long fileSize = ftell(file);

  if (fileSize == 0) {
    printf("Error: The file is empty.\n");
    return 1;
  }

  // Move the file pointer back to the beginning of the file
  fseek(file, 0, SEEK_SET);
  
  // Count the number of requests in the file
  while (fgets(buffer, sizeof(buffer), file) != NULL) {
    numRequests++;
  }

  // Reset the file pointer to the beginning of the file
  fseek(file, 0, SEEK_SET);

  // Allocate memory for the array based on the number of lines
  int * requests = (int * ) malloc(numRequests * sizeof(int));

  // Read the numbers from the file and store them in the array
  for (int i = 0; i < numRequests; i++) {
    fgets(buffer, sizeof(buffer), file);

    if (!isInteger(buffer)) {
      printf("Error: One or more the requests is not a number\n");
      return 1;
    }

    int request = atoi(buffer);

    // Prompt the user to change the request value if it's outside the valid range
    if (request > 4999 || request < 0) {
      printf("Error: Requests must be greater than or equal to 0 and less than or equal to 4999. One or more of the requests do not satisfy this condition.\n");
      return 1;
    }

    requests[i] = request;
  }

  // Close the file
  fclose(file);
  
  // Loop until the user enters a valid direction
  while (1) {
    printf("Please enter a direction (left or right). This is for the scan and look algorithms. The c-scan and c-look algorithms move upward through the cylinders: ");
    scanf("%99s", direction);

    // Convert the input to lowercase to handle case-insensitivity
    for (int i = 0; direction[i]; i++) {
      direction[i] = tolower(direction[i]);
    }

    // Check if the input is "left" or "right"
    if (strcmp(direction, "left") == 0 || strcmp(direction, "right") == 0) {
      break; // Valid input, exit the loop
    } else {
      printf("Invalid input. Please enter either 'left' or 'right'.\n");
    }
  }

  // Create a copy of the original requests array
  int * requests_copy1 = (int * ) malloc(numRequests * sizeof(int));
  for (int i = 0; i < numRequests; i++) {
    requests_copy1[i] = requests[i];
  }

  // Call the fcfs method
  fcfs(requests_copy1, numRequests, initial);

  // Free the allocated memory for the requests_copy array
  free(requests_copy1);

  // Create a copy of the original requests array
  int * requests_copy2 = (int * ) malloc(numRequests * sizeof(int));
  for (int i = 0; i < numRequests; i++) {
    requests_copy2[i] = requests[i];
  }

  // Call the sstf method
  sstf(requests_copy2, numRequests, initial);

  // Free the allocated memory for the requests_copy array
  free(requests_copy2);

  // Create a copy of the original requests array
  int * requests_copy3 = (int * ) malloc(numRequests * sizeof(int));
  for (int i = 0; i < numRequests; i++) {
    requests_copy3[i] = requests[i];
  }

  // Call the scan method
  scan(requests_copy3, numRequests, initial, diskSize, direction);

  // Free the allocated memory for the requests_copy array
  free(requests_copy3);

  // Create a copy of the original requests array
  int * requests_copy4 = (int * ) malloc(numRequests * sizeof(int));
  for (int i = 0; i < numRequests; i++) {
    requests_copy4[i] = requests[i];
  }

  // Call the cscan method
  cscan(requests_copy4, numRequests, initial, diskSize);

  // Free the allocated memory for the requests_copy array
  free(requests_copy4);

  // Create a copy of the original requests array
  int * requests_copy5 = (int * ) malloc(numRequests * sizeof(int));
  for (int i = 0; i < numRequests; i++) {
    requests_copy5[i] = requests[i];
  }

  // Call the look method
  look(requests_copy5, numRequests, initial, direction);

  // Free the allocated memory for the requests_copy array
  free(requests_copy5);

  // Create a copy of the original requests array
  int * requests_copy6 = (int * ) malloc(numRequests * sizeof(int));
  for (int i = 0; i < numRequests; i++) {
    requests_copy6[i] = requests[i];
  }

  // Call the clook method
  clook(requests_copy6, numRequests, initial, diskSize);

  // Free the allocated memory for the requests_copy array
  free(requests_copy6);

  free(requests);

  char input;

  printf("Pausing program, enter q and press enter to quit\n ");
  do {

    scanf(" %c", & input);

  } while (input != 'q');

  printf("Exiting the program.\n");

  return 0;
}
