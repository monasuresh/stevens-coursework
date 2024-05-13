#include<stdio.h>
#include<string.h>

int main() {
    //variables
    const int SIZE = 100;
    char inputFileName[SIZE]; //input file name
    char fileName[SIZE];      //read in file
    char *substring;          //substring value
    int read;                 //successful read or not

    FILE* inFile;             // pointer to input file

    //get the name of the input file
    printf("Enter the name of the input file: ");
    scanf("%s", inputFileName);

    //open the input file
    inFile = fopen(inputFileName, "r");
    
    //priming read 
    read = fscanf(inFile, "%s", fileName);
    
    //loop 
    while (!feof(inFile)) {
        if(read == 1) {
            substring = strstr(fileName, "photo.jpg");
            
            strcpy(substring, "info.txt");
            
            printf("%s\n", fileName);
            
            read = fscanf(inFile, "%s", fileName);
            
        } else {
            printf("Error, input failure\n");
            break;
        }
        
   }
   
   fclose(inFile);
   
   return 0;
}
