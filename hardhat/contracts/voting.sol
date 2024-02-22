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
  modifier electionOngoing() {
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
    resetAllVoterStatus();
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


  // Add candidate
  function addCandidate(string memory _name) public onlyOwner electionOngoing{
    require(checkElectionPeriod(), "Voting has ended");
    candidates.push(Candidate({
      id: candidates.length,
      name: _name,
      voteCount: 0}));
  }


  // Check voter status
  function checkVoterStatus(address _voter) public view electionOngoing returns (bool) {
    return voters[_voter];
  }

  // Vote for candidate
  function voteTo(uint _id) public electionOngoing {
    require(checkElectionPeriod(), "Voting has ended");
    require(!voters[msg.sender], "You have already voted");
    candidates[_id].voteCount += 1;
    voters[msg.sender] = true;
    votersList.push(msg.sender);
  }

  // get number of votes
  function retrieveVotes() public view returns (Candidate[] memory) {
    return candidates;
  }

  // monitoring voting time
  function electionTimer() public view electionOngoing returns (uint) {
    if (block.timestamp >= endTime) {
      return 0;
    } else {
      return endTime - block.timestamp;
    }
  }

  //check election period
  function checkElectionPeriod() public returns (bool) {
    if (electionTimer() > 0) {
      return true;
    } else {
      electionStatus = false;
      return false;
    }
  }
  //reset all voter status
  function resetAllVoterStatus() public onlyOwner {
    for (uint i = 0; i < votersList.length; i++) {
      voters[votersList[i]] = false;
    }
    delete votersList;
  }

}