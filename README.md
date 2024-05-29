### Summary
A way to check in on seniors that are living alone

### User flow
1. User gets to the landing page
2. User clicks on get started
3. User is asked to signup
4. User puts in their full name, phone number and email
5. User puts in their check in time
6. User puts in their dependents full name, phone and email
7. User has finished signing up, they are now redirected to the dashboard (Dashboard might honestly just be the user signup process in one long page so they have access to all of the information that they had before hand)
8. Any information that has been changed can then be submitted to be updated in the DB once more again

10. User signs up their dependent on the platform (Can either be an app, phone number, email, etc)
11. User decides on the time of day that the notification will go out
12. Dependent will now get an automated call at the time of the day decided and they simply have to press 1 to check in
	1. If they miss a checkin, it will call 4 more times in the hour. By the fourth time, if there is no answer, then the user will be notified on their phone that the dependent has failed to pick up the phone

### User Flow Diagram
![[caredfor user flow]]

### data structure
![[cared for data structure]]


### Tech Stack
- NextJS
- Supabase (DB + Auth)
- Tailwind
- tRPC
- Twilio for email, phone or text message
- React native for mobile updates

### 01/28/2024
Got the flow ready to be able to accept 1 as an input and anything else to loop
Should handle for the case when they hang up before entering 1
	Should not count as a check in and should call back in 15 minutes
Should also handle for the case when they don't answer
	Should call back in 15 minutes

Maybe I don't need to do the above and record when the user has failed to call
rather instead, I can record the number of times the call has attempted to call the user
If the call attempts reaches > 4, then send an sms to the dependents to notify them about this

I can accomplish this with DB, cron and some logic
DB => track the number of calls that have been made to the user and the default cron for that user
cron => default set to call for that user
logic => When the user 

Missing piece in all this is understanding how cron works
This can be done using the qstash delay method
new users times can be recorded via the scheduled api

So the next tasks will be the following

**Tasks**
- Cron qstash scheduling endpoint (this will be accessed from the FE)
	- Create endpoint **DONE**
	- Create the FE
	- Connect the 2
	- Test
- Missed status => qstash delay 15 minutes ${process.env.HOST}/voice with the same number **DONE**
- Completed => drizzle supabase checkin false (this will be how the checkin will be stored) =>qstash delay 15 minutes **DONE**
- Setting up a DB with the user, email, phone number, Name, dependents (FK) **DONE**
- SMS endpoint for when the user fails to checkin for times in a row **DONE**
- crud endpoints for dependents **DONE**
- crud endpoints for users **DONE**
- Hooking up the FE to the schedule endpoint, create user endpoint, creating dependents endpoint, update dependents endpoint and update user endpoint
- Setup authentication

### Flow
**Calls user phone => user doesn't pick up => calls again** **DONE**
- post endpoint voice?userId=1
- expect console log "user checkin updated to false"
- phone rings
- hangup
- calls status?userId=1
- since checkin is false, should console log "User did not successfully check in"
- Should call again in a minute

**Calls user phone => user doesn't pick up => calls again => user picks up => user checks in** **DONE**
- post endpoint voice?userId=1
- expect console log "user checkin updated to false"
- phone rings
- hangup
- calls status?userId=1
- since checkin is false, should console log "User did not successfully check in"
- Should call again in a minute
- expect console log "user checkin updated to false"
- user checksin
- user successfully checked in
 
**Calls user phone => user checksin** **DONE**
**Calls user phone => user presses wrong number => user presses right number**
