
# LAB MANUAL  
## Unit–3: Implementing Routing in Single Page Applications (SPA)

This repository contains three experiments demonstrating routing concepts in React Single Page Applications using React Router.

---

## Experiment–1: Basic Client-Side Routing Using React Router

### Aim  
To implement basic client-side routing in a Single Page Application using React Router.

### Software Requirements  
- Node.js  
- React  
- React Router DOM  
- Web Browser  

### Theory  
Routing in a Single Page Application allows navigation between different views without reloading the entire web page. React Router is a widely used library that enables client-side routing in React applications. It uses components such as BrowserRouter, Routes, and Route to define navigation paths and map them to corresponding components. This improves user experience by providing faster transitions and dynamic content rendering.

HOME PAGE
<img width="1393" height="583" alt="image" src="https://github.com/user-attachments/assets/c855b91d-20db-4c2c-8526-7868406eeb3b" />
ABOUT PAGE
<img width="1877" height="706" alt="image" src="https://github.com/user-attachments/assets/c731c8c7-afd9-49b4-9d7b-12ba36fbfbf0" />
CONTACT PAGE
<img width="1879" height="769" alt="image" src="https://github.com/user-attachments/assets/06ac29bc-8866-44d5-a7c3-52ad1d2edcd2" />


### Procedure  
1. Create a React application.  
2. Install the react-router-dom package.  
3. Wrap the application with BrowserRouter.  
4. Define routes using Routes and Route components.  
5. Navigate between pages without page reload.  

---

## Experiment–2: Navigation Using Link Component

### Aim  
To implement navigation links in a Single Page Application using the React Router Link component.

### Theory  
The Link component in React Router enables navigation between different routes without refreshing the page. Unlike traditional anchor tags, the Link component prevents full page reloads and maintains SPA behavior. It updates the URL and renders the associated component dynamically. This ensures smooth and efficient navigation within the application.
Profile:
<img width="972" height="625" alt="image" src="https://github.com/user-attachments/assets/56202ccb-690e-41ce-b8a7-a19c53ae10f9" />card Purpose: Small playground 
Dashboard:
<img width="1703" height="683" alt="image" src="https://github.com/user-attachments/assets/bd7e7e25-66e8-4cee-979d-a58d53453683" />

### Procedure  
1. Import the Link component from react-router-dom.  
2. Create navigation links for different routes.  
3. Use the to attribute to define target paths.  
4. Verify smooth navigation without page reload.  

---

## Experiment–3: Multi-Page SPA Using Routing

### Aim  
To create a multi-page Single Page Application using client-side routing.

### Theory  
A multi-page SPA simulates multiple pages within a single application by dynamically rendering components based on the URL path. React Router enables this functionality through route mapping. Each component is associated with a specific path, and navigation between components occurs without reloading the browser. This approach enhances performance and provides a seamless user experience.
HOME PAGE:
<img width="1019" height="728" alt="image" src="https://github.com/user-attachments/assets/2e382741-3aa2-4558-bfba-e63060849835" />
ABOUT PAGE
<img width="1798" height="747" alt="image" src="https://github.com/user-attachments/assets/554bd5e6-4725-482e-aebd-ce7e53b8f086" />
CONTACT PAGE
<img width="1859" height="856" alt="image" src="https://github.com/user-attachments/assets/28fc6c69-a8c1-41a7-aaa1-c9885cca90ef" />

### Procedure  
1. Create multiple components representing different pages.  
2. Map each component to a specific route.  
3. Implement navigation using routing components.  
4. Test navigation between pages without refreshing the browser.  

---




