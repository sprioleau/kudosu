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
          height="1em"
          viewBox="0 0 110 110"
          fill="var(--c-accent)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M42.4077 2.45076C43.5649 0.46396 46.4351 0.463964 47.5923 2.45077L60.4987 24.6097C60.9226 25.3375 61.633 25.8536 62.4561 26.0318L87.5188 31.4591C89.766 31.9457 90.6529 34.6754 89.121 36.39L72.0349 55.5122C71.4737 56.1402 71.2024 56.9753 71.2872 57.8132L73.8704 83.3264C74.102 85.6139 71.7799 87.301 69.6759 86.3738L46.2097 76.0331C45.439 75.6935 44.561 75.6935 43.7903 76.0331L20.3241 86.3738C18.2201 87.301 15.898 85.6139 16.1296 83.3264L18.7128 57.8132C18.7976 56.9753 18.5263 56.1402 17.9651 55.5122L0.879025 36.39C-0.652939 34.6754 0.234022 31.9457 2.48118 31.4591L27.5439 26.0318C28.367 25.8536 29.0774 25.3375 29.5013 24.6097L42.4077 2.45076Z" />
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
