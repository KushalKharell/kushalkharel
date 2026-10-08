/*
  Vlog posts
  ==========
  To publish a post, add an object to the TOP of the list below and push.
  Posts are shown newest first (sorted by date). Every field except `date` is optional,
  so a post can be just text, just a link, just a video, or any mix.

  {
    date:  "2026-10-08",                      // YYYY-MM-DD, or YYYY-MM for month only (required)
    title: "Post title",
    tags:  ["robotics", "career"],            // used for the filter buttons
    body:  `First paragraph.

Second paragraph. URLs like https://example.com become links automatically.`,
    link:  {                                  // a link you want to share, shown as a card
      url: "https://example.com/article",
      title: "Article title",
      description: "Why it's worth reading."
    },
    video: "https://youtu.be/VIDEO_ID",       // YouTube link, or a path to an .mp4 file
    image: {                                  // put the file in the vlog_images/ folder
      src: "vlog_images/photo.jpg",
      alt: "What the image shows",
      caption: "Optional caption"
    }
  }
*/
window.VLOG_POSTS = [
  {
    date: "2025-04",
    title: "New chapter: Robotics Software Engineer at Smith+Nephew",
    tags: ["career", "robotics"],
    body: `This April I joined Smith+Nephew as a Robotics Software Engineer, working on the CORI and ORCA surgical robotics platforms.

Moving from flight and imaging payloads to surgical robotics has been a big shift. Software design and architecture matter more than ever when the system sits in an operating room.`
  },
  {
    date: "2022-04-24",
    title: "Robo-Drummer: our senior design project",
    tags: ["projects", "embedded"],
    body: `Our Penn State Behrend senior design team built a robotic drummer that works as a physical metronome. The school wrote up the project, including how it came together.`,
    link: {
      url: "https://sites.psu.edu/behrendseniordesign/2022/04/24/robo-drummer-physical-metronome/",
      title: "Robo-Drummer: Physical Metronome",
      description: "Penn State Behrend Senior Design feature article."
    }
  }
];
