#include<stdio.h>
#include<stdlib.h>

typedef struct Time_struct {
    int hours;
    int min;
    int sec;
} Time;

//prototypes
void printTime(Time* t);
Time* calcDiff(Time* start, Time* end);
Time* readTime();
Time* createTime(int h, int m, int sec);

int main() {
    Time* start = NULL;
    Time* end = NULL;
    Time* diff = NULL;
    
    //get input
    start = readTime();
    end = readTime();
    
    diff = calcDiff(start, end);
    
    printf("Start: \t");
    printTime(start);
    printf("End: \t");
    printTime(end);
    printf("Diff: \t");
    printTime(diff);
    
    
    return 0;
} 

void printTime(Time* t) {
    printf("%02d: %02d: %02d", t->hours, t->min, t->sec);
}


//calcDiff
Time* calcDiff(Time* start, Time* end) {
    //local variable
    Time* diff = NULL;
    
    diff = (Time*)malloc(sizeof(Time));
    
    diff->hours = end->hours - start->hours;
    diff->min = end->min - start->min;
    diff->sec = end->sec - start->sec;
    
    //correct for negative
    if (diff->sec < 0) {
        diff->sec = 60 + diff->sec;
        --diff->min;
    }
    
    if (diff->min < 0) {
        diff->min = 60 + diff->min;
        --diff->hours;
    }
    
    return diff;
}

//readTime
Time* readTime() {
    int h, m, s;
    
    printf("Enter the hour, minute, and second: ");
    scanf("%d, %d, %d", &h, &m, &s);
    
    return createTime(h, m, s);
}

//allocate memory
Time* createTime(int h, int m, int s) {

    Time* newTime = NULL;
    
    newTime = (Time*)malloc(sizeof(Time));
    
    newTime->hours = h;
    newTime->min = m;
    newTime->sec = s;
    
    return newTime;
}
