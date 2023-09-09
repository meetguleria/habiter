type MainContentProps = {
    className?: string;
}

const MainContent: React.FC<MainContentProps> = ({ className }) => {
    return (
        <div className={`bg-neutral text-primary ${className}`}>
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-2">What is Habiter?</h2>
                <p>....</p>
            </section>
            <section>
                <h2 className="text-2xl font-bold mb-2">Demo</h2>
                {/* Demo */}
            </section>
        </div>
    );
};

export default MainContent;