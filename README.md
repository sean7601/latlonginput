# latlonginput
This is a bootstrap library for latitude and longitude inputs.

To install, just include <script src="latlonngput.js"></script>

To create a basic latitude and longitude input, call:

latlonginput.generateLatitudeInputWithLabel(value,id,includeSmall)
latlonginput.generateLongitudeInputWithLabel(value,id,includeSmall)

or

latlonginput.generateLatitudeInput(value,id,includeSmall)
latlonginput.generateLongitudeInput(value,id,includeSmall)

To get the value of an input, call:

latlonginput.getLatitude(id)
latlonginput.getLongitude(id)

or to get both

latlonginput.get_position(id)


