#include<stdio.h>
#include "apue.h"

int main() {
    int input;
    
    printf("Enter a 4 digit number: ");
    scanf("%d", &input);
    
    printf("ones digit = %d\n", input % 10);
    printf("tens digit = %d\n", input / 10 % 10);
    printf("hundreds digit = %d\n", input / 100 % 10);
    printf("thousands digit = %d\n", input / 1000 % 10);
    
    
}
