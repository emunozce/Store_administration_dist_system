export default function Loader() {
    return (
        <div className="flex items-center justify-center h-96">
            <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-green-800"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-green-400 animate-spin"></div>
            </div>
        </div>
    );
}
