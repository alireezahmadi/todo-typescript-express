<h1>ToDo-List</h1>
<p>ToDo list is a simple web application to save Your daily tasks in order not to miss anything. </p>
<h2>Features</h2>  
<p>As a user, I want to be able to enter Todo items with the following information:</p>
<ul>
  <li>Title</li>
  <li>Description</li>
  <li>Date</li>
  <li>status (open, closed) (after recording the status is open)</li>
</ul>

<p>As a user, I want to be able to view and sort my Todo items as follows:</p>
<ul>
 
  <li>Lowest priority</li>
  <li>Nearest date</li>
  <li>The earliest date</li>

</ul>
 <p> As a user, I want to be able to change the status of Todo items.</p>

<p>As a user, I want to be able to filter items based on the following fields:</p>
 <ul>
   <li>Date</li>
   <li>Priority</li>
   <li>Status</li>
 </ul>
<br> 

## Installation
<p>First clone or download this project</p>

``` bash
$ git clone https://github.com/alireezahmadi/todo-typescript-express.git
```
<p>You need to create .env file in the project root file with default values.</p> 

```bash
PORT=3000 
USERNAME_PSQL=postgres
PASSPORT_PSQL=postgres
PORT_PSQL= 5432
DB_PSQL= todo
JWT_SECRECT= secret
```

<p>Now run express and postgresql with **docker-compose**.</p> 

```sh
$ docker-compose up -d
```
  
 
  
  
   


  

