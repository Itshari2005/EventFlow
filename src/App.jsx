import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import IntroPage from './components/IntroPage';
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import StudentProfilePage from './components/StudentProfilePage';
import TeacherProfilePage from './components/TeacherProfilePage';
import TeacherAdminPanel from './components/TeacherAdminPanel';
import StudentDashboardPage from './components/StudentDashboardPage';
import StudentEventPage from './components/StudentEventPage';
import TeacherEventInfo from './components/TeacherEventInfo';
import './styles/SignUpPage.css'
import './styles/IntroPage.css'
import './styles/LoginPage.css'
import './styles/StudentProfilePage.css'
import './styles/StudentDashboardPage.css'

const App = ()=>{
    return (
        <Router>
            <Routes>
                <Route path="/" element={<IntroPage />}/>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/signup" element={<SignUpPage />}/>
                <Route path="/student-profile" element={<StudentProfilePage />}/>
                <Route path='/teacher-profile' element={<TeacherProfilePage/>}/>
                <Route path='/teacher-admin-panel' element={<TeacherAdminPanel/>}/>
                <Route path='/student-dashboard' element={< StudentDashboardPage/>}/>
                <Route path='/student-events' element={< StudentEventPage/>}/>
                <Route path='/teacher-event-info' element={< TeacherEventInfo/>}/>
                <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
        </Router>
        
    )
}

export default App;
