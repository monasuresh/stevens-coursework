//This program calls sigaction instead of signal to set the signal handler for CTRL+C (SIGINT)

//to the function ouch.  It must first set up a sigaction structure that contains the handler,

//a signal mask, and flags...although no flags are needed.  The empty signal mask is created

//with the new function sigemptyset.



#include<signal.h>

#include<stdio.h>

#include<unistd.h>



void ouch(int sig) {   //define actions to be taken on receipt of signal

   printf("\nOuch! - Signal %d sent.\n", sig);

}



int main(void) {

   struct sigaction act;

   

   act.sa_handler = ouch;   //set the signal handler to execute function ouch when received

   

   //sa_mask is a set of signals that are blocked and not delivered.

   //This prevents the race condition where a signal is received before its handler

   //has run to completion.   

   sigemptyset(&act.sa_mask);  

   act.sa_flags = 0;



   sigaction(SIGINT, &act, 0);  //execute the handler when the SIGINT signal sent



   while (1) {                  //infinite loop....the only way out is to send SIGQUIT signal

      printf("Hello\n");

      sleep(1);

   }

}
