const connectWalletMsg = document.querySelector('#connectWalletMsg');
const connectWalletBtn = document.querySelector('#connectWalletBtn');
const votingStation = document.querySelector('#votingStation');
const timerTime = document.querySelector('#time');
const timerMessage = document.querySelector('#timerMessage');
const mainBoard = document.querySelector('#mainBoard');
const voteForm = document.querySelector('#voteForm');
const vote = document.querySelector('#vote');
const voteBtn = document.querySelector('#sendVote');
const showResultContainer = document.querySelector('#showResultContainer');
const showResult = document.querySelector('#showResult');
const result = document.querySelector('#result');
const admin = document.querySelector('#admin');
const candidates = document.querySelector('#candidates');
const electionDuration = document.querySelector('#electionDuration');
const startAnElection = document.querySelector('#startAnElection');
const candidate = document.querySelector('#candidate');
const addTheCandidate = document.querySelector('#addTheCandidate');



// Configuring Ethers
const contractAddress = '0xfbDfA54287f757EB7F376F765Ef64447f39ca8f0';
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "addCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "checkElectionPeriod",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_voter",
        "type": "address"
      }
    ],
    "name": "checkVoterStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "electionStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "electionTimer",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "endTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getVoters",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "voteCount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Voting.Candidate[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "resetAllVoterStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "startTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "_candidates",
        "type": "string[]"
      },
      {
        "internalType": "uint256",
        "name": "_votingDuration",
        "type": "uint256"
      }
    ],
    "name": "startVoting",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "voteTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "voters",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "votersList",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

let contract;
let signer;


const provider = new ethers.providers.Web3Provider(window.ethereum, 80001);
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  });
});

//functions
const getAllCandidates = async () => {
  if (document.getElementById('candidateBoard')) {
    document.getElementById('candidateBoard').remove();
  }

  let board = document.createElement("table");
  board.id = 'candidateBoard';
  mainBoard.appendChild(board);

  let tableHeader = document.createElement("tr");
  tableHeader.innerHTML = "<th>Candidate ID</th><th>Candidate Name</th>";
  board.appendChild(tableHeader);

  let candidates = await contract.retrieveVotes();
  for (let i = 0; i < candidates.length; i++) {
    let row = document.createElement("tr");
    candidate.innerHTML = `<td>${parseInt(candidates[i][0])}</td><td>${candidates[i][1]}</td>`;
    board.appendChild(candidate);
  }
}

const getResult = async () => {
  result.style.display = 'flex';

  if (document.getElementById('resultBoard')) {
    document.getElementById('resultBoard').remove();
  }

  let resultBoard = document.createElement("table");
  resultBoard.id = 'resultBoard';
  result.appendChild(resultBoard);

  let tableHeader = document.createElement("tr");
  tableHeader.innerHTML = "<th>Candidate ID</th><th>Candidate Name</th><th>Votes</th>";
  resultBoard.appendChild(tableHeader);

  let candidates = await contract.getVoters();
  for (let i = 0; i < candidates.length; i++) {
    let row = document.createElement("tr");
    candidate.innerHTML = `<td>${parseInt(candidates[i][0])}</td><td>${candidates[i][1]}</td><td>${parseInt(candidates[i][2])}</td>`;
    resultBoard.appendChild(candidate);
  }
}

const refreshPage  = () => {
  setInterval(async()=> {
    let time = await contract.electionTimer();
    if (time > 0) {
      timerMessage.innerHTML = `<span id="time">${time}</span> seconds left`;
      voteForm.style.display = 'flex';
      showResultContainer.style.display = 'none';
    } else {
      timerMessage.innerHTML = `Election has ended`;
      voteForm.style.display = 'none';
      showResultContainer.style.display = 'block';
    }
  },10000)
  setInterval(async()=> {
    getAllCandidates();
  },10000)
};

const sendVote = async () => {
  await contract.voteTo(vote.value);
  vote.value = '';
};

const startElection = async () => {
  if (!candidates.value) {
    alert('Please add candidates');
  }
  if (!electionDuration.value) {
    alert('Please add election duration');
  }

  const _candidates = candidates.value.split(',');
  const _votingDuration = electionDuration.value;

  await contract.startVoting(_candidates, _votingDuration);
  refreshPage();

  candidates.value = '';
  electionDuration.value = '';


  voteForm.style.display = 'flex';
  showResultContainer.style.display = 'none';
};

const addCandidate = async () => {
  if (!candidate.value) {
    alert('Please add a candidate');
  }

  await contract.addCandidate(candidate.value);
  refreshPage();
  candidate.value = '';
};


const getAccount = async () => {
  const ethAccounts = await provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
      signer = provider.getSigner(accounts[0]);
      contract = new ethers.Contract(contractAddress, contractABI, signer);
    });
  });

  connectWalletBtn.textContent = signer._address.slice(0,10) + "...";
  connectWalletMsg.textContent = "Connected";
  connectWalletBtn.disabled = true;

  let owner = await contract.owner();
  if (owner == signer._address) {
    admin.style.display = 'flex';
    let time = await contract.electionTimer();
    if (time ==0) {
      contract.checkElectionPeriod();
    }
  }

  votingStation.style.display = 'block';
  refreshPage();
  getAllCandidates();
};

connectWalletBtn.addEventListener('click', getAccount);
showResult.addEventListener('click', getResult);
voteBtn.addEventListener('click', sendVote);
addTheCandidate.addEventListener('click', addCandidate);
startAnElection.addEventListener('click', startElection);