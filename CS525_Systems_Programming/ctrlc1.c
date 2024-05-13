//This program will call the function ouch to be called when the SIGINT signal is typed in.

//After the interrupt function ouch has completed, the program continues, but the signal

//action is restored back to its default...that is...stopping the program.

//

//It's not a good idea to use the signal interface for catching signals.  You may find

//this in older legacy programs.





#include<signal.h>

#include<stdio.h>

#include<unistd.h>



void ouch(int sig) {

   printf("Ouch! - I got signal %d\n", sig);

   (void) signal(SIGINT, SIG_DFL);       //restores signal action back to default

}



int main(void) {

   (void) signal(SIGINT, ouch);

   

   while(1) {

      printf("Hello\n");

      sleep(1);

   }

}
