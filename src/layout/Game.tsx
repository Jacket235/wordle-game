import { useEffect, useState } from "react";
import getWord from "../functions/getWord";
import Row from "../components/Row";

type TileData = { value: string | null; status: "correct" | "present" | "incorrect" | ""; };

export default function Game() {

    const [answer, setAnswer] = useState<string>("")
    const [guesses, setGuesses] = useState<TileData[][]>(Array.from({ length: 6 }, () => 
        Array(5).fill(null).map(() => ({value: null, status: ""})))
    );
    const [gameOver, setGameOver] = useState<boolean>(false);

    const [currentRow, setCurrentRow] = useState<number>(0);
    const [currentTile, setCurrentTile] = useState<number>(0);

    useEffect(() => {
        const fetchWord = async () => {
            const word = await getWord();
            setAnswer(word[0]);
        } 

        fetchWord();
    }, [])

    useEffect(() => {
        const handleKeyInput = (e: KeyboardEvent) => {
            if(!answer || gameOver || currentRow > 5) return;
            const key = e.key.toLowerCase();

            if(currentTile < 5 && /^[a-z]$/i.test(key)) {
                setTile(currentRow, currentTile, key);
                setCurrentTile(t => t + 1);
            }

            if(key === "backspace") {
                if(currentTile > 0) {
                    setCurrentTile(t => t - 1);
                    setTile(currentRow, currentTile - 1, null);
                }
            }

            if(key === "enter") {
                if(currentTile === 5) {

                    for(let i = 0; i < 5; i++) {
                        const tile = guesses[currentRow][i];

                        if(tile.value === answer.charAt(i)) {
                            tile.status = "correct";
                            continue;
                        }

                        for(let v = 0; v < 5; v++){
                            if(tile.value === answer.charAt(v)) {
                                tile.status = "present";
                                break;
                            }
                        }
                    }

                    const row = guesses[currentRow];
                    let won = true;
                    for (let i = 0; i < 5; i++) {
                        if (row[i].status !== "correct") {
                            won = false;
                            if(row[i].status == "") {
                                row[i].status = "incorrect";
                            }
                        }
                    }

                    setCurrentRow(r => r + 1);
                    setCurrentTile(0);

                    if(won || currentRow >= 5 ) {
                        setGameOver(true);
                        return;
                    }
                }
            }
        }

        window.addEventListener("keyup", handleKeyInput);

        return () => window.removeEventListener("keyup", handleKeyInput);
    }, [currentRow, currentTile, answer, gameOver, guesses])

    function setTile(rowIndex: number, tileIndex: number, value: string | null) {
        setGuesses(prev => {
            const tmp = prev.map(row => [...row]);
            tmp[rowIndex][tileIndex].value = value;

            return tmp;
        })
    }

    async function resetGame() {
        setCurrentRow(0);
        setCurrentTile(0);
        setGameOver(false);
        setGuesses(Array.from({ length: 6 }, () => Array(5).fill(null).map(() => ({value: null, status: ""}))));

        const word = await getWord();
        setAnswer(word[0]);
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-1">
                {guesses.map((row, i) => (
                    <Row key={i} tiles={row} />
                ))}
            </div>
            <div className="flex justify-center mt-2">
                <button className={`bg-slate-700 py-2 px-4 rounded-lg ${gameOver ? "" : "hidden"}`} onClick={resetGame}>Restart</button>
            </div>
        </div>
    );
}