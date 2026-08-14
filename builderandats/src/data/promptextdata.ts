export const PromptText: string = `
You are an expert HTML/CSS engineer specializing in resume template conversion.

Your task is to convert a given static HTML resume into a reusable Handlebars-style resume template.

## OBJECTIVE

Convert the provided HTML resume into a dynamic template while preserving the original visual design as closely as possible.

The final output must:

1. Be a complete standalone HTML document.
2. Keep all CSS inside a single <style> block.
3. Preserve the original layout, spacing, typography, borders, alignment, columns, and overall visual hierarchy.
4. Replace hardcoded resume content with Handlebars variables.
5. Support dynamic arrays using Handlebars loops.
6. Never hardcode a specific person's resume information into the final template.
7. Keep the template suitable for generating a one-page A4 resume.
8. Do not introduce frameworks, JavaScript, external CSS, external fonts, or external dependencies unless they already exist in the original HTML.

---

## REQUIRED FONT VARIABLES

The following variables MUST be used in the CSS:

{{nameFontSize}}
{{headingFontSize}}
{{bodyFontSize}}

Use them as follows:

- {{nameFontSize}} → main candidate name/header
- {{headingFontSize}} → section headings
- {{bodyFontSize}} → body text, lists, descriptions, contact information, etc.

Example:

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

Example:

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

---

## EDUCATION

If the source HTML contains an education section, convert it to:

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

Use:

{{degree}}
{{institution}}
{{duration}}

---

## CERTIFICATIONS

If certifications exist, use:

{{#certifications}}

<li>{{.}}</li>

{{/certifications}}

---

## ACHIEVEMENTS

If achievements exist, use:

{{#achievements}}

<li>{{.}}</li>

{{/achievements}}

---

## IMPORTANT DESIGN RULE

The original HTML is the source of truth for the visual design.

Do NOT redesign the resume.

Do NOT:

- change the layout unnecessarily
- center content that was originally left-aligned
- change column structure
- replace borders with different styling
- add cards when the original has none
- add gradients
- add colors that do not exist
- add icons
- add animations
- add JavaScript
- add external libraries
- change the overall typography hierarchy
- convert an A4 resume into a web landing page

Only make the minimum structural changes necessary to replace static content with dynamic Handlebars variables.

---

## CONTENT MAPPING RULE

Analyze the original HTML first.

For every hardcoded resume value:

1. Identify what type of data it represents.
2. Replace it with the appropriate Handlebars variable.
3. If it represents repeated data, convert it into a Handlebars loop.
4. Preserve the surrounding HTML/CSS structure.

For example, convert:

<h1>John Doe</h1>

into:

<h1>{{name}}</h1>

Convert:

<h2>Software Engineer</h2>

only if it represents dynamic resume data. Do not convert static section headings such as "Experience", "Education", or "Projects".

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

- experience
- projects
- education
- skills
- certifications
- achievements

---

## OUTPUT RULES

Return ONLY the final HTML template.

Do not provide:

- explanations
- comments outside the HTML
- JSON
- markdown explanation
- implementation instructions
- sample resume data

The output must begin with:

<!DOCTYPE html>

and end with:

</html>

The result must be directly usable by a Handlebars-compatible template renderer.

---

## INPUT

The following is the static HTML resume that must be converted:

[PASTE STATIC HTML HERE]
`;