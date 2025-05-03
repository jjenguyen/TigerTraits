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
    "Analyzing the artwork for Decorate the District": "T",
    "Dancing my heart out at Jesse Hall": "F",
    "You won't..": "I",
    "Losing my voice in the crowd!": "E",
    "Shakespeare's or Booche's! Don't mess with traditions man.": "S",
    "Time to try something new! I'm tired of the usual..": "N",
    "Quiet spot, please. I need to recharge.": "I",
    "I'm gonna power through! I'm not missing a thing!": "E",
    "Don't act suprised. I've had this on my calendar for weeks!": "J",
    "I don't know how I got here, but I'm having a good time!": "P",
    "Making sure everything's efficient and on track!": "T",
    "Checking in with everyone and bringing the good vibes!": "F",
    "What do you need from me?! Give me the step-by-step guide and I've got you.": "S",
    "I can handle this, I think I’ve got the big picture!": "N",
    "I'll text them back when I've thought it through": "I",
    "I've already started the group facetime! We'll figure it out together": "E",
    "Hang on, let's weigh the pros and cons first": "T",
    "Hmmm, let's see what the group is feeling": "F",
    "I'm checking off the last item on the itinerary!": "J",
    "Not sure.. I'm going where the night takes me!": "P"
  };

  //quiz questions array
  //added ID field for easy reference to each q / option combos
  questions = [
    {
      id: "Q1",
      key: 'jp',
      // text: "Good morning! Was your plan for today set last night? Or are you keeping your options open and letting the day unfold?",
      text: "The sun wakes you up bright and early. What are your plans for the day?",
      options: [
        "I've got them mapped out and ready to go!",
        "No plan, no problem. Let's see where the day takes us!"
      ],
      gif: 'assets/gifs/Sun2.gif'
    },
    {
      id: "Q2",
      key: 'sn',
      // text: "Breakfast time! Are you grabbing your favorite, go-to bagel from Goldie’s? Or did that new food truck down the street spark your curiosity?",
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
      // text: "After your breakfast, are you debating with friends to determine which artwork on display for Decorate the District is the best, or are you enjoying Fling’s comedy and dance at Jesse Hall?",
      text: "Now that you've silenced your stomach. What's your post-breakfast pick-me-up?",
      options: [
        "Analyzing the artwork for Decorate the District",
        "Dancing my heart out at Jesse Hall"
      ],
      gif: 'assets/gifs/Dance2.gif'
    },
    {
      id: "Q4",
      key: 'ie',
      // text: "It’s time to head to the Homecoming Parade! Are you on Tiger Ave, lively with the crowd? Or are you at a quieter balcony with a few friends overlooking the parade?",
      text: "Hurry! The parade is starting. Where will we find you?",
      options: [
        "You won't..",
        "Losing my voice in the crowd!"
      ],
      gif: 'assets/gifs/gif2.gif'
    },
    {
      id: "Q5",
      key: 'sn',
      text: "Lunch break! Where to?",
      options: [
        "Shakespeare's or Booche's! Don't mess with traditions man.",
        "Time to try something new! I'm tired of the usual.."
      ],
      gif: 'assets/gifs/gif3.gif'
    },
    {
      id: "Q6",
      key: 'ie',
      // text: "Woo! A bustling parade, followed by a great lunch! Is it time to retreat home and relax for a while? Or is there just too much to go do and see on a day like today?",
      text: "You feel a food coma coming after lunch. What's your move?",
      options: [
        "Quiet spot, please. I need to recharge.",
        "I'm gonna power through! I'm not missing a thing!"
      ],
      gif: 'assets/gifs/Test.gif'
    },
    {
      id: "Q7",
      key: 'jp',
      // text: "You are volunteering at a service event for Homecoming weekend. Have you been looking forward to this event, planned for weeks? Or did you just happen to stumble upon it and jump at the opportunity to help out?",
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
      // text: "Are you analyzing the service event’s goal, jumping in where you can to help make sure everything runs smoothly? Or are you connecting with those around you, keeping spirits high, and making sure everyone’s doing okay?",
      text: "What role do you take on at the service event?",
      options: [
        "Making sure everything's efficient and on track!",
        "Checking in with everyone and bringing the good vibes!"
      ],
      gif: 'assets/gifs/Test.gif'
    },
    {
      id: "Q9",
      key: 'sn',
      // text: "You’ve found a team at the service event that needs your help! Are you asking for step-by-step instructions so you can help out practically? Or are you looking at the big picture of the process and figuring out how to resolve the underlying issue yourself?",
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
      // text: "After the service event, your phone buzzes. It’s your friends, wondering what you’re doing and your plan for the rest of the day. Do you prefer texting them back to give yourself time to reflect and think? Or do you excitedly call them to talk about it?",
      text: "Your phone buzzes with friends asking about plans. What's your call?",
      options: [
        "I'll text them back when I've thought it through",
        "I've already started the group facetime! We'll figure it out together"
      ],
      gif: 'assets/gifs/Buzz.gif'
    },
    {
      id: "Q11",
      key: 'tf',
      // text: "You’ve been at a downtown business for a while. Are you weighing the pros and cons of moving to the next spot? Or are you going when the group consensus says it’s time?",
      text: "You've been downtown for a while. Is it time to move or stay?",
      options: [
        "Hang on, let's weigh the pros and cons first",
        "Hmmm, let's see what the group is feeling"
      ],
      gif: 'assets/gifs/Test.gif'
    },
    {
      id: "Q12",
      key: 'jp',
      // text: "It’s almost evening in Columbia. Are you sticking with your evening plans you discussed this morning? Or did you keep your options open and go with the flow?",
      text: "The night is coming to an end. How do you close it out?",
      options: [
        "I'm checking off the last item on the itinerary!",
        "Not sure.. I'm going where the night takes me!"
      ],
      gif: 'assets/gifs/Night.gif'
    }
  ];

  // in reverse order from MBTI mapping table
  //ps '#99CECF' is listed as the tag color for all 16 types, currently not being referenced in the .html for the component, maybe we change this, maybe not? 
  //could do tag coloring based off persona image colors, group them by 'SF', 'ST', 'NT', 'NF', etc, 
  resultProfiles: { [key: string]: any } = {
    // sm validated 042125
    //template
    'ESFP': {
      name: 'Sparky`s',
      traits: ['Spontaneous', 'Great Performer', 'Enthusiastic'],
      leftTags: ['Not openly angry', '*comes late*', 'Quick thinker'],
      rightTags: ['Acts unbothered, actually is', 'Hates if you underrate them', 'Likes sharing their plans'],
      image: 'assets/personas/ESFP.png',
      resources: [
        { name: 'Comedy Wars', link: 'https://www.instagram.com/comedy_wars/' },
        { name: 'Caring for Columbia', link: 'https://www.instagram.com/caring4columbia/' },
        { name: 'Tigers For A Cause', link: 'https://getinvolved.missouri.edu/volunteer-opportunities/' },
        { name: 'Tiger Pantry and Truman`s Closet', link: 'https://www.instagram.com/tigerpantry/?hl=en' }
      ],
      compatibilities: [
        { name: 'Kiss the 50', image: "assets/personas/ISFJ.png", link: '/profile/ISFJ' },
        { name: 'Heidelberg', image: "assets/personas/ESFJ.png", link: '/profile/ESFJ' },
        { name: 'Mizzou Squirrel', image: "assets/personas/ENFP.png", link: '/profile/ENFP' }
      ],
      tagColor: '#99CECF',
    },
    // sm validated 042125
    //template
    'ESTP': {
      name: 'Mizzou Helmet',
      traits: ['Entrepreneurial', 'Energetic', 'Social'],
      leftTags: ['Prioritizes harmony', 'Bursts of energy', 'Usually laid back'],
      rightTags: ['Good at reading the room', 'Attention seeking', 'Likes impressing others'],
      image: 'assets/personas/ESTP.png',
      resources: [
        { name: 'Collegiate DECA', link: 'https://www.instagram.com/mizzou_deca/' },
        { name: 'Mizzou Racing', link: 'https://www.instagram.com/mizzouracing/?hl=en' },
        { name: 'Entrepreneurship Alliance', link: 'https://business.missouri.edu/entrepreneurship-alliance' },
        { name: 'Intramural Sports', link: 'https://mizzourec.missouri.edu/intramural-sports/' }
      ],
      compatibilities: [
        { name: 'Kiss The 50', image: "assets/personas/ISFJ.png", link: '/profile/ISFJ' },
        { name: 'Sparky`s', image: "assets/personas/ESFP.png", link: '/profile/ESFP' },
        { name: 'Mort`s Wall', image: "assets/personas/ISTJ.png", link: '/profile/ISTJ' }
      ],
      tagColor: '#99CECF',
    },
    // sm validated 042125
    //template
    'ISFP': {
      name: 'Shamrock',
      traits: ['Self-Expressive', 'Charming & Flexible', 'Always Ready to Explore'],
      leftTags: ['Stoic facial expressions', 'Very patient', '1st to speak up against people who act "badly"'],
      rightTags: ['Adventure oriented', 'Suddenly vocal once their values are a talk', 'Doesn`t want the spotlight, just wants to exist'],
      image: 'assets/personas/ISFP.png',
      resources: [
        { name: 'MU Outdoors', link: 'https://www.instagram.com/mu.outdoors/' },
        { name: 'Best Buddies', link: 'https://www.facebook.com/bestbuddiesmizcomo/' },
        { name: 'Comedy Wars', link: 'https://www.instagram.com/comedy_wars/' },
        { name: 'Freestyle Your Expression', link: 'https://www.instagram.com/fyemizzou/' }
      ],
      compatibilities: [
        { name: 'Heidelberg', image: "assets/personas/ESFJ.png", link: '/profile/ESFJ' },
        { name: 'Jesse Hall Dome', image: "assets/personas/ENFJ.png", link: '/profile/ENFJ' },
        { name: 'Kiss The 50', image: "assets/personas/ISFJ.png", link: '/profile/ISFJ' }
      ],
      tagColor: '#99CECF',
    },
    // sm validated 042125
    //template
    'ISTP': {
      name: 'BoatHenge',
      traits: ['Bold', 'Practical', 'Experimenter'],
      leftTags: ['Really calm energy', 'Stubborn to no end', 'Kind of like a mix between a cat and a dog'],
      rightTags: ['Prefers doing things their way', 'Funny remarks, always', 'LOVES puzzles and food for thought'],
      image: 'assets/personas/ISTP.png',
      resources: [
        { name: 'Mizzou Racing', link: 'https://www.instagram.com/mizzouracing/?hl=en' },
        { name: 'MU Outdoors', link: 'https://www.instagram.com/mu.outdoors/' },
        { name: 'Mizzou Club Running', link: 'https://www.instagram.com/mizclubrunning/?hl=en' },
        { name: 'Intramural Sports', link: 'https://mizzourec.missouri.edu/intramural-sports/' }
      ],
      compatibilities: [
        { name: 'Heidelberg', image: "assets/personas/ESFJ.png", link: '/profile/ESFJ' },
        { name: 'Shamrock', image: "assets/personas/ISFP.png", link: '/profile/ISFP' },
        { name: 'Mizzou Helmet', image: "assets/personas/ESTP.png", link: '/profile/ESTP' }
      ],
      tagColor: '#99CECF',
    },
    // sm validated 042125
    //template
    'ESFJ': {
      name: 'Heidelberg',
      traits: ['Caring', 'Social & Popular', 'Helpful'],
      leftTags: ['MOST extroverted', 'Kinda oblivious', 'Judges you, helps anyway'],
      rightTags: ['self-sacrificing', 'Kind of stuck in the past', 'Nosy, because they want to get to know you'],
      image: 'assets/personas/ESFJ.png',
      resources: [
        { name: 'Mizzou Tour Team', link: 'https://www.instagram.com/mizzoutourteam/?hl=en' },
        { name: 'Mizzou Homecoming Steering Committee', link: 'https://www.mizzou.com/s/1002/alumni/19/interior.aspx?sid=1002&gid=1001&sitebuilder=1&pgid=10482' },
        { name: 'STRIPES', link: 'https://stripes.missouri.edu/' },
        { name: 'Caring for Columbia', link: 'https://www.instagram.com/caring4columbia/' }
      ],
      compatibilities: [
        { name: 'Shamrock', image: "assets/personas/ISFP.png", link: '/profile/ISFP' },
        { name: 'BoatHenge', image: "assets/personas/ISTP.png", link: '/profile/ISTP' },
        { name: 'Big MO', image: "assets/personas/ESTJ.png", link: '/profile/ESTJ' }
      ],
      tagColor: '#99CECF',
    },
    // sm validated 042125
    //template
    'ESTJ': {
      name: 'Big MO',
      traits: ['Excellent Administrator', 'Leader', 'Strong Willed'],
      leftTags: ['Laughing at their own jokes', '*smiling*', 'Notices what is wrong fast'],
      rightTags: ['Good sense of humor', 'Always in a good mood', 'Likes their routine'],
      image: 'assets/personas/ESTJ.png',
      resources: [
        { name: 'Mizzou Homecoming Steering Committee', link: 'https://www.mizzou.com/s/1002/alumni/19/interior.aspx?sid=1002&gid=1001&sitebuilder=1&pgid=10482' },
        { name: 'Leadership @ Mizzou', link: 'https://getinvolved.missouri.edu/leadership-opportunities/' },
        { name: 'Climate Leaders at Mizzou', link: 'https://www.instagram.com/climateleadersmu/?hl=en' },
        { name: 'MU Presidents` Council', link: 'https://studentaffairs.missouri.edu/presidents-council/' }
      ],
      compatibilities: [
        { name: 'Kiss The 50', image: "assets/personas/ISFJ.png", link: '/profile/ISFJ' },
        { name: 'Mort`s Wall', image: "assets/personas/ISTJ.png", link: '/profile/ISTJ' },
        { name: 'Heidelberg', image: "assets/personas/ESFJ.png", link: '/profile/ESFJ' }
      ],
      tagColor: '#99CECF',
    },
    // sm validated 042125
    //template
    'ISFJ': {
      name: 'Kiss The 50',
      traits: ['Dedicated', 'People-Oriented', 'Warm Protector'],
      leftTags: ['Very sociable', 'Feels overlooked', '"If no one else is gonna do it... *sigh*"'],
      rightTags: ['Likes creating things', 'Doesn`t like improvising', 'Forgives and gives many chances'],
      image: 'assets/personas/ISFJ.png',
      resources: [
        { name: 'Mindful Mizzou', link: 'https://www.umsystem.edu/totalrewards/wellness/mindfulness' },
        { name: 'Sustain Mizzou', link: 'https://www.instagram.com/sustainmizzou/' },
        { name: 'STRIPES', link: 'https://stripes.missouri.edu/' },
        { name: 'Caring for Columbia', link: 'https://www.instagram.com/caring4columbia/' }
      ],
      compatibilities: [
        { name: 'Sparky`s', image: "assets/personas/ESFP.png", link: '/profile/ESFP' },
        { name: 'Mizzou Helmet', image: "assets/personas/ESTP.png", link: '/profile/ESTP' },
        { name: 'Mort`s Wall', image: "assets/personas/ISTJ.png", link: '/profile/ISTJ' }
      ],
      tagColor: '#99CECF',
    },
    // sm validated 042125
    //template
    'ISTJ': {
      name: 'Mort`s Wall',
      traits: ['Practical', 'Fact-Minded', 'Traditional'],
      leftTags: ['Secretly a huge nerd', 'Oop - over achieved again...', 'Ambitious, just not talking about it'],
      rightTags: ['*smirks*', 'Has clear boundaries', 'Wants others to build independence'],
      image: 'assets/personas/ISTJ.png',
      resources: [
        { name: 'Alumni Association Student Board', link: 'https://www.instagram.com/mizzouaasb/?hl=en' },
        { name: 'Collegiate DECA', link: 'https://www.instagram.com/mizzou_deca/' },
        { name: 'Mizzou 2', link: 'https://www.instagram.com/mizzou2.mu/' },
        { name: 'Mizzou Billiards Club', link: 'https://www.instagram.com/mizzoubilliardsclub/' }
      ],
      compatibilities: [
        { name: 'Mizzou Helmet', image: "assets/personas/ESTP.png", link: '/profile/ESTP' },
        { name: 'Heidelberg', image: "assets/personas/ESFJ.png", link: '/profile/ESFJ' },
        { name: 'Kiss The 50', image: "assets/personas/ISFJ.png", link: '/profile/ISFJ' }
      ],
      tagColor: '#99CECF',
    },
    // sm validated 042125
    //template
    'ENFP': {
      name: 'Mizzou Squirrel',
      traits: ['Enthusiastic', 'Creative', 'Sociable'],
      leftTags: ['Gives you an essay on their passions', 'Talks a LOT', 'Procrastination tendencies'], 
      rightTags: ['Stubborn', 'So many hand gestures', 'Needs to express themselves'],
      image: 'assets/personas/ENFP.png',
      resources: [
        { name: 'Involvement Ambassadors', link: 'https://www.instagram.com/mizgetinvolved/' },
        { name: 'The Mizzou Education Bank', link: 'https://www.instagram.com/mizzoueducationbank/' },
        { name: 'Caring for Columbia', link: 'https://www.instagram.com/caring4columbia/' },
        { name: 'Campus Activities Programming Board', link: 'https://www.instagram.com/stufftodoatmu/?hl=en' }
      ],
      compatibilities: [
        { name: 'Ghost Of Harlan', image: "assets/personas/INFJ.png", link: '/profile/INFJ' },
        { name: 'The Big Tree', image: "assets/personas/INTJ.png", link: '/profile/INTJ' },
        { name: 'Truman`s Paw', image: "assets/personas/INFP.png", link: '/profile/INFP' }
      ],
      tagColor: '#99CECF',
    },
    // sm validated 042125
    //template
    'ENFJ': {
      name: 'Jesse Hall Dome',
      traits: ['Charismatic', 'Inspiring', 'Leader'],
      leftTags: ['Such a loud laugher', 'Into many very nerdy topics', 'Smile with a drop of mischief behind it'],
      rightTags: ['Overly happy go lucky', 'Loyalty is very important', 'Biggest schemer out there'],
      image: 'assets/personas/ENFJ.png',
      resources: [
        { name: 'Leadership @ Mizzou', link: 'https://getinvolved.missouri.edu/leadership-opportunities/' },
        { name: 'MU Philanthropy', link: 'https://www.instagram.com/mizmsf/?hl=en' },
        { name: 'Camp Kesem', link: 'https://www.facebook.com/KesemMizzou/' },
        { name: 'College Mentors for Kids', link: 'https://www.instagram.com/collegementors.mizzou/' }
      ],
      compatibilities: [
        { name: 'Truman`s Paw', image: "assets/personas/INFP.png", link: '/profile/INFP' },
        { name: 'Shamrock', image: "assets/personas/ISFP.png", link: '/profile/ISFP' },
        { name: 'Ghost Of Harlan', image: "assets/personas/INFJ.png", link: '/profile/INFJ' }
      ],
      tagColor: '#99CECF',
    },
    // sm validated 042125
    //template
    'INFP': {
      name: 'Truman`s Paw',
      traits: ['Poetic', 'Kind & Altruistic', 'Eager To Help A Good Cause'],
      leftTags: ['Either a meme lord or a serious person', 'What is expressing feelings..?', 'Can be really oblivious'],
      rightTags: ['*randomly nostalgic*', 'Likes people who inspire easily', 'Once they start talking, they won`t stop'],
      image: 'assets/personas/INFP.png',
      resources: [
        { name: 'Mindful Mizzou', link: 'https://www.umsystem.edu/totalrewards/wellness/mindfulness' },
        { name: 'Creative Writing Club', link: 'https://x.com/cowclubmu' },
        { name: 'Sustain Mizzou', link: 'https://www.instagram.com/sustainmizzou/' },
        { name: 'Caring for Columbia', link: 'https://www.instagram.com/caring4columbia/' }
      ],
      compatibilities: [
        { name: 'Jesse Hall Dome', image: "assets/personas/ENFJ.png", link: '/profile/ENFJ' },
        { name: 'Ghost Of Harlan', image: "assets/personas/INFJ.png", link: '/profile/INFJ' },
        { name: 'Mizzou Squirrel', image: "assets/personas/ENFP.png", link: '/profile/ENFP' }
      ],
      tagColor: '#99CECF',
    },
    // sm validated 042125
    //template
    'INFJ': {
      name: 'Ghost Of Harlan',
      traits: ['Quiet and Mystical', 'Idealist', 'Inspiring'],
      leftTags: ['Will bend their schedule for you', 'Was born wise', 'Activist and revolutionary'],
      rightTags: ['REALLY likes motivational quotes', 'Doesn`t prefer the spotlight', 'Walking on a cloud 24/7'],
      image: 'assets/personas/INFJ.png',
      resources: [
        { name: 'Mizzou Alternative Breaks', link: 'https://breaks.missouri.edu/' },
        { name: 'Mizzou Student Foundation', link: 'https://www.instagram.com/mizmsf/?hl=en' },
        { name: 'Climate Leaders at Mizzou', link: 'https://www.instagram.com/climateleadersmu/?hl=en' },
        { name: 'Mizzou MoreThan4 Club', link: 'https://www.instagram.com/mizzoumorethan4/' }
      ],
      compatibilities: [
        { name: 'Mizzou Squirrel', image: "assets/personas/ENFP.png", link: '/profile/ENFP' },
        { name: 'Speaker`s Circle', image: "assets/personas/ENTP.png", link: '/profile/ENTP' },
        { name: 'Truman`s Paw', image: "assets/personas/INFP.png", link: '/profile/INFP' }
      ],
      tagColor: '#99CECF',
    },
    // sm validated 042125
    //template
    'ENTP': {
      name: 'Speaker`s Circle',
      traits: ['Smart', 'Curious Thinker', 'Loves Intellectual Challenges'],
      leftTags: ['Probably up to no good', 'Exceptional music taste', 'Judgemental but understanding'],
      rightTags: ['Enjoys 1 on 1 convos more than group ones', 'Always in their head thinking', 'Funny and well informed'],
      image: 'assets/personas/ENTP.png',
      resources: [
        { name: 'Mizzou Mock Trial Association', link: 'https://www.instagram.com/mizzoumocktrial/?hl=en' },
        { name: 'Missouri Debate Union', link: 'https://www.instagram.com/missouridebateunion/' },
        { name: 'MU Philanthropy', link: 'https://engage.missouri.edu/mup/home/' },
        { name: 'Comedy Wars', link: 'https://www.instagram.com/comedy_wars/' }
      ],
      compatibilities: [
        { name: 'Ghost Of Harlan', image: "assets/personas/INFJ.png", link: '/profile/INFJ' },
        { name: 'Truman`s Paw', image: "assets/personas/INFP.png", link: '/profile/INFP' },
        { name: 'The Big Tree', image: "assets/personas/INTJ.png", link: '/profile/INTJ' }
      ],
      tagColor: '#99CECF',
    },
    // sm validated 042125
    //template
    'ENTJ': {
      name: 'David R. Francis Nose',
      traits: ['Bold', 'Imaginative', 'Strong-Willed Leader'],
      leftTags: ['Always trying to understand', 'Can be controversial', 'Socially introverted'],
      rightTags: ['Secretly a softie', 'Likes leaving a mark on others', 'Daydreams about the future'],
      image: 'assets/personas/ENTJ.png',
      resources: [
        { name: 'American Constitution Society', link: 'https://www.instagram.com/acs_mizzou/' },
        { name: 'Leadership @ Mizzou', link: 'https://getinvolved.missouri.edu/leadership-opportunities/' },
        { name: 'Climate Leaders at Mizzou', link: 'https://www.instagram.com/climateleadersmu/?hl=en' },
        { name: 'University of Missouri Investment Group', link: 'https://business.missouri.edu/student-development/learning-doing/university-missouri-investment-group' }
      ],
      compatibilities: [
        { name: 'The Columns', image: "assets/personas/INTP.png", link: '/profile/INTP' },
        { name: 'The Big Tree', image: "assets/personas/INTJ.png", link: '/profile/INTJ' },
        { name: 'Mizzou Squirrel', image: "assets/personas/ENFP.png", link: '/profile/ENFP' }
      ],
      tagColor: '#99CECF',
    },
    // sm validated 042125
    //template
    'INTP': {
      name: 'The Columns',
      traits: ['Innovative', 'Curious', 'Analytical'],
      leftTags: ['Likes trying new things', '*random thought they want to tell you*', 'Wants to understand the universe'], 
      rightTags: ['*silently plots*', 'Secretly wants to meet new people', 'Can feel left out'],
      image: 'assets/personas/INTP.png',
      resources: [
        { name: 'Mizzou Philosophy Club', link: 'https://www.instagram.com/mizzouphilosophyclub/' },
        { name: 'Mizzou Quiz Bowl Club', link: 'https://x.com/mizzouquizbowl' },
        { name: 'Show Me Research', link: 'https://www.instagram.com/ugradresearchmu/?hl=en' },
        { name: '3D Printing Club', link: 'https://www.instagram.com/mu3dpc/?hl=en' }
      ],
      compatibilities: [
        { name: 'David R. Francis Nose', image: "assets/personas/ENTJ.png", link: '/profile/ENTJ' },
        { name: 'Mizzou Squirrel', image: "assets/personas/ENFP.png", link: '/profile/ENFP' },
        { name: 'Speaker`s Circle', image: "assets/personas/ENTP.png", link: '/profile/ENTP' }
      ],
      tagColor: '#99CECF',
    },
    // sm validated 042125
    //template
    'INTJ': {
      name: 'The Big Tree',
      traits: ['Imaginative', 'Strategic Thinker', 'Future Oriented'],
      leftTags: ['A human cat, basically', 'Hidden artistic and poetic side', 'Likes personal growth'],
      rightTags: ['Niche hobbies', 'Big softie inside', 'Likes being direct & honest'],
      image: 'assets/personas/INTJ.png',
      resources: [
        { name: '3D Printing Club', link: 'https://www.instagram.com/mu3dpc/?hl=en' },
        { name: 'MU Chess Club', link: 'https://www.instagram.com/mizzouchessclub/' },
        { name: 'Mizzou Stock Exchange Club', link: 'https://www.instagram.com/mizzoustockexchange/' },
        { name: 'MU Documentary Club', link: 'https://www.instagram.com/mizzoudocclub/' }
      ],
      compatibilities: [
        { name: 'Mizzou Squirrel', image: "assets/personas/ENFP.png", link: '/profile/ENFP' },
        { name: 'Speaker`s Circle', image: "assets/personas/ENTP.png", link: '/profile/ENTP' },
        { name: 'Ghost Of Harlan', image: "assets/personas/INFJ.png", link: `/profile/INFJ` }
      ],
      tagColor: '#99CECF',
    }
  };

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

  //keep debugging in if we alter quiz logic during testing
  //console.log('Tallies:', tallies);

  //return 4 character string based on majority split from tallies obj
  const returnedType =
    (tallies.ie["E"] >= 2 ? "E" : "I") +
    (tallies.sn["S"] >= 2 ? "S" : "N") +
    (tallies.tf["T"] >= 2 ? "T" : "F") +
    (tallies.jp["J"] >= 2 ? "J" : "P");

  //keep debugging in if we alter quiz logic during testing
  //console.log('returnedtype is:', returnedType);

  this.result = returnedType;
  this.resultData = this.resultProfiles[this.result];
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

  //debugging select issue, log the option text func using, keep for quiz testing
  //console.log(`Option text: [${optionText}]`);

  //convert the option text taken in and convert to single letter based on the mappingg
  const mappedAnswer = this.map[optionText];
  //debugging make sure letter is mapped properly from text, keep for quiz testing
  //console.log('Mapped letter:', mappedAnswer);

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
