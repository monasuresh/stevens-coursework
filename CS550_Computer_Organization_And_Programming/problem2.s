.text
.global _start
.extern printf

_start:	
	adr x9, a /* get the address of a */
	ldr x19, [x9] /* reg x19 gets a */
	adr x9, b /* get the address of b */
	ldr x20, [x9] /* reg x20 gets b */
	add x10, x19, x20 /* add a + b and store the result in reg x10 */ 
	cmp x10, #14 /* check if result is 14 */
	beq equal
	bne not_equal
equal:
	mov x21, #0 /* register x21 gets 0 */
	add x21, x21, #3 /* add 3 to register x21 */
	adr x9, c /* get the address of c */
	str x21, [x9] /* store the value in x21 in c */
	b exit
not_equal:
	mov x21, #0 /* register x21 gets 0 */
	sub x21, x21, #2 /* subtract 2 from 0 */
	adr x9, c /* get the address of c */
        str x21, [x9] /* store the result in c */
	b exit
exit:
	adr x0, message /* get the address of message */
	adr x1, c /* get the address of c */
	ldr x1, [x1] /* reg x1 gets the value of c */
	bl printf /* call printf */
	# exit system call
	mov x8, #0x5d
	mov x0, #0x41
	svc 0

.data
message: .ascii "%d\n\0"
a:       .dword 6
b:	 .dword 8
c:	 .dword 0
