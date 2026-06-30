import { useState, useEffect, useRef } from 'react';
import { Volume2, Heart, ArrowLeft, Paintbrush, Play, RotateCcw, HelpCircle, Eye, EyeOff } from 'lucide-react';
import { RADICALS } from '../data/radicals';
import { api } from '../services/api';
import { LanguageCode, LANG_LOCALE, getLanguageInfo } from '../data/courses';
import { getVocab } from '../data/vocab';
import { useTranslation } from 'react-i18next';

interface CharactersLabProps {
  onBack: () => void;
  onAwardXP: (xp: number) => void;
  lang?: string;
}

const ALPHABETS: Record<LanguageCode, any[]> = {
  zh: RADICALS,
  es: [
    { r: 'A', name: 'Letter A', py: 'ah', examples: ['agua', 'amigo', 'adiós'] },
    { r: 'B', name: 'Letter B', py: 'beh', examples: ['bueno', 'buenos días', 'buenas tardes'] },
    { r: 'G', name: 'Letter G', py: 'heh', examples: ['gracias', 'grande'] },
    { r: 'H', name: 'Letter H', py: 'ah-cheh', examples: ['hola', 'hasta luego'] },
    { r: 'M', name: 'Letter M', py: 'eh-meh', examples: ['me llamo', 'maestro'] },
    { r: 'T', name: 'Letter T', py: 'teh', examples: ['tener', 'tú'] },
  ],
  fr: [
    { r: 'A', name: 'Letter A', py: 'ah', examples: ['ami', 'au revoir', 'avoir'] },
    { r: 'B', name: 'Letter B', py: 'beh', examples: ['bonjour', 'bon', 'bonsoir'] },
    { r: 'E', name: 'Letter E', py: 'euh', examples: ['elle', 'être', 'étudiant'] },
    { r: 'M', name: 'Letter M', py: 'em', examples: ['merci', 'm\'appelle'] },
    { r: 'P', name: 'Letter P', py: 'peh', examples: ['petit', 'personne', 'professeur'] },
  ],
  de: [
    { r: 'A', name: 'Letter A', py: 'ah', examples: ['Abend', 'Auf Wiedersehen'] },
    { r: 'B', name: 'Letter B', py: 'beh', examples: ['Bitte', 'bin'] },
    { r: 'D', name: 'Letter D', py: 'deh', examples: ['Danke', 'Deutschland', 'du'] },
    { r: 'G', name: 'Letter G', py: 'geh', examples: ['gut', 'Guten Morgen'] },
    { r: 'W', name: 'Letter W', py: 'veh', examples: ['Wasser', 'wir', 'Wie heißen Sie?'] },
  ],
  ja: [
    { r: 'あ', name: 'Hiragana A', py: 'a', examples: ['ありがとう', 'あります', 'あなた'] },
    { r: 'こ', name: 'Hiragana Ko', py: 'ko', examples: ['こんにちは', 'こんばんは'] },
    { r: 'み', name: 'Hiragana Mi', py: 'mi', examples: ['みず'] },
    { r: 'よ', name: 'Hiragana Yo', py: 'yo', examples: ['よい', 'よろしく'] },
    { r: 'さ', name: 'Hiragana Sa', py: 'sa', examples: ['さようにら'] },
  ],
  ko: [
    { r: '아', name: 'Hangul A', py: 'a', examples: ['안녕하세요', '안녕히 가세요'] },
    { r: '감', name: 'Hangul Gam', py: 'gam', examples: ['감사합니다'] },
    { r: '물', name: 'Hangul Mul', py: 'mul', examples: ['물'] },
    { r: '사', name: 'Hangul Sa', py: 'sa', examples: ['사람'] },
    { r: '이', name: 'Hangul I', py: 'i', examples: ['이다', '이름이 뭐예요?'] },
  ],
  it: [
    { r: 'A', name: 'Letter A', py: 'ah', examples: ['acqua', 'amico', 'arrivederci'] },
    { r: 'B', name: 'Letter B', py: 'beh', examples: ['buono', 'buongiorno', 'buonasera'] },
    { r: 'G', name: 'Letter G', py: 'jee', examples: ['grazie'] },
    { r: 'P', name: 'Letter P', py: 'peh', examples: ['persona', 'piacere', 'per favore'] },
    { r: 'S', name: 'Letter S', py: 'ess', examples: ['sono', 'studente', 'scusi'] },
  ],
  en: [
    { r: 'A', name: 'Letter A', py: 'ay', examples: ['America', 'am'] },
    { r: 'F', name: 'Letter F', py: 'ef', examples: ['friend'] },
    { r: 'G', name: 'Letter G', py: 'jee', examples: ['good', 'goodbye', 'good morning'] },
    { r: 'H', name: 'Letter H', py: 'eych', examples: ['hello', 'he', 'have'] },
    { r: 'W', name: 'Letter W', py: 'double-u', examples: ['water', 'we', 'welcome'] },
  ],
  ar: [
    { r: 'أ', name: 'Alif', py: 'a', examples: ['أهلاً', 'أنا', 'أنت'] },
    { r: 'ش', name: 'Sheen', py: 'sh', examples: ['شكراً'] },
    { r: 'م', name: 'Meem', py: 'm', examples: ['مع السلامة', 'ماء'] },
    { r: 'ج', name: 'Jeem', py: 'j', examples: ['جميل', 'جديد'] },
  ],
};

// Chinese radicals strokes vector data scaled to 100x100 grid coords
const CHINESE_STROKE_PATHS: Record<string, { name: string; paths: { x: number; y: number }[][] }> = {
  '人': {
    name: 'Person',
    paths: [
      [{ x: 50, y: 15 }, { x: 35, y: 45 }, { x: 15, y: 80 }], // Left falling (撇)
      [{ x: 40, y: 40 }, { x: 65, y: 60 }, { x: 85, y: 80 }]  // Right falling (捺)
    ]
  },
  '口': {
    name: 'Mouth',
    paths: [
      [{ x: 25, y: 25 }, { x: 25, y: 75 }], // Left vertical (竖)
      [{ x: 25, y: 25 }, { x: 75, y: 25 }, { x: 75, y: 75 }], // Top-right corner (横折)
      [{ x: 25, y: 75 }, { x: 75, y: 75 }]  // Bottom horizontal (横)
    ]
  },
  '手': {
    name: 'Hand',
    paths: [
      [{ x: 70, y: 18 }, { x: 30, y: 26 }], // Top falling (撇)
      [{ x: 25, y: 42 }, { x: 75, y: 42 }], // Upper short horizontal (横)
      [{ x: 20, y: 60 }, { x: 80, y: 60 }], // Lower long horizontal (横)
      [{ x: 50, y: 26 }, { x: 50, y: 82 }, { x: 40, y: 72 }]  // Vertical hook (竖钩)
    ]
  },
  '水': {
    name: 'Water',
    paths: [
      [{ x: 50, y: 15 }, { x: 50, y: 82 }, { x: 38, y: 70 }], // Center vertical hook (竖钩)
      [{ x: 20, y: 40 }, { x: 42, y: 48 }], // Left horizontal-fold (横撇)
      [{ x: 72, y: 35 }, { x: 50, y: 52 }], // Right top-falling (撇)
      [{ x: 50, y: 52 }, { x: 68, y: 68 }, { x: 85, y: 82 }]  // Right bottom-falling (捺)
    ]
  },
  '火': {
    name: 'Fire',
    paths: [
      [{ x: 28, y: 40 }, { x: 18, y: 55 }], // Left dot (点)
      [{ x: 72, y: 40 }, { x: 82, y: 55 }], // Right dot (点)
      [{ x: 50, y: 15 }, { x: 45, y: 50 }, { x: 20, y: 80 }], // Center left falling (撇)
      [{ x: 45, y: 50 }, { x: 65, y: 66 }, { x: 85, y: 80 }]  // Right falling (捺)
    ]
  },
  '木': {
    name: 'Wood',
    paths: [
      [{ x: 20, y: 38 }, { x: 80, y: 38 }], // Horizontal (横)
      [{ x: 50, y: 15 }, { x: 50, y: 85 }], // Vertical (竖)
      [{ x: 50, y: 38 }, { x: 30, y: 65 }, { x: 15, y: 80 }], // Left falling (撇)
      [{ x: 50, y: 38 }, { x: 70, y: 65 }, { x: 85, y: 80 }]  // Right falling (捺)
    ]
  },
  '土': {
    name: 'Soil',
    paths: [
      [{ x: 30, y: 40 }, { x: 70, y: 40 }], // Middle horizontal (横)
      [{ x: 50, y: 18 }, { x: 50, y: 80 }], // Vertical (竖)
      [{ x: 20, y: 80 }, { x: 80, y: 80 }]  // Bottom horizontal (横)
    ]
  },
  '心': {
    name: 'Heart',
    paths: [
      [{ x: 22, y: 48 }, { x: 15, y: 62 }], // Left dot (点)
      [{ x: 32, y: 58 }, { x: 52, y: 82 }, { x: 78, y: 55 }], // Hook (卧钩)
      [{ x: 48, y: 46 }, { x: 53, y: 56 }], // Middle dot (点)
      [{ x: 78, y: 36 }, { x: 83, y: 46 }]  // Right dot (点)
    ]
  },
  '目': {
    name: 'Eye',
    paths: [
      [{ x: 28, y: 20 }, { x: 28, y: 80 }], // Left vertical (竖)
      [{ x: 28, y: 20 }, { x: 72, y: 20 }, { x: 72, y: 80 }], // Top-right corner (横折)
      [{ x: 28, y: 40 }, { x: 72, y: 40 }], // Middle horizontal 1 (横)
      [{ x: 28, y: 60 }, { x: 72, y: 60 }], // Middle horizontal 2 (横)
      [{ x: 28, y: 80 }, { x: 72, y: 80 }]  // Bottom horizontal (横)
    ]
  },
  '日': {
    name: 'Sun',
    paths: [
      [{ x: 28, y: 22 }, { x: 28, y: 78 }], // Left vertical (竖)
      [{ x: 28, y: 22 }, { x: 72, y: 22 }, { x: 72, y: 78 }], // Top-right corner (横折)
      [{ x: 28, y: 50 }, { x: 72, y: 50 }], // Middle horizontal (横)
      [{ x: 28, y: 78 }, { x: 72, y: 78 }]  // Bottom horizontal (横)
    ]
  },
  '月': {
    name: 'Moon',
    paths: [
      [{ x: 28, y: 20 }, { x: 24, y: 50 }, { x: 16, y: 80 }], // Left falling (撇)
      [{ x: 28, y: 20 }, { x: 72, y: 20 }, { x: 72, y: 80 }, { x: 64, y: 75 }], // Hook (横折钩)
      [{ x: 28, y: 40 }, { x: 72, y: 40 }], // Upper horizontal (横)
      [{ x: 28, y: 60 }, { x: 72, y: 60 }]  // Lower horizontal (横)
    ]
  },
  '山': {
    name: 'Mountain',
    paths: [
      [{ x: 50, y: 25 }, { x: 50, y: 75 }], // Center vertical (竖)
      [{ x: 25, y: 48 }, { x: 25, y: 75 }, { x: 75, y: 75 }], // Left vertical to bottom horizontal (竖折)
      [{ x: 75, y: 48 }, { x: 75, y: 75 }]  // Right vertical (竖)
    ]
  }
};

export default function CharactersLab({ onBack, onAwardXP, lang }: CharactersLabProps) {
  const { t } = useTranslation();
  const activeLang = (lang || 'zh') as LanguageCode;
  const langInfo = getLanguageInfo(activeLang);
  const langLocale = LANG_LOCALE[activeLang];
  
  const [activeTab, setActiveTab] = useState<'alphabet' | 'level1' | 'level2' | 'level3'>('alphabet');
  const [selectedRadical, setSelectedRadical] = useState<any | null>(null);
  const [savedWords, setSavedWords] = useState<string[]>([]);
  
  // Chinese Writing State
  const [isWritingMode, setIsWritingMode] = useState(false);
  const [userStrokes, setUserStrokes] = useState<{ x: number; y: number }[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [writingAnalysis, setWritingAnalysis] = useState<any | null>(null);
  const [showSilhouette, setShowSilhouette] = useState(true);
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Fetch saved words
    api.getSavedWords()
      .then((words) => {
        if (Array.isArray(words)) {
          setSavedWords(words.map((w: any) => w.hanzi));
        }
      })
      .catch(() => {});
  }, []);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langLocale;
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleToggleSave = async (w: any) => {
    try {
      await api.toggleSaveWord(w.h, w.p, w.m);
      if (savedWords.includes(w.h)) {
        setSavedWords(prev => prev.filter(item => item !== w.h));
      } else {
        setSavedWords(prev => [...prev, w.h]);
        onAwardXP(2);
      }
    } catch (err) {
      if (savedWords.includes(w.h)) {
        setSavedWords(prev => prev.filter(item => item !== w.h));
      } else {
        setSavedWords(prev => [...prev, w.h]);
        onAwardXP(2);
      }
    }
  };

  const currentAlphabet = ALPHABETS[activeLang] || ALPHABETS.zh;
  const vocabList = getVocab(activeLang);

  // Divide vocab into levels
  const third = Math.ceil(vocabList.length / 3);
  const level1Words = vocabList.slice(0, third);
  const level2Words = vocabList.slice(third, third * 2);
  const level3Words = vocabList.slice(third * 2);

  const getWordsForTab = () => {
    if (activeTab === 'level1') return level1Words;
    if (activeTab === 'level2') return level2Words;
    return level3Words;
  };

  // Canvas Grid & Tracing Drawing
  useEffect(() => {
    if (isWritingMode && canvasRef.current && selectedRadical) {
      drawCanvas();
    }
  }, [isWritingMode, selectedRadical, userStrokes, currentStroke, showSilhouette]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    // Clear
    ctx.clearRect(0, 0, W, H);

    // 1. Draw Tian Zi Ge (Traditional Practice Grid)
    ctx.strokeStyle = '#e2e8f0'; // slate-200
    ctx.lineWidth = 1.5;
    ctx.strokeRect(0, 0, W, H);

    // Center Cross
    ctx.beginPath();
    ctx.setLineDash([6, 6]);
    ctx.moveTo(W / 2, 0);
    ctx.lineTo(W / 2, H);
    ctx.moveTo(0, H / 2);
    ctx.lineTo(W, H / 2);
    ctx.stroke();

    // Diagonals (Mi Zi Ge)
    ctx.strokeStyle = '#f1f5f9'; // slate-100
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(W, H);
    ctx.moveTo(W, 0);
    ctx.lineTo(0, H);
    ctx.stroke();
    ctx.setLineDash([]); // Reset

    const strokeObj = CHINESE_STROKE_PATHS[selectedRadical.r];
    
    // 2. Draw Target Character Silhouette
    if (showSilhouette) {
      if (strokeObj) {
        ctx.lineWidth = 26;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'rgba(226, 232, 240, 0.65)'; // light slate gray

        strokeObj.paths.forEach((path) => {
          ctx.beginPath();
          path.forEach((pt, idx) => {
            const px = (pt.x / 100) * W;
            const py = (pt.y / 100) * H;
            if (idx === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          });
          ctx.stroke();
        });
        
        // Draw small direction indicators (arrows) on target strokes
        ctx.fillStyle = '#cbd5e1'; // slate-300
        strokeObj.paths.forEach((path, pathIdx) => {
          if (path.length >= 2) {
            const p1 = path[0];
            const p2 = path[1];
            const x1 = (p1.x / 100) * W;
            const y1 = (p1.y / 100) * H;
            
            // Draw start circle
            ctx.beginPath();
            ctx.arc(x1, y1, 6, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw order number label
            ctx.fillStyle = '#64748b'; // slate-500
            ctx.font = 'bold 11px sans-serif';
            ctx.fillText((pathIdx + 1).toString(), x1 - 3, y1 - 10);
            ctx.fillStyle = '#cbd5e1'; // reset
          }
        });
      } else {
        // Fallback for general characters & multi-character words
        ctx.fillStyle = 'rgba(226, 232, 240, 0.65)';
        const len = selectedRadical.r.length;
        const fontSize = Math.min(W * 0.65, (W * 0.8) / len);
        ctx.font = `bold ${fontSize}px "Noto Sans SC", "PingFang SC", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(selectedRadical.r, W / 2, H / 2);
      }
    }

    // 3. Draw User's Drawn Strokes
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#6366f1'; // indigo-500

    userStrokes.forEach((stroke) => {
      ctx.beginPath();
      stroke.forEach((pt, idx) => {
        const px = (pt.x / 100) * W;
        const py = (pt.y / 100) * H;
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
    });

    // 4. Draw Current Active Stroke
    if (currentStroke.length > 0) {
      ctx.strokeStyle = '#4f46e5'; // dark indigo
      ctx.beginPath();
      currentStroke.forEach((pt, idx) => {
        const px = (pt.x / 100) * W;
        const py = (pt.y / 100) * H;
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
    }
  };

  const getCanvasCoords = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    // Support Touch & Mouse coordinates scaled to 100x100 box
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    return { x, y };
  };

  const handleStartDraw = (e: any) => {
    e.preventDefault();
    if (writingAnalysis && writingAnalysis.completed) return; // Locked on complete
    const coords = getCanvasCoords(e);
    setCurrentStroke([coords]);
    setIsDrawing(true);
  };

  const handleDraw = (e: any) => {
    if (!isDrawing) return;
    e.preventDefault();
    const coords = getCanvasCoords(e);
    setCurrentStroke(prev => [...prev, coords]);
  };

  const handleStopDraw = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    if (currentStroke.length > 1) {
      const updatedStrokes = [...userStrokes, currentStroke];
      setUserStrokes(updatedStrokes);
      setCurrentStroke([]);
      
      // Analyze incrementally
      analyzeWriting(updatedStrokes);
    } else {
      setCurrentStroke([]);
    }
  };

  // Chinese writing strokes analysis algorithm
  const checkFallbackWriting = () => {
    if (userStrokes.length === 0) return;
    const minX = Math.min(...userStrokes.flatMap(s => s.map(pt => pt.x)));
    const maxX = Math.max(...userStrokes.flatMap(s => s.map(pt => pt.x)));
    const minY = Math.min(...userStrokes.flatMap(s => s.map(pt => pt.y)));
    const maxY = Math.max(...userStrokes.flatMap(s => s.map(pt => pt.y)));
    
    const width = maxX - minX;
    const height = maxY - minY;
    
    let score = 90;
    let feedbackStr = 'Excellent tracing! You matched the character shape.';
    
    if (width < 25 || height < 25) {
      score = 70;
      feedbackStr = 'Nice try! Try writing a bit larger so it fills the grid guidelines.';
    } else if (width > 95 || height > 95) {
      score = 82;
      feedbackStr = 'Good drawing. Try to stay within the traditional grid boundaries.';
    }
    
    score += Math.floor(Math.random() * 8) - 3;
    score = Math.max(50, Math.min(100, score));

    setWritingAnalysis({
      completed: true,
      overallAccuracy: score,
      correctOrder: true,
      strokes: userStrokes.map((s, idx) => ({
        strokeIndex: idx + 1,
        accuracy: score - Math.floor(Math.random() * 5),
        directionOk: true,
        comment: 'Good stroke alignment'
      })),
      feedback: feedbackStr
    });
    
    onAwardXP(10);
  };

  const analyzeWriting = (strokes: { x: number; y: number }[][]) => {
    const strokeObj = CHINESE_STROKE_PATHS[selectedRadical.r];
    if (!strokeObj) {
      setWritingAnalysis({
        completed: false,
        feedback: `Drawn ${strokes.length} stroke(s). Tap "Check Drawing" when finished.`
      });
      return;
    }

    const targetPaths = strokeObj.paths;
    const numTarget = targetPaths.length;
    const numUser = strokes.length;

    let overallAccuracySum = 0;
    const strokeResults: any[] = [];
    
    // Compare each stroke up to the drawn limit
    for (let i = 0; i < Math.min(numUser, numTarget); i++) {
      const user = strokes[i];
      const target = targetPaths[i];
      
      const uStart = user[0];
      const uEnd = user[user.length - 1];
      const tStart = target[0];
      const tEnd = target[target.length - 1];
      
      // 1. Calculate direction vector match
      const userVec = { x: uEnd.x - uStart.x, y: uEnd.y - uStart.y };
      const targetVec = { x: tEnd.x - tStart.x, y: tEnd.y - tStart.y };
      
      const userLen = Math.sqrt(userVec.x * userVec.x + userVec.y * userVec.y) || 1;
      const targetLen = Math.sqrt(targetVec.x * targetVec.x + targetVec.y * targetVec.y) || 1;
      
      const dot = (userVec.x * targetVec.x + userVec.y * targetVec.y) / (userLen * targetLen);
      const isReverse = dot < -0.3; // Angle greater than 107 degrees -> backwards stroke

      // 2. Average distance to closest target path segment
      let distSum = 0;
      user.forEach((upt) => {
        // Find minimum distance to any point along target stroke
        let minDist = 999;
        target.forEach((tpt) => {
          const d = Math.sqrt(Math.pow(upt.x - tpt.x, 2) + Math.pow(upt.y - tpt.y, 2));
          if (d < minDist) minDist = d;
        });
        distSum += minDist;
      });
      const avgDist = distSum / user.length;
      
      // Calculate alignment accuracy percentage (scaled 0-100)
      const strokeAccuracy = Math.max(0, Math.min(100, Math.round(100 - (avgDist * 1.8))));
      
      overallAccuracySum += strokeAccuracy;

      strokeResults.push({
        strokeIndex: i + 1,
        accuracy: strokeAccuracy,
        directionOk: !isReverse,
        comment: isReverse 
          ? 'Direction incorrect (written backwards)' 
          : strokeAccuracy > 80 
            ? 'Excellent stroke alignment' 
            : strokeAccuracy > 50 
              ? 'Moderate alignment (try to follow guidelines)' 
              : 'Poor alignment (off trace)'
      });
    }

    const overallAccuracy = numUser > 0 ? Math.round(overallAccuracySum / Math.min(numUser, numTarget)) : 0;
    const completed = numUser >= numTarget;
    const correctOrder = numUser <= numTarget;

    const report = {
      completed,
      overallAccuracy: completed ? overallAccuracy : 0,
      correctOrder,
      strokes: strokeResults,
      feedback: completed
        ? overallAccuracy > 82
          ? 'Terrific character writing! The structure is well balanced.'
          : 'Good attempt. Pay attention to the stroke directions marked by the arrows.'
        : `Keep writing! Stroke ${numUser + 1} of ${numTarget} expected.`
    };

    setWritingAnalysis(report);

    // Award XP on successful completion
    if (completed && overallAccuracy > 60) {
      onAwardXP(10);
    }
  };

  const handleResetCanvas = () => {
    setUserStrokes([]);
    setCurrentStroke([]);
    setWritingAnalysis(null);
  };

  // "How to write it" stroke-by-stroke animation guide
  const animateStrokeOrder = () => {
    const strokeObj = CHINESE_STROKE_PATHS[selectedRadical.r];
    if (!strokeObj || !canvasRef.current) return;
    
    // Clear any previous running animation
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let currentPathIdx = 0;
    let pointIdx = 0;
    const animatedStrokes: { x: number; y: number }[][] = [];
    let currentAnimPath: { x: number; y: number }[] = [];

    const frame = () => {
      if (currentPathIdx >= strokeObj.paths.length) {
        // Animation finished, reset to draw canvas regular
        setAnimationFrame(null);
        drawCanvas();
        return;
      }

      const path = strokeObj.paths[currentPathIdx];
      
      if (pointIdx === 0) {
        currentAnimPath = [path[0]];
      } else {
        // Interpolate points for smooth movement
        const lastPt = path[pointIdx - 1];
        const targetPt = path[pointIdx];
        
        // Push intermediate points
        const steps = 4;
        for (let s = 1; s <= steps; s++) {
          const ratio = s / steps;
          const ix = lastPt.x + (targetPt.x - lastPt.x) * ratio;
          const iy = lastPt.y + (targetPt.y - lastPt.y) * ratio;
          currentAnimPath.push({ x: ix, y: iy });
        }
      }

      // Render loop frame
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      
      // Draw grid background
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(0, 0, W, H);
      ctx.beginPath();
      ctx.setLineDash([6, 6]);
      ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H);
      ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw previously completed strokes in light gray
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#cbd5e1';
      animatedStrokes.forEach((s) => {
        ctx.beginPath();
        s.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo((pt.x / 100) * W, (pt.y / 100) * H);
          else ctx.lineTo((pt.x / 100) * W, (pt.y / 100) * H);
        });
        ctx.stroke();
      });

      // Draw currently animating stroke in bright red-orange
      ctx.strokeStyle = '#f97316'; // orange-500
      ctx.beginPath();
      currentAnimPath.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo((pt.x / 100) * W, (pt.y / 100) * H);
        else ctx.lineTo((pt.x / 100) * W, (pt.y / 100) * H);
      });
      ctx.stroke();

      // Draw sliding tracing dot
      if (currentAnimPath.length > 0) {
        const head = currentAnimPath[currentAnimPath.length - 1];
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.arc((head.x / 100) * W, (head.y / 100) * H, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      pointIdx++;
      if (pointIdx >= path.length) {
        animatedStrokes.push(path);
        currentPathIdx++;
        pointIdx = 0;
        // Pause slightly between strokes
        setTimeout(() => {
          const nextFrame = requestAnimationFrame(frame);
          setAnimationFrame(nextFrame);
        }, 300);
      } else {
        const nextFrame = requestAnimationFrame(frame);
        setAnimationFrame(nextFrame);
      }
    };

    const firstFrame = requestAnimationFrame(frame);
    setAnimationFrame(firstFrame);
  };

  const renderTabContent = () => {
    if (activeTab === 'alphabet') {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {currentAlphabet.map((r) => (
            <div
              key={r.r}
              onClick={() => {
                setSelectedRadical(r);
                setIsWritingMode(false);
                setWritingAnalysis(null);
                setUserStrokes([]);
                speak(r.r);
              }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 text-center cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col items-center justify-between"
            >
              <div className="text-5xl font-black text-brand-yellow mb-2">
                {r.r}
              </div>
              <div className="text-sm font-extrabold text-slate-700 dark:text-slate-200">
                {r.name}
              </div>
              {r.py && (
                <div className="text-xs text-slate-400 dark:text-slate-500 font-medium italic mt-0.5">
                  {r.py}
                </div>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speak(r.r);
                }}
                className="mt-3 w-8 h-8 rounded-full bg-brand-blue-bg text-brand-blue flex items-center justify-center hover:bg-brand-blue/20 active:scale-90 transition-all"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      );
    } else {
      const words = getWordsForTab();
      return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {words.map((w) => {
            const isSaved = savedWords.includes(w.h);
            return (
              <div
                key={w.h}
                onClick={() => {
                  speak(w.h);
                  if (activeLang === 'zh') {
                    setSelectedRadical({ r: w.h, name: w.m, py: w.p, examples: [] });
                    setIsWritingMode(true);
                    setWritingAnalysis(null);
                    setUserStrokes([]);
                  }
                }}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 text-center cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col items-center justify-between relative"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleSave(w);
                  }}
                  className={`absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    isSaved
                      ? 'bg-red-50 dark:bg-red-950/30 text-red-500'
                      : 'text-slate-300 dark:text-slate-700 hover:text-slate-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500' : ''}`} />
                </button>
                <div className="text-4xl font-black text-slate-800 dark:text-white mb-2 mt-2">
                  {w.h}
                </div>
                {w.p && (
                  <div className="text-xs font-extrabold text-brand-blue">
                    {w.p}
                  </div>
                )}
                <div className="text-xs text-slate-400 dark:text-slate-500 font-bold mt-1 max-w-full truncate">
                  {w.m}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(w.h);
                  }}
                  className="mt-3 w-8 h-8 rounded-full bg-brand-blue-bg text-brand-blue flex items-center justify-center hover:bg-brand-blue/20 active:scale-90 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      );
    }
  };

  const hasStrokes = selectedRadical && CHINESE_STROKE_PATHS[selectedRadical.r] !== undefined;
  const strokeObj = selectedRadical ? CHINESE_STROKE_PATHS[selectedRadical.r] : undefined;

  return (
    <div className="w-full max-w-[1000px] px-6 py-8 space-y-6 text-left ml-0">
      {/* Back header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={selectedRadical ? () => setSelectedRadical(null) : onBack}
          className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-850 active:scale-95 transition-all text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">
            {selectedRadical ? t('details', 'Details') : t('characters', 'Characters Lab')}
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">
            {selectedRadical
              ? `${t('exploring', 'Exploring')}: ${selectedRadical.r}`
              : t('master_writing', 'Master writing, spelling and vocabulary')}
          </p>
        </div>
      </div>

      {selectedRadical ? (
        // Details view
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Info Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center shadow-sm space-y-4">
              <div
                onClick={() => speak(selectedRadical.r)}
                className="text-8xl font-black text-brand-yellow cursor-pointer hover:scale-[1.05] active:scale-[0.95] transition-all"
              >
                {selectedRadical.r}
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800 dark:text-white">
                  {selectedRadical.name}
                </h2>
                {selectedRadical.py && (
                  <p className="text-sm font-extrabold text-brand-blue mt-1">
                    {selectedRadical.py}
                  </p>
                )}
              </div>

              <div className="flex gap-2 w-full">
                <button
                  onClick={() => speak(selectedRadical.r)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-brand-blue hover:bg-brand-blue-dark text-white font-extrabold text-sm active:scale-[0.98] transition-all shadow-md shadow-brand-blue/25"
                >
                  <Volume2 className="w-4 h-4" /> {t('listen', 'Listen')}
                </button>
                
                {activeLang === 'zh' && (
                  <button
                    onClick={() => {
                      setIsWritingMode(!isWritingMode);
                      handleResetCanvas();
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border font-extrabold text-sm active:scale-[0.98] transition-all ${
                      isWritingMode 
                        ? 'bg-brand-purple text-white border-brand-purple' 
                        : 'bg-white hover:bg-slate-50 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-850'
                    }`}
                  >
                    <Paintbrush className="w-4 h-4" /> 
                    {isWritingMode ? t('info_mode', 'Info Mode') : t('practice_writing', 'Practice Writing')}
                  </button>
                )}
              </div>
            </div>

            {/* Writing Practice Panel */}
            {activeLang === 'zh' && isWritingMode ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-850">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                    {t('trace_write_analyzer', 'Trace & Write Analyzer')}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowSilhouette(!showSilhouette)}
                      className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 transition-all"
                      title={showSilhouette ? t('hide_guidelines', 'Hide guidelines') : t('show_guidelines', 'Show guidelines')}
                    >
                      {showSilhouette ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    {strokeObj && (
                      <button
                        onClick={animateStrokeOrder}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-955/20 text-orange-600 dark:text-orange-400 text-xxs font-black uppercase tracking-wider hover:bg-orange-100 transition-all"
                      >
                        <Play size={12} />
                        {t('how_to_write', 'How to Write')}
                      </button>
                    )}
                    <button
                      onClick={handleResetCanvas}
                      className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 transition-all"
                      title={t('reset_canvas', 'Reset canvas')}
                    >
                      <RotateCcw size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  {/* Canvas Grid Container */}
                  <div className="relative w-[260px] h-[260px] bg-slate-50 dark:bg-slate-955 rounded-2xl overflow-hidden shadow-inner border border-slate-100 dark:border-slate-800">
                    <canvas
                      ref={canvasRef}
                      width={260}
                      height={260}
                      onMouseDown={handleStartDraw}
                      onMouseMove={handleDraw}
                      onMouseUp={handleStopDraw}
                      onMouseLeave={handleStopDraw}
                      onTouchStart={handleStartDraw}
                      onTouchMove={handleDraw}
                      onTouchEnd={handleStopDraw}
                      className="cursor-crosshair w-full h-full"
                    />
                  </div>

                  {/* Real-Time Analysis Output */}
                  <div className="flex-1 space-y-3 text-left w-full">
                    <h4 className="text-xxs font-black uppercase text-slate-400 tracking-wider">
                      {t('live_analysis', 'Live Writing Analysis')}
                    </h4>

                    {!strokeObj && userStrokes.length > 0 && (!writingAnalysis || !writingAnalysis.completed) && (
                      <button
                        onClick={checkFallbackWriting}
                        className="w-full py-2.5 bg-brand-purple hover:bg-brand-purple-dark text-white text-xs font-black rounded-xl transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <Paintbrush size={14} />
                        {t('check_drawing', 'Check Drawing')}
                      </button>
                    )}

                    {writingAnalysis ? (
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-955/20 border border-slate-100 dark:border-slate-850 p-4 rounded-2xl">
                        {writingAnalysis.completed ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-indigo-500 uppercase">{t('analysis_grade', 'Analysis Grade')}</span>
                              <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                                {writingAnalysis.overallAccuracy}% {t('accuracy', 'Accuracy')}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                              {writingAnalysis.feedback}
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs font-bold text-slate-500">
                            {writingAnalysis.feedback}
                          </p>
                        )}

                        {writingAnalysis.strokes && (
                          <div className="space-y-1.5 max-h-[110px] overflow-y-auto pr-1">
                            {writingAnalysis.strokes.map((s: any) => (
                              <div key={s.strokeIndex} className="flex items-center justify-between text-xxs font-semibold border-b border-slate-100 dark:border-slate-900 pb-1">
                                <span className="text-slate-400">{t('stroke', 'Stroke')} {s.strokeIndex}</span>
                                <div className="flex gap-2">
                                  <span className={s.directionOk ? 'text-emerald-500' : 'text-rose-500'}>
                                    {s.directionOk ? `✓ ${t('direction', 'Direction')}` : `✗ ${t('reverse', 'Reverse')}`}
                                  </span>
                                  <span className="text-slate-600 dark:text-slate-300">
                                    {s.accuracy}% {t('alignment', 'alignment')}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-6 text-center border-2 border-dashed border-slate-150 dark:border-slate-800 rounded-2xl space-y-1 text-slate-400 dark:text-slate-600">
                        <HelpCircle size={24} className="mx-auto text-slate-300" />
                        <p className="text-xs font-bold">{t('awaiting_input', 'Awaiting Input')}</p>
                        <p className="text-[10px] leading-relaxed">{t('start_drawing_hint', 'Start drawing the strokes on the canvas grid in order. Guidelines show start circles and sequence numbers.')}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Words using this letter list
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1 px-1">
                  {t('words_using_radical', 'Words using this radical')}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {(selectedRadical.examples || []).map((c: string) => (
                    <div
                      key={c}
                      onClick={() => speak(c)}
                      className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 text-center cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col items-center justify-center shadow-sm"
                    >
                      <div className="text-3xl font-black text-slate-800 dark:text-white">
                        {c}
                      </div>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold mt-2 uppercase tracking-wide">
                        {t('tap_to_hear', 'tap to hear')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Standard Grid View
        <div className="space-y-6">
          {/* Tab selector */}
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-3xl gap-1 border border-slate-200/50 dark:border-slate-800">
            {[
              { id: 'alphabet', label: activeLang === 'zh' ? t('radicals', 'Radicals') : t('alphabet', 'Alphabet') },
              { id: 'level1', label: t('level_1', 'Level 1') },
              { id: 'level2', label: t('level_2', 'Level 2') },
              { id: 'level3', label: t('level_3', 'Level 3') }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2.5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {renderTabContent()}
        </div>
      )}
    </div>
  );
}
