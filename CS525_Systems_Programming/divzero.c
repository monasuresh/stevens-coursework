#include<signal.h>
#include<stdio.h>
#include<unistd.h>
#include<stdlib.h>


static int interrupt_fired = 0;

void signalHandler(int sig) {
    printf("Division by zero not allowed");
}

int main() {
    pid_t pid;
    
    pid = fork();
    switch(pid) {
        case -1:
            perror("fork failed");
            exit(1);
        case 0: ;
            int b = 5;
            int a = b / 0;
    }
    
    signal(SIGFPE, signalHandler);
    pause();
    exit(0);
}
