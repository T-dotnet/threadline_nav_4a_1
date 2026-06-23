import { Child } from './types';

export interface ChildData {
  home: {
    focusTitle: string;
    focusDescription: string;
    focusAction: string;
    timeline: {
      now: { title: string; meta: string; content: string };
      next: { title: string; meta: string; content: string };
      later: { title: string; meta: string; content: string };
    };
    emerging: { title: string; description: string };
  };
  understanding: {
    description: string;
    focusAreas: { title: string; description: string; sources: string[] }[];
  };
  priorities: {
    description: string;
  };
}

export const getChildData = (child: Child): ChildData => {
  if (child.name === 'Liam') {
    return {
      home: {
        focusTitle: 'Leadership & Mastery',
        focusDescription: 'Liam has achieved all core developmental targets. Current focus is on horizontal skills like leadership and long-term consolidation.',
        focusAction: 'Review the leadership-readiness roadmap',
        timeline: {
          now: { title: 'Social Integration', meta: 'Goal met · Maintenance phase', content: 'Liam is successfully generalizing social routines across all environments.' },
          next: { title: 'Peer Leadership', meta: 'Next phase · Starting next month', content: 'Focusing on Liam taking active mentoring roles in school creative projects.' },
          later: { title: 'Annual Benchmarking', meta: 'Scheduled · March 2027', content: 'Routine verification to ensure all gains remain robust over time.' }
        },
        emerging: { title: 'Sustained Mastery', description: 'Liam continues to demonstrate high retention of co-regulation strategies in unstructured settings.' }
      },
      understanding: {
        description: 'Liam has achieved all current developmental milestones. He is now demonstrating marked improvements in task persistence and creative depth, maintaining 100% goal alignment.',
        focusAreas: [
          { title: 'Self-Correction Mastery', description: 'Liam identifies frustration triggers early and self-corrects without intervention in 90% of observed sessions.', sources: ['You', 'Teacher', 'Clinician'] },
          { title: 'Task Endurance', description: 'Liam can follow multi-step instructions and remain engaged in complex play for over 45 minutes.', sources: ['You', 'Teacher'] }
        ]
      },
      priorities: {
        description: 'Liam has met all core priorities. Focus shifted to maintenance and advanced social leadership frameworks.'
      }
    };
  }
  
  if (child.name === 'Sophia') {
    return {
      home: {
        focusTitle: 'Executive function',
        focusDescription: 'This is the priority most likely to improve Sophia\'s day right now — it\'s affecting her ability to manage complex school assignments and reduces stress.',
        focusAction: 'Set up the visual assignment planner',
        timeline: {
          now: { title: 'Executive function', meta: 'High impact · started 3 weeks ago', content: 'Struggling with multi-step tasks is causing unnecessary anxiety.' },
          next: { title: 'Peer relationship navigation', meta: 'Moderate impact · prepare over coming months', content: 'Helping Sophia set healthy boundaries with peers is the natural next step.' },
          later: { title: 'Sleep routines', meta: 'Safe to wait · revisit at next review', content: 'Sleep is mostly stable, though occasional late nights studying should be monitored.' }
        },
        emerging: { title: 'Test anxiety', description: 'Sophia has mentioned feeling overwhelmed before assessments. We\'ll monitor this trend.' }
      },
      understanding: {
        description: 'Sophia is a thoughtful, observant child with a strong sense of justice. She is currently navigating the complexities of older peer group dynamics and managing academic pressures in a demanding year.',
        focusAreas: [
          { title: 'Executive Function', description: 'Sophia is mastering time management and organizational strategies for complex assignments, sometimes feeling overwhelmed by long-term projects.', sources: ['You', 'Teacher', 'Sophia'] },
          { title: 'Social Dynamics', description: 'Navigating peer relationships and building resilience against social pressures is a key area of focus for her emotional wellbeing.', sources: ['You', 'Sophia'] }
        ]
      },
      priorities: {
        description: 'We prioritize supporting Sophia\'s organizational confidence and social navigation, providing her with the frameworks to manage her schedule effectively and express her boundaries.'
      }
    };
  }

  // Default to Maya
  return {
    home: {
      focusTitle: 'Classroom attention',
      focusDescription: 'This is the priority most likely to improve Maya\'s day right now — it\'s affecting her learning and her confidence at school.',
      focusAction: 'Share the classroom strategy pack with Maya\'s teacher',
      timeline: {
        now: { title: 'Classroom attention', meta: 'High impact · started 2 weeks ago', content: 'Trouble staying focused in class is currently the biggest drag on Maya\'s learning and self-confidence. Addressing it first tends to make other supports work better too.' },
        next: { title: 'Emotional regulation at home', meta: 'Moderate impact · prepare over coming months', content: 'Home routines are holding steady for now. Once attention at school improves, this is the natural next place to focus — so it\'s worth keeping on your radar.' },
        later: { title: 'Friendships & social connection', meta: 'Safe to wait · revisit at next review', content: 'Maya has steady friendships right now. This doesn\'t need attention today — we\'ll flag it if anything changes, so you can set it down for now.' }
      },
      emerging: { title: 'Sleep may start affecting focus', description: 'Recent check-ins suggest sleep could become a priority soon. Nothing to act on yet — we\'ll let you know if it does.' }
    },
    understanding: {
      description: 'Maya is a bright, imaginative child whose biggest challenge right now is staying focused in structured settings — and it\'s starting to affect her confidence at school. Her social and emotional foundations are strong.',
      focusAreas: [
        { title: 'Classroom Attention', description: 'Maya finds it hard to sustain focus in structured tasks, especially in the classroom. The pattern is consistent across settings and is the clearest theme in everything we\'ve gathered.', sources: ['You', 'Teacher', 'Clinician', 'Maya'] },
        { title: 'Social Emotional Resilience', description: 'Maya has warm, steady friendships and strong emotional awareness, which provides a great foundation to support her learning challenges.', sources: ['You', 'Maya'] }
      ]
    },
    priorities: {
      description: 'We don\'t hand you a list of everything. We rank what matters by its real impact on Maya — and show the reasoning behind every call.'
    }
  };
};
