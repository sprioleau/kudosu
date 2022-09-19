import JSConfetti from "js-confetti";

export default function showConfetti() {
  const jsConfetti = new JSConfetti();
  jsConfetti.addConfetti({
    emojis: ["🎉"],
    emojiSize: 100,
    confettiNumber: 30,
  });
}
