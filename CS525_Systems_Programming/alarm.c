/*Author: Monica Suresh
  Date: 4/10/2022
  Course: CS 525
  Assignment: Programming Assignment 5
  Description: This program simulates an alarm clock. It forks a process. The re
  process waits for 5 seconds before sending a SIGALRM signal to the parent. The
  the parent process prints out "Ding!".
 */
 
#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <unistd.h>
 
static int alarmOn = 0; // flag for the alarm

void alarmHandler(int signal) {
    alarmOn = 1; //set flag to indicate alarm signal was received
}



int main() {
    pid_t pid;
    
    pid = fork();	//the original process is forked
    
    if (pid < 0) {
    	perror("fork error");
    	exit(1);
    } else if (pid == 0) {    
        sleep(5);	//child process sleeps for 5 seconds    
        kill(getppid(), SIGALRM);	// child process sends SIGALRM signal to the parent
        exit(0);	//child process terminates
    } else {
    	signal(SIGALRM, alarmHandler);		// parent process catches SIGALRM with a call to signal
    	pause();	// parent process pauses until it receives the signal
    	
    	if (alarmOn) {
    	    printf("Ding!\n");	// once the flag is set, the parent prints "Ding!"
    	}
    	exit(0);	// parent process terminates
    }
}
