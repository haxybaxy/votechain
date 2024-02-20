// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Voting {
  // Strucure template for voting candidates
  struct Candidate {
    uint id;
    string name;
    uint voteCount;
  }
  // list of candidates
  Candidate[] public candidates;
  // owner address
  address public owner;
  // Map addresses of voters
  mapping(address => bool) public voters;
  // List of voters
  address[] public votersList;


  // Start and end time of voting
  uint public startTime;
  uint public endTime;

  // Voting status
  bool public votingStatus;

}