import { Link } from 'react-router';

const Landing = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Welcome</h1>
            <div className="flex space-x-4">
                <Link to="/login/admin" className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700">
                    Admin Login
                </Link>
                <Link to="/login/merchant" className="px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700">
                    Merchant Login
                </Link>
                <Link to="/login/member" className="px-4 py-2 font-semibold text-white bg-purple-500 rounded hover:bg-purple-700">
                    Member Login
                </Link>
            </div>
        </div>
    );
};

export default Landing;