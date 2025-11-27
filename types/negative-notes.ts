export interface EmotionLabeling {
  emotion: string;
  intensity: number;
}

export interface NegativeEvent {
  description: string;
  when: string;
  where: string;
  withWhom: string;
  userAction: string;
}

export interface AutomaticThought {
  negativeThoughts: string[];
}

export interface PhysicalReaction {
  reactions: string[];
}

export interface DesiredState {
  idealState: string;
  desiredTreatment: string;
  desiredFeeling: string;
}

// Cognitive Behavioral Therapy
export interface CBTEntry {
  emotionLabeling: EmotionLabeling;
  negativeEvent: NegativeEvent;
  automaticThought: AutomaticThought;
  physicalReaction: PhysicalReaction;
  desiredState: DesiredState;
}
