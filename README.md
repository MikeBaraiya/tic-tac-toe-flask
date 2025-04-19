# Tic Tac Toe Game

A modern implementation of the classic Tic Tac Toe game using Python Flask for the backend and modern web technologies for the frontend.

## Features

- Clean and modern UI using Bootstrap
- Responsive design that works on all devices
- Server-side game logic with Python Flask
- Real-time game state updates
- Win detection and highlighting
- Draw detection
- Easy game reset functionality

## Technologies Used

- Backend: Python Flask
- Frontend: HTML5, CSS3, JavaScript
- Styling: Bootstrap 5
- State Management: Server-side with Flask

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/MikeBaraiya/tic-tac-toe-flask.git
cd tic-tac-toe-flask
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python app.py
```

4. Open your browser and navigate to:
```
http://localhost:5000
```

## How to Play

1. The game starts with Player X
2. Players take turns clicking on empty cells to place their mark (X or O)
3. The game automatically detects wins and draws
4. When a player wins, the winning combination is highlighted
5. Click the "Reset Game" button to start a new game

## Project Structure

```
tic-tac-toe-flask/
├── app.py              # Flask application and game logic
├── requirements.txt    # Python dependencies
├── static/
│   ├── styles.css     # Game styling
│   └── script.js      # Frontend JavaScript
└── templates/
    └── index.html     # Game HTML template
```

## Contributing

Feel free to fork this repository and submit pull requests to contribute to this project.

## License

This project is open source and available under the [MIT License](LICENSE).