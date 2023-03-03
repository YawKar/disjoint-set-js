"use strict";

const DisjointSet = require('./DisjointSet');

// Unless I learn some cool test framework, we will use this
const assert = (condition, message) => {
    if (!condition) {
        throw new Error(message ?? "Assertion failed");
    }
};

const assertThrowAny = (func, message) => {
    let throwed = true;
    try { func(); throwed = false; } catch (e) {}
    if (!throwed) {
        throw new Error(message ?? "Assertion failed");
    }
};

console.log('Add/Has tests');
{
    let ds = new DisjointSet();
    for (let i = 1; i < 10; ++i) {
        assert(!ds.has(i), 'Should return false for members that are not present.');
        ds.add(i);
        assert(ds.has(i), 'Should return true for members that are present.');
    }
}

console.log('LeadorOf tests');
{
    let ds = new DisjointSet();
    for (let i = 1; i < 10; ++i) {
        assertThrowAny(() => {
            ds.leaderOf(i);
        }, 'Should throw exception on attempt to find a leader of an unpresented member');
        ds.add(i);
        assert(ds.leaderOf(i) === i, 'Should return the member as its own leader in case of newly added member');
    }
}

console.log('Union tests');
{
    let ds = new DisjointSet();
    for (let i = 1; i < 10; ++i) {
        ds.add(i);
    }
    for (let i = 2; i < 10; ++i) {
        ds.union(i, i - 1);
        for (let first = 1; first < 10; ++first) {
            for (let second = 1; second < 10; ++second) {
                assert(ds.areUnited(first, second) === (first <= i && second <= i || first === second) , 'Should return true if previously unioned members');
            }
        }
    }
}

console.log('All tests passed');
