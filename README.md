# Form Management App

A React + Vite CRUD application demonstrating `useReducer`, `useRef`, `forwardRef`, and `useImperativeHandle`.

## Features

- Add, edit, and delete records
- Form validation (name, email, mobile, date, priority)
- Priority-based row coloring (High / Medium / Low)
- Sort records by priority
- Uncontrolled inputs via `useRef` + `forwardRef`

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── main.jsx                  # Vite entry point
├── App.jsx                   # Root component
├── reducer.js                # useReducer logic
├── components/
│   ├── Form.jsx              # Form with validation
│   ├── Table.jsx             # Records table with sorting
│   └── InputField.jsx        # Forwarded ref input/select
└── styles/
    └── style.css             # All styles
```
