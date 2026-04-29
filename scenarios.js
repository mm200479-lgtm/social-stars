/**
 * Social Stars — All Game Data
 * Scenarios, Emotion Match, How Would You Feel, Social Stories,
 * Badges, Themes, and Grounding Steps
 */

/* ===== CATEGORIES ===== */
const CATEGORIES = [
    { id: "emotions", title: "Understanding Emotions", emoji: "\u{1F60A}", description: "Learn to recognise how people feel" },
    { id: "conversations", title: "Conversations", emoji: "\u{1F4AC}", description: "Practice talking with others" },
    { id: "friendships", title: "Being a Good Friend", emoji: "\u{1F91D}", description: "Learn about friendship skills" },
    { id: "body-language", title: "Body Language", emoji: "\u{1F64B}", description: "Understand what bodies tell us" },
    { id: "tricky-situations", title: "Tricky Situations", emoji: "\u{1F914}", description: "Figure out what to do when things are hard" },
    { id: "feelings-check", title: "My Own Feelings", emoji: "\u{1F496}", description: "Understand and manage your feelings" }
];

/* ===== SCENARIOS (with difficulty 1-3) ===== */
const SCENARIOS = {
    emotions: [
        { difficulty:1, emoji:"\u{1F622}", text:"Your friend Sam is sitting alone at lunch. Their eyes are red and they're looking down at the table. How do you think Sam is feeling?", choices:[{text:"Sam is feeling sad",correct:true},{text:"Sam is feeling excited",correct:false},{text:"Sam is feeling angry",correct:false}], correctFeedback:"That's right! Red eyes and looking down are signs someone is sad. You're great at reading feelings!", encourageFeedback:"Good try! When someone has red eyes and looks down, they're usually feeling sad. Those are important clues to notice." },
        { difficulty:1, emoji:"\u{1F604}", text:"Maya just found out she's going to the amusement park this weekend. She's jumping up and down and has a big smile. How is Maya feeling?", choices:[{text:"Maya is feeling scared",correct:false},{text:"Maya is feeling excited and happy",correct:true},{text:"Maya is feeling bored",correct:false}], correctFeedback:"Exactly! Jumping up and down with a big smile means Maya is super excited and happy!", encourageFeedback:"Nice thinking! When someone jumps up and down with a big smile, they're usually feeling excited and happy." },
        { difficulty:1, emoji:"\u{1F620}", text:"Tom's little brother just broke his favourite toy. Tom's face is red, his fists are clenched, and he's breathing fast. How is Tom feeling?", choices:[{text:"Tom is feeling happy",correct:false},{text:"Tom is feeling tired",correct:false},{text:"Tom is feeling angry",correct:true}], correctFeedback:"You got it! A red face, clenched fists, and fast breathing are signs of anger. Great job!", encourageFeedback:"Good guess! When someone's face is red and fists are clenched, they're usually feeling angry." },
        { difficulty:2, emoji:"\u{1F630}", text:"It's Lily's first day at a new school. She's biting her nails, her voice is very quiet, and she keeps looking around. How might Lily be feeling?", choices:[{text:"Lily is feeling nervous or worried",correct:true},{text:"Lily is feeling proud",correct:false},{text:"Lily is feeling silly",correct:false}], correctFeedback:"That's right! Nail biting and a quiet voice are signs of feeling nervous. It's normal to feel that way in new places!", encourageFeedback:"Nice try! When someone bites their nails and speaks quietly, they're usually feeling nervous or worried." },
        { difficulty:2, emoji:"\u{1F62E}", text:"Dad walks into his surprise birthday party. His eyes go wide, his mouth opens, and he puts his hands on his face. How is Dad feeling?", choices:[{text:"Dad is feeling bored",correct:false},{text:"Dad is feeling surprised",correct:true},{text:"Dad is feeling confused",correct:false}], correctFeedback:"Yes! Wide eyes and an open mouth are classic signs of surprise. You're a feelings detective!", encourageFeedback:"Good thinking! When someone's eyes go wide and their mouth opens suddenly, they're usually feeling surprised." },
        { difficulty:3, emoji:"\u{1F614}", text:"Your friend got a good grade but doesn't look happy. They're smiling a little but their shoulders are slumped. What might they be feeling?", choices:[{text:"They're feeling proud and excited",correct:false},{text:"They might be disappointed — maybe they expected an even better grade",correct:true},{text:"They're feeling angry at the teacher",correct:false}], correctFeedback:"Great observation! Sometimes people can look okay on the outside but feel disappointed inside. Noticing small clues like slumped shoulders is really perceptive!", encourageFeedback:"Good try! When someone smiles but their body looks droopy, they might be hiding disappointment. It's tricky to spot, but you're learning!" },
        { difficulty:3, emoji:"\u{1F633}", text:"A classmate is laughing really loudly but their eyes look watery. What might be going on?", choices:[{text:"They're just really happy",correct:false},{text:"They might be laughing to hide that they're upset",correct:true},{text:"They're being silly",correct:false}], correctFeedback:"Wow, great insight! Sometimes people laugh to cover up sadness or embarrassment. Noticing the watery eyes was really clever!", encourageFeedback:"That's a tricky one! Sometimes people laugh even when they're upset — it's a way of hiding feelings. Watery eyes are a clue that something else might be going on." }
    ],
    conversations: [
        { difficulty:1, emoji:"\u{1F44B}", text:"You see a new kid in your class. They're standing alone. What's a good way to start a conversation?", choices:[{text:"\"Hi! I'm [your name]. What's your name?\"",correct:true},{text:"Walk past them without saying anything",correct:false},{text:"Stare at them from far away",correct:false}], correctFeedback:"Perfect! Saying hi and sharing your name is a friendly way to start talking to someone new!", encourageFeedback:"The best way to start is simple \u2014 just say \"Hi, I'm [your name]!\" and ask theirs." },
        { difficulty:1, emoji:"\u{1F5E3}\uFE0F", text:"Your friend is telling you about their weekend. What should you do while they're talking?", choices:[{text:"Look at them and listen",correct:true},{text:"Start talking about your weekend instead",correct:false},{text:"Walk away to do something else",correct:false}], correctFeedback:"Great answer! Looking at someone and listening shows you care. That's called being a good listener!", encourageFeedback:"When someone is talking to us, the kindest thing is to look at them and listen. We can share our story after they finish." },
        { difficulty:2, emoji:"\u{1F937}", text:"Someone asks you a question but you don't know the answer. What's a good thing to say?", choices:[{text:"Make up an answer",correct:false},{text:"\"I'm not sure, but we could find out together!\"",correct:true},{text:"Just stay quiet",correct:false}], correctFeedback:"Wonderful! It's totally okay not to know something. Offering to find out together is really kind!", encourageFeedback:"It's always okay to say \"I'm not sure.\" Nobody knows everything! Suggesting to find the answer together is a great way to connect." },
        { difficulty:2, emoji:"\u{1F60A}", text:"Your classmate shows you a drawing they made. You can tell they worked really hard. What could you say?", choices:[{text:"\"That's not very good\"",correct:false},{text:"Say nothing",correct:false},{text:"\"I can see you worked really hard on this! I like the colours.\"",correct:true}], correctFeedback:"That's a lovely thing to say! Noticing someone's effort makes people feel really good.", encourageFeedback:"When someone shows us their work, it's kind to notice their effort. You could say \"I can see you worked hard on this!\"" },
        { difficulty:3, emoji:"\u{1F504}", text:"You've been talking about your favourite game for a while. Your friend looks like they want to say something. What should you do?", choices:[{text:"Keep talking because your story is interesting",correct:false},{text:"Pause and ask \"What do you think?\" or \"What about you?\"",correct:true},{text:"Talk even faster so you can finish",correct:false}], correctFeedback:"Excellent! Pausing to let others speak is a super important conversation skill!", encourageFeedback:"In conversations, it's important to take turns. If you notice someone wants to speak, try pausing and asking \"What do you think?\"" },
        { difficulty:3, emoji:"\u{1F910}", text:"You notice your friend has been quiet all day and isn't joining in conversations. What could you do?", choices:[{text:"Ignore it \u2014 they're probably fine",correct:false},{text:"Tell everyone that your friend is being weird",correct:false},{text:"Quietly ask them \"Hey, are you okay? You seem quiet today.\"",correct:true}], correctFeedback:"That's really thoughtful! Checking in privately shows you care without putting them on the spot.", encourageFeedback:"When someone is unusually quiet, a kind thing to do is check in privately. A simple \"Are you okay?\" can mean a lot." }
    ],
    friendships: [
        { difficulty:1, emoji:"\u{1F3AE}", text:"Your friend wants to play a different game than you. What's the best thing to do?", choices:[{text:"Say \"We always have to play what I want!\"",correct:false},{text:"Take turns \u2014 play their game first, then yours",correct:true},{text:"Stop playing and walk away",correct:false}], correctFeedback:"Great idea! Taking turns is one of the best friendship skills!", encourageFeedback:"Friends take turns choosing activities. You could play their game first, then yours. That way everyone has fun!" },
        { difficulty:1, emoji:"\u{1F614}", text:"Your friend is having a bad day and seems really upset. What could you do?", choices:[{text:"Tell them to stop being sad",correct:false},{text:"Ignore them",correct:false},{text:"Sit with them and say \"I'm here if you want to talk\"",correct:true}], correctFeedback:"That's really caring! Sometimes people just need to know someone is there for them.", encourageFeedback:"When a friend is upset, one of the best things you can do is just be there. You could say \"I'm here if you want to talk.\"" },
        { difficulty:2, emoji:"\u{1F64A}", text:"Your friend tells you a secret. Another kid asks you what the secret is. What should you do?", choices:[{text:"Tell them the secret",correct:false},{text:"Say \"Sorry, I can't share that. It's not my secret to tell.\"",correct:true},{text:"Make up a different secret",correct:false}], correctFeedback:"That's exactly right! Keeping secrets safe is a big part of being a trustworthy friend.", encourageFeedback:"When someone trusts us with a secret, it's important to keep it safe. You could say \"Sorry, that's not my secret to tell.\"" },
        { difficulty:2, emoji:"\u{1F382}", text:"Your friend got a really cool birthday present, but you didn't get one. How could you handle this?", choices:[{text:"Feel happy for your friend and say \"That's so cool!\"",correct:true},{text:"Say \"That's not fair! I want one too!\"",correct:false},{text:"Pretend you don't care",correct:false}], correctFeedback:"Wonderful! Being happy for a friend even when you feel a little jealous is really mature!", encourageFeedback:"It's normal to feel a little jealous! But a great friendship skill is being happy for your friend." },
        { difficulty:3, emoji:"\u{1F62C}", text:"You accidentally said something that hurt your friend's feelings. What should you do?", choices:[{text:"Pretend it didn't happen",correct:false},{text:"Say \"I'm sorry I said that. I didn't mean to hurt your feelings.\"",correct:true},{text:"Blame them for being too sensitive",correct:false}], correctFeedback:"That's the right thing to do! Saying sorry and meaning it is one of the most important things in any friendship.", encourageFeedback:"When we accidentally hurt someone, the best thing is to say \"I'm sorry\" and mean it." },
        { difficulty:3, emoji:"\u{1F465}", text:"Two of your friends are fighting and both want you to pick a side. What could you do?", choices:[{text:"Pick the friend you like more",correct:false},{text:"Say \"I care about both of you. I don't want to pick sides, but I hope you can work it out.\"",correct:true},{text:"Stop being friends with both of them",correct:false}], correctFeedback:"That's a really mature response! You can care about both friends without taking sides. That takes real wisdom!", encourageFeedback:"It's hard when friends fight! But you don't have to pick sides. You can say \"I care about both of you\" and encourage them to talk it out." }
    ],
    "body-language": [
        { difficulty:1, emoji:"\u{1F644}", text:"Someone keeps looking at the clock and tapping their foot while you're talking. What might their body be telling you?", choices:[{text:"They're really interested",correct:false},{text:"They might be in a hurry or need to go",correct:true},{text:"They're very relaxed",correct:false}], correctFeedback:"Good eye! Looking at the clock and tapping feet usually means someone is in a hurry.", encourageFeedback:"When someone keeps looking at the clock and tapping their foot, their body is saying \"I need to go.\"" },
        { difficulty:1, emoji:"\u{1F917}", text:"Your grandma sees you after a long time. She opens her arms wide and smiles big. What is her body language saying?", choices:[{text:"She wants to give you a hug \u2014 she's happy to see you!",correct:true},{text:"She's telling you to stop",correct:false},{text:"She's feeling scared",correct:false}], correctFeedback:"That's right! Open arms and a big smile mean someone is happy and wants a hug!", encourageFeedback:"When someone opens their arms wide and smiles, they're saying \"I'm so happy to see you!\"" },
        { difficulty:2, emoji:"\u{1F636}", text:"A kid at school has their arms crossed tightly and is looking away from the group. What might they be feeling?", choices:[{text:"Happy and included",correct:false},{text:"They might be feeling left out or uncomfortable",correct:true},{text:"Sleepy",correct:false}], correctFeedback:"Great observation! Crossed arms and looking away can mean someone feels left out.", encourageFeedback:"When someone crosses their arms and looks away, they might be feeling left out or uncomfortable." },
        { difficulty:2, emoji:"\u{1F440}", text:"A student is leaning forward, making eye contact, and nodding while the teacher talks. What does this mean?", choices:[{text:"The student is bored",correct:false},{text:"The student is confused",correct:false},{text:"The student is listening carefully and interested",correct:true}], correctFeedback:"Exactly! Leaning forward, eye contact, and nodding are all signs of active listening!", encourageFeedback:"Leaning forward, looking at someone, and nodding are ways our body says \"I'm listening!\"" },
        { difficulty:3, emoji:"\u{1FAE3}", text:"Someone is talking to you but keeps looking at the ground and speaking very quietly. What might this mean?", choices:[{text:"They're feeling confident",correct:false},{text:"They might be feeling shy or nervous",correct:true},{text:"They're feeling angry",correct:false}], correctFeedback:"That's right! Looking down and speaking quietly often means someone is feeling shy or nervous.", encourageFeedback:"When someone looks at the ground and speaks quietly, they're usually feeling shy or nervous." },
        { difficulty:3, emoji:"\u{1F9D0}", text:"Your friend says \"I'm fine\" but they're not making eye contact, their voice is flat, and they're fidgeting. Should you believe them?", choices:[{text:"Yes, they said they're fine so they must be",correct:false},{text:"Their body language suggests they might not be fine \u2014 you could gently check in again",correct:true},{text:"They're probably just tired",correct:false}], correctFeedback:"Great insight! Sometimes words and body language don't match. Gently checking in shows you really care!", encourageFeedback:"Sometimes people say \"I'm fine\" when they're not. If their body language doesn't match their words, it's kind to gently ask again." }
    ],
    "tricky-situations": [
        { difficulty:1, emoji:"\u{1F624}", text:"Someone at school says something mean to you. What's a good way to handle it?", choices:[{text:"Say something mean back",correct:false},{text:"Take a deep breath and walk away, then tell a trusted adult",correct:true},{text:"Pretend you didn't hear it",correct:false}], correctFeedback:"That's a really strong choice! Walking away takes courage, and telling an adult is smart.", encourageFeedback:"The best thing to do is take a deep breath, walk away, and tell a trusted adult." },
        { difficulty:1, emoji:"\u{1F6AB}", text:"Your friends want you to do something you know is wrong. What should you do?", choices:[{text:"Do it so they'll still like you",correct:false},{text:"Say \"No, I don't want to do that\" \u2014 even if it's hard",correct:true},{text:"Go along with it quietly",correct:false}], correctFeedback:"That's really brave! Saying no when something is wrong takes a lot of courage.", encourageFeedback:"It's important to say \"I don't want to do that\" when something feels wrong. True friends will respect your choice." },
        { difficulty:2, emoji:"\u{1F615}", text:"You see two friends arguing. What could you do?", choices:[{text:"Pick a side",correct:false},{text:"Ignore it completely",correct:false},{text:"Calmly suggest they talk it out, or get an adult to help",correct:true}], correctFeedback:"That's a wise choice! Helping friends talk calmly shows great problem-solving skills!", encourageFeedback:"When friends argue, you could suggest they talk it out, or ask an adult for help." },
        { difficulty:2, emoji:"\u{1F633}", text:"You made a mistake in front of the whole class and some kids laughed. How could you handle this?", choices:[{text:"Everyone makes mistakes! Take a breath and say \"Oops!\" with a smile",correct:true},{text:"Run out of the classroom",correct:false},{text:"Get angry at the kids who laughed",correct:false}], correctFeedback:"That's a great attitude! Being able to laugh at yourself is a real superpower!", encourageFeedback:"Everyone makes mistakes. Taking a breath and saying \"Oops!\" shows confidence and bravery." },
        { difficulty:3, emoji:"\u{1F504}", text:"You really want a turn on the swing but someone else is using it. What should you do?", choices:[{text:"Push them off",correct:false},{text:"Ask nicely: \"Can I have a turn when you're done?\"",correct:true},{text:"Stand really close and stare until they leave",correct:false}], correctFeedback:"Perfect! Asking nicely is always the best approach!", encourageFeedback:"The best way is to ask nicely: \"Can I have a turn when you're done?\"" },
        { difficulty:3, emoji:"\u{1F4F1}", text:"Someone posts something unkind about you online. What should you do?", choices:[{text:"Post something mean about them back",correct:false},{text:"Don't respond \u2014 save a screenshot and tell a trusted adult",correct:true},{text:"Delete all your accounts",correct:false}], correctFeedback:"Smart thinking! Not responding and telling an adult is the safest and wisest choice. You handled that like a pro!", encourageFeedback:"When someone is unkind online, the best thing is to not respond, save evidence, and tell a trusted adult. They can help you handle it." }
    ],
    "feelings-check": [
        { difficulty:1, emoji:"\u{1F621}", text:"You're feeling really angry because something unfair happened. What's a good way to calm down?", choices:[{text:"Yell and throw things",correct:false},{text:"Take 5 deep breaths, count to 10, or squeeze a stress ball",correct:true},{text:"Keep all the anger inside",correct:false}], correctFeedback:"Great strategy! Deep breaths and counting help your brain calm down!", encourageFeedback:"There are helpful ways to calm down, like taking 5 deep breaths or counting to 10." },
        { difficulty:1, emoji:"\u{1F61F}", text:"You're feeling worried about a test tomorrow. What could help?", choices:[{text:"Stay up all night worrying",correct:false},{text:"Tell someone how you feel and make a plan to study a little bit",correct:true},{text:"Decide not to go to school",correct:false}], correctFeedback:"Smart thinking! Talking about worries makes them smaller!", encourageFeedback:"A great thing to do is tell someone how you feel, then make a small plan like studying for 15 minutes." },
        { difficulty:2, emoji:"\u{1F61E}", text:"You're feeling sad and you don't really know why. What's a good thing to do?", choices:[{text:"It's okay to feel sad sometimes. Talk to someone you trust.",correct:true},{text:"Pretend to be happy",correct:false},{text:"Stay in your room alone",correct:false}], correctFeedback:"That's really wise! Sometimes we feel sad without a clear reason, and that's completely okay.", encourageFeedback:"It's okay to feel sad, even when you don't know why! Talking to someone you trust can really help." },
        { difficulty:2, emoji:"\u{1F929}", text:"You're SO excited but you're in class. What could you do?", choices:[{text:"Shout out your exciting news",correct:false},{text:"Squeeze your hands under the desk and wait for break time",correct:true},{text:"Run around the classroom",correct:false}], correctFeedback:"Great self-control! Waiting for the right moment shows real maturity!", encourageFeedback:"In class, try squeezing your hands under the desk to use that energy. Share your news at break time!" },
        { difficulty:3, emoji:"\u{1F624}", text:"Your sibling keeps bothering you and you're getting really frustrated. What could help?", choices:[{text:"Hit or push them",correct:false},{text:"Calmly say \"I need some space right now, please\" and walk to another room",correct:true},{text:"Scream as loud as you can",correct:false}], correctFeedback:"That's a really mature way to handle it! Using your words to ask for space is a powerful skill.", encourageFeedback:"A great strategy is to use calm words: \"I need some space right now.\" Then go to another room." },
        { difficulty:3, emoji:"\u{1F616}", text:"You feel like crying but you're at school and feel embarrassed. What could you do?", choices:[{text:"Hold it all in and pretend everything is fine",correct:false},{text:"Ask to go to the bathroom or a quiet space, and let yourself feel the feelings",correct:true},{text:"Get angry at everyone around you",correct:false}], correctFeedback:"That's a really healthy choice! It's okay to need a quiet moment. Finding a safe space to feel your feelings is a sign of strength, not weakness.", encourageFeedback:"It's okay to cry! If you need a moment, you can ask to go somewhere quiet. Taking care of your feelings is important and brave." }
    ]
};


/* ===== EMOTION MATCH DATA ===== */
const EMOTION_MATCH = [
    { face: "\u{1F604}", answer: "Happy", options: ["Happy", "Sad", "Angry", "Scared"] },
    { face: "\u{1F622}", answer: "Sad", options: ["Excited", "Sad", "Surprised", "Bored"] },
    { face: "\u{1F621}", answer: "Angry", options: ["Happy", "Shy", "Angry", "Tired"] },
    { face: "\u{1F628}", answer: "Scared", options: ["Proud", "Scared", "Silly", "Calm"] },
    { face: "\u{1F632}", answer: "Surprised", options: ["Surprised", "Angry", "Sad", "Nervous"] },
    { face: "\u{1F60A}", answer: "Proud", options: ["Worried", "Bored", "Proud", "Confused"] },
    { face: "\u{1F634}", answer: "Tired", options: ["Excited", "Tired", "Happy", "Angry"] },
    { face: "\u{1F61E}", answer: "Disappointed", options: ["Disappointed", "Scared", "Silly", "Proud"] },
    { face: "\u{1F60D}", answer: "Loving", options: ["Angry", "Loving", "Bored", "Nervous"] },
    { face: "\u{1F914}", answer: "Confused", options: ["Happy", "Sad", "Confused", "Excited"] },
    { face: "\u{1F633}", answer: "Embarrassed", options: ["Embarrassed", "Proud", "Angry", "Calm"] },
    { face: "\u{1F60E}", answer: "Confident", options: ["Shy", "Confident", "Worried", "Sad"] }
];

/* ===== HOW WOULD YOU FEEL DATA ===== */
const HOW_WOULD_YOU_FEEL = [
    { emoji: "\u{1F3C6}", text: "You just won first place in a race at school!", feelings: ["Proud", "Excited", "Happy", "Nervous"], responses: { "Proud": "It makes sense to feel proud! You worked hard and it paid off.", "Excited": "Excitement is a great feeling! Winning is really thrilling.", "Happy": "Of course you'd feel happy! That's a wonderful achievement.", "Nervous": "Some people do feel nervous even when they win \u2014 that's totally okay! Big moments can bring lots of feelings." } },
    { emoji: "\u{1F3E0}", text: "Your family is moving to a new house in a different town.", feelings: ["Worried", "Sad", "Excited", "Scared"], responses: { "Worried": "It's very normal to feel worried about a big change. New things can be uncertain.", "Sad": "Feeling sad about leaving makes total sense \u2014 you might miss your friends and familiar places.", "Excited": "Some people feel excited about new adventures! A new house can be fun to explore.", "Scared": "It's okay to feel scared about big changes. Most people feel that way sometimes." } },
    { emoji: "\u{1F381}", text: "It's your birthday and all your friends are coming to your party!", feelings: ["Excited", "Happy", "Nervous", "Grateful"], responses: { "Excited": "Birthdays are exciting! It's fun to celebrate with friends.", "Happy": "Of course! Being surrounded by friends on your birthday is a great feeling.", "Nervous": "Some people feel nervous at parties, even their own! That's completely normal.", "Grateful": "Feeling grateful is really lovely \u2014 it shows you appreciate your friends." } },
    { emoji: "\u{1F4DD}", text: "Your teacher asks you to read out loud in front of the whole class.", feelings: ["Nervous", "Scared", "Proud", "Okay"], responses: { "Nervous": "Lots of people feel nervous about reading aloud. That's one of the most common worries!", "Scared": "It can feel scary to be the centre of attention. That's a very normal feeling.", "Proud": "Some people feel proud when they get to share! That's great confidence.", "Okay": "Feeling okay about it is great! Not everything has to be a big deal." } },
    { emoji: "\u{1F436}", text: "You find a lost puppy in your neighbourhood.", feelings: ["Worried", "Happy", "Excited", "Sad"], responses: { "Worried": "It makes sense to worry about the puppy \u2014 you want it to be safe!", "Happy": "Puppies can make us feel happy! They're so cute.", "Excited": "Finding a puppy is exciting! You might want to help it find its home.", "Sad": "You might feel sad that the puppy is lost and alone. That shows empathy!" } },
    { emoji: "\u{1F3A4}", text: "You're about to perform in the school talent show.", feelings: ["Nervous", "Excited", "Scared", "Proud"], responses: { "Nervous": "Almost everyone feels nervous before performing! Even professional singers do.", "Excited": "The thrill of performing can be really exciting! That energy can help you do great.", "Scared": "Stage fright is very real and very normal. Taking deep breaths can help!", "Proud": "Feeling proud of yourself for being brave enough to perform is wonderful!" } },
    { emoji: "\u{1F4A9}", text: "Someone made fun of your lunch at school.", feelings: ["Sad", "Angry", "Embarrassed", "Hurt"], responses: { "Sad": "It's sad when people are unkind about something personal. Your feelings are valid.", "Angry": "It's natural to feel angry when someone is mean. That's your brain saying 'that's not fair!'", "Embarrassed": "Feeling embarrassed is understandable. But remember \u2014 there's nothing wrong with your lunch!", "Hurt": "Feeling hurt makes sense. Mean comments can sting, even about small things." } },
    { emoji: "\u{1F3D5}\uFE0F", text: "You're going on a camping trip and will sleep in a tent for the first time.", feelings: ["Excited", "Nervous", "Happy", "Scared"], responses: { "Excited": "Camping is an adventure! Sleeping in a tent can be really fun.", "Nervous": "New experiences can make us nervous. That's your brain getting ready for something new!", "Happy": "Being in nature and trying new things can bring a lot of happiness!", "Scared": "It's okay to feel scared about sleeping somewhere new. Lots of people feel that way the first time." } }
];

/* ===== SOCIAL STORIES ===== */
const SOCIAL_STORIES = [
    {
        id: "birthday-party", title: "Going to a Birthday Party", emoji: "\u{1F382}",
        description: "What to expect and how to have fun",
        steps: [
            { emoji: "\u{1F381}", text: "I've been invited to a birthday party! I might feel excited or a little nervous. Both feelings are okay." },
            { emoji: "\u{1F457}", text: "Before the party, I can get ready. I'll wear comfortable clothes and maybe bring a gift for the birthday person." },
            { emoji: "\u{1F6AA}", text: "When I arrive, I can say \"Hi!\" and \"Happy Birthday!\" to the birthday person. If I feel shy, I can wave and smile." },
            { emoji: "\u{1F3AE}", text: "At the party, there might be games, food, and music. I can join in the activities or watch for a bit until I feel comfortable." },
            { emoji: "\u{1F370}", text: "When it's time for cake, everyone sings Happy Birthday. I can sing along or just listen \u2014 both are fine!" },
            { emoji: "\u{1F44B}", text: "When the party is over, I can say \"Thank you for inviting me!\" and \"Goodbye!\" I did a great job!" }
        ]
    },
    {
        id: "joining-game", title: "Joining a Game at Recess", emoji: "\u{26BD}",
        description: "How to ask to play with others",
        steps: [
            { emoji: "\u{1F440}", text: "I see some kids playing a game at recess. I'd like to join them!" },
            { emoji: "\u{1F6B6}", text: "I walk over to the group. I stand nearby where they can see me." },
            { emoji: "\u{1F4AC}", text: "I wait for a good moment (like a pause in the game) and ask: \"Can I play too?\" or \"Is there room for one more?\"" },
            { emoji: "\u{1F60A}", text: "If they say yes \u2014 great! I join in and follow the rules of the game." },
            { emoji: "\u{1F914}", text: "If they say no, that's okay. I can say \"Maybe next time!\" and find something else to do. It doesn't mean they don't like me." },
            { emoji: "\u{2B50}", text: "I'm proud of myself for being brave enough to ask! That takes courage." }
        ]
    },
    {
        id: "new-school", title: "Starting at a New School", emoji: "\u{1F3EB}",
        description: "What your first day might be like",
        steps: [
            { emoji: "\u{1F31F}", text: "Today is my first day at a new school. I might feel nervous, excited, or both. That's completely normal!" },
            { emoji: "\u{1F6AA}", text: "When I arrive, a teacher or helper will show me where to go. I can ask questions if I'm not sure about something." },
            { emoji: "\u{1F4DA}", text: "In class, I'll find my seat. I can look around and see who's sitting near me." },
            { emoji: "\u{1F44B}", text: "I can introduce myself to the person next to me: \"Hi, I'm [name]. I'm new here.\" Most kids are friendly!" },
            { emoji: "\u{1F372}", text: "At lunch, I can sit with someone who seems friendly, or ask a teacher where to sit. It's okay to eat quietly too." },
            { emoji: "\u{1F3E0}", text: "At the end of the day, I did it! Each day will get a little easier. I'm brave for trying something new." }
        ]
    },
    {
        id: "doctor-visit", title: "Going to the Doctor", emoji: "\u{1F3E5}",
        description: "What happens at a check-up",
        steps: [
            { emoji: "\u{1F697}", text: "Today I'm going to the doctor for a check-up. This is to make sure my body is healthy." },
            { emoji: "\u{1F6CB}\uFE0F", text: "In the waiting room, I might wait for a little while. I can read a book, play a quiet game, or just sit." },
            { emoji: "\u{1F469}\u200D\u2695\uFE0F", text: "The doctor or nurse will call my name. They'll take me to a room and might check my height and weight." },
            { emoji: "\u{1FA7A}", text: "The doctor might listen to my heart, look in my ears, and check my throat. These things don't hurt!" },
            { emoji: "\u{1F4AC}", text: "If I feel scared or uncomfortable, I can tell the doctor or my parent. It's okay to say \"I'm nervous.\"" },
            { emoji: "\u{1F31F}", text: "When it's done, I did a great job! Going to the doctor helps keep me healthy and strong." }
        ]
    },
    {
        id: "saying-sorry", title: "Saying Sorry", emoji: "\u{1F495}",
        description: "How to apologise when you make a mistake",
        steps: [
            { emoji: "\u{1F614}", text: "Sometimes I might do or say something that hurts someone's feelings. Everyone makes mistakes \u2014 that's okay." },
            { emoji: "\u{1F4AD}", text: "First, I think about what happened. What did I do? How did it make the other person feel?" },
            { emoji: "\u{1F6B6}", text: "I go to the person I hurt. I look at them (or near them) so they know I'm being serious." },
            { emoji: "\u{1F4AC}", text: "I say: \"I'm sorry for [what I did]. I didn't mean to hurt your feelings.\" I try to mean it." },
            { emoji: "\u{1F91D}", text: "I ask: \"Are you okay?\" or \"Is there anything I can do to make it better?\"" },
            { emoji: "\u{1F4AA}", text: "I try not to do the same thing again. Saying sorry and learning from mistakes makes me a good friend." }
        ]
    }
];

/* ===== GROUNDING STEPS (5-4-3-2-1) ===== */
const GROUNDING_STEPS = [
    { emoji: "\u{1F440}", text: "Look around and name 5 things you can SEE.\n\nFor example: a window, a book, your shoes, a clock, a tree outside.\n\nTake your time \u2014 really look at each one." },
    { emoji: "\u{270B}", text: "Notice 4 things you can TOUCH.\n\nFor example: your shirt, the chair, your hair, the desk.\n\nReally feel the texture of each one." },
    { emoji: "\u{1F442}", text: "Listen for 3 things you can HEAR.\n\nFor example: birds outside, the clock ticking, someone talking.\n\nClose your eyes if it helps you listen." },
    { emoji: "\u{1F443}", text: "Notice 2 things you can SMELL.\n\nFor example: your lunch, fresh air, soap on your hands.\n\nTake a slow, deep sniff." },
    { emoji: "\u{1F445}", text: "Notice 1 thing you can TASTE.\n\nFor example: toothpaste, water, your last snack.\n\nYou're doing amazing! You should feel calmer now. \u{1F31F}" }
];

/* ===== THERMOMETER DATA ===== */
const THERM_LEVELS = [
    { emoji: "\u{1F60A}", label: "Calm", color: "#4caf50", tip: "You're feeling calm and peaceful. That's a great place to be! Enjoy this feeling." },
    { emoji: "\u{1F610}", label: "A little upset", color: "#8bc34a", tip: "You're a little bit bothered. That's okay! Try taking a few slow breaths or talking to someone about it." },
    { emoji: "\u{1F615}", label: "Medium upset", color: "#ffeb3b", tip: "Your feelings are getting stronger. This is a good time to use a calming tool \u2014 like deep breathing or the 5-4-3-2-1 game." },
    { emoji: "\u{1F61F}", label: "Very upset", color: "#ff9800", tip: "You're feeling a lot right now. That's okay! Try going to a quiet place, squeezing something soft, or talking to a trusted adult." },
    { emoji: "\u{1F62D}", label: "Overwhelmed", color: "#f44336", tip: "Your feelings are really big right now. You need help! Please talk to a parent, teacher, or trusted adult. You could also try the Calm Down Corner." }
];

/* ===== BADGES ===== */
const BADGES = [
    { id: "first-star", emoji: "\u{2B50}", name: "First Star", desc: "Earn your first star", condition: (s) => s.totalStars >= 1 },
    { id: "star-10", emoji: "\u{1F31F}", name: "Rising Star", desc: "Earn 10 stars", condition: (s) => s.totalStars >= 10 },
    { id: "star-25", emoji: "\u{1F4AB}", name: "Shining Bright", desc: "Earn 25 stars", condition: (s) => s.totalStars >= 25 },
    { id: "star-50", emoji: "\u{1F320}", name: "Shooting Star", desc: "Earn 50 stars", condition: (s) => s.totalStars >= 50 },
    { id: "star-100", emoji: "\u{1F3C6}", name: "Superstar", desc: "Earn 100 stars", condition: (s) => s.totalStars >= 100 },
    { id: "emotions-done", emoji: "\u{1F60A}", name: "Feelings Expert", desc: "Complete Understanding Emotions", condition: (s) => (s.categoriesCompleted || []).includes("emotions") },
    { id: "conversations-done", emoji: "\u{1F4AC}", name: "Great Talker", desc: "Complete Conversations", condition: (s) => (s.categoriesCompleted || []).includes("conversations") },
    { id: "friends-done", emoji: "\u{1F91D}", name: "Best Friend", desc: "Complete Being a Good Friend", condition: (s) => (s.categoriesCompleted || []).includes("friendships") },
    { id: "body-done", emoji: "\u{1F64B}", name: "Body Reader", desc: "Complete Body Language", condition: (s) => (s.categoriesCompleted || []).includes("body-language") },
    { id: "tricky-done", emoji: "\u{1F914}", name: "Problem Solver", desc: "Complete Tricky Situations", condition: (s) => (s.categoriesCompleted || []).includes("tricky-situations") },
    { id: "feelings-done", emoji: "\u{1F496}", name: "Self-Aware Star", desc: "Complete My Own Feelings", condition: (s) => (s.categoriesCompleted || []).includes("feelings-check") },
    { id: "all-cats", emoji: "\u{1F451}", name: "Social Champion", desc: "Complete all 6 categories", condition: (s) => (s.categoriesCompleted || []).length >= 6 },
    { id: "emotion-match", emoji: "\u{1F3AD}", name: "Face Reader", desc: "Complete Emotion Match", condition: (s) => s.emotionMatchDone },
    { id: "checkin-3", emoji: "\u{1F4D3}", name: "Journal Keeper", desc: "Do 3 daily check-ins", condition: (s) => (s.checkins || []).length >= 3 },
    { id: "checkin-7", emoji: "\u{1F4D6}", name: "Feelings Tracker", desc: "Do 7 daily check-ins", condition: (s) => (s.checkins || []).length >= 7 },
    { id: "calm-used", emoji: "\u{1F9D8}", name: "Calm Master", desc: "Use the Calm Down Corner", condition: (s) => s.calmUsed },
    { id: "story-read", emoji: "\u{1F4D6}", name: "Story Explorer", desc: "Read a Social Story", condition: (s) => s.storyRead },
    { id: "perfect-round", emoji: "\u{1F48E}", name: "Perfect Round", desc: "Get all answers right in one topic", condition: (s) => s.perfectRound }
];

/* ===== THEMES ===== */
const THEMES = [
    { id: "default", name: "Starlight", emoji: "\u{2B50}", desc: "The classic look", starsNeeded: 0, className: "" },
    { id: "ocean", name: "Ocean Wave", emoji: "\u{1F30A}", desc: "Cool blue vibes", starsNeeded: 15, className: "theme-ocean" },
    { id: "forest", name: "Forest Green", emoji: "\u{1F332}", desc: "Nature and calm", starsNeeded: 30, className: "theme-forest" },
    { id: "sunset", name: "Sunset Glow", emoji: "\u{1F305}", desc: "Warm and cozy", starsNeeded: 50, className: "theme-sunset" },
    { id: "galaxy", name: "Galaxy Purple", emoji: "\u{1F52E}", desc: "Out of this world", starsNeeded: 75, className: "theme-galaxy" }
];

/* ===== CHECK-IN RESPONSES ===== */
const CHECKIN_RESPONSES = {
    great: "That's wonderful! I'm so glad you're feeling great today! \u{1F31F} Keep spreading that positive energy!",
    good: "Nice! Feeling good is a great way to be. \u{1F60A} I hope your day stays lovely!",
    okay: "Feeling okay is perfectly fine! \u{1F44D} Not every day has to be amazing. You're doing great just by checking in.",
    sad: "I'm sorry you're feeling sad today. \u{1F49C} Remember, it's okay to feel this way. Would you like to visit the Calm Down Corner?",
    angry: "It sounds like something is bothering you. \u{1F4AA} Feeling angry is normal. Taking some deep breaths might help. The Calm Down Corner is here for you!",
    worried: "Worries can feel really big sometimes. \u{1F917} Talking about them can help make them smaller. You're brave for sharing how you feel!"
};
