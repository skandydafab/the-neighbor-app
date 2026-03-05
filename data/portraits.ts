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
  iconUrl: any;         // require() import for pixel art
  date: string;
}

export const portraits: Portrait[] = [
  {
    id: '1',
    category: 'MUSICIAN',
    name: 'Rick Rubin',
    description: 'The godfather of Western music, cross-legged, shoeless, authentic.',
    iconUrl: require('../assets/images/RUBIN KEY1.png'),
    date: '01/12/2024',
    fullContent: `The godfather of Western music looks exactly how he ought to. A beard fighting for more space on the canvas. Trimodal hair with tentacles emanating north, west and east. He seemed to have more in common with raccoons and walruses than he did with its human counterparts. It did not help that, without fault, he was in some form of a cross-legged asana on a comically incompatible chair. Yet there was something fascinating in his unusual poise, in the effortless certitude with which he and his bare feet approached conversation. So, how could one man have such an outsized impact on the musical industry (The Beatles, Michael Jackson, Amy Winehouse..)? Is it a signature ‘Rubin’ style? Is it a magical chord? 

I assumed he must be some magical genius who could dissect harmony like a surgeon. He must have a complex technical toolbox composed of studio tricks, advanced softwares, and production formulas. But no. He surprisingly claims to have ‘zero knowledge in music theory’. The man who shaped the sound of multiple generations insists he doesn’t understand the technical foundations of what he is shaping. Upon hearing that, I was in disbelief. So what, he just wandered out of a forest and accidentally revolutionized western music? This would not hold up in court. 

<center>
  <img src="https://via.placeholder.com/300" alt="Rick Rubin" />
  <p><strong>GEIST MONO</strong></p>
  <p>The walrus knows something we don't.</p>
</center>

The walrus knows something we don't.

A recording studio in Malibu. Fourth hour. Expensive silence. The engineer’s third espresso sits cold near the mixing board. In one corner of the room, a producer wearing a double-breasted Brunello Cucinelli blazer is gesturing at frequency graphs and explaining to an assistant why a specific compressor is essential for the “sonic palette”. In the adjacent corner, Rick Rubin, eyes closed, sits barefoot. He is dressed like he is about to feed ducks in a pond. In the tracking room, a famous band is finishing up their future lead single. It has been rehearsed into submission. Every transition glass-smoothed. Every harmony stacked like Jenga blocks. They look at Rick, waiting for approval. He opens his eyes slowly. “Forget the snare,” he says. “Play it like you mean it”. The room exhales. The band manager clears his throat nervously. “But Rick, we’ve spent weeks on this arrangement. The snare really makes the-” gets interrupted: “I can tell, it looks like work”. Uncomfortable silence. 

“Play it like you’re figuring it out right now”. They start playing again, without the snare and agreed-upon arrangements. With nowhere to hide, the singer’s voice is exposed. She runs out of breath in the wrong places, goes off-mic slightly during the bridge. The guitarist comes in too early. The drummer laughs nervously during a verse. Uncertain, messier, the take is objectively worse in every possible standard. Rick smiles. “That’s it. That’s the one.” he exclaims. “That’s authentic.” The manager is watching his PhD become obsolete in real-time. Rick: “You finally sing it for yourself!” Amazed at the new-born dimension of the song, the elegant producer in the other corner of the room readjusts his collar, suddenly aware that his entire outfit might be a conceptual mistake. The fancy chandelier on top of his head seems to dim slightly, as if realizing it has been trying too hard its entire existence. “Instinct over structure... Instinct over structure… You just stripped away what doesn’t work instinctively, it must feel strange on your chest”. Rubin whispers wondrously. (where in betewen court and a recording studio, there is the image whose path I gave you (centered) with a caption The walrus knows something we don't.
in bold geist mono centered below there. Please try to execute that.`,
  },
  {
    id: '2',
    category: 'AUTHOR',
    name: 'Henry Miller',
    description: "Welcome to Henry Miller's world. Here, everything is subject to redistribution.",
    iconUrl: require('../assets/images/MILLER KEY1.png'),
    date: '15/11/2024',
    fullContent: `[PLACEHOLDER - Replace with full portrait text]

This is where the complete profile of Henry Miller will go.

Paste the full portrait text here when ready.`,
  },
  {
    id: '3',
    category: 'FRIEND',
    name: 'Furtive Hedgehog',
    description: 'The one-year-old powerhouse who cradles me from birth.',
    iconUrl: require('../assets/images/HEDGEHOG KEY1.png'),
    date: '20/10/2024',
    fullContent: `[PLACEHOLDER - Replace with full portrait text]

This is where the complete profile of Furtive Hedgehog will go.

Paste the full portrait text here when ready.`,
  },
];