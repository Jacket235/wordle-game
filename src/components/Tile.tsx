type props = {
    value: string | null;
    status?: "correct" | "present" | "incorrect" | "";
}

export default function Tile({ value, status }: props) {
    const colors: Record<string, string> = {
        correct: "border-green-500 bg-green-500",
        present: "border-yellow-400 bg-yellow-400",
        incorrect: "bg-gray-700"
    }

    return (
        <div className={`flex items-center justify-center h-[62px] w-[62px] border-2 font-bold border-gray-700 ${status ? colors[status] : ""}`}>
            <span className="flex items-center justify-center text-3xl uppercase">{value}</span>
        </div>
    );
}   