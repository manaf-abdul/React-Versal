import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRoutes from './Routes/userRoutes';
import InstructorRoutes from './Routes/instructorRoutes';
import AdminRoutes from './Routes/adminRoutes';
import CommonRoutes from './Routes/commonRoutes';

import Home from './Pages/Common/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/*' element={<CommonRoutes />} />
          {/* <Route path='/*' element={<CommonRoutes />} /> */}
          <Route path='/user/*' element={<UserRoutes />} />
          <Route path='/instructor/*' element={<InstructorRoutes />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
