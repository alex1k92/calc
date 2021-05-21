20/5/2021

Known Bugs :

1) Dividing by 0 should produce an Error
a)problem root = dividing by 0
followed by Displayed error message
currently giving infinity
Fixed 20/5/2021
(added new property this.error )

2)Floating numbers problem (0.1 + 0.2 !== 0.3)
a)standard JS issue with floats
possible solutions?
rounding up?
or somehow being specific

3)Keyboard binding required
a)keyUp,keyDown, keyPress?
4)negative numbers can't be added. implement +- button for changing the sign
5)Implement localStorage for previous operations and results