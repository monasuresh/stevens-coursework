#include<stdio.h>
#include<string.h>
#include<ctype.h>

// prototypes go here
void removeNonAlpha(const char[], char[]);
void display(const char[], const char[]);

int main() 
{
    // variables
    const int SIZE = 50;
    char input[SIZE];		//user input
    char output[SIZE];		//alpha only
    
    //prompt the user for input
    printf("Enter a string: ");
    fgets(input, SIZE, stdin);
    
    //call removeNonAlpha
    removeNonAlpha(input, output);
    
    display(output, input);
    
}

void display(const char out[], const char in[]) {
    printf("%s\n\n", in);
    printf("%s\n\n", out);
}

// function removeNonAlpha
void removeNonAlpha(const char input[], char output[])
{
    int j = 0;
    
    // go through the array element by element
    for (int i = 0; i < strlen(input); ++i) {
        if (isalpha(input[i])) {
            output[j] = input[i];
            ++j;
        }
    }
    
    
    
    output[j] = '\0';
}
