interface IProps {
  selected: boolean;
  disabled: boolean;
  dayOfMonth: number;
  progressPercentage: number;
  handleDateSelect: (dayOfMonth: number) => () => void;
}

const PROGRESS_STROKE_LENGTH = 320;

export default function index({
  selected,
  disabled,
  dayOfMonth,
  progressPercentage,
  handleDateSelect,
}: IProps) {
  const isSolved = progressPercentage === 100;

  const buttonClasses = [
    "daily-challenges-date-button rounded-full",
    `${selected ? "selected" : ""}`,
    `${isSolved ? "solved" : ""}`,
  ].join(" ");

  const arcLength = (PROGRESS_STROKE_LENGTH * progressPercentage) / 100;
  const strokeOpacityArc = disabled || progressPercentage === 0 ? 0 : 1;
  const strokeOpacityRing = disabled || progressPercentage === 0 ? 0 : 0.4;

  return (
    <button
      disabled={disabled}
      onClick={handleDateSelect(dayOfMonth)}
      className={buttonClasses}
    >
      {isSolved ? (
        <svg
          className="daily-challenges-date-button__completed-icon"
          width="1em"
          viewBox="0 0 100 95.11"
          fill="var(--c-accent)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M44.8548 2.45076C46.012 0.463961 48.8823 0.463964 50.0395 2.45077L63.7777 26.0379C64.2017 26.7657 64.912 27.2817 65.7352 27.46L92.4132 33.237C94.6603 33.7236 95.5473 36.4534 94.0153 38.1679L75.828 58.5226C75.2668 59.1507 74.9955 59.9857 75.0803 60.8237L77.83 87.9812C78.0616 90.2687 75.7395 91.9558 73.6355 91.0286L48.6569 80.0214C47.8862 79.6818 47.0082 79.6818 46.2374 80.0214L21.2588 91.0286C19.1548 91.9558 16.8327 90.2687 17.0643 87.9812L19.814 60.8237C19.8988 59.9857 19.6275 59.1507 19.0663 58.5226L0.879025 38.1679C-0.652938 36.4534 0.234022 33.7236 2.48118 33.237L29.1592 27.46C29.9824 27.2817 30.6927 26.7657 31.1166 26.0379L44.8548 2.45076Z" />
        </svg>
      ) : (
        <>
          <svg
            className="daily-challenges-date-button__progress"
            width="1em"
            height="1em"
            viewBox="0 0 108 108"
            xmlns="http://www.w3.org/2000/svg"
            stroke="var(--c-accent-text)"
            fill="none"
          >
            <circle
              cx="54"
              cy="54"
              r="50"
              strokeWidth={8}
              strokeOpacity={strokeOpacityArc}
              strokeDasharray={`${arcLength} 2000`}
            />
            <circle
              cx="54"
              cy="54"
              r="50"
              strokeWidth={8}
              strokeOpacity={strokeOpacityRing}
            />
          </svg>
          {dayOfMonth}
        </>
      )}
    </button>
  );
}
