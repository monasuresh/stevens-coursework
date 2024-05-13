//A message queue receiver program

#include<stdio.h>
#include<mqueue.h>
#include<fcntl.h>
#include<sys/stat.h>
#include<sys/types.h>
#include<stdlib.h>
#include<string.h>

int main(void) {
    int md;             //message queue descriptor
    char *buffer;
    struct mq_attr msgattr;

    //open the message queue
    //two arguments needed: name of the queue and flags
    md = mq_open("/queue1", O_RDONLY);  //read only
    if (md == -1) {
        perror("Open message queue");
        return 1;
    }
    //get the attributes of the message queue

    if ((mq_getattr(md, &msgattr)) == -1) {
        perror("get message attribute");
        return 1;
    }

    //once we have the attributes of the queue, use 
    //mq_msgsize member to allocate memory for a message
    //of that size using calloc(). Arguments include:
    //number of elements needed and size of each element
    //calloc() returns a pointer to that memory to the 
    //variable buffer
    buffer = calloc(msgattr.mq_msgsize, sizeof(char));
    if (buffer == NULL) {
        fprintf(stderr, "couldn't allocate memory");
        return 1;
    }

    //use mq_curmsgs to find the number of messages
    //currently in the queue.  Print the number of
    //messages.  

    printf("%ld messages in the queue\n", msgattr.mq_curmsgs);

    //Then loop over all the messages using
    //a for loop. The first iteration a message is 
    //received using mq_receive.  Print the message.
    //Before the next iteration, reset the entire
    //memory to NULL characters using memset()

    for (int i = 0; i < msgattr.mq_curmsgs; ++i) {
        if ((mq_receive(md, buffer, msgattr.mq_msgsize, NULL)) == -1) {
            perror("Message receive");
            return 1;
        }
        printf("%s\n", buffer);
        memset(buffer, '\0', msgattr.mq_msgsize);
    }

    //cleanup.
    //free the memory pointed to by buffer
    //close the md queue descriptor before removing the queue
    //from the system using mq_unlink()
    free(buffer);
    mq_close(md);
    mq_unlink("/queue1");
    return 0;
}  
