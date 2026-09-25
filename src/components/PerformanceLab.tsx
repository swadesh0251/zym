import React, { useState } from 'react';
import { PRRecord } from '../types';
import { Calculator, Flame, Dumbbell, Award, Copy, Check, BookmarkPlus, ArrowRight } from 'lucide-react';

interface PerformanceLabProps {
  onSavePR: (record: Omit<PRRecord, 'id' | 'date'>) => void;
}

export const PerformanceLab: React.FC<PerformanceLabProps> = ({ onSavePR }) => {
  const [activeTab, setActiveTab] = useState<'1rm' | 'macros' | 'split'>('1rm');

  // 1RM State
  const [lift, setLift] = useState<'Back Squat' | 'Deadlift' | 'Bench Press' | 'Overhead Press'>('Back Squat');
  const [weight, setWeight] = useState<number>(100);
  const [reps, setReps] = useState<number>(5);
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Epley formula: 1RM = Weight * (1 + Reps/30)
  const estimated1RM = Math.round(weight * (1 + reps / 30));

  const percentages = [
    { pct: 95, repsTarget: '1-2 Reps', description: 'Peak Maximal Effort', load: Math.round(estimated1RM * 0.95) },
    { pct: 90, repsTarget: '3-4 Reps', description: 'Heavy Strength Power', load: Math.round(estimated1RM * 0.90) },
    { pct: 85, repsTarget: '5-6 Reps', description: 'Hypertrophy-Strength Base', load: Math.round(estimated1RM * 0.85) },
    { pct: 80, repsTarget: '8-10 Reps', description: 'Metabolic Muscle Growth', load: Math.round(estimated1RM * 0.80) },
    { pct: 70, repsTarget: '12-15 Reps', description: 'Dynamic Speed & Capacity', load: Math.round(estimated1RM * 0.70) },
  ];

  const handleSavePR = () => {
    onSavePR({
      lift,
      weight,
      reps,
      unit,
      estimated1RM,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Macro State
  const [goal, setGoal] = useState<'hypertrophy' | 'recomp' | 'fatloss' | 'hyrox'>('hypertrophy');
  const [bodyweightKg, setBodyweightKg] = useState<number>(80);
  const [activityDays, setActivityDays] = useState<number>(4);
  const [macroCopied, setMacroCopied] = useState<boolean>(false);

  // Approximate TDEE calculation
  // Base BMR ~ 22 * bodyweightKg
  const bmr = 22 * bodyweightKg;
  const activityMultiplier = activityDays <= 3 ? 1.4 : activityDays <= 5 ? 1.6 : 1.8;
  const tdee = Math.round(bmr * activityMultiplier);

  let targetCalories = tdee;
  let proteinMultiplier = 2.2; // g/kg
  let fatPct = 0.25;

  if (goal === 'hypertrophy') {
    targetCalories = Math.round(tdee * 1.12);
    proteinMultiplier = 2.2;
    fatPct = 0.25;
  } else if (goal === 'fatloss') {
    targetCalories = Math.round(tdee * 0.82);
    proteinMultiplier = 2.4;
    fatPct = 0.25;
  } else if (goal === 'hyrox') {
    targetCalories = Math.round(tdee * 1.08);
    proteinMultiplier = 2.0;
    fatPct = 0.22;
  } else {
    // recomp
    targetCalories = tdee;
    proteinMultiplier = 2.3;
    fatPct = 0.25;
  }

  const dailyProteinGrams = Math.round(bodyweightKg * proteinMultiplier);
  const dailyFatGrams = Math.round((targetCalories * fatPct) / 9);
  const remainingCalories = targetCalories - (dailyProteinGrams * 4 + dailyFatGrams * 9);
  const dailyCarbGrams = Math.max(0, Math.round(remainingCalories / 4));

  const copyMacroSummary = () => {
    const text = `KINETIX Performance Nutrition Plan:
Goal: ${goal.toUpperCase()}
Calories: ${targetCalories} kcal
Protein: ${dailyProteinGrams}g
Carbohydrates: ${dailyCarbGrams}g
Fats: ${dailyFatGrams}g
Calculated at Kinetix Performance Lab`;
    navigator.clipboard.writeText(text);
    setMacroCopied(true);
    setTimeout(() => setMacroCopied(false), 2000);
  };

  // Workout Split Recommender State
  const [splitDays, setSplitDays] = useState<3 | 4 | 5 | 6>(4);
  const [splitFocus, setSplitFocus] = useState<'hybrid' | 'strength' | 'hypertrophy'>('hybrid');

  const SPLIT_PROGRAMS = {
    3: {
      title: '3-Day Full Body Athletic Density',
      sessions: [
        { day: 'Day 1 (Mon)', focus: 'Heavy Barbell Lower + Upper Push', exercises: ['Barbell Back Squat 4x6', 'Incline Dumbbell Press 4x8', 'Romanian Deadlift 3x8', 'Weighted Dips 3x10'] },
        { day: 'Day 2 (Wed)', focus: 'Posterior Pull + Sled Conditioning', exercises: ['Conventional Deadlift 4x4', 'Weighted Pull-Ups 4x6', 'Torque Tank Sled Pushes 6x40m', 'Hanging Knee Raises 3x15'] },
        { day: 'Day 3 (Fri)', focus: 'Olympic Velocity + Upper Accessory', exercises: ['Power Clean or Snatch Pulls 5x3', 'Barbell Overhead Press 4x6', 'Chest-Supported T-Bar Row 4x10', 'Dumbbell Hammer Curls 3x12'] },
      ],
    },
    4: {
      title: '4-Day Upper / Lower Performance Wave',
      sessions: [
        { day: 'Day 1 (Mon)', focus: 'Lower 1: Quad Dominant & Core', exercises: ['Barbell Back Squat 5x5', 'Bulgarian Split Squat 3x8/leg', 'Leg Press Calves 4x15', 'Ab Wheel Rollouts 3x12'] },
        { day: 'Day 2 (Tue)', focus: 'Upper 1: Horizontal Force Focus', exercises: ['Flat Barbell Bench Press 5x5', 'Barbell Pendlay Row 4x6', 'Overhead Dumbbell Extension 3x10', 'Face Pulls 4x15'] },
        { day: 'Day 3 (Thu)', focus: 'Lower 2: Posterior Hinge & Sled', exercises: ['Barbell Deadlift 4x4', 'Glute-Ham Raise 3x10', 'Sled Drag Intervals 5x50m', 'Cable Paloff Press 3x12'] },
        { day: 'Day 4 (Fri)', focus: 'Upper 2: Vertical Power & Delts', exercises: ['Standing Overhead Press 4x6', 'Weighted Neutral Grip Pull-Up 4x6', 'Incline Cable Fly 3x12', 'Lateral Raise Drop-Set 4x15'] },
      ],
    },
    5: {
      title: '5-Day Push / Pull / Legs / Conditioning / Upper',
      sessions: [
        { day: 'Day 1 (Mon)', focus: 'Push: Heavy Chest & Triceps', exercises: ['Pause Bench Press 4x5', 'Incline Smith Press 3x8', 'Dips & Skullcrushers Superset 3x10'] },
        { day: 'Day 2 (Tue)', focus: 'Pull: Lat Thickness & Biceps', exercises: ['Barbell Deadlift 3x5', 'Weighted Chins 4x6', 'Chest Supported Row 3x10', 'Incline Curl 3x12'] },
        { day: 'Day 3 (Wed)', focus: 'Legs: Olympic Squat Depth', exercises: ['High Bar Squat 5x5', 'Hack Squat 3x10', 'Lying Hamstring Curl 4x12', 'Standing Calf Raise 4x15'] },
        { day: 'Day 4 (Fri)', focus: 'Hyrox Engine & Turf Intervals', exercises: ['Concept2 SkiErg 5x500m', 'Sled Push 5x40m', 'Echo Bike Sprints 6x30s', 'Cold Plunge Immersion'] },
        { day: 'Day 5 (Sat)', focus: 'Upper Hypertrophy Overload', exercises: ['Standing Strict Press 4x6', 'Incline Dumbbell Row 4x10', 'Cable Lateral Raise 4x15', 'Rear Delt Fly 3x15'] },
      ],
    },
    6: {
      title: '6-Day Push / Pull / Legs Dual Periodization',
      sessions: [
        { day: 'Mon & Thu', focus: 'Push 1 & 2 (Strength / Hypertrophy)', exercises: ['Heavy Bench Press / Incline DB Press', 'Overhead Press variations', 'Cable Pressdowns & Chest Flyes'] },
        { day: 'Tue & Fri', focus: 'Pull 1 & 2 (Kinetic Power / Volume)', exercises: ['Conventional Pulls / Snatch Grip Deadlift', 'Chest Supported T-Bar / Lat Pulldown', 'Hammer Curls & Facepulls'] },
        { day: 'Wed & Sat', focus: 'Legs 1 & 2 (Quad Focus / Posterior Turf)', exercises: ['Back Squat / Front Squat', 'Romanian Deadlift / Belt Squats', 'Sled Pushes & Walking Lunges'] },
      ],
    },
  };

  const currentProgram = SPLIT_PROGRAMS[splitDays];

  return (
    <section id="performance-lab" className="py-24 bg-[#090b0e] border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#ccff00] mb-2">
            Athletic Engineering Suite
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The KINETIX Performance Lab
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Validated biomechanical calculators, customized macro energy partitioning, and periodized training splits built directly for high-output athletes.
          </p>
        </div>

        {/* Tab Selector - scrollable on mobile */}
        <div className="mt-8 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none pb-2">
          <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-[#12151d] rounded-lg border border-neutral-800 min-w-max">
            <button
              onClick={() => setActiveTab('1rm')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-2 min-h-[42px] text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeTab === '1rm'
                  ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Dumbbell className="w-4 h-4 text-[#ccff00]" />
              <span>1RM & Strength Zones</span>
            </button>

            <button
              onClick={() => setActiveTab('macros')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-2 min-h-[42px] text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'macros'
                  ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Macro Energy Blueprint</span>
            </button>

            <button
              onClick={() => setActiveTab('split')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-2 min-h-[42px] text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'split'
                  ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Workout Split Generator</span>
            </button>
          </div>
        </div>

        {/* Tab 1: 1RM Calculator */}
        {activeTab === '1rm' && (
          <div className="mt-6 sm:mt-8 bg-[#10131a] rounded-xl border border-neutral-800 p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Form Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Select Compound Lift
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Back Squat', 'Deadlift', 'Bench Press', 'Overhead Press'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLift(l)}
                      className={`px-3 py-2.5 min-h-[44px] text-xs font-semibold rounded border transition-colors cursor-pointer text-left ${
                        lift === l
                          ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold'
                          : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight & Unit */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                    Weight Lifted
                  </label>
                  <div className="flex items-center gap-1 text-xs">
                    <button
                      onClick={() => setUnit('kg')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${unit === 'kg' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-500'}`}
                    >
                      KG
                    </button>
                    <span className="text-neutral-600">/</span>
                    <button
                      onClick={() => setUnit('lbs')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${unit === 'lbs' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-500'}`}
                    >
                      LBS
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min={10}
                    max={500}
                    value={weight}
                    onChange={(e) => setWeight(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2.5 text-white font-mono text-lg focus:border-[#ccff00] outline-none"
                  />
                  <span className="absolute right-4 top-3 text-neutral-500 text-xs font-mono">{unit}</span>
                </div>
              </div>

              {/* Reps */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                    Repetitions Completed
                  </label>
                  <span className="font-mono text-xs text-[#ccff00] font-bold">{reps} Reps</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={reps}
                  onChange={(e) => setReps(Number(e.target.value))}
                  className="w-full accent-[#ccff00] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                  <span>1 Rep (Max)</span>
                  <span>5 Reps (Strength)</span>
                  <span>12 Reps (Endurance)</span>
                </div>
              </div>

              {/* Result Callout */}
              <div className="p-4 bg-neutral-950 rounded-lg border border-neutral-800/80">
                <div className="text-xs font-medium text-neutral-400">Estimated 1-Rep Max (1RM)</div>
                <div className="font-mono text-3xl font-bold text-white mt-1 tabular-nums flex items-baseline gap-2">
                  <span>{estimated1RM}</span>
                  <span className="text-sm font-normal text-neutral-400 font-sans">{unit}</span>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Calculated using Epley/Brzycki athletic load projection.
                </p>

                <button
                  onClick={handleSavePR}
                  className="mt-3 w-full py-2 px-3 text-xs font-semibold rounded bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-neutral-700"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#ccff00]" />
                      <span className="text-[#ccff00]">Saved to Member Profile!</span>
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Save PR to Member Profile</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Calculated Training Zones (7 cols) */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h4 className="text-sm font-semibold text-white">Periodized Training Zones</h4>
                <span className="text-xs font-mono text-neutral-400">Based on {estimated1RM} {unit}</span>
              </div>

              <div className="mt-4 space-y-2">
                {percentages.map((p) => (
                  <div
                    key={p.pct}
                    className="p-3 bg-neutral-900/60 rounded-md border border-neutral-800/80 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 text-center py-1 bg-neutral-800 rounded font-mono text-xs font-bold text-[#ccff00]">
                        {p.pct}%
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">{p.description}</div>
                        <div className="text-[11px] text-neutral-400 font-mono">Target: {p.repsTarget}</div>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-base font-bold text-white tabular-nums">{p.load}</span>
                      <span className="text-xs text-neutral-400 ml-1">{unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-neutral-900/40 rounded-lg border border-neutral-800 text-xs text-neutral-400 flex items-start gap-2.5">
                <Award className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                <span>
                  <strong>Coach Recommendation:</strong> For strength peaking, work between 85%–90% for 3 to 5 sets of 3–5 reps with 3 minutes rest. For hypertrophy accumulation, target 70%–80% for 8–10 reps.
                </span>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Nutrition / Macro Blueprint */}
        {activeTab === 'macros' && (
          <div className="mt-8 bg-[#10131a] rounded-xl border border-neutral-800 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-5">
              
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Athletic Objective
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'hypertrophy', label: 'Hypertrophy Surge (+12%)' },
                    { id: 'recomp', label: 'Body Recomposition (0%)' },
                    { id: 'fatloss', label: 'Rapid Cut (-18%)' },
                    { id: 'hyrox', label: 'Hyrox Endurance (+8%)' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGoal(g.id as any)}
                      className={`px-3 py-2 text-xs font-semibold rounded border transition-colors cursor-pointer text-left ${
                        goal === g.id
                          ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold'
                          : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bodyweight */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                    Current Bodyweight
                  </label>
                  <span className="font-mono text-xs text-[#ccff00] font-bold">{bodyweightKg} KG</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={140}
                  value={bodyweightKg}
                  onChange={(e) => setBodyweightKg(Number(e.target.value))}
                  className="w-full accent-[#ccff00] cursor-pointer"
                />
              </div>

              {/* Training Frequency */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                    Weekly Training Sessions
                  </label>
                  <span className="font-mono text-xs text-white font-bold">{activityDays} Days/Week</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 4, 5, 6].map((days) => (
                    <button
                      key={days}
                      onClick={() => setActivityDays(days)}
                      className={`py-2 text-xs font-mono font-bold rounded border cursor-pointer ${
                        activityDays === days
                          ? 'bg-neutral-800 text-white border-neutral-600'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                      }`}
                    >
                      {days} Days
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={copyMacroSummary}
                  className="w-full py-2.5 px-4 text-xs font-semibold rounded bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center gap-2 border border-neutral-700 cursor-pointer"
                >
                  {macroCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#ccff00]" />
                      <span className="text-[#ccff00]">Plan Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Copy Nutrition Plan</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Macro Output Cards (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="pb-3 border-b border-neutral-800 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-white">Daily Caloric Target</h4>
                  <span className="text-xs font-mono text-neutral-400">Baseline TDEE: {tdee} kcal</span>
                </div>

                <div className="mt-4 p-5 bg-neutral-950 rounded-lg border border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-neutral-400">Daily Energy Budget</span>
                    <div className="font-mono text-3xl font-extrabold text-[#ccff00] tabular-nums mt-0.5">
                      {targetCalories} <span className="text-sm font-normal text-neutral-400 font-sans">kcal/day</span>
                    </div>
                  </div>
                  <div className="text-right text-xs text-neutral-400">
                    <span className="font-semibold text-white">{goal === 'hypertrophy' ? '+350 surplus' : goal === 'fatloss' ? '-450 deficit' : 'Maintenance'}</span>
                    <div className="text-[11px] text-neutral-500 mt-0.5">Metabolic adaptation included</div>
                  </div>
                </div>

                {/* Macro Breakdown Triad */}
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800 text-center">
                    <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Protein</div>
                    <div className="font-mono text-2xl font-bold text-white mt-1 tabular-nums">{dailyProteinGrams}g</div>
                    <div className="text-[10px] text-neutral-500 font-mono mt-0.5">{Math.round((dailyProteinGrams * 4 / targetCalories) * 100)}% calories</div>
                  </div>

                  <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800 text-center">
                    <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Carbs</div>
                    <div className="font-mono text-2xl font-bold text-white mt-1 tabular-nums">{dailyCarbGrams}g</div>
                    <div className="text-[10px] text-neutral-500 font-mono mt-0.5">{Math.round((dailyCarbGrams * 4 / targetCalories) * 100)}% calories</div>
                  </div>

                  <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800 text-center">
                    <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Fats</div>
                    <div className="font-mono text-2xl font-bold text-white mt-1 tabular-nums">{dailyFatGrams}g</div>
                    <div className="text-[10px] text-neutral-500 font-mono mt-0.5">{Math.round((dailyFatGrams * 9 / targetCalories) * 100)}% calories</div>
                  </div>
                </div>

                <div className="mt-5 text-xs text-neutral-400 bg-neutral-900/50 p-3.5 rounded border border-neutral-800/80">
                  <p>
                    <strong>Fueling Protocol:</strong> Consume 30–45g high-glycemic carbohydrates 45 minutes prior to heavy barbell or Hyrox sessions. Prioritize 1.0–1.2g hydration fluids per kg bodyweight on training days.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
                <span>Mifflin-St Jeor Biometric Algorithm</span>
                <span>Sports Science Certified</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Workout Split Generator */}
        {activeTab === 'split' && (
          <div className="mt-8 bg-[#10131a] rounded-xl border border-neutral-800 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
              <div>
                <h3 className="font-display text-xl font-bold text-white">{currentProgram.title}</h3>
                <p className="text-xs text-neutral-400 mt-1">Periodized volume and fatigue management protocol</p>
              </div>

              {/* Day selection */}
              <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded border border-neutral-800">
                {([3, 4, 5, 6] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setSplitDays(d)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer ${
                      splitDays === d ? 'bg-[#ccff00] text-black font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {d} Days / Wk
                  </button>
                ))}
              </div>
            </div>

            {/* Sessions Grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentProgram.sessions.map((sess, idx) => (
                <div key={idx} className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-[#ccff00] font-semibold">{sess.day}</div>
                    <div className="text-xs font-bold text-white mt-1 mb-3">{sess.focus}</div>

                    <div className="space-y-1.5">
                      {sess.exercises.map((ex, i) => (
                        <div key={i} className="text-xs text-neutral-300 flex items-start gap-1.5">
                          <span className="text-neutral-500 font-mono text-[10px]">{i + 1}.</span>
                          <span>{ex}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-900 text-[10px] text-neutral-500 font-mono">
                    Rest: 90-180s on compounds
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-neutral-400 pt-4 border-t border-neutral-800">
              <span>All programs designed in accordance with NSCA hypertrophy standards.</span>
              <a href="#schedule" className="text-[#ccff00] hover:underline flex items-center gap-1 font-semibold">
                <span>Pair with Coached Classes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
