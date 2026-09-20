export interface PlayStep {
  kicker: string;
  title: string;
  body: string[];
}

export const PLAYBOOK: { id: string; heading: string; lede: string; steps: PlayStep[] }[] = [
  {
    id: "channel",
    heading: "Open the channel",
    lede: "Do this once. A new faceless channel dies from a messy identity, not from a missing plugin.",
    steps: [
      {
        kicker: "01",
        title: "Name it like a desk, not a startup",
        body: [
          "Two words. Concrete. Repeatable as a series title. 'Last Light Files' beats 'AI Amazing Facts 24'.",
          "Handle matches the name. About line is one sentence of the niche plus posting cadence. No life story.",
        ],
      },
      {
        kicker: "02",
        title: "Look like one show",
        body: [
          "Avatar: a still from your first video, cropped tight, no face required.",
          "Banner: the niche name, nothing else. Same type, same dark field, every week.",
        ],
      },
      {
        kicker: "03",
        title: "Flip the switches that keep you alive",
        body: [
          "YouTube Studio → Settings → Channel → Advanced → default upload language.",
          "On every upload: Altered / synthetic content = Yes. Skipping this is how new AI channels get limited, not a moral lecture.",
          "Turn on paid promotion disclosure only if you actually have one. Leave comments on. Community posts later, not day one.",
        ],
      },
    ],
  },
  {
    id: "produce",
    heading: "You never have to edit",
    lede: "NightDesk writes the script, speaks it, paints the stills, and cuts a Short in the browser. You press upload.",
    steps: [
      {
        kicker: "01",
        title: "Generate tonight's rundown",
        body: [
          "One niche. Five slugs. Pick the one with the nastiest first sentence.",
          "Hit Write package. Read the hook out loud. If you would swipe, rewrite it.",
        ],
      },
      {
        kicker: "02",
        title: "Build voice, stills, cut",
        body: [
          "Voice the narration. Generate stills. Assemble the cut. Download the WebM, the thumbnail, and the YouTube pack.",
          "That file is the video. You do not open CapCut unless you want to.",
        ],
      },
      {
        kicker: "03",
        title: "If you ever want a longer cut",
        body: [
          "Switch the desk to long form. NightDesk still writes the script and the stills.",
          "CapCut path if you insist: import voice → captions auto → drop stills on the timeline → auto beat → export. Fifteen minutes, once you have done it twice.",
        ],
      },
    ],
  },
  {
    id: "post",
    heading: "Upload without thinking",
    lede: "Same ritual every day so the algorithm learns the slot.",
    steps: [
      {
        kicker: "01",
        title: "Studio → Create → Upload videos",
        body: [
          "Paste the title. Paste the description. Paste the tags. Custom thumbnail on longs; Shorts use the first frame — NightDesk already designed that frame.",
          "Altered content: Yes. Not for kids. Made for YouTube, not 'made for kids'.",
        ],
      },
      {
        kicker: "02",
        title: "Publish in the same window",
        body: [
          "Pick one hour and keep it. Evening in US time is fine. Consistency beats 'best time' charts.",
          "First comment: paste the pinned comment from the pack. Heart it.",
        ],
      },
      {
        kicker: "03",
        title: "Mark it posted on the desk",
        body: [
          "So tomorrow's rundown does not repeat the slug.",
        ],
      },
    ],
  },
  {
    id: "grow",
    heading: "What actually gets you watched",
    lede: "New channels in 2026 still get distributed. They die from hopping, not from 'the algorithm is dead'.",
    steps: [
      {
        kicker: "01",
        title: "Shorts first, one niche, thirty days",
        body: [
          "A new channel with no watch history gets sampled on Shorts. Post daily for 30 days before you judge the niche.",
          "Same visual language every episode so a stranger recognizes you on the third swipe.",
        ],
      },
      {
        kicker: "02",
        title: "The first second is the product",
        body: [
          "No logo sting. No 'welcome back'. A time, a name, or a forbidden fact. Then a cut.",
          "Pattern interrupt every 8-12 seconds: new still, new claim. NightDesk already scenes it that way.",
        ],
      },
      {
        kicker: "03",
        title: "Series over one-offs",
        body: [
          "Part 4 outperforms a random masterpiece because people hunt the rest. End every video on the next file.",
          "Reply to the comments that ask for the next case. That is your next rundown.",
        ],
      },
      {
        kicker: "04",
        title: "Things that look like growth and are not",
        body: [
          "Bought views, engagement groups, stolen clips, someone else's soundtrack, cloning a living creator's face or voice.",
          "Those get the channel deleted. Original stills + original narration + a daily slot is slower on day one and faster on day thirty.",
        ],
      },
    ],
  },
];
