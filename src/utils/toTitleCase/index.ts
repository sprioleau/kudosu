export default function toTitleCase(difficulty: string) { 
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
}