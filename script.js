
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
          cell.style.color = 'white';

          board[row][col] = currentPlayer;


          const audio = new Audio('/move.mp3');
          audio.play();

          if (checkWinner()) {
            document.getElementById('result').textContent = `Player ${currentPlayer} wins!`;


            const winAudio = new Audio('./sounds/win.mp3');
            winAudio.play();


            setTimeout(() => {
              alert(`Player ${currentPlayer} wins!`);
              resetGame(); 
            }, 750);
          } else if (isBoardFull()) {

            document.getElementById('result').textContent = "It's a draw!";


            const tieAudio = new Audio('./sounds/draw.mp3');
            tieAudio.play();


            setTimeout(() => {
              alert("It's a draw!");
              resetGame();
            }, 750);
          } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            const turnMessage = document.getElementById('turnMessage');
            turnMessage.textContent = `Now it's ${currentPlayer}'s turn`;
          }
        } else {

          const audio = new Audio('/move.mp3');
          audio.play();
        }
      }

      function checkWinner() {
        for (let i = 0; i < 3; i++) {
          if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {

            for (let j = 0; j < 3; j++) {
              const cell = document.querySelector(`table tr:nth-child(${i + 1}) td:nth-child(${j + 1})`);
              cell.classList.add('winning-line');
            }
            return true;
          }
          if (board[0][i] !== '' && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {

            for (let j = 0; j < 3; j++) {
              const cell = document.querySelector(`table tr:nth-child(${j + 1}) td:nth-child(${i + 1})`);
              cell.classList.add('winning-line');
            }
            return true;
          }
        }

        if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {

          for (let i = 0; i < 3; i++) {
            const cell = document.querySelector(`table tr:nth-child(${i + 1}) td:nth-child(${i + 1})`);
            cell.classList.add('winning-line');
          }
          return true;
        }
        if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {

          for (let i = 0; i < 3; i++) {
            const cell = document.querySelector(`table tr:nth-child(${i + 1}) td:nth-child(${2 - i + 1})`);
            cell.classList.add('winning-line');
          }
          return true;
        }
        return false;
      }

      function isBoardFull() {

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

        board = [['', '', ''], ['', '', ''], ['', '', '']];
        currentPlayer = 'X';


        const cells = document.querySelectorAll('table td');
        cells.forEach(cell => {
          cell.textContent = '';
          cell.style.color = '#FFF';
          cell.classList.remove('winning-line');
        });

        document.getElementById('result').textContent = '';
        document.getElementById('turnMessage').textContent = "Now it's X's turn";
      }
