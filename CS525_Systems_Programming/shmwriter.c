//This program uses shared memory between unrelated processes
//It first opens and creates a file descriptor for shared memory
//and also maps the memory.

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
    const float numbers[3] = {3.14, 2.817, 1.202};

    //create shared memory file descriptor
    if((fd = shm_open(memid, O_RDWR | O_CREAT, 0600)) == -1) {
        perror("Can't open memory fd");
        return 1;
    }

    //the file-backed memory is 0 bytes in size initially. To extend
    //it to 128 bytes, truncate it with ftruncate()

    if ((ftruncate(fd, DATASIZE)) == -1) {
        perror("Can't truncate memory");
        return 1;
    }

    //map the memory, but give it a file descriptor and 
    //make memory backed by a file

    addr = mmap(NULL, DATASIZE, PROT_WRITE, MAP_SHARED, fd, 0);

    if (addr == MAP_FAILED) {
        perror("Memory mapping failed");
        return 1;
    }

    //copy data to memory
    memcpy(addr, numbers, sizeof(numbers));

    //wait for enter to allow a pause to let the reading program
    //to have a chance to read the memory
    printf("Press enter when finished");
    getchar();
    //clean up
    munmap(addr, DATASIZE);
    shm_unlink(memid);
    return 0;
}

