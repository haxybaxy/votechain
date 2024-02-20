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
  bool public electionStatus;


  // Voting Permissions
  modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can call this function");
    _;
  }


  // Check voting status
  modifier votingOngoing() {
    require(electionStatus, "Voting is not started yet");
    _;
  }

  // Constructor
  constructor() {
    owner = msg.sender;

  }

  // Start voting
  function startVoting(string[] memory _candidates, uint256 _votingDuration) public onlyOwner {
    require(electionStatus == false, "Voting is already started"); // Check if voting is already started
    delete candidates;
    // resetAllVoterStatus();

    for (uint i = 0; i < _candidates.length; i++) {
      candidates.push(Candidate({
        id: i,
        name: _candidates[i],
        voteCount: 0}));
    }
    electionStatus = true;
    startTime = block.timestamp;
    endTime = block.timestamp + (_votingDuration * 1 minutes);
  }


  //add candidate

}