#include<stdio.h>
#include<string.h>
#include<stdlib.h>

int main() 
{
    const int MAX_SIZE = 50;
    int input[MAX_SIZE];
    int max;
    char sinput[MAX_SIZE];
    
    printf("Enter a list of values: ");
    
    fgets(sinput, MAX_SIZE, stdin);
    
    printf("Enter a max value: ");
    scanf("%d", &max);
    
    for (int i = 0; i < strlen(sinput); ++i) {
        x = sinput[i] - '0';
        if (x <= max) {
            printf("%d ", input[i]);
        }
    }
    
    return 0;
}
