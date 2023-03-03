"use strict";

class DisjointSet {
    
    constructor() {
        this._members = new Map();
        this._ranks = new Map();
    }

    add(member) {
        this._members.set(member, -1);
        this._ranks.set(member, 0);
    }

    leaderOf(member) {
        if (!this._members.has(member)) {
            throw new Error(`Attempt to find the leader of an unpresented member: ${member}`);
        }
        let leader = member;
        while (this._members.get(leader) !== -1) {
            leader = this._members.get(leader);
        }
        if (leader !== member) {
            this._members.set(member, leader);
        }
        return leader;
    }

    has(member) {
        return this._members.has(member);
    }

    union(member1, member2) {
        let leader1 = this.leaderOf(member1);
        let leader2 = this.leaderOf(member2);
        if (leader1 === leader2) {
            return leader1;
        }
        let rankDiff = this._ranks.get(leader1) - this._ranks.get(leader2);
        if (rankDiff < 0) {
            [leader1, leader2] = [leader2, leader1];
        }
        this._members.set(leader2, leader1);
        if (rankDiff === 0) {
            this._ranks.set(leader1, this._ranks.get(leader1) + 1);
        }
        return leader1;
    }
    
    areUnited(member1, member2) {
        return this.leaderOf(member1) === this.leaderOf(member2);
    }
}

module.exports = DisjointSet;
