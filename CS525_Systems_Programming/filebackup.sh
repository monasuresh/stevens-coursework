#!/bin/bash

#Author: Monica Suresh
#Course: CS 525
#Date: March, 27, 2022
#Assignment: Programming Assignment 3

#This program takes a source directory and a destination directory as arguments
#and copies the files from the source directory to the destination directory.
#If the program is run again with the same source and destination directories
#the program only copies that modified files and any new files to the destination directory.

CheckIfTwoDirectoriesSupplied() {
	#check if the user provided two arguments (directories)
        if [ $1 -ne 2 ]
	then
                echo "Enter 2 values (source directory and destination directory)"
                echo "Example: /source /destination"
                exit 1 # return with value 1
        fi

}

CheckIfDirectoryExists() {
	#Perform the test
	test -e "$1"

	if [ "$?" -eq 0 ]
	then
		echo "The directory $1 exists"
	elif [ "$?" -eq 1 ]
	then
		echo "The directory $1 does not exist"
		exit 3 #this special code is used by other programs to see if a file doesn't exist
	else
		echo "Unkown return value from test..."
		exit 1 #unkown error occured, exit with 1
	fi 
}

CheckIfSourceIsSameAsDestination() {
	#check to see if source and destination directories are the same
	if [ $(basename $1) == $(basename $2) ]
	then
		echo "The source and destination directories are the same. Files can't be archived to the same directory"
		exit 1 #return with value 1
	fi	
}

CheckIfTwoDirectoriesSupplied $#
CheckIfDirectoryExists $1
CheckIfDirectoryExists $2
CheckIfSourceIsSameAsDestination $1 $2

FILES="$1/*"

#iterate over the specified directory
for f in $FILES
do
	#check to see if the file is a regular file
	if [ -f $f ]
	then	
		#check to see if the file already exists in the destination folder
		if [ -e "$2/$(basename $f)" ]
		then
			#get the timestamp of the file in the destination folder
			date=$(stat -c %y "$2/$(basename $f)")
			#get the timestamp of the file in the source folder
			date2=$(stat -c %y "$f")
			
			#check to see if the file in the source directory was modified by comparing the timestamps
			if [[ $date2 != $date ]]
			then
				echo "Copying $(basename $f) to $2"
				#if the file in the source directory was modified, copy it to the destination directory 
				cp -p $f destination/
				continue
			fi
			
			#otherwise continue to the next file in the directory
			continue
			
		fi
		
		echo "Copying $(basename $f) to $2"

		#copy the file to the destination folder
		cp -p $f destination/
	fi
done
