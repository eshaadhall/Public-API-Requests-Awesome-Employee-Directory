# Public API Requests (Awesome Employee Directory)

An app for a fictional company called Awesome Startup, a distributed company with remote employees working all over the world. 
This app would help employees to share contact information with each other.
 
Used the Random API Generator Public API (https://randomuser.me/) to grab information for 12 random “employees,” and use that data to build a prototype for an Awesome Startup employee directory.

This app uses the Fetch API to request 12 random employees information as a JSON object and parsed the data so that 12 employees are listed in a grid with their thumbnail image, full name, email, and location. Clicking the employee’s image or name will open a modal window with more detailed information, such as the employee’s birthday and address.

Extra Credits:

Search:
The search would help the user to filter the directory by name. As the user is typing or when the user clicks search button, it will filter the employee name in the directory.

Modal toggle:
On the modal window there will be buttons to go to the next or previous employee information modal.

Changed the color of the employee card to babypink, border for the card to purple, the modal container and the modal button container to light pink from the cs/styles.css file.