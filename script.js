
      let currentPlayer = 'X';
      let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];

      function makeMove(row, col) {
        if (board[row][col] === '' && !checkWinner()) {
          const cell = document.querySelector(`table tr:nth-child(${row + 1}) td:nth-child(${col + 1})`);
          cell.textContent = currentPlayer;
          cell.style.color = 'white'; // Highlight the cell

          board[row][col] = currentPlayer;

          // Play a sound for each move
          const audio = new Audio('/move.mp3');
          audio.play();

          if (checkWinner()) {
            document.getElementById('result').textContent = `Player ${currentPlayer} wins!`;

            // Play a sound for winning
            const winAudio = new Audio('/win.mp3');
            winAudio.play();

            // Show an alert and restart the game
            setTimeout(() => {
              alert(`Player ${currentPlayer} wins!`);
              resetGame(); // Start a new game
            }, 1000);
          } else if (isBoardFull()) {
            // The game is a tie
            document.getElementById('result').textContent = "It's a draw!";

            // Play a sound for a tie
            const tieAudio = new Audio('/tie.mp3');
            tieAudio.play();

            // Show an alert and restart the game
            setTimeout(() => {
              alert("It's a draw!");
              resetGame(); // Start a new game
            }, 1000);
          } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            const turnMessage = document.getElementById('turnMessage');
            turnMessage.textContent = `Now it's ${currentPlayer}'s turn`;
          }
        } else {
          // Play a sound for each valid or invalid move
          const audio = new Audio('/move.mp3');
          audio.play();
        }
      }

      function checkWinner() {
        for (let i = 0; i < 3; i++) {
          if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
            // Highlight the winning line
            for (let j = 0; j < 3; j++) {
              const cell = document.querySelector(`table tr:nth-child(${i + 1}) td:nth-child(${j + 1})`);
              cell.classList.add('winning-line');
            }
            return true;
          }
          if (board[0][i] !== '' && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
            // Highlight the winning line
            for (let j = 0; j < 3; j++) {
              const cell = document.querySelector(`table tr:nth-child(${j + 1}) td:nth-child(${i + 1})`);
              cell.classList.add('winning-line');
            }
            return true;
          }
        }

        if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
          // Highlight the winning line
          for (let i = 0; i < 3; i++) {
            const cell = document.querySelector(`table tr:nth-child(${i + 1}) td:nth-child(${i + 1})`);
            cell.classList.add('winning-line');
          }
          return true;
        }
        if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
          // Highlight the winning line
          for (let i = 0; i < 3; i++) {
            const cell = document.querySelector(`table tr:nth-child(${i + 1}) td:nth-child(${2 - i + 1})`);
            cell.classList.add('winning-line');
          }
          return true;
        }
        return false;
      }

      function isBoardFull() {
        // Check if the board is full
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
              return false;
            }
          }
        }
        return true;
      }

      function resetGame() {
        // Clear the board and start a new game
        board = [['', '', ''], ['', '', ''], ['', '', '']];
        currentPlayer = 'X';

        // Reset cell contents and styles
        const cells = document.querySelectorAll('table td');
        cells.forEach(cell => {
          cell.textContent = '';
          cell.style.color = '#FFF';
          cell.classList.remove('winning-line');
        });

        document.getElementById('result').textContent = '';
        document.getElementById('turnMessage').textContent = "Now it's X's turn";
      }
