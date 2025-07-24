import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "@/routes/Routes";
import BottomNavigation from "./components/global/BottomNavigation";

// Layout component to handle bottom navigation
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    // Get current page from pathname
    const getCurrentPage = () => {
        switch (location.pathname) {
            case '/':
                return 'home';
            case '/courses':
                return 'courses';
            case '/rankings':
                return 'rankings';
            case '/certification':
                return 'certification';
            case '/profile':
                return 'profile';
            default:
                return 'home';
        }
    };

    const handlePageChange = (page: string) => {
        switch (page) {
            case 'home':
                window.location.href = '/';
                break;
            case 'courses':
                window.location.href = '/courses';
                break;
            case 'rankings':
                window.location.href = '/rankings';
                break;
            case 'certification':
                window.location.href = '/certification';
                break;
            case 'profile':
                window.location.href = '/profile';
                break;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 max-w-md mx-auto">
            <main className="pb-20">
                {children}
            </main>
            <BottomNavigation
                currentPage={getCurrentPage()}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

function App() {
    return (
        <Router>
            <Layout>
                <AppRoutes />
            </Layout>
        </Router>
    );
}

export default App;