#CM-Check 

Check is a suite of lightweight, customizable tools for game developers.  The project was developed to serve the simple purpose of making it easy to execute Ability Checks, much like you might find in most modern Role Playing Games (RPGs), but offer the extensibility and customization developers should expect.  

##The Basic Concept
In essence, the concept is this: Dice are rolled against a target number and compared with the result, and the success of each 'check' is then determined.

>Benny the bear is going to need to knock down that wooden door before she can escape the dungeon.  She needs to pass a Strength check with a target of 14.  If she succeeds, the door will be knocked off of its hinges and she will be free!  

According to the classic d20 rules, characters making a check need to roll 1d20 ( one 20-sided die ) and the result needs to be higher than 14. Lets express this in code.

```javascript

// Invoke the CheckExecutor class, the brain center of the system.
var CheckExecutor = require( 'cm-check' );

// Create a new check;
var strengthCheck = CheckExecutor.generateCheck();

strengthCheck.setTarget( 14 ); // Check Target # = 14
strengthCheck.addDie( 1, 20 ); // Check Die Rolled = 1 die with 20 sides 

// Execute the Check
CheckExecutor.execute( strengthCheck ); // Roll dice, do other processes...

// Get Result and print to console
if ( strengthCheck.isPass() ) { console.log( 'Pass!' ); }
else { console.log( 'Fail :(' ); }

```

In the above example, we invoke the CheckExecutor (which is the main library from which everything else is provided)








Check 
