//This program will use a one-way directional pipe to allow 
//communication between the parent and child processes.
//pipefd[0] is the read end of the pipe
//pipefd[1] is the write end of the pipe
//because this is unidirectional, we must close portions
//of the pipe that will not be used

#include<stdio.h>
#include<unistd.h>
#include<fcntl.h>
#include<errno.h>
#define MAX 128

int main(void) {
    int pipefd[2] = { 0 };      //[0] = read end [1] = write end of the pipe
    pid_t pid;
    char line[MAX];
    
    //create a pipe giving the integer array as an argument
    if((pipe(pipefd)) == -1) {
        perror("Can't create pipe");
        return 1;
    }
    if((pid = fork()) == -1) {
        perror("Can't fork");
        return 1;
    }

    //if we are inside the parent process, close the read end of the pipe
    //since we only want to write from the parent.
    //Write a message to the pipe's file descriptor using dprintf()

    if (pid > 0) {              //inside the parent
        close(pipefd[0]);       //must close the read end of the pipe
        dprintf(pipefd[1], "Hello from parent"); //send hello from parent
    }

    //inside the child we want to close the write end of the pipe
    //read the data in the pipe using the read() system call.
    //print the message using printf()

    else {
        close(pipefd[1]);       //must close the write end of the pipe
        read(pipefd[0], line, MAX-1); //read data sent from the parent
        printf("%s\n", line);   //print message from the parent
    }

    return 0;
}
