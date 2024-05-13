/* 
Monica Suresh
Programming Assignment 6
4/23/2022
CS 525 
*/

//This program will act like a server for a multiple clients
//It will receive messages from multiple clients and respond with
//"Message received" every time a message is received.
//When the server exits or a "shutdown is sent by one of the clients, cleanup will execute.

#include<stdio.h>
#include<sys/types.h>
#include<sys/socket.h>
#include<sys/un.h>
#include<string.h>
#include<unistd.h>
#include<signal.h>
#include<stdlib.h>
#include<errno.h>
#include<arpa/inet.h>
#include<sys/wait.h>


#define MAXLEN 128      //maximum length of message

void cleanup();
const char sockname[] = "/tmp/socket1";
int connfd;
int datafd;
pid_t pid;
static int isdisconnected = 0;

int main(void) {

	int ret;
	struct sockaddr_un addr;     //contains the socket type and file path
	char buffer[MAXLEN];
	struct sigaction action;

	//prepare for sigaction
	action.sa_handler = cleanup;
	sigfillset(&action.sa_mask);
	action.sa_flags = SA_RESTART;

	//register all signals to handle

	sigaction(SIGTERM, &action, NULL);
	sigaction(SIGINT, &action, NULL);
	sigaction(SIGQUIT, &action, NULL);
	sigaction(SIGABRT, &action, NULL);
	sigaction(SIGPIPE, &action, NULL);


	//create socket file descriptor
	connfd = socket(AF_UNIX, SOCK_SEQPACKET, 0);

	if(connfd == -1) {
		perror("Create socket failed");
		return 1;
	}

	//set address family and socket path
	addr.sun_family = AF_UNIX;
	strcpy(addr.sun_path, sockname);

	//bind the socket
	//cast sockaddr_un to sockaddr

	if((bind(connfd, (const struct sockaddr*) &addr,
	sizeof(struct sockaddr_un))) == -1) {
		perror("Binding socket failed");
		return 1;
	}



   //prepare for accepting connections
   //Arguments: 1) socket file descriptor
   //2) buffer size for backlog

	if((listen(connfd, 20)) == -1) {
		perror("Listen error");
		return 1;
	}



   //accept connections and create a 
   //new file descriptor is created
   //to use when data is sent and
   //received

	while (1) {

	   datafd = accept(connfd, NULL, NULL);

	   if (datafd == -1) {
	      perror("Accept error");
	      return 1;
	   }
	   
	   // reset isdisconnected
	   isdisconnected = 0;

	   //main loop
	   // create one child process for each client
	   pid = fork();
	   if (pid == -1) {
	   	perror("Fork error");
	   } else if (pid == 0) { // child proccess
	   	pid_t client_pid = getpid();
	   	printf("Client %d connected\n", client_pid);
		   while (1) {          //for each message received
		      while (1) {       //read data from socket fd,
					//save to buffer
					//print on the terminal
			 ret = read(datafd, buffer, MAXLEN);

			 if (ret == -1) {  //bad read
			    perror("Error reading line");
			    cleanup();
			 } else if (ret == 0) {
			    // if the return value is 0, then the client has been disconnected and 
			    // isdisconnected is set to true
			    printf("Client %d disconnected\n", client_pid);
			    isdisconnected = isdisconnected + 1;
			    break;
			 } else {
			    // if the client sends "shutdown" the server shuts down by performing a 				    //cleanup
			    if (strcmp(buffer, "shutdown") == 0) {
			    	printf("The server is shutting down\n");
			    	cleanup();
			    }

			    printf("Message from Client %d: %s\n", client_pid, buffer);
			    break;
			 }

		      }//end inner while

			// if isdisconnected is true, then the server no longer receives messages
			// from the current client
			if (isdisconnected == 1) {
				close(datafd); // closes the client connection
				break;
			}
			
		      //write confirmation message
		      write(datafd, "Message received\n", 18);
		      

		   } //end outer while
	   
	   }

	}
	
	return 0;

}

//cleanup function

void cleanup() {
   printf("Quitting and cleaning up\n");
   close(connfd);
   close(datafd);
   unlink(sockname);
   kill(getppid(), SIGINT); // interrupts the parent process which causes the server program to end
   exit(0);
}
