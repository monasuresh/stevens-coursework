#include<stdio.h>

int main(void)
{
    int userInput;
    int sum = 0;
    
    printf("Enter a positive integer value: ");
    scanf("%d", &userInput);
    
    while (userInput <= 0) {
        printf("Positive integer values only, try again: ");
        scanf("%d", &userInput);
    }
    
    for (int i = 0; i <= userInput; i++)
        sum += i;
    
    printf("Sum = %d\n", sum);
    
    return 0;
}
