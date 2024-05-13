.text
.global _start
.extern printf

_start:
	mov x10, #1 /* reg x10 gets 1 */
	mov x3, #0 /* reg x3 gets 0 */
loop:
	cmp x10, #11 /* compare reg x10 to 11 */
	beq exit
	add x3, x3, x10 /* add the value in x10 to reg x3 */
	add x10, x10, #1 /* add 1 to x10 */
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
