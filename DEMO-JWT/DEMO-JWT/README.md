POST:
<img width="1884" height="1018" alt="image" src="https://github.com/user-attachments/assets/9d2872d9-dc8a-4dd8-b38c-b2113045c329" />
## POST Method

### Description

POST is used to send data to the server.

### Example (JavaScript)

```javascript
fetch('http://example.com/api/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John',
    age: 25
  })
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

## Difference

| Feature       | GET           | POST      |
| ------------- | ------------- | --------- |
| Use           | Retrieve data | Send data |
| Data Location | URL           | Body      |
| Security      | Low           | Better    |
| Cache         | Yes           | No        |

---

## Summary

* GET → fetch data
* POST → send data

GET:
<img width="1919" height="1016" alt="image" src="https://github.com/user-attachments/assets/5ae8aea5-4170-4dc4-ab36-2eec513bcd8b" />
 
## GET Method
### Description

GET is used to retrieve data from the server.

### Example (URL)

```
http://example.com/api/user?id=1
```

### Example (JavaScript)

```javascript
fetch('http://example.com/api/user?id=1')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---
