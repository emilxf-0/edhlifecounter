import Counter from "./counter";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Home, Minimize, MinusIcon, PlusIcon, RefreshCwIcon, Expand } from "lucide-react";
import { useState } from "react";
import { playerData } from "@/data/players/playerData";

interface PlayAreaProps {
  numPlayers: number;
  onMenu: () => void;
}

const PlayArea: React.FC<PlayAreaProps> = ({ numPlayers, onMenu }) => {
    const initialCounts = Array(numPlayers).fill(40);
    const [counts, setCounts] = useState<number[]>(initialCounts);
    const [players, setPlayers] = useState(numPlayers);

    const handleIncrement = (i: number) => {
        setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[i] += 1;
            return newCounts;
        });
    };

    const handleDecrement = (i: number) => {
        setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[i] -= 1;
            return newCounts;
        });
    };

    const handleReset = () => {
        setCounts(initialCounts);
    };

    const handleAddPlayer = () => {
        setPlayers((prev) => prev + 1);
        setCounts((prev) => [...prev, 40]);
    };
    const handleRemovePlayer = () => {            
        setPlayers((prev) => prev - 1);
        setCounts((prevCounts) => prevCounts.slice(0, -1));
    };

    const element = document.documentElement;

  return (
    <>
      <div className="grid grid-cols-2 grid-rows-${numPlayers} h-screen w-full bg-background text-foreground">
        <div className="fixed top-2/3 left-0 w-full h-48 z-30 pointer-events-none">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="circle-button pointer-events-auto">
                Menu
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="flex flex-col gap-4">
              <AlertDialogFooter className="flex items-center gap-6 justify-center">
                <AlertDialogCancel className="w-16 h-16">
                  <Minimize />
                </AlertDialogCancel>
                <Button variant="rounded" className="w-16 h-16" onClick={handleRemovePlayer}>
                  <MinusIcon />
                </Button>
                <Button variant="rounded" className="w-16 h-16" onClick={handleAddPlayer}>
                  <PlusIcon />
                </Button>
                <Button
                  variant="rounded"
                  className="w-16 h-16"
                  onClick={handleReset}
                >
                  <RefreshCwIcon />
                </Button>
                <Button variant="rounded" className="w-16 h-16" onClick={onMenu}>
                  <Home />
                </Button>
                <Button variant="rounded" className="w-16 h-16" onClick={() => element.requestFullscreen()}>
                  <Expand />
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {counts.map((count, i) => (
          <Counter
            key={i}
            rot={
              players <= 3
                ? (i + 1) % 3 === 0
                  ? "none"
                  : (i + 1) % 3 === 1
                  ? "90"
                  : "-90"
                : players >= 4
                ? (i + 1) % 5 === 0
                  ? "none"
                  : (i + 1) % 5 === 1 || (i + 1) % 5 === 3
                  ? "90"
                  : "-90"
                : "none"
            }
            count={count}
            playerName={playerData[i].name}
            commander={playerData[i].commander}
            onIncrement={() => handleIncrement(i)}
            onDecrement={() => handleDecrement(i)}
          />
        ))}
      </div>
    </>
  );
};

export default PlayArea;
