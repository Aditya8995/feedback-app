import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import AboutPage from './components/pages/AboutPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutIconsLink from './components/AboutIconsLink';
import { FeedbackProvider } from './context/FeedbackContext';


function App(){
    
    return (
        <FeedbackProvider>
        <Router>
            <Header/>  
            <div className="container">
                <Routes>
                    <Route exact path='/' element = {
                        <>
                        <FeedbackForm />
                        <FeedbackStats />
                        <FeedbackList />
                        </>
                    }/>
                    <Route path = '/about' element={<AboutPage/>} />
                </Routes>
            </div>
            <AboutIconsLink/>
        </Router>
        </FeedbackProvider>
    )
}

export default App