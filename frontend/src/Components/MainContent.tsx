import DemoHabitRow from "./DemoHabitRow";


type MainContentProps = {
    className?: string;
}

const MainContent: React.FC<MainContentProps> = ({ className }) => {
    return (
        <div className={`bg-neutral text-primary ${className} pl-4`}> {/* Added pl-4 for padding-left */}
        <section className="mb-8">
                <h2 className="text-2xl font-bold mb-2">What is Habiter?</h2>
                <p>....</p>
            </section>
            <section>
                <h2 className="text-2xl font-bold mb-2">Demo</h2>
                <DemoHabitRow />
            </section>
        </div>
    );
};

export default MainContent;