
Full problem explained here (Problem A Cardiology): https://icpc.global/worldfinals/problems/2020+ACM-ICPC+World+Finals/icpc2020.pdf 
Google sheets visualization: https://docs.google.com/spreadsheets/d/17f4zm1RZK8hdOeWA25LSJ3mK76ij1Sog6tq0CJ_dpOk/edit#gid=0

INPUT: provide rows and columns

Steps:
1. lay out all the cards given the rows and columns into grid (nested array)
2. spectator (computer) picks a card randomly
3. determine which column that card is in
4. try picking up the card's column 0th, 1st, 2nd (`pth`) etc AND...
    5. shuffle and deal until card is at stable location
        6.  repeat step 5 multiple times until you're sure you know max "shuffles & deals" required to get to stable loc
    7. see how close that location is to the middle
8. if closest to the middle, return the pth value, location (rows/columns), & iterations (shuffles & deals)

OUTPUT: [pth column, stable row, stable column, maxiterations]




