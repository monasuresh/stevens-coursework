#include<stdio.h>

int main(void) {
    int input;
    
    scanf("%d", &input);
    
    while(input > 0) {
        printf("%d", input  % 2);
        input = input / 2;
    }
    
    printf("\n");
    
    return 0;
}
