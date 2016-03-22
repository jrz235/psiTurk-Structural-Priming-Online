# psiTurk-Structural-Priming-Online
Standard psycholinguistic production structural priming task online using psiTurk

**uses GetUserMedia() function to capture audio input from participants**

# requirements
1. works best in Google Chrome - audio capture distorted in other browsers
2. requires secure connection - I used OpenShift, but you can also use Amazon EC2 and an SSL Certificate
3. uses PHP to write files to secure respository: change 'SERVER URL' in 'static/js/script*.js' files (4 of them) to appropriate path
4. change 'OPENSHIFT URL' in 'templates/ad.html' to OpenShift or EC2 path

# usual psiTurk things ('congif.txt' file)
1. input AWS/psiTurk Access keys
2. change 'host' to IP address of hosting server
3. change contact email and organization name

# ***IMPORTANT***
1. change all relevant text/contact info in 'templates/ad.html', 'templates/consent.html',
and 'templates/postquestionnaire.html' (debriefing)
