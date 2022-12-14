import useGameStore from "@/store";

export default function PauseModal() {
  const resumeGame = useGameStore((s) => s.resumeGame);

  const handleResume = () => {
    resumeGame();
  };

  return (
    <div className="pause-modal">
      <h3>Game is paused</h3>
      <button
        className="pause-modal__resume-button"
        onClick={handleResume}
      >
        Resume
      </button>
    </div>
  );
}
