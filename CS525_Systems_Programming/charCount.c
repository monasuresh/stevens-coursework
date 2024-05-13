#include<stdio.h>
#include<string.h>
#include<ctype.h>

int main() {
    const int MAX_CHAR = 50;
    char inputString[MAX_CHAR];
    
    char inputChar;
    int numChars = 0;
    
    printf("Enter a character followed by a string: ");
    
    scanf("%c", &inputChar);
    scanf("%s", inputString);
    
    fgets(inputString, MAX_CHAR, stdin);
    
    for (int j = 0; j < strlen(inputString); ++j) {
        inputString[j] = (tolower(inputString[j]));
    }
    
    inputChar = tolower(inputChar);
    
    for (int i = 0; i < strlen(inputString); ++i) {
        if (inputChar == inputString[i]) {
            numChars++;
        }
    } 
    
    printf("numChars = %d\n", numChars);
    
    return 0;
}
