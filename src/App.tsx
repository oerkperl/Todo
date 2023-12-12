
import TasksList from './pages/TasksList';
import TaskDetail from './pages/TaskDetail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TodoProvider } from './contexts/todoContext';
import { AddEditTask } from './pages/AddEditTask';
import { GlobalStyle, Wrapper } from './components/Styled';

function App() {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Router>
          <TodoProvider>
            <Routes>
              <Route path="/" element={<TasksList />} />
              <Route path="/add" element={<AddEditTask />} />
              <Route path="/edit/:id" element={<AddEditTask />} />
              <Route path="/task/:id" element={<TaskDetail />} />
            </Routes>
          </TodoProvider>
        </Router>
      </Wrapper>
    </>
  );
}

export default App;
