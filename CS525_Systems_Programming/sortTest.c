#include<stdio.h>
#include<stdbool.h>

bool isSorted(const int []);

int main() 
{
    //variables
    int num[] = { 3, 6, 9, 12, 15 };
    
    if(isSorted(num)) 
        printf("is sorted\n");
    else 
        printf("Not sorted\n"); 
}

// function isSorted
bool isSorted(const int n[]){
    for (int i = 0; i < 5; ++i) {
        if (n[i] > n[i + 1]) 
            return false;
    }
    
    return true;
    
}
