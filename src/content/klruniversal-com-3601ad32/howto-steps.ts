/**
 * HowTo schema for the blog posts that contain a genuine, visible,
 * numbered/sequential procedure. Every `name` and `text` below is copied
 * verbatim from that post's existing H2/H3 heading and OL/UL block in
 * blog-posts.json -- nothing here is invented or paraphrased, so the
 * structured data can never drift from what a reader actually sees on the
 * page. Only posts with a real step-by-step or checklist structure get an
 * entry; comparison posts ("Rotary vs Auger") are deliberately excluded --
 * HowTo markup on non-procedural content is the kind of misuse Google's
 * guidelines call out directly.
 */
export const HOWTO_STEPS: Record<
  string,
  { name: string; description: string; steps: { name: string; text: string }[] }
> = {
  "what-is-water-well-drilling-machine": {
    name: "How a Water Well Drilling Machine Works",
    description:
      "Step-by-step working process of a water well drilling machine, from site preparation to well development.",
    steps: [
      {
        name: "Site preparation and alignment",
        text: "The machine is positioned and levelled at the drilling point.",
      },
      {
        name: "Drilling method selection",
        text: "Rotary, DTH, or auger drilling is chosen based on soil and rock conditions.",
      },
      {
        name: "Borehole drilling process",
        text: "The borehole drilling machine drills to the required depth using rotation, impact, or both.",
      },
      {
        name: "Casing installation",
        text: "Pipes are inserted to prevent borehole collapse and protect water quality.",
      },
      {
        name: "Flushing and well development",
        text: "Air or water clears debris and improves water flow.",
      },
    ],
  },
  "cdr-core-drill-rigs-deep-core-sampling": {
    name: "Step-by-Step Core Drilling Process",
    description:
      "How a core drill rig takes a cylindrical rock sample, from hole design through to assay.",
    steps: [
      {
        name: "Drill Hole Design",
        text: "Geologists define target depth and core size based on the geological model.",
      },
      {
        name: "Rig Setup",
        text: "The operator positions the rig and installs collar casing to stabilise the surface.",
      },
      {
        name: "Drilling Commences",
        text: "The diamond bit rotates under applied weight, cutting an annulus around a core plug that enters the inner tube during core barrel drilling.",
      },
      {
        name: "Retrieval",
        text: "When full, workers retrieve the inner tube using wireline systems.",
      },
      {
        name: "Logging",
        text: "Geologists describe the sample and mark mineralisation zones.",
      },
      {
        name: "Assay",
        text: "Mineralised intervals are cut for laboratory assay.",
      },
      {
        name: "Completion",
        text: "The core drilling machine for mining operates until reaching the target depth.",
      },
    ],
  },
  "role-of-exploration-drilling-in-resource-discovery": {
    name: "The Exploration Drilling Process",
    description:
      "The logical sequence exploration drilling follows to manage financial risk, from target generation to the go/no-go decision.",
    steps: [
      { name: "Target Generation", text: "Analyzing maps and satellite data." },
      { name: "Program Design", text: "Planning hole depth and spacing." },
      { name: "Mobilization", text: "Moving exploration drill rigs to the site." },
      { name: "Operations", text: "Drilling and collecting samples systematically." },
      { name: "Sample Handling", text: "Dispatching cores to labs for assaying." },
      { name: "Interpretation", text: "Using results to build geological models." },
      {
        name: "Decision",
        text: "Determining if the project moves to a feasibility study.",
      },
    ],
  },
  "tractor-mounted-drilling-rigs-overview": {
    name: "How to Choose a Tractor-Mounted Drilling Rig",
    description:
      "Practical considerations for new buyers choosing the right tractor-mounted drilling rig.",
    steps: [
      {
        name: "Drilling Depth and Diameter Requirements",
        text: "Clearly define the typical depth and bore size you plan to drill. Entry-level rigs are ideal for shallow to mid-depth projects.",
      },
      {
        name: "Ground Conditions",
        text: "Assess whether you will mostly work in soft soil, mixed strata, or hard rock. Ensure the rig's torque and hammer compatibility match these conditions.",
      },
      {
        name: "Tractor Compatibility",
        text: "Check horsepower requirements and hydraulic compatibility to ensure your existing tractor can safely operate the rig.",
      },
      {
        name: "Ease of Operation and Maintenance",
        text: "Beginner-friendly controls, simple maintenance, and easy availability of spare parts are critical for first-time buyers.",
      },
      {
        name: "Budget and Operating Costs",
        text: "Tractor-mounted drilling rigs typically cost less to purchase and operate than larger rigs, making them suitable for small contractors and individual operators.",
      },
    ],
  },
  "drill-rig-maintenance-tips": {
    name: "How to Maintain a Drill Rig",
    description:
      "A daily, weekly, and monthly maintenance checklist for keeping drill rigs in top condition.",
    steps: [
      {
        name: "Engine and Power (daily)",
        text: "Check engine oil and coolant levels. Inspect the radiator for dust blockages. Look at the air filter -- for surface drilling rigs in dry mines, this is the most critical check of the day.",
      },
      {
        name: "Hydraulics (daily)",
        text: "Scan for leaks at all hose connections. Check the fluid level in the tank. Watch for worn seals on hydraulic cylinders.",
      },
      {
        name: "DTH and Rotary Components (daily)",
        text: "For a down-the-hole drill rig, inspect the hammer bit shank and the chuck for wear. Check the DTH rig drill rods for any cracks or bent sections. On a rotary drilling rig, check the gearbox oil and the swivel assembly for leaks.",
      },
      {
        name: "Weekly Tasks",
        text: "Grease all points on the mast, rotary head, and slide rails. Tighten fasteners that may have vibrated loose. Check wire ropes and chains for fraying. Clean or replace air and hydraulic filters based on the environment.",
      },
      {
        name: "Monthly Tasks",
        text: "Inspect the entire drill string, including rods and subs, for wear patterns. Calibrate gauges and flow meters to ensure accuracy. Check the undercarriage, including tracks and rollers, on mining drilling rigs. Update your drill machine maintenance checklist based on the month's performance.",
      },
      {
        name: "Safety Checklist",
        text: "Test all emergency stop buttons to ensure they cut power instantly. Confirm that safety guards are bolted tight around the rotary drilling rig head. Check pressure relief valves on the compressor and hydraulic circuits. Ensure operators are certified for the specific DTH drilling machine they are using.",
      },
    ],
  },
};
