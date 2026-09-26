# Revised portfolio validation

Checked September 26, 2026 against source commit
`671c1b9020d49c0e1ec2ff52791f687be84fa935`.

## Results

| Check                   | Result                                                                            |
| ----------------------- | --------------------------------------------------------------------------------- |
| Prettier formatting     | Applied and checked with the repository's configuration                           |
| ESLint                  | Passed using the unchanged class configuration                                    |
| W3C Nu HTML checker     | Previous version: all three pages passed. Updated AI Lab needs a fresh W3C check  |
| Local references        | All HTML asset paths, page links, and fragment targets resolve                    |
| HTML attributes         | Unique IDs; all content images retain alt text and explicit dimensions            |
| Browser layout          | No horizontal overflow at 320, 390, 768, and 1440 CSS pixels on all three pages   |
| Project Explorer        | IoT: 4; Machine Learning: 4; Web: 3; All: 8; pressed state and live count checked |
| Project Spotlight       | Four clicks cycle back to the first of four projects                              |
| Project navigation      | All eight index anchors checked; concept illustrations subsequently removed       |
| Mobile menu             | Open/close, Escape, and focus return checked                                      |
| FocusFlow               | Working planner tested; detailed current checks in focusflow-checks.json          |
| Progressive enhancement | Main content and navigation available without JavaScript on all pages             |
| Reduced motion          | Reveal animation disabled when reduced motion is requested                        |
| Browser errors          | No page exceptions or failed HTTP resource responses during the checks            |

The previous W3C check returned only informational messages about Prettier's trailing
slashes on void elements. Attribute values are quoted. These are not validation
errors or warnings. Raw earlier HTML-checker responses are in `html-validation.json`; they do not validate the new AI Lab markup.

## Tools and scope

Checks ran in local headless Microsoft Edge through Playwright. Desktop and mobile
captures were visually reviewed. This is not a full screen-reader audit or a claim
of testing every browser. External résumé claims and linked third-party pages were
not independently verified.

The environment supplied Node but no npm command. The existing declared development
dependencies were installed with the bundled pnpm tool, without changing package.json
or adding runtime dependencies. The equivalent Prettier and ESLint entry points were
run directly:

```text
node node_modules/prettier/bin/prettier.cjs --write .
node node_modules/prettier/bin/prettier.cjs --check .
node node_modules/eslint/bin/eslint.js .
```

The normal `npm install`, `npm run format:check`, and `npm run lint` instructions
remain valid on a machine with npm installed. Node modules and Git history are
excluded from the delivery ZIP; all source files, local assets, and documentation
are included. No remote repository or live deployment was modified.

## Working FocusFlow update

Prettier and the unchanged class ESLint configuration pass for the new module and page.
Browser checks passed for task creation, removal, completion and reopening-related controls,
energy suggestions, saving after refresh, timer start/pause/reset/finish, paused and running
timer refreshes, empty-list persistence, blank-name validation, literal unsafe-looking text,
corrupted storage recovery, and unavailable storage. The planner is hidden with a useful
explanation when JavaScript is disabled. No overflow at 320, 390, 768, and 1440 pixels.
The unchanged homepage filter and Spotlight were also checked. Screenshots were refreshed
and visually reviewed. See focusflow-checks.json for the automated result list.

Local asset, anchor, unique-ID, and image-attribute checks passed. An attempt to rerun
the remote W3C checker was blocked by this environment's network permissions. Validate
the revised ai-lab.html through the W3C checker before final submission; the earlier
HTML validation result is not evidence for this changed page.

## Shared appearance update

All three pages were restyled with a shared CSS foundation. JavaScript hashes match
the previous version exactly. No pictures, decorative artwork, or new features were
added. Computed navigation height, font family, background, title size/weight,
button color/radius, and content width match on all three pages.

Browser checks passed at 320, 390, 768, and 1440 pixels with no horizontal overflow.
Mobile navigation and Escape work on all pages; homepage filters and Spotlight,
planner suggestions, timer start/pause, and task completion passed. No-JavaScript
navigation and planner fallback remain usable. Screenshots were visually reviewed.
Prettier and ESLint pass; no CSS !important declarations were introduced.
See style-checks.json. The previously noted remote W3C validation limitation remains.
