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
    { id: "emotions-done", emoji: "\u{1F60A}", name: "Feelings Expert", desc: "Play Learn & Play \u2192 Understanding Emotions", condition: (s) => (s.categoriesCompleted || []).includes("emotions") },
    { id: "conversations-done", emoji: "\u{1F4AC}", name: "Great Talker", desc: "Play Learn & Play \u2192 Conversations", condition: (s) => (s.categoriesCompleted || []).includes("conversations") },
    { id: "friends-done", emoji: "\u{1F91D}", name: "Best Friend", desc: "Play Learn & Play \u2192 Being a Good Friend", condition: (s) => (s.categoriesCompleted || []).includes("friendships") },
    { id: "body-done", emoji: "\u{1F64B}", name: "Body Reader", desc: "Play Learn & Play \u2192 Body Language", condition: (s) => (s.categoriesCompleted || []).includes("body-language") },
    { id: "tricky-done", emoji: "\u{1F914}", name: "Problem Solver", desc: "Play Learn & Play \u2192 Tricky Situations", condition: (s) => (s.categoriesCompleted || []).includes("tricky-situations") },
    { id: "feelings-done", emoji: "\u{1F496}", name: "Self-Aware Star", desc: "Play Learn & Play \u2192 My Own Feelings", condition: (s) => (s.categoriesCompleted || []).includes("feelings-check") },
    { id: "all-cats", emoji: "\u{1F451}", name: "Social Champion", desc: "Complete all 6 Learn & Play topics", condition: (s) => (s.categoriesCompleted || []).length >= 6 },
    { id: "emotion-match", emoji: "\u{1F3AD}", name: "Face Reader", desc: "Complete Emotion Match game", condition: (s) => s.emotionMatchDone },
    { id: "checkin-3", emoji: "\u{1F4D3}", name: "Journal Keeper", desc: "Do 3 daily check-ins", condition: (s) => (s.checkins || []).length >= 3 },
    { id: "checkin-7", emoji: "\u{1F4D6}", name: "Feelings Tracker", desc: "Do 7 daily check-ins", condition: (s) => (s.checkins || []).length >= 7 },
    { id: "calm-used", emoji: "\u{1F9D8}", name: "Calm Master", desc: "Use any Calm Down Corner tool", condition: (s) => s.calmUsed },
    { id: "story-read", emoji: "\u{1F4D6}", name: "Story Explorer", desc: "Read a Social Story to the end", condition: (s) => s.storyRead },
    { id: "perfect-round", emoji: "\u{1F48E}", name: "Perfect Round", desc: "Get ALL answers right in one Learn & Play topic", condition: (s) => s.perfectRound },
    { id: "tone-done", emoji: "\u{1F5E3}\uFE0F", name: "Tone Detective", desc: "Complete Tone of Voice game", condition: (s) => s.toneDone },
    { id: "persp-done", emoji: "\u{1F440}", name: "Empathy Star", desc: "Complete Their Point of View game", condition: (s) => s.perspDone },
    { id: "vocab-done", emoji: "\u{1F4D6}", name: "Word Wizard", desc: "Read all Feelings Words cards", condition: (s) => s.vocabDone },
    { id: "coping-done", emoji: "\u{1F3B4}", name: "Coping Pro", desc: "View 5 Coping Cards", condition: (s) => s.copingDone },
    { id: "rules-read", emoji: "\u{1F4CB}", name: "Rule Knower", desc: "Read the Social Rules", condition: (s) => s.rulesRead },
    { id: "timer-used", emoji: "\u{23F1}\uFE0F", name: "Time Keeper", desc: "Complete a Visual Timer countdown", condition: (s) => s.timerUsed },
    { id: "star-150", emoji: "\u{1F31F}", name: "Mega Star", desc: "Earn 150 stars", condition: (s) => s.totalStars >= 150 },
    { id: "star-200", emoji: "\u{1F4A5}", name: "Legendary", desc: "Earn 200 stars", condition: (s) => s.totalStars >= 200 },
    { id: "star-300", emoji: "\u{1F525}", name: "On Fire", desc: "Earn 300 stars", condition: (s) => s.totalStars >= 300 },
    { id: "star-500", emoji: "\u{1F48E}", name: "Diamond Star", desc: "Earn 500 stars", condition: (s) => s.totalStars >= 500 },
    { id: "star-750", emoji: "\u{1F30D}", name: "World Changer", desc: "Earn 750 stars", condition: (s) => s.totalStars >= 750 },
    { id: "star-1000", emoji: "\u{1F3C6}", name: "Ultimate Champion", desc: "Earn 1000 stars!", condition: (s) => s.totalStars >= 1000 },
    { id: "chores-done", emoji: "\u{2705}", name: "Helper Star", desc: "Complete all chores in one day", condition: (s) => s.choresDayComplete },
    { id: "weekly-done", emoji: "\u{1F4C5}", name: "Weekly Winner", desc: "Complete a weekly challenge", condition: (s) => s.weeklyComplete },
    { id: "replay-5", emoji: "\u{1F504}", name: "Practice Pro", desc: "Replay activities 5 times", condition: (s) => (s.replayCount || 0) >= 5 },
    { id: "em-lv2", emoji: "\u{1F3AD}", name: "Emotion Match Lv2", desc: "Complete Emotion Match Level 2", condition: (s) => (s.levelsDone || {}).em >= 2 },
    { id: "em-lv3", emoji: "\u{1F3AD}", name: "Emotion Match Lv3", desc: "Complete Emotion Match Level 3", condition: (s) => (s.levelsDone || {}).em >= 3 },
    { id: "tone-lv2", emoji: "\u{1F5E3}\uFE0F", name: "Tone Expert Lv2", desc: "Complete Tone of Voice Level 2", condition: (s) => (s.levelsDone || {}).tone >= 2 },
    { id: "tone-lv3", emoji: "\u{1F5E3}\uFE0F", name: "Tone Master Lv3", desc: "Complete Tone of Voice Level 3", condition: (s) => (s.levelsDone || {}).tone >= 3 },
    { id: "persp-lv2", emoji: "\u{1F440}", name: "Empathy Lv2", desc: "Complete Perspective Taking Level 2", condition: (s) => (s.levelsDone || {}).persp >= 2 },
    { id: "persp-lv3", emoji: "\u{1F440}", name: "Empathy Master Lv3", desc: "Complete Perspective Taking Level 3", condition: (s) => (s.levelsDone || {}).persp >= 3 },
    { id: "hf-lv2", emoji: "\u{1FA9E}", name: "Self-Aware Lv2", desc: "Complete How Would You Feel Level 2", condition: (s) => (s.levelsDone || {}).hf >= 2 },
    { id: "hf-lv3", emoji: "\u{1FA9E}", name: "Self-Aware Master Lv3", desc: "Complete How Would You Feel Level 3", condition: (s) => (s.levelsDone || {}).hf >= 3 },
    { id: "all-badges", emoji: "\u{1F3C5}", name: "Badge Collector", desc: "Earn 20 other badges", condition: (s) => (s.earnedBadges || []).length >= 20 }
];

/* ===== THEMES ===== */
const THEMES = [
    { id: "default", name: "Starlight", emoji: "\u{2B50}", desc: "The classic look", starsNeeded: 0, className: "", starIcon: "\u{2B50}", celebIcon: "\u{1F31F}", welcomeChar: "\u{1F31F}" },
    { id: "unicorn", name: "Unicorn Dreams", emoji: "\u{1F984}", desc: "Sparkles and magic", starsNeeded: 5, className: "theme-unicorn", starIcon: "\u{1F984}", celebIcon: "\u{2728}", welcomeChar: "\u{1F984}" },
    { id: "princess", name: "Princess Kingdom", emoji: "\u{1F451}", desc: "Royal and golden", starsNeeded: 15, className: "theme-princess", starIcon: "\u{1F451}", celebIcon: "\u{1F490}", welcomeChar: "\u{1F478}" },
    { id: "fairy", name: "Fairy Tales", emoji: "\u{1F9DA}", desc: "Magical and enchanting", starsNeeded: 25, className: "theme-fairy", starIcon: "\u{1F33C}", celebIcon: "\u{1F9DA}", welcomeChar: "\u{1F9DA}" },
    { id: "ocean", name: "Ocean Adventure", emoji: "\u{1F30A}", desc: "Under the sea", starsNeeded: 35, className: "theme-ocean", starIcon: "\u{1F41A}", celebIcon: "\u{1F42C}", welcomeChar: "\u{1F42C}" },
    { id: "cherry", name: "Cherry Blossom", emoji: "\u{1F338}", desc: "Soft and peaceful", starsNeeded: 45, className: "theme-cherry", starIcon: "\u{1F338}", celebIcon: "\u{1F33A}", welcomeChar: "\u{1F338}" },
    { id: "katseye", name: "Katseye", emoji: "\u{1F431}", desc: "Cool and confident", starsNeeded: 55, className: "theme-katseye", starIcon: "\u{1F431}", celebIcon: "\u{1F3A4}", welcomeChar: "\u{1F3B6}" },
    { id: "space", name: "Space Explorer", emoji: "\u{1F680}", desc: "To the stars and beyond", starsNeeded: 70, className: "theme-space", starIcon: "\u{1FA90}", celebIcon: "\u{1F680}", welcomeChar: "\u{1F680}" },
    { id: "galaxy", name: "Galaxy Purple", emoji: "\u{1F52E}", desc: "Mysterious and deep", starsNeeded: 85, className: "theme-galaxy", starIcon: "\u{1F52E}", celebIcon: "\u{1F30C}", welcomeChar: "\u{1F52E}" },
    { id: "rainbow", name: "Rainbow Magic", emoji: "\u{1F308}", desc: "All the colours!", starsNeeded: 100, className: "theme-rainbow", starIcon: "\u{1F308}", celebIcon: "\u{1F389}", welcomeChar: "\u{1F308}" }
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


/* ===== TONE OF VOICE DATA ===== */
var TONE_OF_VOICE = [
    { emoji:"\u{1F60F}", quote:"\"Oh great, another test. Just what I wanted.\"", context:"A student says this after the teacher announces a surprise test. They roll their eyes.", answer:"Sarcastic", options:["Serious","Sarcastic","Joking","Excited"], correctFeedback:"That's right! They don't actually want a test. The eye roll and tone tell us they mean the opposite of what they said. That's sarcasm!", encourageFeedback:"Tricky one! When someone says something positive but their face and voice show the opposite, they're being sarcastic \u2014 meaning the opposite of their words." },
    { emoji:"\u{1F602}", quote:"\"You're SO slow, you'd lose a race to a snail!\"", context:"Your best friend says this while laughing after you take a long time choosing an ice cream flavour.", answer:"Joking", options:["Mean","Joking","Serious","Sarcastic"], correctFeedback:"Exactly! Your friend is teasing in a playful way. The laughing and the silly exaggeration (racing a snail!) tell us it's a joke.", encourageFeedback:"When a friend says something silly while laughing, they're usually joking! The key clues are: they're smiling, it's exaggerated, and they're your friend." },
    { emoji:"\u{1F6D1}", quote:"\"Please don't touch that. It's very fragile.\"", context:"A museum guide says this calmly while pointing to a glass sculpture.", answer:"Serious", options:["Joking","Sarcastic","Serious","Angry"], correctFeedback:"Right! The museum guide is being serious \u2014 they genuinely don't want you to touch it. Their calm, clear tone tells us this is a real instruction.", encourageFeedback:"When someone speaks calmly and clearly about something important, they're being serious. There's no laughing or eye-rolling \u2014 they mean exactly what they say." },
    { emoji:"\u{1F611}", quote:"\"Sure, I LOVE waiting in line for an hour.\"", context:"Your mum says this while standing in a very long queue at the shop, sighing.", answer:"Sarcastic", options:["Serious","Happy","Sarcastic","Joking"], correctFeedback:"You got it! Mum doesn't actually love waiting. The sigh and the emphasis on \"LOVE\" are clues that she means the opposite.", encourageFeedback:"When someone emphasises a word strongly and their body language doesn't match (like sighing), they're usually being sarcastic \u2014 saying the opposite of what they mean." },
    { emoji:"\u{1F923}", quote:"\"I'm basically a professional chef now!\"", context:"Your friend says this proudly after successfully making toast for the first time.", answer:"Joking", options:["Serious","Sarcastic","Bragging","Joking"], correctFeedback:"That's right! They know making toast doesn't make them a chef \u2014 they're being funny about a small achievement. The exaggeration is the clue!", encourageFeedback:"When someone exaggerates something small in a fun way, they're joking! They know toast isn't gourmet cooking \u2014 they're being playfully silly." },
    { emoji:"\u{1F468}\u200D\u2695\uFE0F", quote:"\"You need to take this medicine twice a day with food.\"", context:"A doctor says this while writing a prescription, looking at you directly.", answer:"Serious", options:["Joking","Sarcastic","Serious","Nervous"], correctFeedback:"Correct! The doctor is giving important health instructions. Their direct eye contact and clear words tell us this is serious.", encourageFeedback:"Doctors give serious instructions about health. When someone looks at you directly and speaks clearly about something important, they're being serious." },
    { emoji:"\u{1F612}", quote:"\"Oh wonderful, my phone just died. Perfect timing.\"", context:"Your sister says this when her phone runs out of battery right before she needed to call someone.", answer:"Sarcastic", options:["Happy","Sarcastic","Joking","Confused"], correctFeedback:"Spot on! She's frustrated, not happy. Saying \"wonderful\" and \"perfect\" when something bad happens is classic sarcasm.", encourageFeedback:"When someone uses positive words (wonderful, perfect) about a negative situation, and they sound annoyed, that's sarcasm! They mean the opposite." },
    { emoji:"\u{1F609}", quote:"\"Watch out, I might eat ALL the pizza before you get any!\"", context:"Your dad says this with a wink while putting pizza on the table for everyone.", answer:"Joking", options:["Serious","Threatening","Joking","Sarcastic"], correctFeedback:"Right! Dad's wink and the fact that he's serving everyone tells us he's joking. He's not really going to eat it all!", encourageFeedback:"A wink is a big clue that someone is joking! Dad is being playful \u2014 he's putting pizza out for everyone, so he clearly doesn't mean it." }
];

/* ===== PERSPECTIVE TAKING DATA ===== */
var PERSPECTIVE_TAKING = [
    { emoji:"\u{1F466}", text:"You're playing with a toy and your little brother asks if he can have a turn. You say \"No, I'm still playing.\" He walks away with his head down. How does your brother probably feel?", choices:[{text:"Sad and disappointed",correct:true},{text:"Happy for you",correct:false},{text:"Angry at the toy",correct:false}], correctFeedback:"That's right. When someone walks away with their head down after being told no, they're probably feeling sad and disappointed. Even though you were still playing, it helps to notice how others feel.", encourageFeedback:"When someone asks for something and gets told no, then walks away with their head down, they're usually feeling sad or disappointed. Noticing this helps us be kind." },
    { emoji:"\u{1F467}", text:"You got picked for the school play but your friend didn't. Your friend says \"Congratulations\" but their smile looks forced. How might your friend be feeling?", choices:[{text:"Truly happy for you",correct:false},{text:"Happy for you but also disappointed for themselves",correct:true},{text:"Angry at the teacher",correct:false}], correctFeedback:"Great insight! People can feel two things at once. Your friend is trying to be happy for you, but they're also disappointed they didn't get picked. That's called mixed feelings.", encourageFeedback:"Sometimes people feel two things at the same time! Your friend might be happy for you AND sad for themselves. A forced smile is a clue that they're hiding some sadness." },
    { emoji:"\u{1F469}", text:"You're telling your mum about your day but she keeps looking at her phone. You feel annoyed. But then you notice she looks worried. What might be going on for her?", choices:[{text:"She doesn't care about your day",correct:false},{text:"She's being rude on purpose",correct:false},{text:"She might have received some worrying news and is distracted",correct:true}], correctFeedback:"That's really thoughtful! Sometimes when people seem distracted, they have something on their mind. Noticing her worried face shows great empathy.", encourageFeedback:"When someone seems distracted, it's not always about us. If your mum looks worried, she might have received some concerning news. Asking \"Are you okay, Mum?\" would be really kind." },
    { emoji:"\u{1F9D1}", text:"A new student joins your class mid-year. At lunch, they sit alone and don't talk to anyone. How might they be feeling?", choices:[{text:"They probably want to be alone",correct:false},{text:"Nervous, lonely, and unsure how to join in",correct:true},{text:"They don't like anyone in the class",correct:false}], correctFeedback:"That's right! Starting at a new school is really hard. They probably want to make friends but don't know how to start. Inviting them to sit with you would mean the world!", encourageFeedback:"New students often feel nervous and lonely, not unfriendly. They might not know how to start a conversation. A simple \"Want to sit with us?\" can change their whole day." },
    { emoji:"\u{1F474}", text:"Your grandpa keeps asking you the same question he asked 5 minutes ago. You feel frustrated. But why might grandpa be repeating himself?", choices:[{text:"He's trying to annoy you",correct:false},{text:"He might be forgetful because of his age, and he doesn't realise he already asked",correct:true},{text:"He wasn't listening to your answer",correct:false}], correctFeedback:"That's very understanding! As people get older, their memory can change. Grandpa isn't trying to annoy you \u2014 he genuinely might not remember asking. Being patient with him is really kind.", encourageFeedback:"Older people sometimes have trouble with memory. Grandpa probably doesn't realise he already asked. Being patient and answering kindly shows real maturity and love." },
    { emoji:"\u{1F46B}", text:"Your friend cancels plans with you to hang out with someone else. You feel hurt. But your friend says the other person was really upset and needed support. How might you see this differently?", choices:[{text:"Your friend is a bad friend",correct:false},{text:"Your friend was trying to help someone who really needed it \u2014 it wasn't about not wanting to see you",correct:true},{text:"The other person is more important than you",correct:false}], correctFeedback:"That's a really mature way to see it! Your friend was being kind to someone in need. It doesn't mean they don't care about you \u2014 you can always reschedule.", encourageFeedback:"Sometimes friends need to help others in tough moments. It doesn't mean you're less important! Understanding this shows real emotional intelligence." }
];

/* ===== COPING STRATEGY CARDS ===== */
var COPING_CARDS = [
    { emoji:"\u{1F4A8}", title:"Deep Belly Breaths", text:"Put your hand on your tummy. Breathe in slowly through your nose for 4 counts. Feel your tummy push out. Breathe out through your mouth for 6 counts. Do this 5 times." },
    { emoji:"\u{1F9CA}", title:"Ice Cube Hold", text:"Hold an ice cube in your hand. Focus on how it feels \u2014 cold, wet, melting. This helps your brain focus on something physical instead of big feelings." },
    { emoji:"\u{1F3B5}", title:"Hum Your Favourite Song", text:"Pick a song you love and hum it quietly. The vibration in your chest and the familiar melody can help calm your nervous system." },
    { emoji:"\u{1F4AA}", title:"Tense and Release", text:"Squeeze your fists really tight for 5 seconds. Then let go completely. Feel the difference! Do the same with your shoulders, your toes, and your face." },
    { emoji:"\u{1F30A}", title:"Wave Breathing", text:"Imagine you're at the beach. As a wave comes in, breathe in. As it goes out, breathe out. Picture the waves getting smaller and calmer." },
    { emoji:"\u{1F4AC}", title:"Talk to Someone", text:"Find a person you trust \u2014 a parent, teacher, or friend. Say \"I'm feeling [emotion] because [reason].\" You don't have to handle big feelings alone." },
    { emoji:"\u{1F3A8}", title:"Draw Your Feelings", text:"Grab some paper and draw how you feel. It doesn't have to look like anything! Use colours and shapes. Angry might be red zigzags. Sad might be blue rain." },
    { emoji:"\u{1F6B6}", title:"Take a Walk", text:"Moving your body helps your brain calm down. Walk around the room, the garden, or the school. Pay attention to what you see, hear, and feel as you walk." },
    { emoji:"\u{1F9F8}", title:"Comfort Object", text:"Hold something soft and comforting \u2014 a stuffed animal, a blanket, or a smooth stone. Squeeze it gently and focus on how it feels in your hands." },
    { emoji:"\u{1F4D6}", title:"Read or Listen to a Story", text:"Stories can take your mind to a different place. Pick a favourite book or ask someone to read to you. Let yourself get lost in the story." },
    { emoji:"\u{2708}\uFE0F", title:"Happy Place Imagination", text:"Close your eyes. Imagine your favourite place \u2014 maybe a beach, your bedroom, or grandma's house. What do you see? Hear? Smell? Stay there for a minute." },
    { emoji:"\u{1F4DD}", title:"Write It Down", text:"Grab a piece of paper and write down what's bothering you. You don't have to show anyone. Sometimes getting thoughts out of your head and onto paper helps them feel smaller." }
];


/* ===== ADDITIONAL SCENARIOS (doubles content per category) ===== */
SCENARIOS.emotions.push(
    { difficulty:1, emoji:"\u{1F60D}", text:"Your friend just got a puppy! They're hugging it and can't stop smiling. How are they feeling?", choices:[{text:"Overjoyed and loving",correct:true},{text:"Nervous",correct:false},{text:"Bored",correct:false}], correctFeedback:"Yes! Hugging and non-stop smiling are signs of pure joy and love!", encourageFeedback:"When someone hugs something and can't stop smiling, they're feeling overjoyed!" },
    { difficulty:2, emoji:"\u{1F625}", text:"Your classmate just dropped their lunch tray in the cafeteria. Everyone looked. Their face is bright red and they're looking at the floor. How might they feel?", choices:[{text:"Proud",correct:false},{text:"Embarrassed",correct:true},{text:"Excited",correct:false}], correctFeedback:"Right! A red face and looking down after something awkward means embarrassment. It happens to everyone!", encourageFeedback:"When something awkward happens in front of people, the red face and looking down are signs of embarrassment." },
    { difficulty:2, emoji:"\u{1F929}", text:"A girl just found out she made the school football team. She's pumping her fist and jumping. How is she feeling?", choices:[{text:"Proud and thrilled",correct:true},{text:"Confused",correct:false},{text:"Worried",correct:false}], correctFeedback:"Exactly! Fist pumping and jumping show she's proud and thrilled about her achievement!", encourageFeedback:"Fist pumping and jumping are big celebration moves \u2014 she's feeling proud and thrilled!" },
    { difficulty:3, emoji:"\u{1F9D0}", text:"Your friend says they're fine but they keep sighing and staring out the window. What might they actually be feeling?", choices:[{text:"Happy and content",correct:false},{text:"They might be sad or thoughtful, even though they said they're fine",correct:true},{text:"Excited about something outside",correct:false}], correctFeedback:"Great insight! Sighing and staring can mean someone is sad or deep in thought, even when they say they're fine.", encourageFeedback:"Sometimes people say they're fine when they're not. Sighing and staring are clues that something might be on their mind." },
    { difficulty:3, emoji:"\u{1F972}", text:"Your mum is watching a movie and she's smiling but also has tears in her eyes. What's going on?", choices:[{text:"She's feeling touched or moved \u2014 sometimes happy things make us cry too",correct:true},{text:"She's angry at the movie",correct:false},{text:"She's scared",correct:false}], correctFeedback:"Wonderful observation! Happy tears are real! When something is beautiful or touching, people can smile and cry at the same time.", encourageFeedback:"This is a tricky one! Sometimes people cry from happiness or being deeply moved. Smiling + tears usually means something touched their heart." }
);

SCENARIOS.conversations.push(
    { difficulty:1, emoji:"\u{1F44D}", text:"Someone gives you a compliment and says \"I like your shirt!\" What's a good response?", choices:[{text:"Ignore them",correct:false},{text:"Say \"Thank you!\" and smile",correct:true},{text:"Say \"I know, it's expensive\"",correct:false}], correctFeedback:"Perfect! A simple \"Thank you!\" with a smile is the best way to receive a compliment.", encourageFeedback:"When someone says something nice, \"Thank you!\" is always a great response. It shows you appreciate their kindness." },
    { difficulty:2, emoji:"\u{1F4F1}", text:"You're texting a friend and they send a short reply like \"k\". You're not sure if they're upset. What could you do?", choices:[{text:"Assume they hate you",correct:false},{text:"Send 20 more messages asking if they're okay",correct:false},{text:"Remember that short texts don't always mean someone is upset \u2014 they might just be busy",correct:true}], correctFeedback:"Smart thinking! Short texts often just mean someone is busy. If you're worried, you could ask \"Everything okay?\" once.", encourageFeedback:"Short texts can feel confusing! But they usually just mean someone is busy. A simple \"Everything okay?\" is fine if you're worried." },
    { difficulty:3, emoji:"\u{1F910}", text:"You accidentally interrupt someone who was talking. What should you do?", choices:[{text:"Keep talking since you already started",correct:false},{text:"Say \"Sorry, go ahead\" and let them finish",correct:true},{text:"Pretend it didn't happen",correct:false}], correctFeedback:"That's really polite! Saying \"Sorry, go ahead\" shows respect and good conversation skills.", encourageFeedback:"Interrupting happens to everyone! The best thing is to say \"Sorry, go ahead\" and let them finish their thought." }
);

SCENARIOS.friendships.push(
    { difficulty:1, emoji:"\u{1F3C3}", text:"Your friend falls down during a race. What should you do?", choices:[{text:"Keep running to win",correct:false},{text:"Stop and ask if they're okay",correct:true},{text:"Laugh at them",correct:false}], correctFeedback:"That's what a true friend does! Checking on someone who's hurt is more important than winning.", encourageFeedback:"A good friend stops to help. Asking \"Are you okay?\" shows you care more about them than winning." },
    { difficulty:2, emoji:"\u{1F3A8}", text:"Your friend is really good at drawing but you're not. You feel jealous. What's a healthy way to handle this?", choices:[{text:"Tell them their drawings aren't that good",correct:false},{text:"Appreciate their talent and ask them to teach you some tips",correct:true},{text:"Stop being friends with them",correct:false}], correctFeedback:"That's a great attitude! Everyone has different strengths. Asking a friend to teach you is a wonderful way to learn and bond.", encourageFeedback:"Jealousy is normal! But a great response is to appreciate your friend's talent and ask them to share some tips with you." },
    { difficulty:3, emoji:"\u{1F46F}", text:"You notice your friend is being left out by other kids at school. What could you do?", choices:[{text:"Join the other kids so you don't get left out too",correct:false},{text:"Invite your friend to join you and include them",correct:true},{text:"Pretend you didn't notice",correct:false}], correctFeedback:"That's really brave and kind! Including someone who's being left out can change their whole day. You'd be an amazing friend.", encourageFeedback:"It takes courage, but inviting someone who's being left out to join you is one of the kindest things you can do." }
);

SCENARIOS["body-language"].push(
    { difficulty:1, emoji:"\u{1F44F}", text:"Everyone in the audience is clapping and smiling after a school performance. What does this body language mean?", choices:[{text:"They enjoyed the show and want to show appreciation",correct:true},{text:"They're trying to scare the performers",correct:false},{text:"They're bored",correct:false}], correctFeedback:"That's right! Clapping is how we show we enjoyed something. It's a way of saying \"Great job!\"", encourageFeedback:"Clapping and smiling after a performance means the audience enjoyed it! It's their way of saying \"Well done!\"" },
    { difficulty:2, emoji:"\u{1F64E}", text:"Someone is talking to you with their hands on their hips and a stern face. What might they be feeling?", choices:[{text:"Relaxed and happy",correct:false},{text:"Frustrated or serious about something",correct:true},{text:"Sleepy",correct:false}], correctFeedback:"Good reading! Hands on hips with a stern face usually means someone is frustrated or being very serious.", encourageFeedback:"Hands on hips + stern face = frustrated or serious. This body language says \"I mean business\" or \"I'm not happy about this.\"" },
    { difficulty:3, emoji:"\u{1F937}", text:"Your friend shrugs their shoulders when you ask what they want to do. What does the shrug mean?", choices:[{text:"They're angry at you",correct:false},{text:"They don't know or don't have a preference",correct:true},{text:"They want to go home",correct:false}], correctFeedback:"Exactly! A shrug usually means \"I don't know\" or \"I don't mind either way.\" You could suggest something!", encourageFeedback:"Shrugging is a universal body language for \"I don't know\" or \"I'm not sure.\" It's not rude \u2014 they just don't have a preference." }
);

SCENARIOS["tricky-situations"].push(
    { difficulty:1, emoji:"\u{1F4E2}", text:"A fire alarm goes off at school. What should you do?", choices:[{text:"Stay calm, follow your teacher, and walk to the meeting point",correct:true},{text:"Run as fast as you can",correct:false},{text:"Hide under your desk",correct:false}], correctFeedback:"Perfect! Staying calm and following instructions is the safest thing to do. Your teacher will guide you.", encourageFeedback:"When alarms go off, the best thing is to stay calm and follow your teacher's instructions. They know what to do!" },
    { difficulty:2, emoji:"\u{1F6B8}", text:"A stranger offers you sweets and asks you to come with them. What should you do?", choices:[{text:"Go with them because sweets are nice",correct:false},{text:"Say \"No thank you\" firmly, walk away, and tell a trusted adult immediately",correct:true},{text:"Take the sweets but don't go with them",correct:false}], correctFeedback:"That's exactly right! Never go with strangers. Say no, walk away, and tell a trusted adult right away. Your safety comes first.", encourageFeedback:"This is really important: never go with strangers, even if they offer nice things. Say \"No\", walk away, and tell a parent or teacher immediately." },
    { difficulty:3, emoji:"\u{1F4BB}", text:"You see someone being bullied in an online game chat. What could you do?", choices:[{text:"Join in so you don't become a target",correct:false},{text:"Don't respond to the bully, support the person being bullied privately, and report it",correct:true},{text:"Leave the game and forget about it",correct:false}], correctFeedback:"That's the right approach! Supporting the person privately and reporting the bully helps without making things worse.", encourageFeedback:"Online bullying is serious. The best approach: don't engage the bully, send a kind message to the person being bullied, and use the report button." }
);

SCENARIOS["feelings-check"].push(
    { difficulty:1, emoji:"\u{1F634}", text:"You're feeling really tired but you still have homework to do. What could help?", choices:[{text:"Stay up really late to finish everything",correct:false},{text:"Take a short break, have a healthy snack, then do a little bit at a time",correct:true},{text:"Don't do the homework at all",correct:false}], correctFeedback:"Smart strategy! Breaking things into small pieces with breaks helps your brain work better when you're tired.", encourageFeedback:"When you're tired, small steps work best! Take a break, have a snack, then do a little bit. You don't have to do it all at once." },
    { difficulty:2, emoji:"\u{1F92F}", text:"Everything feels like too much right now \u2014 school, friends, activities. You feel overwhelmed. What could help?", choices:[{text:"Keep pushing through and ignore the feeling",correct:false},{text:"Talk to someone you trust and figure out what you can take a break from",correct:true},{text:"Quit everything",correct:false}], correctFeedback:"That's really wise! When everything feels like too much, talking to someone helps you figure out what's most important and what can wait.", encourageFeedback:"Feeling overwhelmed is your brain saying \"this is too much.\" Talking to a trusted adult can help you figure out what to prioritise." },
    { difficulty:3, emoji:"\u{1F614}", text:"You feel left out because your friends hung out without inviting you. What's a healthy way to handle this?", choices:[{text:"Post something mean about them online",correct:false},{text:"Tell your friends calmly: \"I felt left out when you hung out without me. Can I join next time?\"",correct:true},{text:"Never talk to them again",correct:false}], correctFeedback:"That's really mature! Using \"I feel\" statements to express your feelings calmly is one of the best communication skills there is.", encourageFeedback:"Feeling left out hurts! But the healthiest response is to tell your friends calmly how you felt. \"I felt left out\" is much better than getting angry." }
);

/* ===== STAR OF THE DAY ===== */
var STAR_OF_THE_DAY = [
    { emoji:"\u{1F31E}", question:"What's a good way to greet someone in the morning?", choices:["Ignore them","Say \"Good morning!\" with a smile","Stare at them"], answer:1 },
    { emoji:"\u{1F917}", question:"What does it mean when someone offers you a hug?", choices:["They want to fight","They care about you and want to comfort you","They're cold"], answer:1 },
    { emoji:"\u{1F3B5}", question:"Your friend is singing and they're not very good. What's a kind thing to do?", choices:["Tell them they're terrible","Encourage them \u2014 \"I love that you enjoy singing!\"","Cover your ears"], answer:1 },
    { emoji:"\u{1F4DA}", question:"What should you do if you see someone drop their books?", choices:["Walk past them","Help them pick up their books","Laugh at them"], answer:1 },
    { emoji:"\u{1F37D}\uFE0F", question:"At dinner, someone is talking with food in their mouth. Is this okay?", choices:["Yes, it saves time","No \u2014 it's polite to finish chewing before talking","Only if the food is small"], answer:1 },
    { emoji:"\u{1F3C6}", question:"Your team lost a game. What's good sportsmanship?", choices:["Blame your teammates","Say \"Good game\" to the other team and try harder next time","Refuse to shake hands"], answer:1 },
    { emoji:"\u{1F4AC}", question:"Someone tells you a joke but you don't find it funny. What could you do?", choices:["Say \"That's not funny at all\"","Smile politely \u2014 you don't have to laugh but you can be kind","Walk away without saying anything"], answer:1 },
    { emoji:"\u{1F9F9}", question:"You made a mess in the kitchen. What should you do?", choices:["Leave it for someone else","Clean it up yourself","Blame the dog"], answer:0 },
    { emoji:"\u{1F44B}", question:"How do you politely get someone's attention?", choices:["Yell their name really loud","Say \"Excuse me\" and wait for them to look at you","Poke them repeatedly"], answer:1 },
    { emoji:"\u{1F381}", question:"Someone gives you a gift you don't really like. What should you say?", choices:["\"I don't like this\"","\"Thank you so much!\" \u2014 it's the thought that counts","Nothing, just put it down"], answer:1 },
    { emoji:"\u{1F6AA}", question:"You need to enter a room where people are having a meeting. What do you do?", choices:["Burst in loudly","Knock gently and wait","Stand outside forever"], answer:1 },
    { emoji:"\u{1F9D1}\u200D\u{1F91D}\u200D\u{1F9D1}", question:"What's one way to make a new friend?", choices:["Wait for them to talk to you first","Ask them about something they like","Follow them around silently"], answer:1 },
    { emoji:"\u{1F4F1}", question:"Is it polite to look at your phone while someone is talking to you?", choices:["Yes, you can multitask","No \u2014 it's respectful to give them your attention","Only if the conversation is boring"], answer:1 },
    { emoji:"\u{1F622}", question:"Your friend is crying. What's the FIRST thing you should do?", choices:["Tell them to stop crying","Ask gently \"What's wrong?\" or just sit with them","Ignore them and walk away"], answer:1 }
];

/* ===== FEELINGS VOCABULARY ===== */
var FEELINGS_VOCAB = [
    { word:"Frustrated", emoji:"\u{1F624}", meaning:"When something isn't working the way you want and you feel stuck or annoyed.", example:"I felt frustrated when I couldn't solve the maths problem." },
    { word:"Overwhelmed", emoji:"\u{1F635}", meaning:"When there's too much happening and your brain feels full.", example:"I felt overwhelmed when I had three assignments due on the same day." },
    { word:"Grateful", emoji:"\u{1F64F}", meaning:"Feeling thankful for something or someone.", example:"I felt grateful when my friend helped me carry my books." },
    { word:"Embarrassed", emoji:"\u{1F633}", meaning:"Feeling awkward or self-conscious, usually when something unexpected happens in front of others.", example:"I felt embarrassed when I tripped in the hallway." },
    { word:"Proud", emoji:"\u{1F929}", meaning:"Feeling good about something you've achieved or done well.", example:"I felt proud when I finished my painting." },
    { word:"Jealous", emoji:"\u{1F60F}", meaning:"Wanting something that someone else has.", example:"I felt jealous when my friend got a new bike." },
    { word:"Anxious", emoji:"\u{1F630}", meaning:"Feeling worried about something that might happen in the future.", example:"I felt anxious before my first swimming lesson." },
    { word:"Disappointed", emoji:"\u{1F61E}", meaning:"Feeling let down when something doesn't go the way you hoped.", example:"I felt disappointed when the trip got cancelled." },
    { word:"Curious", emoji:"\u{1F9D0}", meaning:"Wanting to learn or know more about something.", example:"I felt curious when I saw a strange bug in the garden." },
    { word:"Lonely", emoji:"\u{1F614}", meaning:"Feeling alone or like nobody is there for you.", example:"I felt lonely on my first day at the new school." },
    { word:"Confident", emoji:"\u{1F4AA}", meaning:"Believing in yourself and feeling sure you can do something.", example:"I felt confident before my presentation because I practised a lot." },
    { word:"Calm", emoji:"\u{1F60C}", meaning:"Feeling peaceful and relaxed, like everything is okay.", example:"I felt calm after doing my breathing exercises." },
    { word:"Excited", emoji:"\u{1F389}", meaning:"Feeling really happy and energetic about something that's going to happen.", example:"I felt excited the night before my birthday party." },
    { word:"Guilty", emoji:"\u{1F625}", meaning:"Feeling bad because you did something wrong or hurt someone.", example:"I felt guilty after I said something mean to my sister." },
    { word:"Hopeful", emoji:"\u{1F31F}", meaning:"Believing that something good will happen.", example:"I felt hopeful when the teacher said I was improving." },
    { word:"Confused", emoji:"\u{1F914}", meaning:"Not understanding something or not knowing what to do.", example:"I felt confused when the instructions were too complicated." }
];

/* ===== SOCIAL RULES CARDS ===== */
var SOCIAL_RULES = [
    { emoji:"\u{1F44B}", rule:"Say hello and goodbye", detail:"When you arrive somewhere or leave, it's polite to greet people and say goodbye. A simple wave or \"Hi!\" works great." },
    { emoji:"\u{1F442}", rule:"Listen when others talk", detail:"When someone is speaking, look at them and wait until they finish before you talk. This shows you care about what they're saying." },
    { emoji:"\u{1F64B}", rule:"Raise your hand to speak in class", detail:"In class, raise your hand and wait to be called on. This gives everyone a fair chance to share their ideas." },
    { emoji:"\u{1F64F}", rule:"Say please and thank you", detail:"\"Please\" when you ask for something, \"Thank you\" when you receive it. These magic words make everyone feel respected." },
    { emoji:"\u{1F6AA}", rule:"Knock before entering", detail:"If a door is closed, knock and wait before going in. This respects other people's privacy and space." },
    { emoji:"\u{1F91D}", rule:"Take turns", detail:"In games, conversations, and activities, everyone gets a turn. Waiting patiently shows fairness and respect." },
    { emoji:"\u{1F440}", rule:"Make eye contact (when comfortable)", detail:"Looking near someone's face when they talk shows you're listening. If direct eye contact feels hard, looking at their nose or forehead works too!" },
    { emoji:"\u{1F910}", rule:"Use an indoor voice inside", detail:"Inside buildings, we use a quieter voice. Save your loud voice for outside and playgrounds!" },
    { emoji:"\u{1F6B6}", rule:"Respect personal space", detail:"Stand about an arm's length away from people. Everyone has an invisible bubble around them that feels comfortable." },
    { emoji:"\u{1F614}", rule:"Say sorry when you make a mistake", detail:"If you accidentally hurt someone or do something wrong, say \"I'm sorry\" and try to make it right. Everyone makes mistakes!" },
    { emoji:"\u{1F4AC}", rule:"Don't interrupt", detail:"Wait for a pause before speaking. If you accidentally interrupt, say \"Sorry, go ahead\" and let them finish." },
    { emoji:"\u{1F60A}", rule:"Compliment others", detail:"Saying nice things like \"Great job!\" or \"I like your drawing\" makes people feel good and strengthens friendships." }
];


/* ===== MORE SOCIAL STORIES ===== */
SOCIAL_STORIES.push(
    {
        id: "grocery-store", title: "Going to the Grocery Store", emoji: "\u{1F6D2}",
        description: "What to expect when shopping",
        steps: [
            { emoji: "\u{1F4DD}", text: "We're going to the grocery store! We might make a list first so we know what to get." },
            { emoji: "\u{1F697}", text: "We drive or walk to the store. It might be busy with lots of people and sounds. That's normal." },
            { emoji: "\u{1F6D2}", text: "Inside, we get a trolley or basket. We walk through the aisles and find the things on our list." },
            { emoji: "\u{1F34E}", text: "I can help by finding items, putting them in the trolley, or holding the list. That's being a great helper!" },
            { emoji: "\u{1F4B0}", text: "At the checkout, we wait in line. I can help put items on the belt. The cashier will scan everything." },
            { emoji: "\u{1F60A}", text: "We pay and say \"Thank you!\" to the cashier. Then we carry the bags to the car. I did great!" }
        ]
    },
    {
        id: "playdate", title: "Having a Playdate", emoji: "\u{1F3AE}",
        description: "How to have fun with a friend at your house",
        steps: [
            { emoji: "\u{1F3E0}", text: "A friend is coming to my house to play! I might feel excited or a little nervous. Both are okay." },
            { emoji: "\u{1F44B}", text: "When they arrive, I say \"Hi! Come in!\" and show them where we'll play." },
            { emoji: "\u{1F3AE}", text: "We decide what to do together. If we want different things, we can take turns \u2014 their choice first, then mine." },
            { emoji: "\u{1F37F}", text: "We might have a snack together. I offer to share and ask what they'd like." },
            { emoji: "\u{1F91D}", text: "If we disagree about something, I try to stay calm and find a compromise. Friends work things out." },
            { emoji: "\u{1F44B}", text: "When it's time to go, I say \"Thanks for coming! I had fun!\" and wave goodbye." }
        ]
    },
    {
        id: "losing-game", title: "Losing a Game", emoji: "\u{1F3B2}",
        description: "How to handle not winning",
        steps: [
            { emoji: "\u{1F3AE}", text: "I'm playing a game with friends or family. I really want to win!" },
            { emoji: "\u{1F614}", text: "But this time, I didn't win. I might feel disappointed, frustrated, or sad. Those feelings are normal." },
            { emoji: "\u{1F4A8}", text: "I take a deep breath. Losing doesn't mean I'm bad at the game \u2014 it just means someone else did well this time." },
            { emoji: "\u{1F91D}", text: "I say \"Good game!\" to the winner. This is called good sportsmanship and it makes everyone feel good." },
            { emoji: "\u{1F4AA}", text: "I can try again next time! Every time I play, I get a little better." },
            { emoji: "\u{2B50}", text: "Being a good loser is actually really hard and really brave. I should be proud of myself for handling it well!" }
        ]
    },
    {
        id: "haircut", title: "Getting a Haircut", emoji: "\u{2702}\uFE0F",
        description: "What happens at the hairdresser",
        steps: [
            { emoji: "\u{1F3E0}", text: "Today I'm getting a haircut. The hairdresser's job is to make my hair look nice." },
            { emoji: "\u{1F4BA}", text: "I sit in a special chair. They might put a cape around me to keep hair off my clothes." },
            { emoji: "\u{1F4AC}", text: "The hairdresser might ask how I want my hair. I can tell them, or my parent can help explain." },
            { emoji: "\u{2702}\uFE0F", text: "They'll use scissors or clippers. It might feel tickly or make buzzing sounds. It doesn't hurt!" },
            { emoji: "\u{1F4A7}", text: "They might spray water on my hair. If anything feels uncomfortable, I can say \"That bothers me\" and they'll adjust." },
            { emoji: "\u{1F31F}", text: "When it's done, I look in the mirror! I say \"Thank you!\" to the hairdresser. I was brave!" }
        ]
    },
    {
        id: "school-bus", title: "Riding the School Bus", emoji: "\u{1F68C}",
        description: "What to expect on the bus",
        steps: [
            { emoji: "\u{23F0}", text: "I need to be at the bus stop on time. I wait safely on the pavement, not in the road." },
            { emoji: "\u{1F68C}", text: "When the bus arrives, I wait for it to stop completely. Then I climb the steps carefully." },
            { emoji: "\u{1F4BA}", text: "I find a seat and sit down. I keep my bag on my lap or under the seat." },
            { emoji: "\u{1F50A}", text: "On the bus, I use my indoor voice. It might be noisy \u2014 I can use headphones if that helps." },
            { emoji: "\u{1F91D}", text: "I can sit with a friend or by myself \u2014 both are fine! I keep my hands to myself." },
            { emoji: "\u{1F3EB}", text: "When we arrive at school, I wait for the bus to stop, then walk off carefully. I did it!" }
        ]
    },
    {
        id: "restaurant", title: "Going to a Restaurant", emoji: "\u{1F37D}\uFE0F",
        description: "How to behave when eating out",
        steps: [
            { emoji: "\u{1F37D}\uFE0F", text: "We're going to a restaurant! This means someone else cooks our food and brings it to us." },
            { emoji: "\u{1F4BA}", text: "We wait to be shown to our table. I sit in my chair and look at the menu." },
            { emoji: "\u{1F4AC}", text: "A waiter will come to take our order. I can tell them what I'd like, or point to it on the menu. I say \"please\"!" },
            { emoji: "\u{23F3}", text: "We wait for our food. This can take a while! I can talk quietly, draw, or play a quiet game while waiting." },
            { emoji: "\u{1F35D}", text: "When the food arrives, I eat nicely \u2014 chewing with my mouth closed and using my napkin." },
            { emoji: "\u{1F60A}", text: "When we're done, we say \"Thank you!\" to the waiter. Going to a restaurant is a special treat!" }
        ]
    },
    {
        id: "plans-change", title: "When Plans Change", emoji: "\u{1F504}",
        description: "How to handle unexpected changes",
        steps: [
            { emoji: "\u{1F4C5}", text: "Sometimes plans change and things don't happen the way I expected. This can feel really hard." },
            { emoji: "\u{1F621}", text: "I might feel angry, sad, or frustrated when plans change. These feelings are completely okay and normal." },
            { emoji: "\u{1F4A8}", text: "I take some deep breaths. Breathing helps my brain calm down so I can think clearly." },
            { emoji: "\u{1F4AC}", text: "I can tell someone how I feel: \"I'm upset because I was looking forward to [the plan].\"" },
            { emoji: "\u{1F914}", text: "I try to think about what we CAN do instead. Sometimes the new plan turns out to be fun too!" },
            { emoji: "\u{1F4AA}", text: "Being flexible when plans change is really hard, but it's a superpower. I'm getting better at it every time!" }
        ]
    }
);

/* ===== DEFAULT CHORES ===== */
var DEFAULT_CHORES = [
    { name: "Make my bed", stars: 2, emoji: "\u{1F6CF}\uFE0F" },
    { name: "Brush my teeth", stars: 1, emoji: "\u{1FAA5}" },
    { name: "Get dressed by myself", stars: 2, emoji: "\u{1F455}" },
    { name: "Put dirty clothes in the basket", stars: 1, emoji: "\u{1F9FA}" },
    { name: "Help set the table", stars: 3, emoji: "\u{1F37D}\uFE0F" },
    { name: "Tidy my room", stars: 3, emoji: "\u{1F3E0}" },
    { name: "Pack my school bag", stars: 2, emoji: "\u{1F392}" },
    { name: "Feed the pet", stars: 2, emoji: "\u{1F436}" },
    { name: "Put shoes away", stars: 1, emoji: "\u{1F45F}" },
    { name: "Help with dishes", stars: 3, emoji: "\u{1F37D}\uFE0F" },
    { name: "Read for 15 minutes", stars: 3, emoji: "\u{1F4DA}" },
    { name: "Say something kind to someone", stars: 2, emoji: "\u{1F49C}" }
];

/* ===== MORE STAR OF THE DAY QUESTIONS ===== */
STAR_OF_THE_DAY.push(
    { emoji:"\u{1F3AB}", question:"You're at the cinema and someone's phone rings. Is that okay?", choices:["Yes, phones are fine","No \u2014 phones should be on silent in the cinema","Only if it's a short call"], answer:1 },
    { emoji:"\u{1F6BF}", question:"Why is it important to shower or bathe regularly?", choices:["It's not important","To stay clean and healthy, and to be considerate of people around us","Only before special events"], answer:1 },
    { emoji:"\u{1F46B}", question:"Your friend got a new haircut and asks what you think. You don't love it. What do you say?", choices:["\"It looks terrible\"","\"I like that you tried something new!\"","Say nothing and walk away"], answer:1 },
    { emoji:"\u{1F3E5}", question:"You see someone drop their walking stick. What should you do?", choices:["Keep walking","Pick it up and hand it to them with a smile","Stare at them"], answer:1 },
    { emoji:"\u{1F4E7}", question:"Is it okay to read someone else's messages or diary without asking?", choices:["Yes, if you're curious","No \u2014 everyone deserves privacy","Only if they're your friend"], answer:1 },
    { emoji:"\u{1F3B5}", question:"You're wearing headphones and someone tries to talk to you. What should you do?", choices:["Ignore them","Take off or pause your headphones and listen","Turn the music up louder"], answer:1 },
    { emoji:"\u{1F6AA}", question:"You accidentally bump into someone in the hallway. What do you say?", choices:["Nothing","\"Sorry! Are you okay?\"","\"Watch where you're going!\""], answer:1 },
    { emoji:"\u{1F37D}\uFE0F", question:"At dinner, you don't like the food that was made. What's a polite thing to do?", choices:["Say \"This is disgusting!\"","Try a small bite and say \"Thank you for cooking\" even if it's not your favourite","Refuse to eat anything"], answer:1 },
    { emoji:"\u{1F3C3}", question:"You're in a race and you see someone fall behind. What's a kind thing to do?", choices:["Laugh at them","Encourage them: \"You can do it!\"","Ignore them and keep running"], answer:1 },
    { emoji:"\u{1F4F7}", question:"Is it okay to take a photo of someone without asking?", choices:["Yes, if they look funny","No \u2014 always ask before taking someone's photo","Only if you won't share it"], answer:1 },
    { emoji:"\u{1F9F3}", question:"You're visiting someone's house. Should you touch their things without asking?", choices:["Yes, if it looks interesting","No \u2014 ask first before touching other people's belongings","Only if they're not looking"], answer:1 },
    { emoji:"\u{1F4AC}", question:"Someone tells you something private. What should you do?", choices:["Tell everyone","Keep it to yourself \u2014 they trusted you","Post it online"], answer:1 },
    { emoji:"\u{1F9D1}\u200D\u{1F9BD}", question:"You see someone in a wheelchair. What's the right thing to do?", choices:["Stare at them","Treat them like anyone else \u2014 smile and say hi if appropriate","Ask them lots of questions about their wheelchair"], answer:1 },
    { emoji:"\u{1F4E2}", question:"Your teacher is explaining something important. What should you do?", choices:["Talk to your friend","Listen carefully and save questions for after","Play with something in your desk"], answer:1 },
    { emoji:"\u{1F91D}", question:"Someone new joins your group project. What's a welcoming thing to say?", choices:["\"Who are you?\"","\"Hi! Welcome to our group. I'm [name]. What ideas do you have?\"","Ignore them"], answer:1 }
);


/* ===== WEEKLY CHALLENGES ===== */
var WEEKLY_CHALLENGES = [
    { id: "w1", title: "Feelings Week", desc: "Complete 3 Learn & Play categories", emoji: "\u{1F4DA}", check: function(s) { return (s.weeklyProgress || {}).catsPlayed >= 3; } },
    { id: "w2", title: "Check-In Champion", desc: "Do 5 daily check-ins this week", emoji: "\u{1F4DD}", check: function(s) { return (s.weeklyProgress || {}).checkinsThisWeek >= 5; } },
    { id: "w3", title: "Calm Explorer", desc: "Use all 3 Calm Down tools", emoji: "\u{1F9D8}", check: function(s) { var p = s.weeklyProgress || {}; return p.breathingDone && p.groundingDone && p.squeezeDone; } },
    { id: "w4", title: "Story Time", desc: "Read 3 Social Stories", emoji: "\u{1F4D6}", check: function(s) { return (s.weeklyProgress || {}).storiesRead >= 3; } },
    { id: "w5", title: "Emotion Expert", desc: "Complete Emotion Match and Tone of Voice", emoji: "\u{1F3AD}", check: function(s) { var p = s.weeklyProgress || {}; return p.emDone && p.toneDone; } },
    { id: "w6", title: "Kindness Week", desc: "Write 3 journal entries about your feelings", emoji: "\u{1F49C}", check: function(s) { return (s.weeklyProgress || {}).journalNotes >= 3; } },
    { id: "w7", title: "Super Helper", desc: "Complete all your chores 3 days this week", emoji: "\u{2705}", check: function(s) { return (s.weeklyProgress || {}).choresDaysComplete >= 3; } },
    { id: "w8", title: "Social Star", desc: "Play Perspective Taking and How Would You Feel", emoji: "\u{1F440}", check: function(s) { var p = s.weeklyProgress || {}; return p.perspDone && p.hfDone; } }
];

/* ===== MANY MORE SCENARIOS FOR LONGEVITY ===== */
SCENARIOS.emotions.push(
    { difficulty:1, emoji:"\u{1F60C}", text:"After a long day, your dad sits on the couch, closes his eyes, and lets out a big sigh. How is he feeling?", choices:[{text:"Tired and relaxed",correct:true},{text:"Angry",correct:false},{text:"Excited",correct:false}], correctFeedback:"Right! Closing eyes and sighing after a long day means someone is tired and trying to relax.", encourageFeedback:"When someone closes their eyes and sighs after a busy day, they're usually feeling tired and need to rest." },
    { difficulty:1, emoji:"\u{1F92D}", text:"Your friend covers their mouth and their eyes go wide after accidentally saying something silly. How are they feeling?", choices:[{text:"Embarrassed",correct:true},{text:"Angry",correct:false},{text:"Bored",correct:false}], correctFeedback:"Yes! Covering the mouth with wide eyes is a classic sign of embarrassment or surprise at what they said!", encourageFeedback:"When someone covers their mouth after saying something, they're usually embarrassed or surprised at themselves." },
    { difficulty:2, emoji:"\u{1F9D0}", text:"Your classmate keeps checking their bag over and over before a trip. What might they be feeling?", choices:[{text:"Bored",correct:false},{text:"Anxious \u2014 they want to make sure they haven't forgotten anything",correct:true},{text:"Happy",correct:false}], correctFeedback:"Good observation! Repeatedly checking things is often a sign of anxiety. They want to make sure everything is right.", encourageFeedback:"Checking things over and over usually means someone is feeling anxious or worried about forgetting something." },
    { difficulty:2, emoji:"\u{1F60E}", text:"After scoring a goal, your teammate pumps their fist and shouts \"Yes!\" How are they feeling?", choices:[{text:"Proud and triumphant",correct:true},{text:"Scared",correct:false},{text:"Confused",correct:false}], correctFeedback:"Exactly! Fist pumping and shouting after an achievement shows pride and excitement!", encourageFeedback:"Fist pumps and shouts of \"Yes!\" are signs of feeling proud and triumphant about an achievement." },
    { difficulty:3, emoji:"\u{1F910}", text:"Your friend smiles and says \"I'm happy for you\" when you win a prize, but their voice sounds flat. What might really be going on?", choices:[{text:"They're genuinely happy",correct:false},{text:"They might be hiding jealousy or disappointment behind a polite smile",correct:true},{text:"They're tired",correct:false}], correctFeedback:"Great emotional intelligence! When words say one thing but the voice says another, the person might be hiding their true feelings to be polite.", encourageFeedback:"Sometimes people say the right thing but their voice gives away different feelings. A flat voice with a smile might mean they're hiding disappointment." },
    { difficulty:3, emoji:"\u{1F97A}", text:"A kid in your class is laughing along with everyone else, but you notice they keep wiping their eyes. What might be happening?", choices:[{text:"They have allergies",correct:false},{text:"They might be upset but trying to fit in by laughing along",correct:true},{text:"The joke was really funny",correct:false}], correctFeedback:"That's very perceptive! Sometimes people laugh to fit in even when they're actually upset. Wiping eyes while laughing can be a sign of hidden tears.", encourageFeedback:"This is tricky! When someone laughs but keeps wiping their eyes, they might be trying to hide that they're upset. It's a way of fitting in." }
);

SCENARIOS.conversations.push(
    { difficulty:1, emoji:"\u{1F4DE}", text:"The phone rings and it's for your mum. What's a polite way to answer?", choices:[{text:"\"What do you want?\"",correct:false},{text:"\"Hello, who's calling please?\"",correct:true},{text:"Don't answer it",correct:false}], correctFeedback:"Perfect phone manners! \"Hello, who's calling please?\" is polite and helpful.", encourageFeedback:"When answering the phone, \"Hello, who's calling please?\" is the polite way to do it." },
    { difficulty:1, emoji:"\u{1F44B}", text:"You see your teacher in the supermarket. What should you do?", choices:[{text:"Hide behind the shelves",correct:false},{text:"Smile and say \"Hi, [teacher's name]!\"",correct:true},{text:"Pretend you don't see them",correct:false}], correctFeedback:"That's friendly! Teachers are people too, and a simple hello is always nice.", encourageFeedback:"It's polite to say hi to people you know, even outside of school. A smile and a greeting is perfect." },
    { difficulty:2, emoji:"\u{1F914}", text:"You want to join a conversation that two friends are having. What's the best way?", choices:[{text:"Just start talking over them",correct:false},{text:"Wait for a pause, then say \"Hey, what are you talking about? Can I join?\"",correct:true},{text:"Stand silently until they notice you",correct:false}], correctFeedback:"Great approach! Waiting for a pause and asking to join shows respect for their conversation.", encourageFeedback:"The best way to join a conversation is to wait for a natural pause, then ask to join in. Don't interrupt!" },
    { difficulty:2, emoji:"\u{1F622}", text:"Your friend tells you their pet died. What's a good thing to say?", choices:[{text:"\"Just get a new one\"",correct:false},{text:"\"I'm really sorry. That must be so sad. I'm here for you.\"",correct:true},{text:"Change the subject to something happy",correct:false}], correctFeedback:"That's really compassionate. Acknowledging their sadness and offering support is exactly what a good friend does.", encourageFeedback:"When someone shares sad news, the best response is to acknowledge their feelings: \"I'm sorry, that must be really sad.\"" },
    { difficulty:3, emoji:"\u{1F4AC}", text:"Someone keeps talking about themselves and never asks about you. How could you handle this?", choices:[{text:"Stop being friends with them",correct:false},{text:"When there's a pause, gently redirect: \"That's cool! Something similar happened to me...\"",correct:true},{text:"Talk over them about yourself",correct:false}], correctFeedback:"Smart approach! Gently redirecting the conversation is a great social skill. Some people don't realise they're doing it.", encourageFeedback:"Some people don't realise they dominate conversations. Gently redirecting with \"Something similar happened to me...\" is a kind way to balance things." },
    { difficulty:3, emoji:"\u{1F937}", text:"You disagree with something your friend said. How can you express this respectfully?", choices:[{text:"\"You're wrong!\"",correct:false},{text:"\"I see it differently. I think... What do you think about that?\"",correct:true},{text:"Just agree even though you don't",correct:false}], correctFeedback:"That's really mature! \"I see it differently\" is respectful and opens up a real discussion instead of an argument.", encourageFeedback:"Disagreeing respectfully is a big skill. Try \"I see it differently\" instead of \"You're wrong\" \u2014 it keeps the conversation friendly." }
);

SCENARIOS.friendships.push(
    { difficulty:1, emoji:"\u{1F3A8}", text:"Your friend invites you to their art show. You don't really like art. What should you do?", choices:[{text:"Say \"Art is boring, no thanks\"",correct:false},{text:"Go to support your friend \u2014 it matters to them!",correct:true},{text:"Say you'll go but don't show up",correct:false}], correctFeedback:"That's what good friends do! Supporting your friend's interests, even if they're not your favourite, shows you care about them.", encourageFeedback:"Good friends support each other's interests. Going to your friend's art show shows you care about what matters to them." },
    { difficulty:2, emoji:"\u{1F4F1}", text:"Your friend hasn't replied to your message for 2 days. What should you think?", choices:[{text:"They hate me now",correct:false},{text:"They might be busy, their phone might be broken, or they forgot \u2014 it's probably not about me",correct:true},{text:"Send 50 more messages",correct:false}], correctFeedback:"That's healthy thinking! There are many reasons someone might not reply, and most have nothing to do with you.", encourageFeedback:"When someone doesn't reply, try not to assume the worst. They might be busy, their phone might be dead, or they simply forgot." },
    { difficulty:3, emoji:"\u{1F46F}", text:"Your two best friends are becoming closer with each other and you feel left out. What could you do?", choices:[{text:"Try to break up their friendship",correct:false},{text:"Talk to them honestly: \"I feel a bit left out lately. Can we all hang out together?\"",correct:true},{text:"Find completely new friends and ignore them",correct:false}], correctFeedback:"That's really brave and honest! Using \"I feel\" statements is the healthiest way to address friendship concerns.", encourageFeedback:"Feeling left out is painful. The bravest thing is to tell your friends honestly how you feel. Most friends don't realise they're doing it." }
);

SCENARIOS["body-language"].push(
    { difficulty:1, emoji:"\u{1F44D}", text:"Your teacher gives you a thumbs up from across the room. What does this mean?", choices:[{text:"They want you to stop",correct:false},{text:"They're saying \"Good job!\" or \"You're doing great!\"",correct:true},{text:"They need help",correct:false}], correctFeedback:"Right! A thumbs up is a universal sign for \"Good job!\" or \"Everything's okay!\"", encourageFeedback:"A thumbs up is one of the most common body language signals \u2014 it means \"Good job!\" or \"All good!\"" },
    { difficulty:2, emoji:"\u{1F9CD}", text:"Someone is standing with their feet pointed towards the door while talking to you. What might this mean?", choices:[{text:"They're very interested in the conversation",correct:false},{text:"They might want to leave or are thinking about going somewhere",correct:true},{text:"They're cold",correct:false}], correctFeedback:"Great observation! Feet pointing towards the exit often means someone is thinking about leaving, even if they're still talking.", encourageFeedback:"Our feet often point where we want to go! If someone's feet point at the door, they might be ready to leave." },
    { difficulty:3, emoji:"\u{1F914}", text:"During a group project, one person keeps checking their phone, sighing, and not making eye contact. What might they be communicating?", choices:[{text:"They're really engaged in the project",correct:false},{text:"They might be bored, disinterested, or upset about something",correct:true},{text:"They're researching for the project",correct:false}], correctFeedback:"Good reading! Multiple negative body language signals together (phone, sighing, no eye contact) usually mean someone is disengaged or upset.", encourageFeedback:"When you see several negative body language signs together \u2014 phone checking, sighing, avoiding eye contact \u2014 the person is probably not engaged or might be upset." }
);

SCENARIOS["tricky-situations"].push(
    { difficulty:1, emoji:"\u{1F4B0}", text:"You find some money on the ground at school. What should you do?", choices:[{text:"Keep it \u2014 finders keepers!",correct:false},{text:"Take it to the office or a teacher so the person who lost it can get it back",correct:true},{text:"Give it to your friend",correct:false}], correctFeedback:"That's the honest thing to do! Someone is probably looking for that money, and turning it in is the right choice.", encourageFeedback:"When you find something that isn't yours, the right thing is to turn it in. Someone might be really worried about losing it." },
    { difficulty:2, emoji:"\u{1F3EB}", text:"You see a younger kid being picked on by older kids. What could you do?", choices:[{text:"Walk away \u2014 it's not your problem",correct:false},{text:"Tell a teacher or adult right away, and check on the younger kid after",correct:true},{text:"Join in so the older kids like you",correct:false}], correctFeedback:"That's really brave! Standing up for someone (even by getting adult help) is one of the most important things you can do.", encourageFeedback:"You don't have to confront bullies yourself. Getting an adult to help and then checking on the kid afterwards is the safest and kindest approach." },
    { difficulty:3, emoji:"\u{1F4F1}", text:"A friend shares a rumour about another classmate and asks you to spread it. What should you do?", choices:[{text:"Share it \u2014 everyone else is",correct:false},{text:"Say \"I don't want to spread rumours. That could really hurt them.\"",correct:true},{text:"Share it but say \"Don't tell anyone I told you\"",correct:false}], correctFeedback:"That takes real courage! Refusing to spread rumours protects people and shows strong character.", encourageFeedback:"Rumours can really hurt people. Saying \"I don't want to spread that\" is brave and shows you care about doing the right thing." }
);

SCENARIOS["feelings-check"].push(
    { difficulty:1, emoji:"\u{1F60A}", text:"Something really good happened and you feel amazing! What's a healthy way to enjoy this feeling?", choices:[{text:"Brag to everyone about it",correct:false},{text:"Enjoy the moment! Share your happiness with people you care about",correct:true},{text:"Worry that something bad will happen next",correct:false}], correctFeedback:"Yes! It's important to enjoy good feelings when they come. Sharing happiness with people you love makes it even better!", encourageFeedback:"When something good happens, let yourself enjoy it! Share your happiness with people you care about \u2014 good feelings are meant to be celebrated." },
    { difficulty:2, emoji:"\u{1F4A4}", text:"You can't fall asleep because your mind keeps thinking about things. What could help?", choices:[{text:"Watch videos on your phone",correct:false},{text:"Try slow breathing, imagine a calm place, or write your thoughts in a journal",correct:true},{text:"Just lie there and worry more",correct:false}], correctFeedback:"Great strategies! Slow breathing, visualisation, and journaling are all proven ways to calm a busy mind before sleep.", encourageFeedback:"A busy mind at bedtime is common! Try slow breathing, imagining a peaceful place, or writing your thoughts down to get them out of your head." },
    { difficulty:3, emoji:"\u{1F494}", text:"Someone you care about said something that really hurt your feelings, but you don't think they meant to. What should you do?", choices:[{text:"Never speak to them again",correct:false},{text:"Wait until you're calm, then tell them: \"When you said [that], it hurt my feelings. I don't think you meant to, but I wanted you to know.\"",correct:true},{text:"Say something hurtful back",correct:false}], correctFeedback:"That's incredibly mature! Waiting until you're calm and using \"When you said... it made me feel...\" is the gold standard of communication.", encourageFeedback:"When someone hurts you accidentally, the best approach is to wait until you're calm, then explain how their words made you feel. Most people will apologise." }
);


/* ===== LEVELLED EMOTION MATCH ===== */
var EMOTION_MATCH_LEVELS = {
    1: [
        { face:"\u{1F604}", answer:"Happy", options:["Happy","Sad","Angry","Scared"] },
        { face:"\u{1F622}", answer:"Sad", options:["Excited","Sad","Surprised","Bored"] },
        { face:"\u{1F621}", answer:"Angry", options:["Happy","Shy","Angry","Tired"] },
        { face:"\u{1F628}", answer:"Scared", options:["Proud","Scared","Silly","Calm"] },
        { face:"\u{1F632}", answer:"Surprised", options:["Surprised","Angry","Sad","Nervous"] },
        { face:"\u{1F634}", answer:"Tired", options:["Excited","Tired","Happy","Angry"] }
    ],
    2: [
        { face:"\u{1F60A}", answer:"Proud", options:["Worried","Bored","Proud","Confused","Shy"] },
        { face:"\u{1F61E}", answer:"Disappointed", options:["Disappointed","Scared","Silly","Proud","Calm"] },
        { face:"\u{1F60D}", answer:"Loving", options:["Angry","Loving","Bored","Nervous","Tired"] },
        { face:"\u{1F914}", answer:"Confused", options:["Happy","Sad","Confused","Excited","Proud"] },
        { face:"\u{1F633}", answer:"Embarrassed", options:["Embarrassed","Proud","Angry","Calm","Bored"] },
        { face:"\u{1F60E}", answer:"Confident", options:["Shy","Confident","Worried","Sad","Nervous"] },
        { face:"\u{1F624}", answer:"Frustrated", options:["Happy","Frustrated","Tired","Calm","Proud"] }
    ],
    3: [
        { face:"\u{1F972}", answer:"Bittersweet", options:["Happy","Sad","Bittersweet","Angry","Confused","Proud"] },
        { face:"\u{1F635}", answer:"Overwhelmed", options:["Tired","Overwhelmed","Bored","Calm","Frustrated","Shy"] },
        { face:"\u{1F630}", answer:"Anxious", options:["Excited","Anxious","Angry","Proud","Confused","Embarrassed"] },
        { face:"\u{1F625}", answer:"Guilty", options:["Sad","Guilty","Disappointed","Scared","Lonely","Frustrated"] },
        { face:"\u{1F97A}", answer:"Vulnerable", options:["Shy","Vulnerable","Tired","Confused","Nervous","Calm"] },
        { face:"\u{1F929}", answer:"Ecstatic", options:["Happy","Ecstatic","Proud","Surprised","Confident","Grateful"] },
        { face:"\u{1F614}", answer:"Lonely", options:["Sad","Lonely","Tired","Bored","Disappointed","Guilty"] },
        { face:"\u{1F60C}", answer:"Content", options:["Happy","Content","Calm","Proud","Relieved","Grateful"] }
    ]
};

/* ===== LEVELLED TONE OF VOICE ===== */
var TONE_LEVELS = {
    1: [
        { emoji:"\u{1F602}", quote:"\"You're SO slow, you'd lose a race to a snail!\"", context:"Your best friend says this while laughing.", answer:"Joking", options:["Mean","Joking","Serious"], correctFeedback:"Your friend is teasing playfully. The laughing and silly exaggeration tell us it's a joke!", encourageFeedback:"When a friend says something silly while laughing, they're usually joking!" },
        { emoji:"\u{1F6D1}", quote:"\"Please don't touch that. It's very fragile.\"", context:"A museum guide says this calmly.", answer:"Serious", options:["Joking","Serious","Sarcastic"], correctFeedback:"The museum guide is being serious \u2014 they genuinely don't want you to touch it.", encourageFeedback:"When someone speaks calmly and clearly about something important, they're being serious." },
        { emoji:"\u{1F611}", quote:"\"Sure, I LOVE waiting in line for an hour.\"", context:"Your mum says this while sighing in a long queue.", answer:"Sarcastic", options:["Serious","Happy","Sarcastic"], correctFeedback:"Mum doesn't actually love waiting. The sigh and emphasis on \"LOVE\" are sarcasm clues.", encourageFeedback:"When someone emphasises a word strongly and their body language doesn't match, they're usually being sarcastic." },
        { emoji:"\u{1F468}\u200D\u2695\uFE0F", quote:"\"You need to take this medicine twice a day.\"", context:"A doctor says this while writing a prescription.", answer:"Serious", options:["Joking","Sarcastic","Serious"], correctFeedback:"The doctor is giving important health instructions. This is serious.", encourageFeedback:"Doctors give serious instructions about health. Clear, direct words = serious." }
    ],
    2: [
        { emoji:"\u{1F60F}", quote:"\"Oh great, another test. Just what I wanted.\"", context:"A student says this after the teacher announces a surprise test. They roll their eyes.", answer:"Sarcastic", options:["Serious","Sarcastic","Joking","Excited"], correctFeedback:"They don't actually want a test. The eye roll tells us they mean the opposite!", encourageFeedback:"When someone says something positive but their face shows the opposite, that's sarcasm." },
        { emoji:"\u{1F923}", quote:"\"I'm basically a professional chef now!\"", context:"Your friend says this proudly after making toast for the first time.", answer:"Joking", options:["Serious","Sarcastic","Bragging","Joking"], correctFeedback:"They know toast doesn't make them a chef \u2014 they're being funny about a small achievement!", encourageFeedback:"When someone exaggerates something small in a fun way, they're joking!" },
        { emoji:"\u{1F612}", quote:"\"Oh wonderful, my phone just died. Perfect timing.\"", context:"Your sister says this when her phone dies before an important call.", answer:"Sarcastic", options:["Happy","Sarcastic","Joking","Confused"], correctFeedback:"She's frustrated, not happy. Positive words about a negative situation = sarcasm.", encourageFeedback:"Using positive words (wonderful, perfect) about a negative situation while sounding annoyed is sarcasm." },
        { emoji:"\u{1F609}", quote:"\"Watch out, I might eat ALL the pizza!\"", context:"Your dad says this with a wink while serving pizza to everyone.", answer:"Joking", options:["Serious","Threatening","Joking","Sarcastic"], correctFeedback:"Dad's wink and serving everyone tells us he's joking!", encourageFeedback:"A wink is a big clue that someone is joking!" }
    ],
    3: [
        { emoji:"\u{1F928}", quote:"\"Nice of you to finally show up.\"", context:"Your friend says this when you arrive 5 minutes late. They're half-smiling.", answer:"Sarcastic but friendly", options:["Angry","Sarcastic but friendly","Serious complaint","Joking"], correctFeedback:"This is friendly sarcasm \u2014 they're teasing you about being late but the half-smile shows they're not really upset.", encourageFeedback:"Sometimes sarcasm is friendly teasing. The half-smile is the clue that they're not actually angry." },
        { emoji:"\u{1F9D0}", quote:"\"That's... interesting.\"", context:"Someone says this slowly after seeing your unusual art project, with raised eyebrows.", answer:"Politely unsure", options:["Genuinely impressed","Politely unsure","Sarcastic","Excited"], correctFeedback:"\"Interesting\" said slowly with raised eyebrows often means someone doesn't know what to think but is being polite.", encourageFeedback:"When someone says \"interesting\" slowly with raised eyebrows, they're usually being polite but aren't sure what to think." },
        { emoji:"\u{1F3AD}", quote:"\"Oh sure, because THAT always works out well.\"", context:"Your older sibling says this when you suggest a plan that failed last time.", answer:"Sarcastic with a warning", options:["Encouraging","Sarcastic with a warning","Joking","Serious advice"], correctFeedback:"They're using sarcasm to remind you that this plan didn't work before. It's a warning wrapped in sarcasm.", encourageFeedback:"Sometimes sarcasm carries a message. Here they're warning you that this plan has failed before." },
        { emoji:"\u{1F60F}", quote:"\"Well, SOMEONE'S in a good mood today.\"", context:"A classmate says this to another kid who's been grumpy all morning.", answer:"Sarcastic observation", options:["Genuine compliment","Sarcastic observation","Joking","Confused"], correctFeedback:"They're pointing out that the person is NOT in a good mood. It's sarcasm used to make an observation.", encourageFeedback:"Saying someone's in a good mood when they're clearly grumpy is sarcastic \u2014 they mean the opposite." }
    ]
};

/* ===== LEVELLED PERSPECTIVE TAKING ===== */
var PERSPECTIVE_LEVELS = {
    1: PERSPECTIVE_TAKING.slice(0, 3),
    2: PERSPECTIVE_TAKING.slice(3, 6),
    3: [
        { emoji:"\u{1F469}\u200D\u{1F3EB}", text:"Your teacher seems short-tempered today and snapped at the class. Later you overhear she got some bad news this morning. How might you see her behaviour differently now?", choices:[{text:"She's a mean teacher",correct:false},{text:"She's human \u2014 the bad news affected her mood. It wasn't about us.",correct:true},{text:"She shouldn't be a teacher if she can't control herself",correct:false}], correctFeedback:"That's really empathetic! Teachers are people too, and bad news can affect anyone's mood. Understanding this shows real maturity.", encourageFeedback:"Everyone has bad days, including teachers. When we know someone got bad news, it helps us understand why they might seem different." },
        { emoji:"\u{1F466}\u{1F3FB}", text:"A kid in your class always eats lunch alone and never joins group activities. Some kids think he's weird. But what might be going on from HIS perspective?", choices:[{text:"He's definitely weird",correct:false},{text:"He might be shy, anxious, or dealing with something at home. He might WANT to join but not know how.",correct:true},{text:"He doesn't like anyone",correct:false}], correctFeedback:"Wonderful empathy! People who seem distant often want connection but struggle with anxiety or shyness. A kind invitation could change everything for them.", encourageFeedback:"When someone is always alone, it's rarely because they want to be. They might be shy, anxious, or going through something difficult." },
        { emoji:"\u{1F475}", text:"Your grandma keeps telling the same stories over and over. Your cousin rolls their eyes, but how might grandma be feeling?", choices:[{text:"She's trying to annoy everyone",correct:false},{text:"Those stories are precious memories to her, and sharing them is how she connects with family",correct:true},{text:"She has nothing else to talk about",correct:false}], correctFeedback:"That's beautiful insight! For older people, sharing stories is how they connect and pass on family history. Those stories matter deeply to them.", encourageFeedback:"Grandparents' stories are their way of sharing what matters to them and connecting with family. Being patient and listening is a gift to them." }
    ]
};

/* ===== LEVELLED HOW WOULD YOU FEEL ===== */
var HOWFEEL_LEVELS = {
    1: HOW_WOULD_YOU_FEEL.slice(0, 4),
    2: HOW_WOULD_YOU_FEEL.slice(4, 8),
    3: [
        { emoji:"\u{1F3EB}", text:"Your best friend is moving to another country next month.", feelings:["Sad","Angry","Scared","Happy for them"], responses:{"Sad":"Of course you'd feel sad! Losing a close friend nearby is a big deal.","Angry":"Feeling angry is understandable \u2014 it feels unfair when things change.","Scared":"It's scary to think about not having your best friend nearby.","Happy for them":"Being happy for them while also feeling sad shows real emotional depth."} },
        { emoji:"\u{1F3C6}", text:"You worked really hard on a project but someone else won the prize.", feelings:["Disappointed","Jealous","Proud of my effort","Angry"], responses:{"Disappointed":"Disappointment is natural when effort doesn't get recognised.","Jealous":"A little jealousy is human \u2014 it shows you cared about winning.","Proud of my effort":"That's really mature! Being proud of your effort regardless of the outcome is a powerful mindset.","Angry":"Feeling angry when things seem unfair is completely normal."} },
        { emoji:"\u{1F46A}", text:"Your parents are arguing and you can hear them from your room.", feelings:["Scared","Worried","Sad","Angry"], responses:{"Scared":"It's scary to hear parents argue. Remember: their argument is not your fault.","Worried":"Worrying about your parents is natural. Most arguments get resolved.","Sad":"Feeling sad when people you love argue makes complete sense.","Angry":"Feeling angry that they're disrupting your peace is valid."} },
        { emoji:"\u{1F393}", text:"You're about to start secondary school / middle school next year.", feelings:["Excited","Nervous","Scared","Curious"], responses:{"Excited":"New beginnings can be exciting! There's so much to look forward to.","Nervous":"Almost everyone feels nervous about big transitions. That's completely normal!","Scared":"It's okay to feel scared about such a big change. It shows you care.","Curious":"Being curious about what's ahead is a great mindset for new experiences!"} }
    ]
};
