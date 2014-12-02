freebase writes require oAuth authentication.. ;(
get your oauth credentials at https:console.developers.google.com
(don't commit them!)

#Instructions:
  create an api project and enable the Freebase API
  in the API > 'Credentials' section, create a new Client ID -> 'installed application', 'other'
  fill in these three values in your ````./credentials```` file (CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
  Run ````node ./auth.js```` and follow those instructions
  this script will add the 'WRITE_TOKEN' to your credentials file
  you're ready to go.  The write_tokens last about 3 hours
