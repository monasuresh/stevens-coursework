#include<stdio.h>
#include<string.h>

int main() {

    //variables
    const int MAX_LINES = 25;
    const int MAX_STRING = 100;
    const int MAX_LINE_LENGTH = 400;
    
    //declare 4 string arrays
    char col1[MAX_LINES][MAX_STRING];
    char col2[MAX_LINES][MAX_STRING];
    char col3[MAX_LINES][MAX_STRING];
    char col4[MAX_LINES][MAX_STRING];
    
    char line[MAX_LINE_LENGTH];
    
    FILE* inFile = NULL;
    
    inFile = fopen("food.txt", "r");
    
    if (inFile == NULL) {
        printf("Error opening input file\n");
        return -1;
    }
    
    int row = 0;
    int line_count = 0;
    
    while(!feof(inFile)) {
        line_count++;
        fgets(line, MAX_LINE_LENGTH, inFile);
        line[strcspn(line, "\n")] = 0;
        char * token;
        token = strtok(line, "\t");
        int count = 1;
        while (token != NULL) {
            
            if (count == 1) {
                strcpy(col1[row], token);
                printf("%s", col1[row]);
            } else if (count == 2) {
                strcpy(col2[row], token);
            } else if (count == 3) {
                strcpy(col3[row], token);
            } else {
                strcpy(col4[row], token);
            }
            
            token = strtok(NULL, "\t");
            count++;
        }
        row++;
       
    }
    
    
   fclose(inFile);
   
   if (strlen(col4[0]) == 0) {
      // printf("Empty");
    }
   int p;
        // Print the required lines in proper format given
        for(p=0; p<line_count; p++){
                // Check if item is available
        //        printf("%s\n", col4[1]);
                printf("%s\n", col4[p]);
                if(strcmp(col4[p], "Available") == 0) {
                    // Print all available items in correct format
                    printf("%s(%s) -- %s\n", col1[p], col2[p], col3[p] );
                }
        }
 
        return 0;
   
}
