.text
.global _start
.extern printf

_start:
	adr x0, cwid /* store the address of cwid in x0 */
	ldr x10, [x0] /* x10 gets the value of cwid */
	mov x11, #10 /* reg x11 gets 10 */
	udiv x12, x10, x11 /* divide value cwid by 10 and store the result in x12 */
	msub x13, x12, x11, x10 /* calculate the remainder of the division */
	add x10, x12, #0 /* store the result of the division in x10 */
	add x3, x3, x13 /* store the remainder in x3 */
loop:	
	cmp x12, #0 /* compare x12 to 0 */
	beq exit
	udiv x12, x10, x11 /* divide value in x10 by value in x11 */
	msub x13, x12, x11, x10 /* calculate the remainder of the division */
	add x10, x12, #0 /* store the result of the division in x10 */
	add x3, x3, x13 /* store the remainder in x3 */
	b loop
exit:
	adr x0, message
	mov x1, x3
	bl printf
	# exit system call
	mov x8, #0x5d
	mov x0, #0x41
	svc 0

.data
message: .ascii "%d\n\0"
cwid:	  .dword 20009795
