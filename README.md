#CM-Check 

Check is a suite of lightweight, customizable tools for game developers.  The project was developed to serve the simple purpose of making it easy to execute Ability Checks, much like you might find in most modern Role Playing Games (RPGs), but offer the extensibility and customization developers should expect.  

##Running a basic check
In essence, the concept is this: Dice are rolled against a target number and compared with the result, and the success of each 'check' is then determined.

>Benny the bear is going to need to knock down that wooden door before she can escape the evil wizard's cave.  She needs to pass a Strength check with a target of 14.  If she succeeds, the door will be knocked off of its hinges and she will be free!  

According to the classic d20 rules, characters making a check need to roll 1d20 ( one 20-sided die ) and the result needs to be higher than 14. Lets express this in code.

```javascript

// Invoke the CheckExecutor class, the brain center of the system.
var Check = require( 'cm-check' );

// Create a new check;
var strengthCheck = Check.generateCheck();

strengthCheck.setTarget( 14 ); // Check Target # = 14
strengthCheck.addDie( 1, 20 ); // Check Die Rolled = 1 die with 20 sides 

// Execute the Check
Check.execute( strengthCheck ); // Roll dice, do other processes...

// Get Result and print to console
if ( strengthCheck.isPass() ) { console.log( 'Pass!' ); }
else { console.log( 'Fail :(' ); }

```

##Modifiers

Right of the box, you can generate Modifiers for the check.  You can add or subtract values from Check Results, Check Targets, as well as add or remove die from the check itself.

By adding modifiers to a check, you can account for factors that affect the outcome of the check.  Consider the following scenario:

>After rolling a 12 on their Strength Check when attempting to knock down the door, failing to hit the target of 14, Benny the bear still needs to get the door open somehow.  She drinks a potion of extra strength, which will add 3 points to her next Strength Check ( Strength Check +3 ).

To make a second check, we can simply add a modifier to the same check and run it again.

```javascript

var Check = require( 'cm-check' );
var strengthCheck = Check.generateCheck();

var modifier = Check.generateModifier( '')

strengthCheck.setTarget( 14 );
strengthCheck.addDie( 1, 20 );



strengthCheck.addModifier( CE.generateModifier( ))


```













Check 
