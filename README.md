# ShowHide Div Button

A Mendix widget that renders a button to show and hide a container. The container will expand and contract with an animation.
 
## Description

To use this widget, drop it on your page where you'd like the button to render and configure the following properties:
 - **Button Text**: The text to be shown in the button.
 - **Shared Parent CSS Class**: The CSS class of a shared parent div between the button and the div to be shown/hidden. This is used to ensure we're showing/hiding the correct div if this widget is used in a list.
 - **Toggle CSS Class**: A class to add/remove from the button when clicking on it. Use this to highlight the button when active or even change the icon shown.
 - **Start hidden**: Whether to start the target div hidden or shown.
 - **Show duration**: Length of time (in ms) for the "show" animation.
 - **Hide duration**: Length of time (in ms) for the "hide" animation. 
