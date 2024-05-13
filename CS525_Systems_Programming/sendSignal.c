//This program will fork to create a child process.  The child process will sleep for 5 seconds

//and will then send interrupt signal to the parent using the kill function.

//The parent  will then catch the signal and pauses until the signal is received.

//A message is displayed when the parent receives the interrupt signal.





#include<sys/types.h>

#include<signal.h>

#include<stdio.h>

#include<unistd.h>

#include<stdlib.h>



static int interrupt_fired = 0;



void interr(int sig) {

   interrupt_fired = 1;   //set a flag to indicate the signal was received

}



int main() {

   pid_t pid;



   printf("signal starting\n");



   pid = fork();        //new process started

   switch(pid) {

      case -1: 

         perror("fork failed");

         exit(1);

      case 0: 

         sleep(5);   //child sleeps for 5 seconds

         kill(getppid(), SIGINT);  //sends a SIGINT to the parent

         exit(0);

   }



   //in the parent process

   printf("waiting for the interrupt\n");

   signal(SIGINT, interr);  //parent catches the SIGINT and calls the interr function 

                            //which sets a flag.



   pause();

   if(interrupt_fired)

      printf("Interrupt received!\n");



   printf("done\n");

   exit(0);

}

