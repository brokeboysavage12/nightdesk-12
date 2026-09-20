export interface Niche {
  id: string;
  index: string;
  name: string;
  blurb: string;
  why: string;
  visual: string;
  imageBible: string;
  hookStyle: string;
  seriesHint: string;
  voiceHint: string;
}

export const NICHES: Niche[] = [
  {
    id: "last-24",
    index: "01",
    name: "Last 24 Hours",
    blurb: "The final day of a disaster, empire, ship, or city — told like a clock is running out.",
    why: "Searchable, bingeable as a numbered series, and faceless by default. New channels grow here because every video is a self-contained story with a sequel built in.",
    visual: "Dusk archives, grain, empty streets, maps, firelight at the edge of frame.",
    imageBible:
      "Cinematic documentary still, photoreal, 35mm film grain, dusk and smoke, empty streets, archival mood, no text, no logos, no watermarks, no celebrity likeness, no modern UI.",
    hookStyle: "Open on a precise time. No intro. The city still thinks it will survive the night.",
    seriesHint: "Last 24 Hours of…",
    voiceHint: "Low, even, unhurried. Like a case officer reading a file.",
  },
  {
    id: "forbidden",
    index: "02",
    name: "Forbidden Chapter",
    blurb: "History that was buried, banned, or left out of the textbook — original narration, not a ripped documentary.",
    why: "Curiosity titles click. Evergreen search traffic keeps the video alive after the first spike.",
    visual: "Manuscripts, stone, candle smoke, closed doors, cold museums after hours.",
    imageBible:
      "Cinematic still of forbidden archives, candlelit vellum, stone corridors, smoke in light shafts, photoreal, no text, no logos, no watermarks, no faces of famous living people.",
    hookStyle: "They did not want this chapter in the book. Then say the one fact that proves it.",
    seriesHint: "The chapter they cut…",
    voiceHint: "Quiet authority. Never theatrical.",
  },
  {
    id: "unsolved",
    index: "03",
    name: "Unsolved Desk",
    blurb: "Public-record disappearances and locked rooms. Atmosphere and timeline, not fake footage of real victims.",
    why: "Mystery retention is brutal in the best way — people stay for the missing piece. Series format is native.",
    visual: "Fog roads, empty chairs, case folders, payphones, winter windows.",
    imageBible:
      "Quiet crime-desk still, fogged glass, empty rural road at night, manila folders, analog desk lamp, photoreal film, no text, no logos, no identifiable real victim faces.",
    hookStyle: "A person walks out of a place they knew. They do not come back. Start there.",
    seriesHint: "File #…",
    voiceHint: "Flat, careful, no true-crime glee.",
  },
  {
    id: "what-if",
    index: "04",
    name: "If It Happened Tonight",
    blurb: "Collapse and simulation stories: grid down, water gone, city sealed. Grounded, not cartoon apocalypse.",
    why: "High comment volume. People argue in the comments, which the algorithm reads as a signal.",
    visual: "Blacked-out towers, empty highways, supermarket aisles, paper maps.",
    imageBible:
      "Photoreal night city with no power, empty interstate, analog maps on a table, cold blue-black light, cinematic still, no text, no logos, no watermarks.",
    hookStyle: "Put the viewer in hour one. Not the history of the concept — the first night.",
    seriesHint: "Hour one of…",
    voiceHint: "Calm briefing. Like someone who already packed a bag.",
  },
  {
    id: "brain-trap",
    index: "05",
    name: "Brain Trap",
    blurb: "How attention, fear, and habit run people. Psychology with teeth, not therapy-speak.",
    why: "Saves and shares. Works as Shorts because each trap is one idea with a nasty little twist.",
    visual: "Mirrors, waiting rooms, fluorescent halls, a single lamp in a dark apartment.",
    imageBible:
      "Clinical cinematic still, fluorescent hallway, cracked mirror, lonely apartment lamp, cool desaturated palette, photoreal, no text, no logos, no watermarks.",
    hookStyle: "Name the trap in one line. Make the viewer feel caught before you explain it.",
    seriesHint: "Trap #…",
    voiceHint: "Close-mic, conversational, slightly cold.",
  },
  {
    id: "ghost-places",
    index: "06",
    name: "Places That Shouldn't Exist",
    blurb: "Lost towns, impossible borders, rooms under cities, coordinates that go nowhere.",
    why: "Visual niche — stills look expensive. Travel + mystery search overlap.",
    visual: "Aerial ruins, mist over water, rusted rail, concrete bunkers.",
    imageBible:
      "Aerial ruin in mist, abandoned concrete, rusted rail into fog, photoreal landscape still, overcast, no text, no logos, no people in focus, no watermarks.",
    hookStyle: "Give a coordinate or a name nobody uses anymore. Then the rule it breaks.",
    seriesHint: "Coordinate…",
    voiceHint: "Travelogue, lower energy, a little haunted.",
  },
  {
    id: "quiet-rich",
    index: "07",
    name: "Quiet Fortunes",
    blurb: "How historical wealth was actually assembled — ports, monopolies, families. History, not get-rich advice.",
    why: "Money thumbnails click. Historical framing keeps you off the finance-advice strike zone.",
    visual: "Ledgers, docks, private clubs, heavy wood, rain on black cars of another century.",
    imageBible:
      "Old-money interior, leather ledgers, rain on a dark harbor, photoreal cinematic still, tungsten light, no text, no logos, no watermarks, no living billionaires.",
    hookStyle: "A number that feels wrong. Then who collected it, and how quietly.",
    seriesHint: "The quiet fortune of…",
    voiceHint: "Dry, amused, never hype.",
  },
  {
    id: "survival",
    index: "08",
    name: "Survival Math",
    blurb: "Could you last the night, the week, the crossing — answered with numbers, not bravado.",
    why: "List energy plus story. Comments become personal survival plans, which feeds the next video.",
    visual: "Tree line at night, frost, a single flare, ration tins, river ice.",
    imageBible:
      "Wilderness night still, frost, tree line, river ice, a single distant light, photoreal cinematic, no text, no logos, no watermarks.",
    hookStyle: "Give the constraint first: temperature, hours, miles. Then the body starts failing.",
    seriesHint: "Could you last…",
    voiceHint: "Field report. Short sentences.",
  },
];

export function getNiche(id: string) {
  return NICHES.find((n) => n.id === id) ?? NICHES[0];
}

export const VOICES: { id: import("./types").VoiceId; name: string; line: string }[] = [
  { id: "atlas", name: "Atlas", line: "Low documentary. Default for history." },
  { id: "rex", name: "Rex", line: "Grave news desk." },
  { id: "orion", name: "Orion", line: "Calm explainer." },
  { id: "helix", name: "Helix", line: "Cinematic, a little distant." },
  { id: "eve", name: "Eve", line: "Closer, brighter — psychology and traps." },
  { id: "luna", name: "Luna", line: "Quiet mystery." },
];

export const CADENCE_LABEL: Record<import("./types").Cadence, string> = {
  daily: "Daily Shorts",
  weekdays: "Weekdays",
  "3x": "Three a week",
};
