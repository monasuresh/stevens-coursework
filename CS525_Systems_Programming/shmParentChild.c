//This program uses shared memory.
//the process will write a message to the shared memory before forking.
//After forking, the child will replace the message in the shared
//memory.  Finally, the parent will replace the content of the shared
//memory once again.

#include<stdio.h>
#include<sys/mman.h>
#include<sys/types.h>
#include<sys/stat.h>
#include<sys/wait.h>
#include<fcntl.h>
#include<unistd.h>
#include<string.h>
#define DATASIZE 128

int main(void) {
    char *addr;
    int status;
    pid_t pid;
    const char startmsg[] = "Running";
    const char childmsg[] = "Child";
    const char parentmsg[] = "Parent";


    //map the shared memory space
    //Six arguments are needed for mmap()
    // - 1: memory address set to NULL (let the kernel decide where)
    // - 2: size of the memory area
    // - 3: protection the memory should have - read and write
    // - 4: flags which are set to shared and anonymous
    //      this means it can be shared among processes and won't
    //      be backed by a file
    // - 5: file descriptor
    //      set as anonymous so set to -1
    // - 6: the offset which is set to 0

    addr = mmap(NULL, DATASIZE, PROT_WRITE | PROT_READ,
                MAP_SHARED | MAP_ANON, -1, 0); 

    if(addr == MAP_FAILED) {
        perror("Memory mapping failed");
        return 1;
    }

    //Copy start message using memcpy().
    //Arguments: pointer to memory(addr), data/message to send (startmsg),
    //size of the data to copy (length of startmsg + 1 for the \0)
    memcpy(addr, startmsg, strlen(startmsg) + 1);

    //print the PID of the process and the message in shared memory.

    printf("Parent PID is %d\n", getpid());
    printf("Original message = %s\n", addr);

    //fork
    if((pid = fork()) == -1) {
        perror("Can't fork");
        return 1;
    }

    //if child process, copy the child's message to the shared memory.
    //if parent process, wait for the child.  Then copy the parent
    //message to the memory and print both messages.

    if (pid == 0) {     //child
        memcpy(addr, childmsg, strlen(childmsg) + 1);
    }
    else if (pid > 0) { //parent
        waitpid(pid, &status, 0);
        printf("Child executed with PID %d\n", pid);
        printf("Message from child: %s\n", addr);
        memcpy(addr, parentmsg, strlen(parentmsg) + 1);
        printf("Parent message: %s\n", addr);
    }

    //clean up by unmapping the shared memory
    munmap(addr, DATASIZE);
    return 0;
}
