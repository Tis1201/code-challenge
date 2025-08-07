/*
 * This function uses the mathematical formula for the sum of the first n natural numbers.
 *
 * Time Complexity: O(1) - Calculation is done in constant time.
 * Space Complexity: O(1) - Uses a constant amount of space
*/

function sum_to_n_a(n: number): number {
	let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/*
 * This function uses the mathematical formula for the sum of the first n natural numbers.
 *
 * Time Complexity: O(1) - Calculation is done in constant time.
 * Space Complexity: O(1) - Uses a constant amount of space
*/
function sum_to_n_b(n: number): number {
	return (n * (n + 1)) / 2;
}

/*
 * This function uses recursion to calculate the sum of the first n natural numbers.
 *
 * Time Complexity: O(n) - Each recursive call processes one number.
 * Space Complexity: O(n) - Each recursive call adds a new frame to the call stack.
*/

function sum_to_n_c(n: number): number {
	if (n < 1) {
        return 0;
    }
    return n + sum_to_n_c(n - 1);
}

console.log("sum_to_n_a result: ", sum_to_n_a(5));
console.log("sum_to_n_b result: ", sum_to_n_b(5));
console.log("sum_to_n_c result: ", sum_to_n_c(5));