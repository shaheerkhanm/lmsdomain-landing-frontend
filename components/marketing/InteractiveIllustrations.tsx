"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";

/**
 * Interactive Illustration: Watch-Percentage Completion
 * Allows users to adjust the completion threshold slider (60-100%)
 * and see the completion status update dynamically.
 */
export function InteractiveWatchPercentage() {
  const [threshold, setThreshold] = useState(80);
  const watchedPercent = 85;
  const isComplete = watchedPercent >= threshold;

  return (
    <div
      aria-label="Interactive illustration for Watch-Percentage Completion"
      className="bg-[#F8FAFC] rounded-[20px] p-4 sm:p-5 border border-[#ECEDEF] space-y-3 font-urbanist"
    >
      <div className="flex items-center justify-between text-xs pb-1 border-b border-[#ECEDEF]">
        <span className="font-semibold text-[#161616]">Interactive Simulator</span>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-colors ${
            isComplete
              ? "bg-[#E8F8F5] text-[#0D9488]"
              : "bg-[#FEF3C7] text-[#D97706]"
          }`}
        >
          {isComplete ? "✓ Marked Complete" : "In Progress"}
        </span>
      </div>

      {/* Video Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-[#6B6F76]">
          <span>Learner Watched: <strong>{watchedPercent}%</strong></span>
          <span>Required: <strong>{threshold}%</strong></span>
        </div>

        <div className="w-full bg-[#E5E7EB] h-2.5 rounded-full overflow-hidden relative">
          <div
            className={`h-full transition-all duration-300 ${
              isComplete ? "bg-[#0D9488]" : "bg-[#F59E0B]"
            }`}
            style={{ width: `${watchedPercent}%` }}
          />
          {/* Threshold marker pin */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-[#161616] -translate-x-1/2"
            style={{ left: `${threshold}%` }}
            title={`Required threshold: ${threshold}%`}
          />
        </div>
      </div>

      {/* Slider Control */}
      <div className="pt-2 border-t border-[#F3F4F6] space-y-1">
        <div className="flex items-center justify-between text-[11px] text-[#6B6F76]">
          <label htmlFor="watch-threshold-slider" className="font-medium text-[#161616]">
            Configurable Threshold:
          </label>
          <span className="font-mono font-bold text-[#7B5CF5]">{threshold}%</span>
        </div>
        <input
          id="watch-threshold-slider"
          type="range"
          min="60"
          max="100"
          step="5"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          aria-label="Configurable watch percentage threshold slider"
          className="w-full h-1.5 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#7B5CF5]"
        />
        <div className="flex justify-between text-[9px] text-[#8F94A0] font-mono">
          <span>60%</span>
          <span>80% (Default)</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Interactive Illustration: In-Video Checkpoint Quizzes
 * Mini player simulation where playback pauses at checkpoint (45%)
 * prompting the learner to answer a question before resuming.
 */
export function InteractiveVideoCheckpoint() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(45); // start paused at checkpoint for clean initial state
  const [showQuestion, setShowQuestion] = useState(true);
  const [isAnswered, setIsAnswered] = useState(false);
  const checkpointPos = 45;

  const startSimulation = () => {
    setProgress(0);
    setShowQuestion(false);
    setIsAnswered(false);
    setIsPlaying(true);
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setProgress(checkpointPos);
    setShowQuestion(true);
    setIsAnswered(false);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < checkpointPos) {
          return prev + 5;
        } else if (prev === checkpointPos && !isAnswered) {
          setIsPlaying(false);
          setShowQuestion(true);
          return checkpointPos;
        } else if (prev < 100) {
          return prev + 5;
        } else {
          setIsPlaying(false);
          return 100;
        }
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isPlaying, isAnswered]);

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setIsAnswered(true);
      setShowQuestion(false);
      setIsPlaying(true);
    }
  };

  return (
    <div
      aria-label="Interactive illustration for In-Video Checkpoint Quizzes"
      className="bg-[#F8FAFC] rounded-[20px] p-4 sm:p-5 border border-[#ECEDEF] space-y-3 font-urbanist"
    >
      <div className="flex items-center justify-between text-xs pb-1 border-b border-[#ECEDEF]">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#161616]">
          <span>Video Checkpoint (04:32)</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
              showQuestion
                ? "bg-[#EEE9FF] text-[#7B5CF5]"
                : progress === 100
                ? "bg-[#E8F8F5] text-[#0D9488]"
                : "bg-[#F3F4F6] text-[#6B6F76]"
            }`}
          >
            {showQuestion ? "Paused at Question" : progress === 100 ? "Finished" : "Playing"}
          </span>
          <button
            type="button"
            onClick={resetSimulation}
            aria-label="Reset simulation"
            className="text-[#8F94A0] hover:text-[#161616] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Track */}
      <div className="space-y-1">
        <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#7B5CF5] transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
          {/* Question pin marker */}
          <div
            className="absolute top-0 bottom-0 w-2 h-2 rounded-full bg-[#161616] -mt-[0px]"
            style={{ left: `${checkpointPos}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-[#8F94A0]">
          <span>0:00</span>
          <span className="font-semibold text-[#7B5CF5]">Checkpoint (45%)</span>
          <span>10:00</span>
        </div>
      </div>

      {/* Checkpoint Question Popover */}
      {showQuestion && (
        <div className="bg-white p-3 rounded-xl border border-[#C4B5FD] shadow-xs space-y-2 text-xs animate-in fade-in zoom-in-95 duration-200">
          <p className="font-semibold text-[#161616] text-[11px]">
            Checkpoint: Which structure guarantees FIFO order?
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => handleAnswer(false)}
              className="p-1.5 rounded-lg border border-[#ECEDEF] hover:bg-[#FEE2E2] hover:border-[#FCA5A5] text-[11px] text-[#6B6F76] transition-colors text-center cursor-pointer"
            >
              Stack
            </button>
            <button
              type="button"
              onClick={() => handleAnswer(true)}
              className="p-1.5 rounded-lg bg-[#E8F8F5] border border-[#A6E3D3] text-[#0D9488] font-semibold text-[11px] hover:bg-[#D1F2EB] transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
            >
              <span>Queue</span>
              <CheckCircle2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Action Prompt */}
      {!showQuestion && progress < 100 && (
        <div className="text-[11px] text-[#0D9488] flex items-center gap-1.5 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Checkpoint passed! Playback resumed...</span>
        </div>
      )}

      {progress === 100 && (
        <div className="text-[11px] text-[#0D9488] flex items-center justify-between font-medium">
          <span>✓ Lesson completed</span>
          <button
            type="button"
            onClick={startSimulation}
            className="text-[10px] underline text-[#7B5CF5] cursor-pointer"
          >
            Replay video
          </button>
        </div>
      )}
    </div>
  );
}

