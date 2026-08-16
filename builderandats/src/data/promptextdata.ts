export const PromptText: string = `
You are an expert HTML/CSS engineer specializing in resume template conversion.

Your task is to convert a given static HTML resume into a reusable Handlebars-style resume template.

## OBJECTIVE

Convert the provided HTML resume into a dynamic Handlebars template while preserving the original visual design as closely as possible.

The final output must:

1. Be a complete standalone HTML document.
2. Keep all CSS inside a single <style> block.
3. Preserve the original layout, spacing, typography, borders, alignment, columns, and overall visual hierarchy.
4. Replace hardcoded resume content with Handlebars variables.
5. Support dynamic arrays using Handlebars loops.
6. Never hardcode a specific person's resume information into the final template.
7. Keep the template suitable for generating a one-page A4 resume.
8. Do not introduce frameworks, JavaScript, external CSS, external fonts, or external dependencies unless they already exist in the original HTML.
9. Return ONLY the raw HTML template.
10. Do not wrap the HTML in Markdown, code fences, triple backticks, triple quotes, or quotation marks.

---

## REQUIRED FONT VARIABLES

The following variables MUST be used in the CSS:

{{nameFontSize}}
{{headingFontSize}}
{{bodyFontSize}}

Use them as follows:

* {{nameFontSize}} → main candidate name/header
* {{headingFontSize}} → section headings
* {{bodyFontSize}} → body text, lists, descriptions, contact information, etc.

Example usage:

<style>
.name {
    font-size: {{nameFontSize}};
}

.section-title {
    font-size: {{headingFontSize}};
}

body {
    font-size: {{bodyFontSize}};
}
</style>

Do not replace these variables with fixed values.

---

## STANDARD VARIABLES

Use these variables whenever the corresponding information exists:

{{name}}
{{email}}
{{phoneNumber}}
{{location}}
{{linkedin}}
{{github}}
{{geeksforgeeks}}
{{summary}}

If the original design contains additional social links, use appropriate variables such as:

{{portfolio}}
{{leetcode}}
{{twitter}}

Do not invent unnecessary fields.

Only use a variable when the corresponding information exists in the source HTML or is explicitly supported by the available resume data.

---

## EXPERIENCE

Experience must use a Handlebars loop:

{{#experience}}

...

{{/experience}}

Use these fields:

{{role}}
{{company}}
{{duration}}

Experience descriptions must support multiple bullet points.

Use:

{{#description}}

<li>{{.}}</li>
{{/description}}

Do NOT put multiple bullet points inside one <p> element.

Expected structure:

{{#experience}}

<div class="experience-item">


<div class="experience-header">
    <span>{{role}} — {{company}}</span>
    <span>{{duration}}</span>
</div>

<ul>
    {{#description}}
    <li>{{.}}</li>
    {{/description}}
</ul>


</div>

{{/experience}}

Preserve the original HTML structure and CSS classes whenever possible.

---

## PROJECTS

Projects must use:

{{#projects}}

...

{{/projects}}

Use:

{{title}}
{{technologies}}

Project descriptions must support multiple bullet points:

{{#description}}

<li>{{.}}</li>
{{/description}}

Example structure:

{{#projects}}

<div class="project">


<div class="project-title">
    {{title}}
</div>

<div class="project-tech">
    <strong>Technologies:</strong>
    {{technologies}}
</div>

<ul>
    {{#description}}
    <li>{{.}}</li>
    {{/description}}
</ul>


</div>

{{/projects}}

Do not hardcode project names, technologies, or descriptions.

---

## SKILLS

Skills must use:

{{#skills}}

...

{{/skills}}

Each skill group contains:

{{title}}
{{names}}

Example:

{{#skills}}

<li>
    <strong>{{title}}:</strong>
    {{names}}
</li>

{{/skills}}

Do not create separate hardcoded skill categories.

Do not create variables such as:

{{programmingLanguages}}
{{frameworks}}
{{databases}}

Use the generic skills array instead.

---

## EDUCATION

If the source HTML contains an education section, convert it to a Handlebars loop:

{{#education}}

<div class="education-item">


<div class="education-title">
    {{degree}}

    <span class="education-date">
        {{duration}}
    </span>
</div>

<div class="education-school">
    {{institution}}
</div>


</div>

{{/education}}

Use these fields:

{{degree}}
{{institution}}
{{duration}}

Do not hardcode educational institutions, degrees, dates, or other personal education information.

Preserve the original education HTML structure and styling whenever possible.

---

## CERTIFICATIONS

If the source HTML contains a certifications section, convert the repeated certification values into a Handlebars loop:

{{#certifications}}

<li>{{.}}</li>

{{/certifications}}

The certifications field is an array of strings.

Do not create numbered variables such as:

{{certification1}}
{{certification2}}
{{certification3}}

Use the certifications array instead.

Preserve the original HTML structure and styling of the certification section.

---

## ACHIEVEMENTS

If the source HTML contains an achievements section, convert the repeated achievement values into a Handlebars loop:

{{#achievements}}

<li>{{.}}</li>

{{/achievements}}

The achievements field is an array of strings.

Do not create numbered variables such as:

{{achievement1}}
{{achievement2}}
{{achievement3}}

Use the achievements array instead.

Preserve the original HTML structure and styling of the achievement section.

---

## OPTIONAL SECTIONS

For optional sections such as:

* experience
* projects
* skills
* education
* certifications
* achievements

use the corresponding Handlebars block so that an empty section is not unnecessarily rendered when the array has no data.

For example:

{{#certifications}}

<section>
    ...
</section>
{{/certifications}}

Do not add unnecessary conditional logic for sections that do not exist in the original HTML.

---

## IMPORTANT DESIGN RULE

The original HTML is the source of truth for the visual design.

Do NOT redesign the resume.

Do NOT:

* change the layout unnecessarily
* center content that was originally left-aligned
* change column structure
* replace borders with different styling
* add cards when the original has none
* add gradients
* add colors that do not exist
* add icons
* add animations
* add JavaScript
* add external libraries
* change the overall typography hierarchy
* convert an A4 resume into a web landing page
* add decorative elements that were not present
* change spacing unnecessarily
* change section ordering unnecessarily

Only make the minimum structural changes necessary to replace static content with dynamic Handlebars variables and loops.

---

## CONTENT MAPPING RULE

Analyze the original HTML first.

For every hardcoded resume value:

1. Identify what type of data it represents.
2. Replace it with the appropriate Handlebars variable.
3. If it represents repeated data, convert it into a Handlebars loop.
4. Preserve the surrounding HTML and CSS structure.
5. Do not convert static labels or section headings into variables.

For example:

<h1>John Doe</h1>

must become:

<h1>{{name}}</h1>

A hardcoded email must become:

<div>{{email}}</div>

A hardcoded location must become:

<div>{{location}}</div>

A hardcoded job role should become a variable only if it represents resume data.

Do NOT convert static section headings such as:

Experience
Education
Projects
Skills
Certifications
Achievements

into variables.

---

## REPEATED CONTENT RULE

Whenever the original HTML contains repeated structures, do NOT create numbered variables such as:

{{project1}}
{{project2}}
{{project3}}

Instead use arrays:

{{#projects}}
...
{{/projects}}

The same rule applies to:

* experience
* projects
* education
* skills
* certifications
* achievements

Never duplicate the HTML manually for multiple array elements.

---

## HANDLEBARS SYNTAX RULES

Use valid standard Handlebars syntax.

For arrays of objects:

{{#experience}}
{{role}}
{{company}}
{{duration}}
{{/experience}}

For arrays of strings:

{{#certifications}}

<li>{{.}}</li>
{{/certifications}}

Do not use JavaScript expressions inside Handlebars.

Do not use React syntax.

Do not use JSX.

Do not use template literals in the generated HTML.

Do not invent custom Handlebars helpers.

Use only standard Handlebars variables, loops, and basic conditional blocks when necessary.

---

## OUTPUT FORMAT — VERY IMPORTANT

Return ONLY the final HTML template.

The response must:

* start with <!DOCTYPE html>
* end with </html>
* contain valid standalone HTML
* contain all CSS inside a single <style> block
* contain no explanation before the HTML
* contain no explanation after the HTML
* contain no JSON
* contain no sample resume data
* contain no Markdown
* contain no Markdown code fences
* contain no triple backticks
* contain no triple quotes
* contain no surrounding quotation marks
* contain no language identifier such as html before the document

The generated output must be raw HTML.

The generated output will be passed directly into a Handlebars-compatible template renderer.

Therefore, NEVER return the HTML as a string.

Do not return:

Do not use \`\`\` around the HTML.




Do not return:

"<!DOCTYPE html>

<html>
...
</html>"

Do not return any wrapper around the HTML.

The very first characters of the response must be:

<!DOCTYPE html>

The very last characters of the response must be:

</html>

---

## FINAL VALIDATION

Before returning the result, internally verify that:

1. The document starts with <!DOCTYPE html>.
2. The document ends with </html>.
3. No Markdown code fences exist.
4. No triple backticks exist.
5. No triple quotes exist.
6. No quotation marks wrap the entire HTML.
7. No specific person's resume information remains hardcoded.
8. Repeated experience entries use {{#experience}}.
9. Repeated projects use {{#projects}}.
10. Repeated skills use {{#skills}}.
11. Repeated education entries use {{#education}}.
12. Certifications use {{#certifications}} when present.
13. Achievements use {{#achievements}} when present.
14. {{nameFontSize}} is used for the candidate name/header.
15. {{headingFontSize}} is used for section headings.
16. {{bodyFontSize}} is used for body content.
17. The original visual design is preserved.
18. No unnecessary frameworks, JavaScript, external CSS, external fonts, or dependencies were introduced.
19. The result is directly usable as a Handlebars template.

Do not output the validation results.

Only output the final HTML.

---

## INPUT

The following is the static HTML resume that must be converted:

[PASTE STATIC HTML HERE]
`;
