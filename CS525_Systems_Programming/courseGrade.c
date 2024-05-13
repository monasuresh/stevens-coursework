#include<stdio.h>
#include<string.h>
#include<stdlib.h>

int main() {
   char fileName[100];
   scanf("%s", fileName);

    //variables
    //const int MAX_LINES = 25;
    //const int MAX_STRING = 100;
    const int MAX_LINE_LENGTH = 4000;

    //declare 4 string arrays
    char firstName[100][100];
    char lastName[100][100];
    char midterm1[100][100];
    char midterm2[100][100];
    char final[100][100];

    char line[MAX_LINE_LENGTH];

    FILE* inFile = NULL;
    FILE* outFile = NULL;

    inFile = fopen(fileName, "r");

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
//        printf("%s\n", line);
        char * token;
        token = strtok(line, "\t");
        int count = 1;
        while (token != NULL) {

            if (count == 1) {
                strcpy(firstName[row], token);
            } else if (count == 2) {
                strcpy(lastName[row], token);
            } else if (count == 3) {
                strcpy(midterm1[row], token);
            } else if (count == 4) {
                strcpy(midterm2[row], token);
            } else {
                strcpy(final[row], token);
            }

            token = strtok(NULL, "\t");
            count++;
        }
         row++;

    }




   fclose(inFile);

   outFile = fopen("report.txt", "w");
   
      if (outFile == NULL) {
      printf("Could not open file myoutfile.txt.\n");
      return -1; // -1 indicates error
   }

   int p;
   double midterm1Average = 0;
   double midterm2Average = 0;
   double finalAverage = 0;
    for(p=0; p<line_count - 1; p++){
        midterm1Average += atoi(midterm1[p]);
        midterm2Average += atoi(midterm2[p]);
        finalAverage += atoi(final[p]);

            int  average = (atoi(midterm1[p]) + atoi(midterm2[p]) + atoi(final[p])) / 3;
            char grade[2];
            if (average >= 90) {
                strcpy(grade, "A");
            } else if (average >= 80) {
                strcpy(grade, "B");
            } else if (average >= 70) {
                strcpy(grade, "C");
            } else if (average >= 60) {
                strcpy(grade, "D");
            } else {
                               strcpy(grade, "F");
            }
             fprintf(outFile, "%s\t%s\t%s\t%s\t%s\t%s\n", firstName[p], lastName[p],
             midterm1[p], midterm2[p], final[p], grade);
        }
    midterm1Average = midterm1Average / (double) (line_count - 1);
    midterm2Average = midterm2Average / (double) (line_count - 1);
    finalAverage = finalAverage / (double) (line_count - 1);
    fprintf(outFile, "\n");
    fprintf(outFile, "Averages: midterm1 %.2f, midterm2 %.2f, final %.2f\n", midterm1Average, midterm2Average,
    finalAverage);
   return 0;

}
