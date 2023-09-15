const Header: React.FC = () => {
    return (
        <div className="flex justify-between items-center bg-purple-primary p-4 text-white">
        <h1>Habiter</h1>
            <nav>
                <ul className="flex space-x-4">
                        <li>Home</li>
                        <li>Login</li>
                        <li>Register</li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;