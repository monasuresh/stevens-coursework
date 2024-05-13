.text
.global _start
.extern printf

_start:
	adr x1, array /* pass the base address of the array as a parameter */
	mov x2, #0 /* pass the starting index as a parameter */
	mov x3, #4 /* pass the length of the array as a parameter */
 
	bl find_max /* main method calls find_max */

	#print the max number in the array
	mov x1, x0
	adr x0, message
	bl printf        
	b exit
find_max:
	#grow the stack and push x30 and x2 onto the stack
	sub sp, sp, #16
	str x30, [sp, #0]
	str x2, [sp, #-8]
	
	sub x10, x3, #1 /* store length of array - 1 in x10 */
	
	#if index = 0 branch to case_empty
	cmp x3, #0
	beq case_empty

	#if index = 1 branch to case_only_one_element
	cmp x3, #1
	beq case_only_one_element
 
	#if a[index] >= a[size] - 1 branch to case_last_element
	cmp x2, x10  
	bge case_last_element
	
	#otherwise increment index by 1 and call find_max
	add x2, x2, #1  
	bl find_max
	
	#calculate array[index]
	add x10, x1, x2, lsl #3
        ldr x11, [x10]
        
	#pop x30 and x2 and shrink the stack
	ldr x2, [sp, #8]
	ldr x30, [sp, #0]
	add sp, sp, #16
	
	#compare return value with array[index] and branch if array[index]
	#greater
	cmp x11, x0
	bgt set_new_max
	
	#otherwise set return value to current max and return
	add x0, xzr, x0
	br x30
set_new_max:
	#set return value to array[index] and return
	mov x0, x11
	br x30	
case_last_element:
	#set return value to array[index]
	add x10, x1, x2, lsl #3
        ldr x11, [x10]
        mov x0, x11

	#restore x30 and x2 and shrink the stack
	ldr x2, [sp, #8]
	ldr x30, [sp, #0]
	add sp, sp, #16

	br x30	
case_empty:
	#set return value to Integer.MIN_VALUE
	adr x10, min_value
	ldr x11, [x10]
	add x0, xzr, x11
	
	#pop x30 and x2 and shrink the stack
	ldr x2, [sp, #8]
	ldr x30, [sp, #0]
	add sp, sp, #16
	
	br x30
case_only_one_element:
	#set return value to array[0]
	mov x10, #0
	add x11, x1, x10, lsl #3
	ldr x12, [x11]
	add x0, xzr, x12
	
	#pop x30 and x2 and shrink the stack
	ldr x2, [sp, #8]
	ldr x30, [sp, #0]
	add sp, sp, #16
	
	br x30
exit:	
	# exit system call
	mov x8, #0x5d
	mov x0, #0x41
	svc 0

.data
message: .ascii "%d\n\0"
array:	  .dword 7,8,1,4
min_value: .dword -2147483648
.end
