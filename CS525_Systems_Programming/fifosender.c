//This program will create a FIFO and sends a message to it
//When an interrupt is sent, the SIGPIPE signal is received
//when the other end terminates.  If the program did not
//catch this signal, the program would exited with a signal
//141 and no cleanup would have occurred.

#include<stdio.h>
#include<unistd.h>
#include<sys/types.h>
#include<sys/stat.h>
#include<fcntl.h>
#include<signal.h>
#include<stdlib.h>
#include<errno.h>

void cleanup(int);
int fd;                 //the FIFO file descriptor
const char fifoname[] = "/tmp/fifo2";

int main(int argc, char *argv[]) {
    struct sigaction action;
    if(argc != 2) {
        fprintf(stderr, "Usage: %s 'the message'\n", argv[0]);
        return 1;
    }
    
    //register the signal handler for all the signals to catch
    //so we can remove the FIFO when the program exits

    action.sa_handler = cleanup;
    sigfillset(&action.sa_mask);
    action.sa_flags = SA_RESTART;
    sigaction(SIGTERM, &action, NULL);
    sigaction(SIGINT, &action, NULL);
    sigaction(SIGQUIT, &action, NULL);
    sigaction(SIGABRT, &action, NULL);
    sigaction(SIGPIPE, &action, NULL);

    //create FIFO with mode 644 in octal (written as 0644)
    //open the FIFO using the open() system call - just like any
    //other file

    if((mkfifo(fifoname, 0644)) != 0) {
        perror("Can't create FIFO");
        return 1;
    }

    if((fd = open(fifoname, O_WRONLY)) == -1) {
        perror("Can't open FIFO");
        return 1;
    }

    //create an infinite loop printing a message every second.
    //after the loop, close the file descriptor and remove
    //the FIFO file...code that should never be reached
    //under normal circumstances

    while (1) {
        dprintf(fd, "%s\n", argv[1]);
        sleep(1);
    }

    //just in case, but should never be reached
    close(fd);
    unlink(fifoname);
    return 0;
}


//cleanup function
//a special message is displayed when the receiver has stopped
//receiving data

void cleanup(int signum) {
    if(signum == SIGPIPE) 
        printf("The receiver stopped receiving\n");
    else
        printf("Stopping....\n");
    if((close(fd)) == -1)
        perror("Can't close file descriptor\n");
    if((unlink(fifoname)) == -1) {
        perror("Can't remove FIFO");
        exit(1);
    }
    exit(0);
}
