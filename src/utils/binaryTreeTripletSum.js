/**
 * Binary Tree Adjacent Triplet Sum
 *
 * For a given binary tree, finds every "adjacent triplet" — a connected
 * chain of three nodes in the form (grandparent → parent → child) — sums
 * the values of each triplet, and returns the grand total of all those sums.
 *
 * A triplet (A, B, C) exists whenever:
 *   - B is a direct child of A, AND
 *   - C is a direct child of B
 *
 * Total = Σ (A.val + B.val + C.val) over all such triplets
 */

export class TreeNode {
  /**
   * @param {number} val
   * @param {TreeNode|null} left
   * @param {TreeNode|null} right
   */
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Returns the sum of all adjacent-triplet sums in the binary tree.
 *
 * Time complexity:  O(n)  — each node is visited once
 * Space complexity: O(h)  — recursion stack, where h is the tree height
 *
 * @param {TreeNode|null} root - Root of the binary tree
 * @returns {number} Grand total of every (grandparent + parent + child) sum
 */
export function sumOfAdjacentTriplets(root) {
  let total = 0;

  function dfs(node) {
    if (!node) return;

    const children = [node.left, node.right].filter(Boolean);

    for (const child of children) {
      const grandchildren = [child.left, child.right].filter(Boolean);

      for (const grandchild of grandchildren) {
        total += node.val + child.val + grandchild.val;
      }

      dfs(child);
    }
  }

  dfs(root);
  return total;
}
