/**
 * Portraits Data
 * Contains all portrait profiles
 */

export interface Portrait {
  id: string;
  category: string;
  name: string;
  description: string;
  fullContent: string;  // Complete portrait text
  author: string;
  iconUrl: any;         // require() import for pixel art
  date: string;
  contentSections?: {
    type: 'text' | 'image';
    content: string;
    imageUrl?: any;
    caption?: string;
  }[];
}

export const portraits: Portrait[] = [
  {
    id: '1',
    category: 'MUSICIAN',
    name: 'Paul de Fressenel',
    description: 'The godfather of Western music, cross-legged, shoeless, authentic.',
    author: 'Paul de Fressenel',
    iconUrl: require('../assets/images/RUBIN KEY1.png'),
    date: '01/12/2024',
    contentSections: [
      {
        type: 'text',
        content: `The godfather of Western music looks exactly how he ought to. A beard fighting for more space on the canvas. Trimodal hair with tentacles emanating north, west and east. He seemed to have more in common with raccoons and walruses than he did with its human counterparts. It did not help that, without fault, he was in some form of a cross-legged asana on a comically incompatible chair. Yet there was something fascinating in his unusual poise, in the effortless certitude with which he and his bare feet approached conversation. So, how could one man have such an outsized impact on the musical industry (The Beatles, Michael Jackson, Amy Winehouse..)? Is it a signature 'Rubin' style? Is it a magical chord? 

I assumed he must be some magical genius who could dissect harmony like a surgeon. He must have a complex technical toolbox composed of studio tricks, advanced softwares, and production formulas. But no. He surprisingly claims to have 'zero knowledge in music theory'. The man who shaped the sound of multiple generations insists he doesn't understand the technical foundations of what he is shaping. Upon hearing that, I was in disbelief. So what, he just wandered out of a forest and accidentally revolutionized western music? This would not hold up in court.`
      },
      {
        type: 'image',
        imageUrl: require('../assets/images/Image Assets/4. Portraits/rick-rubin/picture.png'),
        caption: 'The walrus knows something we don\'t.',
        content: ''
      },
      {
        type: 'text',
        content: `A recording studio in Malibu. Fourth hour. Expensive silence. The engineer's third espresso sits cold near the mixing board. In one corner of the room, a producer wearing a double-breasted Brunello Cucinelli blazer is gesturing at frequency graphs and explaining to an assistant why a specific compressor is essential for the "sonic palette". In the adjacent corner, Rick Rubin, eyes closed, sits barefoot. He is dressed like he is about to feed ducks in a pond. In the tracking room, a famous band is finishing up their future lead single. It has been rehearsed into submission. Every transition glass-smoothed. Every harmony stacked like Jenga blocks. They look at Rick, waiting for approval. He opens his eyes slowly. "Forget the snare," he says. "Play it like you mean it". The room exhales. The band manager clears his throat nervously. "But Rick, we've spent weeks on this arrangement. The snare really makes the-" gets interrupted: "I can tell, it looks like work". Uncomfortable silence. 

"Play it like you're figuring it out right now". They start playing again, without the snare and agreed-upon arrangements. With nowhere to hide, the singer's voice is exposed. She runs out of breath in the wrong places, goes off-mic slightly during the bridge. The guitarist comes in too early. The drummer laughs nervously during a verse. Uncertain, messier, the take is objectively worse in every possible standard. Rick smiles. "That's it. That's the one." he exclaims. "That's authentic." The manager is watching his PhD become obsolete in real-time. Rick: "You finally sing it for yourself!" Amazed at the new-born dimension of the song, the elegant producer in the other corner of the room readjusts his collar, suddenly aware that his entire outfit might be a conceptual mistake. The fancy chandelier on top of his head seems to dim slightly, as if realizing it has been trying too hard its entire existence. "Instinct over structure... Instinct over structure... You just stripped away what doesn't work instinctively, it must feel strange on your chest". Rubin whispers wondrously.`
      }
    ],
    fullContent: `The godfather of Western music looks exactly how he ought to. A beard fighting for more space on the canvas. Trimodal hair with tentacles emanating north, west and east. He seemed to have more in common with raccoons and walruses than he did with its human counterparts. It did not help that, without fault, he was in some form of a cross-legged asana on a comically incompatible chair. Yet there was something fascinating in his unusual poise, in the effortless certitude with which he and his bare feet approached conversation. So, how could one man have such an outsized impact on the musical industry (The Beatles, Michael Jackson, Amy Winehouse..)? Is it a signature 'Rubin' style? Is it a magical chord? 

I assumed he must be some magical genius who could dissect harmony like a surgeon. He must have a complex technical toolbox composed of studio tricks, advanced softwares, and production formulas. But no. He surprisingly claims to have 'zero knowledge in music theory'. The man who shaped the sound of multiple generations insists he doesn't understand the technical foundations of what he is shaping. Upon hearing that, I was in disbelief. So what, he just wandered out of a forest and accidentally revolutionized western music? This would not hold up in court. 

A recording studio in Malibu. Fourth hour. Expensive silence. The engineer's third espresso sits cold near the mixing board. In one corner of the room, a producer wearing a double-breasted Brunello Cucinelli blazer is gesturing at frequency graphs and explaining to an assistant why a specific compressor is essential for the "sonic palette". In the adjacent corner, Rick Rubin, eyes closed, sits barefoot. He is dressed like he is about to feed ducks in a pond. In the tracking room, a famous band is finishing up their future lead single. It has been rehearsed into submission. Every transition glass-smoothed. Every harmony stacked like Jenga blocks. They look at Rick, waiting for approval. He opens his eyes slowly. "Forget the snare," he says. "Play it like you mean it". The room exhales. The band manager clears his throat nervously. "But Rick, we've spent weeks on this arrangement. The snare really makes the-" gets interrupted: "I can tell, it looks like work". Uncomfortable silence. 

"Play it like you're figuring it out right now". They start playing again, without the snare and agreed-upon arrangements. With nowhere to hide, the singer's voice is exposed. She runs out of breath in the wrong places, goes off-mic slightly during the bridge. The guitarist comes in too early. The drummer laughs nervously during a verse. Uncertain, messier, the take is objectively worse in every possible standard. Rick smiles. "That's it. That's the one." he exclaims. "That's authentic." The manager is watching his PhD become obsolete in real-time. Rick: "You finally sing it for yourself!" Amazed at the new-born dimension of the song, the elegant producer in the other corner of the room readjusts his collar, suddenly aware that his entire outfit might be a conceptual mistake. The fancy chandelier on top of his head seems to dim slightly, as if realizing it has been trying too hard its entire existence. "Instinct over structure... Instinct over structure... You just stripped away what doesn't work instinctively, it must feel strange on your chest". Rubin whispers wondrously.`,
  },
  {
    id: '2',
    category: 'AUTHOR',
    name: 'Paul de Fressenel',
    description: "Welcome to Henry Miller's world. Here, everything is subject to redistribution.",
    author: 'Paul de Fressenel',
    iconUrl: require('../assets/images/MILLER KEY1.png'),
    date: '15/11/2024',
    fullContent: `Water, in its liquid form, refuses to hold shape. It pours through containers without being contained, it adapts to whatever vessel momentarily holds it, then moves over and spills elsewhere. There is no architecture that we can point to, and everything is subject to redistribution. Welcome to Henry Miller's world. 

Here, days merge without boundaries, jobs dissolve into other jobs, relationships bleed into each other. Experiences don't stack into a pyramid of progress but circulate and evaporate, condense and rain down again in different configurations. Like water taking the shape of its vessel, Miller mirrors his friends, absorbs their speech patterns, takes on their obsessions, and feels their moods as his own.

The one perpetually entranced by some new catastrophic idea. The one who drowns his listeners in spatters. The one that talks about his belongings as if they were old friends. They all come together in a drifting spectacle. Each encounter leaves a residue, a trace of color, revealing a facet of himself he could not have seen alone, igniting the slow chemistry of self-discovery.

An extract from Plexus, book two of The Rosy Crucifixion trilogy:

My hunger and curiosity drive me forward in all directions at once. At one and the same time I am interested and absorbed in Hindu music, in the ballet russe, in the German expressionist movement, in Scriabins' piano compositions, in the art of the insane (thanks to Prinzhorn), in Chinese chess, in boxing and wrestling bouts, in hockey matches, in medieval architecture, in the mysteries connected with the Egyptian and Greek underworlds, in the cave drawings of the Cro-Magnon man. The mere sound of Italian artists' names put me in ecstasy: Taddeo Gaddi, Signorelli, Fra Lippo Lippi… One evening, continuing our festal bouts on the splendors of Italy at the French-Italian grocery, Ulric and I, joined later by Hymie and Steve Romero, got into such a state of exaltation that two Italians who were seated at the end of the table stopped conversing with each other and listened in open-mouthed admiration as we moved rapidly from one figure to another, one town to another. Hymie and Romero, equally intoxicated by a language which was as foreign to them as it was to the two Italians, remained silent, contenting themselves, with replenishing the drinks. 

Exhausted finally, and about to pay up, the two Italians suddenly began to clap their hands. Bravo! Bravo! they exclaimed. So beautiful! We were embarrassed. The situation demanded another round of drinks. Joe and Louis joined us, offering us a choice liqueur. Then we began to sing. Fat Louis, moved to the guts, began to weep joyously. He begged us to stay a little longer, promising to fix us a beautiful rum omelette with some caviar on the side. I rolled home in a cab, singing like a man under anaesthesia. Unable to navigate the stop, I sat on the bottom steps laughing to myself, hiccoughing, mumbling and muttering crazily, orating to the birds, the alley cats, the telephone poles. Finally I made my way up the steps, slowly, painfully, sliding back a step or two and starting up again, reeling from one side to the other. A veritable Sisyphian ordeal. I fell on the bed fully dressed and went sound asleep.

There is no master design, no grand narrative arc, simply a constellation of scattered incidents, bright and fleeting, gloriously disconnected. Inevitably, all Nobel prize-worthy metaphysical questions collapse, finding answers in one simple word: aimlessness. It is purely the fact there is no agreed-upon consensus on the structure of all of this that makes it overflowing with potential and unbounded from fixed destinations. This is not a cause for existential crisis but rather celebration. Miller proudly decides to roll up Sisyphus' rock while dancing, trousers to the knees. Who said Camus pictured his exemplary worker with clothes on? 

An extract from Sexus, book one of The Rosy Crucifixion trilogy:

We had finished eating and we were having a third or fourth drink; the place was cosily filled, everybody was in a good mood. Suddenly, at a table nearby, a young man rose to his feet with a glass in hand and addressed the house. He wasn't drunk, he was just in a pleasant state of euphoria, as Dr. Kronski would put it. He was explaining quietly and easily that he had taken the liberty of calling attention to himself and his wife, to whom he raised his glass, because it was the first anniversary of their wedding, and because they felt so good about it that they wanted everybody to know it and to share their happiness. 

He said he didn't want to bore us by making a speech, that he had never made a speech in his life, and that he wasn't trying to make a speech now, but he just had to let everybody know how good he felt and how good his wife felt, that maybe he'd never feel this way again all his life. He said he was just a nobody, that he worked for a living and didn't make much money (nobody did any more), but he knew one thing and that was that he was happy, and he was happy because he had found the woman he loved, and he still loved her just as much as ever, though they were now married a whole year. (He smiled.) He said he wasn't ashamed to admit it before the whole world. He said he couldn't help telling us all about it, even if it bored us, because when you're very happy you want others to share your happiness.`,
  },
  {
    id: '3',
    category: 'FRIEND',
    name: 'Anonymous Neighbor',
    description: 'The one-year-old powerhouse who cradles me from birth.',
    author: 'Anonymous Neighbor',
    iconUrl: require('../assets/images/HEDGEHOG KEY1.png'),
    date: '20/10/2024',
    fullContent: `My blessing lies in a meeting that occurred early in my human career, mere seconds after taking the C-section exit. I found myself being cradled by the star-employee of a firm with offices spanning the Netherlands, France, London and Ghana, a new, imposing figure commanding unmatched respect and attention amidst the ranks. This one year old, having learned to walk a few days prior to my employment, was an intellectual powerhouse without parallel, unbridled with a love that I peacefully slept in since joining our wondrous world.

From my earliest memories, my neck assumed a tilted posture. My eyes always plastered on this beautifully tall personality, drinking life from her effortless being. Whether engaging in the quarterly dance, the olympic games in our back garden, writing a screenplay with our plastic dinosaurs, her chubby cheeks and cheeky ways paved the way for our collective shenanigans. 

Through these holes at the back of an enormous, moving metallic structure, we would shack up together and perceive the world, collecting imperative data for the firm. We sang, pranked, cried, screamed, loved in an uncanny synchronicity. Occasionally, she found these magical, warm, rectangular structures that she would stretch over us and we would get the much needed rest of two hard-working global leaders. 

Many years later, I would be faced with a terrifying, abrupt separation from her. In my usual way, the airport seemed close to outrunning me, catching up only by the skin of my teeth. Once at the gate, realising there would be no consistent return to the cradle of her arms, and her no return to mine, we found ourselves looking through black mirrors that managed to holographically capture some of us. With no 3-dimensionality, no shadow, no smell nor feel, she had been encaged in my four-cornered minuscule box, as we bid our unfortunate, watery farewell to each other.

 Thankfully, the firm had a way of resolving such fundamental issues. The Paris office, having made substantial progress, was graced with the addition of our wondrous character. Flying in with great speed, she quickly established herself, navigating the undercurrents of this rambunctious city. Her placement was extremely telling: rather than adding the second office in some tall building with a deferential view of the skyline, surrounded by an army of unnecessary restaurants, she chose a quiet, peaceful area and quickly became a member of its community. We pranced around the surrounding streets, her speaking to security guards, waitresses, cashiers just as she spoke to Nobel Laureates, and in all of them this rich, childlike gleam would appear.

After a demanding day of work, I chose to visit her office. Knocking on the door, I was greeted with the same warmth I had once experienced under those sheets. The orange lights caressed the walls, flowers singing a gentle tune that would put a wartime general to sleep in his mothers arms. Something wonderful was at bay, in the eyes and the shape of the laughter in that office, it seemed we were all imbibing in each other's beings. And how incredible that, now ripe, we could share this office with others who heard the same tune calling their name.`,
  },
];
