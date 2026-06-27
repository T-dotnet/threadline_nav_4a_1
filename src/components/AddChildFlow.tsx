import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronRight, User, Calendar, Clock, UploadCloud, FileText, Activity, Users, Settings, ArrowRight, ArrowLeft, Upload, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useCurrentChild } from '../context/ChildContext';
import { useLocker } from '../context/LockerContext';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { HeroQuoteCard } from './ui/HeroQuoteCard';
import { TimelineStep } from './ui/TimelineStep';
import { PageIcon } from './ui/PageIcon';
import { getCompletedQuestionnaireSections } from '../questionnaire';
import watercolorBg from '../assets/images/watercolor_bg_1782427011739.jpg';
import clinicianPhoto from '../assets/images/dr-naomi-clark.png';

interface Question {
  id: string;
  text: string;
  subtext?: string;
  type: 'choice' | 'multiple-choice' | 'text';
  options?: string[];
  placeholder?: string;
}

const QUESTIONS: Record<string, Question[]> = {
  'Home & family': [
    {
      id: 'family_live_with',
      text: 'Who does ${childName} live with at home?',
      subtext: 'Select all that apply.',
      type: 'multiple-choice',
      options: ['Both parents', 'Mother', 'Father', 'Step-parent', 'Grandparents', 'Siblings', 'Other relatives'],
    },
    {
      id: 'family_relationship',
      text: 'How would you describe their relationship with their primary caregivers?',
      subtext: 'Choose the option that fits best.',
      type: 'choice',
      options: [
        'Very close and supportive',
        'Mostly positive with occasional conflict',
        'Can be challenging or strained',
        'Varies significantly day-to-day'
      ],
    },
    {
      id: 'family_transitions',
      text: 'Have there been any major family transitions or stressors recently?',
      subtext: 'Select any that apply.',
      type: 'multiple-choice',
      options: [
        'None',
        'Moving home or school',
        'New sibling',
        'Separation or divorce',
        'Loss or illness in the family',
        'Change in parent employment'
      ],
    },
    {
      id: 'family_interests',
      text: "What are ${childName}'s favorite activities or special interests?",
      subtext: 'Tell us what brings them joy or keeps them highly engaged.',
      type: 'text',
      placeholder: 'e.g., Building Lego, drawing dinosaurs, playing outside, reading books...'
    }
  ],
  'Daily routines': [
    {
      id: 'routines_bedtime',
      text: 'How often is bedtime a struggle?',
      type: 'choice',
      options: ['Never', 'Sometimes', 'Often', 'Always']
    },
    {
      id: 'routines_sleep',
      text: 'How many hours of sleep does ${childName} usually get per night?',
      type: 'choice',
      options: ['Less than 6 hours', '6 to 8 hours', '8 to 10 hours', '10+ hours']
    },
    {
      id: 'routines_morning',
      text: 'How does ${childName} handle morning routines and getting ready?',
      type: 'choice',
      options: [
        'Very independent and cooperative',
        'Needs occasional reminders or prompting',
        'Frequently resists or gets distracted',
        'A significant daily challenge for the family'
      ]
    },
    {
      id: 'routines_eating',
      text: 'How would you describe their eating habits and mealtimes?',
      type: 'choice',
      options: [
        'Enjoys a wide variety of foods',
        'Somewhat selective or picky',
        'Extremely selective / sensitive to textures',
        'Often refuses meals or struggles to sit'
      ]
    }
  ],
  'At school': [
    {
      id: 'school_type',
      text: 'What is ${childName}\'s current school or learning environment?',
      type: 'choice',
      options: [
        'Preschool / Kindergarten',
        'Primary school (Prep to Year 6)',
        'High school (Year 7 to 12)',
        'Homeschooled',
        'Not yet in structured education'
      ]
    },
    {
      id: 'school_feeling',
      text: 'How does ${childName} feel about going to school?',
      type: 'choice',
      options: [
        'Excited and looks forward to it',
        'Content but neutral',
        'Anxious or reluctant at times',
        'Strongly resists or refuses to go'
      ]
    },
    {
      id: 'school_social',
      text: 'How does ${childName} interact with peers or friends?',
      type: 'choice',
      options: [
        'Has close friends and socializes easily',
        'Enjoys playing but has occasional conflicts',
        'Prefers solo play or struggles to make friends',
        'Often feels left out or overwhelmed socially'
      ]
    },
    {
      id: 'school_support',
      text: 'Does ${childName} receive any additional learning support or modifications?',
      type: 'choice',
      options: [
        'No additional support needed',
        'Informal adjustments by the teacher',
        'Individual Education Plan (IEP / ILP)',
        'Full-time support aide or special education'
      ]
    }
  ],
  'Development & history': [
    {
      id: 'dev_sensory',
      text: 'Have you noticed any specific sensory sensitivities?',
      subtext: 'Select all that apply.',
      type: 'multiple-choice',
      options: [
        'Loud noises or sudden sounds',
        'Bright or flickering lights',
        'Certain clothing tags or fabric textures',
        'Picky eating / food textures',
        'Smells or physical touch',
        'None of the above'
      ]
    },
    {
      id: 'dev_communication',
      text: 'How would you describe ${childName}\'s communication style?',
      type: 'choice',
      options: [
        'Highly verbal and expressive',
        'Communicates well but speaks less in public',
        'Uses short sentences or gets frustrated expressing ideas',
        'Uses non-verbal methods or alternative communication'
      ]
    },
    {
      id: 'dev_regulation',
      text: 'Does ${childName} find it easy to self-regulate when upset or overwhelmed?',
      type: 'choice',
      options: [
        'Calms down quickly with some support',
        'Takes time but eventually self-soothes',
        'Frequently has intense or long meltdowns',
        'Struggles significantly to regulate emotions'
      ]
    },
    {
      id: 'dev_strengths',
      text: 'What are the primary strengths you see in ${childName}?',
      subtext: 'We love to hear about what they do best.',
      type: 'text',
      placeholder: 'e.g., Kind and empathetic, highly creative, great memory, excellent puzzle solver...'
    }
  ]
};

interface AddChildFlowProps {
  onComplete: () => void;
  onCancel: () => void;
  asModal?: boolean;
  initialStep?: StepType;
}

type StepType = 'welcome' | 1 | 2 | 3 | 4 | 5 | 'done';

export default function AddChildFlow({ onComplete, onCancel, asModal, initialStep }: AddChildFlowProps) {
  const [step, setStep] = useState<StepType>(() => {
    if (initialStep) return initialStep;
    try {
      const params = new URLSearchParams(window.location.search);
      const stepParam = params.get('step');
      if (stepParam) {
        const num = parseInt(stepParam, 10);
        if (num >= 1 && num <= 5) return num as StepType;
        if (stepParam === 'welcome' || stepParam === 'done') return stepParam as StepType;
      }
      if (params.get('section')) return 4;
    } catch (e) {
      console.error(e);
    }
    return 'welcome';
  });
  const [qSection, setQSection] = useState<string | null>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const sectionParam = params.get('section');
      const validSections = ['Home & family', 'Daily routines', 'At school', 'Development & history'];
      if (sectionParam && validSections.includes(sectionParam)) {
        return sectionParam;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bedtimeStruggle, setBedtimeStruggle] = useState<string>('Sometimes');
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [isReviewing, setIsReviewing] = useState<boolean>(false);

  const { currentChild, addChild, updateChild } = useCurrentChild();
  const [answers, setAnswers] = useState<Record<string, any>>(() => (
    currentChild.isNew ? currentChild.intake?.questionnaireAnswers || {} : {}
  ));

  const daysArray = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const monthsArray = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];
  const currentYear = new Date().getFullYear();
  const yearsArray = Array.from({ length: 18 }, (_, i) => String(currentYear - i));

  // Detect user's timezone on load or default to Sydney/Melbourne (AEST)
  const detectTimezone = () => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz.includes('Sydney') || tz.includes('Melbourne') || tz.includes('Brisbane') || tz.includes('Hobart') || tz.includes('Canberra')) {
        return 'AEST';
      } else if (tz.includes('Adelaide') || tz.includes('Darwin')) {
        return 'ACST';
      } else if (tz.includes('Perth')) {
        return 'AWST';
      }
      // If outside Australia, check offset
      const offset = -new Date().getTimezoneOffset() / 60;
      if (offset === 10 || offset === 11) return 'AEST';
      if (offset === 9.5 || offset === 10.5) return 'ACST';
      if (offset === 8) return 'AWST';
      return 'AEST'; // default to AEST
    } catch (e) {
      return 'AEST';
    }
  };

  const [selectedTz, setSelectedTz] = useState(detectTimezone());
  const [isAppointmentCancelled, setIsAppointmentCancelled] = useState(false);

  const getConvertedTime = (baseTimeStr: string, targetTz: string) => {
    if (targetTz === 'AEST') return baseTimeStr;
    
    // Parse base time (assuming AEST)
    const [time, modifier] = baseTimeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'pm' && hours < 12) hours += 12;
    if (modifier === 'am' && hours === 12) hours = 0;
    
    // Subtract offset difference relative to AEST (AEST is UTC+10)
    let diff = 0; // in hours
    if (targetTz === 'AWST') diff = -2; // Perth is UTC+8
    if (targetTz === 'ACST') diff = -0.5; // Adelaide is UTC+9.5
    
    let totalMinutes = hours * 60 + minutes + (diff * 60);
    if (totalMinutes < 0) totalMinutes += 24 * 60; // wrap around
    
    const targetHours = Math.floor(totalMinutes / 60) % 24;
    const targetMinutes = Math.round(totalMinutes % 60);
    
    const finalHours = targetHours % 12 === 0 ? 12 : targetHours % 12;
    const finalMinutes = String(targetMinutes).padStart(2, '0');
    const finalModifier = targetHours >= 12 ? 'pm' : 'am';
    
    return `${finalHours}:${finalMinutes} ${finalModifier}`;
  };

  const getDobParts = () => {
    if (!formData.dob) return { day: '', month: '', year: '' };
    const parts = formData.dob.split(' / ');
    return {
      day: parts[0] || '',
      month: parts[1] || '',
      year: parts[2] || ''
    };
  };

  const handleDobChange = (part: 'day' | 'month' | 'year', value: string) => {
    const { day, month, year } = getDobParts();
    const newParts = { day, month, year, [part]: value };
    
    if (newParts.day || newParts.month || newParts.year) {
      setFormData({
        ...formData,
        dob: `${newParts.day} / ${newParts.month} / ${newParts.year}`
      });
    } else {
      setFormData({ ...formData, dob: '' });
    }
  };

  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addFile } = useLocker();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFiles = useCallback((filesList: FileList) => {
    const newFiles: { name: string; size: string }[] = [];
    for (let i = 0; i < filesList.length; i++) {
      const file = filesList[i];
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${(file.size / 1024).toFixed(0)} KB`;
      newFiles.push({ name: file.name, size: sizeStr });
    }
    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const removeFile = useCallback((index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleSelectOption = useCallback((qId: string, option: string, type: 'choice' | 'multiple-choice' | 'text') => {
    if (type === 'choice') {
      setAnswers(prev => ({ ...prev, [qId]: option }));
      // Auto-advance with a slight delay for pleasant visual feedback
      setTimeout(() => {
        setActiveQuestionIndex(prev => {
          const currentQuestions = QUESTIONS[qSection || ''] || [];
          if (prev < currentQuestions.length - 1) {
            return prev + 1;
          } else {
            setIsReviewing(true);
            return prev;
          }
        });
      }, 350);
    } else if (type === 'multiple-choice') {
      setAnswers(prev => {
        const current = prev[qId] || [];
        const updated = current.includes(option)
          ? current.filter((o: string) => o !== option)
          : [...current, option];
        return { ...prev, [qId]: updated };
      });
    }
  }, [qSection]);

  const handleTextChange = useCallback((qId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  }, []);

  const handlePrevQuestion = useCallback(() => {
    if (isReviewing) {
      setIsReviewing(false);
      const currentQuestions = QUESTIONS[qSection || ''] || [];
      setActiveQuestionIndex(currentQuestions.length - 1);
    } else if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(prev => prev - 1);
    }
  }, [isReviewing, activeQuestionIndex, qSection]);

  const handleNextQuestion = useCallback(() => {
    const currentQuestions = QUESTIONS[qSection || ''] || [];
    if (activeQuestionIndex < currentQuestions.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
    } else {
      setIsReviewing(true);
    }
  }, [activeQuestionIndex, qSection]);

  const getSectionStatus = useCallback((secName: string) => {
    const qs = QUESTIONS[secName] || [];
    if (qs.length === 0) return 'Not started';
    
    const answeredCount = qs.filter(q => {
      const ans = answers[q.id];
      if (ans === undefined || ans === null) return false;
      if (Array.isArray(ans)) return ans.length > 0;
      if (typeof ans === 'string') return ans.trim() !== '';
      return true;
    }).length;

    if (answeredCount === 0) return 'Not started';
    if (answeredCount === qs.length) return 'Completed';
    return `${answeredCount} of ${qs.length} answered`;
  }, [answers]);

  // Handle Typeform keyboard shortcuts
  useEffect(() => {
    if (!qSection) return;
    
    const currentQuestions = QUESTIONS[qSection] || [];
    const handleKeyDown = (e: KeyboardEvent) => {
      // If user is typing in a textarea or input, do not capture single keys like A/B/C
      const isTyping = document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA';
      
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevQuestion();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNextQuestion();
      } else if (e.key === 'Enter') {
        if (isTyping && document.activeElement instanceof HTMLTextAreaElement) {
          // Allow multiline textareas, unless Cmd/Ctrl+Enter is pressed
          if (!e.metaKey && !e.ctrlKey) return;
        }
        e.preventDefault();
        handleNextQuestion();
      } else if (!isTyping) {
        const key = e.key.toLowerCase();
        const code = key.charCodeAt(0) - 97; // 'a' code is 97
        const activeQ = currentQuestions[activeQuestionIndex];
        if (activeQ && activeQ.options && code >= 0 && code < activeQ.options.length) {
          e.preventDefault();
          handleSelectOption(activeQ.id, activeQ.options[code], activeQ.type);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [qSection, activeQuestionIndex, handlePrevQuestion, handleNextQuestion, handleSelectOption]);

  const [formData, setFormData] = useState(() => ({
    firstName: currentChild.isNew ? currentChild.name : '',
    dob: '',
    relation: currentChild.isNew ? currentChild.intake?.relation || 'Parent' : 'Parent',
    notices: currentChild.isNew ? currentChild.intake?.notices || [] as string[] : [] as string[],
    notes: currentChild.isNew ? currentChild.intake?.notes || '' : '',
    sessionDay: currentChild.isNew ? currentChild.intake?.sessionDay || '' : '',
    sessionTime: currentChild.isNew ? currentChild.intake?.sessionTime || '' : '',
  }));

  const buildIntake = (nextAnswers = answers) => ({
    relation: formData.relation,
    notices: formData.notices,
    notes: formData.notes,
    sessionDay: formData.sessionDay,
    sessionTime: formData.sessionTime,
    questionnaireAnswers: nextAnswers,
    completedQuestionnaireSections: getCompletedQuestionnaireSections(nextAnswers),
  });

  const saveCurrentChildIntake = (nextAnswers = answers) => {
    if (!currentChild.isNew) return;
    const name = formData.firstName.trim() || currentChild.name || 'New child';
    updateChild({
      ...currentChild,
      name,
      initial: name.charAt(0).toUpperCase(),
      intake: buildIntake(nextAnswers),
    });
  };

  const handleNext = () => {
    if (step === 'welcome') setStep(1);
    else if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) setStep(4);
    else if (step === 4) {
      saveCurrentChildIntake();
      setStep(5);
    }
    else if (step === 5) {
      // Add files to Locker
      uploadedFiles.forEach(f => {
        addFile({
          typeId: "report",
          typeName: "Report",
          name: f.name,
          date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          shared: false,
          icon: FileText
        });
      });

      const name = formData.firstName.trim() || (currentChild.isNew ? currentChild.name : 'New child');
      const child = {
        ...(currentChild.isNew ? currentChild : {}),
        id: currentChild.isNew ? currentChild.id : undefined,
        name,
        age: currentChild.isNew ? currentChild.age : 9,
        initial: name.charAt(0).toUpperCase(),
        isNew: true,
        intake: buildIntake(),
      };
      if (currentChild.isNew) {
        updateChild(child);
      } else {
        addChild(child);
      }
      setStep('done');
    }
    else if (step === 'done') {
      onComplete();
    }
  };

  const handleBack = () => {
    if (hideStepperForDirectModalStep) {
      onCancel();
      return;
    }
    if (step === 1) setStep('welcome');
    else if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) setStep(3);
    else if (step === 5) setStep(4);
  };

  const steps = [
    { num: 1, title: 'Your child', desc: 'Name & date of birth' },
    { num: 2, title: 'What you notice', desc: 'Concerns & notes' },
    { num: 3, title: 'Your session', desc: 'Book a video call' },
    { num: 4, title: 'Questionnaire', desc: 'Everyday life' },
    { num: 5, title: 'Documents', desc: 'Optional uploads' },
  ];

  const relations = ['Parent', 'Guardian', 'Carer'];
  const noticeOptions = [
    'Attention & focus', 'Behaviour & emotions', 'Sleep', 'Learning', 
    'Movement & coordination', 'Speech & communication', 'Friendships'
  ];
  const days = [
    { dow: 'Tue', num: '24', mon: 'Jun' },
    { dow: 'Wed', num: '25', mon: 'Jun' },
    { dow: 'Thu', num: '26', mon: 'Jun' },
    { dow: 'Fri', num: '27', mon: 'Jun' },
    { dow: 'Mon', num: '30', mon: 'Jun' },
  ];
  const times = ['9:00 am', '10:30 am', '1:00 pm', '4:00 pm'];
  const completedQuestionnaireSections = getCompletedQuestionnaireSections(answers);
  const remainingQuestionnaireSections = Math.max(0, Object.keys(QUESTIONS).length - completedQuestionnaireSections.length);
  const isDirectSessionModal = asModal && initialStep === 3;
  const hideStepperForDirectModalStep = isDirectSessionModal || (asModal && initialStep === 5);
  const sectionKickerClass = "text-[0.75rem] tracking-[0.1em] uppercase text-[var(--color-thread-mid-green)] font-medium mb-3 block";
  const stepHeadingClass = "font-serif font-normal text-[2rem] sm:text-[2.35rem] leading-[1.12] tracking-tight text-[var(--color-thread-heading)] mb-3 max-w-[14ch]";
  const stepLeadClass = "text-[0.98rem] text-[var(--color-thread-gray)] leading-relaxed max-w-[55ch]";
  const selectClass = "w-full py-3 px-4 pr-9 bg-[var(--color-thread-off-white)]/50 border border-black/10 rounded-xl text-[0.95rem] font-medium text-[var(--color-thread-dark-slate)] focus:outline-none focus:ring-2 focus:ring-[var(--color-thread-mid-green)]/20 focus:border-[var(--color-thread-mid-green)]/30 transition-all appearance-none cursor-pointer";
  const smallFieldLabelClass = "text-[0.66rem] tracking-[0.12em] uppercase text-[var(--color-thread-gray)] font-medium mb-1.5 block";
  const choiceClass = (selected: boolean) => cn(
    "px-5 py-2.5 rounded-full text-[0.84rem] font-medium transition-all border shadow-none cursor-pointer inline-flex items-center gap-2 min-h-[40px]",
    selected
      ? "bg-[var(--color-thread-light-green)] border-transparent text-[var(--color-thread-heading)]"
      : "bg-white border-black/10 text-[var(--color-thread-gray)] hover:border-black/20 hover:text-[var(--color-thread-heading)]"
  );
  const questionOptionClass = (selected: boolean) => cn(
    "w-full p-4 rounded-tr-[20px] border text-left flex items-center justify-between group transition-all duration-200 cursor-pointer shadow-none",
    selected
      ? "bg-[var(--color-thread-light-green)] border-[var(--color-thread-mid-green)]/30 text-[var(--color-thread-heading)] font-medium"
      : "bg-white border-black/10 text-[var(--color-thread-dark-slate)] hover:border-black/20 hover:bg-[var(--color-thread-off-white)]/60"
  );
  const renderSetupStepper = (activeStep: number, heading: string) => (
    <>
      <div className="text-[0.75rem] tracking-[0.1em] uppercase text-[var(--color-thread-mid-green)] font-medium mb-8">
        {heading}
      </div>
      <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-black/5">
        {steps.map((s) => {
          const isPast = activeStep > s.num;
          const isCurrent = activeStep === s.num;
          return (
            <div key={s.num} className="flex gap-4 relative z-10">
              <div className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-[0.72rem] font-medium border-2 transition-colors bg-[var(--color-thread-off-white)]",
                isPast ? "bg-[var(--color-thread-mid-green)] border-[var(--color-thread-mid-green)] text-white" :
                isCurrent ? "border-[var(--color-thread-mid-green)] text-[var(--color-thread-mid-green)] bg-[var(--color-thread-light-green)] shadow-[0_0_0_4px_var(--color-thread-light-green)]" :
                "border-slate-200 text-slate-400 bg-white"
              )}>
                {isPast ? <Check className="w-3.5 h-3.5" /> : s.num}
              </div>
              <div>
                <div className={cn(
                  "text-[0.92rem] font-medium mb-0.5 transition-colors",
                  isCurrent || isPast ? "text-[var(--color-thread-heading)]" : "text-slate-400"
                )}>{s.title}</div>
                <div className={cn(
                  "text-[0.78rem] transition-colors",
                  isCurrent ? "text-slate-500" : "text-slate-400"
                )}>{s.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <>
      {asModal && (
        <div className="fixed inset-0 z-40 bg-watercolor bg-fixed" onClick={onCancel} />
      )}
      <div className={cn(
        "font-sans flex flex-col",
        asModal
          ? "fixed inset-0 z-50 overflow-hidden bg-watercolor bg-fixed"
          : "min-h-screen bg-watercolor bg-fixed relative"
      )}>
      {/* Main Container */}
      <div className={cn(
        "flex-1 w-full bg-transparent px-4 sm:px-6 md:px-8 flex items-start justify-center",
        asModal ? "overflow-y-auto py-8" : "py-8 sm:py-12 md:py-16"
      )}>
        <div className="max-w-5xl w-full bg-white rounded-tr-[36px] shadow-premium border border-black/5 flex flex-col md:flex-row overflow-hidden min-h-[640px] relative">
          <div
            className="absolute left-0 top-0 h-1 bg-[var(--color-thread-mid-green)] transition-all duration-500 z-10"
            style={{ width: step === 'welcome' ? '0%' : step === 'done' ? '100%' : `${(step as number) / 5 * 100}%` }}
          />
          
          {/* WELCOME STATE */}
          {step === 'welcome' && (
            <>
              {/* Left Column: Welcome messaging */}
              <div className="w-full md:w-3/5 p-8 sm:p-12 md:p-14 flex flex-col justify-between gap-10">
                <div className="space-y-8">
                  <div>
                    <span className={sectionKickerClass}>Welcome to Threadline</span>
                    <h1 className={stepHeadingClass}>Let's set up Threadline for your family.</h1>
                    <p className={stepLeadClass}>A few short steps to get ready for your first session. It takes about ten minutes, and you can pause and pick up anytime — your progress is saved.</p>
                  </div>
                  
                  <div className="bg-[var(--color-thread-off-white)]/70 p-5 rounded-tr-[24px] flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-thread-light-green)] flex items-center justify-center flex-shrink-0 text-[var(--color-thread-mid-green)]">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[var(--color-thread-heading)] mb-1">A clinician leads everything</h4>
                      <p className="text-[0.92rem] text-[var(--color-thread-gray)] leading-relaxed">Your session is led by a registered clinician, and they review every result before you see it. Threadline does the structured work behind the scenes — a person is always accountable for your care.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <Button
                    onClick={onCancel}
                    variant="muted"
                    className="text-[0.95rem] px-8 py-4 shadow-none w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleNext}
                    variant="forest"
                    className="text-[0.95rem] px-8 py-4 shadow-none w-full sm:w-auto"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Begin setup
                  </Button>
                </div>
              </div>

              {/* Right Column: Setup Stepper */}
              <aside className="order-2 w-full md:w-72 bg-transparent p-8 sm:p-10 border-t md:border-t-0 md:border-l border-black/5 flex-shrink-0 flex flex-col justify-start">
                {renderSetupStepper(1, "What we'll do together")}
              </aside>
            </>
          )}

          {/* ACTIVE STEPS 1-5 */}
          {typeof step === 'number' && (
            <>
              {/* Right Column: Interactive Sidebar Progress */}
              {!hideStepperForDirectModalStep && (
                <aside className="order-2 w-full md:w-72 bg-transparent p-8 sm:p-10 border-t md:border-t-0 md:border-l border-black/5 flex-shrink-0 flex flex-col">
                  {renderSetupStepper(step, `${formData.firstName || 'Your child'}'s setup`)}
                </aside>
              )}

              {/* Step content & in-card action buttons */}
              <main className="order-1 flex-1 p-8 sm:p-12 md:p-14 flex flex-col justify-between min-h-[500px]">
                <div className="w-full">
                  
                  {/* Step 1 */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                      <div>
                        <span className={sectionKickerClass}>Step 1 of 5 · Your child</span>
                        <h1 className={stepHeadingClass}>Add your child</h1>
                        <p className={stepLeadClass}>Start with the basics — who we're supporting and how you're related to them.</p>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <Label>Child's first name</Label>
                          <Input 
                            placeholder="e.g. Alex"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            className="max-w-md py-3 bg-white"
                          />
                        </div>
                        <div>
                          <Label className="mb-2 block">Date of birth</Label>
                          <div className="flex gap-3 max-w-md">
                            <div className="flex-[1]">
                              <span className={smallFieldLabelClass}>Day</span>
                              <div className="relative">
                                <select
                                  value={getDobParts().day}
                                  onChange={(e) => handleDobChange('day', e.target.value)}
                                  className={selectClass}
                                >
                                  <option value="">DD</option>
                                  {daysArray.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                  ))}
                                </select>
                                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                              </div>
                            </div>
                            <div className="flex-[2]">
                              <span className={smallFieldLabelClass}>Month</span>
                              <div className="relative">
                                <select
                                  value={getDobParts().month}
                                  onChange={(e) => handleDobChange('month', e.target.value)}
                                  className={selectClass}
                                >
                                  <option value="">Month</option>
                                  {monthsArray.map(m => (
                                    <option key={m.value} value={m.value}>{m.label}</option>
                                  ))}
                                </select>
                                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                              </div>
                            </div>
                            <div className="flex-[1.5]">
                              <span className={smallFieldLabelClass}>Year</span>
                              <div className="relative">
                                <select
                                  value={getDobParts().year}
                                  onChange={(e) => handleDobChange('year', e.target.value)}
                                  className={selectClass}
                                >
                                  <option value="">YYYY</option>
                                  {yearsArray.map(y => (
                                    <option key={y} value={y}>{y}</option>
                                  ))}
                                </select>
                                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Label>I'm the child's…</Label>
                          <div className="flex flex-wrap gap-2">
                            {relations.map(rel => (
                              <button
                                key={rel}
                                onClick={() => setFormData({...formData, relation: rel})}
                                className={cn(
                                  choiceClass(formData.relation === rel)
                                )}
                              >
                                {rel}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                      <div>
                        <span className={sectionKickerClass}>Step 2 of 5 · What you notice</span>
                        <h1 className={stepHeadingClass}>What you're noticing</h1>
                        <p className={stepLeadClass}>There are no wrong answers — the areas you flag and anything you add in your own words help your clinician prepare for {formData.firstName || 'your child'}'s session.</p>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <Label className="mb-3">What are you noticing? <span className="text-slate-400 font-normal ml-2">choose any that fit</span></Label>
                          <div className="flex flex-wrap gap-2.5">
                            {noticeOptions.map(opt => {
                              const isSelected = formData.notices.includes(opt);
                              return (
                                <button
                                  key={opt}
                                  onClick={() => {
                                    const newNotices = isSelected 
                                      ? formData.notices.filter(n => n !== opt)
                                      : [...formData.notices, opt];
                                    setFormData({...formData, notices: newNotices});
                                  }}
                                  className={cn(
                                    choiceClass(isSelected)
                                  )}
                                >
                                  {opt}
                                  {isSelected && <Check className="w-3.5 h-3.5 text-[var(--color-thread-mid-green)]" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <Label className="mb-3">Anything in your own words? <span className="text-slate-400 font-normal ml-2">optional</span></Label>
                          <textarea 
                            className="w-full min-h-[120px] p-4 rounded-tr-[24px] border border-black/10 bg-[var(--color-thread-off-white)]/50 text-[0.95rem] text-[var(--color-thread-dark-slate)] placeholder:text-[var(--color-thread-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--color-thread-mid-green)]/20 focus:border-[var(--color-thread-mid-green)]/30 transition-all resize-y shadow-none"
                            placeholder="Write as much or as little as you like..."
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                      <div>
                        <span className={sectionKickerClass}>Step 3 of 5 · Your session</span>
                        <h1 className={stepHeadingClass}>Book your session</h1>
                        <p className={stepLeadClass}>One structured video call with a clinician. Pick a time that works — you can reschedule later if you need to.</p>
                      </div>

                      <div className="bg-[var(--color-thread-off-white)]/70 p-5 rounded-tr-[24px] shadow-none flex items-start gap-4">
                        <img
                          src={clinicianPhoto}
                          alt="Dr. Naomi Clark"
                          className="w-16 h-16 rounded-full object-cover flex-shrink-0 border border-black/5 shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="font-medium text-[var(--color-thread-heading)]">Dr. Naomi Clark</h4>
                          <p className="text-xs text-slate-400 mb-2">Consultant Child Psychologist · PhD, MAPS</p>
                          <p className="text-xs text-slate-500 leading-relaxed max-w-md">Dr Clark specializes in developmental profiles and child-centered environments. She leads the review of {formData.firstName || 'your child'}'s profile and works with your family.</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <Label className="mb-3">Choose a day</Label>
                          <div className="flex flex-wrap gap-2.5">
                            {days.map(d => (
                              <button
                                key={d.num}
                                onClick={() => setFormData({...formData, sessionDay: d.num, sessionTime: ''})}
                                className={cn(
                                  "w-[4.5rem] py-3 rounded-tr-[20px] flex flex-col items-center justify-center border transition-all shadow-none cursor-pointer",
                                  formData.sessionDay === d.num
                                    ? "bg-[var(--color-thread-light-green)] border-transparent text-[var(--color-thread-heading)] font-semibold scale-[1.02]"
                                    : "bg-white border-black/10 text-slate-600 hover:border-black/20 hover:bg-[var(--color-thread-off-white)]/60"
                                )}
                              >
                                <span className={cn("text-[0.66rem] uppercase tracking-wider mb-1 transition-colors", formData.sessionDay === d.num ? "text-[var(--color-thread-mid-green)] font-semibold" : "text-slate-400")}>{d.dow}</span>
                                <span className={cn("text-xl font-serif transition-colors", formData.sessionDay === d.num ? "text-[var(--color-thread-heading)] font-semibold" : "text-slate-800")}>{d.num}</span>
                                <span className={cn("text-[0.66rem] transition-colors", formData.sessionDay === d.num ? "text-[var(--color-thread-mid-green)] font-semibold" : "text-slate-400")}>{d.mon}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {formData.sessionDay && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <Label className="mb-0">Choose a time</Label>
                              <div className="flex items-center gap-2">
                                <span className={smallFieldLabelClass}>Your timezone</span>
                                <div className="relative">
                                  <select
                                    value={selectedTz}
                                    onChange={(e) => setSelectedTz(e.target.value)}
                                    className="text-[0.78rem] font-medium py-1.5 pl-2.5 pr-8 bg-white border border-black/10 rounded-full text-slate-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-thread-mid-green)]/20 focus:border-[var(--color-thread-mid-green)]/30 transition-all appearance-none cursor-pointer"
                                  >
                                    <option value="AEST">AEST / AEDT</option>
                                    <option value="ACST">ACST / ACDT</option>
                                    <option value="AWST">AWST</option>
                                  </select>
                                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                              {times.map(t => {
                                const converted = getConvertedTime(t, selectedTz);
                                return (
                                  <button
                                    key={t}
                                    onClick={() => setFormData({...formData, sessionTime: t})}
                                    className={cn(
                                      "px-5 py-2.5 rounded-tr-[20px] text-sm font-medium transition-all border shadow-none cursor-pointer flex flex-col items-center justify-center gap-0.5 min-w-[5.5rem]",
                                      formData.sessionTime === t
                                        ? "bg-[var(--color-thread-light-green)] border-transparent text-[var(--color-thread-heading)] font-semibold"
                                        : "bg-white border-black/10 text-slate-600 hover:border-black/20 hover:bg-[var(--color-thread-off-white)]/60"
                                    )}
                                  >
                                    <span className="font-semibold text-[0.92rem]">{converted}</span>
                                    {converted !== t && (
                                      <span className="text-[9px] text-slate-400 font-normal">({t} AEST)</span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </div>

                      <div className="bg-[var(--color-thread-off-white)]/70 p-5 rounded-br-[24px] text-slate-600 text-sm flex gap-3.5">
                        <Clock className="w-5 h-5 text-[var(--color-thread-mid-green)] flex-shrink-0 mt-0.5" />
                        <div>A <span className="font-semibold">45-minute telehealth session</span> — a structured interview, some gentle observation, and a few short tasks for {formData.firstName || 'your child'}. Join from home.</div>
                      </div>

                      {isDirectSessionModal && (
                        <div className="border-t border-black/5 pt-5 flex flex-col sm:flex-row sm:items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setIsAppointmentCancelled(true)}
                            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-rose-200 bg-white text-rose-600 hover:bg-rose-50 text-sm font-semibold transition-all cursor-pointer"
                          >
                            Cancel appointment
                          </button>
                          {isAppointmentCancelled && (
                            <div className="text-xs font-medium text-[var(--color-thread-mid-green)] bg-[var(--color-thread-light-green)] px-3.5 py-2 rounded-full">
                              Appointment cancelled. You can choose a new time when ready.
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 4 */}
                  {step === 4 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                      {true && (
                        <div>
                          <span className={sectionKickerClass}>Step 4 of 5 · Questionnaire</span>
                          <h1 className={stepHeadingClass}>Everyday life & environment</h1>
                          <p className={stepLeadClass}>A comprehensive view of {formData.firstName || 'your child'}'s world — from routines to school life. A clinician reviews every answer before your session.</p>
                        </div>
                      )}

                      {(
                        <div className="space-y-3">
                          {(() => {
                            const completedSectionsCount = ['Home & family', 'Daily routines', 'At school', 'Development & history'].filter(
                              sec => getSectionStatus(sec) === 'Completed'
                            ).length;
                            const totalQuestionsCount = Object.values(QUESTIONS).flat().length;
                            const answeredQuestionsCount = Object.values(QUESTIONS).flat().filter(q => {
                              const ans = answers[q.id];
                              if (ans === undefined || ans === null) return false;
                              if (Array.isArray(ans)) return ans.length > 0;
                              if (typeof ans === 'string') return ans.trim() !== '';
                              return true;
                            }).length;
                            const progressPercent = Math.round((answeredQuestionsCount / totalQuestionsCount) * 100);

                            return (
                              <div className="bg-[var(--color-thread-off-white)]/70 p-5 rounded-tr-[24px] shadow-none flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center relative flex-shrink-0">
                                  <svg
                                    className="w-full h-full -rotate-90 absolute inset-0"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                  >
                                    <circle
                                      cx="24"
                                      cy="24"
                                      r="18"
                                      stroke="var(--color-thread-mid-green)"
                                      strokeOpacity="0.15"
                                      strokeWidth="4"
                                      fill="transparent"
                                    />
                                    <circle
                                      cx="24"
                                      cy="24"
                                      r="18"
                                      stroke="var(--color-thread-mid-green)"
                                      strokeWidth="4"
                                      fill="transparent"
                                      strokeLinecap="round"
                                      strokeDasharray={2 * Math.PI * 18}
                                      strokeDashoffset={2 * Math.PI * 18 * (1 - progressPercent / 100)}
                                      className="transition-all duration-500"
                                    />
                                  </svg>
                                  <span className="text-[0.72rem] font-medium text-[var(--color-thread-heading)] z-10">{progressPercent}%</span>
                                </div>
                                <div>
                                  <div className="font-medium text-[var(--color-thread-heading)] text-[0.92rem] mb-0.5">{completedSectionsCount} of 4 sections completed</div>
                                  <div className="text-[0.78rem] text-[var(--color-thread-gray)]">{answeredQuestionsCount} of {totalQuestionsCount} questions answered. Progress is saved.</div>
                                </div>
                              </div>
                            );
                          })()}

                          {['Home & family', 'Daily routines', 'At school', 'Development & history'].map((sec, i) => {
                            const status = getSectionStatus(sec);
                            const isDone = status === 'Completed';
                            const qCount = (QUESTIONS[sec] || []).length;
                            const isLocked = false;
                            const isInProgress = !isDone && status !== 'Not started';
                            return (
                              <button
                                key={sec}
                                onClick={() => {
                                  if (isLocked) return;
                                  setQSection(sec);
                                  setActiveQuestionIndex(0);
                                  setIsReviewing(false);
                                  setIsModalOpen(true);
                                }}
                                disabled={isLocked}
                                className={cn(
                                  "w-full bg-white p-6 rounded-tr-[24px] flex items-center gap-5 text-left transition-all group",
                                  isLocked
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-[var(--color-thread-off-white)]/40 cursor-pointer"
                                )}
                              >
                                <div className={cn(
                                  "w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all shrink-0",
                                  isDone
                                    ? "bg-[var(--color-thread-mid-green)] border-[var(--color-thread-mid-green)] text-white"
                                    : isLocked
                                    ? "border-slate-200 text-slate-300 bg-slate-50"
                                    : "border-slate-200 text-slate-400 bg-[var(--color-thread-off-white)] group-hover:bg-white group-hover:border-[var(--color-thread-mid-green)] group-hover:text-[var(--color-thread-mid-green)]"
                                )}>
                                  {isDone ? <Check className="w-4 h-4" /> : isLocked ? <span className="text-slate-300">🔒</span> : i + 1}
                                </div>
                                  <div className="flex-1 min-w-0">
                                    <div className={cn("font-sans font-medium text-[1.12rem] tracking-tight leading-[1.3]", isLocked ? "text-slate-400" : "text-[var(--color-thread-dark-slate)]")}>{sec}</div>
                                    <div className="text-[0.78rem] text-[var(--color-thread-gray)] mt-1.5 leading-relaxed">
                                      {isLocked
                                        ? `Complete "${['Home & family', 'Daily routines', 'At school', 'Development & history'][i - 1]}" to unlock`
                                        : `Tell us about ${formData.firstName || 'your child'}'s everyday life · ${qCount} questions`}
                                    </div>
                                  </div>
                                {!isLocked && (
                                  <div className="flex items-center gap-3 shrink-0">
                                    <div className={cn(
                                      "text-[0.6rem] font-medium inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full uppercase tracking-[0.12em] whitespace-nowrap",
                                      isDone ? "bg-[var(--color-thread-light-green)] text-[var(--color-thread-mid-green)]" : status === 'Not started' ? "bg-[var(--color-thread-off-white)] text-slate-400" : "bg-[var(--color-thread-cream)] text-[var(--color-thread-heading)]"
                                    )}>
                                      {isDone && <Check className="w-3 h-3" />}
                                      {isDone ? 'Completed' : isInProgress ? status : 'Start section'}
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors" />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* QUESTIONNAIRE MODAL */}
                  <AnimatePresence>
                  {isModalOpen && qSection && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10"
                      style={{ backgroundImage: `url(${watercolorBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                      <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]" />
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.97 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10 w-full max-w-2xl bg-white rounded-tr-[36px] shadow-modal border border-black/5 flex flex-col max-h-[90vh] overflow-hidden"
                      >
                        <div className="flex flex-col h-full justify-between min-h-[480px]">
                          {/* Header / Nav-back */}
                          <div className="flex items-center justify-between p-6 pb-5 border-b border-black/5">
                            {!isReviewing ? (
                              <button
                                onClick={() => {
                                  saveCurrentChildIntake();
                                  setQSection(null);
                                  setIsModalOpen(false);
                                }}
                                className="text-[0.84rem] text-[var(--color-thread-dark-slate)] font-medium border-b border-[var(--color-thread-dark-slate)] pb-0.5 hover:opacity-70 transition-all min-h-[32px] inline-flex items-center cursor-pointer"
                              >
                                Save & exit section
                              </button>
                            ) : (
                              <div className="min-h-[32px] w-[140px]" />
                            )}
                            <span className="text-[0.75rem] font-medium text-slate-400 uppercase tracking-[0.1em]">
                              {qSection}
                            </span>
                          </div>

                          {/* Main Body */}
                          <div className="flex-1 py-8 px-6 sm:px-10 flex flex-col justify-start overflow-y-auto">
                            <AnimatePresence mode="wait">
                              {!isReviewing ? (
                                <motion.div
                                  key={activeQuestionIndex}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  transition={{ duration: 0.3 }}
                                  className="space-y-8"
                                >
                                  {/* Active Question */}
                                  {(() => {
                                    const currentQuestions = QUESTIONS[qSection || ''] || [];
                                    const q = currentQuestions[activeQuestionIndex];
                                    if (!q) return null;
                                    const qText = q.text.replace(/\$\{childName\}/g, formData.firstName || 'your child');
                                    const qSub = q.subtext?.replace(/\$\{childName\}/g, formData.firstName || 'your child');
                                    
                                    return (
                                      <div className="space-y-6">
                                        <div className="space-y-2">
                                          <div className="flex items-start gap-3">
                                            <span className="text-[0.75rem] font-medium tracking-[0.1em] uppercase text-[var(--color-thread-mid-green)] mt-2">{String(activeQuestionIndex + 1).padStart(2, '0')}</span>
                                            <h2 className="font-serif font-normal text-2xl md:text-3xl text-[var(--color-thread-heading)] leading-snug">
                                              {qText}
                                            </h2>
                                          </div>
                                          {qSub && (
                                            <p className="text-[var(--color-thread-gray)] text-[0.92rem] leading-relaxed ml-8">{qSub}</p>
                                          )}
                                        </div>

                                        <div className="ml-8">
                                          {/* CHOICE TYPE */}
                                          {q.type === 'choice' && q.options && (
                                            <div className="space-y-2.5 max-w-lg">
                                              {q.options.map((opt, oIdx) => {
                                                const isSelected = answers[q.id] === opt;
                                                const letter = String.fromCharCode(65 + oIdx); // A, B, C, D...
                                                return (
                                                  <button
                                                    key={opt}
                                                    onClick={() => handleSelectOption(q.id, opt, 'choice')}
                                                    className={cn(
                                                      questionOptionClass(isSelected)
                                                    )}
                                                  >
                                                    <div className="flex items-center gap-3">
                                                      <span className={cn(
                                                        "w-6 h-6 rounded-full border text-[0.66rem] font-medium flex items-center justify-center transition-colors",
                                                        isSelected
                                                          ? "bg-[var(--color-thread-mid-green)] border-[var(--color-thread-mid-green)] text-white"
                                                          : "bg-white border-black/10 text-slate-400 group-hover:border-black/20 group-hover:text-slate-600"
                                                      )}>
                                                        {letter}
                                                      </span>
                                                      <span className="text-[0.95rem]">{opt}</span>
                                                    </div>
                                                    {isSelected && <Check className="w-4 h-4 text-[var(--color-thread-mid-green)]" />}
                                                  </button>
                                                );
                                              })}
                                            </div>
                                          )}

                                          {/* MULTIPLE CHOICE TYPE */}
                                          {q.type === 'multiple-choice' && q.options && (
                                            <div className="space-y-2.5 max-w-lg">
                                              {q.options.map((opt, oIdx) => {
                                                const selectedList = answers[q.id] || [];
                                                const isSelected = selectedList.includes(opt);
                                                const letter = String.fromCharCode(65 + oIdx); // A, B, C, D...
                                                return (
                                                  <button
                                                    key={opt}
                                                    onClick={() => handleSelectOption(q.id, opt, 'multiple-choice')}
                                                    className={cn(
                                                      questionOptionClass(isSelected)
                                                    )}
                                                  >
                                                    <div className="flex items-center gap-3">
                                                      <span className={cn(
                                                        "w-6 h-6 rounded-full border text-[0.66rem] font-medium flex items-center justify-center transition-colors",
                                                        isSelected
                                                          ? "bg-[var(--color-thread-mid-green)] border-[var(--color-thread-mid-green)] text-white"
                                                          : "bg-white border-black/10 text-slate-400 group-hover:border-black/20 group-hover:text-slate-600"
                                                      )}>
                                                        {letter}
                                                      </span>
                                                      <span className="text-[0.95rem]">{opt}</span>
                                                    </div>
                                                    <div className={cn(
                                                        "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                                                      isSelected
                                                        ? "bg-[var(--color-thread-mid-green)] border-[var(--color-thread-mid-green)] text-white"
                                                        : "border-black/10 group-hover:border-black/20 bg-white"
                                                    )}>
                                                      {isSelected && <Check className="w-3.5 h-3.5" />}
                                                    </div>
                                                  </button>
                                                );
                                              })}

                                              {/* Navigation OK button */}
                                              <div className="pt-4 flex items-center gap-3">
                                                <Button
                                                  onClick={handleNextQuestion}
                                                  variant="mint"
                                                  className="px-5 py-2.5 min-h-[40px] shadow-none"
                                                  rightIcon={<Check className="w-4 h-4" />}
                                                >
                                                  OK
                                                </Button>
                                                <span className="text-[0.74rem] text-slate-400">press Enter</span>
                                              </div>
                                            </div>
                                          )}

                                          {/* TEXT TYPE */}
                                          {q.type === 'text' && (
                                            <div className="max-w-xl space-y-4">
                                              <textarea
                                                value={answers[q.id] || ''}
                                                onChange={(e) => handleTextChange(q.id, e.target.value)}
                                                placeholder={q.placeholder || "Type your answer here..."}
                                                rows={3}
                                                className="w-full bg-[var(--color-thread-off-white)]/50 border border-black/10 rounded-tr-[24px] p-4 text-[var(--color-thread-dark-slate)] placeholder:text-[var(--color-thread-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--color-thread-mid-green)]/20 focus:border-[var(--color-thread-mid-green)]/30 transition-all font-sans text-[0.95rem] resize-none"
                                              />
                                              {/* Navigation OK button */}
                                              <div className="flex items-center gap-3">
                                                <Button
                                                  onClick={handleNextQuestion}
                                                  variant="mint"
                                                  className="px-5 py-2.5 min-h-[40px] shadow-none"
                                                  rightIcon={<Check className="w-4 h-4" />}
                                                >
                                                  OK
                                                </Button>
                                                <span className="text-[0.74rem] text-slate-400">press Enter or Ctrl+Enter</span>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })()}
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="review"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  transition={{ duration: 0.3 }}
                                  className="space-y-6"
                                >
                                  <div>
                                    <h3 className="font-serif font-normal text-2xl text-[var(--color-thread-heading)] mb-1.5">Review your answers</h3>
                                    <p className="text-[var(--color-thread-gray)] text-[0.92rem] leading-relaxed">Click on any question to change your answer before saving.</p>
                                  </div>

                                  <div className="space-y-3 max-w-xl border-t border-b border-black/5 py-4 my-2 max-h-[300px] overflow-y-auto pr-1">
                                    {(QUESTIONS[qSection || ''] || []).map((q, idx) => {
                                      const ansVal = answers[q.id];
                                      const displayAns = Array.isArray(ansVal) 
                                        ? ansVal.join(', ') 
                                        : ansVal || <span className="text-rose-500 italic font-normal">Not answered</span>;
                                      return (
                                        <button
                                          key={q.id}
                                          onClick={() => {
                                            setActiveQuestionIndex(idx);
                                            setIsReviewing(false);
                                          }}
                                          className="w-full text-left p-4 rounded-tr-[20px] border border-black/5 hover:border-[var(--color-thread-mid-green)]/40 hover:bg-[var(--color-thread-off-white)]/50 transition-all flex justify-between items-start gap-4 cursor-pointer group"
                                        >
                                          <div className="space-y-1.5">
                                            <div className="text-[0.6rem] font-medium text-slate-400 uppercase tracking-[0.12em] group-hover:text-[var(--color-thread-mid-green)] transition-colors">Question {idx + 1}</div>
                                            <div className="text-[0.95rem] font-medium text-slate-800 leading-snug">{q.text.replace(/\$\{childName\}/g, formData.firstName || 'your child')}</div>
                                            <div className="text-sm text-[var(--color-thread-mid-green)] font-semibold bg-[var(--color-thread-light-green)] inline-block px-3 py-1 rounded-lg mt-2">{displayAns}</div>
                                          </div>
                                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors mt-1" />
                                        </button>
                                      );
                                    })}
                                  </div>

                                  <div className="flex gap-3">
                                    <Button
                                      onClick={() => {
                                        saveCurrentChildIntake();
                                        setQSection(null);
                                        setIsReviewing(false);
                                        setIsModalOpen(false);
                                      }}
                                      variant="mint"
                                      className="px-5 py-2.5 min-h-[40px] shadow-none"
                                    >
                                      Confirm & Save Section
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        setIsReviewing(false);
                                        setActiveQuestionIndex(0);
                                      }}
                                      variant="muted"
                                      className="px-5 py-2.5 min-h-[40px] shadow-none"
                                    >
                                      Back to start
                                    </Button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Footer Navigation */}
                          <div className="pt-5 pb-6 px-6 sm:px-10 border-t border-black/5 flex items-center justify-between">
                            {/* Progress bar / index indicator */}
                            <div className="flex items-center gap-4">
                              <span className="text-[0.78rem] font-medium text-slate-400">
                                {!isReviewing 
                                  ? `${activeQuestionIndex + 1} of ${(QUESTIONS[qSection || ''] || []).length}`
                                  : 'Review screen'
                                }
                              </span>
                              {!isReviewing && (
                                <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-[var(--color-thread-mid-green)] transition-all duration-300"
                                    style={{ width: `${((activeQuestionIndex + 1) / (QUESTIONS[qSection || ''] || []).length) * 100}%` }}
                                  />
                                </div>
                              )}
                            </div>

                            {/* Up/Down buttons and navigation guides */}
                            <div className="flex items-center gap-2">
                              <span className="text-[0.74rem] text-slate-400 hidden sm:inline-block font-medium">Use arrow keys to navigate</span>
                              <div className="flex border border-black/10 rounded-full overflow-hidden bg-white">
                                <button
                                  onClick={handlePrevQuestion}
                                  disabled={activeQuestionIndex === 0 && !isReviewing}
                                  className={cn(
                                    "p-2.5 hover:bg-[var(--color-thread-off-white)] transition-all border-r border-black/10 cursor-pointer text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
                                  )}
                                  title="Previous (Arrow Up)"
                                >
                                  <ArrowUp className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={handleNextQuestion}
                                  disabled={isReviewing}
                                  className={cn(
                                    "p-2.5 hover:bg-[var(--color-thread-off-white)] transition-all cursor-pointer text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
                                  )}
                                  title="Next (Arrow Down)"
                                >
                                  <ArrowDown className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                  </AnimatePresence>

                  {/* Step 5 */}
                  {step === 5 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                      <div>
                        <span className={sectionKickerClass}>Step 5 of 5 · Helpful documents</span>
                        <h1 className={stepHeadingClass}>Add any helpful documents</h1>
                        <p className={stepLeadClass}>Anything that helps your clinician understand {formData.firstName || 'your child'} — all optional, and you can add more after your session.</p>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between items-baseline mb-3">
                            <Label className="mb-0">Reports & Notes</Label>
                            <span className="text-[0.78rem] text-slate-400">optional</span>
                          </div>
                          
                          <div 
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={triggerFileInput}
                            className={cn(
                              "rounded-tr-[32px] p-10 text-center cursor-pointer transition-all group relative",
                              isDragging 
                                ? "bg-[var(--color-thread-light-green)]/60"
                                : "bg-[var(--color-thread-light-green)]/30 hover:bg-[var(--color-thread-light-green)]/50"
                            )}
                          >
                            <input 
                              type="file" 
                              ref={fileInputRef} 
                              onChange={handleFileSelect} 
                              className="hidden" 
                              multiple 
                              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                            />
                            <PageIcon variant="white" icon={<Upload className="w-[22px] h-[22px] stroke-[1.7]" />} className="mx-auto" />
                            <div className="text-[1.12rem] font-medium tracking-tight leading-[1.3] text-[var(--color-thread-dark-slate)]">
                              Drag and drop a file here, or click to upload manually
                            </div>
                            <div className="text-[0.82rem] text-slate-500 mt-2">
                              PDF, DOC, DOCX, XLS or PNG. Max size 25MB.
                            </div>
                          </div>
                        </div>

                        {/* List of uploaded files */}
                        {uploadedFiles.length > 0 && (
                          <div className="space-y-2">
                            <span className={smallFieldLabelClass}>Uploaded files ({uploadedFiles.length})</span>
                            <div className="flex flex-col gap-2">
                              {uploadedFiles.map((file, idx) => (
                                <div 
                                  key={idx} 
                                  className="flex items-center justify-between p-3.5 bg-white border border-black/5 rounded-tr-[18px] hover:shadow-xs transition-shadow"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[var(--color-thread-light-green)] text-[var(--color-thread-mid-green)] flex items-center justify-center">
                                      <FileText className="w-5 h-5 stroke-[1.7]" />
                                    </div>
                                    <div className="text-left">
                                      <div className="text-sm font-medium text-slate-800 line-clamp-1">{file.name}</div>
                                      <div className="text-xs text-slate-400 font-mono">{file.size}</div>
                                    </div>
                                  </div>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeFile(idx);
                                    }}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all cursor-pointer"
                                    title="Remove file"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                </div>

                {/* Unified In-Card navigation footer inside the card container */}
                {true && (
                  <div className="flex items-center justify-between pt-8 border-t border-black/5 mt-12 w-full">
                    <button 
                      onClick={handleBack} 
                      className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <div className="flex items-center gap-5">
                      {step === 5 && (
                        <button 
                          onClick={handleNext} 
                          className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                          Skip for now
                        </button>
                      )}
                      <Button onClick={handleNext} variant={step === 5 ? "forest" : "mint"} className="px-6 shadow-none">
                        {step === 5 ? 'Finish setup' : 'Continue'} <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}
              </main>
            </>
          )}

          {/* SETUP COMPLETE DONE SCREEN */}
          {step === 'done' && (
            <>
              {/* Left Column: Completion congratulations */}
              <div className="w-full md:w-3/5 p-8 sm:p-12 md:p-14 flex flex-col justify-between gap-10">
                <div className="space-y-8">
                  <div>
                    <span className={sectionKickerClass}>Setup complete</span>
                    <h1 className={stepHeadingClass}>You're all set.</h1>
                    <p className={stepLeadClass}>{formData.firstName || 'Your child'}'s space is ready and your session is booked. Here's what we have, and what happens next.</p>
                  </div>
                  
                  <div className="bg-[var(--color-thread-off-white)]/70 p-5 rounded-tr-[24px] border border-black/5 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-thread-mid-green)] flex items-center justify-center text-white">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[0.6rem] font-medium tracking-[0.12em] uppercase text-slate-400 mb-0.5">Your child</div>
                        <div className="font-medium text-slate-900">{formData.firstName || 'Child'} · {formData.dob ? 'Added' : '9 years old'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 border-t border-black/5 pt-4">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-thread-mid-green)] flex items-center justify-center text-white">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[0.6rem] font-medium tracking-[0.12em] uppercase text-slate-400 mb-0.5">Session booked</div>
                        <div className="font-medium text-slate-900">{formData.sessionDay ? `Thu ${formData.sessionDay} Jun, ${formData.sessionTime || '4:00 pm'}` : 'Thu 26 Jun, 4:00 pm'} · Dr. Naomi Clark</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t border-black/5 pt-4">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          remainingQuestionnaireSections === 0
                            ? "bg-[var(--color-thread-mid-green)] text-white"
                            : "border-2 border-amber-500 text-amber-500"
                        )}>
                          {remainingQuestionnaireSections === 0 ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <span className="text-xs font-bold">!</span>
                          )}
                        </div>
                        <div>
                          <div className="text-[0.6rem] font-medium tracking-[0.12em] uppercase text-slate-400 mb-0.5">Questionnaire</div>
                          <div className="font-medium text-slate-900">
                            {remainingQuestionnaireSections === 0
                              ? 'All sections complete'
                              : `${remainingQuestionnaireSections} of ${Object.keys(QUESTIONS).length} sections left`}
                          </div>
                        </div>
                      </div>
                      {remainingQuestionnaireSections === 0 ? (
                        <span className="text-[0.6rem] tracking-[0.1em] uppercase font-medium px-2.75 py-1.5 rounded-full bg-[var(--color-thread-light-green)] text-[var(--color-thread-mid-green)]">
                          Completed
                        </span>
                      ) : (
                        <button
                          onClick={() => setStep(4)}
                          className="text-xs font-semibold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100/70 px-3 py-1.5 rounded-full transition-all flex items-center gap-1 cursor-pointer"
                        >
                          Finish <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t border-black/5 pt-4">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          uploadedFiles.length > 0
                            ? "bg-[var(--color-thread-mid-green)] text-white"
                            : "bg-white border border-black/10 text-slate-400"
                        )}>
                          {uploadedFiles.length > 0 ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Upload className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div className="text-[0.6rem] font-medium tracking-[0.12em] uppercase text-slate-400 mb-0.5">Documents</div>
                          <div className="font-medium text-slate-900">
                            {uploadedFiles.length > 0
                              ? `${uploadedFiles.length} ${uploadedFiles.length === 1 ? 'file' : 'files'} uploaded`
                              : 'No documents added yet'}
                          </div>
                        </div>
                      </div>
                      <span className={cn(
                        "text-[0.6rem] tracking-[0.1em] uppercase font-medium px-2.75 py-1.5 rounded-full",
                        uploadedFiles.length > 0
                          ? "bg-[var(--color-thread-light-green)] text-[var(--color-thread-mid-green)]"
                          : "bg-[var(--color-thread-off-white)] text-[var(--color-thread-gray)] border border-black/10"
                      )}>
                        {uploadedFiles.length > 0 ? "Added" : "Optional"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-black/5 w-full">
                  <Button onClick={onComplete} variant="mint" className="px-8 shadow-none w-full sm:w-auto">
                    Go to your family home <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Right Column: Next steps timeline & setup another child */}
              <div className="w-full md:w-2/5 bg-transparent p-8 sm:p-10 border-t md:border-t-0 md:border-l border-black/5 flex flex-col justify-start space-y-8 overflow-y-auto">
                <div>
                  <span className="text-[0.75rem] tracking-[0.1em] uppercase text-[var(--color-thread-mid-green)] font-medium mb-6 block">What happens next</span>
                  <div className="relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-black/5">
                    <TimelineStep
                      title="Before your session"
                      meta="Questionnaire"
                      metaTag="Step 1"
                      description="Finish the questionnaire so Dr. Clark has the full picture."
                      active
                    />
                    <TimelineStep
                      title={`Your session — ${formData.sessionDay ? `Thu ${formData.sessionDay} Jun` : 'Thu 26 Jun'}`}
                      meta="Telehealth"
                      metaTag="Step 2"
                      description="Meet Dr. Clark on a video call from home."
                      todo
                    />
                    <TimelineStep
                      title="After your session"
                      meta="Results"
                      metaTag="Step 3"
                      description="She reviews everything, then your result and first priorities appear."
                      todo
                    />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-tr-[24px] border border-black/5 shadow-none">
                  <h4 className="font-medium text-[var(--color-thread-heading)] text-sm mb-1">Setting up another child?</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">Each child has their own session, assessment and documents.</p>
                  <Button variant="muted" className="w-full text-xs py-2" onClick={() => {
                    setFormData({
                      firstName: '', dob: '', relation: 'Parent', notices: [], notes: '', sessionDay: '', sessionTime: ''
                    });
                    setStep(1);
                  }}>
                    Set up another child
                  </Button>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
    </>
  );
}
