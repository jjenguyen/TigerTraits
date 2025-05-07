// version that sends quiz results to db
import { Component, EventEmitter, Output } from '@angular/core';
import { QuizService } from './quiz.service';
import { AuthService } from '../login/auth.service';
import { infoCards, InfoCard } from '../models/infocard';

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
  card: InfoCard | null = null;


  @Output() onSubmit = new EventEmitter<string>();

  //object to hold the answers for question ID
  //handle select dynamically populates key/value pairs for each q.id to mapped letter
  answers: { [questionID: string]: string } = {};
  currentQuestion = 0;

  //updated mapping to map each option Text to a MBTI letter
  map: { [key: string]: string } = {
    "I've got them mapped out and ready to go!": "J",
    "No plan, no problem. Let's see where the day takes us!": "P",
    "I'm craving a bagel from Goldie's. It's such a classic!": "S",
    "I heard a new food truck is in town?! I have to try it!": "N",
    "Analyzing the artwork for Decorate the District!": "T",
    "Dancing my heart out at Jesse Hall!": "F",
    "You won't...": "I",
    "Losing my voice in the crowd!": "E",
    "Shakespeare's or Booche's! Don't mess with traditions man.": "S",
    "Time to try something new! I'm tired of the usual...": "N",
    "Quiet spot, please. I need to recharge.": "I",
    "I'm gonna power through! I'm not missing a thing!": "E",
    "Don't act suprised. I've had this on my calendar for weeks!": "J",
    "I don't know how I got here, but I'm having a good time!": "P",
    "Making sure everything's efficient and on track!": "T",
    "Checking in with everyone and bringing the good vibes!": "F",
    "What do you need from me?! Give me the step-by-step guide and I've got you.": "S",
    "I can handle this, I think I’ve got the big picture!": "N",
    "I'll text them back when I've thought it through.": "I",
    "I've already started the group facetime! We'll figure it out together.": "E",
    "Hang on, let's weigh the pros and cons first.": "T",
    "Hmmm, let's see what the group is feeling.": "F",
    "I'm checking off the last item on the itinerary!": "J",
    "Not sure.. I'm going where the night takes me!": "P"
  };

  //quiz questions array
  //added ID field for easy reference to each q / option combos
  questions = [
    {
      id: "Q1",
      key: 'jp',
      text: "The sun wakes you up bright and early. What are your plans for the day?",
      options: [
        "No plan, no problem. Let's see where the day takes us!",
        "I've got them mapped out and ready to go!"
      ],
      gif: 'assets/gifs/Sun2.gif'
    },
    {
      id: "Q2",
      key: 'sn',
      text: "Your stomach starts to growl. What will you feed it?",
      options: [
        "I'm craving a bagel from Goldie's. It's such a classic!",
        "I heard a new food truck is in town?! I have to try it!"
      ],
      gif: 'assets/gifs/Growl.gif'
    },
    {
      id: "Q3",
      key: 'tf',
      text: "Now that you've silenced your stomach. What's your post-breakfast pick-me-up?",
      options: [
        "Analyzing the artwork for Decorate the District!",
        "Dancing my heart out at Jesse Hall!"
      ],
      gif: 'assets/gifs/Dance2.gif'
    },
    {
      id: "Q4",
      key: 'ie',
      text: "Hurry! The parade is starting. Where will we find you?",
      options: [
        "Losing my voice in the crowd!",
        "You won't..."
      ],
      gif: 'assets/gifs/gif2.gif'
    },
    {
      id: "Q5",
      key: 'sn',
      text: "Lunch break! Where to?",
      options: [
        "Time to try something new! I'm tired of the usual...",
        "Shakespeare's or Booche's! Don't mess with traditions man."
      ],
      gif: 'assets/gifs/gif3.gif'
    },
    {
      id: "Q6",
      key: 'ie',
      options: [
        "Quiet spot, please. I need to recharge.",
        "I'm gonna power through! I'm not missing a thing!"
      ],
      gif: 'assets/gifs/Test.gif'
    },
    {
      id: "Q7",
      key: 'jp',
      text: "You find yourself volunterring at a service event. Why are you here?",
      options: [
        "Don't act suprised. I've had this on my calendar for weeks!",
        "I don't know how I got here, but I'm having a good time!"
      ],
      gif: 'assets/gifs/Test.gif'
    },
    {
      id: "Q8",
      key: 'tf',
      text: "What role do you take on at the service event?",
      options: [
        "Checking in with everyone and bringing the good vibes!",
        "Making sure everything's efficient and on track!",
      ],
      gif: 'assets/gifs/Test.gif'
    },
    {
      id: "Q9",
      key: 'sn',
      text: "Urgent! Someone is asking for your help. How do you jump in?",
      options: [
        "What do you need from me?! Give me the step-by-step guide and I've got you.",
        "I can handle this, I think I’ve got the big picture!"
      ],
      gif: 'assets/gifs/Test.gif'
    },
    {
      id: "Q10",
      key: 'ie',
      text: "Your phone buzzes with friends asking about plans. What's your call?",
      options: [
        "I've already started the group facetime! We'll figure it out together.",
        "I'll text them back when I've thought it through."
      ],
      gif: 'assets/gifs/Buzz.gif'
    },
    {
      id: "Q11",
      key: 'tf',
      text: "You've been downtown for a while. Is it time to move or stay?",
      options: [
        "Hang on, let's weigh the pros and cons first.",
        "Hmmm, let's see what the group is feeling."
      ],
      gif: 'assets/gifs/Test.gif'
    },
    {
      id: "Q12",
      key: 'jp',
      text: "The night is coming to an end. How do you close it out?",
      options: [
        "Not sure.. I'm going where the night takes me!",
        "I'm checking off the last item on the itinerary!"
      ],
      gif: 'assets/gifs/Night.gif'
    }
  ];

  constructor(private quizService: QuizService, private authService: AuthService
  ) {}

  
// called by handleSelect when all questions have been answered
handleSubmit(): void {
  //tallies obj to hold increments by dimension (ie) v (sn) v (tf) v  (jp) 
  const tallies = {
    ie: { E: 0, I: 0 },
    sn: { S: 0, N: 0 },
    tf: { T: 0, F: 0 },
    jp: { J: 0, P: 0 }
  };

  //iterate through each question and grab corresponding ans for each question
  this.questions.forEach(q => {
    //get ans to the question based on the question ID
    const ans = this.answers[q.id];
    //debugging submission issue keep for altering quiz logic during testing
    //console.log(`Question ${q.id} answer: `, ans);

    if (ans) {
      //increment tally at the question 'key' (dimension)... think IvE, SvN, TvF, JvP, and incremement at that letter 
      tallies[q.key][ans]++;
    }
  });


  //return 4 character string based on majority split from tallies obj
  const returnedType =
    (tallies.ie["E"] >= 2 ? "E" : "I") +
    (tallies.sn["S"] >= 2 ? "S" : "N") +
    (tallies.tf["T"] >= 2 ? "T" : "F") +
    (tallies.jp["J"] >= 2 ? "J" : "P");

 
  //look up info card w/ MBTI combo from models/infocard.ts to consolidate infocards
  this.result = returnedType;
  this.resultData = infoCards[this.result];
  this.viewStep = 'complete';

  //send the quiz result to the backend
  //get the current user object from authservice
  const currentUser = this.authService.getCurrentUser();


  //verify here we're passing the user data correctly for results page
  if(currentUser){
    currentUser.personalityType = this.result;
    //update current user to resolve displaying past results bug
    this.authService.setCurrentUser(currentUser);
    //console.log("Updated currentuser with authservice:", currentUser)
  }
  //pass only the user id (a string) to the quiz service
  
  this.quizService.storeQuizResult(currentUser.id, this.result).subscribe({
    next: (response) => {  // <<== ADD response parameter
      console.log('Quiz result successfully stored. Server response:', response);
  
      // compatibility storing added here -jenna
      this.quizService.storeCompatibility(currentUser.id, this.result).subscribe({
        next: (compatibilityResponse) => {  // <<== ADD response for second call
          console.log('Compatibility successfully stored. Server response:', compatibilityResponse);
          
          this.resultData = {
            ...this.resultData,
            matchedUsers: compatibilityResponse.data.matchedUsers
          };
        },
        error: (err) => console.error('Error storing compatibility:', err)
      });
    },
    error: (err) => console.error('Error storing quiz result:', err)
  });  
}

// called when an answer choice is selected
handleSelect(optionText: string): void {
  
  //identify ques obj to reference all elements of current question 
  const ques = this.questions[this.currentQuestion];
  if (!ques) {
    console.error("Question not found for index:", this.currentQuestion);
    return;
  }

  //convert the option text taken in and convert to single letter based on the mappingg
  const mappedAnswer = this.map[optionText];

  //create and store key/value -> ques.id:letter, in the answers set at the question ID
  //ex: q1 : 'J'
  this.answers[ques.id] = mappedAnswer;
  //logg updated answers to show current answers set is taking in /updating the selection properly
  console.log("Updated answers object:", this.answers);

  //iterate over length of the questions to move to next question after setting answers in set
  if (this.currentQuestion < this.questions.length - 1) {
    setTimeout(() => {this.currentQuestion++;}, 150);
  } else {
    this.handleSubmit();
  }
}


isSelected(questionID: string, optionText: string): boolean {
  return this.answers[questionID] === this.map[optionText];
}
};
