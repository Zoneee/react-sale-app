/**
 * Tests for sumOfAdjacentTriplets
 *
 * Run with:  node src/utils/binaryTreeTripletSum.test.js
 */

import { TreeNode, sumOfAdjacentTriplets } from "./binaryTreeTripletSum.js";

let passed = 0;
let failed = 0;

function assert(description, actual, expected) {
  if (actual === expected) {
    console.log(`  ✓ ${description}`);
    passed++;
  } else {
    console.error(`  ✗ ${description}`);
    console.error(`    expected: ${expected}`);
    console.error(`    received: ${actual}`);
    failed++;
  }
}

// ─── Test helpers ────────────────────────────────────────────────────────────

/**
 * Build a complete binary tree from a level-order array.
 * null entries leave a node absent (no child).
 *
 * Example: [1, 2, 3, 4, 5, 6, 7]
 *        1
 *       / \
 *      2   3
 *     / \ / \
 *    4  5 6  7
 */
function buildTree(values) {
  if (!values || values.length === 0) return null;
  const nodes = values.map((v) => (v === null ? null : new TreeNode(v)));
  for (let i = 0; i < nodes.length; i++) {
    if (!nodes[i]) continue;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    nodes[i].left = left < nodes.length ? nodes[left] : null;
    nodes[i].right = right < nodes.length ? nodes[right] : null;
  }
  return nodes[0];
}

// ─── Tests ───────────────────────────────────────────────────────────────────

console.log("\nTest: null / empty tree");
assert("null root returns 0", sumOfAdjacentTriplets(null), 0);

console.log("\nTest: single node");
assert("single node returns 0", sumOfAdjacentTriplets(new TreeNode(5)), 0);

console.log("\nTest: two nodes (root + one child)");
{
  // No triplet possible — need at least 3 levels
  const root = new TreeNode(1, new TreeNode(2));
  assert("two nodes returns 0", sumOfAdjacentTriplets(root), 0);
}

console.log("\nTest: linear chain  1 → 2 → 3  (one triplet)");
{
  const root = new TreeNode(1, new TreeNode(2, new TreeNode(3)));
  // Only triplet: (1, 2, 3) → sum = 6
  assert("linear chain of 3", sumOfAdjacentTriplets(root), 6);
}

console.log("\nTest: perfect tree with 3 levels  [1, 2, 3, 4, 5, 6, 7]");
{
  //        1
  //       / \
  //      2   3
  //     / \ / \
  //    4  5 6  7
  //
  // Triplets:
  //   (1, 2, 4) → 7
  //   (1, 2, 5) → 8
  //   (1, 3, 6) → 10
  //   (1, 3, 7) → 11
  // Total = 7 + 8 + 10 + 11 = 36
  const root = buildTree([1, 2, 3, 4, 5, 6, 7]);
  assert("perfect 3-level tree", sumOfAdjacentTriplets(root), 36);
}

console.log("\nTest: 4-level tree  [1, 2, 3, 4, 5, 6, 7, 8]");
{
  //           1
  //          / \
  //         2   3
  //        / \ / \
  //       4  5 6  7
  //      /
  //     8
  //
  // Level-2 triplets (root as grandparent):
  //   (1,2,4)=7  (1,2,5)=8  (1,3,6)=10  (1,3,7)=11  → 36
  // Level-3 triplet (node 2 as grandparent):
  //   (2,4,8)=14
  // Total = 36 + 14 = 50
  const root = buildTree([1, 2, 3, 4, 5, 6, 7, 8]);
  assert("4-level tree", sumOfAdjacentTriplets(root), 50);
}

console.log("\nTest: all equal values  [5, 5, 5, 5, 5, 5, 5]");
{
  // 4 triplets, each = 15  → total = 60
  const root = buildTree([5, 5, 5, 5, 5, 5, 5]);
  assert("all-equal 3-level tree", sumOfAdjacentTriplets(root), 60);
}

console.log("\nTest: negative values  [-1, -2, -3, -4, -5, -6, -7]");
{
  // (−1,−2,−4)=−7  (−1,−2,−5)=−8  (−1,−3,−6)=−10  (−1,−3,−7)=−11
  // Total = −36
  const root = buildTree([-1, -2, -3, -4, -5, -6, -7]);
  assert("negative values", sumOfAdjacentTriplets(root), -36);
}

// ─── Summary ─────────────────────────────────────────────────────────────────

console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
