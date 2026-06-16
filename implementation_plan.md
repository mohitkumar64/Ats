# Implementation Plan - Template Field Configuration & Responsive Enhancements

This plan details the implementation of a field configuration system for resume templates. It enables admins to specify which fields are supported by a template and hides unsupported input sections from users. It also improves mobile responsiveness of the resume builder and preview system, and prevents preview iframe links from opening.

## User Review Required

> [!IMPORTANT]
> The template schema update is backwards-compatible: templates without the new `supportedFields` list will default to supporting all fields.
> 
> A mobile preview toggle is introduced at the bottom-center of the viewport on mobile devices to switch between editing and preview mode seamlessly.

## Proposed Changes

### Backend & Schema

---

#### [MODIFY] [templates.ts](file:///d:/Projects/Ats/builderandats/Lib/Models/templates.ts)
- Add `supportedFields` to `templateSchema` as an array of strings, representing fields present/styled in the template.

#### [MODIFY] [route.ts](file:///d:/Projects/Ats/builderandats/src/app/api/uploadTemplate/route.ts)
- Parse `supportedFields` array from form data and save it in the Template document.

---

### Admin Panel

---

#### [MODIFY] [page.tsx](file:///d:/Projects/Ats/builderandats/src/app/admin/page.tsx)
- Add a multi-checkbox grid section for selecting supported fields when uploading a new template.
- Add `supportedFields` to form submission.

---

### Resume Builder & Preview

---

#### [MODIFY] [page.tsx](file:///d:/Projects/Ats/builderandats/src/app/resumeBuilder/[...id]/page.tsx)
- Retrieve `supportedFields` from template details.
- Dynamically filter the visible editor tabs (`Experience`, `Projects`, `Skills`) and individual inputs in `Personal Details` based on `supportedFields`.
- Fix the `addListItem` limit and displays (uses dynamic limits from `layoutInfo` instead of hardcoding 3).
- Implement a mobile layout switch between Editor and Preview modes.
- Resolve mobile layout calculations: change A4 preview container width from desktop-only hardcoded math (`calc(100vw - 520px - 4rem)`) to responsive classes (`w-[calc(100vw-2rem)] md:w-[calc(100vw-440px-4rem)] lg:w-[calc(100vw-500px-4rem)]`).

#### [MODIFY] [Iframe.tsx](file:///d:/Projects/Ats/builderandats/src/components/Iframe.tsx)
- Add support for custom stylesheet and script inside the preview iframe to disable all links (`pointer-events: none` and click-interceptor).
- Refrain from displaying default placeholder texts if a field is not supported in the selected template.

## Verification Plan

### Automated/Build Verification
- Run `npm run build` to ensure TypeScript compilation passes.

### Manual Verification
1. Open the Admin Panel, select a template and configure supported fields (e.g. disable `GitHub Link` and `Projects`).
2. Go to the Resume Builder for this template. Check that the `Projects` tab is hidden, and `GitHub Link` input is not shown under `Personal Details`.
3. Check that the preview contains no default values for disabled/unsupported fields.
4. Attempt to click a link inside the preview iframe; verify that nothing happens and links are unclickable.
5. Emulate a mobile device (width < 768px). Check that the page switches cleanly between "Edit" and "Preview" views, showing a correct scale of the A4 preview.
