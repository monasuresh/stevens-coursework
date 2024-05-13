#include<stdio.h>
#include<string.h>
#include<ctype.h>

int main() {
    const int MAX = 50;
    
    char inputMonth[MAX];
    int day;
    
    printf("Enter a momth and a day");
    scanf("%d", inputMonth);
    scanf("%d", &day);
    
    while(day <= 0 || day > 31) {
        printf("invalid day, try again");
        scanf("5d", &day);
    }
    
    for (int i = 0; i < strlen(inputMonth; ++i) 
        inputMonth[i] = toupper(inputMonth[i]);
    
    if (strcmp(inputMonth, "JANUARY") == 0) {
       printf("Winter\n"); 
    } else if ((strcmp(inputMonth, "FEBRUARY") == 0) && day <= 29)) {
        printf("Winter\n");
    } else if ((strcmp(inputMonth, "MARCH") == 0) {
        if (day <= 21)
            printf("Winter\n");
        else
            printf("Spring\n");
    
    return 0;
}
