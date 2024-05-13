#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdbool.h>
#include <regex.h>
#include <time.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <netdb.h>

/* Author: Monica Suresh
   Course: CS-520
   Project: OS Programming Project 3 - Login Program
*/

#define MAX_LINE_LENGTH 1024

// Structure for a hash table entry
typedef struct Entry {
    char* key;
    char* value;
    struct Entry* next;
} Entry;

// Structure for the hash table
typedef struct HashTable {
    int size;
    Entry** table;
} HashTable;

bool isValidEmail(const char *email) {
    // Regular expression pattern for validating email addresses
    const char *pattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$";

    regex_t regex;
    int ret;

    // Compile regular expression
    ret = regcomp(&regex, pattern, REG_EXTENDED);
    if (ret) {
        printf("Unable to compile regex\n");
        exit(1);
    }

    // Execute regular expression
    ret = regexec(&regex, email, 0, NULL, 0);
    if (!ret) {
        return true;
    } else if (ret == REG_NOMATCH) {
        return false;
    } else {
        char error_msg[100];
        regerror(ret, &regex, error_msg, sizeof(error_msg));
        printf("Regex match failed: %s\n", error_msg);
        exit(1);
    }

    // Free compiled regular expression
    regfree(&regex);
}

Entry* createEntry(const char* key, const char* value) {
    Entry* newEntry = (Entry*)malloc(sizeof(Entry));
    if (newEntry != NULL) {
        newEntry->key = strdup(key);
        newEntry->value = strdup(value);
        newEntry->next = NULL;
    }
    return newEntry;
}

// Function to create a new hash table
HashTable* createHashTable(int size) {
    HashTable* newTable = (HashTable*)malloc(sizeof(HashTable));
    if (newTable != NULL) {
        newTable->size = size;
        newTable->table = (Entry**)malloc(sizeof(Entry*) * size);
        if (newTable->table != NULL) {
            for (int i = 0; i < size; i++) {
                newTable->table[i] = NULL;
            }
        } else {
            // Failed to allocate memory for the table
            free(newTable);
            newTable = NULL;
        }
    }
    return newTable;
}

// Function to compute the hash code for a given key
unsigned long hashFunction(const char* key, int tableSize) {
    unsigned long hash = 0;

    for (int i = 0; key[i]; i++)
        hash += key[i];

    return hash % tableSize;
}

// Function to check if a string contains only whitespace
int isWhitespace(const char* str) {
    while (*str) {
        if (!isspace((unsigned char)*str)) {
            return 0;
        }
        str++;
    }
    return 1;
}

void insert(HashTable* ht, const char* key, char* value) {
    int index = hashFunction(key, ht->size);
    Entry* newEntry = createEntry(key, value);

    if (newEntry != NULL) {
        // Check if the key already exists in the hashtable
        Entry* current = ht->table[index];
        while (current != NULL) {
            if (strcmp(current->key, key) == 0) {
                // Key already exists so we need to update the value
                free(current->value);
                current->value = strdup(value);
                return;
            }
            current = current->next;
        }

	    if (current == NULL) {
		ht->table[index] = newEntry;
	    } else {
		while (current->next != NULL) {
		    current = current->next;
		}
		current->next = newEntry;
	    }
    }
}


// Function to retrieve the value associated with a given key from the hash table
char* get(HashTable* ht, const char* key) {
    int index = hashFunction(key, ht->size);
    Entry* current = ht->table[index];

    while (current != NULL) {
        if (strcmp(current->key, key) == 0) {
            return current->value;
        }
        current = current->next;
    }

    return NULL; // Key not found
}

// Function to delete the hash table
void destroyHashTable(HashTable* ht) {
    if (ht != NULL) {
        for (int i = 0; i < ht->size; i++) {
            Entry* current = ht->table[i];
            while (current != NULL) {
                Entry* temp = current;
                current = current->next;
                free(temp->key);
                free(temp->value); // Free the memory allocated for the password
                free(temp);
            }
        }
        free(ht->table);
        free(ht);
    }
}

void getCurrentDateTime(char *dateTime) {
	time_t rawTime;
	struct tm *timeInfo;
	
	time(&rawTime);
	timeInfo = localtime(&rawTime);
	
	strftime(dateTime, 100, "%Y-%m-%d %H:%M:%S", timeInfo);
}

void getLocalIPAddress(char *ipAddress) {
	char hostBuffer[256];
	struct hostent *hostEntry;
	
	gethostname(hostBuffer, sizeof(hostBuffer));
	hostEntry = gethostbyname(hostBuffer);
	
	
	    if (hostEntry != NULL) {
		strcpy(ipAddress, inet_ntoa(*((struct in_addr *)hostEntry->h_addr_list[0])));
	    } else {
		perror("Error getting host information");
	    }
}

bool checkFormat(const char *line) {
    char string1[256], string2[256];
    int result = sscanf(line, "%255[^,], %255[^,\n]", string1, string2);

    if (result == 2) {
        // Check if string1 and string2 are not empty and not just whitespace
        size_t len1 = strlen(string1);
        size_t len2 = strlen(string2);
        for (size_t i = 0; i < len1; i++) {
            if (!isspace((unsigned char)string1[i])) {
                break;
            }
            if (i == len1 - 1) {
                return false; // string1 is empty or just whitespace
            }
        }
        for (size_t i = 0; i < len2; i++) {
            if (!isspace((unsigned char)string2[i])) {
                break;
            }
            if (i == len2 - 1) {
                return false; // string2 is empty or just whitespace
            }
        }
        return true;
    }

    return false; // Format did not match
}

bool isValidFormat(FILE *file) {
    char buffer[512];
    bool isValid = true;

    while (fgets(buffer, sizeof(buffer), file) != NULL) {
        if (!checkFormat(buffer)) {
            isValid = false;
            break;
        }
    }

    fseek(file, 0, SEEK_SET); // Move file pointer to the beginning again
    return isValid;
}

bool isFileEmpty(FILE *file) {
    fseek(file, 0, SEEK_END);
    long size = ftell(file);
    fseek(file, 0, SEEK_SET);  // Return to the beginning of the file
    return size == 0;
}

int main() {
	FILE * loginsDatabaseFile;
	FILE * signInFile;
	char line[MAX_LINE_LENGTH];
	char email[MAX_LINE_LENGTH];
	char password[MAX_LINE_LENGTH];
	HashTable* loginsDatabaseTable = createHashTable(1024);
	char dateTime[100];
	char ipAddress[INET_ADDRSTRLEN];
	HashTable* loginAttemptsTable = createHashTable(1024);
	
	loginsDatabaseFile = fopen("LoginsAndPasswords.txt", "r");
	
	if (loginsDatabaseFile == NULL) {
		printf("Error: The logins and passwords database does not exist.\n");
		return 1;
	}
	
	if (isFileEmpty(loginsDatabaseFile)) {
		printf("Error: The database is empty.\n");
		return 1;
	}
	
	if (!isValidFormat(loginsDatabaseFile)) {
		printf("Error: The data is not in the correct format. The correct format is <username>, <password> and the end of the file should not contain a new line character.\n");
		return 1;
	} 
	
	while (fgets(line, MAX_LINE_LENGTH, loginsDatabaseFile)) {
		char *token = strtok(line, ",");
		if (token != NULL) {
		    strcpy(email, token);
		    token = strtok(NULL, ",");
		    
		    if (token != NULL) {
			strcpy(password, token);
			
			if (strlen(password) > 1) {
				if (isspace(password[0])) {
				    memmove(password, password + 1, strlen(password)); // Shift the string one position to the left
				}
			    }
    
		        // Remove newline characters from the value before storing
			size_t passwordLen = strlen(password);
			if (passwordLen > 0 && password[passwordLen - 1] == '\n') {
			    password[passwordLen - 1] = '\0';
			}
			
			// Check if both email is non-empty before inserting
		        if (isValidEmail(email)) {
		            if (get(loginsDatabaseTable, email) == NULL) {
		                insert(loginsDatabaseTable, email, password);
		            } else {
		                printf("Error: The username %s already exists in the database and an attempt is being made to add a duplicate entry.\n", email);
		                exit(1);
		            }
		        } else {
		            printf("Error: A user id in the database is not in email format.\n");
		            
		            exit(1);
		        }
		    }
		}
	
	}
	
	char userInputUserName[MAX_LINE_LENGTH];
	char userInputPassword[MAX_LINE_LENGTH];
	
	printf("Welcome to the login authenticator. Please enter your username and password.\n");
	
	while (true) {
		printf("Enter your username:\n");
		fgets(userInputUserName, sizeof(userInputUserName), stdin);
		userInputUserName[strcspn(userInputUserName, "\n")] = '\0'; // Remove the newline character
		
		// Remove leading spaces
		    sscanf(userInputUserName, " %99[^\n]", userInputUserName);

		    // Remove trailing spaces
		    int len = strlen(userInputUserName);
		    while (len > 0 && userInputUserName[len - 1] == ' ') {
			userInputUserName[len - 1] = '\0';
			len--;
		    }

		// Handle empty/whitespace username
		if (isWhitespace(userInputUserName)) {
		    printf("Username cannot be blank.\n");
		    continue;
		}

		// Loop until a non-empty/non-whitespace password is entered
		while (true) {
		    printf("Enter your password:\n");
		    fgets(userInputPassword, sizeof(userInputPassword), stdin);
		    userInputPassword[strcspn(userInputPassword, "\n")] = '\0'; // Remove the newline character

		    // Handle empty password
		    if (isWhitespace(userInputPassword)) {
		        printf("Password cannot be empty/contain only whitespaces.\n");
		    } else {
		        break;
		    }
		}
	    	
	    	getCurrentDateTime(dateTime);
	    	getLocalIPAddress(ipAddress);
	    	
	    	signInFile = fopen("signIn.txt", "a");
		
		fprintf(signInFile, "%s	%s	%s\n", userInputUserName, dateTime, ipAddress);
		
		fclose(signInFile);

		char* storedPassword = get(loginsDatabaseTable, userInputUserName);
		
		if (storedPassword != NULL) {
			int compareResult = strcmp(storedPassword, userInputPassword);
			if (compareResult == 0) {
		    		printf("Login success.\n");
		    		break;
			} else {
				
				char* loginAttemptsValue = get(loginAttemptsTable, userInputUserName);
				char numLoginAttemptsStr[2];
				
				if (loginAttemptsValue != NULL) {
    					int numLoginAttempts = atoi(loginAttemptsValue);

					if (numLoginAttempts == 2) {
			    			printf("Login failed. You've exceeded the number of login attempts for user id %s. The account has been locked for one hour.\n", userInputUserName);
			    			break;
				    	} else {
				    		numLoginAttempts += 1;
				    		
				    		sprintf(numLoginAttemptsStr, "%d", numLoginAttempts);
				    		
				    		insert(loginAttemptsTable, userInputUserName, numLoginAttemptsStr);
				    	}
		    		} else {
		    			insert(loginAttemptsTable, userInputUserName, "1");
		    		}
		    		
		    		printf("Login failed because of invalid credentials.\n");
			}
		} else {
			printf("The entered username does not exist.\n");
		}
	}
	
	destroyHashTable(loginsDatabaseTable);
	destroyHashTable(loginAttemptsTable);
	
	fclose(loginsDatabaseFile);
	
	return 0;
}
