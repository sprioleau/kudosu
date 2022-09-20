import useStore from "@/store";

enum AdvanceDirection {
  Forwards = 1,
  Backwards = -1,
}

export default function InstructionsModal() {
  const updateModalContent = useStore((s) => s.updateModalContent);

  const handleAdvance = (direction: AdvanceDirection) => {
    updateModalContent();
  };

  return (
    <div className="instructions-modal">
      <h3>Instructions</h3>
      <span
        className="instructions-modal__button"
        onClick={() => handleAdvance(AdvanceDirection.Backwards)}
      >
        Previous
      </span>
      <span
        className="instructions-modal__button"
        onClick={() => handleAdvance(AdvanceDirection.Forwards)}
      >
        Next
      </span>
    </div>
  );
}
