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
  const strokeOpacity = disabled || progressPercentage === 0 ? 0 : 1;

  return (
    <button
      disabled={disabled}
      onClick={handleDateSelect(dayOfMonth)}
      className={buttonClasses}
    >
      {isSolved ? (
        <svg
          className="daily-challenges-date-button__completed-icon"
          width="110"
          height="110"
          viewBox="0 0 110 110"
          fill="var(--c-accent)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M50.6794 12.4179C52.6081 9.1066 57.3919 9.10661 59.3206 12.4179L70.0552 30.8481C70.7617 32.0611 71.9456 32.9213 73.3175 33.2183L94.1628 37.7323C97.9081 38.5433 99.3863 43.093 96.8331 45.9505L82.6221 61.855C81.6868 62.9017 81.2346 64.2935 81.376 65.6901L83.5245 86.9101C83.9105 90.7226 80.0404 93.5344 76.5337 91.9892L57.0162 83.3885C55.7317 82.8224 54.2683 82.8224 52.9838 83.3885L33.4663 91.9892C29.9596 93.5345 26.0895 90.7226 26.4755 86.91L28.624 65.6901C28.7654 64.2935 28.3132 62.9017 27.3779 61.855L13.1669 45.9505C10.6137 43.093 12.0919 38.5433 15.8372 37.7323L36.6825 33.2183C38.0544 32.9213 39.2383 32.0611 39.9448 30.8481L50.6794 12.4179Z" />
        </svg>
      ) : (
        <>
          <svg
            className="daily-challenges-date-button__progress"
            viewBox="0 0 108 108"
            xmlns="http://www.w3.org/2000/svg"
            stroke="var(--c-accent-text)"
            fill="none"
            strokeWidth={8}
            strokeOpacity={strokeOpacity}
          >
            <circle
              cx="54"
              cy="54"
              r="50"
              strokeDasharray={`${arcLength} 2000`}
            />
          </svg>
          {dayOfMonth}
        </>
      )}
    </button>
  );
}
