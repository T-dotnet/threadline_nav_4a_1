export interface Question {
  id: string;
  text: string;
  subtext?: string;
  type: 'choice' | 'multiple-choice' | 'text';
  options?: string[];
  placeholder?: string;
}

export const QUESTIONS: Record<string, Question[]> = {
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

export const QUESTIONNAIRE_SECTIONS = Object.keys(QUESTIONS);

export function isAnswered(answer: unknown): boolean {
  if (answer === undefined || answer === null) return false;
  if (Array.isArray(answer)) return answer.length > 0;
  if (typeof answer === 'string') return answer.trim() !== '';
  return true;
}

export function getAnsweredCount(sectionName: string, answers: Record<string, unknown>): number {
  return (QUESTIONS[sectionName] || []).filter((question) => isAnswered(answers[question.id])).length;
}

export function getCompletedQuestionnaireSections(answers: Record<string, unknown>): string[] {
  return QUESTIONNAIRE_SECTIONS.filter((sectionName) => {
    const sectionQuestions = QUESTIONS[sectionName] || [];
    return sectionQuestions.length > 0 && getAnsweredCount(sectionName, answers) === sectionQuestions.length;
  });
}

export function formatAnswer(answer: unknown): string {
  if (Array.isArray(answer)) return answer.join(', ');
  if (typeof answer === 'string') return answer;
  if (answer === undefined || answer === null) return '';
  return String(answer);
}
