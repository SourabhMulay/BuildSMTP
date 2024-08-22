# BuildSMTP
<hr>
Build a Mail server: (Send and Receive the mails):

How can we receive an email???

suppose want to send an email to send@outlook.com and from our email srbh@gmail.com. So there are some steps to follow af:
1. it'll check the domain first so domain of receiver is outlook.com
2. it'll first make a DNS query over 'outlook.com'
3. it'll ask DNS for MX (mail exchange) record. (once you bough domain it'll be an option to setup)
4. MX record shows...if any email has been sent to outlook.com how and which server will handle the same.

DNS queery:: Outlook.com :: MX => (server) mailserver.com 

Mailserver.com server will handle the req.

Again there willl be an query over the handling server (mailserver.com) and query will ask the server about 'A' record....A record is nothing but the IP (where are you?? server!) so we'll get an IP address of that server.

For example the IP returned is 1.4.3.2 So any email that has been sent to outlook.com will handled over this IP.

This is how the mail received on receiving end. checkout MX record Lookup tools.

suppose you have your own custom domain....srbh@saurabh.com. Try skiff Email. you'll have to setup the server that will handle the incoming emails.

send email to :: srbh@saurabh.com ===> will route to 'skiff.com' and it'll handle that record.


SPF record::
(suppose spf record has set the skiff dot com)
there are some validations and those will classify mail as spam or not spam based on some conition. there are some checks to be applied to get to know about spam cases. SPF: sender policy framwork.

if you send an email to someone with domain gmail dot com...then the query will look for MX record of gmail dot com and will findout the smtp server that will handle the reequest.

Asking server about 'A' record is nothing but asking The IP to that server.

<hr>

In SHORT:

FROM :
Srbh@gmail.com

Send to:
Sfsupport@outlook.com ==> (query the Mx Record)
==> query results MX record server: MailServer.com

==> again lookup upon or query on the Mailserver.com to look for his 'A' record Which is nothing but his IP address.

If IP resolve it'll return an valid IP suppose in this case: 1.2.3.4
So this server will handle the mails.

MX record lookup tool will help you to find the mx records or smtp servers that will handle the email.

Spamming is an issue with an emails. so to cope up or to validate the emails we need to setup a SPF record on server. (our domain / server). Hackers can use your email to mail anyone on your behalf so to avoid such breach...you need spf record.

<hr>
How it works???

Suppose you're using gmail and you are receiving an email from "mail@saurabh.com" so at front you're email service or gmail will search SPF record on saurabh.com domain and will check the value. If the value is skiff.com then It mean that only skiff.com has permission to send email from saurabh.com. If you are getting an email from saurabh.com domain and it coming from any 3rd party server then someone tried to spam you!!! 

DKIM?

When you send an email from: mail@saurabh.com  so you can add an siganture on it. to encrypt the signature we use public key and to decrypt we have a private key. to make mail valid/legit we can lock the sign using private key (private key should not be revealed to anyone over the server or anywhere, it should be with you only) and i have sent that email to gmail.com. Now gmail will go to saurabh.com domain and ask him for his DKIM record.(Domain key identifier mail).In response he'll get a public key. gmail will take that public key and verify the signature. if siganture is not valid then it's spam...

Suppose I already have delegeted the authority to Skiff.com!! then on server i need to set the DKIM record. the gmail will ask the skiff.com the public key and then verify the signature.

DMARC???
(any checks can failed! SpF check fail...Signature is not valid)
If validation failed with the public key!!! then what to do with the email is determined by DMARC. Either i can Accept it or SPAM it or I will not receive it!

None: Accept the mail in inbox

Qurantine: Mark it as spam

Reject: Do not receive the email at all.

<hr>

How that mailserver works? 1.2.3.4????

It's a machine...we run an http server on this machine to create an API's. But we have a SMTP (simple mail transfer protocol) server to create....http is on port 80 and https is on 443. Where the smtp work on port 25 and smtps works on 465 port.
So the server will either listen to port 25 or 465. Suppose i have created a service and assign 'A' record to 4.5.6.7 IP.

Suppose service named as mail.gmailclone.com...so if you want to consume the service you'll create an emails using this gmailclone domain. and you'll need the mx records to handle the emails on this domain.
We cam say that the mail.gmailclone.com is the MX record for gmailclone.com


To conclude above explanation:

gmailclone.com (domain):
have MX record: mail.gmailclone.com (MX)[IP: 4.5.6.7]

What ever emails you'll send over gmailclone.com will be handled by mail.gmailclone.com that's all.

SMTP Works over TCP!!!1

We have a node package smtp-server that'll be helpful to create a server.

## CODE NOW!!!!!
