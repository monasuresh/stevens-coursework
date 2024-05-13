//This program will create a new message queue and send messages to it

#include<stdio.h>
#include<mqueue.h>
#include<fcntl.h>
#include<sys/stat.h>
#include<sys/types.h>
#include<string.h>
#define MAX_MSG_SIZE 2048

int main(int argc, char *argv[]) {
    int md;             //message queue descriptor

    //attributes for the message queue
    struct mq_attr msgattr;
    msgattr.mq_maxmsg = 10;
    msgattr.mq_msgsize = MAX_MSG_SIZE;

    if (argc != 2) {
        fprintf(stderr, "Usage: %s 'my message'\n", argv[0]);
        return 1;
    }


    //open and create the message queue with mq_open().
    //Arg 1 = name of the queue
    //Arg 2 = flags O_CREATE and O_RDWR
    //Arg 3 = permission mode
    //Arg 4 = struct
    //The mq_open() returns a message queue descriptor to the md variable

    md = mq_open("/queue1", O_CREAT|O_RDWR, 0644, &msgattr);

    if(md == -1) {
        perror("Error creating message queue");
        return 1;
    }

    //Send a message to the queue using mq_send()
    //Arg 1 = md descriptor
    //Arg 2 = message to send
    //Arg 3 = size of the message
    //Arg 4 = priority of the message (any unsigned int)


    if((mq_send(md, argv[1], strlen(argv[1]), 1)) == -1) {
        perror("Message queue send");
        return 1;
    }

    //close the message queue
    mq_close(md);
    return 0;
}

