// Every figure here is pulled from the real per-model quickSpecs in
// products.json (not invented), to fix Semrush's "low word count" flag on
// these 5 category pages without resorting to filler text.
export const CATEGORY_DESCRIPTIONS: Record<string, string[]> = {
  "water-well": [
    "KLR Universal's water well range covers depths from around 100 m to 800 m, using five DTH (Down-the-Hole) rigs built around the same hammer-drilling principle: a pneumatic hammer at the bottom of the hole delivers impact energy directly to the bit, which drills faster and straighter through hard rock than top-drive rotary methods. The TBW-40 and DTHR-150 handle shallower domestic and agricultural bores up to roughly 200 m; the DTHR-300 steps up to 400 m and the DTHR-600 to 650 m for municipal and irrigation wells; the DTHR-750 reaches 800 m for the deepest high-yield wells in the lineup. Diameters span 4.5″ to 24″ across the range, so the same five rigs cover a single household bore through to a large-volume supply well.",
    "Every rig is built in-house at KLR's Hyderabad facility, running since 1984, with its own Heat Treatment Division producing the drill rods and hammer components that go into each unit — the drilling tools aren't sourced separately from a third party.",
  ],
  "surface-mining": [
    "This range covers two distinct drilling methods rather than one: the EA series, ITD 10 and HD 100 use DTH (Down-the-Hole) hammers, while the THA series uses top hammer drilling, where the percussive mechanism sits above the rock and energy travels down the drill string instead of being generated at the bit. Both are represented because surface mining and quarrying sites vary in rock hardness and hole depth — DTH tends to hold straighter and faster in harder, more abrasive rock, while top hammer suits shallower benching and quarrying work.",
    "Hole depths across the range run from around 30 m up to 60 m (the TS 911 series), with diameters spanning 4″ to 16″ across the range (the ITD 10 is the exception, topping out at 6.5″). The TS 590 and TS 911 families add D/E and SP variants for different mounting and power configurations on the same drilling geometry, so a quarry or open-pit operation can standardise on one rig family across several site conditions rather than running entirely different machines for each.",
  ],
  construction: [
    "The construction range splits into two different jobs. The TP30 and CP20 are rotary & auger rigs for foundation and piling work, drilling up to 24″ diameter and down to 50 m — the depth a building's piles or a retaining structure's foundations typically need. The KPR, by contrast, is a pole hole rig: it drills wider (24″ to 47.2″) but shallower, up to 15 m, which is the geometry utility and transmission pole installation actually calls for — a short, wide hole rather than a deep, narrow one.",
    "Between the three, the range covers the two most common construction drilling jobs — deep narrow piling and shallow wide pole holes — without needing a rig designed for mining or water well depths that these projects never reach.",
  ],
  exploration: [
    "All four rigs in this range are core drill rigs, built for diamond coring rather than open-hole blasting or water well drilling: the bit cuts a cylindrical rock sample (the \"core\") that geologists log and assay to confirm what's actually underground before a mine or project commits to it. The TMC 40 drills to 50 m using the NQ/HQ wireline coring standard; the CDR 150, CDR 500 and CDR 750 scale up from there, reaching 200 m, 500 m and 750 m respectively, for progressively deeper exploration programmes.",
    "Because the model numbers roughly track usable depth (150, 500, 750), a mineral exploration team can move from early-stage, shallow confirmation drilling on the CDR 150 to a full-depth resource-definition programme on the CDR 750 without changing coring standards or tooling partway through a project.",
  ],
  "underground-drill-rigs": [
    "Underground rigs face a constraint surface rigs don't: the machine itself has to fit and manoeuvre inside a mine tunnel or drift, not just drill one. The ITH 60 uses in-the-hole (ITH) drilling, transferring energy directly to the bit for efficient penetration in confined headings, at diameters from 6.5″ to 12″ and depths up to 50 m. The KWD-10 is the more compact of the two — a DTH (Down-the-Hole) machine sized for tighter underground headings, drilling 4.5″ to 6″ holes up to 30 m.",
    "Between them, the two rigs cover both ends of underground development and production drilling: the ITH 60 for larger-diameter work where the heading allows it, the KWD-10 where space is the limiting factor.",
  ],
};
