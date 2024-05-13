//This program will read the memory area and print numbers
//for the array.

#include<stdio.h>
#include<sys/mman.h>
#include<sys/types.h>
#include<sys/stat.h>
#include<fcntl.h>
#include<unistd.h>
#include<string.h>
#define DATASIZE 128

int main(void) {
    int fd;
    float *addr;
    const char memid[] = "/mmemory";
    const float numbers[3];

    //create shared memory file descriptor
    fd = shm_open(memid, O_RDONLY, 0600);
    if (fd == -1) {
        perror("Can't open file descriptor");
        return 1;
    }
    //map the memory, but give it a file descriptor and 
    //make memory backed by a file

    addr = mmap(NULL, DATASIZE, PROT_READ, MAP_SHARED, fd, 0);

    if (addr == MAP_FAILED) {
        perror("Memory mapping failed");
        return 1;
    }

    //read the memory
    memcpy(numbers, addr, sizeof(numbers));

    //print the numbers
    for (int i = 0; i < 3; ++i) 
        printf("Number %d: %.3f\n", i, numbers[i]);

    return 0;
}
