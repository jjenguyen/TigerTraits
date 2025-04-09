// version that sends quiz results to db
import { Component, EventEmitter, Output } from '@angular/core';
import { QuizService } from './quiz.service';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  // define the view steps for different quiz screens
  viewStep: 'start' | 'quiz' | 'complete' | 'result' = 'start';
  result: string = '';
  resultData: any = null;

  @Output() onSubmit = new EventEmitter<string>();

  // object to hold the answers for each key
  answers = { ie: '', sn: '', tf: '', jp: '' };
  currentQuestion = 0;

  // quiz questions array
  questions = [
    {
      key: 'ie',
      text: "The Homecoming Parade is Today! Where will we find you?",
      options: ["On Tiger Ave losing my voice and being lively with the crowd!", "You won't."],
      gif: 'assets/gifs/Test.gif'
    },
    {
      key: 'sn',
      text: "What a parade! It's time to eat! What kind of food is calling your name?",
      options: ["Shakespeare's Pizza! Can't turn down a Columbia classic!", "I'm tired of the same old rotation. Let's try something new!"],
      gif: 'gif2.gif'
    },
    {
      key: 'tf',
      text: "You're helping set up for an afternoon event. How are you contributing?",
      options: ["I'm trying my best to keep it running smoothly!", "I'm bringing the good vibes and chatting it up!"],
      gif: 'gif3.gif'
    },
    {
      key: 'jp',
      text: "The night is coming to an end and your friends say the evening plans are your call. What's the move?",
      options: ["Ending the night as planned and going home to unwind.", "Let's see where the night takes us!"],
      gif: 'gif4.gif'
    }
  ];

  // map answer choices to a single letter for the result calculation
  map: { [key: string]: string } = {
    "On Tiger Ave losing my voice and being lively with the crowd!": "E",
    "You won't.": "I",
    "Shakespeare's Pizza! Can't turn down a Columbia classic!": "S",
    "I'm tired of the same old rotation. Let's try something new!": "N",
    "I'm trying my best to keep it running smoothly!": "T",
    "I'm bringing the good vibes and chatting it up!": "F",
    "Ending the night as planned and going home to unwind.": "J",
    "Let's see where the night takes us!": "P"
  };

  // result profiles for personality types (ive done 2 testers, but we'll need to add all 16 types)
  resultProfiles: { [key: string]: any } = {
    'INFP': {
      name: 'this is the result if you chose the 2nd opt. for all questions',
      traits: ['imaginative', 'curious', 'spontaneous'],
      leftTags: ['activist', '"not arguing, just explaining why i am right :P"', 'says yes (to everything)'],
      rightTags: ['"i have no comfort zone"', 'chaotic good', 'excellent entertainer and conversationalist'],
      image: 'assets/personas/Speaker’s Circle.png',
      resources: [
        { name: 'intramural sports', link: 'https://mizzourec.missouri.edu/intramural-sports/' },
        { name: '3d printing club', link: 'https://engage.missouri.edu/feeds?type=club&type_id=35448&tab=about' },
        { name: 'start your own organization', link: 'https://getinvolved.missouri.edu/start-an-organization/' },
        { name: 'volunteer with tiger pantry', link: 'https://tigerpantry.missouri.edu/get-involved/apply-to-be-a-pick-up-volunteer/' }
      ],
      // compatibilites still need to be worked on!!!
      // establish routing to the profile pages of 3 users who have the recommended personality types
      compatibilities: [
        { name: 'the columns', image: 'assets/personas/Columns.png', link: '/profile/INTJ' },
        { name: 'mu shamrock', image: 'assets/personas/Shamrock.png', link: '/profile/INFP' },
        { name: 'ghost of harlan', image: 'assets/personas/Ghost of Harlan.png', link: '/profile/INFP' }
      ],
      tagColor: '#FFDFA5',
    },
    'ESTJ': {
      name: 'this is the result if you chose the 1st opt. for all questions',
      traits: ['Trait 1', 'Trait 2', 'Trait 3'],
      leftTags: ['Detail 1', 'Detail 2', 'Detail 3'],
      rightTags: ['Detail 3', 'Detail 4', 'Detail 5'],
      image: 'assets/personas/Shamrock.png',
      resources: [
        { name: 'MU Resource 1', link: 'https://missouri.edu/' },
        { name: 'MU Resource 2', link: 'https://missouri.edu/' },
        { name: 'MU Resource 3', link: 'https://missouri.edu/' },
        { name: 'MU Resource 4', link: 'https://missouri.edu/' }
      ],
      compatibilities: [
        { name: 'Persona1 Name', image: "assets/personas/Kiss the Fifty.png", link: '/profile/INTJ' },
        { name: 'Persona2 Name', image: "assets/personas/Squirrel.png", link: '/profile/INFP' },
        { name: 'Persona3 Name', image: "assets/personas/Truman’s Paw.png", link: '/profile/INFP' }
      ],
      tagColor: '#99CECF',
    },
    // add more persona profiles here... (copy and paste previous template to make it easier!)
  };

  constructor(private quizService: QuizService, private authService: AuthService
  ) {}

  // called when all questions have been answered
  handleSubmit(): void {
    const { ie, sn, tf, jp } = this.answers;
    this.result = `${ie}${sn}${tf}${jp}`; // e.g., "INFP", "ESTJ", etc.
    this.resultData = this.resultProfiles[this.result];
    this.viewStep = 'complete';

    // send the quiz result to the backend
    // get the current user object from authservice
    const currentUser = this.authService.getCurrentUser();
    // pass only the user id (a string) to the quiz service
    this.quizService.storeQuizResult(currentUser.id, this.result).subscribe(
      (response) => {
        console.log('Quiz result stored:', response);
      },
      (error) => {
        console.error('Error storing quiz result:', error);
      }
    );
  }

  // called when an answer choice is selected
  handleSelect(key: string, value: string): void {
    this.answers[key] = this.map[value];

    if (this.currentQuestion < this.questions.length - 1) {
      setTimeout(() => this.currentQuestion++, 100);
    } else {
      this.handleSubmit();
    }
  }

  // checks if a given answer choice is selected for the question
  isSelected(key: string, value: string): boolean {
    return this.answers[key] === this.map[value];
  }
}
