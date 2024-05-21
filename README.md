<h1>Flight API - Find Cheap Flights in Morocco</h1>
<p>This is a web scraper built with Node.js and Puppeteer to retrieve the cheap flights information.</p>

<h2>Installation</h2>
<p>Before running the application, make sure you have Node.js and npm installed on your machine.</p>

<h4>Clone the repository</h4>
<pre><code>git clone https://github.com/XredaX/flights-api.git</code></pre>

<h4>Navigate to the project directory</h4>
<pre><code>cd flights-api</code></pre>

<h4>Install dependencies</h4>
<pre><code>npm install</code></pre>

<h2>Usage</h2>
<p>Before starting the server, if you want to see the backend working, set <strong>headless</strong> to <strong>false</strong>:</p>
<pre><code>headless: false</code></pre>
<p>If not, leave it as <strong>true</strong>:</p>
<pre><code>headless: true</code></pre>

<p>To start the server, run the following command:</p>
<pre><code>npm run start</code></pre>

<p>Once the server is running, you can access the API endpoint to retrieve flight information.</p>
<h3>API Endpoint</h3>
<p><strong>GET</strong> <code>/flights</code></p>
<p>Query Parameters:</p>
<ul>
  <li><code>from</code>: Departure airport name</li>
  <li><code>to</code>: Arrival airport name</li>
  <li><code>date</code>: Departure date in yyyy-mm-dd format</li>
</ul>

<p>Example Request:</p>
<pre>
  <code>
    http://localhost:4000/flights?from=Oujda&to=Rabat&date=2024-07-15
  </code>
</pre>
<p>Make sure to change the configuration to match your setup</p>

<p>The Result:</p>
<img src="dist/res.PNG" alt="Result Image"/>


<p>If you need any assistance with the code, feel free to contact me via email <strong><i class="fas fa-envelope"></i> redaelbettioui@gmail.com</strong> </p>
<p>Or through LinkedIn <strong><a href="https://www.linkedin.com/in/reda-el-bettioui/">Reda El Bettioui</a></strong></p>

<p>If you appreciate the work, please consider giving it a star ⭐ </p>


