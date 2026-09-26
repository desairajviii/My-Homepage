# Requirement preservation audit

This audit maps the requirements supplied with the redesign request and the existing
repository documentation. The instructor rubric was subsequently provided and reviewed; external submission requirements remain outstanding.

| Requirement                               | Revised project evidence                                                                                                                                 |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Three HTML5 pages                         | index.html, projects.html, ai-lab.html                                                                                                                   |
| Explicit AI-assisted third page           | Explicit AI-assisted disclosure and a working FocusFlow planner                                                                                          |
| Vanilla HTML/CSS/ES6+ modules             | Local CSS files and script type="module"; no runtime library or backend                                                                                  |
| Professor's ESLint configuration          | eslint.config.js preserved from the source commit                                                                                                        |
| Module package, Prettier, MIT license     | package.json, .prettierrc, and LICENSE preserved                                                                                                         |
| Organized folders                         | css/, js/, images/, docs/ retained; portfolio.css isolates personal-page styling; focusflow.css and focusflow.js implement the planner                   |
| Grid and Flexbox                          | Responsive project entries, case-study rows, navigation, filter controls, and contact links                                                              |
| Original JavaScript, more than five lines | Existing js/main.js retained, including Explorer and Spotlight logic                                                                                     |
| Project Explorer                          | Eight entries; All/IoT/Machine Learning/Web filtering with live count and pressed states                                                                 |
| Project Spotlight                         | Four original lessons, button cycling, counter, and live output retained                                                                                 |
| Accessibility                             | Semantic landmarks, skip link, focus styles, live regions, reduced motion, image alt text, no-JS navigation                                              |
| Metadata                                  | Character encoding, viewport, author, description, theme color, titles, favicon retained                                                                 |
| Personal content                          | Two education entries, three internships, skills, certification, résumé, and contact links retained                                                      |
| Grounded project claims                   | Existing descriptions reorganized; team attribution and metric limitations retained                                                                      |
| Local assets                              | Original images and résumé retained in the project; case studies are text-only                                                                           |
| README                                    | Author, class link, objective, screenshot, setup/use steps, technical requirements, original features, AI disclosure, deployment, video section, license |
| Design document                           | Personas, user stories, information architecture, current layout captures, design rationale, and accessibility notes                                     |
| Validation                                | Prettier, ESLint, W3C Nu, internal references, and browser interaction checks; see validation-report.md                                                  |
| Static deployment                         | Relative local paths; no build step; compatible with GitHub Pages at repository root                                                                     |

## Remaining submission items

- Add the final public or unlisted demo video URL in README; its existing placeholder remains.
- Deploy the revised files and confirm the live URL before submitting. This ZIP delivery does not update the public repository or deployment.
- Confirm that the existing course link matches the assignment.
- Complete the required code review and Google Form submission; verify its thumbnail and links.
- Confirm precise GenAI model/version details in README.
- Rerun W3C validation for the new AI Lab page; remote validation was blocked in this environment.

All three pages now share a consistent personal style, and README continues to disclose
AI assistance, including this redesign. Visual appearance does not establish authorship.
