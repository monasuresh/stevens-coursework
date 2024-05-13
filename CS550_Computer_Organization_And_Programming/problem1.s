.extern printf
.global _start
.text

_start:															
	adr x9, i /* get the address of i */
	ldr x19, [x9] /* reg x19 gets i */
	cmp x19, #4 /* compare i to 4 */
	beq equal
	bne not_equal
equal:
        adr x9, g /* get the address of g */
        ldr x20, [x9] /* reg x20 gets g */
	adr x9, f /* get the address of f */
	ldr x21, [x9] /* reg x21 gets f */
	add x21, x20, #1 /* add 1 to g and store the result in x21
	adr x9, f /* get the address of f */
	str x21, [x9] /* store the content of x21 in f */
	b exit
not_equal:
	adr x9, g /* get the address of g */
        ldr x20, [x9] /* reg x20 gets g */
	adr x9, f /* get the address of f */
	ldr x21, [x9] /* reg x21 gets f */
	sub x21, x20, #2 /* subtract 2 from g and store the result in x21 */
	adr x9, f /* get the address of f */
	str x21, [x9] /* store the content of x21 in f */
	b exit
exit:
	adr x0, message /* get the address of message */
	adr x1, f /* get the address of f */
	ldr x1, [x1] /* reg x1 gets f */
	bl printf /* call printf */
	mov x8, #0x5d
	mov x0, #0x41
	svc 0

.data
message: .ascii "%d\n"
i:       .dword 4
f:	 .dword 0
g:	 .dword 20
