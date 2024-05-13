//This program will execute a loop 5 times: create a message queue,
//print the queue identifier, then delete the message queue.

//Execute another loop five times: create a message queue
// and place a message on the queue.

//After the program terminates, use the ipcs(1) command to look
//at the message queues. 

#include "apue.h"
#include <sys/msg.h>d

struct mesg {
    long mtype;
    char mtext[4];
}

int main(void) {
    int msgqid;
    key_t key = 1;
    struct mesg m;
    
    int msg_key

/2nd loop

exit(0);
}


