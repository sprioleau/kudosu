import useStore from "@/store";

export default function PauseModal() {
  const setTimerIsRunning = useStore((s) => s.setTimerIsRunning);
  const updateModalContent = useStore((s) => s.updateModalContent);

  const handleResume = () => {
    setTimerIsRunning(true);
    updateModalContent(undefined);
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
