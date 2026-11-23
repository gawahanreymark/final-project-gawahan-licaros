# Acceptance Criteria
<!--
Acceptance criteria tell you when a user story is DONE. Each one must be testable: pass or fail.
Write 2–3 criteria for every user story using this format:

Given [a situation], when [the user does something], then [this should happen].

Tips:
- Number them under their story: AC1.1 and AC1.2 belong to US1.
- Describe what the user SEES, not how the code works.
- Include at least one "what if it goes wrong" case per story (empty input, no results).
- Avoid vague words like "fast," "nice," or "easy." Could a classmate test it and agree it passed?

Example:
## US1: View today's menu
- AC1.1: Given I open the App page, when it loads, then I see each dish with its name, photo and price.
- AC1.2: Given no dishes are added yet, when I open the menu, then I see "No dishes today yet."

AC - Acceptance Criteria
-->

### Feature: 
US1: As a college student, I want to search for items and filter the results by category and status, so that I can locate lost personal belongings on campus. 

- AC1.1: Given I am on the Lost & Found page, when I enter an item keyword into the search bar, then the list updates to display only items matching that keyword.

- AC1.2: Given I am on the Lost & Found page, when I select a specific category and status from the filters, then the displayed list updates to show only items matching both the selected category and status.


### Feature: 
US2:  As a faculty member, I want to submit a found item report with photos, descriptions, and descriptions, and locations, so that students and faculty can identify their lost belongings

- AC2.1: Given I am on the Report Item page and have filled in all required fields including photo, description, and location, when I submit the form, then the report is saved and appears on the Lost & Found page. 

- AC2.2: Given I am on the Report Item page and leave a required field empty, when I attempt to submit the form, then the form blocks submission and displays validation messages for the missing fields. 

### Feature: 
US3:As a campus user, I want to view item details in a modal dialog without leaving the main page, so that I can inspect the item's description and photos.

- AC3.1: Given I am viewing the list of items on the Lost & Found page, when I click on a specific item, then a modal dialog opens over the current page displaying the item's full description, photo, status, and location.

- AC3.2:Given the item detail modal dialog is open, when I click the close button, then the modal closes and I remain on the Lost & Found page in my previous scroll position. 

