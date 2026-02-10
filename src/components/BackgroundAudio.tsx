"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX, Play } from "lucide-react";

/**
 * Background Audio Player
 * Auto-plays audio with looping when website loads
 * Handles browser autoplay restrictions gracefully
 */
export function BackgroundAudio() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showControl, setShowControl] = useState(false);

  useEffect(() => {
    if (isAdminRoute) {
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    // Set volume (0.0 - 1.0)
    audio.volume = 0.7;

    // Event listeners
    const handlePlay = () => {
      console.log("[Audio] Playing");
      setIsPlaying(true);
      setShowControl(false); // Sembunyikan tombol putar setelah berhasil play
    };

    const handlePause = () => {
      console.log("[Audio] Paused");
      setIsPlaying(false);
    };

    const handleError = (e: Event) => {
      console.error("[Audio] Error:", e);
      setHasError(true);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    // Attempt to autoplay
    const attemptPlay = async () => {
      console.log("[Audio] Attempting autoplay...");
      try {
        await audio.play();
        console.log("[Audio] Autoplay success!");
        setIsPlaying(true);
      } catch (error) {
        console.log("[Audio] Autoplay blocked by browser:", error);
        setIsPlaying(false);
        // Show control so user can manually play
        setShowControl(true);
      }
    };

    // Delay sedikit untuk memastikan DOM ready
    const timer = setTimeout(attemptPlay, 500);

    // Fallback: try to play on first user interaction
    const handleFirstInteraction = () => {
      console.log("[Audio] User interaction detected");
      if (audio.paused && !hasError) {
        audio.play().then(() => {
          console.log("[Audio] Played after user interaction");
          setIsPlaying(true);
          setShowControl(false);
        }).catch((err) => {
          console.log("[Audio] Still blocked:", err);
        });
      }
      // Remove listeners after first interaction
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);
    document.addEventListener("scroll", handleFirstInteraction);

    return () => {
      clearTimeout(timer);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
    };
  }, [hasError, isAdminRoute]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (isAdminRoute) {
    return null;
  }

  return (
    <>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/background-audio.mp3"
        loop
        preload="auto"
      />

      {/* Floating Audio Control - muncul hanya jika autoplay diblokir dan belum play */}
      {showControl && !isPlaying && (
        <button
          onClick={togglePlay}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg transition-all animate-bounce"
        >
          <Play className="w-5 h-5" />
          <span className="text-sm font-medium">Putar Audio</span>
        </button>
      )}

      {/* Audio Control - selalu terlihat saat audio play */}
      {isPlaying && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur rounded-full shadow-lg border border-emerald-100 transition-opacity">
          <button
            onClick={toggleMute}
            className="p-2 text-emerald-700 hover:text-emerald-800 transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <span className="text-xs text-emerald-700 font-medium">
            {isMuted ? "Muted" : "Playing..."}
          </span>
        </div>
      )}
    </>
  );
}
