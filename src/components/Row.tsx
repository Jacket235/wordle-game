import Tile from "./Tile";
type TileData = { value: string | null; status: "correct" | "present" | "incorrect" | ""; };

type props = {
    tiles: TileData[];
}

export default function Row({ tiles }: props) {
    return (
        <div className="flex gap-1">
            {tiles.map((tile, i) => (
                <Tile key={i} value={tile.value} status={tile.status} />
            ))}
        </div>
    );
}