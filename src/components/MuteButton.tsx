type MuteButtonProps = {
  muted: boolean;
  onToggle: () => void;
};

export function MuteButton({ muted, onToggle }: MuteButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="rounded-md px-2 py-1 text-sm text-[var(--color-navy)]/70 hover:bg-white/40"
      aria-label={muted ? "Unmute sound" : "Mute sound"}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}
