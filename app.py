from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

class TicTacToe:
    def __init__(self):
        self.board = [''] * 9
        self.current_player = 'X'
        self.game_active = True
        self.winning_combinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  # Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  # Columns
            [0, 4, 8], [2, 4, 6]              # Diagonals
        ]

    def make_move(self, position):
        if self.board[position] == '' and self.game_active:
            self.board[position] = self.current_player
            return True
        return False

    def check_win(self):
        for combination in self.winning_combinations:
            if all(self.board[i] == self.current_player for i in combination):
                return True
        return False

    def check_draw(self):
        return all(cell != '' for cell in self.board)

    def switch_player(self):
        self.current_player = 'O' if self.current_player == 'X' else 'X'

    def reset(self):
        self.board = [''] * 9
        self.current_player = 'X'
        self.game_active = True

game = TicTacToe()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/make_move', methods=['POST'])
def make_move():
    position = int(request.json['position'])
    
    if game.make_move(position):
        if game.check_win():
            game.game_active = False
            return jsonify({
                'status': 'win',
                'player': game.current_player,
                'board': game.board
            })
        
        if game.check_draw():
            game.game_active = False
            return jsonify({
                'status': 'draw',
                'board': game.board
            })
        
        game.switch_player()
        return jsonify({
            'status': 'continue',
            'player': game.current_player,
            'board': game.board
        })
    
    return jsonify({'status': 'invalid'})

@app.route('/reset', methods=['POST'])
def reset():
    game.reset()
    return jsonify({
        'status': 'reset',
        'player': game.current_player,
        'board': game.board
    })

if __name__ == '__main__':
    app.run(debug=True)