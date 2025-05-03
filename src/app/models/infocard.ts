
//resources exportable interface resouce to be used in InfoCard interface
export interface resources {
  name: string;
  link: string;
}

//same as resources but different parameters, exportable interface resouce to be used in InfoCard interface
export interface compatibilities {
  name : string;
  image: string;
  link: string;
}

//'InfoCard' interface allows structured to be referenced in resultss page
export interface InfoCard {
  name: string;
  traits: string[];
  leftTags: string[];
  rightTags: string[];
  image: string;
  resources: resources[];
  compatibilities: compatibilities[];
  tagColor: string; 
}

//export all the info cards from quiz.component.ts
export const infoCards: {[type: string]: InfoCard} = {
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
}
